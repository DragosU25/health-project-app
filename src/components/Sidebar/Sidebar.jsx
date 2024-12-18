import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Sidebar.module.css";
import { selectUser } from "../../redux/auth/selectorsAuth";
import NotRecommendedList from "../NotRecommendedList/NotRecommendedList";
import { getCurrentUser } from "../../redux/auth/authOperations";

const Sidebar = ({ selectedDate }) => {
  const currentUser = useSelector(selectUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser);
  }, [dispatch]);

  const consumedProducts = currentUser.consumedProducts || [];
  const restrictedAliments = currentUser.restrictedAliments || [];

  // Filter the consumed products based on the selected date
  const filteredConsumedProducts = consumedProducts.filter((product) => {
    const productDate = new Date(product.date).toISOString().split("T")[0];
    const selectedDateStr = selectedDate.toISOString().split("T")[0];
    return productDate === selectedDateStr;
  });

  // Calculate consumed calories for the selected date
  const consumedCalories = filteredConsumedProducts.reduce(
    (total, product) => total + (product.calories || 0),
    0
  );

  // Get the recommended calories (assumed to be constant for the user)
  const recommendedCalories = currentUser.dailyCalorieIntake;

  // Calculate percentage of calories consumed for the selected date
  const percentageCaloriesConsumed = Math.round(
    (consumedCalories / recommendedCalories) * 100
  );

  // Calculate remaining calories for the selected date
  const remainingCalories = recommendedCalories - consumedCalories;
  return (
    <div className={styles.sidebar}>
      <div className={styles.summary}>
        <h3 className={styles.title}>
          Summary for {selectedDate.toLocaleDateString()}
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
