// services/openaiService.ts
import OpenAI from "openai";
import { AspectRatio } from "../types";

// Initialize OpenAI Client
// We use 'dangerouslyAllowBrowser: true' because this is a client-side only portfolio demo.
// In a real production app, you should proxy requests through a backend to hide the key.
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true
});

const SYSTEM_PROMPT = `
Eres el asistente virtual del portafolio de Armando Ovalle J.

OBJETIVO
- Responder preguntas frecuentes y calificar leads para servicios digitales.
- Hablas SIEMPRE en español claro (tono profesional y cercano).
- Mantén respuestas cortas (2–6 frases) y orientadas a acción.

SERVICIOS
- Diseño gráfico integral
- Diseño web
- Mantenimiento WordPress
- Contenido para redes sociales
- Consultoría
- Desarrollo web a medida

REGLAS
- No inventes precios fijos ni promesas de tiempos sin datos: pide alcance.
- Cuando pidan cotización, solicita: tipo de proyecto, objetivo, fecha, referencias, si ya tienen contenido/dominio/hosting.
- Siempre ofrece un siguiente paso y deja el contacto: ovalle_938@hotmail.com y WhatsApp +57 3052891719.
- Si el usuario se sale del tema, redirígelo amablemente a los servicios anteriores.
- Si hay información que no está confirmada, di “no tengo ese dato aquí” y pide contexto.

CIERRE SUGERIDO
“¿Te parece si me cuentas tu negocio y lo que necesitas para darte una recomendación y cotización?”
`;

// 1. Chat Function
export const sendChatMessage = async (history: { role: string; parts: { text: string }[] }[], newMessage: string): Promise<string> => {
    try {
        // Map Google-style history to OpenAI format
        const messages = history.map(msg => ({
            role: msg.role === 'model' ? 'assistant' : 'user',
            content: msg.parts[0].text
        }));

        // Add System Prompt at the beginning
        messages.unshift({ role: 'system', content: SYSTEM_PROMPT });

        // Add current user message
        messages.push({ role: 'user', content: newMessage });

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini", // Cost-effective and smart
            messages: messages as any,
            temperature: 0.7,
        });

        return completion.choices[0].message.content || "Lo siento, no pude procesar tu respuesta.";
    } catch (error) {
        console.error("OpenAI Chat Error:", error);
        return "La conexión con la IA está experimentando problemas. Por favor contáctame directamente al WhatsApp +57 3052891719.";
    }
};

// 2. Image Generation (Using DALL-E 3 or 2)
export const generateCreativeImage = async (prompt: string, aspectRatio: AspectRatio): Promise<string> => {
    try {
        // DALL-E 3 only supports square 1024x1024 standard or specific wide formats. 
        // We will request a standard square for simplicity or map ratios.
        // Note: DALL-E 3 is more expensive. DALL-E 2 is cheaper but lower quality.
        // We'll use DALL-E 2 for speed/cost in a demo, or 3 if budget allows. 
        // Defaulting to DALL-E 3 for quality as user requested "Creative".

        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: `Abstract, artistic, high-tech, digital art style: ${prompt}`,
            n: 1,
            size: "1024x1024",
            quality: "standard",
            response_format: "b64_json"
        });

        const b64 = response.data[0].b64_json;
        if (b64) return `data:image/png;base64,${b64}`;

        return response.data[0].url || "";
    } catch (error) {
        console.error("OpenAI Image Error:", error);
        throw new Error("No se pudo generar la imagen con DALL-E.");
    }
};

// 3. Fast Response (Brief Generator)
export const getFastResponse = async (prompt: string): Promise<string> => {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "Eres un Director Creativo Senior. Genera un 'Brief de Diseño' corto (Nombre, Concepto, Stack, Colores) basado en la idea del usuario. Usa Markdown." },
                { role: "user", content: prompt }
            ],
            max_tokens: 500
        });

        return completion.choices[0].message.content || "No se pudo generar el brief.";
    } catch (error) {
        console.error("OpenAI Brief Error:", error);
        return "Error generando el concepto creativo.";
    }
};
