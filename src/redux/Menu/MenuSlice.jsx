import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menuActive: false,
  musicFiles: [],
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
    loadMusicFiles: (_, { payload }) => {
      return {
        musicFiles: payload,
      };
    },
  },
});

export const { toggleMenu, loadMusicFiles } = MenuSlice.actions;
export default MenuSlice.reducer;
