import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import cartHero from "@/assets/cartHero.png";
import { BottomBanner } from "@/components/BottomBanner";
import { SiteHeader } from "@/components/SiteHeader";
import { getToyBySlug } from "@/data/toys";
import { useCart } from "@/hooks/useCart";
import styles from "@/styles/Home.module.css";

const SHIPPING_COST = 6;
const FREE_SHIPPING_THRESHOLD = 124;

function getPriceValue(price: string) {
  return Number(price.replace(/[^0-9.]/g, ""));
}

function formatPrice(value: number) {
  return `$${value.toFixed(2)}`;
}

export default function CartPage() {
  const { itemCount, items, removeFromCart, updateQuantity } = useCart();
  const cartItems = items
    .map((item) => {
      const toy = getToyBySlug(item.slug);

      return toy ? { ...item, toy } : null;
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);
  const subtotal = cartItems.reduce(
    (total, item) => total + getPriceValue(item.toy.price) * item.quantity,
    0,
  );
  const shipping = subtotal > 0 && subtotal < FREE_SHIPPING_THRESHOLD ? SHIPPING_COST : 0;
  const total = subtotal + shipping;
  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(
    100,
    (subtotal / FREE_SHIPPING_THRESHOLD) * 100,
  );

  return (
    <>
      <Head>
        <title>Your Cart | Happy Gurumi</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/hand-print.png" />
      </Head>
      <SiteHeader />
      <main className={styles.cartPage}>
        <nav
          className={`${styles.detailBreadcrumb} ${styles.pageBreadcrumb}`}
          aria-label="Breadcrumb"
        >
          <Link href="/">Home</Link>
          <span aria-hidden="true">›</span>
          <span>Cart</span>
        </nav>
        <section className={styles.cartHero} aria-labelledby="cart-title">
          <div className={styles.cartHeroContent}>
            <h1 id="cart-title" className={styles.cartTitle}>
              Your Cart
            </h1>
            <p className={styles.cartCopy}>
              Review your items and proceed to a happy checkout.
            </p>
          </div>
          <div className={styles.cartHeroImageWrap}>
            <Image
              src={cartHero}
              alt="Basket filled with crocheted toys"
              className={styles.cartHeroImage}
              priority
              sizes="(max-width: 560px) 220px, (max-width: 860px) 92vw, 650px"
            />
          </div>
        </section>
        <section
          className={`${styles.cartContent} ${
            cartItems.length === 0 ? styles.emptyCartContent : ""
          }`}
          aria-label="Shopping cart"
        >
          <div className={styles.cartItemsPanel}>
            {cartItems.length > 0 ? (
              <div className={styles.cartTableHeader} aria-hidden="true">
                <span>Product</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Total</span>
              </div>
            ) : null}
            {cartItems.length > 0 ? (
              cartItems.map((item) => {
                const price = getPriceValue(item.toy.price);
                const itemTotal = price * item.quantity;

                return (
                  <article className={styles.cartItem} key={item.slug}>
                    <button
                      className={styles.cartRemoveButton}
                      type="button"
                      aria-label={`Remove ${item.toy.name} from cart`}
                      onClick={() => removeFromCart(item.slug)}
                    >
                      ×
                    </button>
                    <Link
                      className={styles.cartProduct}
                      href={`/toys/${item.slug}`}
                    >
                      <span className={styles.cartProductImageWrap}>
                        <Image
                          src={item.toy.image}
                          alt={item.toy.alt}
                          className={styles.cartProductImage}
                          sizes="(max-width: 560px) 82px, 96px"
                        />
                      </span>
                      <span>
                        <strong>{item.toy.name}</strong>
                        <small>Handmade with love ♥</small>
                      </span>
                    </Link>
                    <span className={styles.cartPrice}>{item.toy.price}</span>
                    <div
                      className={styles.cartQuantityStepper}
                      aria-label={`${item.toy.name} quantity`}
                    >
                      <button
                        type="button"
                        aria-label={`Decrease ${item.toy.name} quantity`}
                        onClick={() =>
                          updateQuantity(item.slug, item.quantity - 1)
                        }
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        aria-label={`Increase ${item.toy.name} quantity`}
                        onClick={() =>
                          updateQuantity(item.slug, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    <strong className={styles.cartItemTotal}>
                      {formatPrice(itemTotal)}
                    </strong>
                  </article>
                );
              })
            ) : (
              <div className={styles.emptyCart}>
                <p>Your cart is empty for now.</p>
                <Link className={styles.continueShoppingButton} href="/toys">
                  ↩ Continue Shopping
                </Link>
              </div>
            )}
          </div>
          {cartItems.length > 0 ? (
            <aside className={styles.orderSummary} aria-label="Order summary">
              <h2>Order Summary</h2>
              <div className={styles.summaryLine}>
                <span>Subtotal ({itemCount} items)</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <div className={styles.summaryLine}>
                <span>Shipping</span>
                <strong>{formatPrice(shipping)}</strong>
              </div>
              <div className={styles.summaryTotal}>
                <span>Order Total</span>
                <strong>{formatPrice(total)}</strong>
              </div>
              <div className={styles.shippingProgress}>
                <p>
                  {freeShippingRemaining > 0
                    ? `You're ${formatPrice(freeShippingRemaining)} away from free shipping!`
                    : "You unlocked free shipping!"}
                </p>
                <span>
                  <i style={{ width: `${freeShippingProgress}%` }} />
                </span>
              </div>
              <button className={styles.checkoutButton} type="button">
                🛍 Proceed to Checkout
              </button>
              <div className={styles.paymentBox}>
                <div aria-label="Accepted payment methods">
                  <span>VISA</span>
                  <span>MC</span>
                  <span>AMEX</span>
                  <span>PayPal</span>
                  <span>Pay</span>
                </div>
                <p>🔒 Your payment information is safe and secure.</p>
              </div>
            </aside>
          ) : null}
        </section>
        {cartItems.length > 0 ? (
          <div className={styles.cartActions}>
            <Link className={styles.continueShoppingButton} href="/toys">
              ↩ Continue Shopping
            </Link>
          </div>
        ) : null}
        <BottomBanner />
      </main>
    </>
  );
}
