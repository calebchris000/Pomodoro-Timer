import { configureStore } from "@reduxjs/toolkit";
import HomeSlice from "./Home/HomeSlice";
import MenuSlice from "./Menu/MenuSlice";
import NotificationSlice from "./Notification/NotificationSlice";
import TimerSlice from "./Timer/TimerSlice";

const store = configureStore({
  reducer: {
    Home: HomeSlice,
    Menu: MenuSlice,
    Notification: NotificationSlice,
    Pomodoro: TimerSlice
  },
});

export default store;
