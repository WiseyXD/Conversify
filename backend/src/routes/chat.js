const express = require("express");
const { Router } = express;
const router = Router();
const { getChat, getUsersChats, createChat } = require("../controllers/chat");
const userMiddleware = require("../middlewares/user");

router.post("/", createChat);
router.get("/:userId", getUsersChats);
router.get("/find/:firstId/:secondId", getChat);

module.exports = router;
