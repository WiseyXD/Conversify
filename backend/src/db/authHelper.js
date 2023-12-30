require("dotenv").config();
const { User } = require("./index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_KEY;

async function addUserToDB(name, email, password) {
    try {
        const exists = await userExistsInDB(email, password);
        if (exists) {
            throw new Error("USer Already present in DB please Login");
            return;
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const user = User.create({
            name,
            email,
            password: hashPassword,
        });
        await user.save();
        return user;
    } catch (error) {
        console.log(error.message);
        return error;
    }
}

async function loginUserToDB(email, password) {
    try {
        let credentials;
        const exists = await userExistsInDB(email, password);
        if (!exists) {
            throw new Error("User Not present in DB please Signup");
            return;
        }
        const token = jwt.sign(email, jwtKey);
        return (credentials = {
            token,
            exists,
        });
    } catch (error) {
        console.log(error.message);
        return error;
    }
}

async function userExistsInDB(email, password) {
    try {
        const exists = await User.findOne({ email });
        if (exists) {
            if (await bcrypt.compare(password, exists.password)) {
                return exists;
            }
        }
        return false;
    } catch (error) {
        console.log("Error while searching user in DB " + error.message);
        return error;
    }
}

module.exports = { loginUserToDB, addUserToDB };
