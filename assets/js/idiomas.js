const subscriptionKey = '1IVg8v5quDCcmX0dHM8Jt1QobO704vGz7338U6qkPMQTivYYpv0JJQQJ99BBACYeBjFXJ3w3AAAbACOGNnVs';
const region = 'eastus'; // Región
const endpoint = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0';

async function translateText(text, targetLanguage) {
    const url = `${endpoint}&to=${targetLanguage}`;

    const headers = {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Region': region
    };

    const body = JSON.stringify([{ Text: text }]);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: body
        });

        const data = await response.json();
        return data[0].translations[0].text;
    } catch (error) {
        console.error('Error de traducción:', error);
        return null;
    }
}

async function translatePage(language) {
    const elementsToTranslate = document.querySelectorAll('[data-translate]');
    for (const element of elementsToTranslate) {
        const text = element.innerText || element.textContent;
        if (text) {
            const translatedText = await translateText(text, language);
            if (translatedText) {
                element.innerText = translatedText;
            }
        }
    }
}

document.getElementById('language-select').addEventListener('change', function() {
    const selectedLanguage = this.value;
    translatePage(selectedLanguage);
});
