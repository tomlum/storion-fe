export function action(effect, vars) {
	return { type: effect, ...vars }
}

export function setStore(type, values) {
	return { SET: true, type, values }
}

export function errorStore(type, message) {
	return { type: type, message: message }
}

export function feedSpatch(funcs) {
	return dispatch => {
		Object.keys(funcs).forEach(key => {
			funcs[key] = funcs[key](dispatch)
		})
		console.log("funcs >>>>>> ", funcs)
		return funcs
	}
}

export function spatch(act, argNames) {
	return dispatch => {
		return (...args) => {
			if (argNames) {
				const values = {}
				for (let i = 0; i < argNames.length; i++) {
					values[argNames[i]] = args[i]
				}
				console.log("values >>>>>> ", values)
				return dispatch(action(act, values))
			} else {
				return dispatch(action(act))
			}
		}
	}
}
