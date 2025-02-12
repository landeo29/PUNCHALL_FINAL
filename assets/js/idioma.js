// Función para traducir el contenido de la página con LibreTranslate
async function translatePage(lang) {
    let elements = document.querySelectorAll(".translate");

    for (let element of elements) {
        let text = element.innerText;
        let translatedText = await translateText(text, lang);
        element.innerText = translatedText;
    }
}

// Función para llamar a la API de LibreTranslate
async function translateText(text, targetLang) {
    let response = await fetch("https://libretranslate.de/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            q: text,
            source: "auto",
            target: targetLang,
            format: "text"
        })
    });

    let data = await response.json();
    return data.translatedText;
}
