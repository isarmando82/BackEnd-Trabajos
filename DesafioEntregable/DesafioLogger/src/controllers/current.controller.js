import { userManager } from "../services/factory.js"

const getCurrentController = async (req, res) => {
    const users = await userManager.getUsers();
    res.render('current', { users: users });
}

const getUpdateUserController = async (req, res) => {
    const uid = req.params.uid;
    const userData = await userManager.getUserById(uid);
    if (userData.role === 'Admin') {
        userData.isAdmin = true;
    } else {
        userData.isUser = true;
    }
    res.render('updateuser', { userData: userData });
}

const putUpdateUserController = async (req, res) => {
    const { uid } = req.params;
    const { first_name, last_name, email, age, role } = req.body;
    const userData = { first_name, last_name, email, age, role };
    await userManager.updateUser(uid, userData);
    res.status(200).json({ message: "User updated" });
}

const deleteUserController = async (req, res) => {
    const { uid } = req.params;
    await userManager.deleteUser(uid);
    res.status(200).json({ message: "User deleted" });
}

export { getCurrentController, putUpdateUserController, deleteUserController, getUpdateUserController }