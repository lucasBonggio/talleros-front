import { useEffect, useState } from 'react'
import { obtenerOrdenesPorEstado, obtenerOrdenesPorCliente } from '../api/ordenServicio';
import OrdenItem from '../componentes/OrdenItem';
import '../estilos/paginas/PaginaOrdenes.css';
import { ListOrdered, MoveLeft, Search, MoveRight } from 'lucide-react';

const FILTROS = [
    { valor: "TOTAL", etiqueta: "Todas" },
    { valor: "INGRESADO", etiqueta: "Ingresado" },
    { valor: "EN_REPARACION", etiqueta: "En Reparación" },
    { valor: "LISTO", etiqueta: "Listo" },
    { valor: "ENTREGADO", etiqueta: "Entregado" },
    { valor: "CANCELADO", etiqueta: "Cancelado" },
];

function PaginaOrdenes() {
    const [ordenes, setOrdenes] = useState([]);
    const [error, setError] = useState("");
    const [valorBusqueda, setValorBusqueda] = useState("");
    const [totalOrdenes, setTotalOrdenes] = useState(0);
    const [filtroEstado, setFiltroEstado] = useState("TOTAL");

    const [paginaActual, setPaginaActual] = useState(0);
    const [totalPaginas, setTotalPaginas] = useState(0);

    const cargarOrdenes = async (estado) => {
        try {
            const respuesta = await obtenerOrdenesPorEstado(estado, paginaActual);
            setTotalOrdenes(respuesta.page?.totalElements ?? (respuesta.content || respuesta || []).length);
            setOrdenes(respuesta._embedded?.ordenRespuestaList || []);

            setPaginaActual(respuesta.page?.number);
            setTotalPaginas(respuesta.page?.totalPages);
        } catch (error) {
            setError(error.message);
        }
    };

    const cargarOrdenesFiltradas = async (valor) => {
        try {
            const respuesta = await obtenerOrdenesPorCliente(valor);
            setOrdenes(respuesta.content || respuesta || []);
        } catch (error) {
            console.error("Error al buscar órdenes: ", error);
            setError(error.message);
        }
    };

    useEffect(() => {
        if (valorBusqueda.trim() === "") {
            cargarOrdenes(filtroEstado, paginaActual);
            return;
        }

        const timeout = setTimeout(() => {
            cargarOrdenesFiltradas(valorBusqueda);
        }, 400);

        return () => clearTimeout(timeout);

    }, [filtroEstado, paginaActual, valorBusqueda]);

    const cambiarFiltro = (nuevoFiltro) => {
        setFiltroEstado(nuevoFiltro);
        setPaginaActual(0);
    };

    return (
        <div className="pagina-ordenes">
            <header className="pagina-ordenes__header">
                <div className="pagina-ordenes__titulo-wrap">
                    <div className="pagina-ordenes__icono"><ListOrdered size={30}/></div>
                    <div>
                        <h1 className="pagina-ordenes__titulo">Órdenes de Trabajo</h1>
                        <p className="pagina-ordenes__subtitulo">{totalOrdenes} órdenes en total</p>
                    </div>
                </div>

                <div className="pagina-ordenes__buscador">
                    <span className="pagina-ordenes__icono-lupa"><Search size={20}/></span>
                    <input
                        type="text"
                        className="pagina-ordenes__input-busqueda"
                        value={valorBusqueda}
                        onChange={(e) => setValorBusqueda(e.target.value)}
                        placeholder="Buscar..."
                    />
                </div>
            </header>

            <nav className="pagina-ordenes__tabs">
                {FILTROS.map((filtro) => (
                    <button
                        key={filtro.valor}
                        className={`tab ${filtroEstado === filtro.valor ? "tab--activo" : ""}`}
                        onClick={() => cambiarFiltro(filtro.valor)}
                    >
                        {filtro.valor !== "TOTAL" && (
                            <span className={`tab__punto tab__punto--${filtro.valor.toLowerCase()}`} />
                        )}
                        {filtro.etiqueta}
                    </button>
                ))}
            </nav>

            <div className="tabla-ordenes">
                <div className="tabla-ordenes__header">
                    <div>Cliente</div>
                    <div>Televisor</div>
                    <div>Falla</div>
                    <div>Estado</div>
                    <div>Ingreso</div>
                    <div>Entrega est.</div>
                    <div>Acciones</div>
                </div>
                {ordenes.map((orden) => (
                    <OrdenItem key={orden.idOrden} orden={orden} onOrdenActualizada={() => cargarOrdenes(filtroEstado)} />
                ))}
            </div>

            {totalPaginas > 1 && (
                <div className="paginacion">

                    <button
                        className="paginacion__boton"
                        disabled={paginaActual === 0}
                        onClick={() => setPaginaActual(paginaActual - 1)}
                    >
                        <MoveLeft size={20}/>
                        Anterior
                    </button>

                    <span className="paginacion__info">
                        Página {paginaActual + 1} de {totalPaginas}
                    </span>

                    <button
                        className="paginacion__boton"
                        disabled={paginaActual + 1 === totalPaginas}
                        onClick={() => setPaginaActual(paginaActual + 1)}
                    >
                        Siguiente
                        <MoveRight size={20}/> 
                    </button>

                </div>
            )}

            {error && <p className="pagina-ordenes__error">{error}</p>}
        </div>
    );
}

export default PaginaOrdenes;