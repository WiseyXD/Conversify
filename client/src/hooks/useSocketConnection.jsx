import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

export default function useSocketConnection() {
    const [socket, setSocket] = useState(null);
    const userId = useSelector((state) => state.root.auth.id);
    useEffect(() => {
        const newSocket = io("http://localhost:3000");
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [userId]);
    return socket;
}
