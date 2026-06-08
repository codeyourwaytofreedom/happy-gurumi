import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import bucketImage from "@/assets/bucket.png";
import heroImage from "@/assets/heroImage.png";
import { BottomBanner } from "@/components/BottomBanner";
import { SiteHeader } from "@/components/SiteHeader";
import { ToyCard } from "@/components/ToyCard";
import { featuredToys } from "@/data/toys";
import styles from "@/styles/Home.module.css";

const storyHighlights = [
  {
    title: "Handmade with Love",
    text: "Each piece is unique and crafted by hand.",
    icon: "♡",
  },
  {
    title: "Premium Materials",
    text: "We use soft, durable, and baby-friendly yarn.",
    icon: "◌",
  },
  {
    title: "Safe for All Ages",
    text: "Made with safety in mind for your peace of mind.",
    icon: "♢",
  },
  {
    title: "Perfect for Gifting",
    text: "Beautifully packaged and ready to make someone happy.",
    icon: "🎁",
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Happy Gurumi</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/hand-print.png" />
      </Head>
      <SiteHeader />
      <main>
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroInner}>
            <div className={styles.heroContent}>
              <p className={styles.kicker}>Handmade with love</p>
              <h1 id="hero-title" className={styles.heroTitle}>
                Made with yarn, filled with <span>joy.</span>
              </h1>
              <p className={styles.heroCopy}>
                Adorable handmade amigurumi toys crafted with love. Perfect
                companions for all ages.
              </p>
              <div
                className={styles.heroFeatures}
                aria-label="HappyGurumi values"
              >
                <div className={styles.heroFeature}>
                  <span className={styles.featureIcon} aria-hidden="true">
                    ❤️
                  </span>
                  <strong>Handmade</strong>
                  <span>With love</span>
                </div>
                <div className={styles.heroFeature}>
                  <span className={styles.featureIcon} aria-hidden="true">
                    🍃
                  </span>
                  <strong>Safe & Premium</strong>
                  <span>Materials</span>
                </div>
                <div className={styles.heroFeature}>
                  <span className={styles.featureIcon} aria-hidden="true">
                    🎁
                  </span>
                  <strong>Perfect Gift</strong>
                  <span>For any occasion</span>
                </div>
              </div>
            </div>
            <div className={styles.heroImageWrap}>
              <Image
                src={heroImage}
                alt="Crocheted bear, bunny, chick, and dinosaur toys sitting together"
                className={styles.heroImage}
                priority
                sizes="(max-width: 860px) 92vw, 620px"
              />
              <div className={styles.heroBadge}>100% Handmade with Love</div>
            </div>
          </div>
        </section>
        <section
          className={styles.collectionIntro}
          aria-labelledby="collection-title"
        >
          <p className={styles.collectionKicker}>
            <span aria-hidden="true">❤️</span>
            Our collection
            <span aria-hidden="true">❤️</span>
          </p>
          <h2 id="collection-title" className={styles.collectionTitle}>
            Cute friends made just for you
          </h2>
          <p className={styles.collectionCopy}>
            Each toy is carefully handmade to bring happiness, comfort, and
            endless smiles.
          </p>
        </section>
        <section className={styles.toysSection} aria-label="Featured toys">
          <div className={styles.toysGrid}>
            {featuredToys.map((toy) => (
              <ToyCard key={toy.name} toy={toy} />
            ))}
          </div>
          <Link className={styles.viewAllButton} href="/toys">
            View All Toys
            <span aria-hidden="true">→</span>
          </Link>
        </section>
        <section className={styles.storySection} aria-labelledby="story-title">
          <div className={styles.storyInner}>
            <div className={styles.storyImageFrame}>
              <Image
                src={bucketImage}
                alt="Basket filled with crocheted animal toys"
                className={styles.storyImage}
                sizes="(max-width: 860px) 92vw, 520px"
              />
            </div>
            <div className={styles.storyContent}>
              <p className={styles.storyKicker}>More than just toys</p>
              <h2 id="story-title" className={styles.storyTitle}>
                Little handmade friends with big heart.
              </h2>
              <p className={styles.storyCopy}>
                Every HappyGurumi piece is slowly stitched, softly finished,
                and made to become part of a child&apos;s favorite everyday
                moments.
              </p>
            </div>
            <div
              className={styles.storyHighlights}
              aria-label="Why customers love HappyGurumi"
            >
              {storyHighlights.map((item) => (
                <article className={styles.storyHighlight} key={item.title}>
                  <span
                    className={styles.storyHighlightIcon}
                    aria-hidden="true"
                  >
                    {item.icon}
                  </span>
                  <div>
                    <h3 className={styles.storyHighlightTitle}>{item.title}</h3>
                    <p className={styles.storyHighlightText}>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <BottomBanner />
      </main>
    </>
  );
}
