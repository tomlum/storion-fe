import { all } from "redux-saga/effects"
import StorySagas from "./stories"
import AuthSagas from "./auth"

export default function* rootSaga() {
	if (!process.env.REACT_APP_DEBUG_API) {
		yield all([StorySagas(), AuthSagas()])
	}
}
