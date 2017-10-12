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
			image: '01',
			caption: 'Prince George is introduced to the world as William and Catherine leave hospital with their son in 2013.',
			credit: 'Getty',
		},
		{
			image: '02',
			caption: 'Diana and Charles take time to play with a young William on a 1983 tour to New Zealand.',
		},
		{
			image: '03',
			caption: 'William and Harry are pictured with their mother in the garden of Highgrove House in 1986.',
			credit: 'Getty',
		},
		{
			image: '04',
			caption: 'Charles and Diana form a perfect tableau of country life with their sons William and Harry.',
			credit: 'Snowdon/Camera Press',
		},
		{
			image: '05',
			caption: 'Catherine and William pose with Princess Charlotte and Prince George during a 2016 skiing holiday in the French Alps.',
			credit: 'Getty',
		},
		{
			image: '06',
			caption: 'Diana keeps a tight grip on her young sons as they arrive at Aberdeen airport for a visit to Scotland.',
		},
		{
			image: '07',
			caption: 'William leans back against his casually dressed mum as a young Harry gives a cheeky smile. ',
			credit: 'Jim Bennett',
		},
		{
			image: '08',
			caption: 'Catherine carries George down the plane steps as they arrive in Wellington for a tour of New Zealand in 2014.',
			credit: 'Getty',
		},
		{
			image: '09',
			caption: 'Prince George heads to his first day at Westacre Montessori nursery school near Sandringham in Norfolk in January 2016.',
			credit: 'AFP',
		},
		{
			image: '10',
			caption: 'Princess Charlotte was presented with flowers just like her mum as the Cambridges touched down in Berlin for a tour of Germany in July this year.',
			credit: 'Getty',
		},
		{
			image: '11',
			caption: 'Diana and Charles take their boys for a bike ride on a holiday in the Isles of Scilly in 1989.',
		},
		{
			image: '12',
			caption: 'Diana drops William and Harry at Wetherby School in London for the start of the new term in April 1990.',
		},
		{
			image: '13',
			caption: 'William holds Prince George as Catherine hands him a toy bilby during a visit to Taronga Zoo, Sydney, in 2014.',
			credit: 'Getty',
		},
		{
			image: '14',
			caption: 'Diana is snapped at the beach with her boys and another child on holiday on Necker Island in the British Virgin Islands in 1990.',
		},
		{
			image: '15',
			caption: 'Charles and Diana are all smiles as they play with William during a photo session at Kensington Palace in December 1982.',
			credit: 'AP',
		},
		{
			image: '16',
			caption: 'Diana is pictured with baby William in July 1982. The prince was born on June 21 that year.',
		},
		{
			image: '17',
			caption: 'William carries George as he and Catherine arrive at Sydney airport for their Australian tour in 2014.',
			credit: 'Adam Taylor',
		},
		{
			image: '18',
			caption: 'Diana enjoys a ride on the _Maid of the Mist_ at Niagara Falls, Ontario, with Prince Harry, then seven, and Prince William, aged nine.',
			credit: 'AP',
		},
		{
			image: '19',
			caption: 'Catherine and William pose for a photograph with George in August 2013 - the month after his birth - in the garden of the Middleton family home in Bucklebury, Berkshire. They were joined by their cocker spaniel Lupo and Tilly the retriever, a Middleton family pet, for the snapshot, which was taken by Catherine\'s father.',
			credit: 'Michael Middleton/Getty',
		},
		{
			image: '20',
			caption: 'Prince Charles and Diana leave hospital the day after the birth of their second son, Prince Harry, in September 1984.',
			credit: 'AFP',
		},
		{
			image: '21',
			caption: 'Prince George plays with bubbles at a children\'s party for military families during the Cambridges\' tour of Canada in September 2016.',
			credit: 'Getty',
		},
		{
			image: '22',
			caption: 'William gives Charlotte a helping hand as the family prepares to fly out from Hamburg airport after a July 2017 visit to Poland and Germany.',
			credit: 'Getty',
		},
		{
			image: '23',
			caption: 'Diana cuddles a young Prince Harry aboard the _Royal Yacht Britannia_ during a tour of Italy. ',
			credit: 'Getty',
		},
		{
			image: '24',
			caption: 'This official portrait of Prince George, taken at Kensington Palace at the end of June 2017, was released ahead of his July 22 fourth birthday celebrations. ',
			credit: 'AP',
		},
		{
			image: '25',
			caption: 'Princess Charlotte is photographed by her mother at the family home in Norfolk in the month before her second birthday on May 2 this year.',
			credit: ' AFP / Kensington Palace / The Duchess of Cambridge',
		},
	],
}
export default content
