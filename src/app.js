/* eslint no-console: ['warn', {allow: ['error', 'warn', 'info']}] */
import config from './config.json'
import content from './content/index'
import Styles from './app.sass'

// utilities

// layout components
import fluidGridTemplate from './components/fluidGrid'
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
		const rowHeight = window.innerHeight / 2 // 400 // sizes in px
		const maxHeight = window.innerHeight / 1.5 // 500
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

	const render = () => {
		target.innerHTML = layout()
		// Satore popup in state for later use
		STATE.popup = document.querySelector('[data-type="popup"')
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
