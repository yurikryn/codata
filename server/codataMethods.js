/**********************************************************************************************/
exports.content = function(input){
	const isNotObject = (arg) => typeof arg !== `object` || arg === null;
	
	if(isNotObject(input)){ return input;}
	else {
	    let output = [];
		for(let key in input){
			if( !isNotObject(input[key]) ){ output.push(key); }
			else{ output.push({ [key]: input[key] }); }
		}
		return output;
	}
};
/**********************************************************************************************/
exports.JSONparse = function(str){
	
	let obj = JSON.parse(str);
	
	JSON.stringify(obj,replacer);
		
	function replacer(key,value){
		const prefix = `obj`;
		const getDest = new Function( prefix, "adress", "return eval(adress)");
		const setDest = new Function( prefix, "adress", "lastAdress", "eval(`${adress} = lastAdress`)");
		const isNotAdress = (arg) => typeof arg !== `string` || !arg.startsWith( prefix );
		
		function evaluator(adress){
			let dest = getDest( obj, adress);
			if( isNotAdress(dest) ){ evaluator.lastAdress = adress; evaluator.destination = dest;}
			else{
				setDest( obj, adress, undefined);
				evaluator(dest);
				setDest( obj, adress, evaluator.lastAdress);
			}
		};
		
		if( isNotAdress(value) ){ return value;} // nothing to do
		else{
			this[key] = undefined;
			evaluator(value);
			if(evaluator.destination !== undefined){ this[key] = evaluator.destination;}
			else if(Array.isArray(this)){ this[key] = null;}
			else{ delete this[key];}
			return undefined;
		} // connect to destination
	}
	
	return obj;
}
/**********************************************************************************************/
exports.JSONstringify = function(obj,indent){
	const valueKey = Symbol();
	const isNotObject = (arg) => typeof arg !== `object` || arg === null;
	
	const str = JSON.stringify(obj,replacer_1,indent);
	
	function replacer_1(key,value){
		const prefix = `obj`;
		if( isNotObject(value) ){ return value;} // nothing to do
		else if( value[valueKey] ){ return value[valueKey];} // adress was already created
		else{
			value[valueKey] = !this[valueKey] ? prefix : `${this[valueKey]}['${key}']` ;
			return value;
		} // create adress
	}
	
	JSON.stringify(obj,replacer_2);
	
	function replacer_2(key,value){
		if( isNotObject(value) ){ return value;} // nothing to do
		else if( value[valueKey] ){ delete value[valueKey]; return value;} // delete adress
		else{ return undefined;} // already was already deleted
	}
	
	return str;
}
/**********************************************************************************************/