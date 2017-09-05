/*eslint-disable*/
import detectMobile from './detectMobile'
/*
	Control function repetition
	Useful for controlling how often functions are called on window scroll or resize
*/

const frame = 16
const delay = () => detectMobile() ? (2 * frame) : frame

function debounce(func, wait = delay(), immediate = true) {
	if(!func) {
		console.err('Debounce requires a callback as the first parameter')
		return
	}
	let timeout
	return function() {
		let context = this
		let args = arguments
		let later = function() {
			timeout = null
			if (!immediate) func.apply(context, args)
		}
		let callNow = immediate && !timeout
		clearTimeout(timeout)
		timeout = setTimeout(later, wait)
		if (callNow) func.apply(context, args)
	}
}

export default debounce
