import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Error from "./pages/Error";
import Navbar from "./components/Navbar";

function App() {
    const [count, setCount] = useState(0);
    const navigate = useNavigate();

    return (
        <>
            <Navbar />
            <div className="max-w-full mx-auto px-7">
                <Routes>
                    <Route path="/" element={<Chat />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
