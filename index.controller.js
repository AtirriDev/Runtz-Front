import { Login } from "./Api/login&registro.api.js";
import { RegistroUsuario } from "./Api/login&registro.api.js";
import { UsuariosData } from "./Api/login&registro.api.js";

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const switchToRegisterLink = document.getElementById('switch-to-register');
const switchToLoginLink = document.getElementById('switch-to-login');

switchToRegisterLink.addEventListener('click', (event) => {
    event.preventDefault();
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
});

switchToLoginLink.addEventListener('click', (event) => {
    event.preventDefault();
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
});


// Logica para el login 

const btnLogin = document.getElementById('btnLogin');
const AlertaLogin = document.getElementById('AlertaLogin');
const btnCerrarAlertaLogin = document.getElementById('btnCerrarLogin');


btnLogin.addEventListener('click', async function (event) {
    event.preventDefault();

    const emailCasilla = document.getElementById('email');
    const passwordCasilla = document.getElementById('password');

    const usuario = {
        email: emailCasilla.value,
        contraseña: passwordCasilla.value
    };

    if (!usuario.email || !usuario.contraseña) {
        // mostrar la alerta , le sacamos el hidden
         AlertaLogin.classList.remove('hidden')
        return;
    }

    try {
        const respuesta = await Login(usuario);
        console.log(respuesta)
        if (respuesta?.mensaje === 'Email o contraseña incorrectos.') {
            // mostrar la alerta , le sacamos el hidden
            AlertaLogin.classList.remove('hidden')

        } else {
                const token = respuesta.token;
                const datosUsuario = respuesta.datosUsuario;

                if (token) {
                    sessionStorage.setItem('token', token);
                    sessionStorage.setItem('usuario', JSON.stringify(datosUsuario));
                    window.location.href = './Pages/home.html';
                }
        }
    } catch (error) {
        console.log("hola soy el error " + error)
        // 5. Tomamos cualquier error que lance 
        // Esto incluye:
        // - Errores de credenciales (ej. 'Contraseña incorrecta' de tu backend 401)
        // - Errores de red
        // - Cualquier otro error que 'Login' haya propagado
        
        console.error('Error durante el proceso de login:', error);
        
        // Mostramos el mensaje de error al usuario
        // 'error.message' contendrá el mensaje exacto que tu función Login lanzó
        
        // mostrar la alerta , le sacamos el hidden
        AlertaLogin.classList.remove('hidden')
        AlertaLogin.querySelector('p').textContent = error;
    }
});

btnCerrarAlertaLogin.addEventListener('click',  function (event) {
    AlertaLogin.classList.add('hidden')
})

// Logica para el Registro de usuario 


const btnRegistro = document.getElementById('btnRegistrarse');
const AlertaRegistro = document.getElementById('AlertaRegistro');
const btnCerrarAlertaRegistro = document.getElementById('cerrarAlerta');

btnRegistro.addEventListener('click', async function (event) {
    event.preventDefault();

    const NombreUsuario = document.getElementById('NombreUsuario');
    const ApellidoUsuario = document.getElementById('ApellidoUsuario')
    const emailCasilla = document.getElementById('emailRegistro');
    const direccionUsuario = document.getElementById('DireccionUsuario')
    const passwordCasilla = document.getElementById('passwordRegistro');
    

    const usuario = {
        nombre: NombreUsuario.value,
        apellido: ApellidoUsuario.value,
        direccion: direccionUsuario.value,
        email: emailCasilla.value,
        contraseña: passwordCasilla.value
       
    };
    console.log(usuario)

    if (!usuario.nombre || !usuario.apellido || !usuario.direccion || !usuario.email || !usuario.contraseña) {
         // le sacamos el hidden para que se ve 
            AlertaRegistro.classList.remove('hidden')
            registerForm.classList.remove('hidden') // tambien al form registro asi no vuelve al de login 
        return;
    }
    const usuariosRegistrados = await UsuariosData();
    const emailYaRegistrado = usuariosRegistrados.some(u => u.email === usuario.email);
    if (emailYaRegistrado) {
        console.log("Usuario ya registrado por que el email ingresado ya se encuentra en la base de datos ")
        AlertaRegistro.classList.remove('hidden');
        AlertaRegistro.querySelector('p').textContent = 'Este correo ya está registrado.';
        return;
    }

    try {

        const respuesta = await RegistroUsuario(usuario);
        console.log(respuesta)
        if (respuesta?.error === 'Faltan datos del usuario') {
            // le sacamos el hidden para que se ve 
            AlertaRegistro.classList.remove('hidden')
            

        } else {
             // Redirige al index para que pueda hacer el login el nuevo usuario
            window.location.href = 'index.html';
            
            console.log(usuario)
        }
    } catch (error) {
        console.error('Error en el login:', error);
    }
});

// ceerrar alerta registro
btnCerrarAlertaRegistro.addEventListener('click', function () {
    AlertaRegistro.classList.add('hidden');
});


