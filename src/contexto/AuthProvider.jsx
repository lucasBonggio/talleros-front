import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL;

const AuthContext = createContext();
const API_AUTH =  url + "/api/v1/usuario/me";

export function AuthProvider({children}) {
    const [usuario, setUsuario] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const verificarSesion = async () => {
            try {
                const { data } = await axios.get(
                    API_AUTH,
                    { 
                        headers: {"Content-Type": "application/json"},
                        withCredentials: true
                    }
                );
                
                setUsuario(data);
            } catch (error) {
                setUsuario(null)
            }finally{
                setCargando(false);
            }
        };
        verificarSesion();
    }, []);

    const login = (datosUsuario) => {
        setUsuario(datosUsuario);
    };

    const logout = () => {
        setUsuario(null);
    }

    return ( 
        <AuthContext.Provider value={{ usuario, cargando, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(){
    return useContext(AuthContext);
}