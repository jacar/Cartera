import React, { useState, useRef, useEffect } from 'react';
import { Send, Calendar, Download, Mail, CheckCircle, Loader } from 'lucide-react';
import { sendContactEmail } from '../services/emailService';
import { generateCV } from '../services/cvGenerator';

const SectionContact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const scrollContainerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            const { scrollTop, scrollHeight, clientHeight } = container;
            const tolerance = 1;
            const isAtTop = scrollTop <= tolerance;
            const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) <= tolerance;

            const tryingToScrollDown = e.deltaY > 0;
            const tryingToScrollUp = e.deltaY < 0;

            const canScrollDown = tryingToScrollDown && !isAtBottom;
            const canScrollUp = tryingToScrollUp && !isAtTop;

            if (canScrollDown || canScrollUp) {
                e.stopPropagation();
                e.preventDefault();
                container.scrollTop += e.deltaY;
            }
        };

        container.addEventListener('wheel', handleWheel, { passive: false });
        return () => container.removeEventListener('wheel', handleWheel);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError('');
        setSubmitSuccess(false);

        try {
            await sendContactEmail(formData);
            setSubmitSuccess(true);
            setFormData({ name: '', email: '', phone: '', projectType: '', message: '' });

            setTimeout(() => {
                setSubmitSuccess(false);
            }, 5000);
        } catch (error) {
            setSubmitError('Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.');
            console.error('Error sending email:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDownloadCV = () => {
        generateCV();
    };

    // Google Calendar event link
    const googleCalendarLink = `https://calendar.google.com/calendar/u/0/r/eventedit?text=Reunión+Proyecto+Web&details=Reunión+para+discutir+proyecto+de+desarrollo+web&add=webcincodev@gmail.com`;

    return (
        <section
            ref={scrollContainerRef}
            id="vertical-scroll-area"
            className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-[#141110] via-[#1a1614] to-[#141110] relative overflow-y-auto pointer-events-auto py-8 md:py-0"
        >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#855E42] rounded-full filter blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D4AF37] rounded-full filter blur-[120px] animate-pulse delay-1000"></div>
            </div>

            <div className="container mx-auto px-4 lg:px-12 xl:px-16 relative z-10 max-w-7xl w-full h-full flex flex-col justify-center">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full lg:h-auto py-8 lg:py-0">

                    {/* Left Column - Info & CTA */}
                    <div className="space-y-6 lg:space-y-8 flex flex-col justify-center">
                        <div className="space-y-2 lg:space-y-4">
                            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-[#F0F0F2] tracking-tight leading-none">
                                ¿TRABAJAMOS?
                            </h2>
                            <div className="h-1.5 w-24 lg:h-2 lg:w-32 bg-gradient-to-r from-[#855E42] to-[#D4AF37] rounded-full"></div>
                        </div>

                        <div className="space-y-4 lg:space-y-6 text-[#B8B8BA]">
                            <p className="text-base lg:text-xl font-light leading-relaxed break-words max-w-lg">
                                Transformo ideas en experiencias digitales únicas y funcionales.
                            </p>

                            <div className="space-y-3">
                                <h3 className="text-lg lg:text-xl font-semibold text-[#F0F0F2] mb-2 break-words">Mis Servicios:</h3>
                                <ul className="space-y-2">
                                    {[
                                        'Desarrollo Web Full Stack',
                                        'Diseño UI/UX Premium',
                                        'E-commerce & Sistemas',
                                        'WordPress & CMS',
                                        'Branding & Identidad',
                                        'SEO & Performance'
                                    ].map((service, idx) => (
                                        <li key={idx} className="flex items-center space-x-2 group">
                                            <span className="text-[#855E42] group-hover:scale-110 transition-transform text-xs">●</span>
                                            <span className="text-sm lg:text-base group-hover:text-[#F0F0F2] transition-colors">{service}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="pt-2 lg:pt-4">
                                <p className="text-sm lg:text-lg italic text-[#D4AF37]">
                                    "Cada proyecto es una oportunidad para crear algo excepcional"
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 pt-2 lg:pt-4">
                            <a
                                href={googleCalendarLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#855E42] to-[#a67854] text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-[#855E42]/50 transform hover:scale-105 transition-all duration-300 text-sm lg:text-base"
                            >
                                <Calendar size={20} />
                                <span>Agendar Reunión</span>
                            </a>

                            <button
                                onClick={handleDownloadCV}
                                className="flex items-center justify-center gap-2 px-6 py-3 bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] rounded-xl font-semibold hover:bg-[#D4AF37] hover:text-[#141110] transform hover:scale-105 transition-all duration-300 text-sm lg:text-base"
                            >
                                <Download size={20} />
                                <span>Descargar CV</span>
                            </button>
                        </div>
                    </div>

                    {/* Right Column - Contact Form */}
                    <div className="relative pointer-events-auto w-full max-w-md lg:max-w-full mx-auto">
                        <div className="bg-[#1f1b19] backdrop-blur-xl rounded-2xl p-6 lg:p-8 shadow-2xl border border-[#855E42]/20 hover:border-[#855E42]/40 transition-all duration-500">
                            <div className="flex items-center gap-2 mb-4 lg:mb-6">
                                <Mail className="text-[#855E42]" size={24} />
                                <h3 className="text-xl lg:text-2xl font-bold text-[#F0F0F2]">Contáctame</h3>
                            </div>

                            {submitSuccess && (
                                <div className="mb-4 p-3 bg-green-500/10 border border-green-500/50 rounded-lg flex items-center gap-2 text-green-400 text-sm">
                                    <CheckCircle size={18} />
                                    <p>¡Mensaje enviado!</p>
                                </div>
                            )}

                            {submitError && (
                                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
                                    <p>{submitError}</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-3 lg:space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                                    <div className="space-y-1">
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 bg-[#141110] border border-[#855E42]/30 rounded-lg text-[#F0F0F2] placeholder-[#555] text-sm focus:outline-none focus:border-[#855E42] focus:ring-1 focus:ring-[#855E42]/20 transition-all duration-300"
                                            placeholder="Nombre"
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 bg-[#141110] border border-[#855E42]/30 rounded-lg text-[#F0F0F2] placeholder-[#555] text-sm focus:outline-none focus:border-[#855E42] focus:ring-1 focus:ring-[#855E42]/20 transition-all duration-300"
                                            placeholder="Email"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                                    <div className="space-y-1">
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-[#141110] border border-[#855E42]/30 rounded-lg text-[#F0F0F2] placeholder-[#555] text-sm focus:outline-none focus:border-[#855E42] focus:ring-1 focus:ring-[#855E42]/20 transition-all duration-300"
                                            placeholder="Teléfono"
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <select
                                            id="projectType"
                                            name="projectType"
                                            value={formData.projectType}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 bg-[#141110] border border-[#855E42]/30 rounded-lg text-[#F0F0F2] text-sm focus:outline-none focus:border-[#855E42] focus:ring-1 focus:ring-[#855E42]/20 transition-all duration-300"
                                        >
                                            <option value="">Tipo de Proyecto</option>
                                            <option value="web">Desarrollo Web</option>
                                            <option value="ecommerce">E-commerce</option>
                                            <option value="wordpress">WordPress</option>
                                            <option value="design">Diseño Gráfico</option>
                                            <option value="branding">Branding</option>
                                            <option value="other">Otro</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        rows={4}
                                        className="w-full px-4 py-3 bg-[#141110] border border-[#855E42]/30 rounded-lg text-[#F0F0F2] placeholder-[#555] text-sm focus:outline-none focus:border-[#855E42] focus:ring-1 focus:ring-[#855E42]/20 transition-all duration-300 resize-none"
                                        placeholder="Cuéntame sobre tu proyecto..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full px-6 py-3 bg-gradient-to-r from-[#855E42] to-[#D4AF37] text-white rounded-lg font-bold text-base hover:shadow-2xl hover:shadow-[#855E42]/50 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader className="animate-spin" size={20} />
                                            <span>Enviando...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send size={20} />
                                            <span>Enviar Mensaje</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default SectionContact;
