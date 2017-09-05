import STATE from '../state'
import ImgInc from '../../imgIncrement'

// calcualte which image to render
// Finds closest multiple of the img Increment to the screen width

function chooseImgSize() {
	const w = STATE.window.width
	const { inc, min, max } = ImgInc
	const calcW = (Math.ceil(w / inc)) * inc
	// console.log(w, { calcW })
	if (calcW > max) {
		return `Img${max}`
	} else if (calcW < min) {
		return `Img${min}`
	}
	return `Img${calcW}`
}

export default chooseImgSize
