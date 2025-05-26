import { API } from "./api.js";



// Funcion de login 
export const Login = async (credencialUsuario) => {
    try {
        const res = await fetch(`${API}/Usuarios/login`, {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credencialUsuario)  // le mandamos los datos del usuario en el login 
        });

        //  verificar si la respuesta es status 200 o un error
        if (!res.ok) {
            console.log("entre aca boludo")
            const errorData = await res.json();
            // Lanzar un error para que el bloque catch del evento click lo maneje
            throw new Error(errorData.message || 'Error en las credenciales');
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error +"lalalal");
        throw error; // Propagar el error para que sea manejado por el llamador
    }
}

// Funcion de Registro
export const RegistroUsuario = async(Usuario)=>{
     try {
        const res = await fetch(`${API}/Usuarios/add`, {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Usuario)  // le mandamos los datos del usuario en el login 
        });

        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

// Funcion para obtener los usuarios 

export const UsuariosData= async()=>{
    try {
        const res = await  fetch(`${API}/Usuarios`,
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