function merge(newCodataObject, codataObject) {

    let j = 0;
    for (let entity of codataObject) {
        const { category, name, unit, exponent, ...oldValues } = entity;
        let k = 0;
        for (let newEntity of newCodataObject) {
            if (name === newEntity.name) {
                ++j; ++k;

                if ( (unit || newEntity.unit) && (unit !== newEntity.unit) ) { alert(`${name}: unit problem ${unit}, ${newEntity.unit}`); return; }// TEST
                if ( (exponent || newEntity.exponent) && (exponent !== newEntity.exponent) ) { alert(`${name}: exponent problem ${exponent}, ${newEntity.exponent}`); return; }// TEST

                newEntity.category = category;
                for (let key in oldValues) {
                    newEntity[key] = oldValues[key]
                }

                break;
            }
        }
        if (k === 0) {
            console.log(name);
        }
    }

    console.log(`**************************`);
    console.log(`Number of merged entities = ${j}`);
    console.log(`Number of all entities = ${codataObject.length}`);
    if (j !== codataObject.length) { console.log(`CORRECT OR REMOVE ENTITIES LISTED ABOVE IN codata-object.js !!!`) }
    else { console.log(`ALL ENTITIES MERGED`) }
    console.log(`**************************`);

    for (let newEntity of newCodataObject) {
        if (newEntity.category === "TODO") {
            console.log(newEntity.name);
        }
    }

    console.log(`**************************`);
    console.log(`Number of merged entities = ${j}`);
    console.log(`Number of all newEntities = ${newCodataObject.length}`);
    if (j !== newCodataObject.length) { console.log(`REPLACE TODO CATEGORY IN new-codata-object.js !!!`) }
    else { console.log(`ALL CATEGORIES ARE SET`) }
    console.log(`**************************`);

};