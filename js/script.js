
/* ==============================
   MICARTASEGURA CAROUSEL
============================== */

const carouselImages = document.querySelectorAll('.carousel-image');
const carouselDots = document.querySelectorAll('.carousel-dot');

const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');

let currentSlide = 0;
let isAnimating = false;

const animationDuration = 600;


/* ==============================
   MOSTRAR CAPTURA
============================== */

function showSlide(index, direction) {

    if (
        isAnimating ||
        carouselImages.length === 0 ||
        carouselImages.length !== carouselDots.length
    ) {
        return;
    }

    if (index === currentSlide) return;

    isAnimating = true;

    const currentImage = carouselImages[currentSlide];

    // Cálculo circular
    const nextIndex =
        (index + carouselImages.length) % carouselImages.length;

    const nextImage = carouselImages[nextIndex];

    // Limpiar clases de la captura entrante
    nextImage.classList.remove('active', 'exit-left', 'exit-right');

    // Preparar la nueva captura fuera de pantalla
    nextImage.style.transition = 'none';
    nextImage.style.transform =
        direction === 'next'
            ? 'translateX(100%)'
            : 'translateX(-100%)';

    nextImage.style.opacity = '0';
    nextImage.style.visibility = 'visible';
    nextImage.style.zIndex = '3';

    // Forzar actualización del navegador
    nextImage.offsetHeight;

    // Activar transición
    nextImage.style.transition = '';

    // Desplazar captura actual
    currentImage.style.zIndex = '2';
    currentImage.style.transform =
        direction === 'next'
            ? 'translateX(-100%)'
            : 'translateX(100%)';

    currentImage.style.opacity = '0';

    // Mostrar nueva captura
    nextImage.classList.add('active');
    nextImage.style.transform = 'translateX(0)';
    nextImage.style.opacity = '1';

    // Actualizar indicadores
    carouselDots[currentSlide].classList.remove('active');
    carouselDots[nextIndex].classList.add('active');

    currentSlide = nextIndex;

    // Finalizar animación
    setTimeout(() => {

        currentImage.classList.remove('active');
        currentImage.style.transition = '';
        currentImage.style.transform = '';
        currentImage.style.opacity = '';
        currentImage.style.visibility = '';
        currentImage.style.zIndex = '';

        nextImage.style.transform = '';
        nextImage.style.opacity = '';
        nextImage.style.visibility = '';
        nextImage.style.zIndex = '';

        isAnimating = false;

    }, animationDuration);
}


/* ==============================
   NAVEGACIÓN
============================== */

if (
    carouselImages.length > 0 &&
    carouselImages.length === carouselDots.length &&
    prevButton &&
    nextButton
) {

    // Captura anterior
    prevButton.addEventListener('click', () => {

        showSlide(currentSlide - 1, 'prev');

    });

    // Captura siguiente
    nextButton.addEventListener('click', () => {

        showSlide(currentSlide + 1, 'next');

    });

    // Indicadores
    carouselDots.forEach((dot, index) => {

        dot.addEventListener('click', () => {

            const direction =
                index > currentSlide ? 'next' : 'prev';

            showSlide(index, direction);

        });

    });

}
