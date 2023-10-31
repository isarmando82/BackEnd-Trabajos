const removeProductFromCart = async (productId, cartId) => {
    const headers = new Headers({
        "Content-Type": "application/x-www-form-urlencoded"
     });
     try {
         const rta = await fetch('/api/carts/' + cartId + '/product/' + productId, {
             method: 'DELETE',
             headers: headers,
         });
         const resultado = await rta.json();
         if (resultado.status !== 'failed') {
             location.href="/carts/" + cartId;
         } else {
             alert('Algo salió mal: ' + resultado.message);
         }
     } catch (error) {
         console.log('Error: ' + error);
     }
}