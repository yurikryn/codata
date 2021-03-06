function sort2(newCodataObject) {

	function compareFunc(a, b) {
		const categoryRank = {
			"UNIVERSAL": 0,
			"ELECTROMAGNETIC": 1,
			"ATOMIC AND NUCLEAR # General": 2,
			"ATOMIC AND NUCLEAR # Electroweak": 3,
			"ATOMIC AND NUCLEAR # Electron": 4,
			"ATOMIC AND NUCLEAR # Muon": 5,
			"ATOMIC AND NUCLEAR # Tau": 6,
			"ATOMIC AND NUCLEAR # Proton": 7,
			"ATOMIC AND NUCLEAR # Neutron": 8,
			"ATOMIC AND NUCLEAR # Deuteron": 9,
			"ATOMIC AND NUCLEAR # Triton": 10,
			"ATOMIC AND NUCLEAR # Helion": 11,
			"ATOMIC AND NUCLEAR # Alpha particle": 12,
			"PHYSICOCHEMICAL": 13,
			"X-RAY VALUES": 14,
			"CONVERSION FACTORS": 15,
			"NON-SI UNITS # Accepted": 16,
			"NON-SI UNITS # Natural": 17,
			"NON-SI UNITS # Atomic": 18,
			"NON-SI UNITS # Conventional": 19,
			"ADOPTED VALUES": 20,
			"TODO": 21
		}
		if ((parseFloat(a.relative2) || 0) > (parseFloat(b.relative2) || 0)) { return 1 }
		else if ((parseFloat(a.relative2) || 0) < (parseFloat(b.relative2) || 0)) { return -1 }
		else if ((parseFloat(a.relative) || 0) > (parseFloat(b.relative) || 0)) { return 1 }
		else if ((parseFloat(a.relative) || 0) < (parseFloat(b.relative) || 0)) { return -1 }
		else if (categoryRank[a.category] - categoryRank[b.category] > 0) { return 1; }
		else if (categoryRank[a.category] - categoryRank[b.category] < 0) { return -1; }
		else if (a.name > b.name) { return 1; }
		else if (a.name < b.name) { return -1; }
		else { console.log("DOUBLE NAMES !!!") }
	}

	return newCodataObject.sort(compareFunc);
}
