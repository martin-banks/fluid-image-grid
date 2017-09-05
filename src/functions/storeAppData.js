function storeAppData(STATE) {
	const { w = innerWidth, h = innerHeight } = window
	STATE.window = {
		width: w,
		height: h,
		orientation: w >= h ? 'landscape' : 'portrait',
		ratio: w / h,
	}
	STATE.appData = {
		top: document.querySelector(`#${STATE.projectName}`).getBoundingClientRect().top,
	}
}

export default storeAppData
