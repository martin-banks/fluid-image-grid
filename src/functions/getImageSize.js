
function getImageSize(src) {
	let size = {}
	const newImg = new Image()
	// Use the first image of the srcSet to determine ratio
	newImg.src = src[Object.keys(src)[0]]
	newImg.onload = () => {
		size = {
			width: newImg.naturalWidth,
			height: newImg.naturalHeight,
			ratio: newImg.naturalHeight / newImg.naturalWidth,
		}
		// console.log('size', size)
	}
	// console.log('size', size)
	return size
}

export default getImageSize
