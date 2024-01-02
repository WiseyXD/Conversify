const { Server } = require("socket.io");

const io = new Server({
    cors: "http://localhost:5173/",
});

let onlineUsers = [];

io.on("connection", (socket) => {
    console.log("New Connection " + socket.id);
    // Listen to connection
    socket.on("addNewUser", (userId) => {
        !onlineUsers.some((user) => user.userId === userId) &&
            onlineUsers.push({
                userId,
                socketId: socket.id,
            });
        io.emit("getOnlineUsers", onlineUsers);
        console.log(onlineUsers);
    });
    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    });
});

io.listen(3000);
