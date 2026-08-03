import React, { useState } from 'react'
import FormularioTV from '../componentes/FormularioTV'
import FormularioCliente from '../componentes/FormularioCliente';
import BuscadorClientes from '../componentes/BuscadorClientes';
import { crearOrden } from '../api/ordenServicio';

import '../estilos/paginas/PaginaNuevaOrden.css';
import { Plus, User, Tv } from 'lucide-react';

function NuevaOrdenPage() {
    const [clienteSeleccionado, setClienteSeleccionado] = useState("");
    const [datosTv, setDatosTv] = useState("");
    const [formularioKey, setFormularioKey] = useState(0);
    const [mensaje, setMensaje] = useState("");

    const generarOrden = async () => {
        try{
            const respuesta = await crearOrden(clienteSeleccionado.clienteId, datosTv);

            setMensaje(respuesta);
            
            setFormularioKey((prev) => prev + 1);
            setClienteSeleccionado(null);
            setDatosTv(null);
        }catch(error){
            console.error("Error al crear la orden: ", error);
        }
    } 
    const clienteActivo = { activo: false,
                            clienteId: clienteSeleccionado?.clienteId
        }
    
    return (
        <div className="pagina-orden">
            <header className="pagina-orden__header">
                <div className="pagina-orden__icono"><Plus size={30}/></div>
                <div>
                    <h1 className="pagina-orden__titulo">Nueva Orden de Trabajo</h1>
                    <p className="pagina-orden__subtitulo">Registrá el ingreso de un televisor</p>
                </div>
            </header>

            <div className="pagina-orden__contenido">
                <section className="panel">
                    <div className="panel__encabezado">
                        <span className="panel__icono"><User size={30} /></span>

                        <div>
                            <h2 className="panel__titulo">
                                Cliente
                            </h2>

                            <p className="panel__descripcion">
                                Buscá un cliente existente o registrá uno nuevo.
                            </p>
                        </div>
                    </div>

                    <BuscadorClientes key={`cliente-${formularioKey}`} onClienteListo={setClienteSeleccionado} clienteActivo={clienteActivo}/>
                </section>

                <section className="panel">
                    <div className="panel__encabezado">
                        <span className="panel__icono"><Tv size={30} /></span>

                        <div>
                            <h2 className="panel__titulo">
                                Televisor
                            </h2>

                            <p className="panel__descripcion">
                                Información del equipo recibido.
                            </p>
                        </div>
                    </div>

                    <FormularioTV key={`tv-${formularioKey}`} onDatosListos={setDatosTv}/>
                </section>
            </div>

            <button className="boton-primario" onClick={generarOrden}><Plus size={30}/>CREAR ORDEN</button>

            {mensaje && <p className='mensaje__orden'>{mensaje}</p>}
        </div>
    );
}

export default NuevaOrdenPage;