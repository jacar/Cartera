import { AspectRatio } from "../types";

// --- SIMULATED CHAT LOGIC ---

type ChatRole = 'user' | 'model';
interface HistoryItem {
    role: string;
    parts: { text: string }[];
}

const RESPONSES = {
    GREETING: [
        "¡Hola! Soy el asistente virtual del portafolio. ¿Te interesa desarrollar una web personalizada, diseño gráfico o consultoría?",
        "Bienvenido. Estoy aquí para ayudarte a transformar tu idea en un proyecto digital. ¿Qué tienes en mente hoy?",
        "Hola. Puedo ayudarte con Desarrollo Web, Diseño Gráfico o Mantenimiento. ¿Por dónde te gustaría empezar?"
    ],
    // --- SERVICIOS ESPECÍFICOS ---
    DISEÑO_GRAFICO: [
        "El diseño gráfico integral es clave. Puedo ayudarte con Branding, logos y piezas para redes. ¿Tienes ya una identidad visual definida o empezamos de cero?",
        "Perfecto. El diseño comunica el valor de tu marca. ¿Qué tipo de piezas necesitas específicamente (Logo, Manual de marca, Redes)?"
    ],
    DESARROLLO_WEB: [
        "El desarrollo a medida es mi fuerte. Sitios rápidos, seguros y escalables. ¿Qué objetivo tiene tu web: vender, informar o captar leads?",
        "Excelente. Un sitio web moderno debe ser responsive y rápido. ¿Tienes ya el contenido (textos/imágenes) y el hosting, o necesitas asesoría integral?"
    ],
    MANTENIMIENTO: [
        "El mantenimiento WordPress es vital para la seguridad. Ofrezco planes de actualización y backups. ¿Tu sitio actual tiene algún problema específico ahora mismo?",
        "Puedo encargarme de mantener tu WordPress actualizado y seguro. ¿Cada cuánto realizas copias de seguridad actualmente?"
    ],
    CONSULTORIA: [
        "La consultoría te ahorra tiempo y dinero antes de invertir. Analicemos tu estrategia digital. ¿Cuál es el mayor desafío técnico que tienes ahora?",
        "Con gusto puedo asesorarte. ¿Necesitas orientación sobre qué tecnología usar o sobre cómo mejorar tu presencia online actual?"
    ],
    CONTENIDO: [
        "El contenido es el rey. Puedo ayudarte a estructurar mensajes claros para tus redes. ¿A qué público objetivo te diriges principalmente?",
        "Crear contenido estratégico aumenta la conversión. ¿En qué redes sociales tienes presencia activa actualmente?"
    ],
    // --- REGLAS DE NEGOCIO ---
    PRECIO_SIN_DATOS: [
        "Para darte un presupuesto honesto, necesito conocer el alcance. No es lo mismo una landing page que un e-commerce. ¿Podrías describirme brevemente el proyecto?",
        "Cada proyecto es único y mis precios se ajustan al trabajo real. ¿Tienes referentes visuales de lo que buscas para dimensionar el esfuerzo?",
        "No manejo precios fijos sin analizar el requerimiento. Cuéntame: ¿Qué funcionalidades son indispensables para ti?"
    ],
    FALTA_INFO: [
        "No tengo ese dato exacto aquí, pero puedo averiguarlo si me das más contexto. ¿Es un factor crítico para iniciar el proyecto?",
        "Esa información depende de varios factores técnicos. ¿Podrías darme más detalles sobre cómo planeas usarlo?"
    ],
    OFF_TOPIC: [
        "Disculpa, mi función es asistirte con servicios de Diseño y Desarrollo Web. ¿Te puedo ayudar con tu sitio web o identidad de marca?",
        "Prefiero que nos enfoquemos en tu proyecto digital para aprovechar el tiempo. ¿Tienes alguna duda sobre mis servicios de programación o diseño?"
    ],
    CIERRE: [
        "¿Te parece si me cuentas tu negocio y lo que necesitas para darte una recomendación y cotización?",
        "Si te parece bien, ¿por qué no me cuentas un poco más de tu negocio para orientarte mejor?"
    ],
    CONTACTO: [
        "Perfecto. Para avanzar, contáctame directamente: ovalle_938@hotmail.com o WhatsApp +57 3052891719.",
        "Genial. Sigamos la conversación por canales directos: WhatsApp +57 3052891719 o correo ovalle_938@hotmail.com."
    ]
};

const KEYWORDS = {
    SERV_GRAPHIC: ['diseño', 'grafico', 'logo', 'brand', 'marca', 'identidad', 'imagen'],
    SERV_WEB: ['web', 'sitio', 'pagina', 'desarrollo', 'programacion', 'landing', 'app'],
    SERV_MAINTENANCE: ['mantenimiento', 'wp', 'wordpress', 'actualizar', 'plugin', 'lento', 'seguridad', 'virus'],
    SERV_CONSULT: ['consultoria', 'asesoria', 'duda', 'pregunta', 'consejo', 'orientacion'],
    SERV_CONTENT: ['contenido', 'redes', 'social', 'instagram', 'facebook', 'copy', 'textos'],

    INTENT_COST: ['precio', 'costo', 'cuanto', 'vale', 'presupuesto', 'cotiz', 'valor', 'cuesta'],
    INTENT_INFO: ['info', 'detalles', 'mas'],

    DATA_CONFIRMED: ['negocio', 'empresa', 'vendo', 'servicio', 'producto', 'mi proyecto'], // Loose match for user describing business

    OFF_TOPIC_FLAGS: ['receta', 'clima', 'noticias', 'politica', 'futbol', 'amor', 'chiste']
};

