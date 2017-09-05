
function detectMobile() {
	const isMobile = /iPad|Android|webOS|iPhone|iPod|Blackberry/.test(navigator.userAgent) && !window.MSStream;
	return isMobile
}

export default detectMobile
