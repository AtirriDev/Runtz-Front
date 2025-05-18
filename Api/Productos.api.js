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
        const res = await fetch(`${API}/productos`, {
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
