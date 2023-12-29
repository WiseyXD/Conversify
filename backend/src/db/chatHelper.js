const { Chat } = require("./index");

async function findExisitingChat(firstId, secondId) {
    try {
        const exists = await Chat.find({
            members: { $all: [firstId, secondId] },
        });
        if (exists[0] == null) return false;
        return exists;
    } catch (error) {
        console.log("error in finding existing chat" + error);
    }
}

async function createNewChat(firstId, secondId) {
    try {
        const newChat = new Chat({
            members: [firstId, secondId],
        });
        const response = await newChat.save();
        return newChat;
    } catch (error) {
        console.log("Erroring creating new chat" + error);
    }
}

async function findAllChats(userId) {
    try {
        const userChats = await Chat.find({
            members: { $in: [userId] },
        });
        return userChats;
    } catch (error) {
        console.log("Erroring in getting all user chats" + error);
    }
}

module.exports = { findExisitingChat, createNewChat, findAllChats };
