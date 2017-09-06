import * as test4x3 from './images/test_4x3'
import * as test3x4 from './images/test_3x4'
import * as test16x9 from './images/test_16x9'

const content = {
	title: 'Fluid grid title',
	intro: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis repellendus nesciunt, quasi eligendi mollitia voluptatum adipisci minima ut temporibus doloremque totam ullam animi optio, non corporis, a maxime deserunt facere!',
	parts: [
		{
			image: test4x3,
			caption: 'Caption text including credit if required',
		},
		{
			image: test16x9,
			caption: 'Caption text including credit if required',
		},
		{
			image: test3x4,
			caption: 'Caption text including credit if required',
		},
		{
			image: test16x9,
			caption: 'Caption text including credit if required',
		},
		{
			image: test16x9,
			caption: 'Caption text including credit if required',
		},
		{
			image: test3x4,
			caption: 'Caption text including credit if required',
		},
		{
			image: test4x3,
			caption: 'Caption text including credit if required',
		},
		{
			image: test3x4,
			caption: 'Caption text including credit if required',
		},
	],
}

export default content
