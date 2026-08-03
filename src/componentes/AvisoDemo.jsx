import { Info } from "lucide-react";
import "../estilos/componentes/AvisoDemo.css";

function AvisoDemo() {
    return (
        <div className="aviso-demo">
            <div className="aviso-demo__header">
                <Info size={18} />
                <span>Versión Demo</span>
            </div>

            <h3 className="aviso-demo__titulo">
                Bienvenido a TallerOS
            </h3>

            <p className="aviso-demo__descripcion">
                Esta aplicación está publicada únicamente con fines demostrativos.
                Podés explorar todas sus funcionalidades utilizando la siguiente
                cuenta de prueba.
            </p>

            <div className="aviso-demo__credenciales">
                <div>
                    <span>Usuario</span>
                    <strong>admin</strong>
                </div>

                <div>
                    <span>Contraseña</span>
                    <strong>admin123</strong>
                </div>
            </div>
        </div>
    );
}

export default AvisoDemo;