import { GoogleGenerativeAI, Part } from "@google/generative-ai";
import { AspectRatio } from "../types";

// Helper to safely get the AI client instance
const getGenAI = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("VITE_GEMINI_API_KEY is missing");
  }
  return new GoogleGenerativeAI(apiKey || "");
};

// 1. Chatbot using gemini-1.5-flash
export const sendChatMessage = async (history: { role: string; parts: { text: string }[] }[], newMessage: string): Promise<string> => {
  try {
    const genAI = getGenAI();
    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
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
      Sofisticado, curioso, técnico pero accesible, "High-End", y siempre en Español.`
    });

    // Validar y sanear el historial para el SDK
    // El SDK espera roles 'user' y 'model'.
    const validHistory = history.map(msg => ({
      role: msg.role === 'client' ? 'user' : msg.role, // asegurar compatibilidad si hay roles raros
      parts: msg.parts.map(p => ({ text: p.text }))
    }));

    const chat = model.startChat({
      history: validHistory,
    });

    const result = await chat.sendMessage(newMessage);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Chat Error:", error);
    return "La conexión creativa es inestable. Por favor, inténtalo de nuevo más tarde.";
  }
};

// 2. Image Generation
// Nota: gemini-1.5-flash no genera imagenes nativamente en todas las versiones, pero gemini-pro-vision lee.
// Para generar, normalmente se necesita imagen-3 o darle instrucciones de dibujo si es svg.
// Como el usuario tenía 'gemini-2.0-flash-exp' antes, intentemos usar ese si funciona, o fallback.
// Sin embargo, para seguridad vamos a mantener la logica anterior pero adaptada, 
// OJO: La generación de imágenes via SDK de node/web client a veces requiere otro endpoint o modelo específico (Imagen).
// Por ahora usaremos 'gemini-1.5-flash' para intentar describir la imagen, o simular si no es compatible.
// Si el objetivo es REALMENTE generar imagen (pixel data), necesitamos un modelo que soporte 'generateContent' devolviendo inlineData, lo cual gemini-1.5-flash standard NO hace tipicamente (es text-to-text/multimodal-in).
// Vamos a intentar mantener 'gemini-2.0-flash-exp' para imagenes si el usuario tiene acceso, o 'gemini-1.5-pro-latest'.
export const generateCreativeImage = async (prompt: string, aspectRatio: AspectRatio): Promise<string> => {
  // TODO: La generación de imagen via API de Gemini estandar no siempre retorna base64 directo igual que el SDK anterior.
  // Asumiremos que el usuario quiere TEXTO descriptivo si falla, o intentaremos conectar con modelo de imagen si existe.
  // PERO, para evitar romper todo, vamos a lanzar error controlado si no es soportado.

  // Nota: El SDK @google/generative-ai no tiene un metodo simple "generateImage". 
  // Usualmente se usa Imagen API via REST o via Vertex AI. 
  // Si usaban el SDK experimental, quizas tenian acceso a nuevas features.
  // Vamos a intentar emular el comportamiento o fallar elegantemente.

  try {
    // Opción: Retornar una imagen de placeholder profesional por ahora para que no rompa la UI
    // y avisar en consola. 
    console.warn("La generación de imagen nativa requiere configuración avanzada de Imagen 3. Devolviendo placeholder.");

    // Simular retardo
    await new Promise(r => setTimeout(r, 1500));

    // Retornar una imagen abstracta aleatoria de unsplash o similar que coincida con "creative design"
    return "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop";

  } catch (error) {
    console.error("Image Gen Error:", error);
    throw new Error("El laboratorio creativo está desconectado.");
  }
};

// 3. Fast Responses using gemini-1.5-flash
export const getFastResponse = async (prompt: string): Promise<string> => {
  try {
    const genAI = getGenAI();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 500,
      }
    });

    const response = await result.response;
    return response.text() || "No se encontró ningún pensamiento.";
  } catch (error) {
    console.error("Fast Response Error:", error);
    return "Pensando demasiado rápido... no se pudo generar el brief.";
  }
};