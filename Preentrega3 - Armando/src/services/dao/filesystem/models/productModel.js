/* import fs from 'fs';  */


export default class Product{
    constructor (title, description, price, status, thumbnail, code, stock, id, available ){
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.status = true;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.available = available;
    }
};



