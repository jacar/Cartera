import React, { useState } from 'react';
import { Menu, X, Github, Linkedin, FileText } from 'lucide-react';

interface NavigationProps {
  currentSection: number;
  onNavigate: (index: number) => void;
  sections: string[];
}

// Custom Behance Icon (Filled style to match brand identity)


const Navigation: React.FC<NavigationProps> = ({ currentSection, onNavigate, sections }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-6 text-white pointer-events-none">
        <div 
          className="flex items-center gap-2 pointer-events-auto cursor-pointer group"
          onClick={() => setIsMenuOpen(true)}
        >
          <div className="bg-white text-[#141110] p-2 rounded-full transition-transform group-hover:scale-110">
            <Menu size={20} />
          </div>
          <span className="font-bold tracking-widest text-sm hidden md:block text-white shadow-sm">MENÚ</span>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block pointer-events-auto">
          {/* Added brightness-0 invert filter to ensure logo is white */}
          <img 
            src="https://www.webcincodev.com/blog/wp-content/uploads/2025/11/Logo-1.svg" 
            alt="Armando Ovalle J." 
            className="h-24 w-auto object-contain hover:scale-105 transition-transform duration-300 drop-shadow-lg filter brightness-0 invert"
          />
        </div>

        <div className="flex gap-4 pointer-events-auto items-center">
          <a 
            href="https://github.com/jacar" 
            target="_blank" 
            rel="noopener noreferrer"
            title="GitHub"
            className="text-white hover:text-[#855E42] hover:scale-110 transition-all duration-300 drop-shadow-md"
          >
            <Github size={20} />
          </a>
          <a 
            href="https://www.behance.net/webcincovalle" 
            target="_blank" 
            rel="noopener noreferrer"
            title="Behance"
            className="text-white hover:text-[#855E42] hover:scale-110 transition-all duration-300 drop-shadow-md"
          >
            <i className="fa-brands fa-behance"></i>
          </a>
          <a 
            href="https://www.linkedin.com/in/webcincodev/" 
            target="_blank" 
            rel="noopener noreferrer"
            title="LinkedIn"
            className="text-white hover:text-[#855E42] hover:scale-110 transition-all duration-300 drop-shadow-md"
          >
            <Linkedin size={20} />
          </a>
          <a 
            href="https://www.webcincodev.com/blog/" 
            target="_blank" 
            rel="noopener noreferrer"
            title="Blog"
            className="text-white hover:text-[#855E42] hover:scale-110 transition-all duration-300 drop-shadow-md"
          >
            <FileText size={20} />
          </a>
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#141110]/95 backdrop-blur-xl flex flex-col items-center justify-center animate-in fade-in duration-200 pointer-events-auto">
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 left-6 flex items-center gap-2 group text-[#F0F0F2] hover:text-[#855E42] transition-colors"
          >
            <div className="bg-[#F0F0F2] text-[#141110] p-2 rounded-full transition-transform group-hover:scale-110">
              <X size={20} />
            </div>
            <span className="font-bold tracking-widest text-sm">CERRAR</span>
          </button>

          <div className="flex flex-col items-center gap-4 md:gap-6">
            {sections.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onNavigate(idx);
                  setIsMenuOpen(false);
                }}
                className={`text-3xl md:text-5xl font-serif transition-all duration-300 hover:scale-110 ${
                  currentSection === idx 
                  ? 'text-[#855E42] italic' 
                  : 'text-[#F0F0F2] hover:text-[#855E42]'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;