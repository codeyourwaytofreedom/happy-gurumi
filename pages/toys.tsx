import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import bucketImage from "@/assets/bucket.png";
import { BottomBanner } from "@/components/BottomBanner";
import { SiteHeader } from "@/components/SiteHeader";
import { ToyCard } from "@/components/ToyCard";
import { toys } from "@/data/toys";
import styles from "@/styles/Home.module.css";

const valueItems = [
  {
    title: "Handmade With Love",
    text: "Each piece is crafted with care and love.",
    icon: "♡",
  },
  {
    title: "Premium Yarn Materials",
    text: "We use soft, durable, and baby-friendly yarn.",
    icon: "◌",
  },
  {
    title: "Perfect Gift For Any Occasion",
    text: "Beautifully packaged and ready to gift.",
    icon: "🎁",
  },
  {
    title: "Safe for All Ages",
    text: "Made with safety in mind for your peace of mind.",
    icon: "♢",
  },
];

const TOYS_PER_PAGE = 12;

export default function ToysPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const hasPaginated = useRef(false);
  const totalPages = Math.ceil(toys.length / TOYS_PER_PAGE);
  const startIndex = (currentPage - 1) * TOYS_PER_PAGE;
  const visibleToys = toys.slice(startIndex, startIndex + TOYS_PER_PAGE);
  const firstVisibleToy = startIndex + 1;
  const lastVisibleToy = startIndex + visibleToys.length;

  function goToPage(page: number) {
    const nextPage = Math.min(Math.max(page, 1), totalPages);

    if (nextPage === currentPage) {
      return;
    }

    hasPaginated.current = true;
    setCurrentPage(nextPage);
  }

  useEffect(() => {
    if (!hasPaginated.current) {
      return;
    }

    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  }, [currentPage]);

  return (
    <>
      <Head>
        <title>All Toys | Happy Gurumi</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/hand-print.png" />
      </Head>
      <SiteHeader />
      <main className={styles.allToysPage}>
        <section className={styles.allHero} aria-labelledby="all-toys-title">
          <div className={styles.allHeroContent}>
            <h1 id="all-toys-title" className={styles.allHeroTitle}>
              All Toys
            </h1>
            <p className={styles.allHeroCopy}>
              Handmade with love, made to be loved and treasured.
            </p>
            <div className={styles.allHeroBadge}>
              <span aria-hidden="true">♡</span>
              <div>
                <strong>100% Handmade</strong>
                <span>Each toy is unique</span>
              </div>
            </div>
          </div>
          <div className={styles.allHeroImageWrap}>
            <Image
              src={bucketImage}
              alt="Basket filled with crocheted animal toys"
              className={styles.allHeroImage}
              priority
              sizes="(max-width: 780px) 94vw, 620px"
            />
          </div>
        </section>
        <section className={styles.productsSection} aria-label="All toys">
          <div className={styles.productsToolbar}>
            <p className={styles.productsCount}>
              Showing {firstVisibleToy}-{lastVisibleToy} of {toys.length} results
            </p>
            <div className={styles.productsFilters}>
              <button className={styles.filterButton} type="button">
                All Categories
                <span aria-hidden="true">⌄</span>
              </button>
              <button className={styles.filterButton} type="button">
                Sort by: Newest
                <span aria-hidden="true">⌄</span>
              </button>
              <div className={styles.viewToggle} aria-hidden="true">
                <span className={styles.viewToggleActive}>▦</span>
                <span>☷</span>
              </div>
            </div>
          </div>
          <div className={styles.productsGrid}>
            {visibleToys.map((toy) => (
              <ToyCard key={toy.name} toy={toy} />
            ))}
          </div>
          <div className={styles.pagination} aria-label="Product pages">
            <button
              className={styles.pageButton}
              type="button"
              aria-label="Previous page"
              disabled={currentPage === 1}
              onClick={() => goToPage(currentPage - 1)}
            >
              <span className={styles.pageArrow} aria-hidden="true">
                ‹
              </span>
            </button>
            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;

              return (
                <button
                  className={`${styles.pageButton} ${
                    currentPage === page ? styles.pageButtonActive : ""
                  }`}
                  type="button"
                  aria-current={currentPage === page ? "page" : undefined}
                  key={page}
                  onClick={() => goToPage(page)}
                >
                  {page}
                </button>
              );
            })}
            <button
              className={styles.pageButton}
              type="button"
              aria-label="Next page"
              disabled={currentPage === totalPages}
              onClick={() => goToPage(currentPage + 1)}
            >
              <span className={styles.pageArrow} aria-hidden="true">
                ›
              </span>
            </button>
          </div>
        </section>
        <section className={styles.valuesStrip} aria-label="HappyGurumi values">
          {valueItems.map((item) => (
            <article className={styles.valueItem} key={item.title}>
              <span className={styles.valueIcon} aria-hidden="true">
                {item.icon}
              </span>
              <div>
                <h2 className={styles.valueTitle}>{item.title}</h2>
                <p className={styles.valueText}>{item.text}</p>
              </div>
            </article>
          ))}
        </section>
        <BottomBanner />
      </main>
    </>
  );
}
