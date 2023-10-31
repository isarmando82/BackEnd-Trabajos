export const createProductErrorInfo = (product) => {
    return `Una o más propiedades del producto estaban incompletas o no eran válidas.
    Propiedades requeridas:
    * title : Tipo String, se recibió: ${product.title}
    * description : Tipo String, se recibió: ${product.description}
    * price : Tipo Number, se recibió: ${product.price}
    * code : Tipo String, se recibió: ${product.code}
    * stock : Tipo Number, se recibió: ${product.stock}
    * status : Tipo Boolean, se recibió: ${product.status}
    * category : Tipo String, se recibió: ${product.category}
    * thumbnails : Tipo Array, se recibió: ${product.thumbnails}
    `
}

export const createUserErrorInfo = (user) => {
    return `Una o más propiedades del usuario estaban incompletas o no eran válidas.
    Propiedades requeridas:
    * first_name : Tipo String, se recibió: ${user.first_name}
    * last_name : Tipo String, se recibió: ${typeof user.last_name}
    * email : Tipo String, se recibió: ${user.email}
    * age: Tipo Number, se recibió: ${user.age}
    `
}