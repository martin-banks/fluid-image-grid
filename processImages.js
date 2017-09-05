/* eslint-env node */
/* eslint no-console: 0 */

// IMAGE MAGICKDOCUMENTATION
// https://www.npmjs.com/package/imagemagick
// https://github.com/rsms/node-imagemagick

const IM = require('imagemagick')
const FS = require('fs')
const MKDIRP = require('mkdirp')
const PATH = require('path')
const C = require('colors')
const MV = require('mv')
const GETSIZE = require('image-size')

// config options for project including image processing spec and locations
// is controlled from a json file in src.
// here it is imported and value destructured
const CFG = require('./src/config.json').images

const { sizes, thumbBlurLarge, thumbBlurSmall, location: imageLocation } = CFG
const { min, max, inc } = sizes
const thumbSize = CFG.sizes.thumb
// const thumbBlurLarge = CFG.thumbBlurLarge
// const thumbBlurSmall = CFG.thumbBlurSmall
const quality = CFG.quality.image
const thumbQuality = CFG.quality.thumb
// const count = (max - min) / inc

// define the image location from config to be used for all processes
const images = PATH.join(__dirname, `${imageLocation}`)
console.log(C.cyan(images))

// in order fro the images to be used with js modules, create a js 'manifest' exporting
// each image from that location so they can be programtically accessed by templates
const manifestTemplate = (name, size, file) => `export { default as ${CFG.jsPrefix || 'Img'}${name} } from './processed/${size}/${file}'`

//  Helper function to log styled output
function logResult(err, res) {
	if (err) {
		console.log(C.red(err))
	} else {
		console.log(C.green(res))
	}
}


// First create the folder structure if it does not already exist
function createFolderStructure(size, createThumbs) {
	if (createThumbs) {
		// MKDIRP(`${images}/_done`, err => console.log(err || 'dir created'))
		MKDIRP(`${images}/processed/thumb`, err => console.log(err || 'thumb dir created'))
		MKDIRP(`${images}/processed/thumbBlurSmall`, err => console.log(err || 'thumbBlurSmall dir created'))
		MKDIRP(`${images}/processed/thumbBlurLarge`, err => console.log(err || 'thumbBlurLarge dir created'))
		MKDIRP(`${images}/_RAW/_DONE`, err => console.log(err || '_DONE dir created'))
	}

	MKDIRP(`${images}/processed/${size}`, err => {
		console.log(err || `${size} dir created`)
		const newSize = size + inc
		if (size <= max) {
			createFolderStructure(newSize, false)
		} else {
			createAllImages()
		}
	})
}

// Once directories are in place we will process our images
function createAllImages() {
	// first get a list of all images in the folder
	FS.readdir(PATH.join(images, '_RAW'), (readDirError, files) => {
		console.log(readDirError || files)
		if (readDirError) return
		// console.log(C.cyan(files.join('\t\n')))

		// Fileter that list for unsupported files and begin processing the reaminder
		// -- currently only jpg are supported) --
		files
			.filter(file => file.indexOf('.jpg') !== -1) // filter any files that are not jpg
			.forEach(file => {
				const manifest = []
				const currentSize = min

				// First off we handle the uniquely named/processed files - specifically the thumbnails
				// As each file is created we push an reference to that file to array
				// That array will later become a js file importing all files as modules for front-end use
				manifest.push(manifestTemplate('thumb', 'thumb', file))
				manifest.push(manifestTemplate('thumbBlurSmall', 'thumbBlurSmall', file))
				manifest.push(manifestTemplate('thumbBlurLarge', 'thumbBlurLarge', file))

				// as each unique version is created, it calls the process for the next ...
				IM.convert([
					`${images}/_RAW/${file}`,
					'-resize', thumbSize,
					'-quality', thumbQuality,
					`${images}/processed/thumb/${file}`,
				],
					err => {
						logResult(err, `${file} processed to thumb`)
						IM.convert([
							`${images}/_RAW/${file}`,
							'-resize', thumbSize,
							'-quality', thumbQuality,
							'-gaussian-blur', `0x${thumbBlurSmall}`,
							`${images}/processed/thumbBlurSmall/${file}`,
						],
							err => {
								logResult(err, `${file} processed to thumbBlueSmall`)
								IM.convert([
									`${images}/_RAW/${file}`,
									'-resize', thumbSize,
									'-quality', thumbQuality,
									'-gaussian-blur', `0x${thumbBlurLarge}`,
									`${images}/processed/thumbBlurLarge/${file}`,
								],
									err => {
										// ... until it has processed the last,
										// then it calls the function to process the incremental image versions
										logResult(err, `${file} processed to thumbBlurLarge`)
										createImageIncrement(currentSize, file, manifest)
									},
								)
							})
					})
			})
	})
}


// Process the image file into it's incremental versions
function createImageIncrement(size, file, manifest) {
	const imagePath = `${images}/_RAW/${file}`
	console.log({size, sizes})
	if (size === sizes.min) {
		const fileDimensions = GETSIZE(imagePath)
		console.log({ fileDimensions })
		const { width, height } = fileDimensions
		const ratio = height / width
		const orientation = width > height ? 'landscape' : 'portrait'
		manifest.push(`export const ImgData = { width: ${width}, height: ${height}, ratio: ${ratio}, orientation: '${orientation}' }`)
	}
	manifest.push(manifestTemplate(size, size, file))
	// const newName = `${file.split('.jpg')[0]}-${size}-done.jpg`

	// Log which image file and size we are starting process for
	console.log(C.grey(`processing ${file} to ${size}`))
	IM.convert([
		imagePath,
		'-resize', size,
		'-quality', quality,
		'-blur', '0x0.05',
		'-sharpen', '1x1',
		'-noise', '2',
		`${images}/processed/${size}/${file}`,
	],
		IMerror => {
			logResult(IMerror, `${file} processed ${size}`)
			const newSize = size + inc
			if (size <= max) {
				// Recursively call this function until the size has reached or exceed the max required
				createImageIncrement(newSize, file, manifest)
			} else { // all images are done
				manifest.push('') // empty entry will become blank line on the end of file
				// Writing out the image manifest to a js file
				// Split the image file name to remove extension
				console.log({ manifest })
				FS.writeFile(`${images}/${file.split('.jpg')[0]}.js`, manifest.join(';\n'), writeError => {
					if (writeError) {
						console.log(C.red(writeError))
						return
					}
					// Log out successful completion of processing
					console.log(C.bgGreen(` manifest created for ${file} `).black)
					console.log(C.bgGreen(` All files created for ${file} `).black)
					// We only want tto process new or changed images so we move this image file into a _done directory 
					// so it won't be processed again unless required
					MV(`${images}/_RAW/${file}`,
						`${images}/_RAW/_DONE/${file}`,
						moveError => console.log(moveError || ` ${file} moved `.bgYellow.black))
				})
			}
		})
}


// Kick off the processing app!
createFolderStructure(min, true)

