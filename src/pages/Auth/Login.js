import { useContext, useEffect, useState } from "react";
import { VscEyeClosed, VscEye, VscError } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { AUTH_LOGIN_URL } from "../../api/endpoints";
import Logo from "../../assests/logo.png";
import { PasswordField, TextField } from "../../components/Form/Inputbox";
import { AuthContext } from "../../hooks/authContext";

const Login = () => {
  const navigate = useNavigate();

  const { auth, setAuthState } = useContext(AuthContext);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState(false);
  const [errorList, setErrorList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setError(false);
    setErrorList([]);

    API.post(AUTH_LOGIN_URL, { email, password })
      .then((res) => {
        setAuthState(res.data.data);
        setError(false);
        setErrorList([]);
        navigate("/");
      })
      .catch((err) => {
        const response = err?.response;
        const data = response?.data;
        const errors = data?.errors;
        setError(true);
        setErrorList(errors.map((value) => value.msg));
      });
  };

  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, [auth]);

  return (
    <div className="login flex flex-row items-center justify-center w-full h-full">
      <div className="w-[min(80%,500px)] shadow-2xl rounded-3xl px-10 py-14 bg-white">
        <p className="font-mont text-lg w-full mb-5 text-center text-gray-400">
          Login
        </p>
        <div className="font-mont font-bold text-4xl text-center w-full">
          de-
          <img src={Logo} className="h-20 inline" />
          iz
        </div>
        <div className="mt-14">
          <form action="" className="flex flex-col space-y-7">
            <TextField
              text="Email"
              placeholder="Enter email address"
              type="email"
              valueState={[email, setEmail]}
              error={error}
            />
            <PasswordField
              text="Password"
              placeholder="Enter password"
              valueState={[password, setPassword]}
              error={error}
            />
            <button
              className="px-3 py-2 bg-bluz text-white"
              onClick={handleSubmit}
            >
              Login
            </button>
          </form>
          <div className="mt-6 font-robo">
            Don't have an account ?{" "}
            <Link className="text-bluz hover:underline" to={"/register"}>
              Register
            </Link>
          </div>
          <div className="mt-6">
            {error &&
              errorList.map((value, index) => (
                <div
                  key={index}
                  className="mt-2 flex flex-row space-x-2 items-center"
                >
                  <VscError className="text-pinkz-500"></VscError>
                  <p className="font-robo text-sm text-pinkz-500">{value}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
