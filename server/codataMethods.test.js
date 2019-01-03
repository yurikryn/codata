const codataMethods = require('./codataMethods');

test('stringifying parsed JSON string same as original', () => {
	let a = `{"qwe":23,"rty":{"a sd":"23"}}`;
	let a_obj =  codataMethods.JSONparse(a);
	let b = codataMethods.JSONstringify(a_obj)
	expect(b).toBe(a);
});

test(`stringify produces output that can be parsed to object equal to original`, () => {
	let a = {
			"qwe":23,
			"rty":{
					"asd":"23"
				}
		};
	a.uio = a[`rty`]; 
	a_str = codataMethods.JSONstringify(a);
	let b = codataMethods.JSONparse(a_str);
	
	expect(b).toEqual(a);
});

test('stringify produces correct output for object with spaces in keys', () => {
	let a = {
			"qwe":23,
			"r ty":{
					"asd":"23"
				}
		};
	a.uio = a[`r ty`]; 
	a_str = codataMethods.JSONstringify(a);
	let b = codataMethods.JSONparse(a_str);
	
	expect(b).toEqual(a);
});
