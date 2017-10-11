import STATE from '../state'
import content from '../content/index'

// split images into row arrays
// add images until the total width exceeds that of the window
// using the image ratio to get proportional width from default row height
// then create new row array
// store the row width in STATE object - this is used to calculate how much grid items are shrunk by later
function calculateRows({ rowHeight, /* maxHeight, */ currentRow, margin } = {}) {
	// const { content, STATE } = arguments[0]
	let rowNumber = currentRow
	const indexedcontent = content.parts.map((part, i) => {
		const update = part
		update.index = i
		return update
	})
	const ROWS = indexedcontent.reduce((output, part) => {
		const update = output
		const lastIndex = Math.max(0, update.length - 1)
		const lastRow = update[lastIndex]
		let rowWidth = 0
		if (lastRow) {
			rowWidth = lastRow
				.reduce((total, img) => {
					const newWidth = (rowHeight / content.allImages[img.image].ImgData.ratio) + (margin * 2)
					const rowUpdate = total + newWidth
					return rowUpdate
				}, 0)
			if (rowWidth < window.innerWidth) {
				// console.log('im under!! adding to row', rowWidth)
				lastRow.push(part)
				const { ratio } = content.allImages[part.image].ImgData
				STATE.rowWidths[rowNumber] = (rowWidth + (rowHeight / ratio)) + (margin * 2)
			} else {
				// console.log('im over!! creating new row', rowWidth)
				rowNumber++
				const { ratio } = content.allImages[part.image].ImgData
				STATE.rowWidths[rowNumber] = (rowHeight / ratio) + (margin * 2)
				update.push([part])
			}
		} else {
			update.push([part])
		}
		return update
	}, [])
	return ROWS
}

export default calculateRows
