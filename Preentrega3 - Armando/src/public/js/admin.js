const findProd = document.getElementById('findProd')
const logout = document.getElementById('logout');
const updateProd = document.getElementById('update');
const createProd = document.getElementById('create');
const deleteProd = document.getElementById('delete');
const prodForm = document.getElementById('prodForm');

let prodUpdate = []

logout.addEventListener('click', e => {
    e.preventDefault();
    fetch('/api/users/logout', {
        method: 'GET',
    }).then(result => {
        if (result.status === 200) {
            alert('Sesion cerrada');
            window.location.replace('/users/login');
        }
    })
})

findProd.addEventListener('submit', funcFindProd);
deleteProd.addEventListener('click', delprod);
updateProd.addEventListener('click', updProd);
createProd.addEventListener('click', crtProd);

async function funcFindProd(e) {
    prodUpdate.splice(0, prodUpdate.length)
    e.preventDefault();
    let id = document.getElementById('pid').value;
    console.log(id);
    const response = await fetch(`/api/products/findOne/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'           
        }
    });
    if (response.status === 200 ) {
        const prod = await response.json();
        console.log(prod);
        prodUpdate.push(prod);
        console.log(prodUpdate);
        findProd.reset();

        const prodData = prodUpdate[0].payload;
        if (!prodData) {
            prodForm.reset();
            alert('No hay datos disponibles para este producto');
            
        }else{            
        document.getElementById('id').value = prodData._id;
        document.getElementById('title').value = prodData.title;
        document.getElementById('description').value = prodData.description;
        document.getElementById('price').value = prodData.price;
        document.getElementById('status').value = prodData.status;
        document.getElementById('thumbnail').value = prodData.thumbnail;
        document.getElementById('code').value = prodData.code;
        document.getElementById('stock').value = prodData.stock;
        document.getElementById('available').value = prodData.available;
    }

    }
    else if (response.status === 401) {
        alert('Producto no encontrado');
    };
};


async function delprod(e) {
    e.preventDefault();
    let id = document.getElementById('id').value;
    console.log(id);
    const result = await fetch(`/api/products/deleteOne/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'           
        }
    }).then(result => {
        if (result.status === 200) {
            alert('Producto eliminado');
            prodForm.reset();
        }
            else if (result.status === 401) {
                alert('Producto no encontrado');
            };
    });
};


async function updProd(e) {
    e.preventDefault();
    let id = document.getElementById('id').value; 
    console.log(id);
    const data = new FormData(prodForm);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);
    console.log("el objeto es: ");
    console.log(obj);
    const result = await fetch(`/api/products/updateOne/${id}`,{
        method: 'PUT',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'           
        }}).then(result => {
            if (result.status === 200) {
                alert('Producto actualizado');
                prodForm.reset();
            }
                else if (result.status === 401) {
                    alert('Producto no encontrado');
                };
            });
    }

async function crtProd(e) {
    e.preventDefault();
    const data = new FormData(prodForm);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);
    console.log("el objeto es: ");
    console.log(obj);
    const result = await fetch(`/api/products/createOne`,{
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'           
        }}).then(result => {
            if (result.status === 200) {
                alert('Producto creado con exito');
                prodForm.reset();
            }
                else if (result.status === 401) {
                    alert('Error al crear el producto');
                };
            });

}




