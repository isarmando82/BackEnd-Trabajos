const url = "http://localhost:8080/products"

function addToCart(comp) {
    let id = comp.id
    axios({
        method: 'post',
        url: url,
        data: {
            id
        }
    })
    .then(data=>console.log(data))
    .catch(err=>console.log(err))

}
