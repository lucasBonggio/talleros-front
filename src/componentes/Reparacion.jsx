import { useState } from 'react';
import '../estilos/componentes/Reparacion.css';

function Reparacion({ reparacion }) {
    const aplicarDato = (dato) => (dato != null ? dato : "---");
    const [detalle, setDetalle] = useState("Solucion Aplicada");

    if (!reparacion) {
        return <p className="reparacion__vacio">Todavía no hay datos de reparación.</p>;
    }

    if(reparacion.estado === 'CANCELADO'){
        setDetalle("Detalles cancelación")
    }

    return (
        <div className="tarjeta-reparacion">
            <p className="tarjeta-reparacion__label">Descripción</p>
            <p className="tarjeta-reparacion__valor">{aplicarDato(reparacion.diagnostico)}</p>

            <p className="tarjeta-reparacion__label">{detalle}</p>
            <p className="tarjeta-reparacion__valor">{aplicarDato(reparacion.solucionAplicada)}</p>

            <div className="tarjeta-reparacion__fila">
                <div>
                    <p className="tarjeta-reparacion__label">Precio</p>
                    <p className="tarjeta-reparacion__valor tarjeta-reparacion__valor--precio">
                        {reparacion.precioReparacion != null ? `$${reparacion.precioReparacion}` : "---"}
                    </p>
                </div>
            </div>

            <div className="tarjeta-reparacion__fila">
                <div>
                    <p className="tarjeta-reparacion__label">Inicio</p>
                    <p className="tarjeta-reparacion__valor">{aplicarDato(reparacion.fechaInicio)}</p>
                </div>
                <div>
                    <p className="tarjeta-reparacion__label">Fin</p>
                    <p className="tarjeta-reparacion__valor">{aplicarDato(reparacion.fechaFinalizacion)}</p>
                </div>
            </div>
        </div>
    );
}

export default Reparacion;