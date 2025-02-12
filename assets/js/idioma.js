// Inicializar Google Translate
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'es',
        autoDisplay: false // Evita que aparezca el banner superior de Google
    }, 'google_translate_element');
}

// Función para cambiar el idioma
function changeLanguage(lang) {
    if (lang === "") return;

    var googleTranslateFrame = document.querySelector(".goog-te-menu-frame");
    if (!googleTranslateFrame) {
        alert("Error: Recarga la página y vuelve a intentarlo.");
        return;
    }

    var select = googleTranslateFrame.contentDocument.querySelector(".goog-te-menu-value span[text='" + lang + "']");
    if (select) select.click();
}
