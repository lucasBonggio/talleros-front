import { Navigate } from "react-router-dom";
import { useAuth } from "../contexto/AuthProvider";

function RutaProtegida({children}) {
    const {usuario, cargando} = useAuth();

    if(cargando){
        return <div>Cargando...</div>
    }

    if(!usuario){
        return <Navigate to="/" replace />
    }

    return children;
}

export default RutaProtegida;