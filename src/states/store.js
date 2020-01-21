import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'

import films, { filmsSaga } from './modules/films'

const sagaMiddleware = createSagaMiddleware()

const middleware = [...getDefaultMiddleware(), sagaMiddleware]

const store = configureStore({
	reducer: {
		films,
	},
	middleware,
})

const rootSaga = function*() {
	yield all([filmsSaga()])
}

sagaMiddleware.run(rootSaga)

export default store
