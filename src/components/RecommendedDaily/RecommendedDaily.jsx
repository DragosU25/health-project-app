import React from "react";
import Button from "../common/Button/Button";
import { Link } from "react-router-dom";
import styles from "./RecommendedDaily.module.css";

const RecommendedDaily = ({
  recommendedDailyCaloriesIntake,
  restrictedAliments,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.caloriesContainer}>
        <h2 className={styles.title}>
          Your recommended daily calorie intake is
          <span className={styles.recommendedCalories}>
            {Math.round(recommendedDailyCaloriesIntake)}
            <span className={styles.smallText}>Kcal</span>
          </span>
        </h2>
      </div>
      <div className={styles.listContainer}>
        <h3 className={styles.boldText}>Foods you should not eat</h3>
        <ol className={styles.list}>
          {restrictedAliments.slice(0, 4).map((aliment, index) => (
            <li key={index}>{aliment.title}</li>
          ))}
        </ol>
      </div>

      <Link to={"/login"}>
        {" "}
        <Button text={"Start losing weight"} />
      </Link>
    </div>
  );
};

export default RecommendedDaily;
