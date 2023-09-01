import ProductModel from "../../models/product.js";

export default class ProductManager {
  #products;
  constructor() {
    this.#products = [];
  }

  async getProducts (limit, page, query, sort) {
    let getLimit = limit !== undefined ? limit : 10
    let getPage = page !== undefined ? page: 1
    let getQuery = query !== undefined ? {category: query} : {}
    let getSort = sort === '-'? sort : '+'

    this.#products = await ProductModel.paginate(getQuery, {limit:getLimit, page:getPage, sort: `${getSort}price`})
    return this.#products
  }

  async getProductById (id) {
    let product = await ProductModel.findById(id)
    return product
  }

  async addProduct (title, description, price, thumbnail, code, stock, category) {
    // const {title, description, price, thumbnail, code, stock, category} = product
    try {
        let product = await ProductModel.create({
        title,
        description,
        price,
        thumbnail: (thumbnail===undefined? "Sin imagen" : thumbnail),
        code,
        stock, 
        category
        })
        console.log('Product added');
        return (product)
    } catch (error) {
        return error
    }
  }

  async updateProduct (id, obj) {
    try {
         await ProductModel.findByIdAndUpdate(id, obj, (err, doc)=>{
          if (err) console.log(err);
          else {console.log('updated');}
        })
    } catch (error) {
        console.log(error);
    }
  }

  async deleteProduct (id) {
    try {
        await ProductModel.findByIdAndDelete(id, (err, doc)=>{
          if (err) console.log(err);
          else {console.log('deleted');}
        })
    } catch (error) {
        console.log(error);
    }
  }
}
