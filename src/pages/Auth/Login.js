import { useState } from 'react';
import { VscEyeClosed, VscEye, VscError } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import Logo from '../../assests/logo.png';
import { PasswordField, TextField } from '../../components/Form/Inputbox';

const Login = () => {

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const [error, setError] = useState(false);
    const [errorList, setErrorList] = useState([]);

    return (
        <div className="login flex flex-row items-center justify-center w-full h-full">
            <div className="w-[min(80%,500px)] shadow-2xl rounded-3xl px-10 py-14">
                <p className="font-mont text-lg w-full mb-5 text-center text-gray-400">Login</p>
                <div className="font-mont font-bold text-4xl text-center w-full">de-<img src={Logo} className="h-20 inline" />iz</div>
                <div className="mt-14">
                    <form action="" className="flex flex-col space-y-7">
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
                    </form>
                    <div className='mt-6'>
                        {error && errorList.map((value, index) => (
                            <div className="mt-2 flex flex-row space-x-2 items-center">
                                <VscError className="text-pinkz"></VscError>
                                <p key={index} className='font-robo text-sm text-pinkz'>{value}</p>
                            </div>
                        ))}
                    </div>
                    <div className='mt-6 font-robo'>
                        Don't' have an accout ? <Link className='text-bluz hover:underline' to={'/register'}>Register</Link>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Login;