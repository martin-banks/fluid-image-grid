import content from '../content/index'
import Styles from '../app.sass'
import calculateRows from './calculateRows'
import createSrcSet from '../functions/createSrcSet'
import overlayTemplate from './overlayTemplate'
import STATE from '../state'

const imageTemplate = ({ image }) => {
	return `<div 
		class="${Styles.image__wrapper}" 
		style="background-image: url('${image.ImgthumbBlurLarge}')"
	>
		<img src="${image.Img400}" srcset="${createSrcSet(image)}" alt="" />
</div>`
}

const rowTemplate = ({ row, newRowHeight, margin }) => row.map(img => {
	const { credit, caption, title, index } = img
	const images = content.allImages[img.image]

	return `<div 
		class="${Styles.image}" 
		data-type="image"
		data-index="${index}"
		style="
			height: ${newRowHeight}px; 
			width: ${newRowHeight / images.ImgData.ratio}px;
			margin: ${margin / 2}px;
		"
	>
		${imageTemplate({ image: images })}
		${overlayTemplate({ title, caption, credit })}
	</div>`
}).join('')

// row and image template
// needs refactor / tidying
function fluidGridTemplate({ rowHeight, maxHeight, currentRow, margin } = {}) {
	// create device specific view
	// these are return when layout is created
	const desktop = () => calculateRows({ rowHeight, maxHeight, currentRow, margin }).map((row, i) => {
		const thisRowWidth = STATE.rowWidths[i]
		const windowWidth = window.innerWidth
		const rowHeightAdjustment = Math.min(windowWidth, thisRowWidth) / thisRowWidth
		const newRowHeight = Math.min((rowHeight * rowHeightAdjustment), maxHeight)
		const popup = `<section class="${Styles.popup}" data-type="popup"></section>`
		const rows = `<section class="${Styles.row}">
			${rowTemplate({ row, newRowHeight, margin })}
		</section>`

		return [popup, rows].join('')
	}).join('')

	const mobile = () => content.parts.map(part => {
		const { credit, caption, title } = part
		const image = content.allImages[part.image]
		return `<section class="${Styles.row}">
			<div 
				class="${Styles.image}" 
				style=""
			>
				${imageTemplate({ image })}
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

export default fluidGridTemplate
