(function($) {
    "use strict";

    var app = {};
    app.paging = {};
    
    $(function () {
        // Run on DOM ready
    });

    /*
    ** Returns a HTML paragraph element.
    ** Paragraph text and CSS class may
    ** be specified.
    */
    function getParagraph(text, cssclass) {
        var p = $('<p>').attr({
            class: cssclass || ''
        });
        p.append(text || '');
        return p;
    }

	/*
	** Determine next page and load data.
	*/
    function nextPage() {
        var paging = app.paging;
		var curPage = paging.currentPage;
        
		// Determine next page.
		paging.currentPage = paging.currentPage < (paging.numberOfPages -1) ? paging.currentPage = paging.currentPage + 1 : paging.currentPage;
		
		// Only call the server if the page has changed.
		if(paging.currentPage > curPage) {
        	getProducts(paging.currentPage);
		}
    }
      
	/*
	** Determine previous page and load data.
	*/
    function prevPage() {
        var paging = app.paging;
		var curPage = paging.currentPage;
		
		// Determine previous page.
        paging.currentPage = paging.currentPage > 0 ? paging.currentPage = paging.currentPage - 1 : paging.currentPage;
        getProducts(paging.currentPage);
		
		// Only call the server if the page has changed.
		if(paging.currentPage < curPage) {
        	getProducts(paging.currentPage);
		}
    }
    
    /*
    ** Retrieve products by calling the
	** products API on the server.
    */
    function getProducts(pageNumber) {
        var productsUrl = '/api/products?page=' + pageNumber;
        $.ajax({
            url: productsUrl,
            type: 'get',
            dataType: 'json',
            success: displayData
        });
    }
    
    /*
    ** This function is invoked when data has been
	** retrieved from the server. Displaying data
	** is seperated between navigation and product data.
    */
    function displayData(data) {
        handleNavigation(data.paging);
        displayProducts(data.products);
    }
    
	/*
	** Handle page navigation and page numbering.
	** Set local paging data with data from server. 
	*/
    function handleNavigation(data) {
		// Store paging data.
        app.paging.numberOfPages = data.numberOfPages;
        app.paging.currentPage = data.currentPage;
		app.paging.displayPage = data.displayPage;

		// Set page number.
		var text = app.paging.displayPage + "/" + app.paging.numberOfPages;
		var currentPageTop = $('#navcurrentpagetop');
		var currentPageButtom = $('#navcurrentpagebuttom');
		$(currentPageTop).html(text);
		$(currentPageButtom).html(text);
    }

    /*
    ** Lists the products in the products
    ** data array.
    */
    function displayProducts(data) {
        var output = $('#products').empty(); // Section to hold products.
		
        // Create div for each product.
        $.each(data, function (idx, obj) {
			var colDiv = $('<div>').attr({
				'class': 'col col-phone-12 col-tablet-6 col-desktop-3'
			})
			
            var productDiv = $('<div>').attr({
                id: obj.productNumber,
                'class': 'product'
            });
			colDiv.append(productDiv);
            
            // Add the product image.
            var prdImg = $('<img>').attr({
                src: obj.productImage,
                'class': 'productimage'
            });
            var imgDiv = $('<div>');
            imgDiv.append(prdImg);
            productDiv.append(imgDiv);
       
            // Add product name.
            var prdNam = getParagraph(obj.productName);
            productDiv.append(prdNam);

            // Add product category.
            var prdCat = getParagraph('(' + obj.category + ')', 'productfooter');
            productDiv.append(prdCat);
            
            // Add formatted product price.
            var number = numeral(obj.price);
            var price = number.format('$0,0.00');
            var prdPrice = getParagraph(price, 'productprice');
            productDiv.append(prdPrice);

			// Add buy btton.
            var btn = $('<a>');
            btn.attr({
                id: 'btnbuy_' + obj.productNumber,
                'class': 'button'
            });
            btn.on('click', function () {
                // Add to basket stuff here.
            });
            btn.append("BUY");
            productDiv.append(btn);
            
			// Output to page.
            output.append(colDiv);
        });
    }        
    
	/*
	** Initialize the page (event handlers, global variables etc.).
	*/
	function init() {
		// Register event handlers for prev and next.
		var prevTop = $('#navprevpagetop');
		var nextTop = $('#navnextpagetop');
		var prevButtom = $('#navprevpagebuttom');
		var nextButtom = $('#navnextpagebuttom');
		
		// Top navigation.
		$(prevTop).on('click', function(e) {
			e.preventDefault();
			prevPage();
		});

		$(nextTop).on('click', function(e) {
			e.preventDefault();
			nextPage();
		});

		// Buttom navigation.
		$(prevButtom).on('click', function(e) {
			e.preventDefault();
			prevPage();
		});

		$(nextButtom).on('click', function(e) {
			e.preventDefault();
			nextPage();
		});

		// Start page for product browsing.
		app.paging.currentPage = 0;
	}

	init();
    getProducts(app.paging.currentPage);
    
})(jQuery);



