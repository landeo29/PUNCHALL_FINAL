// Inicializar Google Translate correctamente
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'es',
        includedLanguages: 'en,fr,de,pt,it', // Idiomas disponibles
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false // Evita que aparezca el banner de Google
    }, 'google_translate_element');

    waitForTranslate(); // Esperar a que Google Translate esté listo
}

// Esperar a que Google Translate cargue antes de cambiar idioma
function waitForTranslate() {
    let interval = setInterval(() => {
        let googleTranslateSelect = document.querySelector(".goog-te-combo");

        if (googleTranslateSelect) {
            clearInterval(interval); // Detener la espera

            // Agregar evento de cambio al selector
            document.getElementById("language-select").addEventListener("change", function () {
                let selectedLang = this.value;
                if (selectedLang) {
                    googleTranslateSelect.value = selectedLang;
                    googleTranslateSelect.dispatchEvent(new Event("change"));
                }
            });
        }
    }, 500); // Revisar cada 500ms hasta que Google Translate esté listo
}
