import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../hooks/authContext";

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    logout();
    navigate("/");
  }, []);

  return (
    <div>
      <h1>Logging you out !</h1>
    </div>
  );
};

export default Logout;
