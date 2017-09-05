
function addScriptToHead({ url, className, id }) {
	const head = document.getElementsByTagName('head')[0];
	const scriptFile = document.createElement('script');
	scriptFile.className = className || 'ndi-customScripts';
	scriptFile.id = id
	scriptFile.type = 'text/javascript';
	scriptFile.src = url;
	head.appendChild(scriptFile);
}

export default addScriptToHead
