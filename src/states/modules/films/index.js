import { createSlice } from "@reduxjs/toolkit";
import extend from "lodash/extend";

const initialState = {
  films: [],
  savedFilms: [],
  totalPages: null,
  currentPage: null,
  currentSearch: ""
};

const { actions, reducer } = createSlice({
  name: "assets",
  initialState,
  reducers: {
    getFilms: state => state,
    getFilmsFailure: state => state,
    getFilmsSuccess: (state, { payload }) => {
      extend(state, {
        films: payload.data.data,
        totalPages: payload.data.total_pages,
        currentPage: parseInt(payload.data.page),
        currentSearch: payload.title
      });
    },
    saveFilms: state => state,
    saveFilmsFailure: state => state,
    saveFilmsSuccess: (state, { payload }) =>
      extend(state, { savedFilms: payload }),
    removeSavedFilms: state => state,
    removeSavedFilmsFailure: state => state,
    removeSavedFilmsSuccess: (state, { payload }) =>
      extend(state, { savedFilms: payload }),
    updateFilms: state => state,
    updateFilmsFailure: state => state,
    updateFilmsSuccess: (state, { payload }) =>
      extend(state, {
        films: [...state.films, ...payload.data],
        currentPage: parseInt(payload.page)
      })
  }
});

export const {
  getFilms,
  getFilmsFailure,
  getFilmsSuccess,
  saveFilms,
  saveFilmsFailure,
  saveFilmsSuccess,
  removeSavedFilms,
  removeSavedFilmsFailure,
  removeSavedFilmsSuccess,
  updateFilms,
  updateFilmsFailure,
  updateFilmsSuccess
} = actions;

export { default as filmsSaga } from "./sagas";

export default reducer;
