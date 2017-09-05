// ---------------------------------------------------------------------
// This file has beedn depricated in favour of individual finction files
// please import the appropriate file
// NOT this collection
// ---------------------------------------------------------------------




/* Utility functions */
export function siblings(selector) {
	var element = document.querySelector(selector)
	var childElements = Array.from(element.parentNode.children)
	return childElements.filter(function(child) {
		return child !== element
	})
}

export function closest(element, query) {
	while (!!element && element !== document) {
		if (!Element.prototype.matches) { /* polyfill of matches method for IE */
			Element.prototype.matches = 
				Element.prototype.matchesSelector || 
				Element.prototype.mozMatchesSelector ||
				Element.prototype.msMatchesSelector || 
				Element.prototype.oMatchesSelector || 
				Element.prototype.webkitMatchesSelector ||
				function(s) {
					var matches = (this.document || this.ownerDocument).querySelectorAll(query),
						i = matches.length;
					while (--i >= 0 && matches.item(i) !== this) {}
					return i > -1;            
				};
		}else if (element.matches(query)) {
			return element
		}
		element = element.parentNode
	}
	return null
}

export function delegate(selector, eventName, targetSelector, listener) {
	document.querySelector(selector).addEventListener(eventName, function (event) {
		var closestMatch = closest(event.target, targetSelector)
		if (closestMatch) {
			event.delegateTarget = closestMatch
			listener(event)
		}
	})
}

export const randomNumber = (low, high) => (Math.floor(Math.random()*high)) + low


export function addClass(elem, className){
	if (!!elem.classList) {
		elem.classList.add(className);
	} else {
		elem.className += ' ' + className;
	}
}
export function removeClass(elem, className){
	if(!!elem){
		if (elem.classList) {
			elem.classList.remove(className);
		}
		else {
			elem.className = elem.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
		}
	}
}



export function IEdetection(){
	console.warn('running IE detect')
	let ie = (function(){
		let undef,
			v = 3,
			div = document.createElement('div'),
			all = div.getElementsByTagName('i');
		while (
			div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
			all[0]
		);
		return v > 4 ? v : undef;
	
	}());
	console.warn('IE version', ie)
	if (ie<=11){
		document.getElementById('appContainer').innerHTML = 'Sorry, this feature is not supported in your browser.';
		/*document.getElementById('appContainer').style.display = 'none';
		document.getElementById('popupContainer').style.display = 'none';*/
	} else {
		//document.getElementById('ieDetect').innerHTML = '';
		//document.getElementById('ieDetect').style.display = 'none';
	}
}


export function detectChrome(){
	// please note, 
	// that IE11 now returns undefined again for window.chrome
	// and new Opera 30 outputs true for window.chrome
	// and new IE Edge outputs to true now for window.chrome
	// and if not iOS Chrome check
	// so use the below updated condition
	var isChromium = window.chrome,
	    winNav = window.navigator,
	    vendorName = winNav.vendor,
	    isOpera = winNav.userAgent.indexOf("OPR") > -1,
	    isIEedge = winNav.userAgent.indexOf("Edge") > -1,
	    isIOSChrome = winNav.userAgent.match("CriOS");

	if(isIOSChrome){
	   // is Google Chrome on IOS
	   return false
	} else if(isChromium !== null && isChromium !== undefined && vendorName === "Google Inc." && isOpera == false && isIEedge == false) {
	   // is Google Chrome
	   return true
	} else { 
	   // not Google Chrome 
	   return false
	}
}


export function loadMaterialIcons(){
	let head  = document.getElementsByTagName('head')[0];
	let iconFont  = document.createElement('link');
		iconFont.id   = 'mdlIconFont';
		iconFont.rel  = 'stylesheet';
		iconFont.type = 'text/css';
		iconFont.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
		iconFont.media = 'all';
		head.appendChild(iconFont);
}
export function addStyleSheetToHead(url, className){
	let head  = document.getElementsByTagName('head')[0];
    let link  = document.createElement('link');
	    link.className = className || 'ndi-customStyleSheet';
	    link.rel  = 'stylesheet';
	    link.type = 'text/css';
	    link.href = url;
	    link.media = 'all';
	    head.appendChild(link);
}
export function addScriptToHead(url, className){
	let head  = document.getElementsByTagName('head')[0];
	let scriptFile  = document.createElement('script');
		scriptFile.className = className || 'ndi-customScripts';;
		scriptFile.type = 'text/javascript';
		scriptFile.src = url;
		head.appendChild(scriptFile);
}

export const isMobileDevice = ()=> {
	const mobile = /iPad|Android|webOS|iPhone|iPod|Blackberry/.test(navigator.userAgent) && !window.MSStream;
	return mobile ? true : false
}

const isIOSDevice = ()=>{
	const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
	return ios ? true : false
}


export function detectIE() {
	const ua = window.navigator.userAgent;
	// Test values; Uncomment to check result …
	// IE 10
	// ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

	// IE 11
	// ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

	// Edge 12 (Spartan)
	// ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

	// Edge 13
	// ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

	let msie = ua.indexOf('MSIE ');
	if (msie > 0) {
		// IE 10 or older => return version number
		return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
	}
	let trident = ua.indexOf('Trident/');
	if (trident > 0) {
		// IE 11 => return version number
		let rv = ua.indexOf('rv:');
		return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
	}
	let edge = ua.indexOf('Edge/');
	if (edge > 0) {
		// Edge (IE 12+) => return version number
		return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
	}
	// other browser
	return false;
}


export const addEvent = function(object, type, callback) {
	if (object == null || typeof(object) == 'undefined') {
		console.error(`Cannot add ${type} to ${object}. Object not recognised`)
		return
	}
	if (object.addEventListener) {
		object.addEventListener(type, callback, false)
	} else if (object.attachEvent) {
		object.attachEvent("on" + type, callback)
	} else {
		object["on"+type] = callback
	}
}
