// Inicializar Google Translate correctamente
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'es',
        includedLanguages: 'en,fr,de,pt,it',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');

    // Esperar a que Google Translate cargue
    waitForGoogleTranslate();
}

// Esperar a que Google Translate esté listo antes de cambiar idioma
function waitForGoogleTranslate() {
    let interval = setInterval(() => {
        let googleTranslateSelect = document.querySelector(".goog-te-combo");

        if (googleTranslateSelect) {
            clearInterval(interval); // Detener la espera
            console.log("Google Translate cargado correctamente.");

            // Conectar el selector de nuestra burbuja con el de Google Translate
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
