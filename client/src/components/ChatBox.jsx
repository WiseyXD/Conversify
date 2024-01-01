import React from "react";
import { useSelector } from "react-redux";
import { useGetMessagesByChatIdQuery } from "../redux/services/messageApi";
export default function ChatBox() {
    const currentChat = useSelector((state) => state.root.chat.chat);
    const { data: messages, isFetching: loadingMessages } =
        useGetMessagesByChatIdQuery(currentChat._id);

    if (loadingMessages) return null;
    console.log(messages);
    return <div>ChatBox</div>;
}
