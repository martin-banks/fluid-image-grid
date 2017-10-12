import content from '../content/index'
import Styles from '../app.sass'
import calculateRows from './calculateRows'
import createSrcSet from '../functions/createSrcSet'
import overlayTemplate from './overlayTemplate'
import STATE from '../state'

export const imageTemplate = ({ image }) => {
	return `<div 
		class="${Styles.image__wrapper}" 
		style="background-image: url('${image.ImgthumbBlurLarge}')"
		data-type="rowimage_container"
	>
		<img src="${image.Img400}" srcset="${createSrcSet(image)}" alt="" data-type="rowimage" />
	</div>`
}

const rowTemplate = ({ row, newRowHeight, margin, i }) => row.map(img => {
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
		${i === 0 ? imageTemplate({ image: images }) : ''}
		${overlayTemplate({ title, caption, credit })}
	</div>`
}).join('')

const popup = `<section class="${Styles.popup}" data-type="popup"></section>`

// row and image template
export function fluidGridTemplate({ rowHeight, maxHeight, currentRow, margin } = {}) {
	// create device specific view
	// these are return when layout is created
	const desktop = () => {
		STATE.allRows = calculateRows({ rowHeight, maxHeight, currentRow, margin })
		return [
			STATE.allRows.map((row, i) => {
				const thisRowWidth = STATE.rowWidths[i]
				const windowWidth = window.innerWidth
				const rowHeightAdjustment = Math.min(windowWidth, thisRowWidth) / thisRowWidth
				const newRowHeight = Math.min((rowHeight * rowHeightAdjustment), maxHeight)
				const rows = `<section class="${Styles.row}" data-type="row">
					${rowTemplate({ row, newRowHeight, margin, i })}
				</section>`
				return rows
			}).join(''),
			popup,
		].join('')
	}

	const mobile = () => content.parts.map(part => {
		const { credit, caption, title } = part
		const image = content.allImages[part.image]
		return `<section class="${Styles.row}" data-type="row">
			<div class="${Styles.image}">
				${imageTemplate({ image })}
				${overlayTemplate({ title, caption, credit })}
			</div>
		</section>`
	}).join('')

	return { desktop, mobile }
}

// export default fluidGridTemplate
