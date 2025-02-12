// Inicializar Google Translate correctamente
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'es',
        autoDisplay: false // Evita que aparezca el banner de Google
    }, 'google_translate_element');
}

// Esperar a que Google Translate cargue antes de cambiar idioma
function changeLanguage(lang) {
    if (lang === "") return;

    // Esperar a que Google Translate cargue completamente
    let interval = setInterval(() => {
        let frame = document.querySelector(".goog-te-menu-frame");
        if (frame) {
            clearInterval(interval); // Detener la espera

            let frameDocument = frame.contentDocument || frame.contentWindow.document;
            let langOptions = frameDocument.querySelectorAll(".goog-te-menu2-item span.text");

            for (let i = 0; i < langOptions.length; i++) {
                if (langOptions[i].innerText.toLowerCase().includes(lang)) {
                    langOptions[i].click();
                    break;
                }
            }
        }
    }, 500); // Revisa cada 500ms hasta que Google Translate esté listo
}
