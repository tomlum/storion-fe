const defaultState = {}

function setters(state = {}, action) {
	return { ...state, ...action.values }
}

export default function main(state = defaultState, action) {
	if (action.SET) {
		return setters(state, action)
	} else {
		return state
	}
}
