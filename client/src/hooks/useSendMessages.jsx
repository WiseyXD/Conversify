import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useGetRecepient from "./useGetRecepient";
import useSocketConnection from "./useSocketConnection";

export default function useSendMessages() {
    const [newMessage, setNewMessage] = useState(null);
    const socket = useSocketConnection();
    const senderId = useSelector((state) => state.root.auth.id);
    const currentChat = useSelector((state) => state.root.chat.chat);
    const members = currentChat?.members;
    const recepientId = members.filter((id) => id !== senderId);
    useEffect(() => {
        if (socket === null) return;
        socket.emit("sendMessage", { ...newMessage, recepientId });
    }, [newMessage]);
}
