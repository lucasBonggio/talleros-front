import api from './axios';

export const obtenerEstadisticasGenerales = async () => {
    try {
        const respuesta = await api.get(
            `/metricas/general`
        );

        return respuesta.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.mensaje ||
            "Error al obtener estadisticas generales."
        );
    }
}

export const obtenerEstadisticasSecundarias = async () => {
    try {
        const respuesta = await api.get(
            `/metricas/secundarias`
        );

        return respuesta.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.mensaje ||
            "Error al obtener estadisticas secundarias."
        );
    }
}