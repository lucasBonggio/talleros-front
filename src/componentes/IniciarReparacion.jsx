import { useEffect, useState } from 'react'
import '../estilos/componentes/FormularioReparacion.css';

function IniciarReparacion({ onDatosListos }) {
    const [diagnostico, setDiagnostico] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");

    useEffect(() => {
        onDatosListos({ diagnostico, fechaInicio });
    }, [diagnostico, fechaInicio]);

    return (
        <div className='formulario-reparacion'>
            <div className="campo">
                <label className="campo__label">Diagnóstico</label>
                <input
                    type="text"
                    className="campo__input"
                    value={diagnostico}
                    onChange={(e) => setDiagnostico(e.target.value)}
                />
            </div>
            <div className="campo">
                <label className="campo__label">Fecha de Inicio</label>
                <input
                    type="datetime-local"
                    className="campo__input"
                    value={fechaInicio}
                    onChange={(e) => setFechaInicio(e.target.value)}
                />
            </div>
        </div>
    );
}

export default IniciarReparacion;