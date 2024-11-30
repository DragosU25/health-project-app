import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../auth/axiosInstance.js";

export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/products");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getRecommendedCalories = createAsyncThunk(
  "products/getRecommendedCalories",
  async (userData) => {
    const response = await axios.post("/products/recommendations", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // Returnăm datele pentru a le utiliza în reducer
  }
);

export const getPrivateRecommendedCalories = createAsyncThunk(
  "products/getRecommendedCalories",
  async (productData, { getState, rejectWithValue }) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "/private/recommendations",
        productData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSearchedProduct = createAsyncThunk(
  "product/getSearchedProduct",
  async (name, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/health/products/search/${name}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addConsumedProduct = createAsyncThunk(
  "product/addConsumedProduct",
  async (productData, { getState, rejectWithValue }) => {
    const { auth } = getState();
    const token = auth.token;

    try {
      const response = await axios.post("/private/add", productData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteConsumedProductForUser = createAsyncThunk(
  "product/deleteConsumedProductForUser",
  async ({ productId, date }, { getState, rejectWithValue }) => {
    const { auth } = getState();
    const token = auth.token;

    try {
      const response = await axios.delete("/private/delete", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { productId, date }, // Send both productId and date in the request body
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getConsumedInfoForSpecificDay = createAsyncThunk(
  "product/getConsumedInfoForSpecificDay",
  async (date, { getState, rejectWithValue }) => {
    const { auth } = getState();
    const token = auth.token;

    try {
      const response = await axios.get(`/private/consumed/${date}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