export const sendChatMessage = async (history: HistoryItem[], newMessage: string): Promise<string> => {
    // Simulate network delay for realism
    await new Promise(resolve => setTimeout(resolve, 600));

    const lowerMsg = newMessage.toLowerCase();

    // 1. OFF-TOPIC REDIRECTION (Rule: Redirect if off topic)
    if (KEYWORDS.OFF_TOPIC_FLAGS.some(k => lowerMsg.includes(k))) {
        return RESPONSES.OFF_TOPIC[Math.floor(Math.random() * RESPONSES.OFF_TOPIC.length)];
    }

    // 2. PRICING RULES (Rule: No fixed prices without data)
    // If asking for cost BUT hasn't provided details (simple check: length of msg or specific keywords)
    if (KEYWORDS.INTENT_COST.some(k => lowerMsg.includes(k))) {
        // If message is short, assume no context provided
        if (newMessage.split(' ').length < 10) {
            return RESPONSES.PRECIO_SIN_DATOS[Math.floor(Math.random() * RESPONSES.PRECIO_SIN_DATOS.length)];
        }
    }

    // 3. SERVICE MATCHING
    if (KEYWORDS.SERV_MAINTENANCE.some(k => lowerMsg.includes(k))) return RESPONSES.MANTENIMIENTO[Math.floor(Math.random() * RESPONSES.MANTENIMIENTO.length)] + "\n\n" + RESPONSES.CIERRE[0];
    if (KEYWORDS.SERV_GRAPHIC.some(k => lowerMsg.includes(k))) return RESPONSES.DISEÑO_GRAFICO[Math.floor(Math.random() * RESPONSES.DISEÑO_GRAFICO.length)];
    if (KEYWORDS.SERV_WEB.some(k => lowerMsg.includes(k))) return RESPONSES.DESARROLLO_WEB[Math.floor(Math.random() * RESPONSES.DESARROLLO_WEB.length)] + "\n\n" + RESPONSES.CIERRE[0];
    if (KEYWORDS.SERV_CONSULT.some(k => lowerMsg.includes(k))) return RESPONSES.CONSULTORIA[Math.floor(Math.random() * RESPONSES.CONSULTORIA.length)];
    if (KEYWORDS.SERV_CONTENT.some(k => lowerMsg.includes(k))) return RESPONSES.CONTENIDO[Math.floor(Math.random() * RESPONSES.CONTENIDO.length)];

    // 4. CLOSING / CONTACT (If user mentions business details or agrees to tell more)
    if (lowerMsg.includes('si') || lowerMsg.includes('claro') || lowerMsg.includes('bueno') || KEYWORDS.DATA_CONFIRMED.some(k => lowerMsg.includes(k))) {
        // If they seem to be responding to "tell me about your business" OR giving contact info
        if (lowerMsg.includes('@') || /\d{7}/.test(lowerMsg)) {
            return "Gracias por los datos. " + RESPONSES.CONTACTO[0];
        }
        // Prompt for contact if they just said "Yes"
        return "Excelente. Para formalizar, envíame tu idea a " + RESPONSES.CONTACTO[1];
    }

    // 5. GREETING
    if (lowerMsg.includes('hola') || lowerMsg.includes('buenas') || lowerMsg.includes('inicio')) {
        return RESPONSES.GREETING[Math.floor(Math.random() * RESPONSES.GREETING.length)];
    }

    // 6. DEFAULT FALLBACK
    return "No tengo ese dato aquí, pero cuéntame tu contexto. " + RESPONSES.CIERRE[Math.floor(Math.random() * RESPONSES.CIERRE.length)];
};


// --- SIMULATED IMAGE GENERATION ---
const MOCK_IMAGES = [
    "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop"
];
export const generateCreativeImage = async (prompt: string, aspectRatio: AspectRatio): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return MOCK_IMAGES[Math.floor(Math.random() * MOCK_IMAGES.length)];
};

// --- SIMULATED FAST RESPONSE (BRIEF GENERATOR) ---
const MOCK_BRIEFS = [
    { name: "Zenith Core", concept: "Minimalismo extremo.", stack: "Next.js", colors: "B/W" },
    { name: "Neon Flux", concept: "Estilo Cyberpunk.", stack: "React + WebGL", colors: "Neon" }
];
export const getFastResponse = async (prompt: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const fake = MOCK_BRIEFS[Math.floor(Math.random() * MOCK_BRIEFS.length)];
    return `**Proyecto**: ${fake.name}\n**Concepto**: ${fake.concept}\n**Stack**: ${fake.stack}`;
};
