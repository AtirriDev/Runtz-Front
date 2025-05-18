
/*Animaciones y movimientos */



document.addEventListener('DOMContentLoaded', function () {
    const track = document.getElementById('logos-track');
    const container = document.getElementById('track-carousel-container');

    

    if (!track || !container) {
        console.error('Error: No se encontró el elemento track o el contenedor del carrusel.');
        return;
    }

    const originalItems = Array.from(track.children);
    if (originalItems.length === 0) {
        console.warn('No hay elementos en el carrusel para animar.');
        return;
    }

    // 1. Duplicar los elementos para crear un bucle infinito y suave
    originalItems.forEach(item => {
        const clone = item.cloneNode(true);
        track.appendChild(clone);
    });
    // Ahora el 'track' tiene: [A, B, C, A_clon, B_clon, C_clon]

    let scrollPosition = 0;
    const scrollSpeed = 0.6; // Velocidad en píxeles por frame. Ajusta este valor.
    let animationFrameId; // Para controlar el requestAnimationFrame

    // 2. Calcular el ancho total de la serie ORIGINAL de elementos (incluyendo márgenes)
    let originalSetWidth = 0;
    originalItems.forEach(item => {
        const style = window.getComputedStyle(item);
        const marginLeft = parseFloat(style.marginLeft) || 0;
        const marginRight = parseFloat(style.marginRight) || 0;
        originalSetWidth += item.offsetWidth + marginLeft + marginRight;
    });
    
    // 3. Función de animación
    function animateTrack() {
        scrollPosition -= scrollSpeed; // Mover hacia la izquierda
        track.style.transform = `translateX(${scrollPosition}px)`;

        // Si la primera serie de elementos originales ha salido completamente de la vista
        if (scrollPosition <= -originalSetWidth) {
            // Reposicionar para que el bucle continúe desde el inicio de la segunda serie 
            // (que es visualmente idéntica a la primera, gracias a los clones).
            // Sumar originalSetWidth a scrollPosition efectivamente lo "rebobina" por una longitud de la serie original,
            // manteniendo cualquier fracción de píxel para suavidad.
            scrollPosition += originalSetWidth; 
        }
        animationFrameId = requestAnimationFrame(animateTrack); // Solicitar el siguiente frame
    }

    // 4. Respetar la preferencia de movimiento reducido del usuario (accesibilidad)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    function startAnimation() {
        // Solo animar si el usuario no ha solicitado movimiento reducido
        if (!prefersReducedMotion.matches) {
            // Asegurarse de no duplicar animaciones
            cancelAnimationFrame(animationFrameId); 
            animationFrameId = requestAnimationFrame(animateTrack);
        }
    }

    function stopAnimation() {
        cancelAnimationFrame(animationFrameId);
    }

    // 5. Pausar la animación cuando el cursor está sobre el carrusel
    container.addEventListener('mouseenter', stopAnimation);
    container.addEventListener('mouseleave', startAnimation);
    
    // Iniciar la animación
    startAnimation();
    
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            mobileMenu.classList.add('hidden'); // Oculta el menú mobile
        }
    });
});

