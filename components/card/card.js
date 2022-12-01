import Image from "next/image";
import { useState } from "react";

import { motion } from "framer-motion";
import cls from "classnames";

import styles from "./card.module.css";

const Card = ({
  size = "medium",
  imgUrl = "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=859&q=80",
  priority = false,
}) => {
  // Hooks
  const [imgSrc, setImgSrc] = useState(imgUrl);
  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };

  // Event handlers
  const handleError = () => {
    console.log("error here");
    setImgSrc(
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=859&q=80"
    );
  };

  return (
    <div className={styles.container}>
      <motion.div
        whileHover={{ scale: 1.07 }}
        className={cls(classMap[size], styles.imgMotionWrapper)}
      >
        <Image
          src={imgSrc}
          alt="image"
          fill={true}
          className={styles.cardImg}
          onError={handleError} /* runs when src is wrong */
          priority={priority}
          sizes="(max-width: 1200px) 100vw"
        />
      </motion.div>
    </div>
  );
};

export default Card;
