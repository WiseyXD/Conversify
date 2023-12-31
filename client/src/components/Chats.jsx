import React from "react";
import ChatCard from "./ChatCard";
import { useGetChatsByUserIdQuery } from "../redux/services/chatApi";
import { useSelector } from "react-redux";

export default function Chats() {
    const id = useSelector((state) => state.root.auth.id);
    const { data, isFetching } = useGetChatsByUserIdQuery(id);
    if (isFetching) {
        return null;
    }
    const { allChats } = data;
    return (
        <div className="basis-1/3 min-h-screen flex flex-col gap-5 overflow-y-auto scrollbar-hide">
            {allChats.map((chat) => (
                <ChatCard chat={chat} />
            ))}
        </div>
    );
}
