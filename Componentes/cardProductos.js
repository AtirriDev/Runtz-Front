

export function Card(producto){
     const precioFormateado = producto.precio.toLocaleString('es-AR');
    return `
                 
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
                    <img src="${producto.imagen}" alt="Producto 1" class="w-full h-48 object-contain mt-1">
                    <div class="p-4">
                        <h3 class="text-lg font-semibold text-gray-800 mb-2">${producto.marca}</h3>
                        <p class="text-gray-600 mb-2">${producto.producto}</p>
                        <p class="text-gray-800 font-bold">$${precioFormateado}</p>
                        <button  data-id="${producto._id}" class="btnCompra mt-4 bg-black text-white hover:bg-white hover:text-black font-semibold py-2 px-4 rounded-full transition duration-300 w-full border border-transparent hover:border-2 hover:border-black">
                            Agregar al Carrito
                        </button>
                    </div>
        </div>
           
   `;
 }    