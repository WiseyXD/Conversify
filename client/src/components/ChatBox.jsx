import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import {
    useGetMessagesByChatIdQuery,
    useCreateMessageMutation,
} from "../redux/services/messageApi";
import useGetRecipient from "../hooks/useGetRecepient";
// import { io } from "socket.io-client";

export default function ChatBox() {
    // const [socket, setSocket] = useState(null);
    const [sendMessage, setSendMessage] = useState("");
    const [allMessages, setAllMessages] = useState([]); // Local state to store messages
    const currentUserId = useSelector((state) => state.root.auth.id);
    const currentUserName = useSelector((state) => state.root.auth.name);
    const currentChat = useSelector((state) => state.root.chat.chat);
    const [createMessageMutation] = useCreateMessageMutation();
    const {
        data: messages,
        isFetching: loadingMessages,
        refetch: reloadMessages,
    } = useGetMessagesByChatIdQuery(currentChat?._id);
    const user = useGetRecipient(currentChat);

    useEffect(() => {
        const intervalId = setInterval(() => {
            reloadMessages(); // Polling the server for new messages
        }, 5000); // Poll every 5 seconds (you can adjust this interval)

        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, [reloadMessages]);

    // useEffect(() => {
    //     const socketInstance = io("http://localhost:3000"); // Initialize socket connection
    //     setSocket(socketInstance);

    //     // Listen for new messages from the server
    //     socketInstance.on("getMessage", (message) => {
    //         console.log("New message received:", message);

    //         // // Update the state to add the new message
    //         // setAllMessages((prevMessages) => [...prevMessages, message]);

    //         // // Optionally, reload messages from the server if needed
    //         // reloadMessages();
    //     });

    //     return () => {
    //         socketInstance.disconnect(); // Cleanup the socket connection on unmount
    //     };
    // }, []); // Ensure the effect runs only once on mount

    useEffect(() => {
        if (messages) {
            // Initialize the messages array from the server data
            setAllMessages(messages.message);
        }
    }, [messages]);

    if (user == undefined || loadingMessages) return null;

    const { user: recipient } = user;

    async function handleSendMessage(e) {
        e.preventDefault();
        if (sendMessage === "") return alert("Please type something");

        const { data } = await createMessageMutation({
            chatId: currentChat._id,
            senderId: currentUserId,
            text: sendMessage,
        });

        // Emit message to the recipient via socket
        // if (socketRef.current) {
        //     socketRef.current.emit("sendMessage", {
        //         recipientId: recipient._id,
        //         text: sendMessage,
        //         senderId: currentUserId,
        //         socketId: socket.id,
        //     });
        // }

        setSendMessage(""); // Clear the input after sending
    }

    return (
        <div className="w-full bg-base-100 flex flex-col max-h-screen overflow-y-auto scrollbar-hide">
            <div className="w-full h-full flex flex-col">
                <div className="w-full bg-black text-center">
                    <p className="font-semibold text-xl">{recipient?.name}</p>
                </div>
                <div className="h-full flex flex-col justify-between">
                    <div
                        id="messagesContainer"
                        className="overflow-y-auto scrollbar-hide"
                    >
                        {allMessages.length > 0 ? (
                            allMessages.map((message) => {
                                return (
                                    <div
                                        className={
                                            message.senderId === recipient._id
                                                ? "chat chat-start"
                                                : "chat chat-end"
                                        }
                                        key={message._id}
                                    >
                                        <div className="chat-header">
                                            {message.senderId === recipient._id
                                                ? recipient.name + " "
                                                : currentUserName + " "}
                                            <time className="text-xs opacity-50">
                                                {moment(
                                                    message.createdAt
                                                ).calendar()}
                                            </time>
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
