const { Server } = require("socket.io");

const io = new Server({
    cors: {
        origin: "http://localhost:5173", // Allow frontend URL
        methods: ["GET", "POST"],
    },
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
    });

    // send message
    // socket.on("sendMessage", (message) => {
    //     const user = onlineUsers.find(
    //         (user) => user.userId === message.recepientId
    //     );
    //     if (user) {
    //         io.to(user.socketId).emit("getMessage", message);
    //     }
    // });

    socket.on("sendMessage", (message) => {
        console.log("Received message");

        // const recipientSocket = io.sockets.sockets.get(message.recipientId);

        if (message.recipientId) {
            const recipient = onlineUsers.find(
                (user) => user.userId === message.recipientId
            );

            if (recipient) {
                console.log(`Emitting getMessage to ${recipient.socketId}`);
                // Emit the message to the recipient's socketId
                io.to(recipient.socketId).emit("getMessage", message);
            } else {
                console.log("Recipient is not connected");
                // Handle the case where the recipient is not connected
            }
        } else {
            console.log("Recipient not recieved in socket server.");
            // Handle the case where the recipient is not connected
            // You may want to send an acknowledgment or handle it according to your application's logic
        }
    });

    // recieve message
    socket.on("getMessage", (message) => {
        // Handle the received message
        console.log("Received message:", message.text);
        // You can broadcast the received message to all connected clients if needed
        // io.emit("broadcastMessage", message);
    });

    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    });
});

io.listen(3000);
