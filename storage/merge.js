function merge(newCodataObject, codataObject) {

    console.log(`LIST OF OLD UNMERGED CONSTANTS:`);

    let j = 0;
    for (let entity of codataObject) {
        const { category, name, unit, exponent, ...oldValues } = entity;
        let k = 0;
        for (let newEntity of newCodataObject) {
            if (name === newEntity.name) {
                ++j; ++k;

                if ((unit || newEntity.unit) && (unit !== newEntity.unit)) { alert(`${name}: unit problem ${unit}, ${newEntity.unit}`); return; }// TEST
                if ((exponent || newEntity.exponent) && (exponent !== newEntity.exponent)) { alert(`${name}: exponent problem ${exponent}, ${newEntity.exponent}`); return; }// TEST

                newEntity.category = category;
                for (let key in oldValues) {
                    newEntity[key] = oldValues[key]
                }

                break;
            }
        }
        if (k === 0) {
            console.log(`\t${name}`);
        }
    }

    if (j !== codataObject.length) { console.log(`CORRECT OR REMOVE OLD UNMERGED CONSTANTS !!!`); }

    console.log(`####################################################`);

    console.log(`LIST OF NEW UNMERGED CONSTANTS:`);

    for (let newEntity of newCodataObject) {
        if (newEntity.category === "TODO") {
            console.log(`\t${newEntity.name}`);
        }
    }


    if (j !== newCodataObject.length) { console.log(`REPLACE TODO IN NEW UNMERGED CONSTANTS !!!`); }

    console.log(`####################################################`);

    console.log(`Number of new constants = ${newCodataObject.length}`);
    console.log(`Number of old constants = ${codataObject.length}`);
    console.log(`Number of merged constants = ${j}`);

};