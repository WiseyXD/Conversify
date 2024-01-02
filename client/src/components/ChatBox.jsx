import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { useGetMessagesByChatIdQuery } from "../redux/services/messageApi";
import useGetRecepient from "../hooks/useGetRecepient";

// TODO : Create UI

export default function ChatBox() {
    const currentUserName = useSelector((state) => state.root.auth.name);
    const currentChat = useSelector((state) => state.root.chat.chat);
    const { data: messages, isFetching: loadingMessages } =
        useGetMessagesByChatIdQuery(currentChat._id);
    const user = useGetRecepient(currentChat);
    if (user == undefined || loadingMessages) return null;
    const { user: recepient } = user;
    // console.log(user);
    // console.log(messages);
    const allMessages = messages.message;
    console.log(allMessages);
    return (
        <div className="w-full bg-base-100">
            <div className="flex flex-col">
                <div className="w-full bg-black text-center">
                    <p className="font-semibold text-xl">{recepient?.name}</p>
                </div>
                <div className="flex flex-col">
                    {allMessages[0] != undefined
                        ? messages.message.map((message) => {
                              return (
                                  <div
                                      className={
                                          message.senderId === recepient._id
                                              ? "chat chat-start"
                                              : "chat chat-end"
                                      }
                                  >
                                      <div className="chat-header">
                                          {message.senderId === recepient._id
                                              ? recepient.name + " "
                                              : currentUserName + " "}
                                          <time className="text-xs opacity-50"></time>
                                      </div>
                                      <div className="chat-bubble">
                                          {message.text}
                                      </div>
                                      <div className="chat-footer opacity-50">
                                          {moment(message.createdAt).calendar()}
                                      </div>
                                  </div>
                              );
                          })
                        : null}
                </div>
            </div>
        </div>
    );
}
