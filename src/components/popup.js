import content from '../content/index'
import Styles from '../app.sass'
import * as icons from '../icons/icons'

import createSrcSet from '../functions/createSrcSet'
import overlayTemplate from './overlayTemplate'


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

	const layout = index => [
		index > 0 ? prev(index) : '',
		index < max ? next(index) : '',
		close,
		dots(index),
	].join('')

	return { layout }
}

const popupContent = ({ elem, index }) => {
	const nav = popupNav()
	const { title, caption, credit } = elem
	const image = content.allImages[elem.image]
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
		${nav.layout(index)}
	</div>`
}

export default popupContent
