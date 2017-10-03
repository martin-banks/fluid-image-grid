// import * as test_4x3 from './images/test_4x3'
// import * as test_3x4 from './images/test_3x4'
// import * as test_16x9 from './images/test_16x9'
import importAllImages from '../functions/importAllImages'

const content = {
	title: 'Fluid grid title',
	intro: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis repellendus nesciunt, quasi eligendi mollitia voluptatum adipisci minima ut temporibus doloremque totam ullam animi optio, non corporis, a maxime deserunt facere!',

	// WARNING!!
	// This import function will import all images, regardless of whether they are used or not
	// be sure to move unused images to a different location
	allImages: importAllImages(require.context('./images', false, /\.js/)),
	parts: [
		{
			image: 'test_4x3',
			caption: 'Caption text including credit if required',
		},
		{
			image: 'test_16x9',
			caption: 'Caption text including credit if required',
		},
		{
			image: 'test_3x4',
			caption: 'Caption text including credit if required',
		},
		{
			image: 'test_16x9',
			caption: 'Caption text including credit if required',
		},
		{
			image: 'test_16x9',
			caption: 'Caption text including credit if required',
		},
		{
			image: 'test_3x4',
			caption: 'Caption text including credit if required',
		},
		{
			image: 'test_4x3',
			caption: 'Caption text including credit if required',
		},
		{
			image: 'test_3x4',
			caption: 'Caption text including credit if required',
		},
	],
}

export default content
