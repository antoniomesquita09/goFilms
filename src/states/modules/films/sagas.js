import { call, put, takeEvery, select } from "redux-saga/effects";
import { toast } from "react-toastify";

import api from "../../../services/api";

import {
  getFilms,
  getFilmsSuccess,
  getFilmsFailure,
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

function* saveSaga({ payload }) {
  try {
    const filmsArray = JSON.parse(localStorage.getItem("filmList"));
    if (!filmsArray) {
      const filmsArray = [];
      if (payload) {
        filmsArray.push(payload);
        localStorage.setItem("filmList", JSON.stringify(filmsArray));
      }
      toast.success("Filme Salvo!");
      yield put(getFilmsSuccess(filmsArray));
    } else {
      if (payload) {
        filmsArray.push(payload);
        localStorage.setItem("filmList", JSON.stringify(filmsArray));
        toast.success("Filme Salvo!");
      }
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
