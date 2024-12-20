// Sidebar.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Sidebar.module.css";
import { selectUser } from "../../redux/auth/selectorsAuth";
import NotRecommendedList from "../NotRecommendedList/NotRecommendedList";
import { getCurrentUser } from "../../redux/auth/authOperations";
import { selectConsumedProducts } from "../../redux/products/productSelectors";
import { getConsumedInfoForSpecificDay } from "../../redux/products/productOperations";

const Sidebar = () => {
  const currentUser = useSelector(selectUser);
  const consumedProducts = useSelector(selectConsumedProducts);
  const storageDate = localStorage.getItem("date");

  const dispatch = useDispatch();

  useEffect(() => {
    if (storageDate) {
      dispatch(getConsumedInfoForSpecificDay(storageDate));
      dispatch(getCurrentUser());
    }
  }, [dispatch, storageDate]);

  const restrictedAliments = currentUser.restrictedAliments || [];

  // Filter the consumed products based on the selected date
  const filteredConsumedProducts = consumedProducts.filter((product) => {
    const productDate = new Date(product.date).toISOString().split("T")[0];
    const selectedDateStr = storageDate;
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
        <h3 className={styles.title}>Summary for {storageDate}</h3>
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
