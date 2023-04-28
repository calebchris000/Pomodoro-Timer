import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menuActive: false,
};

const MenuSlice = createSlice({
  name: "menu",
  initialState,

  reducers: {
    toggleMenu: (state) => {
      return {
        ...state,
        menuActive: !state.menuActive,
      };
    },
  },
});

export const { toggleMenu } = MenuSlice.actions;
export default MenuSlice.reducer;
