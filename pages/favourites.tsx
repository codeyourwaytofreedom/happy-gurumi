import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import favouritesHero from "@/assets/favouritesHero.png";
import { BottomBanner } from "@/components/BottomBanner";
import { SiteHeader } from "@/components/SiteHeader";
import { getToyBySlug } from "@/data/toys";
import { useFavourites } from "@/hooks/useFavourites";
import styles from "@/styles/Home.module.css";

export default function FavouritesPage() {
  const { favourites, toggleFavourite } = useFavourites();
  const favouriteToys = favourites
    .map((slug) => {
      const toy = getToyBySlug(slug);

      return toy ? { ...toy, slug } : null;
    })
    .filter((toy): toy is NonNullable<typeof toy> => toy !== null);

  return (
    <>
      <Head>
        <title>Your Favourites | Happy Gurumi</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/hand-print.png" />
      </Head>
      <SiteHeader />
      <main className={styles.favouritesPage}>
        <section
          className={styles.favouritesHero}
          aria-labelledby="favourites-title"
        >
          <Image
            src={favouritesHero}
            alt=""
            className={styles.favouritesHeroImage}
            priority
            sizes="(max-width: 860px) 100vw, 1180px"
          />
          <div className={styles.favouritesHeroContent}>
            <h1 id="favourites-title" className={styles.favouritesTitle}>
              Your Favourites
            </h1>
            <p className={styles.favouritesCopy}>
              The cutest friends, saved just for you.
            </p>
            <Link className={styles.favouritesHeroButton} href="/toys">
              Continue Shopping
              <span aria-hidden="true">›</span>
            </Link>
          </div>
          <div className={styles.favouritesHeroBadge} aria-hidden="true">
            <span>✧</span>
            <strong>Handmade with Love</strong>
            <span>♥</span>
          </div>
        </section>

        <section className={styles.favouritesSection} aria-label="Favourite toys">
          <div className={styles.favouritesToolbar}>
            <div>
              <h2 className={styles.favouritesSectionTitle}>
                Your Favourite Toys
              </h2>
              <p className={styles.favouritesCount}>
                {favouriteToys.length}{" "}
                {favouriteToys.length === 1 ? "item" : "items"}
              </p>
            </div>
            {favouriteToys.length > 0 ? (
              <button className={styles.shareWishlistButton} type="button">
                Share Wishlist
                <span aria-hidden="true">⌯</span>
              </button>
            ) : null}
          </div>

          {favouriteToys.length > 0 ? (
            <div className={styles.favouritesGrid}>
              {favouriteToys.map((toy) => (
                <article className={styles.favouriteCard} key={toy.slug}>
                  <button
                    className={styles.favouriteRemoveButton}
                    type="button"
                    aria-label={`Remove ${toy.name} from favourites`}
                    onClick={() => toggleFavourite(toy.slug)}
                  >
                    ×
                  </button>
                  <Link href={`/toys/${toy.slug}`} aria-label={`View ${toy.name}`}>
                    <span className={styles.favouriteImageFrame}>
                      <Image
                        src={toy.image}
                        alt={toy.alt}
                        className={styles.favouriteImage}
                        sizes="(max-width: 640px) 90vw, (max-width: 1040px) 42vw, 340px"
                      />
                    </span>
                  </Link>
                  <div className={styles.favouriteInfo}>
                    <Link href={`/toys/${toy.slug}`}>
                      <h3>{toy.name}</h3>
                      <p>{toy.price}</p>
                    </Link>
                    <button
                      className={styles.favouriteHeartButton}
                      type="button"
                      aria-label={`Remove ${toy.name} from favourites`}
                      aria-pressed="true"
                      onClick={() => toggleFavourite(toy.slug)}
                    >
                      ♥
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className={styles.favouritesEmpty}>
              <p>Your favourites list is waiting for its first handmade friend.</p>
              <Link className={styles.favouritesHeroButton} href="/toys">
                Browse Toys
                <span aria-hidden="true">›</span>
              </Link>
            </div>
          )}
        </section>

        <BottomBanner />
      </main>
    </>
  );
}
