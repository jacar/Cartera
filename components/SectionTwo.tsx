import React from 'react';
import { motion } from 'framer-motion';

const philosophyItems = [
  { 
    id: '01', 
    title: 'La Dualidad Digital', 
    heading: 'Lógica y Emoción', 
    desc: 'El código proporciona la estructura robusta; el diseño otorga el alma. Fusiono ambos mundos para crear productos digitales completos.' 
  },
  { 
    id: '02', 
    title: 'Arquitectura Invisible', 
    heading: 'Código Limpio, Diseño Puro', 
    desc: 'La belleza no es solo lo que se ve, sino cómo funciona. Un backend escalable es tan importante como una interfaz elegante.' 
  },
  { 
    id: '03', 
    title: 'Experiencia Total', 
    heading: 'Impacto y Rendimiento', 
    desc: 'No basta con que sea bonito. Debe ser rápido, intuitivo y resolver problemas complejos con soluciones simples.' 
  },
];

const SectionTwo: React.FC = () => {
  return (
    <section className="section w-screen min-h-screen h-auto bg-[#F0F0F2] text-[#141110] flex items-center px-6 md:px-20 border-r border-[#3D2F28] relative shrink-0">
       <div className="absolute inset-0 opacity-5 pointer-events-none bg-gradient-to-tr from-[#855E42] to-transparent"></div>
       
       <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8 md:gap-16 items-start">
          {philosophyItems.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="group border-l-2 border-[#3D2F28]/20 pl-8"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-sm font-bold bg-[#141110] text-[#F0F0F2] rounded-full w-8 h-8 flex items-center justify-center">{item.id}</span>
                <span className="text-xs uppercase tracking-[0.2em] text-[#855E42] font-bold">{item.title}</span>
              </div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif mt-2 group-hover:text-[#855E42] group-hover:italic transition-all duration-500 cursor-default mb-3 md:mb-4">
                {item.heading}
              </h3>
              <p className="text-base md:text-lg text-[#6B7176] font-light leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
       </div>
    </section>
  );
};

export default SectionTwo;