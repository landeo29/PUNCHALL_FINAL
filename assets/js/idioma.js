// Inicializar Google Translate correctamente
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'es',
        autoDisplay: false // Evita que aparezca el banner de Google
    }, 'google_translate_element');
}

// Función para cambiar idioma sin errores
function changeLanguage(lang) {
    if (lang === "") return;

    var frame = document.querySelector(".goog-te-menu-frame");
    if (!frame) {
        alert("Error: Google Translate no está cargado. Recarga la página y prueba de nuevo.");
        return;
    }

    var frameDocument = frame.contentDocument || frame.contentWindow.document;
    var langOptions = frameDocument.querySelectorAll(".goog-te-menu2-item span.text");

    for (var i = 0; i < langOptions.length; i++) {
        if (langOptions[i].innerText.toLowerCase().includes(lang)) {
            langOptions[i].click();
            break;
        }
    }
}
