
function siblings(selector) {
	const element = document.querySelector(selector)
	const childElements = Array.from(element.parentNode.children)
	return childElements.filter(child => child !== element)
}

export default siblings
