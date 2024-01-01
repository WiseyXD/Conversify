import React, { useEffect, useState } from "react";
import ChatCard from "./ChatCard";
import {
    useGetChatsByUserIdQuery,
    useCreateChatMutation,
} from "../redux/services/chatApi";
import { useGetAllUsersQuery } from "../redux/services/userApi";
import { useSelector } from "react-redux";
import { MdAddComment } from "react-icons/md";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { getPotentailChats } from "../utils/helper";

// TODO : Search Filter
// TODO : Handle No chats in chat card
// TODO : Handle no users to add in modal componenet

export default function Chats() {
    const [userChats, setUserChats] = useState(null);
    const [rerender, setRerender] = useState(false);
    const id = useSelector((state) => state.root.auth.id);
    const {
        data: userById,
        refetch: refetchChats,
        isFetching: userByIdLoading,
    } = useGetChatsByUserIdQuery(id);
    const { data: usersObject, isFetching: usersIsLoading } =
        useGetAllUsersQuery();
    const [createChatMutation] = useCreateChatMutation();
    if (userByIdLoading || usersIsLoading) {
        return null;
    }
    const { allChats } = userById;
    const { users } = usersObject;
    const potentialChats = getPotentailChats(users, allChats, id);
    // console.log(users);
    console.log(allChats);
    // console.log(potentialChats);
    function handleCreateChat(recepientId) {
        createChatMutation({
            firstId: id,
            secondId: recepientId,
        }).then(() => {
            refetchChats(id);
        });
    }
    return (
        <div className="basis-1/3 min-h-screen flex flex-col gap-5 overflow-y-auto scrollbar-hide">
            <div className="flex justify-between items-center">
                <div className="flex basis-10/12">
                    <input
                        type="text"
                        placeholder="Find Chat here"
                        className="w-full pl-2"
                    />
                    <button className="btn">
                        <HiMagnifyingGlass size={35} />
                    </button>
                </div>
                <div
                    className="basis-2/12 flex justify-end tooltip-bottom"
                    data-tip="CreateChat"
                >
                    <button
                        className="btn"
                        onClick={() =>
                            document.getElementById("my_modal_3").showModal()
                        }
                    >
                        <MdAddComment size={35} />
                    </button>
                    <dialog id="my_modal_3" className="modal">
                        <div className="modal-box">
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                    ✕
                                </button>
                            </form>
                            <h3 className="font-bold text-lg">
                                Create New Chats!
                            </h3>
                            <div className="py-4">
                                {potentialChats.map((pUser) => {
                                    return (
                                        <div
                                            className="flex flex-col"
                                            key={pUser._id}
                                        >
                                            <button
                                                onClick={() =>
                                                    handleCreateChat(pUser._id)
                                                }
                                            >
                                                {pUser.name}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </dialog>
                </div>
            </div>
            <div className="flex flex-col">
                {allChats.map((chat) => (
                    <ChatCard key={chat._id} chat={chat} />
                ))}
            </div>
        </div>
    );
}
