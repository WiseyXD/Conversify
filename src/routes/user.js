const express = require("express");
const { Router } = express;
const router = Router();
const { registerUser, loginUser } = require("../controllers/user");

router.post("/signup", registerUser);

router.post("/login", loginUser);

module.exports = router;
