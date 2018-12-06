import { all, put, takeLeading, call } from "redux-saga/effects"
import { authGet, authPost } from "auth"
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
    const stories = yield authGet(`/stories`)
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
    const articles = yield authGet(`/stories/${id}`)
    yield put(setStore(FETCH_ARTICLES.success, { articles: articles.data }))
  } catch (e) {
    yield put(errorStore(FETCH_ARTICLES.failure, e.message))
  }
}

export const fetchDeskArticles = spatch(FETCH_DESK_ARTICLES.request, ["id"])

function* fetchDeskArticlesSaga({ id }) {
  try {
    yield call(expectUser)
    const articlesRequest = yield authGet(`/desk`)
    const articles = articlesRequest.data
    const tags = {}
    let articleTags = []
    articles.forEach(article => {
      articleTags = article.tags.split("/$/")
      article.tags = {}
      articleTags.forEach(tag => {
        article.tags[tag] = 1
        tags[tag] = 1
      })
    })
    yield put(
      setStore(FETCH_DESK_ARTICLES.success, {
        desk: { articles, tags }
      })
    )
  } catch (e) {
    yield put(errorStore(FETCH_DESK_ARTICLES.failure, e.message))
  }
}
// ----------------------------------------------------
// ----------------------------------------------------
const POST_ARTICLE = actionEnum("POST_ARTICLE", [
  "request",
  "success",
  "failure"
])

export const postArticle = spatch(POST_ARTICLE.request, ["data"])

function* postArticleSaga(action) {
  try {
    yield call(expectUser)
    yield authPost("/desk", action.data)
    yield put(action(POST_ARTICLE.success))
  } catch (e) {
    yield put(errorStore(POST_ARTICLE.failure, e.message))
  }
}
// ----------------------------------------------------
// ----------------------------------------------------
function* StorySagas() {
  yield all([
    yield takeLeading(FETCH_STORIES.request, fetchStoriesSaga),
    yield takeLeading(FETCH_ARTICLES.request, fetchStoryArticlesSaga),
    yield takeLeading(FETCH_DESK_ARTICLES.request, fetchDeskArticlesSaga),
    yield takeLeading(POST_ARTICLE.request, postArticleSaga)
  ])
}

export default StorySagas
