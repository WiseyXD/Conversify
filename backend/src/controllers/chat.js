const {
    findExisitingChat,
    createNewChat,
    findAllChats,
} = require("../db/chatHelper");

async function createChat(req, res) {
    const { firstId, secondId } = req.body;
    try {
        const exists = await findExisitingChat(firstId, secondId);
        if (exists) return res.status(200).json({ exists });
        const newChat = createNewChat(firstId, secondId);
        res.status(201).json({ newChat });
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({
            error,
        });
    }
}

async function getUsersChats(req, res) {
    const userId = req.params.userId;
    try {
        const allChats = await findAllChats(userId);
        if (!allChats) throw new Error("No Chats to display");
        res.status(200).json({ allChats });
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({
            error,
        });
    }
}

async function getChat(req, res) {
    const { firstId, secondId } = req.params;
    try {
        const chat = await findExisitingChat(firstId, secondId);
        if (!chat)
            throw new Error("can not get that chat between particular ids");
        res.status(200).json({ chat });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error });
    }
}

module.exports = { getChat, getUsersChats, createChat };
