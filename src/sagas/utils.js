export { connect } from "react-redux"

export function spaction(effect, vars) {
	return { type: effect, ...vars }
}

export function setStore(type, values) {
	if (values) {
		return { SET: true, type, values }
	} else {
		return { SET: true, type: "SET", values: type }
	}
}

export function errorStore(type, message) {
	return { type: type, message: message }
}

// const actionsToProps = feedSpatch(
//   { fetchDeskArticles },
//   { searchType: e => ({ desk: { searchString: e.target.value } }) }
// )

export function feedSpatch(funcs, setters) {
	setters = setters || {}
	let newFuncs = {}
	return dispatch => {
		Object.keys(funcs).forEach(key => {
			newFuncs[key] = funcs[key](dispatch)
		})
		Object.keys(setters).forEach(key => {
			newFuncs[key] = (...args) => {
				dispatch(setStore(setters[key](...args)))
			}
		})
		return newFuncs
	}
}

export function actionEnum(name, list) {
	let actionsEnum = {}
	list.forEach(subAct => (actionsEnum[subAct] = name + "." + subAct))
	return actionsEnum
}

// Simple Dispatch
export function spatch(type, argNames) {
	return dispatch => {
		// What one would normally write in MapDispatchToProps
		return (...args) => {
			if (argNames) {
				const values = {}
				for (let i = 0; i < argNames.length; i++) {
					values[argNames[i]] = args[i]
				}
				return dispatch(spaction(type, values))
			} else {
				return dispatch(spaction(type))
			}
		}
	}
}
