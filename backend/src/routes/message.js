const express = require("express");
const router = express.Router();

const { getMessages, createMessage } = require("../controllers/message");

router.post("/", createMessage);
router.get("/:chatId", getMessages);

module.exports = router;
