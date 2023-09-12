"use client";

import InputComponent from '@/components/FormElements/InputComponent';
import { loginFormControls } from '@/utils';
import React, {useContext, useState} from 'react'
import { useRouter } from "next/navigation";
import { login } from '@/services/login';
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import { GlobalContext } from '@/context';
import ComponentLevelLoader from '@/components/Loader/componentlevel';
import Notification from '@/components/Notification';

const initialFormData = {
    email: "",
    password: "",
};

const Login = () => {
    const [formData, setFormData] = useState(initialFormData);

    const {
      setIsAuthUser,
      user,
      setUser,
      componentLevelLoader,
      setComponentLevelLoader
    } = useContext(GlobalContext);

    const router = useRouter();

    function isFormValid() {
        return formData &&
        formData.email &&
        formData.email.trim() !== "" &&
        formData.password &&
        formData.password.trim() !== ""
        ? true
        : false;
    }

    const handleLogin = async () => {
      setComponentLevelLoader({ loading: true, id: "" });
      const res = await login(formData);

      if (res.success) {

        setIsAuthUser(true);
        setUser(res?.finalData?.user);
        setFormData(initialFormData);
        Cookies.set("token", res?.finalData?.token);
        localStorage.setItem("user", JSON.stringify(res?.finalData?.user));
        setComponentLevelLoader({ loading: false, id: "" });

        router.push("/");

      } else {
        toast.error(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsAuthUser(false);
        setComponentLevelLoader({ loading: false, id: "" });
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
                  Sign In to Ecomercyfy
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
                    {loginFormControls.map((controlItem) =>
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

                    <button type="submit" className="disabled:opacity-50 mt-10 w-full text-white font-medium rounded-lg text-sm px-5 py-3 text-center bg-customButtonColorDark" 
                      onClick={handleLogin}
                      disabled={!isFormValid()}>
                        {
                          componentLevelLoader && componentLevelLoader.loading ? (
                            <ComponentLevelLoader
                              text={'Loggin In'}
                              color={'#fff'}
                              loading={
                                componentLevelLoader && componentLevelLoader.loading
                              }
                            />
                          ) : 
                          'Login'
                        }
                      </button>

                    <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-5">
                        Not a member of Ecommercyfy yet? <button className="font-medium text-primary-600 hover:underline hover:text-blue-600 hover:duration-300 dark:text-primary-500" onClick={() => router.push("/register")}> Sign Up here</button>
                    </p>
                </div>
                <Notification />
            </div>
        </div>
    </div>
  )
}

export default Login