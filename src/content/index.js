import importAllImages from '../functions/importAllImages'

const content = {
	title: 'Fluid image grid demo',
	intro: 'A Random collection of some of my holiday snapsto show off a fluid grid concept. Takes a set of images and calculates the optimal sizes to crate a grid where each row fills the width of the screen. Select any image to open it in a full screen view. Use the onscreen or keyboard arrows to navogate between them.',

	// WARNING!!
	// This import function will import all images, regardless of whether they are used or not
	// be sure to move unused images to a different location
	allImages: importAllImages(require.context('./images', false, /\.js/)),
	parts: [
		{
			image: 'sample_00000',
			caption: '',
			credit: 'Martin Banks',
		},
		{
			image: 'sample_00001',
			caption: '',
			credit: 'Martin Banks',
		},
		{
			image: 'sample_00002',
			caption: '',
			credit: 'Martin Banks',
		},
		{
			image: 'sample_00003',
			caption: '',
			credit: 'Martin Banks',
		},
		{
			image: 'sample_00004',
			caption: '',
			credit: 'Martin Banks',
		},
		{
			image: 'sample_00005',
			caption: '',
			credit: 'Martin Banks',
		},
		{
			image: 'sample_00006',
			caption: '',
			credit: 'Martin Banks',
		},
		{
			image: 'sample_00007',
			caption: '',
			credit: 'Martin Banks',
		},
		{
			image: 'sample_00008',
			caption: '',
			credit: 'Martin Banks',
		},
		{
			image: 'sample_00009',
			caption: '',
			credit: 'Martin Banks',
		},
		{
			image: 'sample_00010',
			caption: '',
			credit: 'Martin Banks',
		},
		{
			image: 'sample_00011',
			caption: '',
			credit: 'Martin Banks',
		},
		{
			image: 'sample_00012',
			caption: '',
			credit: 'Martin Banks',
		},
		{
			image: 'sample_00013',
			caption: '',
			credit: 'Martin Banks',
		},
		{
			image: 'sample_00014',
			caption: '',
			credit: 'Martin Banks',
		},
		{
			image: 'sample_00015',
			caption: '',
			credit: 'Martin Banks',
		},
		{
			image: 'sample_00016',
			caption: '',
			credit: 'Martin Banks',
		},
		{
			image: 'sample_00017',
			caption: '',
			credit: 'Martin Banks',
		},
		{
			image: 'sample_00018',
			caption: '',
			credit: 'Martin Banks',
		},
		{
			image: 'sample_00019',
			caption: '',
			credit: 'Martin Banks',
		},
		{
			image: 'sample_00020',
			caption: '',
			credit: 'Martin Banks',
		},
		{
			image: 'sample_00021',
			caption: '',
			credit: 'Martin Banks',
		},
		{
			image: 'sample_00022',
			caption: '',
			credit: 'Martin Banks',
		},
		{
			image: 'sample_00023',
			caption: '',
			credit: 'Martin Banks',
		},
		{
			image: 'sample_00024',
			caption: '',
			credit: 'Martin Banks',
		},
		{
			image: 'sample_00025',
			caption: '',
			credit: 'Martin Banks',
		},
		{
			image: 'sample_00026',
			caption: '',
			credit: 'Martin Banks',
		},
		{
			image: 'sample_00027',
			caption: '',
			credit: 'Martin Banks',
		},
		{
			image: 'sample_00028',
			caption: '',
			credit: 'Martin Banks',
		},
		{
			image: 'sample_00029',
			caption: '',
			credit: 'Martin Banks',
		},
		{
			image: 'sample_00030',
			caption: '',
			credit: 'Martin Banks',
		},
		{
			image: 'sample_00031',
			caption: '',
			credit: 'Martin Banks',
		},
		{
			image: 'sample_00032',
			caption: '',
			credit: 'Martin Banks',
		},

	],
}
export default content
