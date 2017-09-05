
# fluid-image-grid

## What is it?
Create an image grid where each row fills screen width
By setting a target height for each row of images, we can calculate how wide each will be whe nrendered at that height. 

Once the total width of images exceeds the width of the screen, turn into a new row.

We achieve this through two stages:
	 - A script that processes images into various sized versions so that the optimal size is always rendered (responsive images, link to that project coming ...). As part of this processing, a JS manifest object of the images is created which includes the raw size and ratio of the imag file.
	 - When rendering the grid this object is read for it's image data, the ratio used to caluculate the relative width and the image array is then split into separate arrays (rows) ready for rendering.

The rendering first processes the total width of each row, if it exceeds that of the render area (viewport in this instance) a new height is calulated from the ratios to the total width, which in turn creates new image widths

Once all of these calculations are complete, the images are the nused to generate string templates with hardcoded styles, which is then rendered to the DOM.

Resizing triggers this whole process again


## Getting set up
Run ```npm i``` in the terminal to install the dependencies
Run ```npm start``` to start webpack and a hot-reloading server from memory (no files will be generated)
Visit ```localhost:8080``` in your browser to see the demo version up and running

Any changes you make to hte project files will now live update into your browser

## Updating the config
There are some settings that need to be updated in the ```src/config.json```, this file controls various options in the single page app (SPA). You will need to specify 
- The app name
- The addresses for test and production servers (only required when compiling an output, )

## Adding images
This app makes use of image srcset, this means it needs a lot of version of the same image so the browser can determine which is the most approriate to load.
Add you files into the ```src/content/images/_RAW``` directory, then run ```npm run images```. This will call a node app to iterate over all of the images and create the versions that are required. 

To add them to your app, open the ```src/content/index.js``` file. Import the images at the top of the file and include that reference in the object for that entry, so say you have an ```myAwesomeImage.jpg```, you js would look like this:

	import * as myAwesomeImage from './images/myAwesomeImage'
	const content = {
		title: '',
		intro: '',
		parts: [
			{
				"image": myAwesomeImage,
				"caption": "Caption text including credit if required",
			},
		]
	}
	export default content

Add more import more images and add more objects to the ```content.parts``` array. 

### What's going on here?
The node app that processes the images creates multiple versions of the same image, it saves each into a directory named for that size (width). It then writes a reference to that image into a js file including some basic information about the file (original dimensions and orientation)

We can then use JS imports to reference this file in our content object. The supplied Webpack.config.js file is set up to process imported images; creating a new instance of that file along with absolute paths that are passed into the img template.

--- 

