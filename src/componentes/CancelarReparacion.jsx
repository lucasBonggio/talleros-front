import { useEffect, useState } from 'react'
import '../estilos/componentes/FormularioReparacion.css';

function CancelarReparacion({ onDetalleListo }) {
    const [detalle, setDetalle] = useState("");

    useEffect(() => {
        onDetalleListo({ detalleCancelacion: detalle });
    }, [detalle]);

    return (
        <div className='formulario-reparacion'>
            <div className="campo">
                <label className="campo__label">Detalles de la Cancelación</label>
                <textarea
                    type="text"
                    className="campo__input campo__textarea"
                    value={detalle}
                    onChange={(e) => setDetalle(e.target.value)}
                />
            </div>
        </div>
    );
}

export default CancelarReparacion;