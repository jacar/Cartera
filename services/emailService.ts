interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    projectType: string;
    message: string;
}

export const sendContactEmail = async (formData: ContactFormData): Promise<void> => {
    // Using EmailJS for email functionality
    // Note: You'll need to set up EmailJS (free service) at https://www.emailjs.com/
    // 1. Create an account
    // 2. Add email service (Gmail, Outlook, etc.)
    // 3. Create email template
    // 4. Get your Public Key, Service ID, and Template ID

    const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

    if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
        console.error('EmailJS keys are missing in environment variables');
        throw new Error('Configuration Error: EmailJS keys are missing. Please check your .env file.');
    }

    try {
        // Load EmailJS SDK dynamically
        if (!(window as any).emailjs) {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
            script.async = true;
            document.head.appendChild(script);

            await new Promise((resolve) => {
                script.onload = resolve;
            });

            (window as any).emailjs.init(EMAILJS_PUBLIC_KEY);
        }

        const templateParams = {
            to_email: 'webcincodev@gmail.com',
            from_name: formData.name,
            from_email: formData.email,
            phone: formData.phone,
            project_type: formData.projectType,
            message: formData.message,
            reply_to: formData.email,
        };

        // Send email to you
        await (window as any).emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            templateParams
        );

        // Send auto-response to client
        const EMAILJS_AUTO_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_AUTO_TEMPLATE_ID;

        if (EMAILJS_AUTO_TEMPLATE_ID) {
            const autoResponseParams = {
                to_email: formData.email,
                to_name: formData.name,
                from_name: 'Armando Ovalle',
                message: `Hola ${formData.name},\n\n¡Gracias por contactarme! He recibido tu mensaje y pronto estaré en contacto contigo para discutir tu proyecto.\n\nSaludos,\nArmando Ovalle J.\nDiseñador Full Stack`
            };

            try {
                await (window as any).emailjs.send(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_AUTO_TEMPLATE_ID,
                    autoResponseParams
                );
                console.log('Auto-response sent successfully');
            } catch (autoError) {
                console.warn('Failed to send auto-response:', autoError);
                // Don't throw here, as the main email was already sent
            }
        } else {
            console.warn('Auto-response skipped: VITE_EMAILJS_AUTO_TEMPLATE_ID not set in .env');
        }

        console.log('Emails sent successfully');
    } catch (error) {
        console.error('Error sending email:', JSON.stringify(error, null, 2));
        if (error instanceof Error) {
            console.error('Error message:', error.message);
        }
        throw error;
    }
};

// Alternative: Using Formspree (simpler, no setup needed)
export const sendContactEmailFormspree = async (formData: ContactFormData): Promise<void> => {
    // Create a free account at https://formspree.io/
    // Get your form endpoint
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'; // Replace with your form ID

    try {
        const response = await fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                projectType: formData.projectType,
                message: formData.message,
                _replyto: formData.email,
                _subject: `Nuevo contacto de ${formData.name}`,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to send email via Formspree');
        }

        console.log('Email sent successfully via Formspree');
    } catch (error) {
        console.error('Error sending email via Formspree:', error);
        throw error;
    }
};

// Alternative: Using Web3Forms (very simple, free)
export const sendContactEmailWeb3Forms = async (formData: ContactFormData): Promise<void> => {
    // Get your access key from https://web3forms.com/
    const WEB3FORMS_ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY'; // Replace with your key

    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                access_key: WEB3FORMS_ACCESS_KEY,
                subject: `Nuevo contacto de ${formData.name}`,
                from_name: formData.name,
                email: formData.email,
                phone: formData.phone,
                project_type: formData.projectType,
                message: formData.message,
                to_email: 'webcincodev@gmail.com',
                // Auto-response
                autoresponse: {
                    enabled: true,
                    subject: 'Gracias por contactarme - Armando Ovalle',
                    message: `Hola ${formData.name},\n\n¡Gracias por contactarme! He recibido tu mensaje y pronto estaré en contacto contigo para discutir tu proyecto.\n\nSaludos,\nArmando Ovalle J.\nDiseñador Full Stack`
                }
            }),
        });

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.message || 'Failed to send email');
        }

        console.log('Email sent successfully via Web3Forms');
    } catch (error) {
        console.error('Error sending email via Web3Forms:', error);
        throw error;
    }
};
