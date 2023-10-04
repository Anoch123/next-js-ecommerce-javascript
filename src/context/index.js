"use client";

import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);


export default function GlobalState({ children }) {
    const [showNavModal, setShowNavModal] = useState(false);
    const [isAuthUser, setIsAuthUser] = useState(null);
    const [user, setUser] = useState(null);
    const [pageLevelLoader, setPageLevelLoader] = useState(false);
    const [componentLevelLoader, setComponentLevelLoader] = useState({
        loading: false,
        id: "",
    });
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadFileName, setuploadFileName] = useState('');

    useEffect(() => {
        if(Cookies.get('token') !== undefined){
            setIsAuthUser(true);
            const userData = JSON.parse(localStorage.getItem('user')) || {};
            setUser(userData);
        } else {
            setIsAuthUser(false);
        }
    }, [Cookies])

    return (
        <GlobalContext.Provider value={{
            showNavModal,
            setShowNavModal,
            isAuthUser,
            setIsAuthUser,
            user,
            setUser,
            componentLevelLoader, 
            setComponentLevelLoader,
            pageLevelLoader, 
            setPageLevelLoader,
            uploadProgress, 
            setUploadProgress,
            uploadFileName, 
            setuploadFileName
        }}>
            {children}
        </GlobalContext.Provider>
    )
}