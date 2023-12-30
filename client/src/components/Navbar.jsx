import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteAuth } from "../redux/slices/authSlice";
export default function Navbar() {
    const isAuthorized = useSelector((state) => state.root.auth.token);
    const dispatch = useDispatch();
    async function handleLogout() {
        dispatch(deleteAuth());
    }
    return (
        <div className="navbar bg-neutral">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Conversify</a>
            </div>
            {isAuthorized ? (
                <>
                    <ul className="menu bg-neutral hidden md:menu-horizontal rounded-box">
                        <li>
                            <a>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                    />
                                </svg>
                                Inbox
                                <span className="badge badge-sm">99+</span>
                            </a>
                        </li>
                        <li>
                            <a>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                Updates
                                <span className="badge badge-sm badge-warning">
                                    NEW
                                </span>
                            </a>
                        </li>
                        <li>
                            <a>
                                Stats
                                <span className="badge badge-xs badge-info"></span>
                            </a>
                        </li>
                    </ul>

                    <div className="flex-none">
                        <div className="dropdown dropdown-end">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-circle avatar"
                            >
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                                    />
                                </div>
                            </div>

                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                            >
                                <li>
                                    <a className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </a>
                                </li>
                                <li>
                                    <a>Settings</a>
                                </li>
                                <li>
                                    <a onClick={handleLogout}>Logout</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </>
            ) : (
                <button className="btn btn-primary"> Register </button>
            )}
        </div>
    );
}
