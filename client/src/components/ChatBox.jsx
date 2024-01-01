import React from "react";
import { useSelector } from "react-redux";
import { useGetMessagesByChatIdQuery } from "../redux/services/messageApi";
import useGetRecepient from "../hooks/useGetRecepient";
import { unsetCurrentChat } from "../redux/slices/chatSlice";
import { useDispatch } from "react-redux";
export default function ChatBox() {
    const currentChat = useSelector((state) => state.root.chat.chat);
    const { data: messages, isFetching: loadingMessages } =
        useGetMessagesByChatIdQuery(currentChat._id);
    const recepient = useGetRecepient(currentChat);
    if (recepient == undefined || loadingMessages) return null;
    console.log(recepient);
    console.log(messages);
    return <div className="w-full min-h-screen bg-base-100"></div>;
}
