import { useEffect, useState } from 'react';
import '../estilos/componentes/FormularioTV.css';

function FormularioTV({ onDatosListos }) {
    const [tipoTv, setTipoTv] = useState("");
    const [pulgadas, setPulgadas] = useState("");
    const [marca, setMarca] = useState("");
    const [estado, setEstado] = useState("INGRESADO");
    const [urgencia, setUrgencia] = useState("NORMAL");
    const [fallaReportada, setFallaReportada] = useState("");
    const [entregaEstimada, setEntregaEstimada] = useState("");

    useEffect(() => {
        onDatosListos({
            marcaTv: marca,
            pulgadasTv: Number(pulgadas),
            tipoTv,
            estado,
            urgencia,
            fallaReportada,
            entregaEstimada
        });
    }, [marca, pulgadas, tipoTv, estado, urgencia, fallaReportada, entregaEstimada]);

    return (
        <div className="formulario-tv">
            <div className="formulario-tv__fila">
                <div className="campo">
                    <label 
                        for='tipoTv'
                        className="campo__label">TIPO DE TV <span className="campo__requerido">*</span></label>
                    <select
                        id='tipoTv'
                        className="campo__input"
                        value={tipoTv}
                        onChange={(e) => setTipoTv(e.target.value)}
                    >
                        <option value="">Seleccionar...</option>
                        <option value="LED">LED</option>
                        <option value="LCD">LCD</option>
                        <option value="QLED">QLED</option>
                        <option value="OLED">OLED</option>
                    </select>
                </div>
                <div className="campo">
                    <label 
                        for='pulgadas'
                        className="campo__label">PULGADAS <span className="campo__requerido">*</span></label>
                    <input
                        id='pulgadas'
                        type="number"
                        className="campo__input"
                        value={pulgadas}
                        onChange={(e) => setPulgadas(e.target.value)}
                        placeholder="Ej: 55"
                    />
                </div>
            </div>

            <div className="campo">
                <label 
                    for='marca'
                    className="campo__label">MARCA <span className="campo__requerido">*</span></label>
                <select
                    id='marca'
                    className="campo__input"
                    value={marca}
                    onChange={(e) => setMarca(e.target.value)}
                >
                    <option value="">Seleccionar marca...</option>
                    <option value="Samsung">Samsung</option>
                    <option value="LG">LG</option>
                    <option value="Sony">Sony</option>
                    <option value="Philips">Philips</option>
                    <option value="TCL">TCL</option>
                    <option value="Philco">Philco</option>
                    <option value="Otra">Otra</option>

                </select>
            </div>

            <div className="formulario-tv__fila">
                <div className="campo">
                    <label 
                        for='estado'
                        className="campo__label">ESTADO INICIAL</label>
                    <select
                        id='estado'
                        className="campo__input"
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                    >
                        <option value="INGRESADO">Ingresado</option>
                        <option value="EN_REPARACION">En reparación</option>
                        <option value="LISTO">Listo</option>
                        <option value="ENTREGADO">Entregado</option>
                    </select>
                </div>
                <div className="campo">
                    <label 
                        for='urgencia'
                        className="campo__label">URGENCIA</label>
                    <select
                        id='urgencia'
                        className="campo__input"
                        value={urgencia}
                        onChange={(e) => setUrgencia(e.target.value)}
                    >
                        <option value="NORMAL">Normal</option>
                        <option value="URGENTE">Urgente</option>
                    </select>
                </div>
            </div>

            <div className="campo">
                <label 
                    for='fallaReportada'
                    className="campo__label">FALLA REPORTADA POR EL CLIENTE <span className="campo__requerido">*</span></label>
                <textarea
                    id='fallaReportada'
                    className="campo__input campo__textarea"
                    value={fallaReportada}
                    onChange={(e) => setFallaReportada(e.target.value)}
                    placeholder="Describí el problema que reporta el cliente..."
                />
            </div>

            <div className="campo">
                <label 
                    for='entregaEstimada'
                    className="campo__label">FECHA DE ENTREGA ESTIMADA <span className="campo__requerido">*</span></label>
                <input
                    id='entregaEstimada'
                    type="date"
                    className="campo__input"
                    value={entregaEstimada}
                    onChange={(e) => setEntregaEstimada(e.target.value)}
                />
            </div>
        </div>
    );
}

export default FormularioTV;