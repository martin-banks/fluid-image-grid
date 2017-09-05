function addMaterialIcons() {
	const head = document.getElementsByTagName('head')[0];
	const iconFont = document.createElement('link');
	const id = 'mdlIconFont';
	if (id) return
	iconFont.id = id
	iconFont.rel = 'stylesheet';
	iconFont.type = 'text/css';
	iconFont.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
	iconFont.media = 'all';
	head.appendChild(iconFont);
}

export default addMaterialIcons
