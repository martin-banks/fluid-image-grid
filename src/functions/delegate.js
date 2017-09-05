import closest from './closest'

function delegate(selector, eventName, targetSelector, listener) {
	document.querySelector(selector).addEventListener(eventName, function (event) {
		const closestMatch = closest(event.target, targetSelector)
		if (closestMatch) {
			event.delegateTarget = closestMatch
			listener(event)
		}
	})
}

export default delegate
