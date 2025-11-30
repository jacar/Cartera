import React from 'react';
import { ExternalLink, Palette } from 'lucide-react';

const graphicImages = [
  "https://pre-built-images.s3.amazonaws.com/webapp-uploads/322c7210b70eccb1e33e4f51cfbe35d4.jpg",
  "https://pre-built-images.s3.amazonaws.com/webapp-uploads/8997510725c0a1d56914bf7ecb87d6a3.png",
  "https://pre-built-images.s3.amazonaws.com/webapp-uploads/bfda40ff333c6b9e25b4652a9c4eec8e.jpg"
];

const SectionGraphicDesign: React.FC = () => {
  return (
    <section className="section w-screen min-h-screen h-auto bg-[#141110] text-[#F0F0F2] flex flex-col items-center justify-center border-r border-[#3D2F28] shrink-0 relative overflow-hidden">
      
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] opacity-30 pointer-events-none"></div>

      <div className="w-full max-w-7xl px-6 md:px-12 h-full flex flex-col py-12 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12 border-b border-[#3D2F28] pb-6 shrink-0">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif leading-none mb-2">
              Diseño <span className="text-[#855E42] italic">Gráfico</span>
            </h2>
            <p className="text-[#6B7176] text-sm md:text-base max-w-xl">
              Identidad visual, branding y dirección de arte. Una exploración estética más allá del código.
            </p>
          </div>
          
          <a
            href="https://www.behance.net/webcincovalle"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 bg-[#855E42] text-[#F0F0F2] px-6 py-3 rounded-sm font-bold uppercase text-xs tracking-widest hover:bg-[#F0F0F2] hover:text-[#141110] transition-colors shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
          >
            Ver Portafolio Behance <ExternalLink size={16} />
          </a>
        </div>

        {/* Gallery Grid */}
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 h-auto min-h-0">
            {graphicImages.map((img, idx) => (
              <div 
                key={idx} 
                className="group relative overflow-hidden border border-[#3D2F28] bg-[#1e1b1a] h-full min-h-[400px]"
              >
                <img
                  src={img}
                  alt={`Diseño Gráfico ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141110] to-transparent opacity-60 group-hover:opacity-30 transition-opacity"></div>
                
                {/* Overlay Icon */}
                <div className="absolute top-4 right-4 bg-[#141110]/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 text-[#855E42]">
                  <Palette size={20} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile CTA */}
        <div className="md:hidden mt-4 shrink-0">
           <a
            href="https://www.behance.net/webcincovalle"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 bg-[#855E42] text-[#F0F0F2] px-6 py-4 rounded-sm font-bold uppercase text-xs tracking-widest"
          >
            Ver más en Behance <ExternalLink size={16} />
          </a>
        </div>

      </div>
    </section>
  );
};

export default SectionGraphicDesign;