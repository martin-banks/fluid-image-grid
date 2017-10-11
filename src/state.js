import isMobileDevice from './functions/isMobileDevice'

// Set some default variables that are used in the app

// We use a function to set various values into state
// this allows us to re-write it all if needed
// for example when resizing the window
// -- move to expternal file --
const longform = document.querySelector('.longform-group')
const standardMetro = document.querySelector('.content .story')
const standardNews = document.querySelector('#page #story')


const STATE = {
	// window: {
	// 	width: window.innerWidth,
	// 	height: window.innerHeight,
	// },
	mobile: isMobileDevice(),
	rowWidths: [0],
	isLongform: !!longform,
	isStandard: !!standardMetro || !!standardNews,
}

export default STATE