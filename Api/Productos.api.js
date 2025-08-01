import { API } from "./api.js";

// obtener todos los productos
export const productosdata = async()=>{
    try {
        const res = await  fetch(`${API}/productos`,
            //aca va el json que se envia 
            {
                method: "GET",
                headers: { 
                            'Content-Type': 'application/json', 
                         }


            })

        const data = await res.json() ;
        
        return data 
    } catch (error) {
        console.log(error)
    }
}


// Obtener productos por categoria

export const productosCategoria = async (categoria) => {
    try {
        const res = await fetch(`${API}/productos/categorias`, {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ categoria }) 
        });

        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}


// Obtener producto por Id
export const productoPorId = async (id) => {
    try {
        const res = await fetch(`${API}/productos/buscar/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await res.json();
        return data;
    } catch (error) {
        console.log('Error al obtener producto por ID:', error);
    }
};