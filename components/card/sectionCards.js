import Link from "next/link";
import Card from "./card";
import styles from "./sectionCards.module.css";

const SectionCards = (cardsVideos) => {
  const { title, videos = [], size } = cardsVideos;
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div
        className={styles.cardWrapper}
        style={{ scrollbarColor: "red yellow" }}
      >
        {videos.map((video) => (
          <Link key={video.id} href={`/video/${video.id}`}>
            <Card
              id={video.id}
              imgUrl={video.imgUrl}
              size={size}
              priority={true}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SectionCards;
