import { useMemo, useSyncExternalStore } from "react";

const CART_STORAGE_KEY = "happy-gurumi:cart";
const CART_CHANGED_EVENT = "happy-gurumi:cart-changed";

export type CartItem = {
  slug: string;
  quantity: number;
};

function getStoredCartSnapshot() {
  if (typeof window === "undefined") {
    return "[]";
  }

  return window.localStorage.getItem(CART_STORAGE_KEY) ?? "[]";
}

function parseCart(snapshot: string): CartItem[] {
  try {
    const parsedCart = JSON.parse(snapshot);

    if (!Array.isArray(parsedCart)) {
      return [];
    }

    return parsedCart
      .filter(
        (item): item is CartItem =>
          item &&
          typeof item.slug === "string" &&
          Number.isInteger(item.quantity) &&
          item.quantity > 0,
      )
      .map((item) => ({
        slug: item.slug,
        quantity: item.quantity,
      }));
  } catch {
    return [];
  }
}

function writeCart(cart: CartItem[]) {
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event(CART_CHANGED_EVENT));
}

function subscribeToCart(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  function handleStorage(event: StorageEvent) {
    if (event.key === CART_STORAGE_KEY) {
      callback();
    }
  }

  window.addEventListener("storage", handleStorage);
  window.addEventListener(CART_CHANGED_EVENT, callback);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(CART_CHANGED_EVENT, callback);
  };
}

export function useCart() {
  const cartSnapshot = useSyncExternalStore(
    subscribeToCart,
    getStoredCartSnapshot,
    () => "[]",
  );
  const items = useMemo(() => parseCart(cartSnapshot), [cartSnapshot]);
  const itemCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  );

  function addToCart(slug: string, quantity = 1) {
    if (typeof window === "undefined") {
      return;
    }

    const safeQuantity = Math.max(1, Math.floor(quantity));
    const currentCart = parseCart(getStoredCartSnapshot());
    const existingItem = currentCart.find((item) => item.slug === slug);
    const nextCart = existingItem
      ? currentCart.map((item) =>
          item.slug === slug
            ? { ...item, quantity: item.quantity + safeQuantity }
            : item,
        )
      : [...currentCart, { slug, quantity: safeQuantity }];

    writeCart(nextCart);
  }

  function updateQuantity(slug: string, quantity: number) {
    if (typeof window === "undefined") {
      return;
    }

    const safeQuantity = Math.floor(quantity);
    const currentCart = parseCart(getStoredCartSnapshot());
    const nextCart =
      safeQuantity > 0
        ? currentCart.map((item) =>
            item.slug === slug ? { ...item, quantity: safeQuantity } : item,
          )
        : currentCart.filter((item) => item.slug !== slug);

    writeCart(nextCart);
  }

  function removeFromCart(slug: string) {
    if (typeof window === "undefined") {
      return;
    }

    const currentCart = parseCart(getStoredCartSnapshot());
    writeCart(currentCart.filter((item) => item.slug !== slug));
  }

  function clearCart() {
    if (typeof window === "undefined") {
      return;
    }

    writeCart([]);
  }

  return {
    addToCart,
    clearCart,
    itemCount,
    items,
    removeFromCart,
    updateQuantity,
  };
}
