export function action(effect, misc) {
	return { type: effect, ...misc }
}

export function setStore(type, name, obj) {
	return {type, name, obj }
}

export function errorStore(type, message) {
	return {type: type, message: message }
}
