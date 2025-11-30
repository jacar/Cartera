import React, { useState } from 'react';
import { Calculator, Check, ChevronRight, RefreshCcw, Smartphone } from 'lucide-react';

// Tipos
type Option = {
  label: string;
  value: string;
  price: number;
};

type Question = {
  id: number;
  question: string;
  description: string;
  options: Option[];
};

// Configuración de Preguntas y Precios (Base USD)
const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "¿El sitio web contará con tienda online?",
    description: "Una tienda online considera un catálogo de productos y carrito de compras instalando un plugin como Woocommerce.",
    options: [
      { label: "Con Tienda Online", value: "si_tienda", price: 300 },
      { label: "Sin Tienda (Informativo)", value: "no_tienda", price: 0 }
    ]
  },
  {
    id: 2,
    question: "¿El diseño será a la medida o se usará una plantilla?",
    description: "Un diseño a la medida se hace desde cero creando la idea visual previa. Una plantilla usa estructuras predefinidas.",
    options: [
      { label: "Diseño a Medida (Exclusivo)", value: "medida", price: 250 },
      { label: "Uso de Plantilla (Rápido)", value: "plantilla", price: 0 }
    ]
  },
  {
    id: 3,
    question: "¿Cuál es el tamaño del proyecto?",
    description: "Selecciona la cantidad aproximada de páginas o secciones internas (Inicio, Nosotros, Servicios, etc).",
    options: [
      { label: "Pequeño (< 3 Secciones)", value: "small", price: 150 },
      { label: "Mediano (3 - 10 Secciones)", value: "medium", price: 300 },
      { label: "Grande (> 10 Secciones)", value: "large", price: 500 }
    ]
  },
  {
    id: 4,
    question: "¿Contará con pasarela de pagos?",
    description: "Integración técnica para recibir pagos con tarjeta de crédito/débito directamente en la web.",
    options: [
      { label: "Si, procesar pagos", value: "si_pagos", price: 80 },
      { label: "No requerida", value: "no_pagos", price: 0 }
    ]
  },
  {
    id: 5,
    question: "¿Contará con características especiales?",
    description: "Funcionalidades complejas como: multi-idioma, motor de reservaciones, área de miembros, etc.",
    options: [
      { label: "Si, funciones avanzadas", value: "si_special", price: 200 },
      { label: "No, estándar", value: "no_special", price: 0 }
    ]
  },

];

const COP_RATE = 4100; // Tasa de cambio aproximada

