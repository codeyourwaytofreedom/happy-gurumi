import Image from "next/image";
import bottomBucket from "@/assets/bottomBucket.png";
import logo from "@/assets/logo.png";
import styles from "@/styles/Home.module.css";

export function BottomBanner() {
  return (
    <section className={styles.ctaSection} aria-labelledby="cta-title">
      <div className={styles.ctaToy}>
        <Image
          src={logo}
          alt=""
          className={styles.ctaToyImage}
          sizes="(max-width: 720px) 90px, 150px"
        />
      </div>
      <div className={styles.ctaContent}>
        <h2 id="cta-title" className={styles.ctaTitle}>
          Ready to meet your new best friend?
        </h2>
      </div>
      <div className={styles.ctaBucket} aria-hidden="true">
        <Image
          src={bottomBucket}
          alt=""
          className={styles.ctaBucketImage}
          sizes="(max-width: 860px) 1px, 170px"
        />
      </div>
    </section>
  );
}
