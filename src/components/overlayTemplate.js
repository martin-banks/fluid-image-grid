import MKDOWN from '../functions/handleMarkdown'
import Styles from '../app.sass'

function overlayTemplate({ title, caption, credit } = {}) {
	return `<div class="${Styles.overlay}">
		${title ? `<h3 class="${Styles.overlay__title}">${MKDOWN(title)}</h3>` : ''}
		${caption ? `<p class="${Styles.overlay__caption}">${MKDOWN(caption)}</p>` : ''}
		${credit ? `<p class="${Styles.overlay__credit}">${MKDOWN(credit)}</p>` : ''}
	</div>`
}

export default overlayTemplate
