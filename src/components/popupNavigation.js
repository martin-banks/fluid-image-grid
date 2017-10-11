import STATE from '../state'
import content from '../content/index'
import closest from '../functions/closest'
import delegate from '../functions/delegate'
import popupContent from './popup'
import config from '../config.json'

// Click delegate-functions for opening / navigating / closing fullscreen view
function handleClick(e) {
	STATE.popupOpen = true
	const elem = closest(e.target, '[data-type=image]')
	const i = parseInt(elem.getAttribute('data-index'), 10)
	STATE.popup.innerHTML = popupContent({ elem: content.parts[i], index: i })
}
function handleClose() {
	STATE.popupOpen = false
	STATE.popup.innerHTML = ''
}
function handleNext() {
	const button = document.querySelector('[data-nav="next"')
	const index = button ? parseInt(button.getAttribute('data-index'), 10) + 1 : 0
	STATE.popup.innerHTML = popupContent({ elem: content.parts[index], index })
}
function handlePrev() {
	const button = document.querySelector('[data-nav="prev"')
	const index = button ? parseInt(button.getAttribute('data-index'), 10) - 1 : content.parts.length - 1
	STATE.popup.innerHTML = popupContent({ elem: content.parts[index], index })
}

// Handle keyboard navigation of fullscreen view
function handleKeyboard(e) {
	const { keyCode } = e
	if (!STATE.popupOpen) return
	if (keyCode === 27) { // escape key
		e.preventDefault()
		handleClose()
	} else if (keyCode === 39) { // right arrow
		e.preventDefault()
		handleNext()
	} else if (keyCode === 37) { // left arrow
		e.preventDefault()
		handlePrev()
	}
}


function popupNavigation() {
	if (!STATE.mobile && config.allowClickToFullScreen) {
		// only for non-mobile devices
		// click any image to display full screen view
		// currently disabled for builds until feature set complete
		// features to add include nav icons, pagination dots and next/prev functionality
		delegate(`#${config.projectName}`, 'click', '[data-type=image]', handleClick)
		delegate(`#${config.projectName}`, 'click', '[data-nav=close]', handleClose)
		delegate(`#${config.projectName}`, 'click', '[data-nav="next"]', handleNext)
		delegate(`#${config.projectName}`, 'click', '[data-nav="prev"]', handlePrev)
		window.addEventListener('keyup', handleKeyboard)
	}
}

export default popupNavigation

