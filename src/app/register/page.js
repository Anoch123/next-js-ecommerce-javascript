"use client";

import InputComponent from '@/components/FormElements/InputComponent';
import { registrationFormControls } from '@/utils';
import React, {useState} from 'react'
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { registerNewUser } from "@/services/register";

const initialFormData = {
    name: "",
    email: "",
    password: "",
};

const Register = () => {
    const [formData, setFormData] = useState(initialFormData);

    const router = useRouter();

    function isFormValid() {
        return formData &&
        formData.name &&
        formData.name.trim() !== "" &&
        formData.email &&
        formData.email.trim() !== "" &&
        formData.password &&
        formData.password.trim() !== ""
        ? true
        : false;
    }

    const handleRegisterOnSubmit = async () => {
        const data = await registerNewUser(formData);

        if (data.success) {
            toast.success(data.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
            setFormData(initialFormData);
        } else {
            toast.error(data.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
            setFormData(initialFormData);
        }
    }

  return (
    <div className='flex flex-col md:flex-row h-screen items-center'>
        <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/5 h-screen">
            <div className="p-5">
                <h1 className="text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl">
                    Ecomercyfy
                </h1>
            </div>
        </div>
        <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
            <div className="w-full h-100">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                    Sign Up to Ecomercyfy
                </h1>
                <div className="mt-10">
                    <button className="w-full text-white font-medium rounded-lg text-sm px-5 py-3 text-center bg-customButtonColorDark">
                        Google Login
                    </button>
                </div>
                <div className="my-4 flex items-center mt-8 before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                    <p className="mx-4 mb-0 text-center font-semibold ">
                        Or
                    </p>
                </div>
                <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                    {registrationFormControls.map((controlItem) =>
                        controlItem.componentType === "input" ? (
                            <InputComponent
                                key={controlItem.id}
                                type={controlItem.type}
                                label={controlItem.label}
                                onChange={(event) =>{
                                    setFormData({...formData, [controlItem.id]: event.target.value})
                                }}
                                value={formData[controlItem.id]}
                            />
                        ) : null
                    )}
                    <button className="disabled:opacity-50 w-full text-white font-medium rounded-lg text-sm px-5 py-3 text-center bg-customButtonColorDark"
                        onClick={handleRegisterOnSubmit}
                        disabled={!isFormValid()}>
                        Sign Up
                    </button>
                    <div className="text-center">
                        <p className='text-sm font-light text-gray-500 dark:text-gray-400 mt-5'>Already have an account? <button className="font-medium text-primary-600 hover:underline hover:text-blue-600 hover:duration-300 dark:text-primary-500" onClick={() => router.push("/login")}> Login here</button></p>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    </div>
  )
}

export default Register