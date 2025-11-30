import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, User, Bot, Mail, Phone, FileText } from 'lucide-react';
import { sendChatMessage } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hola. Soy el asistente IA de Armando Ovalle. ¿En qué puedo ayudarte hoy? Si tienes un proyecto en mente, estaré encantado de guiarte.' }
  ]);
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', contact: '', budget: '' });

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, showForm]);

  const handleSend = async (e: React.FormEvent, overrideText?: string) => {
    if (e) e.preventDefault();
    const textToSend = overrideText || input;
    
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      // Prepare history for API
      const history = messages.filter(m => m.role !== 'model' || m.text !== 'Hola. Soy el asistente IA de Armando Ovalle. ¿En qué puedo ayudarte hoy? Si tienes un proyecto en mente, estaré encantado de guiarte.').map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const responseText = await sendChatMessage(history, userMsg.text);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'Conexión interrumpida.', isError: true }]);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.contact) return;

    const formattedMessage = `He completado mis datos:\n\n👤 Nombre: ${formData.name}\n📱 Contacto: ${formData.contact}\n💰 Presupuesto: ${formData.budget}`;
    
    setShowForm(false);
    
    // 1. Process with AI
    handleSend(e, formattedMessage);

    // 2. Automate Gmail Web Composer Trigger (Replaces mailto)
    // Construct email body with history + new data
    const historyText = messages.map(m => `[${m.role === 'user' ? 'CLIENTE' : 'ARMANDO AI'}]: ${m.text}`).join('\n\n');
    const finalHistory = `${historyText}\n\n[CLIENTE - DATOS FORMULARIO]:\n${formattedMessage}`;
    
    const subject = encodeURIComponent(`🔥 Nuevo Lead: ${formData.name} - Portafolio`);
    const body = encodeURIComponent(`Hola Armando,\n\nEl cliente ${formData.name} ha dejado sus datos tras la conversación.\n\n👇 DATOS DE CONTACTO:\nNombre: ${formData.name}\nContacto: ${formData.contact}\nPresupuesto: ${formData.budget || 'N/A'}\n\n👇 TRANSCRIPCIÓN DEL CHAT:\n--------------------------------\n${finalHistory}\n--------------------------------`);
    
    // Construct Gmail URL
    // view=cm (compose mode), fs=1 (fullscreen), to, su (subject), body, cc
    let gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=webcincodev@gmail.com&su=${subject}&body=${body}`;
    
    if (formData.contact.includes('@')) {
      // Assuming the contact field contains an email, add to CC
      gmailUrl += `&cc=${formData.contact}`;
    }

    // Delay slightly to let UI update then open Gmail in new tab
    setTimeout(() => {
       window.open(gmailUrl, '_blank');
    }, 1500);
  };

  const handleSendEmail = () => {
    const historyText = messages.map(m => `[${m.role === 'user' ? 'CLIENTE' : 'ARMANDO AI'}]: ${m.text}`).join('\n\n');
    const subject = encodeURIComponent("Nuevo Cliente Potencial - Historial de Chat");
    const body = encodeURIComponent(`Hola Armando,\n\nAquí está la transcripción de una conversación con un cliente potencial desde tu portafolio:\n\n--------------------------------\n\n${historyText}\n\n--------------------------------`);
    
    // Direct Gmail Link
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=webcincodev@gmail.com&su=${subject}&body=${body}`;
    
    window.open(gmailUrl, '_blank');
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/573052891719', '_blank');
  };

  return (
    <>
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 group flex items-center justify-center bg-[#F0F0F2] text-[#141110] rounded-full h-14 shadow-[0_8px_30px_rgb(0,0,0,0.3)] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden w-14 hover:w-48 hover:border-[#855E42] border-2 border-transparent"
        >
          {/* Icon wrapper always visible */}
          <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center relative z-10">
            <MessageSquare size={24} className="text-[#855E42] group-hover:text-[#141110] transition-colors duration-300" />
          </div>

          {/* Text revealed on hover */}
          <span className="whitespace-nowrap font-bold text-sm pr-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 transform translate-x-4 group-hover:translate-x-0">
            Cotizar Proyecto
          </span>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] bg-[#141110] border border-[#3D2F28] shadow-2xl flex flex-col rounded-lg overflow-hidden animate-in slide-in-from-right-10 fade-in duration-300">
          {/* Header */}
          <div className="bg-[#3D2F28] p-4 flex justify-between items-center border-b border-[#141110]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#855E42] flex items-center justify-center relative">
                 <Bot size={18} className="text-[#F0F0F2]" />
                 <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
              </div>
              <div>
                <h3 className="text-[#F0F0F2] font-bold text-sm">Armando IA</h3>
                <p className="text-[#6B7176] text-[10px] uppercase tracking-wider">En línea</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button 
                onClick={openWhatsApp}
                className="text-[#25D366] hover:bg-[#141110] p-2 rounded-md transition-colors"
                title="Hablar por WhatsApp"
              >
                <Phone size={18} />
              </button>
              <button 
                onClick={handleSendEmail} 
                className="text-[#F0F0F2] hover:text-[#855E42] hover:bg-[#141110] p-2 rounded-md transition-colors"
                title="Abrir en Gmail"
              >
                <Mail size={18} />
              </button>
              <button onClick={() => setIsOpen(false)} className="text-[#6B7176] hover:text-[#F0F0F2] p-2 ml-1"><X size={20} /></button>
            </div>
          </div>

          {/* Chat Area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#141110] scroll-smooth">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-md ${
                  m.role === 'user' 
                    ? 'bg-[#3D2F28] text-[#F0F0F2] rounded-tr-none' 
                    : 'bg-[#F0F0F2] text-[#141110] rounded-tl-none font-serif'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-[#3D2F28] text-[#F0F0F2] p-3 rounded-2xl rounded-tl-none text-xs animate-pulse">
                  Escribiendo...
                </div>
              </div>
            )}
            
            {/* Show Form Button if form is closed */}
            {!showForm && !loading && (
               <div className="flex justify-center pt-2">
                 <button 
                   onClick={() => setShowForm(true)}
                   className="text-[10px] uppercase tracking-widest text-[#855E42] hover:text-[#F0F0F2] border border-[#855E42] px-3 py-1 rounded-full transition-colors flex items-center gap-2"
                 >
                   <FileText size={12} />
                   Ingresar Datos Formales
                 </button>
               </div>
            )}
          </div>

          {/* Input Area or Form Overlay */}
          <div className="bg-[#141110] border-t border-[#3D2F28] relative">
            
            {showForm ? (
              <div className="p-4 bg-[#1e1b1a] animate-in slide-in-from-bottom-5">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-[#F0F0F2] text-xs font-bold uppercase tracking-wider">Datos de Proyecto</h4>
                  <button onClick={() => setShowForm(false)} className="text-[#6B7176] hover:text-[#F0F0F2]"><X size={14}/></button>
                </div>
                <form onSubmit={handleFormSubmit} className="space-y-3">
                  <input 
                    type="text" 
                    placeholder="Tu Nombre Completo"
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-[#141110] border border-[#3D2F28] text-[#F0F0F2] text-sm p-2 rounded focus:border-[#855E42] focus:outline-none"
                  />
                  <input 
                    type="text" 
                    placeholder="Teléfono / WhatsApp / Email"
                    required
                    value={formData.contact}
                    onChange={e => setFormData({...formData, contact: e.target.value})}
                    className="w-full bg-[#141110] border border-[#3D2F28] text-[#F0F0F2] text-sm p-2 rounded focus:border-[#855E42] focus:outline-none"
                  />
                  <input 
                    type="text" 
                    placeholder="Presupuesto Estimado (Opcional)"
                    value={formData.budget}
                    onChange={e => setFormData({...formData, budget: e.target.value})}
                    className="w-full bg-[#141110] border border-[#3D2F28] text-[#F0F0F2] text-sm p-2 rounded focus:border-[#855E42] focus:outline-none"
                  />
                  <button 
                    type="submit" 
                    className="w-full bg-[#855E42] text-[#F0F0F2] py-2 text-xs font-bold uppercase hover:bg-[#F0F0F2] hover:text-[#141110] transition-colors rounded"
                  >
                    Enviar Datos & Abrir Gmail
                  </button>
                </form>
              </div>
            ) : (
              <form onSubmit={(e) => handleSend(e)} className="p-4 flex gap-2">
                <input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-[#3D2F28] text-[#F0F0F2] rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#855E42] placeholder-[#6B7176]"
                  placeholder="Escribe tu mensaje..."
                />
                <button 
                  type="submit" 
                  disabled={loading || !input.trim()}
                  className="bg-[#855E42] text-[#F0F0F2] p-2 rounded-full hover:bg-[#6B7176] disabled:opacity-50 transition-colors"
                >
                  <Send size={18} />
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;