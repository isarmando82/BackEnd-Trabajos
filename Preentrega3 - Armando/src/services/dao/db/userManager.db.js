import userModel from './models/user.model.js';
import { UserDTO } from '../dto/user.dto.js';
export class UserManager {
    createUser = async (user) => {
        return await userModel.create(user);
    }

    getUsers = async () => {
        return await userModel.find().lean();
    }

    getUserById = async (id) => {
        return await userModel.findById(id).lean();
    }

    getUserByEmail = async (email) => {
        return await userModel.findOne({ email });
    }

    updateUser = async (id, userData) => {
     
        let user = await userModel.findById(id);
  
        if (userData.first_name) {
            user.first_name = userData.first_name;
        }
        if (userData.last_name) {
            user.last_name = userData.last_name;
        }
        if (userData.email) {
            user.email = userData.email;
        }
        if (userData.age && !isNaN(userData.age)) {
            user.age = userData.age;
        }
        if (userData.role == 'Admin') {
            user.role = 'Admin';
        } else {
            user.role = 'Usuario';
        }

        await userModel.updateOne({ _id: id }, new UserDTO(user));
    }

    deleteUser = async (id) => {
        await userModel.deleteOne({ _id: id });
    }
}