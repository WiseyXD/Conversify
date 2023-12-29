const express = require("express");
const { Router } = express;
const router = Router();
const {
    registerUser,
    loginUser,
    findUserById,
    getAllUsers,
} = require("../controllers/user");
const userMiddleware = require("../middlewares/user");

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/find/:userId", userMiddleware, findUserById);
router.get("/", userMiddleware, getAllUsers);

module.exports = router;
