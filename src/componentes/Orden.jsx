import { useEffect, useState } from 'react'
import { obtenerReparacionPorOrden, iniciarReparacion, finalizarReparacion, cancelarReparacion, entregarReparacion } from '../api/reparacionServicio';
import IniciarReparacion from './IniciarReparacion';
import TerminarReparacion from './TerminarReparacion';
import CancelarReparacion from './CancelarReparacion';
import Reparacion from './Reparacion';
import '../estilos/componentes/Orden.css';
import { CircleX, PhoneCall, Tv, Settings2, RefreshCcw, Wrench, X, PackageCheck, Check } from 'lucide-react';

const ESTADOS = {
    INGRESADO: { etiqueta: "Ingresado", clase: "badge--ingresado", icono: <RefreshCcw size={20}/> },
    EN_REPARACION: { etiqueta: "En Reparación", clase: "badge--en-reparacion", icono: <Wrench size={20}/> },
    LISTO: { etiqueta: "Listo", clase: "badge--listo", icono: <Check size={20}/> },
    ENTREGADO: { etiqueta: "Entregado", clase: "badge--entregado", icono: <PackageCheck size={20} /> },
    CANCELADO: { etiqueta: "Cancelado", clase: "badge--cancelado", icono: <X size={20} /> },
};


const PASOS = ["INGRESADO", "EN_REPARACION", "LISTO", "ENTREGADO"];

