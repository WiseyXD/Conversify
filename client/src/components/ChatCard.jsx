import React from "react";
import Logo from "../assets/react.svg";
import { useGetUserByUserIdQuery } from "../redux/services/userApi";
import { useSelector } from "react-redux";
import useGetRecepient from "../hooks/useGetRecepient";

export default function ChatCard({ chat }) {
    const data = useGetRecepient(chat);
    if (data == undefined) return null;
    const { user } = data;
    const { name } = user;
    return (
        <div className="flex justify-between py-2 border-b-[1px]" role="button">
            <div className="flex gap-3">
                <img src={Logo} className="rounded-full" alt="" />
                <div className="flex flex-col">
                    <p>{name}</p>
                    <p>Message</p>
                </div>
            </div>
            <div className="hidden md:flex md:flex-col indicator">
                <p>12/12/2023</p>
                <p className="text-right">2</p>
            </div>
        </div>
    );
}
