const aumentar = document.getElementsByClassName('aumentar');
const reducir = document.getElementsByClassName('reducir');
const eliminar = document.getElementsByClassName('eliminar');
const finalizar = document.getElementById('finalizar');
const volver = document.getElementById('volver');
const total = document.getElementById('total');
const cantProd = document.getElementById('cantProd');
const cantArt = document.getElementById('cantArt');

volver.addEventListener('click', ()=>{
    window.location.replace('/users');
})



async function getCartData(cid){
    try {
        const response = await fetch(`/api/carts/search/${cid}`);
        if (response) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Error en la solicitud.');
        }
    } catch (error) {
        console.error(error);
    }
}
async function processData() {
    cart = await getCartData(finalizar.value);
    cantProd.innerHTML = `Cantidad de productos: ${cart.payload.products.length} `;
    const totalCantidad = sumarCantidades(cart.payload.products);
    cantArt.innerHTML = `Cantidad de articulos: ${totalCantidad}`;
    const totalPrecio = sumarPrecio(cart.payload.products);
    total.innerHTML = `Total: $${totalPrecio}`;
}

processData();

function sumarCantidades(arrayDeObjetos) {
    const total = arrayDeObjetos.reduce((acumulador, objeto) => {
        if (objeto.hasOwnProperty('quantity')) {
            return acumulador + objeto.quantity;
        }
        return acumulador;
    }, 0);
    return total;
}

function sumarPrecio(arrayDeObjetos) {
    const total = arrayDeObjetos.reduce((acumulador, objeto) => {
        if (objeto.hasOwnProperty('quantity') && objeto.hasOwnProperty('product')) {
            const precioPorCantidad = objeto.product.price * objeto.quantity;
            return acumulador + precioPorCantidad;
        }
        return acumulador;
    }, 0);
    return total;
}
for(let i = 0; i < aumentar.length; i++){
    aumentar[i].addEventListener('click', ()=>{
        fetch(`/api/carts/${finalizar.value}/products/add/${aumentar[i].id}`, {
            method: 'PUT',
        }).then(result => {
            if (result.status === 200) {
                alert('Producto agregado');
                location.reload();
            }
        })
    })
}

for(let i = 0; i < reducir.length; i++){
    reducir[i].addEventListener('click', ()=>{
        fetch(`/api/carts/${finalizar.value}/products/reduce/${reducir[i].id}`, {
            method: 'DELETE',
        }).then(result => {
            if (result.status === 200) {
                alert('Producto eliminado');
                location.reload();
            }
        })
    })
}

for(let i = 0; i < eliminar.length; i++){
    eliminar[i].addEventListener('click', ()=>{
        fetch(`/api/carts/${finalizar.value}/products/delete/${eliminar[i].id}`, {
            method: 'DELETE',
        }).then(result => {
            if (result.status === 200) {
                alert('Producto eliminado');
                location.reload();
            }
        
        })
    })
}


//ticket
finalizar.addEventListener('click', crearTicket)
async function crearTicket() {
    const cartId = finalizar.value;
    data = {cartId}
    try {
        const response = await fetch('/api/ticket/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.status === 200) {
            const result = await response.json();
            const { payload } = result;
            if (payload) {
                alert(`Ticket creado con éxito con el codigo ${payload._id}`);
                location.reload();
            }
        } else {
            console.error('Error al crear el ticket.');
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
    }
}