function Orden({ orden, onClose, onOrdenActualizada }) {
    const [reparacion, setReparacion] = useState("");
    const [seccionCancelar, setSeccionCancelar] = useState(false);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [datosReparacion, setDatosReparacion] = useState("");
    const [solucionAplicada, setSolucionAplicada] = useState("");
    const [precio, setPrecio] = useState("");
    const [detalleCancelacion, setDetalleCancelacion] = useState("");

    const obtenerMensajeBoton = (estado) => {
        switch (estado) {
            case 'INGRESADO': return 'Iniciar Reparación';
            case 'EN_REPARACION': return 'Marcar como Listo';
            case 'LISTO': return 'Registrar Entrega';
            default: return 'Gestionar';
        }
    };

    const obtenerSeccionPorEstado = (estado) => {
        switch (estado) {
            case 'INGRESADO': return 'iniciar';
            case 'EN_REPARACION': return 'listo';
            case 'LISTO': return 'entregar';
            default: return 'base';
        }
    };

    const mensajeBotonAccion = obtenerMensajeBoton(orden.estado);
    const seccionActiva = seccionCancelar ? 'cancelar' : obtenerSeccionPorEstado(orden.estado);
    const infoEstado = ESTADOS[orden.estado] || { etiqueta: orden.estado, clase: "" };
    const indicePasoActual = PASOS.indexOf(orden.estado);

    const obtenerReparacion = async (idOrden) => {
        try {

            const respuesta = await obtenerReparacionPorOrden(idOrden);
            setReparacion(respuesta);

        } catch (error) {
            console.error(error);
        }
    };
    
    useEffect(() => {
        obtenerReparacion(orden.idOrden);
    }, [orden.idOrden]);
    
    const manejarClickBotonPrincipal = async () => {
        if (!mostrarFormulario && seccionActiva !== "entregar") {
            setMostrarFormulario(true);
            return;
        }

        try {
            if (seccionActiva === "iniciar") {
                await iniciarReparacion(orden.idOrden, datosReparacion);
            } else if (seccionActiva === "listo") {
                await finalizarReparacion(reparacion.id, solucionAplicada, precio);
            } else if (seccionActiva === "entregar") {
                await entregarReparacion(reparacion.id);
            }

            onOrdenActualizada?.();
            onClose();
        } catch (error) {
            console.error("Error al guardar:", error);
        }
    };

    const manejarClickCancelar = () => {
        setSeccionCancelar(true);
        setMostrarFormulario(true);
    };

    const manejarGuardarCancelacion = async () => {
        try {
            console.log(orden);
            await cancelarReparacion(orden.idOrden, detalleCancelacion.detalleCancelacion);
            onOrdenActualizada?.();
            onClose();
        } catch (error) {
            console.error("Error al cancelar:", error);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-orden" onClick={(e) => e.stopPropagation()}>

                <header className="modal-orden__header">
                    <div className="modal-orden__header-izquierda">
                        <span className="modal-orden__icono-header"><Wrench size={30}/></span>
                        <h2 className="modal-orden__titulo">GESTIONAR ORDEN</h2>
                        <span className="modal-orden__codigo">
                            ORD-{String(orden.idOrden).padStart(3, '0')}
                        </span>
                        <span className={`badge ${infoEstado.clase}`}>
                            {infoEstado.icono} {infoEstado.etiqueta}
                        </span>
                    </div>
                    <button className="modal-orden__cerrar" onClick={onClose}>✕</button>
                </header>

                <nav className="stepper">
                    {PASOS.map((paso, indice) => {
                        const info = ESTADOS[paso];
                        let estadoPaso = "pendiente";
                        if (indice < indicePasoActual) estadoPaso = "completado";
                        if (indice === indicePasoActual) estadoPaso = "actual";

                        return (
                            <div className="stepper__paso-wrap" key={paso}>
                                <div className={`stepper__paso stepper__paso--${estadoPaso}`}>
                                    {estadoPaso === "completado" ? "✓" : info.icono} {info.etiqueta}
                                </div>
                                {indice < PASOS.length - 1 && (
                                    <div className={`stepper__linea ${indice < indicePasoActual ? "stepper__linea--completada" : ""}`} />
                                )}
                            </div>
                        );
                    })}
                </nav>
                <div className="modal-orden__body">

                    <div className="modal-orden__columna">
                        <div className="tarjeta-info">
                            <div className="tarjeta-info__avatar">
                                {orden.nombreCliente?.charAt(0)}
                            </div>
                            <div>
                                <p className="tarjeta-info__titulo">{orden.nombreCliente}</p>
                                <p className="tarjeta-info__subtitulo">
                                    <PhoneCall size={20}/>
                                    {orden.telefonoCliente}</p>
                            </div>
                        </div>

                        <div className="tarjeta-info">
                            <span className="tarjeta-info__icono"><Tv size={20}/></span>
                            <div>
                                <p className="tarjeta-info__titulo">{orden.marcaTv} {orden.pulgadasTv}"</p>
                                <p className="tarjeta-info__subtitulo">{orden.fallaReportada}</p>
                            </div>
                        </div>

                        <p className="modal-orden__label-seccion">ACCIONES</p>

                        {seccionActiva !== "cancelar" &&
                        mensajeBotonAccion !== 'Gestionar' && (
                            <button
                                className="boton-accion boton-accion--principal"
                                onClick={manejarClickBotonPrincipal}
                            >
                                {mostrarFormulario ? "Guardar" : mensajeBotonAccion} <span>→</span>
                            </button>
                        )}

                        {seccionActiva !== "cancelar" && 
                                orden.estado !== 'CANCELADO' &&
                                orden.estado !== 'ENTREGADO' && (
                            <button
                                className="boton-accion boton-accion--peligro"
                                onClick={manejarClickCancelar}
                            >
                                <CircleX size={20} />
                                Cancelar Orden <span>→</span>
                            </button>
                        )}

                        {seccionActiva === "cancelar" && (
                            <button
                                className="boton-accion boton-accion--peligro"
                                onClick={manejarGuardarCancelacion}
                            >
                                Confirmar Cancelación <span>→</span>
                            </button>
                        )}

                        <div className="modal-orden__fechas">
                            <div className="tarjeta-fecha">
                                <p className="tarjeta-fecha__label">Ingreso</p>
                                <p className="tarjeta-fecha__valor">{orden.ingreso}</p>
                            </div>
                            <div className="tarjeta-fecha">
                                <p className="tarjeta-fecha__label">Entrega Est.</p>
                                <p className="tarjeta-fecha__valor">{orden.entregaEstimada}</p>
                            </div>
                        </div>
                    </div>

                    <div className="modal-orden__columna">
                        <p className="modal-orden__label-seccion"><Wrench size={20} />REPARACIÓN</p>
                        <Reparacion reparacion={reparacion} />

                        {mostrarFormulario && seccionActiva === "iniciar" && (
                            <div className="seccion-formulario">
                                <p className="seccion-formulario__titulo">Iniciar Reparación</p>
                                <IniciarReparacion onDatosListos={setDatosReparacion} />
                            </div>
                        )}

                        {mostrarFormulario && seccionActiva === "listo" && (
                            <div className="seccion-formulario">
                                <p className="seccion-formulario__titulo">Marcar como Listo</p>
                                <TerminarReparacion onSolucionLista={setSolucionAplicada} onPrecioListo={setPrecio} />
                            </div>
                        )}

                        {mostrarFormulario && seccionActiva === "cancelar" && (
                            <div className="seccion-formulario">
                                <p className="seccion-formulario__titulo">Cancelar Orden</p>
                                <CancelarReparacion onDetalleListo={setDetalleCancelacion} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Orden;