import styles from "./NotRecommendedList.module.css";

const NotRecommendedList = ({ restrictedAliments }) => {
  return (
    <>
      <h3 className={styles.title}>Food not recommended</h3>
      <ul className={styles.list}>
        {restrictedAliments.slice(0, 4).map((item) => (
          <li key={item._id} className={styles.item}>
            {item.title}
          </li>
        ))}
      </ul>
    </>
  );
};

export default NotRecommendedList;
