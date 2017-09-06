import config from './config.json'
import content from './content/index'
import Styles from './app.sass'
import isMobileDevice from './functions/isMobileDevice'
import createSrcSet from './functions/createSrcSet'
import delegate from './functions/delegate'
import closest from './functions/closest'
import MKDOWN from './functions/handleMarkdown'
import * as icons from './icons/icons'


const customLog = [
	'background-color: #bada55',
	'color: #000',
	'padding: 4px 8px',
	'font-family: "Roboto"',
	'border-radius: 4px',
].join(';')

// Set some default variables that are used in the app
let STATE = null
// We use a function to set various values into state
// this allows us to re-write it all if needed
// for example when resizing the window
// -- move to expternal file --
const longform = document.querySelector('.longform-group')
const standardMetro = document.querySelector('.content .story')
const standardNews = document.querySelector('#page #story')
// we store the project name in the config json file so it can be
// referenced by other functions in particular the webpack config scripts
// here we store the selector for the main app container
const APP = document.querySelector(`#${config.projectName}`)
const isTestEnv = () => ['localhost', '127.0.0.1'].indexOf(window.location.hostname) !== -1


function storeDataInState() {
	STATE = {
		window: {
			width: window.innerWidth,
			height: window.innerHeight,
		},
		mobile: isMobileDevice(),
		rowWidths: [0],
		isLongform: !!longform,
		isStandard: !!standardMetro || !!standardNews,
	}
}


// split images into row arrays
// add images until the total width exceeds that of the window
// using the image ratio to get proportional width from default row height
// then create new row array
// store the row width in STATE object - this is used to calculate how much grid items are shrunk by later
function calculateRows({ rowHeight, maxHeight, currentRow, margin }) {
	let rowNumber = currentRow
	const indexedcontent = content.parts.map((part, i) => {
		part.index = i
		return part
	})
	const ROWS = indexedcontent.reduce((output, part) => {
		// console.log(part)
		let update = output
		const lastIndex = Math.max(0, update.length - 1)
		const lastRow = update[lastIndex]
		let rowWidth = 0
		if (lastRow) {
			rowWidth = lastRow.reduce((total, img) => (total + (rowHeight / img.image.ImgData.ratio)) + (margin * 2), 0)
			if (rowWidth < STATE.window.width) {
				// console.log('im under!! adding to row', rowWidth)
				lastRow.push(part)
				STATE.rowWidths[rowNumber] = (rowWidth + (rowHeight / part.image.ImgData.ratio)) + (margin * 2)
			} else {
				// console.log('im over!! creating new row', rowWidth)
				// STATE.rowWidths[rowNumber] = rowWidth
				rowNumber++
				STATE.rowWidths[rowNumber] = (rowHeight / part.image.ImgData.ratio) + (margin * 2)
				update.push([part])
			}
		} else {
			update.push([part])
		}
		return update
	}, [])
	return ROWS
}


function overlayTemplate({ title, caption, credit }) {
	return `<div class="${Styles.overlay}">
		${title ? `<h3 class="${Styles.overlay__title}">${MKDOWN(title)}</h3>` : ''}
		${caption ? `<p class="${Styles.overlay__caption}">${MKDOWN(caption)}</p>` : ''}
		${credit ? `<p class="${Styles.overlay__credit}">${MKDOWN(credit)}</p>` : ''}
	</div>`
}

// row and image template
// needs refactor / tidying
function fluidGridTemplate({ rowHeight, maxHeight, currentRow, margin }) {
	const desktop = () => calculateRows({ rowHeight, maxHeight, currentRow, margin }).map((row, i) => {
		const thisRowWidth = STATE.rowWidths[i]
		const windowWidth = STATE.window.width
		const rowHeightAdjustment = Math.min(windowWidth, thisRowWidth) / thisRowWidth
		const newRowHeight = Math.min((rowHeight * rowHeightAdjustment), maxHeight)

		const rowTemplate = row.map(img => {
			const { image, credit, caption, title, index } = img
			return `<div 
				class="${Styles.image}" 
				data-type="image"
				data-index="${index}"
				style="
					height: ${newRowHeight}px; 
					width: ${newRowHeight / image.ImgData.ratio}px;
					margin: ${margin / 2}px;
				"
			>
				<div class="${Styles.image__wrapper}" style="background-image: url('${image.ImgthumbBlurLarge}')">
					<img src="${image.Img400}" srcset="${createSrcSet(image)}" alt="" />
				</div>
				${overlayTemplate({ title, caption, credit })}
			</div>`
		}).join('')

		return `${i === 0 ? `<section class="${Styles.popup}" data-type="popup"></section>` : ''}
		<section class="${Styles.row}">
			${rowTemplate}
		</section>`
	}).join('')


	const mobile = () => content.parts.map(part => {
		const { image, credit, caption, title } = part
		return `<section class="${Styles.row}">
			<div 
				class="${Styles.image}" 
				style=""
			>
				<div class="${Styles.image__wrapper}" style="background-image: url('${image.ImgthumbBlurLarge}')">
					<img src="${image.Img400}" srcset="${createSrcSet(image)}" alt="" />
				</div>
				<div class="${Styles.overlay}">
					${title ? `<h3 class="${Styles.overlay__title}">${title}</h3>` : ''}
					${caption ? `<p class="${Styles.overlay__caption}">${caption}</p>` : ''}
					${credit ? `<p class="${Styles.overlay__credit}">${credit}</p>` : ''}
				</div>
			</div>
		</section>`
	}).join('')

	return { desktop, mobile }
}

