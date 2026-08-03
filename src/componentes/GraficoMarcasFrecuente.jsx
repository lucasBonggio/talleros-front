import '../estilos/componentes/Metricas.css';
import { User } from 'lucide-react'

function GraficoMarcasFrecuentes({ marcasFrecuentes, clientesRegistrados }) {
    if (!marcasFrecuentes) return null;

    const entradas = Object.entries(marcasFrecuentes).sort((a, b) => b[1] - a[1]);
    const maximo = Math.max(...entradas.map(([, cantidad]) => cantidad));

    return (
        <div className="panel-metrica">
            <p className="panel-metrica__titulo">MARCAS MÁS FRECUENTES</p>

            <div className="marcas-frecuentes__lista">
                {entradas.map(([marca, cantidad]) => (
                    <div className="marca-item" key={marca}>
                        <div className="marca-item__fila">
                            <span className="marca-item__nombre">{marca}</span>
                            <span className="marca-item__valor">{cantidad}</span>
                        </div>
                        <div className="marca-item__barra-fondo">
                            <div
                                className="marca-item__barra-relleno"
                                style={{ width: `${(cantidad / maximo) * 100}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="marcas-frecuentes__clientes">
                <div className="marcas-frecuentes__icono-wrap"><User size={20} /></div>
                <div>
                    <p className="marcas-frecuentes__label">Clientes registrados</p>
                    <p className="marcas-frecuentes__valor">{clientesRegistrados}</p>
                </div>
            </div>
        </div>
    );
}

export default GraficoMarcasFrecuentes;