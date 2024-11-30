import React from "react";
import CalorieCalculatorForm from "../../components/CalorieCalculatorForm/CalorieCalculatorForm";
import { getPrivateRecommendedCalories } from "../../redux/products/productOperations";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./CalculatorPage.module.css";
const Calculator = () => {
  return (
    <div className={styles.container}>
      <CalorieCalculatorForm apiCallFunction={getPrivateRecommendedCalories} />
      <Sidebar />
    </div>
  );
};

export default Calculator;
