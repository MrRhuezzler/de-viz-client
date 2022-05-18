import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

const Navigator = () => {
    return (
        <>
            <div className="flex flex-col h-full">
                <Navbar></Navbar>
                <div className="grow">
                    <Routes>
                        <Route path="/" element={<Home></Home>} />
                    </Routes>
                </div>
            </div>
        </>
    );
}

export default Navigator;