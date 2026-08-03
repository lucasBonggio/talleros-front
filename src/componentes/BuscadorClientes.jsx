import { useEffect, useState } from 'react';
import FormularioCliente from './FormularioCliente';
import { buscarClientePorValor } from '../api/clienteServicio';
import '../estilos/componentes/BuscadorClientes.css';
import { Plus, X } from 'lucide-react';

function BuscadorClientes({ onClienteListo, clienteActivo }) {
    const [valor, setValor] = useState("");
    const [resultados, setResultados] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [resultadoActivo, setResultadoActivo] = useState(clienteActivo.activo); 

    useEffect(() => {
        if (valor.trim() === "") {
            setResultados([]);
            return;
        }

        const timeOutId = setTimeout(async () => {
            try {
                const respuesta = await buscarClientePorValor(valor);
                setResultados(respuesta || []);
            } catch (error) {
                console.error("Error al buscar al cliente: ", error);
                setResultados([]);
            }
        }, 400);

        return () => clearTimeout(timeOutId);
    }, [valor]);

    return (
        <div className="buscador-clientes">
            <label className="campo__label">
                BUSCAR CLIENTE <span className="campo__requerido">*</span>
            </label>
            <div className="buscador-clientes__input-wrap">
                <input
                    type="text"
                    className="campo__input campo__input--con-icono"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                    placeholder="Nombre o teléfono..."
                />
            </div>

            {resultados?.length > 0 && (
                <div className="buscador-clientes__resultados">
                    {resultados.map((cliente) => (
                        <div
                            key={cliente.clienteId}
                            className={`buscador-clientes__resultado-item${clienteActivo?.clienteId === cliente.clienteId ? '-activo' : "" }`}
                            onClick={() => {
                                onClienteListo(cliente);
                                setResultadoActivo(true);
                            }}
                        >
                            <p className="resultado-item__nombre">{cliente.nombre}</p>
                            <p className="resultado-item__telefono">{cliente.telefono}</p>
                        </div>
                    ))}
                </div>
            )}

            <div className="buscador-clientes__crear">
                <p className="enlace-accion" onClick={() => setMostrarFormulario(true)}>
                    <Plus size={20}/>
                    NUEVO CLIENTE
                </p>
                {mostrarFormulario && (
                    <div className="buscador-clientes__form-nuevo">
                        <p className="enlace-accion" onClick={() => setMostrarFormulario(false)}>
                            <X size={20}/>
                            CANCELAR
                        </p>
                        <FormularioCliente
                            onClienteListo={(cliente) => {
                                onClienteListo(cliente);
                                setResultadoActivo(true);
                                setResultados([cliente]);
                                setMostrarFormulario(false);
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default BuscadorClientes;