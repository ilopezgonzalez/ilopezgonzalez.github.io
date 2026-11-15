
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


// ==============================
// MOSTRAR UNA CAPTURA
// ==============================

function showSlide(index) {

    // Ocultar captura actual
    carouselImages[currentSlide].classList.remove('active');
    carouselDots[currentSlide].classList.remove('active');

    // Calcular siguiente posición
    currentSlide = (index + carouselImages.length) % carouselImages.length;

    // Mostrar nueva captura
    carouselImages[currentSlide].classList.add('active');
    carouselDots[currentSlide].classList.add('active');

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

    // Captura anterior
    prevButton.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });

    // Captura siguiente
    nextButton.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });

    // Selección mediante indicadores
    carouselDots.forEach((dot, index) => {

        dot.addEventListener('click', () => {
            showSlide(index);
        });

    });

}
