import React from 'react';
import { Code, PenTool, Database, Layers, Cpu, Globe } from 'lucide-react';

const skills = [
   {
      icon: <Code size={24} />,
      title: "Ingeniería Frontend",
      desc: "React, Next.js, Tailwind, Motion. Creación de interfaces fluidas y reactivas."
   },
   {
      icon: <Database size={24} />,
      title: "Arquitectura Backend",
      desc: "Node.js, Python, SQL. Sistemas escalables y seguros."
   },
   {
      icon: <PenTool size={24} />,
      title: "Diseño UI/UX",
      desc: "Figma, Adobe Suite. Sistemas de diseño y prototipado de alta fidelidad."
   },
   {
      icon: <Cpu size={24} />,
      title: "Inteligencia Artificial",
      desc: "Integración de LLMs (Gemini, OpenAI), RAG y automatización."
   },
];

const SectionAbout: React.FC = () => {
   return (
      <section className="section w-screen min-h-screen h-auto bg-[#141110] text-[#F0F0F2] flex flex-col md:flex-row items-center border-r border-[#3D2F28] shrink-0 relative overflow-hidden">

         {/* Decorative Background */}
         <div className="absolute top-0 right-0 w-2/3 h-full bg-[#1e1b1a] -z-10 -skew-x-12 origin-top border-l border-[#3D2F28]"></div>
         <div className="absolute bottom-20 left-20 w-64 h-64 bg-[#855E42] rounded-full opacity-5 blur-3xl pointer-events-none"></div>

         {/* Left Column: Bio */}
         <div className="flex-1 p-8 md:p-24 flex flex-col justify-center h-full relative z-10">
            <div className="flex items-center gap-3 mb-6">
               <div className="w-12 h-[1px] bg-[#855E42]"></div>
               <span className="text-[#855E42] font-bold tracking-widest uppercase text-xs">Sobre Mí</span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif mb-4 md:mb-8 leading-tight">
               El Arquitecto <br />
               <span className="italic text-[#6B7176]">Digital.</span>
            </h2>

            <p className="text-[#F0F0F2] opacity-80 text-base md:text-lg leading-relaxed max-w-full md:max-w-xl mb-6 md:mb-10 border-l-2 border-[#3D2F28] pl-6 font-light">
               Con más de 15 años de experiencia, opero en la intersección entre la ingeniería de software rigurosa y el diseño visual emotivo. <br /><br />
               Mi enfoque es holístico: no solo escribo código, construyo ecosistemas digitales que son estéticamente impactantes y técnicamente robustos.
            </p>

            <div className="flex gap-8">
               <div>
                  <span className="block text-5xl font-serif text-[#F0F0F2]">15+</span>
                  <span className="text-[10px] uppercase tracking-wider text-[#855E42] font-bold">Años Exp.</span>
               </div>
               <div className="w-px h-14 bg-[#3D2F28]"></div>
               <div>
                  <span className="block text-5xl font-serif text-[#F0F0F2]">30+</span>
                  <span className="text-[10px] uppercase tracking-wider text-[#855E42] font-bold">Proyectos</span>
               </div>
            </div>
         </div>

         {/* Right Column: Skills Grid */}
         <div className="flex-1 p-8 md:p-12 h-full flex flex-col justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
               {skills.map((s, i) => (
                  <div key={i} className="group bg-[#141110] p-6 border border-[#3D2F28] hover:border-[#855E42] transition-all duration-300 hover:-translate-y-1 shadow-2xl relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        {s.icon}
                     </div>
                     <div className="mb-4 text-[#855E42] bg-[#3D2F28]/20 w-fit p-3 rounded-full group-hover:text-[#F0F0F2] group-hover:bg-[#855E42] transition-colors">
                        {s.icon}
                     </div>
                     <h3 className="text-xl font-serif mb-2 text-[#F0F0F2]">{s.title}</h3>
                     <p className="text-xs text-[#6B7176] leading-relaxed">{s.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
};

export default SectionAbout;