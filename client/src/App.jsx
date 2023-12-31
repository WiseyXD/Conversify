import { useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Error from "./pages/Error";
import Navbar from "./components/Navbar";

// TODO : List Chats

function App() {
    const [count, setCount] = useState(0);
    const navigate = useNavigate();
    const isAuthorized = useSelector((state) => state.root.auth.token);

    return (
        <>
            <Navbar />
            <div className="max-w-full mx-auto px-7 bg-base-300">
                <Routes>
                    <Route
                        path="/"
                        element={
                            isAuthorized ? (
                                <Chat />
                            ) : (
                                <Navigate to="/register" />
                            )
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            !isAuthorized ? <Login /> : <Navigate to="/" />
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            !isAuthorized ? <Register /> : <Navigate to="/" />
                        }
                    />
                    <Route path="*" element={<Error />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
