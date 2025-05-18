import { navbar } from '../Componentes/Navbar.js';
import { productosdata } from '../Api/Productos.api.js';
import { Card } from '../Componentes/cardProductos.js';

import { productosCategoria } from '../Api/Productos.api.js'; //  url de la api


console.log("Script cargado correctamente.");



  window.addEventListener('load',async () => {
    const contNavbar = document.getElementById('navbar-container');
  
    
    
    
      
    
      if (contNavbar) {
        contNavbar.innerHTML = navbar;
        
        actualizarContadorCarrito(); // llamamos a la funcion para actualizar el contador del carrito 
        const hamburgerBtn = document.getElementById("hamburger-btn");
        const mobileMenu = document.getElementById("mobile-menu");
        const closeMenuBtn = document.getElementById("close-menu-btn");

        function toggleMobileMenu() {
          mobileMenu.classList.toggle("hidden");
        }

        hamburgerBtn.addEventListener("click", toggleMobileMenu);
        closeMenuBtn.addEventListener("click", toggleMobileMenu);

        document.addEventListener("click", (event) => {
          if (
            !mobileMenu.classList.contains("hidden") &&
            !mobileMenu.contains(event.target) &&
            !hamburgerBtn.contains(event.target)
          ) {
            mobileMenu.classList.add("hidden");
          }
        });

        // ✅ Lógica para cerrar el menú si se agranda la pantalla
        window.addEventListener('resize', () => {
          if (window.innerWidth >= 768) {
            mobileMenu.classList.add('hidden');
          }
        });
  }


    
    //Obtener productos del backend
    const productos = await productosdata();

    // Verificamos si estamos en la página de productos y si hay una categoría en la URL
    const estaEnProductos = window.location.pathname.includes("productos.html");
    const params = new URLSearchParams(window.location.search);
    const categoriaURL = params.get('categoria');

    // Si estamos en productos y hay una categoría en la URL, cargamos esos productos directamente
      if (estaEnProductos && categoriaURL) {
          await cargarProductosPorCategoria(categoriaURL);

          const botonActivo = document.getElementById(`btn${categoriaURL}`);
          

          const contenedor = document.getElementById('contProductos2');
          if (contenedor) {
            contenedor.scrollIntoView({ behavior: 'smooth' });
          }

          //  Evitamos renderizar de nuevo todos los productos
          return;
      }


    // Guardo todos los productos en session storage por que lo voy a necesitar 
    localStorage.setItem('Catalogo',JSON.stringify(productos))
    const ProductosParaElHome = obtenerIntercalado4PorCategoria(productos);
    console.log(productos); 

    // Usamos la funcion de renderizado de contenedores , le mandamos el id del contenedor y el array que va a usar

    // para el home
    renderizarProductosEnContenedor('contProductos', ProductosParaElHome);

    // para todos los productos
    renderizarProductosEnContenedor('contProductos2', productos);
          
 
   
      
    
      
     
    

});

// Funciion para tener articulos intercaladdos en por categorias para el hombe 
function obtenerIntercalado4PorCategoria(productos) {
  const categoriasMap = {};

  // Agrupo todos los productos por categoria
  productos.forEach(producto => {
    const categoria = producto.categoria;
    if (!categoriasMap[categoria]) {
      categoriasMap[categoria] = [];
    }
    categoriasMap[categoria].push(producto);
  });

  const resultado = []; // arreglo final que va a tener todos los productos intercalados
  let i = 0; // indice para posicionamiento

  // tomar 4 de cada categoria para tener un total de 12 articulos para mostrar
  while (resultado.length < 12) { 
    let categoriasTerminadas = 0;

    // repetitiva que va a ir tomando segun el indice de cada categoria , mientras no supere 12 como dice el while 
    for (const categoria in categoriasMap) {
      if (categoriasMap[categoria][i]) {
        resultado.push(categoriasMap[categoria][i]);
      } else {
        categoriasTerminadas++;
      }
    }

    //aca controla que cuando ya tomo de cada categoria 
    if (categoriasTerminadas === Object.keys(categoriasMap).length) {
      break; // ya no hay más productos para tomar
    }

    i++;
  }

  return resultado;
}


// ✅ Función para renderizar productos en el contenedor deseado , por que me fallaba dado que quiero hacer un js unificado de las paginas y la pagina Home y productos usan
// la misma card pero distintos arrays y contenedores 

function renderizarProductosEnContenedor(contenedorId, productos) {
  const contenedor = document.getElementById(contenedorId);
  if (!contenedor) return; // si no existe el contenedor sale 

  // 🔴 Limpia el contenido actual antes de renderizar nuevos productos
  contenedor.innerHTML = '';
  // si existe verifica que haya que cargarles 
  if (productos.length > 0) {
    productos.forEach(producto => {
      contenedor.innerHTML += Card(producto);
    });
  } else {
    contenedor.innerHTML = `<p>No hay productos para mostrar.</p>`;
  }
}


