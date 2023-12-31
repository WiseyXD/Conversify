import React from "react";
import ChatCard from "./ChatCard";
import { useGetChatsByUserIdQuery } from "../redux/services/chatApi";
import { useGetAllUsersQuery } from "../redux/services/userApi";
import { useSelector } from "react-redux";
import { MdAddComment } from "react-icons/md";
import { HiMagnifyingGlass } from "react-icons/hi2";

// TODO : To show all the users those who have dont have a chat with the exisitng loggedin user => 5:15:44

export default function Chats() {
    const id = useSelector((state) => state.root.auth.id);
    const { data: userById, isFetching: userByIdLoading } =
        useGetChatsByUserIdQuery(id);
    const { data: users, isFetching: usersIsLoading } = useGetAllUsersQuery();
    if (userByIdLoading || usersIsLoading) {
        return null;
    }
    const { allChats } = userById;
    console.log(users);
    console.log(allChats);
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
                            <p className="py-4">Map all the users</p>
                        </div>
                    </dialog>
                </div>
            </div>
            <div className="flex flex-col">
                {allChats.map((chat) => (
                    <ChatCard chat={chat} />
                ))}
            </div>
        </div>
    );
}
