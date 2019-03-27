const http = require('http');

const port=process.env.PORT || 3000

const server = http.createServer((req,res) => {
	var baseURL = 'http://' + req.headers.host + '/';
	console.log(baseURL);
	const current_url = new URL(req.url,baseURL);
	const search_params = current_url.searchParams;
	const isbn = search_params.get('isbn');
	pageNum = search_params.get('page');

	if (pageNum === null){
		pageNum = '1'
	}
	console.log(isbn + pageNum);

	if(req.url.startsWith('/api')){
		console.log('Running test...')
		const reviewsCrawler = require('./app.js')
		reviews = reviewsCrawler(isbn,pageNum)
		//.then(console.log)
		.catch(console.error)

		reviews.then(function(value){
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(value));
		});
	}
	
	else {
		consol.log('failed');
		res.setHeader('Content-Type', 'text/html');
		res.end('<h1>Failed</h1>');
	}
});

server.listen(port);

console.log('listening on port' + port);
