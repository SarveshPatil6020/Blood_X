import { createSlice } from "@reduxjs/toolkit";
const alertSlice = createSlice({
  name: "alert",
  initialState: { text: "", type: "" },
  reducers: {
    showAlert: (state, action) => {
      state.text = action.payload.text;
      state.type = action.payload.type;
    },
    hideAlert: (state) => {
      state.text = "";
      state.type = "";
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;
