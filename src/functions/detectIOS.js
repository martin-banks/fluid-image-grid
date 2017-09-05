
function detectIOS() {
	const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
	return isIOS
}

export default detectIOS
