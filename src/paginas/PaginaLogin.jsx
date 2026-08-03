import { useState } from 'react'
import { useAuth } from '../contexto/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { iniciarSesion as iniciarSesionApi } from '../api/autenticacionServicio';
import { MonitorCog, ChartNoAxesCombined, Wrench, Toolbox, LockKeyhole, EyeOff, Eye } from "lucide-react";
import '../estilos/paginas/PaginaLogin.css';
import AvisoDemo from '../componentes/AvisoDemo';


function PaginaLogin() {
    const [nombreUsuario, setNombreUsuario] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [cargando, setCargando] = useState(false);
    const [mostrarContrasena, setMostrarContrasena] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const manejarSubmit = async (e) => {
        e.preventDefault();
        setCargando(true);
        setMensaje("");

        try {
            const respuesta = await iniciarSesionApi({ nombreUsuario, contrasena });

            setMensaje(respuesta.mensaje);
            const { nombreTaller, nombre, mensaje } = respuesta;
            login({
                nombreTaller,
                nombre
            });

            navigate("/inicio");
        } catch (error) {
            console.error("Error al iniciar sesión: ", error);
            setMensaje(error.message);
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="pagina-login">
            {/* Panel izquierdo */}
            <div className="pagina-login__panel-izquierdo">
                <div className="pagina-login__marca">
                    <div className="pagina-login__marca-icono">
                        <MonitorCog size={40} />
                    </div>
                    <div>
                        <p className="pagina-login__marca-nombre">TallerOS</p>
                        <p className="pagina-login__marca-subtitulo">SERVICIO TÉCNICO</p>
                    </div>
                </div>

                <div className="pagina-login__hero">
                    <h1 className="pagina-login__titulo">
                        Sistema de Gestión de Órdenes
                    </h1>
                    <p className="pagina-login__descripcion">
                        Administrá clientes, órdenes de trabajo y reparaciones desde un solo lugar.
                    </p>

                    <ul className="pagina-login__caracteristicas">
                        <li className="caracteristica">
                            <span className="caracteristica__icono">
                                <Toolbox size={30}/>
                            </span>
                            Registro de ingreso de equipos
                        </li>
                        <li className="caracteristica">
                            <span className="caracteristica__icono">
                                <Wrench size={30} />
                            </span>
                            Seguimiento de reparaciones
                        </li>
                        <li className="caracteristica">
                            <span className="caracteristica__icono">
                                <ChartNoAxesCombined size={30}/>
                            </span>
                            Estadísticas del taller
                        </li>
                    </ul>
                </div>
                <AvisoDemo />

                <p className="pagina-login__version">v1.0.0 — TallerOS © 2026</p>
            </div>

            <div className="pagina-login__panel-derecho">
                <div className="tarjeta-login">
                    <div className="tarjeta-login__icono">
                        <LockKeyhole size={40} />
                    </div>
                    <h2 className="tarjeta-login__titulo">Iniciar sesión</h2>
                    <p className="tarjeta-login__subtitulo">Ingresá tus credenciales para continuar</p>

                    <form onSubmit={manejarSubmit} className="tarjeta-login__form">
                        <div className="campo">
                            <label 
                                for='usuario'
                                className="campo__label">USUARIO</label>
                            <input
                                id='usuario'
                                type="text"
                                name="usuario"
                                className="campo__input"
                                value={nombreUsuario}
                                onChange={(e) => setNombreUsuario(e.target.value)}
                                placeholder="Ej: admin"
                            />
                        </div>

                        <div className="campo">
                            <label 
                                for='contrasena'
                                className="campo__label">CONTRASEÑA</label>
                            <div className="campo__input-con-icono">
                                <input
                                    id='contrasena'
                                    type={mostrarContrasena ? "text" : "password"}
                                    name="contrasena"
                                    className="campo__input"
                                    value={contrasena}
                                    onChange={(e) => setContrasena(e.target.value)}
                                />
                                <button
                                    title='Mostras contraseña'
                                    type="button"
                                    className="campo__boton-ojo"
                                    onClick={() => setMostrarContrasena(!mostrarContrasena)}
                                >
                                    {mostrarContrasena ? <EyeOff color='#0f172a' size={16}/> : <Eye color='#0f172a' size={16}/>}
                                </button>
                            </div>
                        </div>

                        {mensaje && <p className="tarjeta-login__error">{mensaje}</p>}

                        <button 
                            title='Iniciar sesión'
                            type="submit"
                            className="boton-ingresar"
                            disabled={cargando}>
                            {cargando ? "Iniciando sesión..." : "INGRESAR"}
                        </button>
                    </form>

                    <p className="tarjeta-login__ayuda">
                        Contactá al administrador si no podés acceder
                    </p>
                </div>
            </div>
        </div>
    );
}

export default PaginaLogin