import { all, put, takeLeading, call } from "redux-saga/effects"
import { authGet, authPost } from "auth"
import { expectUser } from "./auth"
import { setStore, errorStore, spatch, spaction, actionEnum } from "./utils"
import { loadingStart, loadingFinish } from "./loading"
import moment from "moment"

const FETCH_STORIES = actionEnum("FETCH_STORIES", [
  "request",
  "success",
  "failure"
])

export const fetchStories = spatch(FETCH_STORIES.request)

function* fetchStoriesSaga(action) {
  try {
    yield call(expectUser)
    yield put(loadingFinish)
    const stories = yield authGet(`/stories`)
    yield put(setStore(FETCH_STORIES.success, { stories: stories.data }))
    yield put(loadingFinish)
  } catch (e) {
    yield put(errorStore(FETCH_STORIES.failure, e.response.data))
    yield put(loadingFinish)
  }
}
// ----------------------------------------------------
// ----------------------------------------------------
const FETCH_STORY_ARTICLES = actionEnum("FETCH_STORY_ARTICLES", [
  "request",
  "success",
  "failure"
])

export const fetchStoryArticles = spatch(FETCH_STORY_ARTICLES.request, ["id"])

function* fetchStoryArticlesSaga({ id }) {
  try {
    yield call(expectUser)
    yield put(loadingStart)
    const articles = yield authGet(`/stories/${id}`)
    yield put(
      setStore(FETCH_STORY_ARTICLES.success, { articles: articles.data })
    )
    yield put(loadingFinish)
  } catch (e) {
    yield put(errorStore(FETCH_STORY_ARTICLES.failure, e.response.data))
    yield put(loadingFinish)
  }
}

export const FETCH_DESK_ARTICLES = actionEnum("FETCH_DESK_ARTICLES", [
  "request",
  "success",
  "failure"
])

export const fetchDeskArticles = spatch(FETCH_DESK_ARTICLES.request, ["id"])

function* fetchDeskArticlesSaga({ id }) {
  try {
    yield call(expectUser)
    yield put(loadingStart)
    const articlesRequest = yield authGet(`/desk`)
    const articles = articlesRequest.data
    const tags = {}
    let articleList = []
    articles.forEach(article => {
      articleList = article.tags
      article.time = moment(article.time)
      article.createdTime = moment(article.createdTime)
      article.tags = {}
      articleList.forEach(tag => {
        article.tags[tag] = true
        tags[tag] = true
      })
    })
    const tagList = Object.keys(tags).sort()
    yield put(
      setStore(FETCH_DESK_ARTICLES.success, {
        desk: { articles, tags, tagList }
      })
    )
    yield put(loadingFinish)
  } catch (e) {
    yield put(errorStore(FETCH_DESK_ARTICLES.failure, e.response.data))
    yield put(loadingFinish)
  }
}
// ----------------------------------------------------
// ----------------------------------------------------
const POST_ARTICLE = actionEnum("POST_ARTICLE", [
  "request",
  "success",
  "failure"
])

export const postArticle = spatch(POST_ARTICLE.request, ["article"])

function* postArticleSaga(action) {
  try {
    yield call(expectUser)
    yield put(loadingStart)
    const data = {
      id: action.article.id,
      headline: action.article.headline,
      tags: action.article.tags,
      link: action.article.link,
      time: action.article.time
    }
    yield authPost("/desk", data)
    yield put(spaction(POST_ARTICLE.success))
    yield put(spaction(FETCH_DESK_ARTICLES.request))
  } catch (e) {
    yield put(errorStore(POST_ARTICLE.failure, e.response.data))
    yield put(loadingFinish)
  }
}
// ----------------------------------------------------
// ----------------------------------------------------
export default function* StorySagas() {
  yield all([
    yield takeLeading(FETCH_STORIES.request, fetchStoriesSaga),
    yield takeLeading(FETCH_STORY_ARTICLES.request, fetchStoryArticlesSaga),
    yield takeLeading(FETCH_DESK_ARTICLES.request, fetchDeskArticlesSaga),
    yield takeLeading(POST_ARTICLE.request, postArticleSaga)
  ])
}
