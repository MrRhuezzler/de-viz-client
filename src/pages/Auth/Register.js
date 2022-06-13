import { useState } from "react";
import { VscError } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { AUTH_REGISTER_URL } from "../../api/endpoints";
import Logo from "../../assests/logo.png";
import { PasswordField, TextField } from "../../components/Form/Inputbox";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState(false);
  const [errorList, setErrorList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError(true);
      setErrorList(["Password and confirm password doesn't match"]);
      return;
    }

    setError(false);
    setErrorList([]);

    API.post(AUTH_REGISTER_URL, { name, email, password })
      .then((res) => {
        setError(false);
        setErrorList([]);
      })
      .catch((err) => {
        const response = err?.response;
        const data = response?.data;
        const errors = data?.errors;
        setError(true);
        setErrorList(errors.map((value) => value.msg));
      });
  };

  return (
    <div className="login flex flex-row items-center justify-center w-full h-full">
      <div className="w-[min(80%,500px)] shadow-2xl rounded-3xl px-10 py-14 bg-white">
        <p className="font-mont text-lg w-full mb-5 text-center text-gray-400">
          Register
        </p>
        <div className="font-mont font-bold text-4xl text-center w-full">
          de-
          <img src={Logo} className="h-20 inline" />
          iz
        </div>
        <div className="mt-14">
          <form action="" className="flex flex-col space-y-6">
            <TextField
              text="Name"
              placeholder="Enter Name"
              type="text"
              valueState={[name, setName]}
              error={error}
            />
            <TextField
              text="Email"
              placeholder="Enter email"
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
            <PasswordField
              text="Confirm Password"
              placeholder="Retype your password"
              valueState={[confirmPassword, setConfirmPassword]}
              error={error}
            />
            <button
              className="px-3 py-2 bg-bluz text-white"
              onClick={handleSubmit}
            >
              Register
            </button>
          </form>
          <div className="mt-6 font-robo">
            Already have an account ?{" "}
            <Link className="text-bluz hover:underline" to={"/login"}>
              Login
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
                  <p key={index} className="font-robo text-sm text-pinkz-500">
                    {value}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
