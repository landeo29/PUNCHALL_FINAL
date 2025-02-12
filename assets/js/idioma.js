// Inicializar Google Translate correctamente
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'es',
        includedLanguages: 'en,fr,de,pt,it', // Idiomas disponibles
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false // Evita que aparezca el banner de Google
    }, 'google_translate_element');
}

// Función para cambiar idioma sin errores
function changeLanguage(lang) {
    if (lang === "") return;

    let googleTranslateSelect = document.querySelector(".goog-te-combo");

    if (googleTranslateSelect) {
        googleTranslateSelect.value = lang;
        googleTranslateSelect.dispatchEvent(new Event("change"));
    } else {
        alert("Error: Google Translate no está cargado. Recarga la página y prueba de nuevo.");
    }
}
