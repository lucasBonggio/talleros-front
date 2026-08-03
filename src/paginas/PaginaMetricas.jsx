import { useEffect, useState } from 'react'
import Estadistica from '../componentes/Estadistica';
import { obtenerEstadisticasGenerales, obtenerEstadisticasSecundarias } from '../api/metricasServicio';
import GraficoIngresosSemanales from '../componentes/GraficoIngresosSemanales';
import GraficoOrdenesPorEstado from '../componentes/GraficoOrdenesPorEstado';
import GraficoMarcasFrecuentes from '../componentes/GraficoMarcasFrecuente';
import '../estilos/componentes/Metricas.css';

function PaginaMetricas() {
    const [estadisticasGenerales, setEstadisticasGenerales] = useState("");
    const [estadisticasSecundarias, setEstadisticasSecundarias] = useState("");
    const [error, setError] = useState("");

    const cargarEstadisticas = async () => {
        try {
            const respuesta = await obtenerEstadisticasGenerales();

            setEstadisticasGenerales(respuesta);
        } catch (error) {
            console.error("Error al cargar las estadísticas: ", error);
            setError(error.message);
        }
    };

    const cargarEstadisticasSecundarias = async () => {
        try {
            const respuesta = await obtenerEstadisticasSecundarias();
            setEstadisticasSecundarias(respuesta);
        } catch (error) {
            console.error("Error al cargar las estadísticas: ", error);
            setError(error.message);
        }
    };

    useEffect(() => {
        cargarEstadisticas();
        cargarEstadisticasSecundarias();
    }, []);

    return (
        <div className="pagina-metricas">
            <header className="pagina-metricas__header">
                <h1 className="pagina-metricas__titulo">Estadísticas</h1>
                <p className="pagina-metricas__subtitulo">Resumen general del taller</p>
            </header>

            <div className="pagina-metricas__grilla">
                <Estadistica nombre="Ingresados este mes" estadistica={estadisticasGenerales.ingresosUltimoMes} />
                <Estadistica nombre="Pendientes" estadistica={estadisticasGenerales.ordenesPendientes} />
                <Estadistica nombre="Tiempo prom. reparación(en días)" estadistica={estadisticasGenerales.promedioTiempoReparacion} />
                <Estadistica nombre="Urgentes activos" estadistica={estadisticasGenerales.urgentesActivos} />
            </div>

            <div className="pagina-metricas__grilla-graficos">
                <div className="pagina-metricas__card">
                    <GraficoOrdenesPorEstado
                        ordenesPorEstado={estadisticasSecundarias.ordenesPorEstado}
                    />
                </div>
                <div className="pagina-metricas__card">
                    <GraficoIngresosSemanales
                        ordenesPorSemana={estadisticasSecundarias.ordenesPorSemana}
                    />
                </div>
                <div className="pagina-metricas__card">
                    <GraficoMarcasFrecuentes
                        marcasFrecuentes={estadisticasSecundarias.marcasFrecuentes}
                        clientesRegistrados={estadisticasSecundarias.clientesRegistrados}
                    />
                </div>
            </div>

            {error && <p className="pagina-metricas__error">{error}</p>}
        </div>
        
    );
}

export default PaginaMetricas