import Card from "./card";
import styles from "./sectionCards.module.css";

const SectionCards = ({ title, videos, size }) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((card, index) => (
          <Card
            key={index}
            id={index}
            imgUrl={card.imgUrl}
            size={size}
            priority={true}
          />
        ))}
      </div>
    </section>
  );
};

export default SectionCards;
