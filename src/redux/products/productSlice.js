import { createSlice } from "@reduxjs/toolkit";
import {
  getAllProducts,
  getRecommendedCalories,
  getSearchedProduct,
  addConsumedProduct,
  deleteConsumedProductForUser,
  getConsumedInfoForSpecificDay,
} from "./productOperations";

const initialState = {
  products: [],
  recommendedDailyCaloriesIntake: null,
  restrictedAliments: [],
  consumedProducts: [],
  userDiary: {
    totalCaloriesConsumed: null,
    remainingCalories: null,
    percentageCaloriesConsumed: null,
  },
  loading: false,
  error: null,
};

// Helper functions to set loading and error states
const setLoading = (state) => {
  state.loading = true;
  state.error = null;
};

const setError = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getAllProducts
      .addCase(getAllProducts.pending, setLoading)
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data;
      })
      .addCase(getAllProducts.rejected, setError)

      // getRecommendedCalories
      .addCase(getRecommendedCalories.pending, setLoading)
      .addCase(getRecommendedCalories.fulfilled, (state, action) => {
        state.loading = false;
        state.recommendedDailyCaloriesIntake =
          action.payload.data.recommendedDailyCaloriesIntake;
        state.restrictedAliments = action.payload.data.restrictedAliments;
      })
      .addCase(getRecommendedCalories.rejected, setError)

      // getSearchedProduct
      .addCase(getSearchedProduct.pending, setLoading)
      .addCase(getSearchedProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = [action.payload];
      })
      .addCase(getSearchedProduct.rejected, setError)

      // addConsumedProduct
      .addCase(addConsumedProduct.pending, setLoading)
      .addCase(addConsumedProduct.fulfilled, (state, action) => {
        state.loading = false;

        // Adding the consumed products to the state
        const newConsumedProducts = action.payload.data.consumedProducts.map(
          (product) => ({
            ...product,
            calories: product.calories || 0, // Ensure calories is set to 0 if undefined
          })
        );

        state.consumedProducts = [
          ...state.consumedProducts,
          ...newConsumedProducts,
        ];
        state.userDiary.totalCaloriesConsumed =
          action.payload.data.userDiary.totalCaloriesConsumed;
        state.userDiary.remainingCalories =
          action.payload.data.userDiary.remainingCalories;
        state.userDiary.percentageCaloriesConsumed =
          action.payload.data.userDiary.percentageCaloriesConsumed;
      })
      .addCase(addConsumedProduct.rejected, setError)

      // deleteConsumedProductForUser
      .addCase(deleteConsumedProductForUser.pending, setLoading)
      .addCase(deleteConsumedProductForUser.fulfilled, (state, action) => {
        state.loading = false;
        const deletedProductId = action.meta.arg.productId;
        const deletedProductDate = action.meta.arg.date;

        // Remove the product from the consumed products list
        state.consumedProducts = state.consumedProducts.filter(
          (product) =>
            !(
              product._id === deletedProductId &&
              product.date === deletedProductDate
            )
        );

        // Update user diary if the payload contains userDiary data
        if (
          action.payload &&
          action.payload.data &&
          action.payload.data.userDiary
        ) {
          state.userDiary.totalCaloriesConsumed =
            action.payload.data.userDiary.totalCaloriesConsumed;
          state.userDiary.remainingCalories =
            action.payload.data.userDiary.remainingCalories;
          state.userDiary.percentageCaloriesConsumed =
            action.payload.data.userDiary.percentageCaloriesConsumed;
        }
      })
      .addCase(deleteConsumedProductForUser.rejected, setError)

      // getConsumedInfoForSpecificDay
      .addCase(getConsumedInfoForSpecificDay.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getConsumedInfoForSpecificDay.fulfilled, (state, action) => {
        state.loading = false;

        // Asigură-te că setăm produsele consumate
        const consumedProducts = (action.payload.consumedProducts || []).map(
          (product) => ({
            ...product,
            calories: product.calories || 0, // Asigură-te că fiecare produs are calorii setate
          })
        );

        // Actualizează lista de produse consumate pentru data respectivă
        state.consumedProducts = consumedProducts;

        // Dacă payload-ul include informații de calorii, actualizează-le în userDiary
        if (action.payload.userDiary) {
          state.userDiary.totalCaloriesConsumed =
            action.payload.userDiary.totalCaloriesConsumed;
          state.userDiary.remainingCalories =
            action.payload.userDiary.remainingCalories;
          state.userDiary.percentageCaloriesConsumed =
            action.payload.userDiary.percentageCaloriesConsumed;
        }
      })
      .addCase(getConsumedInfoForSpecificDay.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default productSlice.reducer;
