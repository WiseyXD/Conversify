import React, { useEffect, useState } from "react";
import useSocketConnection from "./useSocketConnection";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

export default function useGetOnlineUsers() {
    const [onlineUsers, setOnlineUsers] = useState(null);
    const socket = useSocketConnection();
    const userId = useSelector((state) => state.root.auth.id);
    useEffect(() => {
        if (socket === null) return;
        socket.emit("addNewUser", userId);
        socket.on("getOnlineUsers", (res) => {
            setOnlineUsers(res);
        });
    }, [socket]);
    return onlineUsers;
}
