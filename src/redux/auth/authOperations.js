import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./axiosInstance.js"; // Assuming axiosInstance is a custom axios instance

axios.defaults.baseURL = "http://localhost:5000/api"; // Default base URL for all axios requests

// Helper function to set Authorization header
const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  localStorage.setItem("token", token); // Save token in localStorage
};

// Function to clear the Authorization header and remove token from localStorage
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
  localStorage.removeItem("token"); // Remove token from localStorage
};

// Register user action
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/register", userData);

      setAuthHeader(response.data.token);

      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("Error response from server:", error.response.data);
        return rejectWithValue(error.response.data);
      } else {
        console.error("Network or other error occurred:", error.message);
        return rejectWithValue({
          message: "An error occurred during registration.",
        });
      }
    }
  }
);

// Verify user email action
export const verifyUserEmail = createAsyncThunk(
  "auth/verify",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/auth/verify/${token}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Verification failed" }
      );
    }
  }
);

// Login user action
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/login", userData);
      setAuthHeader(response.data.token); // Set token in headers
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Login failed" }
      );
    }
  }
);

// Resend verification email action
export const resendVerificationEmail = createAsyncThunk(
  "auth/resendVerification",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/resend-verification", { email });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: "Failed to resend verification email",
        }
      );
    }
  }
);

// Logout user action
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    if (!token) {
      return rejectWithValue("No token found");
    }

    try {
      await axios.post("/auth/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      clearAuthHeader(); // Clear token from headers and localStorage
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Logout failed" }
      );
    }
  }
);

// Get current user action
export const getCurrentUser = createAsyncThunk(
  "auth/current",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    if (!token) {
      return rejectWithValue("No token found");
    }

    try {
      setAuthHeader(token); // Set token in headers
      const response = await axios.get("/auth/current", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch current user" }
      );
    }
  }
);
