import type { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BottomBanner } from "@/components/BottomBanner";
import { SiteHeader } from "@/components/SiteHeader";
import { ToyCard } from "@/components/ToyCard";
import { getToyBySlug, getToySlug, toys } from "@/data/toys";
import { useCart } from "@/hooks/useCart";
import { useFavourites } from "@/hooks/useFavourites";
import styles from "@/styles/Home.module.css";

type ToyDetailPageProps = {
  slug: string;
};

export default function ToyDetailPage({ slug }: ToyDetailPageProps) {
  const toy = getToyBySlug(slug);
  const title = toy ? `${toy.name} | Happy Gurumi` : "Toy | Happy Gurumi";
  const { addToCart } = useCart();
  const { isFavourite, toggleFavourite } = useFavourites();
  const isToyFavourite = isFavourite(slug);
  const [hasAddedToCart, setHasAddedToCart] = useState(false);

  if (!toy) {
    return null;
  }

  const relatedToys = toys
    .filter((relatedToy) => getToySlug(relatedToy) !== slug)
    .slice(0, 5);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/hand-print.png" />
      </Head>
      <SiteHeader />
      <main className={styles.detailPage}>
        <section className={styles.detailIntro} aria-labelledby="toy-title">
          <nav className={styles.detailBreadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">›</span>
            <Link href="/toys">Toys</Link>
            <span aria-hidden="true">›</span>
            <span>{toy.name}</span>
          </nav>
          <div className={styles.detailHero}>
            <div className={styles.detailGallery}>
              <div className={styles.detailImageStage}>
                <div className={styles.detailFeatureNote} aria-hidden="true">
                  <span>✨ Handmade</span>
                  <span>🧶 100% Crochet</span>
                  <span>♥ Made with Love</span>
                </div>
                <Image
                  src={toy.image}
                  alt={toy.alt}
                  className={styles.detailMainImage}
                  priority
                  sizes="(max-width: 860px) 92vw, 560px"
                />
              </div>
              <div className={styles.detailThumbs} aria-label={`${toy.name} photos`}>
                {[0, 1, 2, 3].map((item) => (
                  <button
                    className={`${styles.detailThumb} ${
                      item === 0 ? styles.detailThumbActive : ""
                    }`}
                    type="button"
                    key={item}
                    aria-label={`View ${toy.name} image ${item + 1}`}
                  >
                    <Image src={toy.image} alt="" className={styles.detailThumbImage} />
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.detailSummary}>
              <h1 id="toy-title" className={styles.detailTitle}>
                {toy.name}
              </h1>
              <div className={styles.detailRating}>
                <span aria-label="Rated 5 out of 5">★★★★★</span>
                <span>(24 reviews)</span>
              </div>
              <p className={styles.detailPrice}>{toy.price}</p>
              <p className={styles.detailKicker}>Handmade with love ♥</p>
              <p className={styles.detailDescription}>
                This adorable amigurumi friend is carefully handmade with soft
                premium yarn. Perfect companion for all ages and a beautiful gift
                for any special occasion.
              </p>
              <div className={styles.detailChips} aria-label="Product highlights">
                <span>🧶 Soft Premium Yarn</span>
                <span>🛡 Safe for All Ages</span>
                <span>🎁 Perfect Gift</span>
              </div>
              {hasAddedToCart ? (
                <Link
                  className={`${styles.addToCartButton} ${styles.addToCartButtonActive}`}
                  href="/cart"
                >
                  ✓ View Cart
                </Link>
              ) : (
                <button
                  className={styles.addToCartButton}
                  type="button"
                  onClick={() => {
                    addToCart(slug);
                    setHasAddedToCart(true);
                  }}
                >
                  🛍 Add to Cart
                </button>
              )}
              <button
                className={`${styles.wishlistButton} ${
                  isToyFavourite ? styles.wishlistButtonActive : ""
                }`}
                type="button"
                aria-pressed={isToyFavourite}
                onClick={() => toggleFavourite(slug)}
              >
                {isToyFavourite ? "♥ In Your Favourites" : "♡ Add to Favourites"}
              </button>
            </div>
          </div>
        </section>
        <section className={styles.relatedSection} aria-labelledby="related-title">
          <h2 id="related-title" className={styles.relatedTitle}>
            You May Also Like
          </h2>
          <div className={styles.relatedGrid}>
            {relatedToys.map((relatedToy) => (
              <ToyCard key={relatedToy.name} toy={relatedToy} />
            ))}
          </div>
        </section>
        <BottomBanner />
      </main>
    </>
  );
}

export const getStaticPaths = (() => {
  return {
    paths: toys.map((toy) => ({
      params: { slug: getToySlug(toy) },
    })),
    fallback: false,
  };
}) satisfies GetStaticPaths;

export const getStaticProps = ((context) => {
  const slug = context.params?.slug;

  if (typeof slug !== "string" || !getToyBySlug(slug)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      slug,
    },
  };
}) satisfies GetStaticProps<ToyDetailPageProps>;
