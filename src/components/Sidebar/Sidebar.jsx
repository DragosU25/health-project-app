import React from "react";
import { useSelector } from "react-redux";
import styles from "./Sidebar.module.css";
import { selectUser } from "../../redux/auth/selectorsAuth";
import NotRecommendedList from "../NotRecommendedList/NotRecommendedList";

const Sidebar = () => {
  const currentUser = useSelector(selectUser);
  const recommendedCalories = currentUser.dailyCalorieIntake;
  const percentageCaloriesConsumed = Math.round(
    currentUser.userDiary.percentageCaloriesConsumed
  );
  const remainingCalories = currentUser.userDiary.remainingCalories;
  const consumedProducts = currentUser.consumedProducts;
  const restrictedAliments = currentUser.restrictedAliments;

  const consumedCalories = consumedProducts.reduce(
    (total, product) => total + (product.calories || 0),
    0
  );

  return (
    <div className={styles.sidebar}>
      <div className={styles.summary}>
        <h3 className={styles.title}>
          Summary for {new Date().toLocaleDateString()}
        </h3>
        <div className={styles.summaryContainer}>
          <p className={styles.summaryText}>
            Left: <span> {Math.round(remainingCalories)} kcal</span>
          </p>
          <p className={styles.summaryText}>
            Consumed: <span>{Math.round(consumedCalories)} kcal</span>
          </p>
          <p className={styles.summaryText}>
            Daily rate: <span>{recommendedCalories} kcal</span>
          </p>
          <p className={styles.summaryText}>
            % of normal: <span>{Math.round(percentageCaloriesConsumed)}%</span>
          </p>
        </div>
      </div>
      <div className={styles.notRecommendedContainer}>
        <NotRecommendedList restrictedAliments={restrictedAliments} />
      </div>
    </div>
  );
};

export default Sidebar;
