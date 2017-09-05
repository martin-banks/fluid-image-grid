
function addStyleheet(url, className) {
	const head = document.getElementsByTagName('head')[0];
	const link = document.createElement('link');
	link.className = className || 'ndi-customStyleSheet';
	link.rel = 'stylesheet';
	link.type = 'text/css';
	link.href = url;
	link.media = 'all';
	head.appendChild(link);
}

export default addStyleheet
