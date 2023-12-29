require("dotenv").config();
const mongoose = require("mongoose");

mongoose
    .connect(process.env.MONGOOSE_URL)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err.message));

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const chatSchema = new mongoose.Schema(
    {
        members: Array,
    },
    {
        timestamps: true,
    }
);

const messageSchema = new mongoose.Schema(
    {
        chatId: String,
        senderId: String,
        text: String,
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);
const Chat = mongoose.model("Chat", chatSchema);
const Message = mongoose.model("Message", messageSchema);

module.exports = { User, Chat, Message };
