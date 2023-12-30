const bcrypt = require("bcrypt");
const { User } = require("../db/index");
const { loginUserToDB, addUserToDB } = require("../db/authHelper");
const { signupSchema, loginSchema } = require("../utils/inputValidation");

async function registerUser(req, res) {
    // Signup Logic
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    try {
        const response = signupSchema.safeParse({
            email,
            name,
            password,
        });
        if (!response.success) {
            throw new Error(response.error.errors[0].message);
        }
        const user = await addUserToDB(name, email, password);
        user.save();
        res.status(201).json({
            msg: "User Creation Succesfull",
            user,
        });
    } catch (error) {
        msg = error.message;
        res.status(400).json({
            msg,
        });
    }
}

async function loginUser(req, res) {
    // Login Logic
    const email = req.body.email;
    const password = req.body.password;
    try {
        const response = loginSchema.safeParse({
            email,
            password,
        });
        if (!response.success) {
            throw new Error(response.error.errors[0].message);
        }
        const token = await loginUserToDB(email, password);
        res.status(200).json({
            token,
        });
    } catch (error) {
        msg = error.message;
        res.status(400).json({
            msg,
        });
    }
}

async function findUserById(req, res) {
    const id = req.params.userId;
    try {
        const user = await User.findById(id);
        res.status(200).json({ user });
    } catch (error) {
        console.log(error);
        const msg = error.message;
        res.status(500).json({
            msg,
        });
    }
}

async function getAllUsers(req, res) {
    try {
        const users = await User.find({});
        res.status(200).json({ users });
    } catch (error) {
        console.log(error);
        const msg = error.message;
        res.status(500).json({
            msg,
        });
    }
}

module.exports = { registerUser, loginUser, findUserById, getAllUsers };
