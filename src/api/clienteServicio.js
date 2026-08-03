import api from './axios';

export const crearCliente = async (cliente) =>{
    try{
        const respuesta = await api.post(
            '/cliente',
            cliente
        );

        return respuesta.data;
    }catch(error){
        throw new Error(
            error.response?.data?.mensaje ||
            "Error al crear el cliente."
        );
    }
}

export const actualizarCliente = async (cliente, idCliente) => {
    try{
        const respuesta = await api.post(
            `/cliente/${idCliente}`,
            cliente
        )

        return respuesta.data;
    }catch(error){
        throw new Error(
            error.response?.data?.mensaje || 
            "Error al actualizar el cliente."
        );
    }
}

export const buscarClientePorId = async (idCliente) => {
    try{
        const respuesta = await api.get(
            `/cliente/${idCliente}`, {}
        );

        return respuesta.data;
    }catch(error){
        throw new Error(
            error.response?.data?.mensaje ||
            "Error al buscar al cliente."
        );
    }
}

export const buscarClientePorValor = async (valor) => {
    try{
        const respuesta = await api.get(
            `/cliente/valor/${valor}`
        );

        return respuesta.data;
    }catch(error){
        throw new Error(
            error.response?.data?.mensaje ||
            "Error al obtener al cliente."
        );
    }
}

export const eliminarCliente = async (idCliente) => {
    try{
        const respuesta = await api.delete(
            `/cliente/${idCliente}`,
            {}
        );

        return respuesta.data;
    }catch(error){
        throw new Error(
            error.response?.data?.mensaje ||
            "Error al eliminar el cliente."
        );
    }
}