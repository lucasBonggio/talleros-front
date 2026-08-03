import api from './axios';

export const iniciarSesion = async (credenciales) => {
    try {
        const respuesta = await api.post(
            `/usuario/login`,
            credenciales
        );

        return respuesta.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.mensaje ||
            "Error al iniciar sesión."
        );
    }
}

export const cerrarSesion = async () => {
    try {
        const respuesta = await api.post(
            `/usuario/logout`
        );

        return respuesta.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.mensaje ||
            "Error al cerrar la sesión."
        );
    }
}