const addProductoToCart = async (productId, cartId) => {
    const headers = new Headers({
        "Content-Type": "application/x-www-form-urlencoded"
     });
     try {
         const rta = await fetch('/api/carts/' + cartId + '/product/' + productId, {
             method: 'POST',
             headers: headers,
         });
         const resultado = await rta.json();
         if (resultado.status !== 'failed') {
             alert('Producto agregado exitosamente')
         } else {
             alert('Algo salió mal: ' + resultado.message);
         }
     } catch (error) {
         console.log('Error: ' + error);
     }
}