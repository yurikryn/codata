function create(newCodataList, valueName) {

    const output = [];
    const pattern = /^(?:(?<name>\S+(?:\x20\S+)*)(?:\x20{2,})(?<value>-?(?:[1-9]\d{0,2}(?:\x20\d{3})+|[1-9]\d{0,3}|0)(?<valDec>\.(?:\d{3}\x20)*\d{1,4}(?<dots>\.{3})?)?)(?<expField>\x20e(?<exponent>-?[1-9]\d?)|)(?:\x20{2,})(?:\(exact\)|(?<uncertainty>0(?:\.(?:0{3}\x20)*(?:(?=[1-9]\d)|0{1,2}|0{3}(?=[1-9]\x20))|\.)(?<uncertaintyTail>[1-9]\d?))\k<expField>)(?:\x20{2,})(?<unit>[-\d\w^_\x20()/]+)?|(?<row>.*?))$/gm;

    while (res = pattern.exec(newCodataList)) {

        const { name, value, valDec, dots, exponent, uncertainty, uncertaintyTail, unit, row } = res.groups;

        if (row || uncertainty && (dots || !valDec || uncertainty.length !== valDec.length + 1)) {
            alert(`SOMETHING WRONG IN NEW CONSTANTS !!!\n"${row || name}"`);
            break;
        }

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