import Image from "next/image";
import styles from "./card.module.css";

const Card = ({ size, imgUrl }) => {
  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };

  return (
    <div className={styles.container}>
      <div className={classMap[size]}>
        <Image
          src={imgUrl}
          alt="image"
          fill={true}
          className={styles.cardImg}
        />
      </div>
    </div>
  );
};

export default Card;
