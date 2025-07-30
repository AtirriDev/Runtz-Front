import { CardCarrito } from "../Componentes/cardCarrito.js";
import { CargarVenta } from "../Api/ventas.api.js";

import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';

// aca vamos a poner toda la funcionalidad de tomar los productos del session storage mostrar y subir pasar la compra al back 



window.addEventListener('load',async () => {
    console.log("Hola soy el carrito")
   
    const btnFinalizarCompra= document.getElementById('btnCargarVenta')
    const contCardsCarrito = document.getElementById('contenedor-carrito');
    const ProductosCarrito = JSON.parse(sessionStorage.getItem("carrito"));
   
   
    console.log(ProductosCarrito)
    
    
    renderizarProductosEnContenedor('contenedor-carrito',ProductosCarrito);
    actualizarTotal();

   // chat embebido de asistente virtual 
       createChat({
               webhookUrl: 'https://atirri.site/webhook/3c068f8e-d4cf-4335-af8b-544e881b88db/chat',
               webhookConfig: {
                   method: 'POST',
                   headers: {}
               },
               target: '#n8n-chat',
               mode: 'window',
               chatInputKey: 'chatInput',
               chatSessionKey: 'sessionId',
               metadata: {},
               showWelcomeScreen: false,
               defaultLanguage: 'en',
               initialMessages: [
                   'Hola soy Kobe 🤖🏀',
                   'Estoy aqui para asesorarte en cualquier duda que tengas sobre nuestros servicios.'
               ],
               i18n: {
                   en: {
                       title: 'Runtz 💎',
                       subtitle: "Asistencia las 24 hrs , a la altura de  Magic Johnson en los Lakers 👨🏿‍🦲 ",
                       footer: '',
                       getStarted: 'New Conversation',
                       inputPlaceholder: 'Escribe tu consulta..',
                   },
               },
      });
    
}
);



function renderizarProductosEnContenedor(contenedorId, productos) {
  const contenedor = document.getElementById(contenedorId);
  const contCarritoVacio = document.getElementById('contCarritoVacio')
  const TituloCarrito = document.getElementById('tituloCarrito');
  if (!contenedor) return; // si no existe el contenedor sale 

  // 🔴 Limpia el contenido actual antes de renderizar nuevos productos
  contenedor.innerHTML = '';
  
  
  // ✅ Validación segura
  if (Array.isArray(productos) && productos.length > 0) {
    productos.forEach(producto => {
      contenedor.innerHTML += CardCarrito(producto);
    });
  } else {
    TituloCarrito.classList.add('hidden');
    contCarritoVacio.classList.remove('hidden');
  }
}

// eliminar productos del carrito 

document.addEventListener("DOMContentLoaded", function () {
   
    document.addEventListener("click", function (event) {
        if (event.target && event.target.matches(".btnEliminar")) {
            const idProducto = event.target.dataset.id;
            EliminarDelCarrito(idProducto);
        }
    });
});

