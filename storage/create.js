function create(newCodataList, valueName) {

    const output = [];
    const pattern = /^(?<name>[^*].*?)(?:\x20{2,})(?<value>-?\d[.\d\x20]*?)(?:\x20e(?<exponent>-?\d+))?(?:\x20{2,})(?:\(exact\)|(?<unc_shift>0\.[0\x20]*)(?<uncertainty>[1-9]\d*))(?:\x20e(?<unc_exp>-?\d+))?(?:\x20{2,})(?<unit>.*)$/gm;
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
            unit: unit || undefined,
            exponent,
            [`rel-unc`]: unc_shift !== undefined ? `${+(unc_shift.concat(uncertainty).replace(/\x20/g, ``) / value.replace(/\x20/g, ``) * 10 ** 9).toPrecision(2).replace(/^-/, ``)} ppb` : undefined,
            [valueName]: `${value}${(uncertainty !== undefined) ? `(${uncertainty})` : ``}`
        });
    }
    // console.log("create");
    return output;
};