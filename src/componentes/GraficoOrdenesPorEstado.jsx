import { PieChart, Pie, Cell } from 'recharts';
import '../estilos/componentes/Metricas.css';


const COLORES_ESTADO = {
    INGRESADO: { color: "#3b82f6", etiqueta: "Ingresado" },
    EN_REPARACION: { color: "#f59e0b", etiqueta: "En Reparación" },
    LISTO: { color: "#22c55e", etiqueta: "Listo" },
    ENTREGADO: { color: "#94a3b8", etiqueta: "Entregado" },
    CANCELADO: { color: "#ef4444", etiqueta: "Cancelado" },
};

function GraficoOrdenesPorEstado({ ordenesPorEstado }) {
    if (!ordenesPorEstado) return null;

    const datos = Object.entries(ordenesPorEstado).map(([estado, cantidad]) => ({
        estado,
        cantidad,
        color: COLORES_ESTADO[estado]?.color || "#cbd5e1",
        etiqueta: COLORES_ESTADO[estado]?.etiqueta || estado,
    }));

    return (
        <div className="panel-metrica">
            <p className="panel-metrica__titulo">ÓRDENES POR ESTADO</p>

            <div className="grafico-donut__wrap">
                <PieChart width={220} height={220}>
                    <Pie
                        data={datos}
                        dataKey="cantidad"
                        innerRadius={65}
                        outerRadius={100}
                        paddingAngle={2}
                    >
                        {datos.map((entrada) => (
                            <Cell key={entrada.estado} fill={entrada.color} stroke="none" />
                        ))}
                    </Pie>
                </PieChart>
            </div>

            <div className="grafico-donut__leyenda">
                {datos.map((entrada) => (
                    <div className="leyenda-item" key={entrada.estado}>
                        <span className="leyenda-item__punto" style={{ background: entrada.color }} />
                        <span className="leyenda-item__etiqueta">{entrada.etiqueta}</span>
                        <span className="leyenda-item__valor">{entrada.cantidad}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GraficoOrdenesPorEstado;