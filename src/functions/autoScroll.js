import STATE from '../state'

function autoScroll({ speed = 30, pageAutoScroll } = {}) {
	console.warn('Auto scroll started', speed)

	STATE.pageAutoScroll = setInterval(() => {
		window.scrollBy(0, 1)
		// if (window.scrollY + window.innerHeight > 1000) stopScroll(pageAutoScroll)
		if (window.scrollY + window.innerHeight > document.body.offsetHeight) stopScroll()
		// console.log(window.scrollY + window.innerHeight, document.body.offsetHeight)
	}, speed)
}

function stopScroll() {
	console.warn('Auto scroll stopped')
	clearInterval(STATE.pageAutoScroll)
}

export default autoScroll
