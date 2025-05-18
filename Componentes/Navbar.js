
const urlBase = 'http://127.0.0.1:5500/';

const ElementosNav = [
  { tittle: 'Inicio', link: './home.html' },
  { tittle: 'Productos', link: './productos.html' },
  { tittle: 'Sobre Nosotros', link: './SobreNosostros.html' }
];

// navbarComponent.js

export const navbar = `
<header class="bg-white py-4">
  <div class="container mx-auto px-4 flex justify-between items-center">
    <a href="${urlBase}Pages/home.html">
      <img src="${urlBase}Recursos/LogoRuntz.png" alt="Logo" class="w-[100px] h-[50px]">
    </a>

    <!-- Menú desktop -->
    <nav class="hidden md:block">
      <ul class="flex space-x-6">
        ${ElementosNav.map(e => `
          <li>
            <a href="${e.link}" class="text-lg text-gray-700 hover:font-semibold hover:text-black">
              ${e.tittle}
            </a>
          </li>
        `).join('')}
       <li class="relative">  <!-- Añade "relative" para posicionar el contador -->
          <a href="./carrito.html" class="text-gray-700">
            <i id="carritoIcon" class="fas fa-shopping-cart text-black hover:text-gray-500"></i>
            
           <!-- Contador del carrito -->
            <span id="ContadorCarrito" class="absolute -top-1 -right-2 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center hidden">0</span>
          </a>
        </li>
      </ul>
    </nav>

    <!-- Botón mobile -->
    <button id="hamburger-btn" class="md:hidden text-gray-600 focus:outline-none">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </div>
</header>

<!-- Menú móvil -->
<div id="mobile-menu" class="hidden fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 z-50">
  <div class="bg-white w-64 h-full absolute right-0 p-6">
    <div class="flex justify-end">
      <button id="close-menu-btn" class="text-gray-600">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
             stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <nav class="mt-7 space-y-4">
      ${ElementosNav.map(e => `
        <a href="${e.link}" class="block text-lg text-gray-700 hover:font-semibold hover:text-black">
          ${e.tittle}
        </a>
      `).join('')}
      <a href="./carrito.html" class="relative text-gray-700 mt-5">
        <i id="carritoIconMobile" class="fas fa-shopping-cart text-black hover:text-gray-500"></i>
        <span id="ContadorMobile" class="absolute -top-1 -right-2 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center hidden">0</span>
      </a>
    </nav>
  </div>
</div>
`
