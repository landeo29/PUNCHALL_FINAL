document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("PBH08utFp5vqfUAvv"); // Clave pública

    document.querySelector(".form").addEventListener("submit", function (event) {
        event.preventDefault();

        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let message = document.getElementById("message").value.trim();
        let submitButton = document.querySelector("button[type='submit']");

        // Validación básica
        if (!name || !email || !message) {
            Swal.fire({
                icon: "warning",
                title: "Campos vacíos",
                text: "Por favor, completa todos los campos antes de enviar.",
                confirmButtonColor: "#3085d6",
            });
            return;
        }

        let params = { from_name: name, email_id: email, mensaje: message };

        // Deshabilitar el botón de envío temporalmente
        submitButton.disabled = true;
        submitButton.textContent = "Enviando...";

        // Verificar en consola los datos antes de enviar
        console.log("Enviando datos:", params);

        emailjs.send("service_ias3bue", "template_tpnb3zl", params)
            .then(function (response) {
                console.log("Correo enviado correctamente:", response);

                Swal.fire({
                    icon: "success",
                    title: "¡Mensaje enviado!",
                    text: "Tu mensaje ha sido enviado correctamente.",
                    confirmButtonColor: "#28a745",
                });

                // Animación de éxito en el formulario
                document.querySelector(".form").reset();
                document.querySelector(".form").classList.add("sent-animation");

                // Restaurar el botón después de 2 segundos
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = "Enviar mensaje";
                    document.querySelector(".form").classList.remove("sent-animation");
                }, 2000);
            })
            .catch(function (error) {
                console.error("Error al enviar el correo:", error);

                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "No se pudo enviar el mensaje. Inténtalo nuevamente.",
                    confirmButtonColor: "#d33",
                });

                submitButton.disabled = false;
                submitButton.textContent = "Enviar mensaje";
            });
    });
});
