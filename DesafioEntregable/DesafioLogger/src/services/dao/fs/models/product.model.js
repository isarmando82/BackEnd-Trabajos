export default class productModel {
    constructor (id, title, description, price, code, thumbnails, stock, status, category) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.code = code;
        this.thumbnails = thumbnails;
        this.stock = stock;
        this.status = status;
        this.category = category;
    }
}