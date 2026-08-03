import { useEffect, useState } from 'react'
import '../estilos/componentes/FormularioReparacion.css';

function TerminarReparacion({ onSolucionLista, onPrecioListo}) {
    const [solucion, setSolucion] = useState("");
    const [precio, setPrecio] = useState("");

    useEffect(() => {
        onSolucionLista(solucion);

        onPrecioListo(precio);
    }, [solucion, precio]);

    return (
        <div className="formulario-reparacion">
            <div className="campo">
                <label className="campo__label">Solución Aplicada</label>
                <input
                    type="text"
                    className="campo__input"
                    value={solucion}
                    onChange={(e) => setSolucion(e.target.value)}
                />
            </div>
            <div className="campo">
                <label className='campo__label'>Precio</label>
                <input type="text"
                        className='campo__input'
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)} />
            </div>
        </div>
    );
}

export default TerminarReparacion;