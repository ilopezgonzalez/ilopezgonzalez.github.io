
/* ==============================
   MICARTASEGURA CAROUSEL
============================== */

// Obtener elementos
const carouselImages = document.querySelectorAll('.carousel-image');
const carouselDots = document.querySelectorAll('.carousel-dot');

const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');

// Estado del carrusel
let currentSlide = 0;
let isAnimating = false;

const animationDuration = 650;


// ==============================
// INICIALIZAR CARRUSEL
// ==============================

if (
    carouselImages.length > 0 &&
    carouselImages.length === carouselDots.length &&
    prevButton &&
    nextButton
) {

    // Limpiar estados iniciales
    carouselImages.forEach((image, index) => {

        image.classList.remove(
            'active',
            'enter-left',
            'enter-right',
            'exit-left',
            'exit-right'
        );

        // Eliminar estilos inline antiguos
        image.style.removeProperty('opacity');
        image.style.removeProperty('visibility');
        image.style.removeProperty('transform');
        image.style.removeProperty('transition');

        // Mostrar únicamente la primera captura
        if (index === 0) {
            image.classList.add('active');
        }

    });

    // Inicializar indicadores
    carouselDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === 0);
    });


    // ==============================
    // MOSTRAR UNA CAPTURA
    // ==============================

    function showSlide(index, direction) {

        if (isAnimating) return;

        const nextSlide =
            (index + carouselImages.length) % carouselImages.length;

        if (nextSlide === currentSlide) return;

        isAnimating = true;

        const previousImage = carouselImages[currentSlide];
        const nextImage = carouselImages[nextSlide];

        // Limpiar clases de la nueva imagen
        nextImage.classList.remove(
            'active',
            'enter-left',
            'enter-right',
            'exit-left',
            'exit-right'
        );

        // Limpiar posibles estilos inline
        nextImage.style.removeProperty('opacity');
        nextImage.style.removeProperty('visibility');
        nextImage.style.removeProperty('transform');
        nextImage.style.removeProperty('transition');

        // Preparar entrada según dirección
        nextImage.classList.add(
            direction === 'left' ? 'enter-right' : 'enter-left'
        );

        // Forzar actualización de estilos
        void nextImage.offsetWidth;

        // Iniciar entrada
        nextImage.classList.remove('enter-left', 'enter-right');
        nextImage.classList.add('active');

        // Iniciar salida de la imagen anterior
        previousImage.classList.remove('active');

        previousImage.classList.add(
            direction === 'left' ? 'exit-left' : 'exit-right'
        );

        // Actualizar indicadores
        carouselDots[currentSlide].classList.remove('active');
        carouselDots[nextSlide].classList.add('active');

        // Actualizar índice
        currentSlide = nextSlide;

        // Limpiar animación al finalizar
        setTimeout(() => {

            previousImage.classList.remove(
                'exit-left',
                'exit-right'
            );

            isAnimating = false;

        }, animationDuration);

    }


    // ==============================
    // FLECHA IZQUIERDA
    // ==============================

    prevButton.addEventListener('click', () => {

        showSlide(currentSlide - 1, 'left');

    });


    // ==============================
    // FLECHA DERECHA
    // ==============================

    nextButton.addEventListener('click', () => {

        showSlide(currentSlide + 1, 'right');

    });


    // ==============================
    // INDICADORES
    // ==============================

    carouselDots.forEach((dot, index) => {

        dot.addEventListener('click', () => {

            const direction = index > currentSlide
                ? 'right'
                : 'left';

            showSlide(index, direction);

        });

    });

}
