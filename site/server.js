var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
//var router = express.Router();
var fs = require('fs');

// Load allproducts from json file.
var allProducts = JSON.parse(fs.readFileSync('data/product/allproducts.json', 'utf8'));

/*
** Products API (should be placed in its own file).
** Retrieve the page number spefified in 'page',
** like '/api/products?page=1'. First page is '0'.
*/
app.get('/api/products', function(req, res, next) {
    var requestedPage = req.query.page;
    var pageToLoad = Number(requestedPage);
    console.log("PageToLoad:" + pageToLoad);
    
    var content = {};
    content.paging = {};
    
    content.paging.currentPage = pageToLoad;
    content.paging.displayPage = pageToLoad + 1;
    content.paging.numberOfPages = Math.ceil(allProducts.length / 16);
    content.paging.currentCategory = "ALL";
    content.paging.totalNumberOfProducts = allProducts.length;
	
    var startIndex = content.paging.currentPage * 16;
    var endIndex = startIndex + 16;
    
	console.log("Start:" + startIndex);
	console.log("End:" + endIndex);
    content.products = allProducts.slice(startIndex, endIndex);
    
    var jsonData = JSON.stringify(content);
    res.send(jsonData);
});

/*
** Serve products page per default.
*/
app.get('/', function(req, res){
    res.sendfile('products.html', { root: __dirname + "/" } );
});

/*
**
*/
app.post('/api/uploadimage', function(req, res, next) {
  res.json(req.body);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/'));

app.listen(8080);