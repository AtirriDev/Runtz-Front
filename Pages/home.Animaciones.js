
/*Animaciones y movimientos */



import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';

	
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
   // VIDEO FLYER
   const video = document.getElementById('videoFlyer');

    video.addEventListener('ended', () => {
        setTimeout(() => {
        video.currentTime = 0;
        video.play();
        }, 15000); // 25 SEGUNDOS HASTA QUE VUELVA A EMPEZAR

    });
});

