import React from "react";
import Chats from "../components/Chats";
import ChatBox from "../components/ChatBox";

export default function Chat() {
    return (
        <div className="pt-3 flex gap-3">
            <Chats />
            <ChatBox />
        </div>
    );
}
