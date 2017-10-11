
// Helper functions
// Force number to position value
const makePositive = num => Math.sqrt(num ** 2)

// Restrict number within a range positive/negative values
// Default is between -1 and 1
function limitRange({ number = null, limit = 1 } = {}) {
	if ((number !== 0 && !number) || typeof number !== 'number') {
		console.error(`Number to limit is ${typeof number} type. \nIt should be a number or float`)
		return ''
	}
	if (number > limit) {
		return limit
	} else 	if (number < (0 - limit)) {
		return (0 - limit)
	}
	return number
}

// Values are calculated and stored in an object.
// This converts themto an array, joins and returns as a string to be assigned
function joinStyles({ styles = null, useKeys = true } = {}) {
	if (!styles) {
		console.error('An object of values must be specified')
		return ''
	}
	return Object.keys(styles).map(key => `${useKeys ? `${key}(` : ''}${styles[key]}${useKeys ? ')' : ''}`).join(' ')
}


// Variables required for hover functions
let TILES = null
let hoverTile = null
let appContainer = null


function getMousePosition(e) {
	const { clientX: x, clientY: y } = e
	const { left, top, width, height } = hoverTile
	const tileX = x - left - (width / 2) - appContainer.left
	const tileY = y - top - (height / 2) - appContainer.top
	let pctX = limitRange({ number: ((tileX / width) * 2) * -1 })
	let pctY = limitRange({ number: (tileY / height) * 2 })
	const highlight = hoverTile.elem.querySelector('[data-type="highlight"]').querySelector('div')
	const overlay = hoverTile.elem.querySelector('[data-type="overlay"]')
	const text = overlay.querySelectorAll('p, h3')
	const inner = hoverTile.elem.querySelector('[data-type="inner"]')
	const img = inner.querySelector('img')
	const maxPct = Math.max(makePositive(pctX), makePositive(pctY))

	// Define all styles that will change here.
	// They will be converted to strings by helper function

	// Shadow style values
	const SHADOW = {
		x: `${pctX * -1 * 40}px`,
		y: `${pctY * 40}px`,
		blur: `${maxPct * 80}px`,
		distance: '0px',
		rgba: `0,0,0, ${1 - (Math.max(0.4, (maxPct - 0.6)))}`,
	}
	const TEXTSHADOW = {
		x: `${pctX * -1 * 8}px`,
		y: `${pctY * 8}px`,
		blur: `${maxPct * 20}px`,
		distance: '0px',
		rgba: `0,0,0, ${1 - (Math.max(0.4, (maxPct - 0.6)))}`,
	}

	// common values used in multiple transforms
	const POSITION = {
		x: 100 * pctX * -1,
		y: 100 * pctY,
	}

	// Text, highlight and image transform values
	const TEXTPOSITION = {
		translateX: `${-1 * POSITION.x * 0.05}%`,
		translateY: `${-1 * POSITION.y * 0.2}%`,
		scale: (((POSITION.x + POSITION.y) / 2) / 1000) + 1,
	}

	const HIGHLIGHTPOSITION = {
		translateX: `${-1 * (pctX * width * 0.75)}px`,
		translateY: `${pctY * (height * 0.75)}px`,
	}
	const IMGTRANSFORM = {
		translateX: `${1 * POSITION.x * 0.015}%`,
		translateY: `${1 * POSITION.y * 0.015}%`,
		scale: '1.2',
	}


	// requesting animatoin frame to help to reduce risk of jank
	window.requestAnimationFrame(() => {
		inner.style.transform = `rotateX(${pctY * 1}deg) rotateY(${pctX * 1}deg) scale(1.1)`
		overlay.style.transform = 'translateY(0)'
		Array.from(text).forEach(node => {
			node.style.transform = joinStyles({ styles: TEXTPOSITION, useKeys: true })
			node.style.textShadow = joinStyles({ styles: TEXTSHADOW, useKeys: false })
		})
		inner.style.boxShadow = joinStyles({ styles: SHADOW, useKeys: false })
		highlight.style.transform = joinStyles({ styles: HIGHLIGHTPOSITION, useKeys: true })
		img.style.transform = joinStyles({ styles: IMGTRANSFORM, useKeys: true })
	})
}


function tiltHover(e) {
	TILES.forEach(tile => {
		const inner = tile.querySelector('[data-type="inner"]')
		inner.style.transform = ''
		inner.style.boxShadow = ''
	})

	const {
		offsetWidth: width,
		offsetHeight: height,
		offsetTop: top,
		offsetLeft: left,
	} = this;

	const highlight = this.querySelector('[data-type="highlight"]').querySelector('div')
	const center = {
		x: left + (width / 2),
		y: (top - window.scrollY) + (height / 2),
	}
	console.log('setting hoverTile')
	hoverTile = {
		top: (top - window.scrollY),
		left,
		width,
		height,
		center,
		elem: this,
	}
	highlight.style.opacity = 1
}


function tiltReset(e) {
	const inner = this.querySelector('[data-type="inner"]')
	const highlight = this.querySelector('[data-type="highlight"]').querySelector('div')
	const overlay = this.querySelector('[data-type="overlay"]')
	TILES.forEach(tile => { tile.querySelector('[data-type="inner"]').style.transform = '' })
	highlight.style.opacity = 0
	inner.style.transform = ''
	inner.style.boxShadow = ''
	overlay.style.transform = ''
}


// REAFCTOR AS DELEGATE
function tiltOnHover({ targets = null, wrapper = null, app = null } = {}) {
	if (!targets) console.error('The targets array was not defined')
	if (!wrapper) console.error('A wrapper dom element was not defined')
	if (!app) console.error('App position left and width required')
	if (!wrapper || !targets || !app) return
	TILES = Array.from(targets)
	appContainer = app

	TILES.forEach(tile => {
		console.log(tile)
		tile.addEventListener('mouseover', tiltHover)
		tile.addEventListener('mouseleave', tiltReset)
	})
	wrapper.addEventListener('mouseleave', tiltReset)
	wrapper.addEventListener('mousemove', getMousePosition)
	console.log(TILES[0].eventListener)
}

export default tiltOnHover
