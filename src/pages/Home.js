import { Outlet } from "react-router-dom";
import Dashboard from "../components/Dashboard";

const Home = () => {
    return (
        <div className="flex flex-row h-full">
            <div className="home w-5/6 h-full">
                <Dashboard
                    className="layout"
                    rowHeight={30}
                    onLayoutChange={function () { }}
                    cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                ></Dashboard>
            </div >
            <div className="w-1/6">
                sdfd
            </div>
        </div>
    );
}

export default Home;