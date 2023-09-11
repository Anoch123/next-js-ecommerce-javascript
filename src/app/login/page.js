"use client";

import InputComponent from '@/components/FormElements/InputComponent';
import { loginFormControls } from '@/utils';
import React, {useState} from 'react'
import { useRouter } from "next/navigation";

const initialFormData = {
    email: "",
    password: "",
};

const Login = () => {
    const [formData, setFormData] = useState(initialFormData);

    const router = useRouter();

    const handleLogin = () => {

    }

  return (
    <div className="bg-white relative">
        <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto xl:px-5 lg:flex-row">
            <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
                <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
                    <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
                        <p className="w-full text-4xl font-medium text-center font-serif">
                            Welcome back!
                        </p>
                        <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                            {loginFormControls.map((controlItem) =>
                                controlItem.componentType === "input" ? (
                                    <InputComponent
                                        type={controlItem.type}
                                        placeholder={controlItem.placeholder}
                                        label={controlItem.label}
                                        onChange={(event) =>{
                                            setFormData({...formData, [controlItem.id]: event.target.value})
                                        }}
                                        value={formData[controlItem.id]}
                                    />
                                ) : null
                            )}
                            <div className="float-right">
                                <p>Forgot password? <button className='text-blue-800' onClick={() => router.push("/forgotPassword")}> reset here</button></p>
                            </div>
                            <button className=" disabled:opacity-50 inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                                onClick={handleLogin}>
                                sign in
                            </button>
                            <div className="text-center">
                                <p>New to website? <button className='text-blue-800' onClick={() => router.push("/register")}> Sign up here</button></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login