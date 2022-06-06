import Logo from '../assests/logo.png';
import { VscTriangleDown } from 'react-icons/vsc';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

    const [dropped, setDropped] = useState(false);

    return (
        <div className="h-[50px] px-3 py-1">
            <div className="flex flex-row items-center h-full px-4 space-x-5">
                <div className='flex flex-row space-x-3 justify-start grow'>
                    <a href="">Login</a>
                    <a href="">Register</a>
                </div>
                <div className='h-5/6'>
                    <img src={Logo} className="h-full inline aspect-square" />
                </div>
                <div className='flex flex-row justify-end items-center space-x-2 grow'>
                    <div className='flex flex-row items-center space-x-2'>
                        <p>MrRhuezzler</p>
                        <div className='relative'>
                            <button><VscTriangleDown onClick={(e) => { setDropped(!dropped) }} /></button>
                            {dropped && <div onMouseLeave={(e) => { setTimeout((e) => { setDropped(!dropped); }, 200) }} className='absolute top-[150%] z-10 right-0 w-[150px] shadow-xl bg-white'>
                                <div className='flex flex-col'>
                                    <Link to="/profile" className="px-5 py-2 hover:bg-gray-100">Profile</Link>
                                    <Link to="/logout" className="px-5 py-2 hover:bg-gray-100">Logout</Link>
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;