const FooterSection: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<number, Option>>({});
  const [isFinished, setIsFinished] = useState(false);

  const handleSelect = (option: Option) => {
    const nextSelections = { ...selections, [QUESTIONS[currentStep].id]: option };
    setSelections(nextSelections);

    if (currentStep < QUESTIONS.length - 1) {
      // Small delay for smooth UX
      setTimeout(() => setCurrentStep(prev => prev + 1), 250);
    } else {
      setTimeout(() => setIsFinished(true), 250);
    }
  };

  const calculateTotal = () => {
    let total = 200; // Base fee (Hosting setup, domain config, basic setup)
    // Cast explícito para asegurar que TS sepa que es un array de opciones
    const selectedOptions = Object.values(selections) as Option[];
    
    selectedOptions.forEach((opt) => {
        if (opt && typeof opt.price === 'number') {
            total += opt.price;
        }
    });
    // Ensure total does not exceed 1500 for standard web quotes
    return Math.max(500, Math.min(total, 1200));
  };

  const reset = () => {
    setCurrentStep(0);
    setSelections({});
    setIsFinished(false);
  };

  const sendToWhatsApp = (totalUSD: number, totalCOP: string) => {
    const message = `Hola Armando, he usado tu cotizador web automatizado.\n\n*Resumen del Proyecto:*\n${QUESTIONS.map(q => `- ${q.question}: ${selections[q.id]?.label || 'No seleccionado'}`).join('\n')}\n\n*Estimado Final:*\nUSD: $${totalUSD}\nCOP: ${totalCOP}\n\nMe gustaría agendar una reunión.`;
    window.open(`https://wa.me/573052891719?text=${encodeURIComponent(message)}`, '_blank');
  };

  const currentQuestion = QUESTIONS[currentStep];
  const totalUSD = calculateTotal();
  const totalCOP = (totalUSD * COP_RATE).toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });

  return (
    <section className="section w-screen min-h-screen h-auto md:h-screen bg-[#0a0908] text-[#F0F0F2] flex items-center justify-center relative overflow-hidden border-l border-[#3D2F28]">
      
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#855E4220_0%,_transparent_60%)] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#855E42]/10 to-transparent pointer-events-none"></div>

      <div className="w-full max-w-4xl px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-[#1e1b1a] border border-[#3D2F28] rounded-full mb-4 shadow-lg">
            <Calculator size={24} className="text-[#855E42]" />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif mb-4">
            Cotizador <span className="text-[#855E42] italic">Web</span>
          </h2>
          <p className="text-[#6B7176] max-w-lg mx-auto text-sm md:text-base">
            Calcula el valor aproximado de tu próximo proyecto digital en segundos. Sin compromisos.
          </p>
        </div>

        {/* MAIN CONTENT CARD */}
        <div className="bg-[#1e1b1a] border border-[#3D2F28] rounded-sm shadow-2xl overflow-hidden min-h-[400px] flex flex-col relative">
          
          {/* Progress Bar */}
          {!isFinished && (
            <div className="absolute top-0 left-0 w-full h-1 bg-[#141110]">
              <div 
                className="h-full bg-[#855E42] transition-all duration-500 ease-out"
                style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
              ></div>
            </div>
          )}

          <div className="p-8 md:p-12 flex-1 flex flex-col justify-center">
            
            {!isFinished ? (
              <div className="animate-in slide-in-from-right-8 fade-in duration-300" key={currentStep}>
                <span className="text-[#855E42] text-xs font-bold uppercase tracking-widest mb-4 block">
                  Paso {currentStep + 1} de {QUESTIONS.length}
                </span>
                
                <h3 className="text-2xl md:text-3xl font-serif mb-3 text-[#F0F0F2]">
                  {currentQuestion.question}
                </h3>
                <p className="text-[#6B7176] mb-8 text-sm leading-relaxed max-w-2xl">
                  {currentQuestion.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentQuestion.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelect(opt)}
                      className="group flex items-center justify-between p-6 border border-[#3D2F28] hover:border-[#855E42] hover:bg-[#855E42]/10 transition-all text-left"
                    >
                      <span className="font-bold text-sm md:text-base group-hover:text-[#F0F0F2] text-[#6B7176] transition-colors">
                        {opt.label}
                      </span>
                      <ChevronRight size={18} className="text-[#855E42] opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* RESULTS VIEW */
              <div className="text-center animate-in zoom-in-95 duration-500">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20">
                  <Check size={32} className="text-green-500" />
                </div>
                
                <h3 className="text-2xl font-serif text-[#F0F0F2] mb-2">Cotización Estimada</h3>
                <p className="text-[#6B7176] text-sm mb-8">Basado en tus requerimientos técnicos y de diseño.</p>

                <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-10">
                  <div className="p-6 bg-[#141110] border border-[#3D2F28] w-full md:w-auto min-w-[200px]">
                    <span className="block text-xs uppercase tracking-widest text-[#6B7176] mb-2">Precio en Dólares</span>
                    <span className="text-4xl font-serif text-[#F0F0F2] block">${totalUSD} <span className="text-sm font-sans text-[#855E42]">USD</span></span>
                  </div>
                  
                  <div className="hidden md:block text-[#3D2F28]"><RefreshCcw size={20} className="animate-spin-slow"/></div>

                  <div className="p-6 bg-[#141110] border border-[#3D2F28] w-full md:w-auto min-w-[200px]">
                    <span className="block text-xs uppercase tracking-widest text-[#6B7176] mb-2">Peso Colombiano (Aprox)</span>
                    <span className="text-3xl font-serif text-[#855E42] block">{totalCOP} <span className="text-sm font-sans text-[#6B7176]">COP</span></span>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => sendToWhatsApp(totalUSD, totalCOP)}
                    className="px-8 py-4 bg-[#25D366] text-[#141110] font-bold uppercase tracking-widest hover:bg-[#1ebc57] transition-colors flex items-center justify-center gap-3 shadow-lg"
                  >
                    <Smartphone size={20} /> Recibir Oferta Formal
                  </button>
                  <button 
                    onClick={reset}
                    className="px-8 py-4 bg-transparent border border-[#3D2F28] text-[#6B7176] font-bold uppercase tracking-widest hover:text-[#F0F0F2] hover:border-[#F0F0F2] transition-colors flex items-center justify-center gap-3"
                  >
                    <RefreshCcw size={18} /> Recalcular
                  </button>
                </div>
                
                <p className="text-[10px] text-[#6B7176] mt-6 max-w-md mx-auto">
                  *Este valor es una estimación algorítmica. El precio final puede variar tras una reunión de diagnóstico detallada.
                </p>
              </div>
            )}

          </div>
        </div>

      </div>

      <div className="absolute bottom-4 w-full text-center text-[10px] uppercase tracking-widest text-[#6B7176] opacity-30 pointer-events-none">
        © 2025 Armando Mi. Todos los derechos reservados.
      </div>
    </section>
  );
};

export default FooterSection;