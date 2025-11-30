import React from 'react';
import { ShoppingBag, Monitor, Palette, Layout, Zap } from 'lucide-react';

const services = [
  {
    title: "Experto E-commerce",
    desc: "Especializado en el desarrollo y optimización de tiendas online usando las principales plataformas del mercado: WooCommerce, BigCommerce, PrestaShop, Shopify y más. Implementación completa, personalización y mantenimiento para maximizar tus ventas online.",
    icon: <ShoppingBag size={20} />
  },
  {
    title: "Desarrollo Web Profesional",
    desc: "Creación de sitios web modernos y aplicaciones web utilizando las últimas tecnologías. Desarrollo soluciones digitales escalables con énfasis en rendimiento, diseño y experiencia de usuario. Implementación de interfaces intuitivas y funcionalidades avanzadas para una presencia web excepcional.",
    icon: <Monitor size={20} />
  },
  {
    title: "Diseño UI/UX",
    desc: "Diseño de interfaces intuitivas y experiencias de usuario excepcionales.",
    icon: <Palette size={20} />
  },
  {
    title: "Desarrollo Frontend",
    desc: "Implementación de interfaces de usuario responsivas y dinámicas.",
    icon: <Layout size={20} />
  },
  {
    title: "Optimización",
    desc: "Mejora del rendimiento y la velocidad de carga de sitios web existentes.",
    icon: <Zap size={20} />
  }
];

const SectionServices: React.FC = () => {
  return (
    <section className="section w-screen min-h-screen h-auto bg-[#F0F0F2] text-[#141110] flex flex-col md:flex-row border-r border-[#6B7176] shrink-0 relative overflow-hidden">
      {/* Texture Overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>

      {/* Left Column: Bio / Philosophy Text */}
      <div className="w-full md:w-[35%] h-auto md:h-full p-6 md:p-16 flex flex-col justify-center border-b md:border-b-0 md:border-r border-[#141110]/10 bg-[#E8E8EA] relative z-10 overflow-y-auto shrink-0">
         <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-4 md:mb-8 text-[#141110]">
              Servicios <br/>
              <span className="italic text-[#855E42]">y Experiencia</span>
            </h2>
            
            <div className="space-y-6 md:space-y-8 text-[#6B7176] text-xs md:text-sm leading-relaxed font-light">
              <div className="border-l-2 border-[#855E42] pl-4">
                <h3 className="font-bold text-[#141110] uppercase tracking-wider text-xs mb-2">Sobre Mí</h3>
                <p>Soy un desarrollador web y diseñador UI/UX apasionado por crear experiencias digitales excepcionales. Mi enfoque combina diseño intuitivo con desarrollo técnico sólido.</p>
              </div>
              
              <div className="border-l-2 border-[#141110]/20 pl-4">
                <h3 className="font-bold text-[#141110] uppercase tracking-wider text-xs mb-2">Mi Enfoque</h3>
                <p>Me especializo en crear soluciones web que no solo se ven increíbles, sino que también funcionan perfectamente. Cada proyecto es una oportunidad para innovar y superar expectativas.</p>
              </div>

              <div className="border-l-2 border-[#141110]/20 pl-4">
                <h3 className="font-bold text-[#141110] uppercase tracking-wider text-xs mb-2">Experiencia</h3>
                <p>Con años de experiencia en el desarrollo web, he trabajado en diversos proyectos que van desde sitios corporativos hasta aplicaciones web complejas. Mi objetivo es crear productos digitales que destaquen.</p>
              </div>
            </div>
         </div>
      </div>

      {/* Right Column: Services Grid */}
      <div className="flex-1 h-full p-4 md:p-16 overflow-y-auto bg-[#F0F0F2]">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto pb-20 md:pb-0">
            {services.map((s, i) => (
              <div key={i} className={`group bg-white p-6 md:p-8 border border-[#141110]/5 hover:border-[#855E42] transition-all duration-300 shadow-sm hover:shadow-xl rounded-sm ${i === 0 || i === 1 ? 'md:col-span-2' : ''}`}>
                 <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-[#141110] text-[#F0F0F2] group-hover:bg-[#855E42] transition-colors rounded-md shadow-lg">
                           {s.icon}
                        </div>
                        <h3 className="text-lg md:text-xl font-serif font-bold text-[#141110]">{s.title}</h3>
                    </div>
                 </div>
                 <p className="text-sm text-[#6B7176] leading-relaxed pl-1">
                   {s.desc}
                 </p>
              </div>
            ))}
         </div>
      </div>
    </section>
  );
};

export default SectionServices;