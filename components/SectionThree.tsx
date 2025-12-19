import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  id: number;
  name: string;
  cat: string;
  img: string;
  gallery?: string[];
  projectUrl?: string;
  desc?: string;
}

const featuredProjects: Project[] = [
  {
    id: 1,
    name: "Kinnect",
    cat: "Plataforma Web",
    img: "https://www.webcincodev.com/blog/wp-content/uploads/2025/12/kinnect.gif",
    projectUrl: "https://kinnect-pro.vercel.app/",
    gallery: [
      "https://www.webcincodev.com/blog/wp-content/uploads/2025/12/kinnect.gif",
      "https://www.webcincodev.com/blog/wp-content/uploads/2025/12/6.png",
      "https://www.webcincodev.com/blog/wp-content/uploads/2025/12/2.png",
      "https://www.webcincodev.com/blog/wp-content/uploads/2025/12/4.png"
    ],
    desc: "Kinnect Pro es una plataforma web para crear y fortalecer conexiones familiares, organizar relaciones por parentesco y construir un espacio íntimo donde compartir historias, recuerdos y momentos importantes."
  },
  {
    id: 2,
    name: "Clipli",
    cat: "Herramientas Web",
    img: "https://www.webcincodev.com/blog/wp-content/uploads/2025/12/Macbook-Air-and-iPad-Pro-Showcase-Screens-psd-Mockup-scaled.png",
    projectUrl: "https://www.clipli.top/",
    gallery: [
      "https://www.webcincodev.com/blog/wp-content/uploads/2025/12/Macbook-Air-and-iPad-Pro-Showcase-Screens-psd-Mockup-scaled.png",
      "https://www.webcincodev.com/blog/wp-content/uploads/2025/12/biolink-1.png",
      "https://www.webcincodev.com/blog/wp-content/uploads/2025/12/biolink-.png",
      "https://www.webcincodev.com/blog/wp-content/uploads/2025/12/biolink-3.png",
      "https://www.webcincodev.com/blog/wp-content/uploads/2025/12/biolink-2.png"
    ],
    desc: "Plataforma de gestión de enlaces y biolinks."
  },
  {
    id: 3,
    name: "Diseño de Bobinas",
    cat: "React / Ingeniería",
    img: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/b34890231942605.689292498c877.png",
    projectUrl: "https://dise-o-de-bobinas.vercel.app/",
    gallery: ["https://mir-s3-cdn-cf.behance.net/project_modules/fs/b34890231942605.689292498c877.png"]
  },
  {
    id: 4,
    name: "Gratis Radio",
    cat: "Streaming / Multimedia",
    img: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/8e8578237892183.6909ff9910dd5.png",
    projectUrl: "https://www.gratisradio.com/",
    gallery: ["https://mir-s3-cdn-cf.behance.net/project_modules/fs/8e8578237892183.6909ff9910dd5.png"]
  },
  {
    id: 5,
    name: "Explorador Marvel",
    cat: "Next.js / API",
    img: "https://www.webcincodev.com/blog/wp-content/uploads/2025/03/peli.png",
    projectUrl: "https://webcinpeli.netlify.app/",
    gallery: ["https://www.webcincodev.com/blog/wp-content/uploads/2025/03/peli.png"]
  },
  {
    id: 6,
    name: "Portal Inlingua",
    cat: "Tecnología Educativa",
    img: "https://www.webcincodev.com/blog/wp-content/uploads/2025/03/inlingua.png",
    projectUrl: "https://inlingua.vercel.app/",
    gallery: ["https://www.webcincodev.com/blog/wp-content/uploads/2025/03/inlingua.png"]
  },
  {
    id: 7,
    name: "Sopa de Letras",
    cat: "Videojuegos / React",
    img: "https://www.webcincodev.com/blog/wp-content/uploads/2025/03/letra8.png",
    projectUrl: "https://misopadeletras-i73qab.vercel.app/",
    gallery: ["https://www.webcincodev.com/blog/wp-content/uploads/2025/03/letra8.png"]
  },
  {
    id: 8,
    name: "Generador Códigos QR",
    cat: "Herramientas Web",
    img: "https://www.webcincodev.com/blog/wp-content/uploads/2025/03/Mockup2.png",
    projectUrl: "https://www.webcincodev.com/qr/",
    gallery: ["https://www.webcincodev.com/blog/wp-content/uploads/2025/03/Mockup2.png"]
  },
  {
    id: 9,
    name: "Seguridad SafeWeb",
    cat: "Ciberseguridad",
    img: "https://www.webcincodev.com/blog/wp-content/uploads/2025/03/Mockup25.png",
    projectUrl: "https://safeweb5.vercel.app/",
    gallery: ["https://www.webcincodev.com/blog/wp-content/uploads/2025/03/Mockup25.png"]
  },
  {
    id: 10,
    name: "Traductor IA",
    cat: "Inteligencia Artificial",
    img: "https://www.webcincodev.com/blog/wp-content/uploads/2025/03/tra2.png",
    projectUrl: "https://traductorw5.netlify.app/",
    gallery: ["https://www.webcincodev.com/blog/wp-content/uploads/2025/03/tra2.png"]
  },
];

