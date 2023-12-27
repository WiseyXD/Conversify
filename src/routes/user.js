const express = require("express");
const { Router } = express;
const router = Router();
const {
    registerUser,
    loginUser,
    findUserById,
    getAllUsers,
} = require("../controllers/user");

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/find/:userId", findUserById);
router.get("/", getAllUsers);

module.exports = router;
