function testCodataObject(codataObject, codata2018Object) {

    let j = 0;
    for (let entity of codataObject) {
        let k = 0;
        for (let new_entity of codata2018Object) {
            if (new_entity.name === entity.name) {
                ++j; ++k;

                if (new_entity.unit && entity.unit !== new_entity.unit) { alert(entity.name); }// TEST
                if (new_entity.exponent && entity.exponent !== new_entity.exponent) { alert(entity.name); }// TEST

                break;
            }
        }
        if (k === 0) {
            console.log(entity.name + "    " + entity.value2014);
        }
    }

    console.log(`**************************`);
    console.log(`Number of old entities in new list = ${j}`);
    console.log(`Number of all old entities = ${codataObject.length}`);
    if (j !== codataObject.length) { console.log(`CORRECT OR REMOVE OLD ENTITIES LISTED ABOVE !!!`) }
    else { console.log(`ALL OLD ENTITIES ARE IN NEW LIST`) }
    console.log(`**************************`);
};