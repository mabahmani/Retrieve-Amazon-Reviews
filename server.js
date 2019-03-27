const http = require('http');

const server = http.createServer((req,res) => {
	var baseURL = 'http://' + req.headers.host + '/';
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
});

server.listen(3000);

console.log('listening on port 3000');