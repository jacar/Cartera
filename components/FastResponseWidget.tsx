import React, { useState } from 'react';
import { Zap, X, FileText, Download } from 'lucide-react';
import { getFastResponse } from '../services/geminiService';

const FastResponseWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedIdeasCount, setGeneratedIdeasCount] = useState(0);

  const handleFastAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    
    // Updated prompt to request response in Spanish
    const prompt = `Actúa como un director creativo senior. El cliente quiere: "${query}". \n\nGenera un "Brief de Diseño" estructurado y profesional (usa negritas ** para los títulos) que incluya:\n1. **Nombre del Proyecto** (Algo abstracto y cool)\n2. **Concepto Visual** (Descripción evocadora)\n3. **Stack Tecnológico** (Recomendaciones modernas)\n4. **Paleta de Colores Sugerida**. \n\nResponde en Español, manténlo conciso pero inspirador.`;
    
    const res = await getFastResponse(prompt);
    setResponse(res);
    setGeneratedIdeasCount(prevCount => prevCount + 1);
    setLoading(false);
  };

  // Helper to render bold text nicely
  const renderFormattedText = (text: string) => {
    return text.split(/(\*\*.*?\*\*)/g).map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <div key={index} className="mt-3 mb-1">
             <span className="font-bold text-[#855E42] uppercase tracking-wider text-xs border-b border-[#855E42]/20 pb-0.5">
               {part.slice(2, -2).replace(':', '')}
             </span>
          </div>
        );
      }
      return <span key={index} className="text-[#141110] opacity-90">{part}</span>;
    });
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start font-sans">
      {isOpen && (
        <div className="mb-4 bg-[#F0F0F2] w-80 md:w-96 shadow-[12px_12px_0px_0px_rgba(20,17,16,1)] border-2 border-[#141110] animate-in slide-in-from-bottom-10 fade-in duration-300 relative">
           
           {/* Widget Header */}
           <div className="bg-[#141110] p-4 flex justify-between items-center text-[#F0F0F2]">
             <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#855E42] rounded-full animate-pulse"></div>
                <h4 className="font-bold text-xs uppercase tracking-[0.2em]">Director Creativo IA</h4>
             </div>
             <button onClick={() => { setIsOpen(false); setGeneratedIdeasCount(0); }} className="hover:text-[#855E42] transition-colors"><X size={18} /></button>
           </div>
           
           <div className="p-5">
              {!response ? (
                <form onSubmit={handleFastAsk}>
                  <label className="text-xs font-bold text-[#141110] mb-3 block uppercase tracking-wide">
                    Cuéntame tu idea (Sitio web, App, Marca...)
                  </label>
                  <textarea 
                    rows={3}
                    className="w-full bg-white border-2 border-[#141110] p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#855E42] mb-4 placeholder:text-[#6B7176] text-[#141110] resize-none font-serif"
                    placeholder="Ej: Quiero un portafolio para un arquitecto brutalista que ama el hormigón y el minimalismo..."
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                  />
                  <button 
                    type="submit" 
                    disabled={loading || generatedIdeasCount >= 5}
                    className="w-full bg-[#855E42] text-[#F0F0F2] py-3 text-xs font-bold uppercase hover:bg-[#141110] transition-colors disabled:opacity-50 border-2 border-transparent hover:border-[#141110] flex justify-center gap-2"
                  >
                    {loading ? <Zap size={14} className="animate-spin" /> : <Zap size={14} />}
                    {loading ? 'Procesando...' : 'Generar Concepto'}
                  </button>
                  {generatedIdeasCount >= 5 && (
                    <p className="text-red-500 text-xs mt-2 text-center">
                      Has alcanzado el límite de 5 ideas. <button onClick={() => setGeneratedIdeasCount(0)} className="underline">Reiniciar</button> para generar más.
                    </p>
                  )}
                </form>
              ) : (
                <div className="animate-in fade-in zoom-in-95 duration-500">
                  {/* Generated Design Card */}
                  <div className="border-2 border-[#141110] bg-white p-1 relative">
                    <div className="border border-[#141110] p-4 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]">
                      
                      <div className="flex justify-between items-start border-b-2 border-[#141110] pb-2 mb-2">
                        <span className="font-serif italic text-2xl font-bold text-[#141110]">Resumen.01</span>
                        <div className="flex items-center gap-2">
                          <div className="text-[10px] text-right uppercase leading-tight text-[#6B7176]">
                            <div>{new Date().toLocaleDateString()}</div>
                            <div>Armando IA</div>
                          </div>
                          <button onClick={() => { setResponse(''); setQuery(''); }} className="text-[#6B7176] hover:text-[#141110] p-1 rounded-full"><X size={16} /></button>
                        </div>
                      </div>

                      <div className="font-serif text-sm leading-relaxed max-h-60 overflow-y-auto custom-scrollbar pr-2">
                        {renderFormattedText(response)}
                      </div>

                      <div className="mt-4 pt-3 border-t-2 border-[#141110] border-dashed flex justify-between items-center">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#855E42]">Estado: Aprobado</span>
                        <button onClick={() => { setResponse(''); setQuery(''); }} className="text-xs underline hover:text-[#855E42]">Nuevo</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
           </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="group bg-[#141110] border-2 border-[#F0F0F2] text-[#F0F0F2] p-4 shadow-[4px_4px_0px_0px_rgba(133,94,66,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all rounded-none"
      >
        <div className="relative">
           <FileText size={24} className="group-hover:opacity-0 transition-opacity absolute top-0 left-0" />
           <Zap size={24} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#855E42]" />
        </div>
      </button>
    </div>
  );
};

export default FastResponseWidget;