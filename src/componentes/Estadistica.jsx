import '../estilos/paginas/PaginaMetricas.css';
import { Toolbox, ChartNoAxesCombined, TriangleAlert, ClockAlert, Timer  } from 'lucide-react';

const ICONOS = {
    "Ingresados este mes": { icono: <Toolbox size={30}/>, clase: "estadistica--azul" },
    "Pendientes": { icono: <ClockAlert size={30}/>, clase: "estadistica--naranja" },
    "Tiempo prom. reparación(en días)": { icono: <Timer size={30}/>, clase: "estadistica--verde" },
    "Urgentes activos": { icono: <TriangleAlert size={30} />, clase: "estadistica--rojo" },
};

function Estadistica({ estadistica, nombre }) {
    const config = ICONOS[nombre] || { icono: <ChartNoAxesCombined size={30} />, clase: "estadistica--azul" };

    return (
        <div className="estadistica">
            <div className={`estadistica__icono-wrap ${config.clase}`}>
                <span className="estadistica__icono">{config.icono}</span>
            </div>
            <p className="estadistica__valor">{estadistica}</p>
            <p className="estadistica__nombre">{nombre}</p>
        </div>
    );
}

export default Estadistica;