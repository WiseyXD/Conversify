require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");
const chatRoutes = require("./routes/chat");
const messageRoutes = require("./routes/message");

app.use(cors());
app.use(bodyParser.json());

app.use("/users", userRoutes);
app.use("/chats", chatRoutes);
app.use("/messages", messageRoutes);

app.listen(process.env.PORT || 5000, () => {
    console.log("Server is Listening at " + process.env.PORT || 5000);
});
