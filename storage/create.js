function create(newCodataList, valueName) {

    const output = [];
    const pattern = /^(?<name>\S+(?:\x20\S+)*)(?:\x20{2,})(?<value>-?\d{1,4}(?:\x20\d{3})*(?:\.(?:\d{3}\x20)*\d{1,4}(?:\.{3})?)?)(?:\x20e(?<exponent>-?[1-9]\d?))?(?:\x20{2,})(?:\(exact\)|(?<unc_shift>0\.(?:0{3}\x20)*0{0,3})(?<uncertainty>[1-9]\d?))(?:\x20e(?<unc_exp>-?[1-9]\d?))?(?:\x20{2,})(?<unit>[-\d\w^_\x20()/]+)?$/gm;
    let res, i = 0;
    while (res = pattern.exec(newCodataList)) {
        ++i;
        const { name, value, exponent, unc_shift, uncertainty, unc_exp, unit } = res.groups;

        if (!name || !value) { alert(i + 1); break; }// TEST
        if (exponent && unc_exp && exponent !== unc_exp) { alert(i + 1); break; }// TEST
        if (unc_shift === undefined && (uncertainty !== undefined || unc_exp !== undefined)) { alert(i + 1); break; }// TEST

        output.push({
            category: "TODO",
            name,
            unit,
            exponent,
            relative: unc_shift && `${+(unc_shift.concat(uncertainty).replace(/\x20/g, ``) / value.replace(/\x20/g, ``) * 10 ** 9).toPrecision(2).replace(/^-/, ``)} ppb`,
            [valueName]: `${value}${(uncertainty !== undefined) ? `(${uncertainty})` : ``}`
        });
    }
    return output;
};