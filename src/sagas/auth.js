import { all, put, select, takeLeading, take } from "redux-saga/effects"
import auth0Client from "auth"
import { spaction, setStore, spatch, actionEnum } from "./utils"

const GET_AUTH = actionEnum("GET_AUTH", ["silent", "success", "failure"])

export function* expectUser(action) {
  yield put(spaction(GET_AUTH.silent))
  let user;
  while (!user) {
    yield take('*')
    user = select(({ user }) => user)
  }
}

export const silentAuth = spatch(GET_AUTH.silent)

export function* silentAuthSaga(action) {
  try {
    yield auth0Client.silentAuth()
    yield put(setStore(GET_AUTH.success, { user: auth0Client.getUser() }))
  } catch (e) {
    yield put(
      setStore(GET_AUTH.failure, {
        error: e.message,
        user: auth0Client.nullUser
      })
    )
  }
}

function* AuthSagas() {
  yield all([yield takeLeading(GET_AUTH.silent, silentAuthSaga)])
}

export default AuthSagas
