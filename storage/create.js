function create(newCodataList, valueName) {

    const output = [];
    const pattern = /^(?:(?<name>\S+(?:\x20\S+)*)(?:\x20{2,})(?<value>-?(?:[1-9]\d{0,3}(?:\x20\d{3})*|0)(?:\.(?:\d{3}\x20)*\d{1,4}(?:\.{3})?)?)(?:\x20e(?<exponent>-?[1-9]\d?))?(?:\x20{2,})(?:\(exact\)|(?<uncertainty>0\.(?:0{3}\x20)*0{0,3}(?<uncertaintyTail>[1-9]\d?)))(?:\x20e\k<exponent>)?(?:\x20{2,})(?<unit>[-\d\w^_\x20()/]+)?|(?<row>.*?))$/gm;

    while (res = pattern.exec(newCodataList)) {

        const { name, value, exponent, uncertainty, uncertaintyTail, unit, row } = res.groups;

        if (row) { alert(`SOMETHING WRONG IN NEW CONSTANTS !!!\n"${row}"`); break; }

        output.push({
            category: "TODO",
            name,
            unit,
            exponent,
            relative: uncertainty && `${+(uncertainty.replace(/\x20/g, ``) / value.replace(/\x20/g, ``) * 10 ** 9).toPrecision(2).replace(/^-/, ``)} ppb`,
            [valueName]: `${value}${(uncertainty !== undefined) ? `(${uncertaintyTail})` : ``}`
        });
    }
    return output;
};