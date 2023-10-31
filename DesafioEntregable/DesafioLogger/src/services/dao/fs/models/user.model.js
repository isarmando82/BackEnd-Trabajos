export default class userModel {
    constructor(id, first_name, last_name, email, age, password, registerMethod, cartId, role) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name; 
        this.email = email;
        this.age = age;
        this.password = password;
        this.registerMethod = registerMethod;
        this.cartId = cartId;
        this.role = role;
    }
}