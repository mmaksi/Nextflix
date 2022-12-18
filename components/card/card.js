import Image from "next/image";
import { useState } from "react";

import { motion } from "framer-motion";
import cls from "classnames";

import styles from "./card.module.css";

const Card = ({
  size = "medium",
  imgUrl = "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=859&q=80",
  priority = false,
  id,
  shouldScale = true,
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
    setImgSrc(
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=859&q=80"
    );
  };

  // Component Logic
  const scale = id === 0 ? { scaleY: 1.1 } : { scale: 1.1 };

  const shouldHover = shouldScale && {
    whileHover: { ...scale },
  };

  return (
    <div className={styles.container}>
      <motion.div
        {...shouldHover}
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
