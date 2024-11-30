import React from "react";
import CalorieCalculatorForm from "../../components/CalorieCalculatorForm/CalorieCalculatorForm";
import { getRecommendedCalories } from "../../redux/products/productOperations";

const Home = () => {
  return <CalorieCalculatorForm apiCallFunction={getRecommendedCalories} />;
};

export default Home;
