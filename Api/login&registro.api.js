import { API } from "./api.js";



// Funcion de login 
export const Login = async (Usuario) => {
    try {
        const res = await fetch(`${API}/Usuarios/login`, {
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