import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";
import { AuthContext } from "../hooks/authContext";

const Home = () => {
  const { auth, loggedin } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (auth === null || auth === undefined || auth === {}) {
      navigate("/login");
    }
  }, [auth]);

  return (
    <div className="home h-full">
      <Dashboard
        rowHeight={25}
        onLayoutChange={() => {}}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      ></Dashboard>
    </div>
  );
};

export default Home;
