import Dashboard from "../components/Dashboard";

const Home = () => {
    return (
        <div className="home">
            <Dashboard
                rowHeight={25}
                onLayoutChange={() => { }}
                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            ></Dashboard>
        </div >
    );
}

export default Home;