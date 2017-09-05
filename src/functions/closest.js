
function closest(element, query) {
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
		} else if (element.matches(query)) {
			return element
		}
		element = element.parentNode
	}
	return null
}

export default closest
