import { all, put, takeLatest } from 'redux-saga/effects'
import axios from "axios"

function* fetchStories(action) {
   try {
      const stories = yield axios.get("http://localhost:5000/stories")
      yield put({type: "EFX_FETCH_STORIES_S", stories: stories.data});
   } catch (e) {
      yield put({type: "EFX_FETCH_STORIES_F", message: e.message});
   }
}

function* fetchArticles(action) {
   try {
      const articles = yield axios.get(`http://localhost:5000/stories/${action.id}`)
      yield put({type: "EFX_FETCH_ARTICLES_S", articles: articles.data});
   } catch (e) {
      yield put({type: "EFX_FETCH_ARTICLES_F", message: e.message});
   }
}

function* storySagas() {
  yield all([
    yield takeLatest("EFX_FETCH_STORIES_R", fetchStories),
    yield takeLatest("EFX_FETCH_ARTICLES_R", fetchArticles)
  ])
}

export default storySagas;