
/* ==============================
   MICARTASEGURA CAROUSEL
============================== */

// Obtener las imágenes del carrusel
const carouselImages = document.querySelectorAll('.carousel-image');

// Obtener los indicadores inferiores
const carouselDots = document.querySelectorAll('.carousel-dot');

// Obtener los botones de navegación
const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');

// Índice de la imagen actual
let currentSlide = 0;

// Evitar cambios durante la animación
let isAnimating = false;


// ==============================
// MOSTRAR UNA CAPTURA
// ==============================

function showSlide(index, direction) {

    if (isAnimating || carouselImages.length === 0) return;

    // Calcular nueva posición
    const nextSlide =
        (index + carouselImages.length) % carouselImages.length;

    // Evitar animación si se selecciona la misma imagen
    if (nextSlide === currentSlide) return;

    isAnimating = true;

    // Obtener imágenes
    const previousImage = carouselImages[currentSlide];
    const nextImage = carouselImages[nextSlide];

    // Actualizar indicadores
    carouselDots[currentSlide].classList.remove('active');
    carouselDots[nextSlide].classList.add('active');

    // Preparar nueva imagen
    nextImage.style.transition = 'none';

    nextImage.classList.remove(
        'active',
        'exit-left',
        'exit-right'
    );

    // Posicionar nueva imagen según dirección
    nextImage.style.transform = direction === 'left'
        ? 'translateX(35px) scale(1.06)'
        : 'translateX(-35px) scale(1.06)';

    nextImage.style.opacity = '0';
    nextImage.style.visibility = 'visible';

    // Forzar actualización de estilos
    void nextImage.offsetWidth;

    // Restaurar transición
    nextImage.style.transition = '';

    // Mostrar nueva imagen
    nextImage.classList.add('active');

    // Animar salida de imagen anterior
    previousImage.classList.remove('active');

    previousImage.classList.add(
        direction === 'left' ? 'exit-left' : 'exit-right'
    );

    // Actualizar índice
    currentSlide = nextSlide;

    // Finalizar animación
    setTimeout(() => {

        previousImage.classList.remove(
            'exit-left',
            'exit-right'
        );

        previousImage.style.visibility = '';
        previousImage.style.opacity = '';
        previousImage.style.transform = '';

        isAnimating = false;

    }, 650);

}


// ==============================
// BOTONES DE NAVEGACIÓN
// ==============================

if (
    carouselImages.length > 0 &&
    carouselImages.length === carouselDots.length &&
    prevButton &&
    nextButton
) {

    // Flecha izquierda
    prevButton.addEventListener('click', () => {

        showSlide(currentSlide - 1, 'right');

    });

    // Flecha derecha
    nextButton.addEventListener('click', () => {

        showSlide(currentSlide + 1, 'left');

    });


    // ==============================
    // INDICADORES INFERIORES
    // ==============================

    carouselDots.forEach((dot, index) => {

        dot.addEventListener('click', () => {

            const direction = index > currentSlide
                ? 'left'
                : 'right';

            showSlide(index, direction);

        });

    });

}
