const socketClient = io()



socketClient.on('all-products', dataProd => {
    console.log(dataProd)
    const productList = document.getElementById('productList');
    const arrayProd = dataProd.dataProd;
    productList.innerHTML = '';


        arrayProd.forEach((product) => {
            let div = document.createElement('div');
            div.innerHTML = `
            <h1>Product: ${product.title}</h1>
            <h2>Description: ${product.description}</h2>
            <h2>Price: $${product.price}</h2>
            <p>Stock: ${product.stock}</p>
            <p>Stock: ${product.id}</p>
            
            
`

        productList.appendChild(div);
    }); 
});

