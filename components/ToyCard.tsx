import Image from "next/image";
import Link from "next/link";
import { getToySlug, type Toy } from "@/data/toys";
import { useFavourites } from "@/hooks/useFavourites";
import styles from "@/styles/Home.module.css";

type ToyCardProps = {
  toy: Toy;
};

export function ToyCard({ toy }: ToyCardProps) {
  const slug = getToySlug(toy);
  const { isFavourite, toggleFavourite } = useFavourites();
  const isToyFavourite = isFavourite(slug);

  return (
    <article className={styles.toyCard}>
      <Link
        className={styles.toyCardLink}
        href={`/toys/${slug}`}
        aria-label={`View ${toy.name}`}
      >
        <div className={styles.toyImageFrame}>
          <Image
            src={toy.image}
            alt={toy.alt}
            className={styles.toyImage}
            sizes="(max-width: 560px) calc((100vw - 44px) / 2), (max-width: 860px) calc((100vw - 76px) / 3), (max-width: 1040px) calc((100vw - 116px) / 3), 240px"
          />
        </div>
      </Link>
      <div className={styles.toyInfo}>
        <Link className={styles.toyTextLink} href={`/toys/${slug}`}>
          <h3 className={styles.toyName}>{toy.name}</h3>
          <p className={styles.toyPrice}>{toy.price}</p>
        </Link>
        <button
          className={`${styles.toyFavorite} ${
            isToyFavourite ? styles.toyFavoriteActive : ""
          }`}
          type="button"
          aria-label={
            isToyFavourite
              ? `Remove ${toy.name} from favourites`
              : `Add ${toy.name} to favourites`
          }
          aria-pressed={isToyFavourite}
          onClick={() => toggleFavourite(slug)}
        >
          {isToyFavourite ? "♥" : "♡"}
        </button>
      </div>
    </article>
  );
}
