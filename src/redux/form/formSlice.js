import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formType: "home", // 'home', 'login', 'register'
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormType: (state, action) => {
      state.formType = action.payload;
    },
  },
});

export const { setFormType } = formSlice.actions;

export default formSlice.reducer;
