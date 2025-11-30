import React from 'react';
import { motion } from 'framer-motion';

const SectionOne: React.FC = () => {
  return (
    <section className="section w-screen min-h-screen h-auto bg-[#141110] flex flex-col justify-center px-8 md:px-20 relative border-r border-[#3D2F28] overflow-hidden">
      
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover"
        >
          <source src="https://www.webcincodev.com/blog/wp-content/uploads/2025/11/bg.mp4" type="video/mp4" />
        </video>
      </div>
      
      {/* Abstract Blur element for depth */}
      <div className="absolute top-1/4 left-10 md:left-24 animate-pulse z-20 pointer-events-none">
         <div className="w-16 h-16 md:w-24 md:h-24 bg-[#855E42] rounded-full blur-3xl opacity-30"></div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-20 relative"
      >
        <p className="text-[#F0F0F2] text-xs sm:text-sm md:text-base mb-4 md:mb-6 tracking-[0.2em] md:tracking-[0.3em] uppercase font-bold flex items-center gap-2 md:gap-3">
          <span className="w-8 h-[1px] bg-[#855E42]"></span>
          Ingeniería • Estética • Funcionalidad
        </p>
        
        <h1 className="text-5xl sm:text-6xl md:text-[9rem] leading-[1] md:leading-[0.9] font-serif text-[#F0F0F2] mb-2 md:mb-4 drop-shadow-2xl">
          Armando <br/>
          <span className="italic font-light text-[#855E42]">Ovalle J.</span>
        </h1>
        
        <h2 className="text-2xl sm:text-3xl md:text-6xl font-bold text-[#F0F0F2] mt-1 md:mt-2 mix-blend-difference opacity-90 drop-shadow-lg max-w-full md:max-w-4xl leading-tight">
          Desarrollador Full Stack <br/>
          <span className="text-transparent text-stroke-1 md:text-stroke-2 stroke-[#F0F0F2] opacity-50">y Diseñador</span>
        </h2>
      </motion.div>

      <div className="absolute bottom-4 right-4 md:bottom-10 md:right-10 text-right max-w-xs md:max-w-md z-20">
         <p className="text-[#F0F0F2] text-lg md:text-xl leading-relaxed border-r-4 border-[#855E42] pr-6 drop-shadow-md bg-[#141110]/40 backdrop-blur-md p-4 rounded-l-lg font-serif italic">
           "Donde la lógica del código robusto encuentra la poesía del diseño visual."
         </p>
      </div>
    </section>
  );
};

export default SectionOne;