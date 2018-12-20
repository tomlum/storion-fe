function stringCompare(a, b) {
	return a.localeCompare(b)
}

function mod(n, m) {
	return (n % m + m) % m
}

function arrayRemove(array, value) {
	array.splice(array.indexOf(value), 1)
}

function charToHue(string){
	return (mod(string.slice(-1).toLowerCase().charCodeAt(0), 30)/30)*(360)
}

module.exports = {
	string: {
		compare: stringCompare
	},
	math: {
		mod
	},
	array: {
		remove: arrayRemove
	},
	color: {
		charToHue
	}
}