const archiveProjects: Project[] = [
  {
    id: 11,
    name: "Concepto Visual IA",
    cat: "UI Generativa",
    img: "https://www.webcincodev.com/blog/wp-content/uploads/2025/11/Gemini_Generated_Image_xyedd7xyedd7xyed-scaled.png",
    projectUrl: "#"
  },
  {
    id: 12,
    name: "Concepto Dashboard",
    cat: "UI Generativa",
    img: "https://www.webcincodev.com/blog/wp-content/uploads/2025/11/Gemini_Generated_Image_b7qat8b7qat8b7qa-scaled.png",
    projectUrl: "#"
  },
  {
    id: 13,
    name: "Rastrea Móvil",
    cat: "Next.js / Supabase",
    desc: "Sistema de Gestión de Flotas Integral",
    img: "https://www.webcincodev.com/blog/wp-content/uploads/2025/11/8.jpg",
    projectUrl: "https://jf-gps.vercel.app/"
  },
  {
    id: 14,
    name: "Corporación JF",
    cat: "Corporativo / Tecnología",
    desc: "Plataforma corporativa de servicios logísticos y tecnológicos",
    img: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/73526b236827197.68f3d1d29bad8.png",
    projectUrl: "https://corporacionjf.com/",
    gallery: [
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/73526b236827197.68f3d1d29bad8.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/bb44a2236827197.68f3d1d29aad8.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs/c71d7e236827197.68f94085f2e49.jpg"
    ]
  }
];

