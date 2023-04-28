import { configureStore } from "@reduxjs/toolkit";
import HomeSlice from "./Home/HomeSlice";
import MenuSlice from "./Menu/MenuSlice";
const store = configureStore({
  reducer: {
    Home: HomeSlice,
    Menu: MenuSlice,
  },
});

export default store;
