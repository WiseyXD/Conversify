import React, { useEffect, useState } from "react";
import ChatCard from "./ChatCard";
import {
    useGetChatsByUserIdQuery,
    useCreateChatMutation,
} from "../redux/services/chatApi";
import { useGetAllUsersQuery } from "../redux/services/userApi";
import useGetOnlineUsers from "../hooks/useGetOnlineUsers";
import { useSelector } from "react-redux";
import { MdAddComment } from "react-icons/md";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { getPotentailChats } from "../utils/helper";
import { useDispatch } from "react-redux";
import { setCurrentChat } from "../redux/slices/chatSlice";

// TODO : Search Filter
// TODO : add Loader when new chat added from modal

export default function Chats() {
    const [filterChats, setFilterChats] = useState(null);
    const dispatch = useDispatch();
    const id = useSelector((state) => state.root.auth.id);
    const {
        data: userById,
        refetch: refetchChats,
        isFetching: userByIdLoading,
    } = useGetChatsByUserIdQuery(id);
    const { data: usersObject, isFetching: usersIsLoading } =
        useGetAllUsersQuery();
    const [createChatMutation] = useCreateChatMutation();
    const onlineUsers = useGetOnlineUsers();
    console.log(onlineUsers);
    if (userByIdLoading || usersIsLoading) {
        return null;
    }
    const { allChats } = userById;
    const { users } = usersObject;
    const potentialChats = getPotentailChats(users, allChats, id);
    function handleSelectChat(chat) {
        dispatch(setCurrentChat(chat));
    }

    async function handleCreateChat(recepientId) {
        const { data } = await createChatMutation({
            firstId: id,
            secondId: recepientId,
        }).then(() => {
            refetchChats(id);
        });
    }
    return (
        <div className="basis-1/3 flex flex-col gap-5 overflow-y-auto scrollbar-hide">
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
                                {potentialChats[0] === undefined ? (
                                    <h1>You have chat with all users</h1>
                                ) : (
                                    potentialChats.map((pUser) => {
                                        return (
                                            <div
                                                className="flex"
                                                key={pUser._id}
                                            >
                                                <button
                                                    onClick={() =>
                                                        handleCreateChat(
                                                            pUser._id
                                                        )
                                                    }
                                                >
                                                    {pUser.name}
                                                </button>
                                                {onlineUsers.includes(
                                                    pUser._id
                                                ) && <h1>Online</h1>}
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </dialog>
                </div>
            </div>
            <div className="flex flex-col">
                {allChats[0] === undefined ? (
                    <h1>No Chats Please add Chats</h1>
                ) : (
                    allChats.map((chat) => (
                        <div onClick={() => handleSelectChat(chat)}>
                            <ChatCard key={chat._id} chat={chat} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
