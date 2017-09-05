import STATE from '../state'
import * as Modules from '../templates/modules/_moduleController'
import * as Atoms from '../templates/atoms/_atomController'


// Use views as functional templates to map content to module templates
// - Write them to State
// - Render to DOM
// - Instantiate interactivity

/*
	Take an array of nodes  (passed as argument from content; typically the container cards) 
	process them and their children into STATE to be called by render function later

*/

function setNodesInState(nodes) {
	const setNodes = nodes.map((card, i) => {
		// create the node from the module manifest
		// this top level node is always a module to act as a wrapper
		const node = Modules[card.type]({ card, i })

		// Each module can take up to 3 layers (back|mid|foreground)
		// These layers take and array of child  objects to render into the card/wrapper
		// key = layer: back|mid|forground
		const layerKeys = Object.keys(card.content)

		const children = layerKeys.reduce((prev, layerKey) => {
			const layer = card.content[layerKey]
			const layerNodes = layer.map((elem, i) => Atoms[elem.type]({ elem, i }))

			let update = prev
			update[layerKey] = layerNodes
			return update
		}, {})
		return { node, children }
	})

	STATE.nodes = setNodes
}

export default setNodesInState

