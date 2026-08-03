import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import '../estilos/componentes/Metricas.css';

function GraficoIngresosSemanales({ ordenesPorSemana }) {
    if (!ordenesPorSemana) return null;

    const datos = Object.entries(ordenesPorSemana).map(([semana, cantidad]) => ({
        semana,
        cantidad,
    }));

    return (
        <div className="panel-metrica">
            <p className="panel-metrica__titulo">INGRESOS SEMANALES</p>

            <BarChart width={340} height={230} data={datos} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#f1f5f9" />
                <XAxis
                    dataKey="semana"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                />
                <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#3b82f6', fontSize: 12 }}
                    allowDecimals={false}
                />
                <Bar dataKey="cantidad" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={22} />
            </BarChart>
        </div>
    );
}

export default GraficoIngresosSemanales;