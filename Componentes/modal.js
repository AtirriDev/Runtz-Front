

export const Modal = 

    `
                 
         <div id="modal" class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center hidden">
                <div class="bg-white rounded-lg p-6 w-80 max-w-full shadow-lg flex  flex-col justify-center ">
                    <h2 class="bg-black rounded-md text-white text-xl font-semibold mb-4 py-2 px-2">Alerta</h2>
                    <p class="mb-4 px-4">Producto ya existente en el carrito. verifique y agregue nuevamente.</p>
                    <div class="flex flex-row gap-4">   
                        <a href="./carrito.html" class="text-gray-700 m-2">
                                    <i id="carritoIcon" class="fas fa-shopping-cart text-black hover:text-gray-500"></i>
                        </a>  
                         <button id="CerrarModal" class="bg-red-600 text-white  py-1 rounded hover:bg-red-700 w-20 hover:bg-white hover:text-black hover:border-2 hover:border-black self-end ">
                                Cerrar
                         </button>
                    </div>             
                               
                               
                  
                   
                </div>
        </div> 
           
   `;


