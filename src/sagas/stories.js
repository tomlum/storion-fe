import { all, put, takeLatest } from "redux-saga/effects"
import { authGet } from "../auth"
import { setStore, errorStore, spatch } from "./utils"

const FETCH_STORIES = {
  request: "FETCH_STORIES_REQUEST",
  success: "FETCH_STORIES_SUCCESS",
  failure: "FETCH_STORIES_FAILURE"
}

export const fetchStories = spatch(FETCH_STORIES.request)

function* fetchStoriesSaga(action) {
  try {
    const stories = yield authGet(`${process.env.REACT_APP_API_URL}/stories`)
    yield put(setStore(FETCH_STORIES.success, { stories: stories.data }))
  } catch (e) {
    yield put(errorStore(FETCH_STORIES.failure, e.message))
  }
}
// ----------------------------------------------------
// ----------------------------------------------------
export const FETCH_ARTICLES = {
  request: "FETCH_ARTICLES_REQUEST",
  success: "FETCH_ARTICLES_SUCCESS",
  failure: "FETCH_ARTICLES_FAILURE"
}

export const fetchArticles = spatch(FETCH_ARTICLES.request, ["id"])

function* fetchArticlesSaga({ id }) {
  try {
    console.log("id >>>> ",id)
    const articles = yield authGet(
      `${process.env.REACT_APP_API_URL}/stories/${id}`
    )
    yield put(setStore(FETCH_ARTICLES.success, { articles: articles.data }))
  } catch (e) {
    yield put(errorStore(FETCH_ARTICLES.failure, e.message))
  }
}

// ----------------------------------------------------
// ----------------------------------------------------
function* StorySagas() {
  yield all([
    yield takeLatest(FETCH_STORIES.request, fetchStoriesSaga),
    yield takeLatest(FETCH_ARTICLES.request, fetchArticlesSaga)
  ])
}

export default StorySagas
