import { background, background1, strawbery, banana } from "../../utils";
import styles from "./BackgroundImages.module.css"; // Optional, if using a CSS file

const BackgroundImages = () => {
  return (
    <div className={styles.backgroundContainer}>
      <img
        src={background1}
        alt="leaf"
        className={`${styles.bgImage} ${styles.image1}`}
      />
      <img
        src={background}
        alt="square"
        className={`${styles.bgImage} ${styles.image2}`}
      />
      <img
        src={banana}
        alt="banana"
        className={`${styles.bgImage} ${styles.image3}`}
      />
      <img
        src={strawbery}
        alt="strawbery"
        className={`${styles.bgImage} ${styles.image4}`}
      />
    </div>
  );
};

export default BackgroundImages;
