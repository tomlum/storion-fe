import { all, put, takeLatest } from "redux-saga/effects"
import auth0Client from "../auth"
import { setStore, errorStore, spatch } from "./utils"

const GET_AUTH = {
  silent: "GET_AUTH_SILENT",
  success: "GET_AUTH_SUCCESS",
  failure: "GET_AUTH_FAILURE"
}

export const silentAuth = spatch(GET_AUTH.silent)

function* silentAuthSaga(action) {
  try {
    yield auth0Client.silentAuth()
    yield put(setStore(GET_AUTH.success, {user: auth0Client.getProfile()}))
  } catch (e) {
    yield put(errorStore(GET_AUTH.failure, e.message))
  }
}

function* AuthSagas() {
  yield all([yield takeLatest(GET_AUTH.silent, silentAuthSaga)])
}

export default AuthSagas
