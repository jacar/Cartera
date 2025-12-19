import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { AspectRatio } from "../types";

// Helper to safely get the AI client instance
// This prevents top-level crashes if process is undefined or API Key is missing during module load
const getAiClient = () => {
  let apiKey = '';
  try {
    // robust check for process.env presence
    if (import.meta.env.VITE_GEMINI_API_KEY) {
      apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    }
  } catch (e) {
    // Ignore reference errors if process is not defined
  }

  // We allow instantiation even if empty to let the specific call fail gracefully with a clearer error
  return new GoogleGenAI({ apiKey });
};

// 1. Chatbot using gemini-3-pro-preview with Thinking Mode
export const sendChatMessage = async (history: { role: string; parts: { text: string }[] }[], newMessage: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        // thinkingConfig removed as it is not supported in this SDK version/model type

        systemInstruction: `Eres la inteligencia artificial comercial de Armando Ovalle J., un Director de Arte y Desarrollador Full Stack de alto nivel.
        
        TU OBJETIVO:
        Actuar como un CONSULTOR EXPERTO. No solo respondas dudas, debes indagar profundamente para entender la necesidad del cliente antes de cerrar la venta.

        FASES DE LA CONVERSACIÓN (Sigue este orden estricto):

        FASE 1: DIAGNÓSTICO (OBLIGATORIO)
        Si el usuario menciona un proyecto o intención de compra, NO pidas datos personales todavía. Primero haz preguntas clave (una a una o en pares) como:
        - "¿De qué trata el proyecto o negocio exactamente?"
        - "¿Cuentas actualmente con un sitio web activo? Si es así, ¿cuál es la URL?"
        - "¿En qué tecnología o lenguaje está desarrollado actualmente (WordPress, React, código puro, etc.)?"
        - "¿Qué estilo visual o referentes tienes en mente?"
        
        FASE 2: RECOPILACIÓN DE DATOS
        SOLO cuando el usuario haya respondido tus preguntas de diagnóstico y tengas claro el contexto técnico/visual, pídele que ingrese sus datos usando el formulario o escribiéndolos:
        "Entiendo perfectamente lo que necesitas. Para formalizar una propuesta a medida, por favor usa el botón 'Ingresar Datos Formales' o indícame aquí: Nombre, Contacto y Presupuesto."

        FASE 3: CIERRE Y PROMESA
        Una vez recibas los datos (el usuario enviará un mensaje con formato "Nombre: X, Contacto: Y..."), responde textualmente:
        "Perfecto. He registrado toda la información de tu proyecto. En este momento he preparado el reporte en tu plataforma de Gmail con copia a nuestra central webcincodev@gmail.com para que valides el envío. En un lapso máximo de dos días tendrás tu primera propuesta detallada."
        
        INMEDIATAMENTE DESPUÉS, ofrece el contacto directo:
        "Si deseas hablar directamente con Armando ahora mismo para agilizar, haz clic en el botón de WhatsApp (icono de teléfono) en la parte superior de este chat o agrega el número: +57 3052891719."

        TONO:
        Sofisticado, curioso, técnico pero accesible, "High-End", y siempre en Español.`,
      },
      history: history,
    });

    const response: GenerateContentResponse = await chat.sendMessage({ message: newMessage });
    return response.text || "Estoy procesando tu solicitud. Por favor espera un momento.";
  } catch (error) {
    console.error("Chat Error:", error);
    // Return a graceful error message instead of crashing the UI
    return "La conexión creativa es inestable. Por favor, inténtalo de nuevo más tarde.";
  }
};

// 2. Image Generation using gemini-3-pro-image-preview with Fallback to gemini-2.5-flash-image
export const generateCreativeImage = async (prompt: string, aspectRatio: AspectRatio): Promise<string> => {
  const ai = getAiClient();

  // The Gemini API strictly supports specific aspect ratios: "1:1", "3:4", "4:3", "9:16", and "16:9".
  // We map user-requested extended ratios (like cinematic 21:9 or classic photo 2:3) 
  // to the nearest supported API ratio to ensure generation success without errors.

  let mapRatio = aspectRatio;

  switch (aspectRatio) {
    case '2:3':
      mapRatio = '3:4'; // Fallback to closest vertical format
      break;
    case '3:2':
      mapRatio = '4:3'; // Fallback to closest horizontal format
      break;
    case '21:9':
      mapRatio = '16:9'; // Fallback to closest wide format
      break;
    default:
      // '1:1', '3:4', '4:3', '9:16', '16:9' are native supported
      mapRatio = aspectRatio;
      break;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: mapRatio as any,
          // imageSize is NOT supported in Flash models, so we omit it
        }
      } as any

    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No se pudo generar la imagen."); // Si no se encuentra inlineData
  } catch (error) {
    console.error("Image Gen Error:", error);
    throw new Error("El laboratorio creativo está desconectado. Intenta con un formato estándar como 1:1 o 16:9.");
  }
};

// 3. Fast Responses using gemini-2.5-flash-lite
export const getFastResponse = async (prompt: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-lite', // User requested specific model
      contents: { parts: [{ text: prompt }] },
      config: {
        // Low latency optimization
        temperature: 0.7,
        maxOutputTokens: 500, // Increased to allow for detailed project briefs
      }
    });
    return response.text || "No se encontró ningún pensamiento.";
  } catch (error) {
    console.error("Fast Response Error:", error);
    return "Pensando demasiado rápido... no se pudo generar el brief.";
  }
};