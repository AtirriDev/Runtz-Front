


export function CardCarrito(producto){
    const precioFormateado = producto.precio.toLocaleString('es-AR');
    
    return `
                 
         <div class="bg-white rounded-lg overflow-hidden " >
                    <img class="w-full h-48 object-contain mt-1" src="${producto.imagen}" alt="Producto 1" >
                    <div class="p-4 rounded-lg justify-center  ">
                        
                        
                        <p class="text-black font-bold text-center">$${precioFormateado}</p>
                        <button  data-id="${producto.id}" class="btnEliminar mt-2 bg-red-700 text-white hover:bg-white hover:text-black  font-semibold  rounded-full transition duration-300 w-full  hover:border-2 hover:border-black py-2">
                            Eliminar
                        </button>
                    </div>
        </div>     
           
   `;
 }    