// funcionalidad de elegir categoria en la pagina de productos 


// obtenemos los botones de categoria 
const BotonIndumentaria = document.getElementById('btnIndumentaria');
const BotonCalzado = document.getElementById('btnCalzado');
const BotonAccesorios = document.getElementById('btnAccesorios');
const BotonVerTodos = document.getElementById('btnVerTodos');
const botonesCategoria = document.querySelectorAll('.btnCategoria'); // la necesito para la verificacion que sigue 

// Eventos de los botones , los verifico asi por que sino fallaba en la pagina home que no tenia estos botones 
if (BotonIndumentaria) {
  BotonIndumentaria.addEventListener('click', () => cargarProductosPorCategoria('Indumentaria'));
}
if (BotonCalzado) {
  BotonCalzado.addEventListener('click', () => cargarProductosPorCategoria('Calzado'));
}
if (BotonAccesorios) {
  BotonAccesorios.addEventListener('click', () => cargarProductosPorCategoria('Accesorios'));
}
if (BotonVerTodos) {
  BotonVerTodos.addEventListener('click', () => cargarProductosPorCategoria('Todos'));
}


//Funcion para cargar los productos por categoria 
async function cargarProductosPorCategoria(categoria) {
 
  try {
   
    if (categoria === 'Todos') {
      const productos = await productosdata();
      
      // Limpiar el contenedor antes de renderizar nuevos productos
      const contenedorId = 'contProductos2'; // contenedor para insertar productos
      const contenedor = document.getElementById(contenedorId);
   

      // Renderizar los productos
      renderizarProductosEnContenedor(contenedorId, productos);
    }
    else{
      const productos = await productosCategoria(categoria); // llamamos a la funcion que tenemos en api y le pasamos la categoria 

   
      
        // Limpiar el contenedor antes de renderizar nuevos productos
        const contenedorId = 'contProductos2'; // contenedor para insertar productos
        const contenedor = document.getElementById(contenedorId);
      

        // Renderizar los productos
        renderizarProductosEnContenedor(contenedorId, productos);
    }

    
  } catch (error) {
    console.error('Error al cargar productos por categoría:', error);
  }
}


// Funcionalidad de agregar productos al carrito , voy a usar session storage y no local , ¿ por que razon hago esto?

// por que si uso local siempre va a quedar el carrito y si quiero probar con varios usuarios en mi pc prefiero usar session para que el carrito se borre 



document.addEventListener("DOMContentLoaded", function () {
   console.log("✅ DOM listo");
    document.addEventListener("click", function (event) {
        if (event.target && event.target.matches(".btnCompra")) {
            const idProducto = event.target.dataset.id;
            agregarAlCarrito(idProducto);
        }
    });
});


function agregarAlCarrito(idProducto) {

  console.log("id:" + idProducto)
    const modal = document.getElementById('modal')
  
    const carrito = JSON.parse(sessionStorage.getItem("carrito")) || []; // traer los productos del carrito 
    
    // Obtenemos el catálogo del localStorage
    const catalogo = JSON.parse(localStorage.getItem("Catalogo")) || [];

    // Buscamos el producto por id en el catálogo
    const producto = catalogo.find(p => p.id === Number(idProducto));

    if (!producto) {
       console.log("Producto no encontrado")
        modal.querySelector('#titulo').textContent = "Alerta";
        modal.querySelector('p').textContent = "Ha ocurrido un problema con la carga de stock de los productos. vuelva a intentar.";
        modal.classList.remove('hidden')
        return;
    }

    
    // Verificamos si ya está en el carrito
    const yaEnCarrito = carrito.some(p => Number(p.id) === Number(idProducto));
      if (yaEnCarrito) {
          console.log("no se puede agregar ")
          modal.querySelector('#titulo').textContent = "Alerta";
          modal.querySelector('p').textContent = "Producto ya existente en el carrito. verifique y agregue nuevamente.";
          modal.classList.remove('hidden')
          return;
    }

    // Agregamos el producto completo al carrito
    carrito.push(producto);
   

    // Guardamos el carrito actualizado
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
    console.log("Producto agregado al carrito:", producto);

    //  Actualizamos el contador y color del carrito
    actualizarContadorCarrito();

    // Mostrar modal con contenido dinámico
    modal.querySelector('#titulo').textContent = "Carrito";
    modal.querySelector('p').textContent = "Producto agregado correctamente al carrito";
    modal.classList.remove('hidden');
    
   
}

const btnCerrarModal = document.getElementById('CerrarModal')

btnCerrarModal.addEventListener("click", function (event) {
      const modal = document.getElementById('modal');
      modal.classList.add('hidden')
    });
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



