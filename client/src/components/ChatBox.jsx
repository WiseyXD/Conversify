import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import {
    useGetMessagesByChatIdQuery,
    useCreateMessageMutation,
} from "../redux/services/messageApi";
import useGetRecepient from "../hooks/useGetRecepient";
import { io } from "socket.io-client";

// TODO : Create UI
// TODO : Create a Message slice that stores the array of message in that and updates when new messages are added
// Will work on Socket.Io

export default function ChatBox() {
    const [socketId, setSocketId] = useState(null);
    const [sendMessage, setSendMessage] = useState("");
    const currentUserId = useSelector((state) => state.root.auth.id);
    const currentUserName = useSelector((state) => state.root.auth.name);
    const currentChat = useSelector((state) => state.root.chat.chat);
    const [createMessageMutation] = useCreateMessageMutation();
    const {
        data: messages,
        isFetching: loadingMessages,
        refetch: reloadMessages,
    } = useGetMessagesByChatIdQuery(currentChat._id);
    const user = useGetRecepient(currentChat);

    const socket = io("http://localhost:3000");

    useEffect(() => {
        socket.on("connection", () => {
            console.log("connected from client");
            setSocketId(socket.id);
        });
        socket.on("getMessage", (message) => {
            console.log("Receved from socket server");
            reloadMessages();
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    if (user == undefined || loadingMessages) return null;

    const { user: recepient } = user;
    console.log(recepient);
    const allMessages = messages.message;

    async function handleSendMessage(e) {
        e.preventDefault();
        if (sendMessage === "") alert("Please type something you dummy");

        const { data, isFetching } = await createMessageMutation({
            chatId: currentChat._id,
            senderId: currentUserId,
            text: sendMessage,
        });

        socket.emit("sendMessage", {
            recepientId: recepient._id, // Assuming user object has userId
            socketId,
        });

        setSendMessage("");
    }

    return (
        <div className="w-full bg-base-100 flex flex-col max-h-screen overflow-y-auto scrollbar-hide">
            <div className="w-full h-full flex flex-col">
                <div className="w-full bg-black text-center">
                    <p className="font-semibold text-xl">{recepient?.name}</p>
                </div>
                <div className="h-full flex flex-col justify-between">
                    <div className="overflow-y-auto scrollbar-hide">
                        {allMessages[0] != undefined ? (
                            messages.message.map((message) => {
                                return (
                                    <div
                                        className={
                                            message.senderId === recepient._id
                                                ? "chat chat-start"
                                                : "chat chat-end"
                                        }
                                        key={message._id}
                                    >
                                        <div className="chat-header">
                                            {message.senderId === recepient._id
                                                ? recepient.name + " "
                                                : currentUserName + " "}
                                            <time className="text-xs opacity-50"></time>
                                        </div>
                                        <div className="chat-bubble">
                                            {message.text}
                                        </div>
                                        <div className="chat-footer opacity-50">
                                            {moment(
                                                message.createdAt
                                            ).calendar()}
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <h1>No chats to show</h1>
                        )}
                    </div>
                    <form
                        className="flex"
                        onSubmit={(e) => handleSendMessage(e)}
                    >
                        <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full basis-11/12"
                            value={sendMessage}
                            onChange={(e) => setSendMessage(e.target.value)}
                        />
                        <button type="submit" className="basis-1/12 btn">
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
