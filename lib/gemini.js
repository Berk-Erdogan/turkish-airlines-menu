import { GoogleGenerativeAI } from "@google/generative-ai";

// Gemini API key
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

// Start Gemini AI model
const genAI = new GoogleGenerativeAI(apiKey);

/**
 * Extract menu information from image
 * @param {File} imageFile - Uploaded image file to extract menu
 * @returns {Promise<Object>} - Extracted menu items
 */
export async function extractMenuFromImage(imageFile) {
  try {
    // Use Gemini 1.5 Flash model (because of Vision feature)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Convert image to base64
    const imageBase64 = await fileToBase64(imageFile);
    
    // Prompt for menu extraction, Prompt for menu extraction in Turkish because of OCR feature of Gemini 1.5 Flash model
    const prompt = `
    Bu bir THY uçak menüsüdür. Lütfen menüdeki tüm yemek ögelerini aşağıdaki formatta çıkar:
    [
      {
        "category": "Ana Yemek/Tatlı/İçecek vb.",
        "name": "Yemek adı",
        "description": "Yemek açıklaması",
        "ingredients": ["malzeme1", "malzeme2", ...],
        "dietary": ["vegetarian", "gluten-free", "halal", ...]
      },
      ...
    ]
    Sadece JSON çıktısını ver, başka açıklama ekleme.
    `;
    
    // Send prompt and image data to model
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: imageBase64,
          mimeType: "image/jpeg"
        }
      }
    ]);
    
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON output
    try {
      const startIndex = text.indexOf('[');
      const endIndex = text.lastIndexOf(']') + 1;
      const jsonText = text.substring(startIndex, endIndex);
      return JSON.parse(jsonText);
    } catch (jsonError) {
      console.error("JSON Extraction error:", jsonError);
      throw new Error("Menu datas couldnt extracted carefully");
    }
  } catch (error) {
    console.error("Menu Extraction Error:", error);
    throw error;
  }
}

/**
 * Answer menu questions
 * @param {Array} menuItems - Menu items extracted from image
 * @param {string} question - User question about menu
 * @param {string} language - Language 
 * @returns {Promise<string>} - Output answer for user question from Gemini
 */
export async function answerMenuQuestion(menuItems, question, language = "en") {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const menuText = JSON.stringify(menuItems, null, 2);
    
    const prompt = `
    This is a THY airplane menu. Please answer the following question based on the menu:
    ${menuText}
    
    User ask: "${question}"
    
    Give answers depends to menu extraction.If question is not about menu or the answer isnt avaible in menu,
    say you dont know. Answer in "${language}" language.
    Keep the answer short and concise.
    
    `;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Soru yanıtlama hatası:", error);
    throw error;
  }
}

/**
 * Support function to convert file to base64
 * @param {File} file - Will be converted to base64
 * @returns {Promise<string>} - Base64 encoded file
 */

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let encoded = reader.result.toString();
      // Extract base64 content (remove data:image/jpeg;base64, part)
      encoded = encoded.split(',')[1];
      resolve(encoded);
    };
    reader.onerror = error => reject(error);
  });
}

/**
 * Detect Language Function
 * @param {string} text - Text
 * @returns {Promise<string>} - Detected language code (ISO 639-1)
 */

export async function detectLanguage(text) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `
    Bu metni analiz et: "${text}"
    Bu metnin dil kodunu ISO 639-1 formatında döndür (örneğin: en, tr, fr, de, es, ru).
    Sadece dil kodunu ver, açıklama ekleme.
    `;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error("Language Detection Error:", error);
    return "en"; // English as default language
  }
}