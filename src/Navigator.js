import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Auth/Login";
import Logout from "./pages/Auth/Logout";
import Register from "./pages/Auth/Register";
import DataSource from "./pages/DataSource";
import Home from "./pages/Home";

const Navigator = () => {
  return (
    <>
      <div className="flex flex-col h-full">
        <Navbar></Navbar>
        <div className="grow py-5 bg-white-smoke">
          <Routes>
            <Route path="/" element={<Home></Home>} />
            <Route path="/datasource" element={<DataSource></DataSource>} />
            <Route path="/register" element={<Register></Register>} />
            <Route path="/login" element={<Login></Login>} />
            <Route path="/logout" element={<Logout></Logout>} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Navigator;
