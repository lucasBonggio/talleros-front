import { useState, lazy } from 'react'
import '../estilos/componentes/OrdenItem.css';
import { Settings2, RefreshCcw, Wrench, X, PackageCheck, Check } from 'lucide-react';

const Orden = lazy(() => import('./Orden'));
const ESTADOS = {
    INGRESADO: { etiqueta: "Ingresado", clase: "badge--ingresado", icono: <RefreshCcw size={20}/> },
    EN_REPARACION: { etiqueta: "En Reparación", clase: "badge--en-reparacion", icono: <Wrench size={20}/> },
    LISTO: { etiqueta: "Listo", clase: "badge--listo", icono: <Check size={20}/> },
    ENTREGADO: { etiqueta: "Entregado", clase: "badge--entregado", icono: <PackageCheck size={20} /> },
    CANCELADO: { etiqueta: "Cancelado", clase: "badge--cancelado", icono: <X size={20} /> },
};

function OrdenItem({ orden, onOrdenActualizada }) {
    const [mostrarVentanaReparacion, setMostrarVentanaReparacion] = useState(false);
    const infoEstado = ESTADOS[orden.estado] || { etiqueta: orden.estado, clase: "", icono: "" };

    return (
        <div className="fila-orden">
            <div className="fila-orden__cliente">
                <p className="fila-orden__codigo">ORD-{String(orden.idOrden).padStart(3, '0')}</p>
                <p className="fila-orden__nombre">{orden.nombreCliente}</p>
                <p className="fila-orden__telefono">{orden.telefonoCliente}</p>
            </div>

            <div className="fila-orden__tv">
                <p className="fila-orden__tv-marca">{orden.marcaTv}</p>
                <p className="fila-orden__tv-pulgadas">{orden.pulgadasTv}"</p>
            </div>

            <div className="fila-orden__falla">{orden.fallaReportada}</div>

            <div>
                <span className={`badge ${infoEstado.clase}`}>
                    <span className="badge__icono">{infoEstado.icono}</span>
                    {infoEstado.etiqueta}
                </span>
            </div>

            <div className="fila-orden__fecha">{orden.ingreso}</div>
            <div className="fila-orden__fecha">{orden.entregaEstimada}</div>

            <div className="fila-orden__acciones">
                <button className="boton-gestionar" onClick={() => setMostrarVentanaReparacion(true)}>
                    <Settings2 size={20} />
                    Gestionar
                </button>
                {mostrarVentanaReparacion && (
                    <Orden orden={orden} 
                            onClose={() => setMostrarVentanaReparacion(false)}
                            onOrdenActualizada={onOrdenActualizada}/>
                )}
            </div>
        </div>
    );
}

export default OrdenItem;