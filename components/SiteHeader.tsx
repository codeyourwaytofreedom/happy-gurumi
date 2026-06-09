import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { useCart } from "@/hooks/useCart";
import { useFavourites } from "@/hooks/useFavourites";
import styles from "@/styles/Home.module.css";

export function SiteHeader() {
  const { itemCount } = useCart();
  const { favourites } = useFavourites();

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link className={styles.brand} href="/" aria-label="HappyGurumi home">
          <span className={styles.logoFrame}>
            <Image
              src={logo}
              alt=""
              width={51}
              height={61}
              className={styles.logo}
              priority
            />
          </span>
          <span className={styles.brandText}>
            <span className={styles.brandHappy}>Happy</span>
            <span>Gurumi</span>
          </span>
        </Link>
        <div className={styles.headerActions}>
          <Link
            className={styles.cartButton}
            href="/favourites"
            aria-label="View favourites"
          >
            <span aria-hidden="true">♡</span>
            {favourites.length > 0 ? (
              <span className={styles.cartBadge}>{favourites.length}</span>
            ) : null}
          </Link>
          <Link
            className={styles.cartButton}
            href="/cart"
            aria-label="View cart"
          >
            <span aria-hidden="true">🛍</span>
            {itemCount > 0 ? (
              <span className={styles.cartBadge}>{itemCount}</span>
            ) : null}
          </Link>
        </div>
      </div>
    </header>
  );
}
