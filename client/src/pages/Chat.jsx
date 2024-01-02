import React from "react";
import Chats from "../components/Chats";
import ChatBox from "../components/ChatBox";

export default function Chat() {
    return (
        <div className="py-3 min-h-screen flex gap-3">
            <Chats />
            <ChatBox />
        </div>
    );
}
