import { useMemo, useSyncExternalStore } from "react";

const FAVOURITES_STORAGE_KEY = "happy-gurumi:favourites";
const FAVOURITES_CHANGED_EVENT = "happy-gurumi:favourites-changed";

function getStoredFavouritesSnapshot() {
  if (typeof window === "undefined") {
    return "[]";
  }

  return window.localStorage.getItem(FAVOURITES_STORAGE_KEY) ?? "[]";
}

function parseFavourites(snapshot: string) {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const parsedFavourites = JSON.parse(snapshot);

    return Array.isArray(parsedFavourites)
      ? parsedFavourites.filter(
          (item): item is string => typeof item === "string",
        )
      : [];
  } catch {
    return [];
  }
}

function subscribeToFavourites(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  function handleStorage(event: StorageEvent) {
    if (event.key === FAVOURITES_STORAGE_KEY) {
      callback();
    }
  }

  window.addEventListener("storage", handleStorage);
  window.addEventListener(FAVOURITES_CHANGED_EVENT, callback);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(FAVOURITES_CHANGED_EVENT, callback);
  };
}

export function useFavourites() {
  const favouritesSnapshot = useSyncExternalStore(
    subscribeToFavourites,
    getStoredFavouritesSnapshot,
    () => "[]",
  );
  const favourites = useMemo(
    () => parseFavourites(favouritesSnapshot),
    [favouritesSnapshot],
  );

  function toggleFavourite(slug: string) {
    if (typeof window === "undefined") {
      return;
    }

    const currentFavourites = parseFavourites(getStoredFavouritesSnapshot());
    const nextFavourites = currentFavourites.includes(slug)
      ? currentFavourites.filter((item) => item !== slug)
      : [...currentFavourites, slug];

    window.localStorage.setItem(
      FAVOURITES_STORAGE_KEY,
      JSON.stringify(nextFavourites),
    );
    window.dispatchEvent(new Event(FAVOURITES_CHANGED_EVENT));
  }

  return {
    favourites,
    isFavourite: (slug: string) => favourites.includes(slug),
    toggleFavourite,
  };
}
