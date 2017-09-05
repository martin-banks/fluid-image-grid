import STATE from '../state'

function updateElemCount(elem) {
	if (!STATE.elemCount) STATE.elemCount = {}
	if (STATE.elemCount[elem]) {
		STATE.elemCount[elem]++
	} else {
		STATE.elemCount[elem] = 1
	}
}

export default updateElemCount
