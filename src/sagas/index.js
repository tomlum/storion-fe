import { all } from 'redux-saga/effects'
import StorySagas from "./storySagas"

export default function* rootSaga() {
  yield all([
    StorySagas()
  ])
}
