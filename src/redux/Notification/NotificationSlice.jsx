import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null,
};

const NotificationSlice = createSlice({
  name: "Notification",
  initialState,
  reducers: {
    renderNotification: (state, { payload }) => {
      return {
        ...state,
        info: payload,
      };
    },
  },
});

export const {renderNotification} = NotificationSlice.actions;
export default NotificationSlice.reducer