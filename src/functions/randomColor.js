
function randomColor() {
	const randomChannel = () => Math.floor(Math.random() * 255)
	const randomAlpha = () => Math.random()
	return `rgba(${randomChannel()}, ${randomChannel()}, ${randomChannel()}, ${randomAlpha()})`
}

export default randomColor
