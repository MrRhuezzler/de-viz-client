import { useState } from 'react';
import { VscEyeClosed, VscEye } from 'react-icons/vsc';

const Inputbox = ({ valueState, error, type, text, placeholder, children }) => {

    const [value, setValue] = valueState;

    return (
        <div>
            <div className='flex flex-rpw space-x-3 items-center'>
                <label className="font-mont text-gray-600">{text}</label>
                {children}
            </div>
            <input type={type} placeholder={placeholder} value={value} onChange={(e) => { setValue(e.target.value); }} className={`font-robo px-4 py-2 block rounded-md mt-3 w-full outline-none border-2 focus:border-bluz ${error ? 'border-pinkz-500' : value ? 'border-bluz' : 'border-gray-400'}`} />
        </div>
    )
}

export const PasswordField = ({ valueState, error, text, placeholder }) => {

    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <Inputbox valueState={valueState} error={error} type={passwordVisible ? "text" : "password"} text={text} placeholder={placeholder}>
            <button onClick={(e) => { e.preventDefault(); setPasswordVisible(!passwordVisible) }}>{!passwordVisible ? <VscEyeClosed /> : <VscEye />}</button>
        </Inputbox>
    )

}


export const TextField = ({ valueState, error, type, text, placeholder }) => {

    return (
        <Inputbox valueState={valueState} error={error} type={type} text={text} placeholder={placeholder}></Inputbox>
    )

}