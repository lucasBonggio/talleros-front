import { useState } from 'react'
import { crearCliente } from '../api/clienteServicio';
import '../estilos/componentes/FormularioCliente.css';
import Cookies from 'js-cookie';

function FormularioCliente({ onClienteListo }) {
    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [notas, setNotas] = useState("");

    const crearYSeleccionar = async () => {
        try {
            const data = await crearCliente({ nombre, telefono, notas });
            onClienteListo(data);
        } catch (error) {
            console.log("Error al crear el cliente: ", error);
        }
    }

    return (
        <div className="formulario-cliente">
            <p className="formulario-cliente__titulo">NUEVO CLIENTE</p>

            <div className="campo">
                <label 
                    for='nombre'
                    className="campo__label">NOMBRE DEL CLIENTE</label>
                <input
                    type="text"
                    id="nombre"
                    className="campo__input"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ej: Juan Pérez"
                />
            </div>

            <div className="campo">
                <label 
                    for='telefono'
                    className="campo__label">TELÉFONO</label>
                <input
                    type="number"
                    id="telefono"
                    className="campo__input"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    placeholder="Ej: 1167443345"
                />
            </div>

            <div className="campo">
                <label
                    for='notas' 
                    className="campo__label">NOTAS</label>
                <input
                    type="text"
                    id="notas"
                    className="campo__input"
                    value={notas}
                    onChange={(e) => setNotas(e.target.value)}
                    placeholder="Observaciones sobre el cliente."
                />
            </div>

            <button 
                title='Crear y seleccionar usuario'
                className="boton-secundario" onClick={crearYSeleccionar}>
                CREAR Y SELECCIONAR
            </button>
        </div>
    );
}

export default FormularioCliente