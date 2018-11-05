export function action(effect, misc) {
	return { type: effect, ...misc }
}
