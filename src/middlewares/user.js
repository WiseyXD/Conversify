require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_KEY;

async function userMiddleware(req, res, next) {
    try {
        const headers = req.headers.authorization;
        const token = headers && headers.split(" ")[1];
        if (!token) {
            throw new Error("No JWT Token provided");
        }
        jwt.verify(token, jwtKey, (err, decoded) => {
            if (err) {
                throw new Error("Invalid JWT Token");
            }
            req.email = decoded.email;
            next();
        });
    } catch (error) {
        const msg = error.message;
        res.status(400).json({
            msg,
        });
    }
}

module.exports = userMiddleware;
