import STATE from '../state'
import config from '../config.json'

// calcualte which image to render
// Finds closest multiple of the img Increment to the screen width

function fullScreenImageSize() {
	const w = STATE.window.width
	const { inc, min, max } = config.images.sizes
	const prefix = config.images.jsPrefix
	const calcW = (Math.ceil(w / inc)) * inc

	if (calcW > max) {
		return `${prefix}${max}`
	} else if (calcW < min) {
		return `${prefix}${min}`
	}
	return `${prefix}${calcW}`
}

export default fullScreenImageSize
