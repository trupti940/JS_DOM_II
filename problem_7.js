document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const price = parseFloat(document.getElementById('price').value);
    const rating = parseFloat(document.getElementById('rating').value);

    addProduct({ name, price, rating });

    document.getElementById('productForm').reset();
});

let products = [];

function addProduct(product) {
    products.push(product);
    updateGraphs();
}

function updateGraphs() {
    const priceGraph = document.getElementById('priceGraph');
    const ratingGraph = document.getElementById('ratingGraph');
    
    priceGraph.innerHTML = '';
    ratingGraph.innerHTML = '';

    products.forEach(product => {
        // Price graph
        const priceBar = document.createElement('div');
        priceBar.className = 'bar';
        priceBar.innerHTML = `<div style="height: ${product.price * 3}px;"></div><label>${product.name} - $${product.price}</label>`;
        priceGraph.appendChild(priceBar);

        // Rating graph
        const ratingBar = document.createElement('div');
        ratingBar.className = 'bar';
        ratingBar.innerHTML = `<div style="height: ${product.rating * 20}px; background-color: orange;"></div><label>${product.name} - ${product.rating}</label>`;
        ratingGraph.appendChild(ratingBar);
    });
}

function sortData(type) {
    if (type === 'price') {
        products.sort((a, b) => a.price - b.price);
    } else if (type === 'rating') {
        products.sort((a, b) => a.rating - b.rating);
    }
    updateGraphs();
}
