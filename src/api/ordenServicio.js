import api from './axios';

export const crearOrden = async (idCliente, orden) => {
    try{
        const respuesta = await api.post(
            `/orden/${idCliente}`, 
            orden
        );

        return respuesta.data;
    }catch(error){
        throw new Error(
            error.response?.data?.mensaje ||
            "Error al crear la orden."
        );
    }
}

export const obtenerOrdenesPorEstado = async (estado, pagina) =>{
    try{
        const respuesta = await api.get(
            `/orden/estado/${estado}`,
            {
                params: {
                    paginas: pagina,
                    tamano: 10
                }
            }
        );
        return respuesta.data;
    }catch(error){
        throw new Error(
            error.response?.data?.mensaje ||
            "Error al obtener las ordenes."
        );
    }
}

export const obtenerOrdenesPorCliente = async (valor) =>{
    try{
        const respuesta = await api.get(
            `/orden/cliente/${valor}`
        );

        return respuesta.data;
    }catch(error){
        throw new Error(
            error.response?.data?.mensaje ||
            "Error al obtener las ordenes."
        );
    }
}