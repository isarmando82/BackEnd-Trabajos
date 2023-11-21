import userModel from './models/user.model.js';
import { UserDTO } from '../dto/user.dto.js';
import CustomError from "../../errors/CustomError.js";
import EnumErrors from "../../errors/enum.js";
import { createUserErrorInfo } from "../../errors/info.js";

export class UserManager {
    createUser = async (user) => {
        if (!user.first_name || !user.last_name || !user.email || !user.age) {
            CustomError.createError(
                {
                    name: "Error al Generar el Usuario Local",
                    cause: createUserErrorInfo(user),
                    message: "Error al intentar guardar el Usuario",
                    code: EnumErrors.INVALID_TYPES_ERROR
                }
            )
        } else {
            return await userModel.create(user);
        }
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
        //primero cargo los datos del usuario
        let user = await userModel.findById(id);
        //luego actualizo los datos, si es que están setados
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
        //actualizo el usuario
        await userModel.updateOne({ _id: id }, new UserDTO(user));
    }

    deleteUser = async (id) => {
        await userModel.deleteOne({ _id: id });
    }
}