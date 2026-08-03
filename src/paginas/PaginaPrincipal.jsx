import { lazy, useState } from 'react';
import '../estilos/layout/PaginaPrincipal.css';

const BarraNavegadora = lazy(() => import('../componentes/BarraNavegadora'));
const PaginaMetricas = lazy(() => import('./PaginaMetricas'));
const PaginaOrdenes = lazy(() => import('./PaginaOrdenes'));
const PaginaNuevaOrden = lazy(() => import('./PaginaNuevaOrden'));

export default function PaginaPrincipal() {
    const [ventanaActiva, setVentanaActiva] = useState("nuevaOrden");

    return (
        <div className="pagina-principal">
            <aside className="pagina-principal__sidebar">
                <BarraNavegadora ventanaActiva={setVentanaActiva}/>
            </aside>
            <main className="pagina-principal__contenido">
                {ventanaActiva === "nuevaOrden" &&
                    <PaginaNuevaOrden />
                }
                {ventanaActiva === "ordenes" &&
                    <PaginaOrdenes />
                }
                {ventanaActiva === "estadisticas" &&
                    <PaginaMetricas />
                }
            </main>
        </div>
    );
}