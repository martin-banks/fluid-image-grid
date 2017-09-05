const SIZES = {
	default: 'medium',
	small: 30,
	medium: 40,
	large: 50,
}

const COLORS = {
	default: 'light',
	light: {
		icon: '#000',
		background: '#fff',
	},
	dark: {
		icon: '#fff',
		background: '#000',
	},
}


function Close({ color = COLORS.default, size = SIZES.default } = {}) {
	const COLOR_ICON = COLORS[color].icon
	const COLOR_BACKGROUND = COLORS[color].background
	const SIZE = SIZES[size]

	return `
	<div data-type="button" data-action="close">
		<svg
			style="
				position: absolute;
				right: 16px;
				top: 16px;
				width: ${SIZE}px; 
				height: ${SIZE}px;
			"
		>
			<rect 
				rx="4px"
				ry="4px"
				x="${0}px"
				y="${0}px"
				width="${SIZE}px" 
				height="${SIZE}px" 
				fill="${COLOR_BACKGROUND}"  
			/>
		</svg>
		<svg
			style="
				position: absolute;
				top: 25px;
				right: 8px;
				transform: scale(1.1)
			"
			fill="${COLOR_ICON}" 
			height="${SIZE}px" 

			width="${SIZE}px"
			xmlns="http://www.w3.org/2000/svg"
		>
		  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
		</svg>
	</div>`
}

export default Close
