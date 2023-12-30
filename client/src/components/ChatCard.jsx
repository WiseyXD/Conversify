import React from "react";
import Logo from "../assets/react.svg";

export default function ChatCard() {
    return (
        <div className="flex justify-between py-2 border-b-[1px]">
            <div className="flex gap-3">
                <img src={Logo} className="rounded-full" alt="" />
                <div className="flex flex-col">
                    <p>Name</p>
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
