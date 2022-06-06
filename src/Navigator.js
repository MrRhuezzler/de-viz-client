import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home";

const Navigator = () => {
    return (
        <>
            <div className="flex flex-col h-full">
                <Navbar></Navbar>
                <div className="grow">
                    <Routes>
                        <Route path="/" element={<Home></Home>} />
                        <Route path="/register" element={<Register></Register>} />
                        <Route path="/login" element={<Login></Login>} />
                    </Routes>
                </div>
            </div>
        </>
    );
}

export default Navigator;