// Create a context
import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    //   const { t, i18n } = useTranslation();
    const [auth, setAuthState] = useState("");


    // Get current auth state from localStorage
    const getAuthState = async () => {
        try {
            const authDataString = await (localStorage.getItem("admin-token") || 'logout');
            // console.log('authDataString :>> ', authDataString);
            const authData = JSON.parse(authDataString);
            setAuthState(authData);
        } catch (err) {
            setAuthState("logout");
        }
    };


    useEffect(() => {
        (async () => {
            await getAuthState();
        })();
    }, []);

    return (
        // <AuthContext.Provider value={{ auth }}>
        //     {children}
        // </AuthContext.Provider>
        <AuthContext.Provider value={{ name:'Sandeep Kumar Shukla', role:'React Developer' }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };