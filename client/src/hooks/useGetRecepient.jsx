import React from "react";
import { useGetUserByUserIdQuery } from "../redux/services/userApi";
import { useSelector } from "react-redux";

export default function useGetRecepient(chat) {
    const senderId = useSelector((state) => state.root.auth.id);

    const members = chat?.members;
    if (!members) return null;
    const recepientId = members.filter((id) => id !== senderId);
    const { data, isFetching } = useGetUserByUserIdQuery(recepientId);
    if (isFetching) return null;
    return data;
}
