import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useSocketConnection from "./useSocketConnection";
import { useGetMessagesByChatIdQuery } from "../redux/services/messageApi";

export default function useGetMessage() {
    const socket = useSocketConnection();
    const senderId = useSelector((state) => state.root.auth.id);
    const currentChat = useSelector((state) => state.root.chat.chat);
    const { refetch } = useGetMessagesByChatIdQuery(currentChat);
    useEffect(() => {
        if (socket === null) return;
        socket.on("getMessage", (res) => {
            if (currentChat._id !== res.chatId) return;
            refetch(currentChat);
        });
        return () => {
            socket.off("getMessage");
        };
    }, [socket, currentChat]);
    return null;
}
