// Create Message
// Gte Messages
const { Message } = require("../db/index");

async function createMessage(req, res) {
    const { chatId, senderId, text } = req.body;
    try {
        const newMessage = new Message({
            chatId,
            senderId,
            text,
        });
        const response = await newMessage.save();
        res.status(201).json({ response });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}

async function getMessages(req, res) {
    const chatId = req.params.chatId;
    try {
        const message = await Message.find({ chatId });
        if (!message) throw new Error("No message found with " + chatId);
        res.status(200).json({ message });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}

module.exports = { getMessages, createMessage };
