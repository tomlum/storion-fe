const defaultState = {
	stories: null,
	articles: null
}

export default function stories(state = defaultState, action) {
	switch (action.type) {
		case "EFX_FETCH_STORIES_S":
			return { ...state, stories: action.stories }
		case "EFX_FETCH_ARTICLES_S":
			return { ...state, articles: action.articles }
		default:
			return state
	}
}
