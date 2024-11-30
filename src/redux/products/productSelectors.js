// src/redux/health/healthSelectors.js

export const selectProducts = (state) => state.product.products;

export const selectRecommendedCalories = (state) =>
  state.product.recommendedDailyCaloriesIntake;

export const selectRestrictedAliments = (state) =>
  state.product.restrictedAliments;

export const selectConsumedProducts = (state) => state.product.consumedProducts;

export const selectLoading = (state) => state.product.loading;

export const selectError = (state) => state.product.error;

export const selectUserDiary = (state) => state.product.userDiary;

export const selectTotalCaloriesConsumed = (state) =>
  state.product.userDiary.totalCaloriesConsumed;

export const selectRemainingCalories = (state) =>
  state.product.userDiary.remainingCalories;

export const selectPercentageCaloriesConsumed = (state) =>
  state.product.userDiary.percentageCaloriesConsumed;
