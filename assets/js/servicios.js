document.addEventListener("DOMContentLoaded", function () {
    const featuresSection = document.querySelector(".features-container");

    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const sectionTop = featuresSection.getBoundingClientRect().top;

        if (sectionTop < windowHeight - 50) {
            featuresSection.classList.add("visible");
        }
    }

    window.addEventListener("scroll", revealOnScroll);

    // Ejecutar la función al cargar la página
    revealOnScroll();
});
document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.step');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    steps.forEach((step) => observer.observe(step));
});




