export {connect} from "react-redux"

export function spaction(effect, vars) {
	return { type: effect, ...vars }
}

export function setStore(type, values) {
	return { SET: true, type, values }
}

export function errorStore(type, message) {
	return { type: type, message: message }
}

export function feedSpatch(funcs) {
	let newFuncs = {}
	return dispatch => {
		Object.keys(funcs).forEach(key => {
			newFuncs[key] = funcs[key](dispatch)
		})
		return newFuncs
	}
}

export function actionEnum(name, list) {
	let actionsEnum = {}
	list.forEach((subAct) => actionsEnum[subAct] = name+"."+subAct)
	return actionsEnum
}

export function spatch(action, argNames) {
	return dispatch => {
		return (...args) => {
			if (argNames) {
				const values = {}
				for (let i = 0; i < argNames.length; i++) {
					values[argNames[i]] = args[i]
				}
				return dispatch(spaction(action, values))
			} else {
				return dispatch(spaction(action))
			}
		}
	}
}
