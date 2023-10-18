import __dirname from '../../../utils.js';
import fileSystem from 'fs';

export class UserManager {
    #usersPath;

    constructor() {
        this.#usersPath = __dirname + '/data/users.json';
    }

    createUser = async (user) => {
        let users = await this.getUsers();
        users = JSON.parse(users);
        const lastId = users.length > 0 ? users[users.length - 1]._id : 0;
        user._id = lastId + 1;
        users.push(user);
        await this.saveUsers(users);
        return user;
    }

    getUsers = async () => {
        if (!fileSystem.existsSync(this.#usersPath)) {
            await fileSystem.promises.writeFile(this.#usersPath, "[]");
        }

        const users = await fileSystem.promises.readFile(this.#usersPath, 'utf-8');
        return users;
        
    }

    getUserById = async (id) => {
        let users = await this.getUsers();
        users = JSON.parse(users);
        return users.find(user => user._id === id);
    }

    getUserByEmail = async (email) => {
        let users = await this.getUsers();
        users = JSON.parse(users);
        return users.find(user => user.email === email);
    }

    saveUsers = async (user) => {
        await fileSystem.promises.writeFile(this.#usersPath, JSON.stringify(user));
    }
}