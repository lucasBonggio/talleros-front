import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexto/AuthProvider'
import { cerrarSesion } from '../api/autenticacionServicio';
import { LogOut, Plus, ChartNoAxesCombined, Tv, MonitorCog } from "lucide-react";
import '../estilos/layout/BarraNavegadora.css'

function BarraNavegadora({ ventanaActiva }) {
    const { usuario, logout } = useAuth();
    const [mensaje, setMensaje] = useState("");
    const letraUsuario = usuario?.nombreUsuario;

    const primerLetra = letraUsuario ? letraUsuario.substring(0, 1): "?";

    const manejarSesion = async () => {
        try {
            const respuesta = await cerrarSesion();
            
            setMensaje(respuesta);
            
            logout();
        } catch (error) {
            console.error("Error al cerrar sesión: ", error);
            setMensaje(error.message);
        }

    } 
    return (
        <div className="barra-navegadora">
            <div className="barra-navegadora__logo">
                <div className="barra-navegadora__icono">
                    <MonitorCog size={34}/>
                </div>

                <div>
                    <p className="barra-navegadora__titulo">
                        {usuario.nombreTaller}
                    </p>

                    <p className="barra-navegadora__subtitulo">
                        SERVICIO TÉCNICO
                    </p>
                </div>
            </div>

            <nav className="barra-navegadora__menu">
                <button title='Crear orden' className="barra-navegadora__item" onClick={() => ventanaActiva("nuevaOrden")}>
                    <Plus size={18}/>
                    <span>Nueva Orden</span>

                </button>
                <button title='Ver órdenes' className="barra-navegadora__item" onClick={() => ventanaActiva("ordenes")} >
                    <Tv size={18}/>
                    <span>Órdenes</span>

                </button>
                <button title='Ver estadísticas' className="barra-navegadora__item" onClick={() => ventanaActiva("estadisticas")}>

                    <ChartNoAxesCombined size={18}/>
                    <span>Estadísticas</span>

                </button>

            </nav>
            <div className="barra-navegadora__usuario">
                <div className="barra-navegadora__avatar">
                    {primerLetra.toUpperCase()}
                </div>

                <span className="barra-navegadora__nombre">
                    {usuario.nombreUsuario}
                </span>

                <button
                    title='Cerrar sesión'
                    className="barra-navegadora__logout"
                    onClick={manejarSesion}
                >
                    <LogOut size={18}/>
                </button>
            </div>
        </div>
    )
}

export default BarraNavegadora;