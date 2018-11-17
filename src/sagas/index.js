import { all } from 'redux-saga/effects'
import StorySagas from "./stories"
import AuthSagas from "./auth"

export default function* rootSaga() {
  yield all([
    StorySagas(),
    AuthSagas()
  ])
}
