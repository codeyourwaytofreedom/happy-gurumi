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
            sizes="(max-width: 640px) 46vw, (max-width: 1040px) 30vw, 240px"
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