// cargar venta 
document.addEventListener("DOMContentLoaded", function () {
   
    document.addEventListener("click",async function (event) {
        if (event.target && event.target.matches("#btnCargarVenta")) {
           // ACA VAMOS A TENER QUE ARMAR EL JSON PARA ENVIAR AL BACK , NECESITAMOS :
           /*
              IdUsuario
              Fecha
              Total
              direccion
              {productos}
           */
          const alerta = document.getElementById('Alerta')
          
           console.log("vamos a cargar la venta")
           // Traemos al usuario desde el local 

          const usuario = JSON.parse(sessionStorage.getItem("usuario"));
          // ahora tenemos que formar el array de productos que son solo sus ids 
            
            const carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];
            const idsCarrito = carrito.map(item => item._id);
         
            // verificamos que hay un usuario logeado  y productos en el carrito 
          
          if (!usuario || !Array.isArray(carrito) || carrito.length === 0) {
              if (!usuario) {
                console.log("No hay un usuario activo");
                return;
              } else {
                alerta.classList.remove('hidden');

                return;
              }
          }

          console.log(usuario)

          const idUsuario = usuario.id; // aca ya tenemos el id del usuario

            // vamos a inventarle la direccion y 
            const direccion = usuario.direccion;

           // obtenemos la fecha
            const fecha = new Date().toISOString().split('T')[0];
            console.log(fecha);

            // el total lo vamos a sacar de la etiqueta total que esta actualizada
            
            const total = document.getElementById('total').textContent;
            // formatearlo para que saque el  "Total: $"
            const totalFormateado = parseInt(total.replace(/[^0-9]/g, '')); // 165000
            

            console.log(idsCarrito)

           const venta = {
              id_usuario: idUsuario,
              fecha: fecha,
              total: totalFormateado,
              dirección: direccion,
              productos: idsCarrito
          };

          const FinalizarVenta = await CargarVenta(venta);
          // vaciar el carrito 

          sessionStorage.removeItem("carrito");
          // actualizar el carrito visualmente
          renderizarProductosEnContenedor('contenedor-carrito', []);
          actualizarContadorCarrito();
          actualizarTotal();

          document.getElementById("flyer").src = "../Recursos/Gracias por su compra flyer.png";

          
        }
    });
});

// Codigo para cerrar la alerta 
const btnCerrarAlerta = document.getElementById('cerrarAlerta')
btnCerrarAlerta.addEventListener('click',  function (event) {
   const alerta = document.getElementById('Alerta')
    alerta.classList.add('hidden');
})

function EliminarDelCarrito(idProducto) {

  console.log("id:" + idProducto)
    
  
    const carrito = JSON.parse(sessionStorage.getItem("carrito")) || []; // traer los productos del carrito 
    
   
    // Filtramos el carrito sacando el producto con el id a eliminar 
    const nuevoCarrito = carrito.filter(p => p._id !== idProducto);
    
    

  
   

    // Guardamos el carrito actualizado
    sessionStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    
    // volvemos a renderizar las cards 
    renderizarProductosEnContenedor('contenedor-carrito',nuevoCarrito);
    //  Actualizamos el contador y color del carrito
    actualizarContadorCarrito(); 

    // actualizamos el total del carrito 
    actualizarTotal();
}





// Funcion para actualizar el contador del carrito 
function actualizarContadorCarrito() {
    const CarritoIcon = document.getElementById('carritoIcon')
    const contador = document.getElementById('ContadorCarrito');
    const carritoIconMobile = document.getElementById("carritoIconMobile"); // para cuando la pantalla se hace pequeña 
    const contadorMobile = document.getElementById("ContadorMobile");
    const carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];

    if (contador) {
        if (carrito.length > 0) {
            // Cambiamos el color del ícono si hay productos del carrito en pantalla grande 
            CarritoIcon?.classList.remove("text-black");
            CarritoIcon?.classList.add("text-blue-700");
            contador.classList.remove("hidden");
            contador.textContent = carrito.length;

            // pantalla mobile- chica 

            carritoIconMobile?.classList.remove("text-black");
            carritoIconMobile?.classList.add("text-blue-700");

            contadorMobile.classList.remove('hidden')
            contadorMobile.textContent = carrito.length;
           
            
        } else {
            contador.classList.add("hidden");
            // Volver al color original si no hay productos
            CarritoIcon.classList.remove("text-blue-700");
            CarritoIcon.classList.add("text-black");
        }
    }
}

// funcion para actualizar el total 
function actualizarTotal() {
    const total = document.getElementById('total')
    const carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];

    let totalProductos = 0 ;

  // ✅ Validación segura
  if (Array.isArray(carrito) && carrito.length > 0) {
    carrito.forEach(producto => {
       totalProductos = totalProductos + producto.precio ;
    });

    total.textContent = `Total: $${totalProductos.toLocaleString('es-AR')}`;


  } else {
   total.textContent = `Total: $${totalProductos.toLocaleString('es-AR')}`;
  }
}