const SectionThree: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      // Tolerance to ensure we catch the boundary conditions
      const tolerance = 1;
      const isAtTop = scrollTop <= tolerance;
      const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) <= tolerance;

      // Determine if we WANT to scroll in the requested direction
      const tryingToScrollDown = e.deltaY > 0;
      const tryingToScrollUp = e.deltaY < 0;

      const canScrollDown = tryingToScrollDown && !isAtBottom;
      const canScrollUp = tryingToScrollUp && !isAtTop;

      if (canScrollDown || canScrollUp) {
        // FORCE MANUAL SCROLL
        // We stop propagation to prevent App.tsx from handling it
        e.stopPropagation();
        // We prevent default to stop browser from doing anything weird (or doing nothing)
        e.preventDefault();

        // Manually move the scroll
        container.scrollTop += e.deltaY;
      }
      // If we are at the edge, we do NOTHING. We let the event bubble up.
      // App.tsx's window listener will catch it and switch sections.
    };

    // Add non-passive listener to control propagation and default
    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  const openGallery = (project: Project) => {
    setSelectedProject(project);
    setCurrentSlide(0);
    setDirection(0);
  };

  const closeGallery = () => {
    setSelectedProject(null);
    setCurrentSlide(0);
    setDirection(0);
  };

  const nextSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedProject?.gallery) return;
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % selectedProject.gallery!.length);
  };

  const prevSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedProject?.gallery) return;
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + selectedProject.gallery!.length) % selectedProject.gallery!.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedProject) return;
      if (e.key === 'Escape') closeGallery();
      if (selectedProject.gallery && selectedProject.gallery.length > 1) {
        if (e.key === 'ArrowRight') {
          setDirection(1);
          setCurrentSlide((prev) => (prev + 1) % selectedProject.gallery!.length);
        }
        if (e.key === 'ArrowLeft') {
          setDirection(-1);
          setCurrentSlide((prev) => (prev - 1 + selectedProject.gallery!.length) % selectedProject.gallery!.length);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  return (
    <div className="min-h-screen h-auto w-screen flex flex-col md:flex-row bg-[#141110] text-[#F0F0F2] border-r border-[#3D2F28] shrink-0 relative overflow-hidden">

      {/* 1. Sticky Title Column (Left Side Desktop / Top Mobile) */}
      <div className="w-full md:w-[25vw] h-[25vh] md:h-full flex flex-col justify-center px-6 md:px-12 border-b md:border-b-0 md:border-r border-[#3D2F28] bg-[#141110] z-10 shrink-0">
        <div className="border-l-4 border-[#855E42] pl-6">
          <h2 className="text-2xl sm:text-3xl md:text-6xl font-serif leading-tight">
            Trabajos <br />
            <span className="text-[#855E42] italic">Selectos</span>
          </h2>
          {/* Desktop Description */}
          <p className="mt-6 text-[#6B7176] text-sm md:text-base leading-relaxed hidden md:block">
            Una selección curada de aplicaciones web y experiencias digitales. <br /><br />
            <span className="text-xs uppercase tracking-widest text-[#F0F0F2] opacity-50 block mt-2">
              ↓ Scroll Vertical para ver proyectos
            </span>
          </p>
          {/* Mobile Description */}
          <p className="mt-2 text-[#6B7176] text-xs leading-relaxed md:hidden block">
            Selección de proyectos digitales. <br />
            <span className="opacity-50">↓ Desliza hacia abajo</span>
          </p>
        </div>
      </div>

      {/* 2. Vertical Scrollable Content Area (Right Side Desktop / Bottom Mobile) */}
      <div
        ref={scrollContainerRef}
        id="vertical-scroll-area"
        className="flex-1 w-full h-[75vh] md:h-screen overflow-y-auto overflow-x-hidden bg-[#141110] relative custom-scrollbar"
      >
        <div className="flex flex-col">
          {/* Featured Projects List */}
          {featuredProjects.map((p) => (
            <div
              key={p.id}
              className="w-full min-h-[40vh] sm:min-h-[50vh] md:min-h-[90vh] flex flex-col md:flex-row border-b border-[#3D2F28] group relative cursor-pointer"
              onClick={() => openGallery(p)}
            >
              {/* Project Image */}
              <div className="flex-1 overflow-hidden relative border-r border-[#3D2F28] bg-[#1e1b1a]">
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#141110]/20 group-hover:bg-transparent transition-colors"></div>
                <div className="absolute top-6 left-6 z-10">
                  <span className="font-mono text-xs text-[#F0F0F2] bg-[#141110] px-2 py-1 rounded">0{p.id}</span>
                </div>
              </div>

              {/* Project Info */}
              <div className="w-full md:w-[30%] p-6 md:p-8 flex flex-col justify-between bg-[#141110] group-hover:bg-[#1e1b1a] transition-colors h-auto md:h-auto">
                <div>
                  <span className="text-[#855E42] text-xs font-bold uppercase tracking-widest mb-2 block">{p.cat}</span>
                  <h3 className="text-2xl md:text-3xl font-serif group-hover:text-[#855E42] transition-colors">{p.name}</h3>
                </div>

                <div className="flex justify-between items-end mt-4 md:mt-0">
                  <span className="text-[#6B7176] text-xs sm:text-sm">Ver Detalles</span>
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#3D2F28] flex items-center justify-center group-hover:bg-[#855E42] group-hover:text-[#F0F0F2] group-hover:border-[#855E42] transition-all">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Archive Section Footer */}
          <div className="p-8 md:p-16 bg-[#0f0d0c] min-h-[50vh]">
            <h3 className="text-3xl font-serif text-[#6B7176] mb-8 border-b border-[#3D2F28] pb-4">Aplicaciones Web Front y Backend</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {archiveProjects.map((p) => (
                <a
                  key={p.id}
                  href={p.projectUrl !== '#' ? p.projectUrl : undefined}
                  target={p.projectUrl !== '#' ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={`block group relative overflow-hidden border border-[#3D2F28] bg-[#1e1b1a] ${p.projectUrl !== '#' ? 'cursor-pointer' : 'cursor-default'}`}
                >
                  <div className="h-48 overflow-hidden relative">
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0" />
                    {p.projectUrl !== '#' && (
                      <div className="absolute top-3 right-3 bg-[#141110] text-[#F0F0F2] p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink size={14} />
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-xs uppercase text-[#855E42] font-bold mb-1 tracking-wider">{p.cat}</p>
                    <h4 className="text-lg font-serif text-[#F0F0F2] group-hover:text-[#855E42] transition-colors">{p.name}</h4>
                    {p.desc && <p className="text-xs text-[#6B7176] mt-2 line-clamp-2">{p.desc}</p>}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Spacer to allow clean scroll out */}
          <div className="h-20 bg-[#141110] flex items-center justify-center text-[#6B7176] text-xs uppercase tracking-widest">
            Fin de la sección
          </div>
        </div>
      </div>

      {/* Gallery Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[60] bg-[#141110]/95 backdrop-blur-md flex flex-col justify-center items-center animate-in fade-in duration-300">

          <button onClick={closeGallery} className="absolute top-6 right-6 text-[#F0F0F2] hover:text-[#855E42] p-2 z-50">
            <X size={32} />
          </button>

          <div className="w-full h-full flex flex-col md:flex-row">
            <div className="flex-1 relative flex items-center justify-center p-4 md:p-8">
              {selectedProject.gallery && selectedProject.gallery.length > 1 && (
                <button onClick={prevSlide} className="absolute left-4 z-50 p-2 bg-[#141110]/50 rounded-full hover:bg-[#855E42] text-white"><ChevronLeft /></button>
              )}

              <AnimatePresence mode="wait" custom={direction}>
                <motion.img
                  key={currentSlide}
                  src={selectedProject.gallery ? selectedProject.gallery[currentSlide] : selectedProject.img}
                  alt={selectedProject.name}
                  className="max-h-[40vh] sm:max-h-[60vh] md:max-h-[80vh] max-w-full object-contain shadow-2xl"

                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                />
              </AnimatePresence>

              {selectedProject.gallery && selectedProject.gallery.length > 1 && (
                <button onClick={nextSlide} className="absolute right-2 z-50 p-2 bg-[#141110]/50 rounded-full hover:bg-[#855E42] text-white"><ChevronRight /></button>
              )}
            </div>

            <div className="w-full md:w-96 bg-[#1e1b1a] border-l border-[#3D2F28] p-8 flex flex-col justify-center">
              <span className="text-[#855E42] text-xs font-bold uppercase tracking-widest mb-2">{selectedProject.cat}</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-6">{selectedProject.name}</h2>
              <p className="text-[#6B7176] mb-8 leading-relaxed text-sm md:text-base">
                {selectedProject.desc || "Proyecto desarrollado con enfoque en usabilidad e impacto visual."}
              </p>
              {selectedProject.projectUrl && selectedProject.projectUrl !== '#' && (
                <a
                  href={selectedProject.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#855E42] text-[#F0F0F2] py-4 px-6 rounded text-center font-bold uppercase tracking-widest hover:bg-[#F0F0F2] hover:text-[#141110] transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  Ver Proyecto <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionThree;