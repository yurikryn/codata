function create(newCodataList, valueName) {

    const output = [];

    const pattern =
        /^(?:(?<field1>(?<name>\S+(?:\x20\S+)*)(?:\x20{2,}))(?<field2>(?<value>-?(?:[1-9]\d{0,2}(?:\x20\d{3})+|[1-9]\d{0,3}|0)(?<valDec>\.(?:\d{3}\x20)*\d{1,4}(?<dots>\.{3})?)?)(?<expField>\x20e(?<exponent>-?[1-9]\d?)|)(?:\x20{2,}))(?<field3>(?:\(exact\)|(?<uncertainty>0(?:\.(?:0{3}\x20)*(?:(?=[1-9]\d)|0{1,2}|0{3}(?=[1-9]\x20))|\.)(?<uncertaintyTail>[1-9]\d?))\k<expField>)(?:\x20{2,}))(?<unit>[a-zA-Z]+(?:\^(?:[2-9]|-[1-9]))?(?:\x20[a-zA-Z]+(?:\^(?:[2-9]|-[1-9]))?)*|E_h|Hz\x20V_90\^-1|ohm_90|MeV\/c|\(GeV\/c\^2\)\^-2)?|(?<row>.*?))$/gm;

    while (res = pattern.exec(newCodataList)) {

        const { field1, name, field2, value, valDec, dots, exponent, field3, uncertainty, uncertaintyTail, unit, row } = res.groups;

        if (row || uncertainty && (dots || !valDec || uncertainty.length !== valDec.length + 1)
            || field1.length !== 60 || field2.length !== 25 || field3.length !== 25) {
            alert(`SOMETHING WRONG IN NEW CONSTANTS !!!\n"${row || name}"`);
            break;
        }

        output.push({
            category: "TODO",
            name,
            unit,
            exponent,
            //relative: uncertainty && `${+(uncertainty.replace(/\x20/g, ``) / value.replace(/\x20/g, ``) * 10 ** 9).toPrecision(2).replace(/^-/, ``)} ppb`,
            //relative2: uncertainty && `${+(0.5 / value.replace(/[\.\x20]/g, ``) * 10 ** 9).toPrecision(4).replace(/^-/, ``)} ppb`,
            relative: uncertainty && `${+(uncertaintyTail / value.replace(/[\.\x20]/g, ``) * 10 ** 9).toPrecision(5).replace(/^-/, ``)} ppb`,
            [valueName]: `${value}${(uncertainty !== undefined) ? `(${uncertaintyTail})` : ``}`
        });
    }
    return output;
};