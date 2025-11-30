import jsPDF from 'jspdf';

export const generateCV = () => {
    const doc = new jsPDF();

    // Set simple font (ATS compatible)
    doc.setFont('helvetica');

    let yPos = 20;
    const lineHeight = 7;
    const margin = 20;

    // Helper function to add text
    const addText = (text: string, size: number = 11, style: 'normal' | 'bold' = 'normal') => {
        doc.setFontSize(size);
        doc.setFont('helvetica', style);
        doc.text(text, margin, yPos);
        yPos += lineHeight;
    };

    const addLine = () => {
        doc.line(margin, yPos, 190, yPos);
        yPos += lineHeight;
    };

    // Header
    addText('ARMANDO OVALLE J.', 18, 'bold');
    addText('Diseñador y Desarrollador Full Stack', 12);
    yPos += 3;
    addText('Email: ovalle_938@hotmail.com', 10);
    addText('Ubicación: Colombia', 10);
    yPos += lineHeight;

    addLine();

    // Resumen Profesional
    addText('RESUMEN PROFESIONAL', 14, 'bold');
    yPos += 2;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const summary = 'Diseñador y desarrollador full stack con experiencia en crear experiencias digitales únicas y funcionales. Especializado en desarrollo web moderno, diseño UI/UX premium y soluciones personalizadas para negocios.';
    const summaryLines = doc.splitTextToSize(summary, 170);
    doc.text(summaryLines, margin, yPos);
    yPos += summaryLines.length * lineHeight;
    yPos += lineHeight;

    addLine();

    // Habilidades Técnicas
    addText('HABILIDADES TÉCNICAS', 14, 'bold');
    yPos += 3;

    const skills = [
        'Frontend: React, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS',
        'Backend: Node.js, Express, REST APIs',
        'Bases de Datos: Supabase, PostgreSQL, MongoDB',
        'CMS: WordPress, Desarrollo de temas y plugins personalizados',
        'Diseño: UI/UX, Adobe Creative Suite, Figma',
        'Control de Versiones: Git, GitHub',
        'Metodologías: Responsive Design, Mobile First, SEO',
        'Otras: Performance Optimization, Web Accessibility'
    ];

    doc.setFontSize(10);
    skills.forEach(skill => {
        doc.text('• ' + skill, margin, yPos);
        yPos += lineHeight;
    });
    yPos += lineHeight;

    addLine();

    // Servicios
    addText('SERVICIOS OFRECIDOS', 14, 'bold');
    yPos += 3;

    const services = [
        {
            title: 'Desarrollo Web Full Stack',
            description: 'Aplicaciones web modernas con React, Node.js y TypeScript'
        },
        {
            title: 'Diseño UI/UX Premium',
            description: 'Interfaces atractivas, responsive y centradas en el usuario'
        },
        {
            title: 'E-commerce y Sistemas Personalizados',
            description: 'Soluciones de comercio electrónico y sistemas a medida'
        },
        {
            title: 'Desarrollo WordPress',
            description: 'Temas y plugins personalizados, mantenimiento y optimización'
        },
        {
            title: 'Diseño Gráfico y Branding',
            description: 'Identidad visual, logotipos y material de marketing'
        },
        {
            title: 'Optimización SEO',
            description: 'Mejora de posicionamiento y rendimiento web'
        }
    ];

    services.forEach(service => {
        if (yPos > 250) {
            doc.addPage();
            yPos = 20;
        }

        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text('• ' + service.title, margin, yPos);
        yPos += lineHeight;

        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        const descLines = doc.splitTextToSize('  ' + service.description, 165);
        doc.text(descLines, margin, yPos);
        yPos += descLines.length * lineHeight + 2;
    });

    yPos += lineHeight;

    if (yPos > 250) {
        doc.addPage();
        yPos = 20;
    }

    addLine();

    // Experiencia
    addText('EXPERIENCIA PROFESIONAL', 14, 'bold');
    yPos += 3;

    // Alarona Studio
    addText('Alarona Studio - WEB MASTER SENIOR', 11, 'bold');
    addText('2022 - 2023', 10);
    yPos += 2;

    // Stats row
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('35 Proyectos  |  20 Clientes  |  99% Satisfacción', margin, yPos);
    yPos += lineHeight;

    const alaronaExp = [
        'Desarrollé y personalicé sitios web en WordPress',
        'Creación de temas únicos y atractivos',
        'Integración eficiente de plugins esenciales',
        'Optimización para una experiencia de usuario fluida',
        'Mejora continua de la funcionalidad web',
        'Diseño centrado en resultados del cliente',
        'Innovación en soluciones web personalizadas'
    ];

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    alaronaExp.forEach(item => {
        doc.text('• ' + item, margin, yPos);
        yPos += lineHeight;
    });
    yPos += 3;

    // Unidad Creativa
    if (yPos > 240) { doc.addPage(); yPos = 20; }

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Unidad Creativa - WEB MASTER SENIOR', margin, yPos);
    yPos += lineHeight;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('2021 - 2022', margin, yPos);
    yPos += lineHeight - 2;

    // Stats row
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('25 Proyectos  |  15 Clientes  |  98% Satisfacción', margin, yPos);
    yPos += lineHeight;

    const unidadExp = [
        'Lideré proyectos de diseño web y desarrollo para diversos clientes',
        'Implementé soluciones personalizadas utilizando WordPress y otras tecnologías web',
        'Optimicé sitios web para mejorar el rendimiento y la experiencia del usuario',
        'Colaboré con equipos multidisciplinarios para entregar proyectos de alta calidad'
    ];

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    unidadExp.forEach(item => {
        doc.text('• ' + item, margin, yPos);
        yPos += lineHeight;
    });

    yPos += lineHeight;
    addLine();

    // Especialización
    if (yPos > 240) { doc.addPage(); yPos = 20; }
    addText('ESPECIALIZACIÓN', 14, 'bold');
    yPos += 3;

    const specs = [
        'Desarrollo WordPress Avanzado',
        'Optimización de Rendimiento Web',
        'Gestión de Proyectos Digitales',
        'Diseño UI/UX Centrado en Usuario'
    ];

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    specs.forEach(item => {
        doc.text('• ' + item, margin, yPos);
        yPos += lineHeight;
    });

    yPos += lineHeight;
    addLine();

    // Logros Destacados
    if (yPos > 230) { doc.addPage(); yPos = 20; }
    addText('LOGROS DESTACADOS', 14, 'bold');
    yPos += 3;

    const achievements = [
        { stat: '40%', desc: 'Incremento en conversiones para clientes e-commerce' },
        { stat: '60%', desc: 'Reducción en tiempos de carga de sitios web' },
        { stat: '50+', desc: 'Proyectos WordPress implementados exitosamente' },
        { stat: '100%', desc: 'Satisfacción en soluciones personalizadas' }
    ];

    achievements.forEach(item => {
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text(item.stat, margin, yPos);

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(item.desc, margin + 20, yPos);
        yPos += lineHeight;
    });

    yPos += lineHeight;
    addLine();

    // Educación
    addText('EDUCACIÓN Y FORMACIÓN', 14, 'bold');
    yPos += 3;
    addText('Diseño y Desarrollo Web Full Stack', 11, 'bold');
    addText('Formación continua en tecnologías web modernas', 10);
    yPos += lineHeight;

    addLine();

    // Contacto
    addText('INFORMACIÓN DE CONTACTO', 14, 'bold');
    yPos += 3;
    addText('Para discutir proyectos o colaboraciones:', 10);
    addText('Email: ovalle_938@hotmail.com', 10, 'bold');

    // Save the PDF
    doc.save('Armando_Ovalle_CV.pdf');

    console.log('CV generated successfully');
};
