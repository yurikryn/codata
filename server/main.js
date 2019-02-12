let express = require('express');
let url = require('url');
let codata = require('./codata');
let codataMethods = require('./codataMethods');

let app = express();
app.use(express.json());
{
let books = {};
let nextBookId = 0;

app
.get('/api/codata/*', function (req, res) {
	const urlObject = url.parse(req.url, true);
	const adressArray = urlObject.pathname
		.replace(/^(?:\/)?/,``).replace(/(?:\/)?$/,``).split(/\//);
		
		let obj = codata.object;
		for(let i = 2; i < adressArray.length; i++){
			const name = decodeURIComponent(adressArray[i]);
			if(obj[name] === undefined){ break;}
			else{
				obj = obj[name];
			}
		}
		res.write(`${codataMethods.JSONstringify(codataMethods.content(obj), 1)}`);
		res.end();
})

.get('/api/book', function(req, res) {
	res.write("\n" + JSON.stringify(books,null, 2) + "\n");
	res.end();
})

.post('/api/book', function(req, res) {
	let book = req.body;
	if (!book.title || !book.author) {
		res.status(400);
		res.send('book.title and book.author are required\n');
	} else {
		res.status(201);
		book.id = nextBookId++;
		let {id, ...bookContent} = book;
		books[id] = bookContent;
		res.location(`/api/book/${book.id}`)
	}
	res.end();
})

.get('/api/book/:bookId', function(req,res) {
	let answer = books[req.params.bookId];
	if(!answer){
		res.status(404);
		res.send('There is no such book\n');
	} else{
		res.write("\n" + JSON.stringify(answer,null, 2) + "\n");
	}
	res.end();
})

.delete('/api/book/:bookId', (req,res) => {
	let answer = books[req.params.bookId];
	if(!answer){
		res.status(404);
		res.send('There is no such book to delete\n');
	} else{
		delete books[req.params.bookId];
	}
	res.end();
})

.listen(8080);

}

//api format to be /api/codata/UNIVRESAL/... --- done
//create mobile client --- done
//error handling
//SQL injection
//clients add new constans to the database 