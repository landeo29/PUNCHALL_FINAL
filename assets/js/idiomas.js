// Configuración de Azure Translator
const translatorConfig = {
    endpoint: "https://api.cognitive.microsofttranslator.com/",
    region: "eastus",  // Tu región proporcionada
    key: "1IVg8v5quDCcmX0dHM8Jt1QobO704vGz7338U6qkPMQTivYYpv0JJQQJ99BBACYeBjFXJ3w3AAAbACOGNnVs"  // Usa la Clave 1
};

// Función para detectar el idioma del navegador
function getBrowserLanguage() {
    console.log("Detectando idioma del navegador...");
    return navigator.language || navigator.userLanguage;
}

// Función para traducir el contenido de la página
async function translatePage(targetLang) {
    try {
        console.log(`Intentando traducir al idioma: ${targetLang}`);

        const elements = document.querySelectorAll('[data-translate]');

        if (elements.length === 0) {
            console.warn('No se encontraron elementos para traducir.');
            return;
        }

        const textsToTranslate = Array.from(elements).map(el => ({ text: el.textContent }));

        console.log("Enviando textos a Azure Translator:", textsToTranslate);

        const response = await fetch(`${translatorConfig.endpoint}/translate?api-version=3.0&to=${targetLang}`, {
            method: 'POST',
            headers: {
                'Ocp-Apim-Subscription-Key': translatorConfig.key,
                'Ocp-Apim-Subscription-Region': translatorConfig.region,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(textsToTranslate)
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
        }

        const translations = await response.json();
        console.log("Respuesta de Azure Translator:", translations);

        elements.forEach((element, index) => {
            element.textContent = translations[index]?.translations[0]?.text || element.textContent;
        });

        console.log(`Traducción completada con éxito al idioma: ${targetLang}`);

    } catch (error) {
        console.error('Error en la traducción:', error);
    }
}

// Función para detectar el idioma del contenido
async function detectLanguage(text) {
    try {
        console.log("Detectando idioma del texto:", text);

        const response = await fetch(`${translatorConfig.endpoint}/detect?api-version=3.0`, {
            method: 'POST',
            headers: {
                'Ocp-Apim-Subscription-Key': translatorConfig.key,
                'Ocp-Apim-Subscription-Region': translatorConfig.region,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([{ text }])
        });

        if (!response.ok) {
            throw new Error(`Error en la detección del idioma: ${response.status} ${response.statusText}`);
        }

        const detection = await response.json();
        console.log("Idioma detectado:", detection);

        return detection[0]?.language || 'es';

    } catch (error) {
        console.error('Error en la detección del idioma:', error);
        return 'es';
    }
}

// Función de inicialización
async function initializeAzureTranslator() {
    console.log("Inicializando el traductor...");

    const browserLang = getBrowserLanguage().split('-')[0];
    console.log("Idioma del navegador detectado:", browserLang);

    const sampleTextElement = document.querySelector('[data-translate]');
    if (!sampleTextElement) {
        console.warn("No se encontró ningún elemento con 'data-translate'.");
        return;
    }

    const sampleText = sampleTextElement.textContent;
    console.log("Texto de muestra para detección:", sampleText);

    const contentLang = await detectLanguage(sampleText);
    console.log("Idioma detectado en el contenido:", contentLang);

    if (browserLang !== contentLang) {
        console.log(`Traduciendo de ${contentLang} a ${browserLang}...`);
        await translatePage(browserLang);
    } else {
        console.log("El idioma del navegador es el mismo que el del contenido, no se traduce.");
    }

    const languageSelector = document.getElementById('language-selector');
    if (languageSelector) {
        languageSelector.addEventListener('change', (e) => {
            console.log(`Usuario cambió a: ${e.target.value}`);
            translatePage(e.target.value);
        });
    }
}

// Ejecutar la inicialización cuando la página cargue
window.onload = initializeAzureTranslator;
