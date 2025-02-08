
document.addEventListener("DOMContentLoaded", () => {
    const serviceCards = document.querySelectorAll(".service-card");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    });

    serviceCards.forEach((card) => {
        observer.observe(card);
    });
});
document.addEventListener("DOMContentLoaded", () => {
    // Animación de las cabeceras
    const title = document.querySelector(".section-title .title-main");
    const subtitle = document.querySelector(".section-title .title-subtitle");

    // Agrega clases después de un retraso
    setTimeout(() => {
        title.style.opacity = "1";
        title.style.transform = "translateY(0)";
    }, 200);

    setTimeout(() => {
        subtitle.style.opacity = "1";
        subtitle.style.transform = "translateY(0)";
    }, 500);

    // Animación para las cartas
    const gridCards = document.querySelectorAll(".grid-card");
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("card-animate");
                }
            });
        },
        { threshold: 0.2 } // La animación se activa cuando el 20% del elemento es visible
    );

    gridCards.forEach((card) => observer.observe(card));
});


document.addEventListener('DOMContentLoaded', () => {
    const valores = document.querySelectorAll('.valor[data-interactivo]');

    valores.forEach((valor) => {
        // Animación 3D con el mouse
        valor.addEventListener('mousemove', (e) => {
            const rect = valor.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            valor.querySelector('.marco').style.transform = `
        rotateY(${x * 15}deg)
        rotateX(${y * -15}deg)
      `;
        });

        // Restablecer animación al salir del mouse
        valor.addEventListener('mouseleave', () => {
            valor.querySelector('.marco').style.transform = '';
        });
    });
});



