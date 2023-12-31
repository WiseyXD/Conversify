import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../redux/services/authApi";
import { setAuth } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [invalidCredetials, setInvalidCredentials] = useState(false);
    const [loginMutation] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        try {
            const { data } = await loginMutation({ email, password });
            console.log(data.user);
            dispatch(setAuth(data?.user));
            navigate("/");
        } catch (error) {
            console.log(error);
            setInvalidCredentials(true);
        }
    }
    return (
        <div className="hero min-h-screen bg-transparent">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut
                        assumenda excepturi exercitationem quasi. In deleniti
                        eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form
                        className="card-body"
                        onSubmit={(e) => handleLogin(e)}
                    >
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="email"
                                className="input input-bordered"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="password"
                                className="input input-bordered"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <label className="label">
                                <a
                                    href="#"
                                    className="label-text-alt link link-hover"
                                >
                                    Forgot password?
                                </a>
                            </label>
                        </div>
                        {invalidCredetials && (
                            <label className="label">
                                <p className="label-text-alt text-red-500">
                                    Invalid Credentials
                                </p>
                            </label>
                        )}
                        <div className="form-control mt-6">
                            <button className="btn btn-primary" type="submit">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
