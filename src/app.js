/* eslint no-console: ['warn', {allow: ['error', 'warn', 'info']}] */
import IML from 'imagesloaded'
import config from './config.json'
import content from './content/index'
import Styles from './app.sass'


// utilities

// layout components
import { fluidGridTemplate, imageTemplate } from './components/fluidGrid'
import overlayTemplate from './components/overlayTemplate'
import popupNavigation from './components/popupNavigation'

// misc new components
import customLog from './components/customLogStyle'
import STATE from './state'


// we store the project name in the config json file so it can be
// referenced by other functions in particular the webpack config scripts
// here we store the selector for the main app container
const APP = document.querySelector(`#${config.projectName}`)
const isTestEnv = () => ['localhost', '127.0.0.1'].indexOf(window.location.hostname) !== -1


// now the sizes have been calculated and tempaltes created as strings
// we are ready to render the app
// first set main app attributes


const header = () => `<section class="${Styles.header}">
	<h2 class="${Styles.header__title}">${content.title}</h2>
	<p class="${Styles.header__intro}">${content.intro}</p>
</section>`

function fluidGrid({ target } = {}) {
	target.setAttribute('data-mobile', STATE.mobile)
	target.setAttribute('data-app', 'fluidimagegrid')
	const makeTemplate = () => {
		// STATE.window.width = window.innerWidth
		// STATE.window.height = window.innerHeight
		// Default height of each row
		// max height of rows after transformation
		// As the image are scaled down from overset sizes, there is no minimum height
		// potential risk of extremely wide images becoming too small
		// refactor to take screen size into consideration
		const rowHeight = window.innerHeight / 2.5 // 400 // sizes in px
		const maxHeight = window.innerHeight / 2 // 500
		const margin = 4

		// initial row processing
		// used in methods below to itterate over rows and store data
		const currentRow = 0
		const template = fluidGridTemplate({ rowHeight, maxHeight, currentRow, margin })
		return template
	}

	// check if template is supported and return appropriate version
	// render nothing if app (no template) is detected
	const grid = () => {
		if (STATE.longform) {
			console.info(`%c### Longform template detected.  \n  ### Custom template is supported  \n  ### Rendering ${STATE.mobile ? 'mobile' : 'desktop'} version`, customLog)
			return makeTemplate()[STATE.mobile ? 'mobile' : 'desktop']()
		} else if (STATE.isStandard) {
			console.info(`%c### Standard template detected. \n  ### Custom template is supported  \n  ## Rendering ${STATE.mobile ? 'mobile' : 'desktop'} version`, customLog)
			return makeTemplate().mobile()
		} else if (isTestEnv()) {
			console.info('%c### RENDERING TEST ENV ###', customLog)
			return makeTemplate()[STATE.mobile ? 'mobile' : 'desktop']()
		}
		console.error(' ### Custom template not supported ### ')
		return ''
	}

	// assemble main layout
	const layout = () => `<div data-type=mainWrapper>
		${header()}
		${grid()}
	</div>`


	let rowToRender = 0
	let rows = []

	const progressiveImageLoad = () => {
		// Improving the rendering experience
		// Hi-res images are set to opacity: 0 initially. 
		const rowImages = rows[rowToRender].querySelectorAll('[data-type="rowimage"]')
		IML(rowImages, () => {
			// When all images have laoded in each row have loaded, then set it's opacity to 1 
			Object.keys(rowImages).forEach(img => rowImages[img].style.opacity = 1)

			// Tim for the next row...
			rowToRender++
			// If there isn't another row, then end it here
			if (rowToRender >= STATE.allRows.length) return
			// console.log(`Starting row ${rowToRender}`)
			// If there is another row, get the image/cell containers
			rows[rowToRender]
				.querySelectorAll('[data-type="image"]')
				// Render the image overlay templates for each tile...
				.forEach(img => {
					const imgIndex = parseInt(img.getAttribute('data-index'), 10)
					const imageName = content.parts[imgIndex].image
					const { title, caption, credit } = content.parts[imgIndex]
					const image = content.allImages[imageName]

					// All of the overlays have already been loaded, but will be wiped out
					// so needs to be included in this new render
					// seemless experience to user
					img.innerHTML = [
						imageTemplate({ image }),
						overlayTemplate({ title, caption, credit }),
					]
				})
			// then call itself again so when this row's images have finished loading 
			// it will start the next row and so on until all images have loaded
			progressiveImageLoad()
		})
	}

	const render = () => {
		target.innerHTML = layout()
		// Store popup in state for later use

		STATE.popup = document.querySelector('[data-type="popup"')
		rows = document.querySelectorAll('[data-type="row"]')
		rowToRender = 0
		// Only the first row has images loaded
		progressiveImageLoad()
		console.info({ STATE })
	}

	return { render }
}

const makeGrid = fluidGrid({ target: APP })

// Improve performance by only re-rendering AFTER resizing is complete
let resizeTimer = null
window.addEventListener('resize', () => {
	clearTimeout(resizeTimer)
	resizeTimer =	setTimeout(makeGrid.render, 100)
})

// Now we're ready to render everything
console.info(`%c### ${config.projectName} | v${config.version} ### `, customLog)
makeGrid.render()
// and add navigation delegates
popupNavigation()
