const API_KEY = "tu_clave_aqui";  // Usa la clave de tu cuenta
const REGION = "eastus";  // Región correcta
const ENDPOINT = `https://${REGION}.api.cognitive.microsofttranslator.com/translate?api-version=3.0`;


async function translatePage(lang) {
    let elements = document.querySelectorAll(".translate");

    for (let element of elements) {
        let text = element.innerText;
        let translatedText = await translateText(text, lang);
        element.innerText = translatedText;
    }
}

async function translateText(text, targetLang) {
    let url = `${ENDPOINT}&to=${targetLang}`;

    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Ocp-Apim-Subscription-Key": API_KEY,
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Region": "global"
        },
        body: JSON.stringify([{ text: text }])
    });

    let data = await response.json();
    return data[0].translations[0].text;
}
