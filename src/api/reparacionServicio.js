import api from './axios';

export const iniciarReparacion = async (idOrden, reparacion) => {
    try {
        const respuesta = await api.post(
            `/reparacion/${idOrden}/iniciar`,
            reparacion
        );

        return respuesta.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.mensaje ||
            "Error al iniciar la reparación."
        );
    }
}

export const finalizarReparacion = async (idReparacion, solucionAplicada, precio) => {
    try {
        const respuesta = await api.post(
            `/reparacion/${idReparacion}/finalizar`,
            {
                solucionAplicada : solucionAplicada,
                precio: Number(precio)
            }
        )
    } catch (error) {
        throw new Error(
            error.response?.data?.mensaje ||
            "Error al finalizar la reparación."
        );
    }
}

export const entregarReparacion = async (idReparacion) => {
    try {
        const respuesta = await api.post(
            `/reparacion/${idReparacion}/entregar`
        )

        return respuesta.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.mensaje ||
            "Error al entregar la reparación."
        );
    }
}

export const cancelarReparacion = async (idOrden, detalleCancelacion) => {
    try {
        const respuesta = await api.post(
            `/reparacion/${idOrden}/cancelar`,
            {detalleCancelacion}
        )

        return respuesta.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.mensaje ||
            "Error al cancelar la reparación."
        );
    }
}

export const obtenerReparacionPorOrden = async (ordenId) => {
    try {
        const respuesta = await api.get(
            `/reparacion/orden/${ordenId}`
        );
        
        return respuesta.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.mensaje ||
            "Error al obtener la reparación."
        );
    }
}