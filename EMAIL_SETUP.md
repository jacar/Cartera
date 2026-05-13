# Configuración del Servicio de Email

Para que el formulario de contacto funcione correctamente, necesitas configurar uno de los siguientes servicios de email. Todos tienen planes gratuitos:

## Opción 1: Web3Forms (Recomendado - Más Fácil)

// Y reemplaza:
const WEB3FORMS_ACCESS_KEY = 'TU_ACCESS_KEY_AQUI';
```

5. ¡Listo! El formulario ya está funcionando con auto-respuesta incluida.

---

## Opción 2: Formspree (Simple)

### Pasos:

1. Ve a [https://formspree.io/](https://formspree.io/)
2. Crea una cuenta gratuita
3. Crea un nuevo formulario
4. Copia el Form Endpoint (será algo como: `https://formspree.io/f/xzzbwkkq`)
5. Actualiza el archivo `services/emailService.ts`:

```typescript
// Cambia la función exportada:
export const sendContactEmail = sendContactEmailFormspree;

// Y reemplaza:
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/TU_FORM_ID';
```

**Nota:** Con Formspree gratuito no incluye auto-respuesta automática. Necesitas el plan de pago para eso.

---

## Opción 3: EmailJS (Más Control)

EmailJS te permite más personalización de los emails.

### Pasos:

1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Crea una cuenta gratuita
3. **Conecta tu servicio de email:**
   - En el dashboard, ve a "Email Services"
   - Haz clic en "Add New Service"
   - Selecciona tu proveedor (Gmail, Outlook, etc.)
   - Sigue las instrucciones para conectarlo

4. **Crea plantillas de email:**
   
   **Template 1 - Para ti (recibir contactos):**
   - Ve a "Email Templates"
   - Crea un nuevo template
   - Nombre: "Contact Form"
   - Contenido sugerido:
   
   ```
   Asunto: Nuevo contacto de {{from_name}}
   
   Has recibido un nuevo mensaje de contacto:
   
   Nombre: {{from_name}}
   Email: {{from_email}}
   Teléfono: {{phone}}
   Tipo de Proyecto: {{project_type}}
   
   Mensaje:
   {{message}}
   ```
   
   **Template 2 - Auto-respuesta para el cliente:**
   - Crea otro template
   - Nombre: "Auto Response"
   - Template ID: `template_autoresponse`
   - Contenido:
   
   ```
   Asunto: Gracias por contactarme - Armando Ovalle
   
   Hola {{to_name}},
   
   ¡Gracias por contactarme! He recibido tu mensaje y pronto estaré en contacto contigo para discutir tu proyecto.
   
   Saludos,
   Armando Ovalle J.
   Diseñador Full Stack
   ```

5. **Obtén tus credenciales:**
   - Public Key: En "Account" → "General"
   - Service ID: En "Email Services" (el ID de tu servicio conectado)
   - Template IDs: En "Email Templates" (ID de cada template)

6. **Actualiza el código:**

```typescript
// En emailService.ts:
const EMAILJS_PUBLIC_KEY = 'TU_PUBLIC_KEY';
const EMAILJS_SERVICE_ID = 'TU_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'TU_TEMPLATE_ID'; // El template para recibir contactos

// Asegúrate de que la función por defecto sea EmailJS:
export const sendContactEmail = sendContactEmail; // La primera función
```

---

## Selección por Defecto

Actualmente, el código está configurado para usar **EmailJS** por defecto. Si quieres cambiar a otro servicio, simplemente modifica la exportación en `services/emailService.ts`:

```typescript
// Para Web3Forms:
export const sendContactEmail = sendContactEmailWeb3Forms;

// Para Formspree:
export const sendContactEmail = sendContactEmailFormspree;

// Para EmailJS (por defecto):
export const sendContactEmail = sendContactEmail;
```

---

## Recomendación

**Para desarrollo rápido:** Usa **Web3Forms** - es el más fácil de configurar y tiene todo lo que necesitas incluido auto-respuesta.

**Para máximo control:** Usa **EmailJS** - te permite personalizar completamente los correos y tener múltiples plantillas.

---

## Probar el Formulario

1. Inicia el servidor de desarrollo: `npm run dev`
2. Navega a la sección de contacto
3. Llena el formulario y envía
4. Verifica que llegue el email a ovalle_938@hotmail.com
5. El remitente debe recibir la auto-respuesta de agradecimiento

---

## Solución de Problemas

- **No llegan emails:** Verifica que hayas configurado correctamente las credenciales
- **Error CORS:** Asegúrate de estar usando el dominio correcto en la configuración del servicio
- **Auto-respuesta no funciona:** Verifica que hayas creado el segundo template en EmailJS o que estés usando Web3Forms
