import { call, put, takeEvery, select } from "redux-saga/effects";
import { toast } from "react-toastify";

import api from "../../../services/api";

import {
  getFilms,
  getFilmsSuccess,
  getFilmsFailure,
  getSavedFilms,
  getSavedFilmsFailure,
  getSavedFilmsSuccess,
  saveFilms,
  saveFilmsFailure,
  saveFilmsSuccess,
  removeSavedFilms,
  removeSavedFilmsFailure,
  removeSavedFilmsSuccess,
  updateFilms,
  updateFilmsFailure,
  updateFilmsSuccess
} from ".";

toast.configure();

export default function* rootSaga() {
  yield takeEvery(getFilms, listSaga);
  yield takeEvery(getSavedFilms, getSavedSaga);
  yield takeEvery(saveFilms, saveSaga);
  yield takeEvery(removeSavedFilms, removeSaga);
  yield takeEvery(updateFilms, updateListSaga);
}

function* listSaga({ payload }) {
  const { title, page = 1 } = payload;
  try {
    const { data } = yield call(api.get, "/", {
      params: {
        Title: title,
        page
      }
    });
    yield put(getFilmsSuccess({ data, title }));
  } catch (error) {
    yield put(getFilmsFailure(error.toString()));
  }
}

function* updateListSaga() {
  const { films } = yield select();
  try {
    const { data } = yield call(api.get, "/", {
      params: {
        Title: films.currentSearch,
        page: films.currentPage + 1
      }
    });
    yield put(updateFilmsSuccess(data));
  } catch (error) {
    yield put(updateFilmsFailure(error.toString()));
  }
}

function* getSavedSaga() {
  try {
    if (localStorage.getItem("filmList") === null) {
      const newFilmsArray = [];
      localStorage.setItem("filmList", JSON.stringify(newFilmsArray));
      yield put(getSavedFilmsSuccess(newFilmsArray));
    } else {
      const filmsArray = JSON.parse(localStorage.getItem("filmList"));
      yield put(getSavedFilmsSuccess(filmsArray));
    }
  } catch (error) {
    toast.error("Erro ao carregar os filmes salvos!");
    yield put(getSavedFilmsFailure(error.toString()));
  }
}

function* saveSaga({ payload }) {
  try {
    if (localStorage.getItem("filmList") === null) {
      const newFilmsArray = [];
      newFilmsArray.push(payload);
      localStorage.setItem("filmList", JSON.stringify(newFilmsArray));
      toast.success("Filme Salvo!");
      yield put(saveFilmsSuccess(newFilmsArray));
    } else {
      const filmsArray = JSON.parse(localStorage.getItem("filmList"));
      filmsArray.push(payload);
      localStorage.setItem("filmList", JSON.stringify(filmsArray));
      toast.success("Filme Salvo!");
      yield put(saveFilmsSuccess(filmsArray));
    }
  } catch (error) {
    toast.error("Erro ao salvar o filme!");
    yield put(saveFilmsFailure(error.toString()));
  }
}

function* removeSaga({ payload }) {
  try {
    const filmsArray = JSON.parse(localStorage.getItem("filmList"));
    const newFilmArray = filmsArray.filter(function(el) {
      return el.Title !== payload.Title;
    });
    localStorage.setItem("filmList", JSON.stringify(newFilmArray));
    toast.warning("Filme removido!");
    yield put(removeSavedFilmsSuccess(newFilmArray));
  } catch (error) {
    toast.error("Erro ao remover o filme!");
    yield put(removeSavedFilmsFailure(error.toString()));
  }
}