// <img src="${image.Img400}" ${STATE.isLongform ? `srcset="${createSrcSet(image)}"` : ''} alt="" />


// now the sizes have been calculated and tempaltes created as strings
// we are ready to render the app
// first set main app attributes

// Then render the content to the app container
// this could be called again on resize but the sizes may also
// need to be recalculated

// STATE is logged for reference only
// should be removed for prod publishing


function renderApp() {
	storeDataInState() // immediately set state base values
	// Default height of each row
	// max height of rows after transformation
	// As the image are scaled down from overset sizes, there is no minimum height
	// potential risk of extremely wide images becoming too small
	// refactor to take screen size into consideration
	const rowHeight = STATE.window.height / 1.3 // 400 // sizes in px
	const maxHeight = STATE.window.height / 1.1 // 500
	const margin = 4

	// initial row processing
	// used in methods below to itterate over rows and store data
	const currentRow = 0
	APP.setAttribute('data-mobile', STATE.mobile)
	const template = fluidGridTemplate({ rowHeight, maxHeight, currentRow, margin })
	APP.setAttribute('data-app', 'fluidimagegrid')

	// check if template is supported and render appropriate version
	// render nothing if app (no template) is detected
	if (longform) {
		APP.innerHTML = template[STATE.mobile ? 'mobile' : 'desktop']()
		console.info(`%c### Longform template detected.  \n  ### Custom template is supported  \n  ### Rendering ${STATE.mobile ? 'mobile' : 'desktop'} version`, customLog)
	} else if (STATE.isStandard) {
		APP.innerHTML = template.mobile()
		console.info(`%c### Standard template detected. \n  ### Custom template is supported  \n  ## Rendering ${STATE.mobile ? 'mobile' : 'desktop'} version`, customLog)
	} else if (isTestEnv()) {
		APP.innerHTML = template[STATE.mobile ? 'mobile' : 'desktop']()
		console.info('%c### RENDERING TEST ENV ###', customLog)
	} else {
		console.error(' ### Custom template not supported ### ')
	}
	// depricated - forcing mobile to load when long-form not detected as app workaround
	// seems to have memory issue - not in use
	// } else {
		// APP.innerHTML = template.mobile()
		// console.info('%c### Custom template  not fully supported. Rendering mobile version  ### ', customLog)
	// }
	STATE.popup = document.querySelector('[data-type="popup"')
	console.log({ STATE })
}


// Templates for rendering images fullscreeen
function popupNav() {
	const max = content.parts.length - 1
	const next = index => `<div class="${Styles.nav_next}" 
		data-index="${index}" 
		data-nav="next" 
		style="background-image: url('${icons.angle_right_light}')">
	</div>`
	const prev = index => `<div class="${Styles.nav_prev}" 
		data-index="${index}" 
		data-nav="prev" 
		style="background-image: url('${icons.angle_left_light}')">
	</div>`
	const close = `<div class="${Styles.nav_close}" 
		data-nav="close"
		style="background-image: url('${icons.close_light}')">
	</div>`
	const dots = active => `<div class="${Styles.nav_dotContainer}">
		${content.parts.map((p, i) => `<div 
			class="${Styles.dot} ${Styles[i === active ? 'dot_active' : 'dot_inactive']}"
		></div>`).join('')}
	</div>`

	const render = index => [
		index > 0 ? prev(index) : '',
		index < max ? next(index) : '',
		close,
		dots(index),
	].join('')

	return { render }
}

const popupContent = ({ elem, index }) => {
	const nav = popupNav()
	const { title, caption, credit, image } = elem
	return `<div 
		data-type='fullscreen' 
		class="${Styles.fullscreen}"
		style="background-image: url('${image.ImgthumbBlurLarge}')"
	>
		<img 
			data-orientation="${image.ImgData.orientation}"
			src="${image.Img1000}" 
			srcset="${createSrcSet(image)}" 
			alt="${caption || ''} / ${credit || ''}" 
			data-type="popImage" 
		/>
		${overlayTemplate({ title, caption, credit })}
		${nav.render(index)}
	</div>`
}

// Click functions for opening / navigating / closing fullscreen view
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

console.info(`%c### ${config.projectName} | v${config.version} ### `, customLog)
renderApp()

let resizeTimer = null
window.addEventListener('resize', () => {
	clearTimeout(resizeTimer)
	resizeTimer =	setTimeout(renderApp, 100)
})

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