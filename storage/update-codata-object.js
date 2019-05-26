function updateCodataObject(codataObject, codata2018Object) {

    const output = [];
    j = 0;
    for (let new_entity of codata2018Object) {
        let k = 0;
        for (let entity of codataObject) {
            if (entity.name === new_entity.name) {
                ++j; ++k;
                const { category, name, unit, exponent, ...oldValues } = entity;

                output.push({
                    category,
                    name,
                    unit,
                    exponent,
                    value2018: new_entity.value2018,
                    ...oldValues
                });
                break;
            }
        }
        if (k === 0) {
            console.log(new_entity.name + "    " + new_entity.value2018);
            output.push(new_entity);
        }
    }

    console.log(`**************************`);
    console.log(`Number of new entities in old object = ${j}`);
    console.log(`Number of all new entities = ${codata2018Object.length}`);
    if (j !== codata2018Object.length) { console.log(`ADD NEW ENTITIES LISTED ABOVE TO OLD OBJECT !!!`) }
    else { console.log(`ALL NEW ENTITIES ARE IN OLD OBJECT`) }
    console.log(`**************************`);

    return output;
}