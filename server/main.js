let http = require('http');
let url = require('url');
let codata = require('./codata');
let codataMethods = require('./codataMethods');

http.createServer(function (req, res) {
	//res.writeHead( 200, { 'Access-Control-Allow-Origin' : '*' } );
	const urlObject = url.parse(req.url, true);
	const adressArray = urlObject.pathname
		.replace(/^(?:\/)?/,``).replace(/(?:\/)?$/,``).split(/\//);
    if(adressArray[0] !== `api` || adressArray[1] !== `codata`){res.write(`Bad enter`);}	
	else {
		let obj = codata.object;
		for(let i = 2; i < adressArray.length; i++){
			const name = decodeURIComponent(adressArray[i]);
			if(obj[name] === undefined){ break;}
			else{
				obj = obj[name];
			}
		}
		res.write(`${codataMethods.JSONstringify(codataMethods.content(obj), 1)}`);
	};
	res.end();
}).listen(8080);

//api format to be /api/codata/UNIVRESAL/... --- done
//create mobile client --- done
//error handling
//SQL injection
//clients add new constans to the database 