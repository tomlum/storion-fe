import { all, put, takeLeading, call } from "redux-saga/effects"
import { authGet } from "auth"
import { expectUser } from "./auth"
import { setStore, errorStore, spatch, actionEnum } from "./utils"

const FETCH_STORIES = actionEnum("FETCH_STORIES", [
  "request",
  "success",
  "failure"
])

export const fetchStories = spatch(FETCH_STORIES.request)

function* fetchStoriesSaga(action) {
  try {
    yield call(expectUser)
    const stories = yield authGet(`${process.env.REACT_APP_API_URL}/stories`)
    yield put(setStore(FETCH_STORIES.success, { stories: stories.data }))
  } catch (e) {
    yield put(errorStore(FETCH_STORIES.failure, e.message))
  }
}
// ----------------------------------------------------
// ----------------------------------------------------
const FETCH_ARTICLES = actionEnum("FETCH_ARTICLES", [
  "request",
  "success",
  "failure"
])
export const FETCH_DESK_ARTICLES = actionEnum("FETCH_DESK_ARTICLES", [
  "request",
  "success",
  "failure"
])

export const fetchStoryArticles = spatch(FETCH_ARTICLES.request, ["id"])

function* fetchStoryArticlesSaga({ id }) {
  try {
    yield call(expectUser)
    const articles = yield authGet(
      `${process.env.REACT_APP_API_URL}/stories/${id}`
    )
    yield put(setStore(FETCH_ARTICLES.success, { articles: articles.data }))
  } catch (e) {
    yield put(errorStore(FETCH_ARTICLES.failure, e.message))
  }
}

export const fetchDeskArticles = spatch(FETCH_DESK_ARTICLES.request, ["id"])

function* fetchDeskArticlesSaga({ id }) {
  try {
    yield call(expectUser)
    const articles = yield authGet(`${process.env.REACT_APP_API_URL}/desk`)
    yield put(
      setStore(FETCH_DESK_ARTICLES.success, { desk: { articles: articles.data } })
    )
  } catch (e) {
    yield put(errorStore(FETCH_DESK_ARTICLES.failure, e.message))
  }
}

// ----------------------------------------------------
// ----------------------------------------------------
function* StorySagas() {
  yield all([
    yield takeLeading(FETCH_STORIES.request, fetchStoriesSaga),
    yield takeLeading(FETCH_ARTICLES.request, fetchStoryArticlesSaga),
    yield takeLeading(FETCH_DESK_ARTICLES.request, fetchDeskArticlesSaga)
  ])
}

export default StorySagas
