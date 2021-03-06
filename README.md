
# fluid-image-grid

### What is it?
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
Run `npm i` in the terminal to install the dependencies
Run `npm start` to start webpack and a hot-reloading server from memory (no files will be generated)
Visit `localhost:8080` in your browser to see the demo version up and running

Any changes you make to hte project files will now live update into your browser

## Update the config
There are some settings that need to be updated in the `src/config.json`, this file controls various options in the single page app (SPA). You will need to specify 
- The app name
- The addresses for test and production servers (only required when compiling an output, )
- Image processor settings; including min/max sizes and compressions values


--- 

## Adding images
This app makes use of image srcset, this means it needs a lot of version of the same image so the browser can determine which is the most approriate to load.
Add you files into the `src/content/images/_RAW` directory, then run `npm run images`. This will call a node app to itterate over all of the images and create the versions that are required. 

### What's going on here?
The node app that processes the images creates multiple versions of the same image, it saves each into a directory named for that size (width). It then writes a reference to that image into a js file including some basic information about the file (original dimensions and orientation)

We can then use JS imports to reference this file in our content object. The supplied Webpack.config.js file is set up to process imported images; creating a new instance of that file along with absolute paths that are passed into the img template.


### To add them to your app, 
#### Automatically
*_NEW FEATURE_*

Now supporting auto import of all images. All images that have been processed can be auomaticaly added by calling:
```javascript
  const allImages = importAllImages(require.context('./path/to/images', false, /\.js/))
```
This will import all of the .js files output from the above script (direct import of jpg and png also supported). This creates an object of images, each accessible by it's file name

so for the structure:
```
images_folder
  |_ image_1.jpg
  |_ image_2.jpg
  |_ image_3.jpg
  |_ image_4.jpg
```

access the first image:
```javascript
  allImages.image_1
```


#### Manually
open the `src/content/index.js` file. Import the images at the top of the file and include that reference in the object for that entry, so say you have an `myAwesomeImage.jpg`, you js would look like this:

```javascript
  import * as myAwesomeImage from './images/myAwesomeImage'
  const content = {
    parts: [
      {
        "image": myAwesomeImage,
        "caption": "Caption text including credit if required",
      },
    ]
  }
  export default content
```



--- 

## Build outputs
There are two options for outputing build version for deployment: UAT and PROD. These builds are intended for deployment to be hosted over a server, all file paths including scripts, styles and images are processed based on this location.  

### What files are output?
- `index.html`: entry point to view the app
- `embedCode.html`: html embed code that can be included in other sites
- `app.js`: the full js SPA - only minified in PROD
- `app.css`:  all the styles - only minified in PROD
- `report.json`: Info about the date/time/user/config setting of the buils
- `build.xml`: Only for PROD, this file is used in my deployment server
- `src/...`: Directory containing images, icons etc
