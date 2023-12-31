import React from "react";
import Logo from "../assets/react.svg";
import { useGetUserByUserIdQuery } from "../redux/services/userApi";
import { useSelector } from "react-redux";

export default function ChatCard({ chat }) {
    const senderId = useSelector((state) => state.root.auth.id);
    const members = chat?.members;
    const recepientId = members.filter((id) => id !== senderId);
    const { data, isFetching } = useGetUserByUserIdQuery(recepientId);
    if (isFetching) return null;
    const { name } = data.user;
    return (
        <div className="flex justify-between py-2 border-b-[1px]">
            <div className="flex gap-3">
                <img src={Logo} className="rounded-full" alt="" />
                <div className="flex flex-col">
                    <p>{name}</p>
                    <p>Message</p>
                </div>
            </div>
            <div className="hidden md:flex md:flex-col ">
                <p>12/12/2023</p>
                <p className="text-right">2</p>
            </div>
        </div>
    );
}
