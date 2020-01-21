import { createSlice } from '@reduxjs/toolkit'
import extend from 'lodash/extend'

const initialState = {
	films: [],
	savedFilms: [],
}

const { actions, reducer } = createSlice({
	name: 'assets',
	initialState,
	reducers: {
		getFilms: state => state,
		getFilmsFailure: state => state,
		getFilmsSuccess: (state, { payload }) =>
			extend(state, { films: payload}),
    saveFilms: state => state,
		saveFilmsFailure: state => state,
		saveFilmsSuccess: (state, { payload }) =>
			extend(state, { savedFilms: payload}),
    removeSavedFilms: state => state,
		removeSavedFilmsFailure: state => state,
		removeSavedFilmsSuccess: (state, { payload }) =>
			extend(state, { savedFilms: payload}),
	}
})

export const {
	getFilms,
	getFilmsFailure,
  getFilmsSuccess,
  saveFilms,
  saveFilmsFailure,
  saveFilmsSuccess,
  removeSavedFilms,
  removeSavedFilmsFailure,
  removeSavedFilmsSuccess
} = actions

export { default as filmsSaga } from './sagas'

export default reducer
