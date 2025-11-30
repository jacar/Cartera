import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Database, 
  Layout, 
  Server, 
  GitBranch, 
  Terminal, 
  PenTool, 
  Image, 
  Figma, 
  Cpu, 
  Globe, 
  Box,
  Layers
} from 'lucide-react';

const devStack = [
  { name: 'WordPress', icon: <Globe />, type: 'CMS' },
  { name: 'Next.js', icon: <Code2 />, type: 'Framework' },
  { name: 'React', icon: <Cpu />, type: 'Library' },
  { name: 'Astro', icon: <Layout />, type: 'Framework' },
  { name: 'HTML/CSS', icon: <Layers />, type: 'Core' },
  { name: 'JavaScript', icon: <Terminal />, type: 'Language' },
  { name: 'Vercel', icon: <Server />, type: 'Deploy' },
  { name: 'Netlify', icon: <Box />, type: 'Deploy' },
  { name: 'Git', icon: <GitBranch />, type: 'Version Control' },
  { name: 'VS Code', icon: <Terminal />, type: 'IDE' },
];

const designStack = [
  { name: 'Illustrator', icon: <PenTool />, type: 'Vector' },
  { name: 'Photoshop', icon: <Image />, type: 'Raster' },
  { name: 'Figma', icon: <Figma />, type: 'UI/UX' },
];

const SectionTechStack: React.FC = () => {
  return (
    <section className="section w-screen min-h-screen h-auto bg-[#0f0d0c] text-[#F0F0F2] flex flex-col items-center justify-center relative overflow-hidden border-r border-[#3D2F28] shrink-0">
      
      {/* Background Grid Animation */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#855E421a_1px,transparent_1px),linear-gradient(to_bottom,#855E421a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="w-full max-w-7xl px-6 md:px-12 z-10 h-full flex flex-col justify-center">
        
        {/* Header */}
        <div className="mb-12 md:mb-16 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-7xl font-serif mb-2 md:mb-4">
              Tecnologías <span className="text-[#855E42] italic">&</span> <br/>
              <span className="text-transparent text-stroke-1 md:text-stroke-2 stroke-[#F0F0F2]">Herramientas</span>
            </h2>
            <p className="text-[#6B7176] max-w-full text-xs sm:text-sm md:text-lg leading-relaxed border-l-2 border-[#855E42] pl-4 mt-4 md:mt-6">
              Dominio de las últimas tecnologías y herramientas para crear experiencias digitales excepcionales. Un stack moderno para resultados robustos.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 h-auto md:h-[60vh] overflow-y-visible md:overflow-y-auto custom-scrollbar pr-0 md:pr-2">
          
          {/* Column: Web Development */}
          <div className="lg:col-span-8">
            <h3 className="text-lg sm:text-xl font-bold uppercase tracking-widest text-[#855E42] mb-4 md:mb-6 flex items-center gap-2">
              <Code2 size={20} /> Desarrollo Web
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {devStack.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ 
                    scale: 1.05, 
                    backgroundColor: 'rgba(133, 94, 66, 0.1)',
                    borderColor: '#855E42',
                  }}
                  animate={{
                    y: [0, -5, 0], // Floating animation
                  }}
                  transition={{
                    y: {
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: Math.random() * 2
                    },
                    default: { duration: 0.2 }
                  }}
                  className="bg-[#1e1b1a] border border-[#3D2F28] p-4 md:p-6 rounded flex flex-col items-center justify-center text-center gap-3 cursor-default group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#855E42]/0 via-[#855E42]/0 to-[#855E42]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="text-[#F0F0F2] group-hover:text-[#855E42] transition-colors duration-300">
                    {tech.icon}
                  </div>
                  <div>
                    <span className="block font-bold text-sm md:text-base">{tech.name}</span>
                    <span className="text-[10px] text-[#6B7176] uppercase tracking-wider">{tech.type}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Column: Design */}
          <div className="lg:col-span-4">
            <h3 className="text-lg sm:text-xl font-bold uppercase tracking-widest text-[#855E42] mb-4 md:mb-6 flex items-center gap-2">
              <PenTool size={20} /> Diseño
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {designStack.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={{ 
                    x: 10,
                    backgroundColor: 'rgba(133, 94, 66, 0.1)',
                    borderColor: '#855E42' 
                  }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#1e1b1a] border border-[#3D2F28] p-4 md:p-6 rounded flex items-center gap-4 cursor-default group"
                >
                  <div className="p-3 bg-[#141110] rounded-full text-[#F0F0F2] group-hover:text-[#855E42] transition-colors">
                    {tech.icon}
                  </div>
                  <div>
                    <span className="block font-bold text-lg">{tech.name}</span>
                    <span className="text-xs text-[#6B7176] uppercase tracking-wider">Herramienta Creativa</span>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Decorative Tech Element */}
            <div className="mt-8 border-t border-[#3D2F28] pt-8 opacity-50">
                <div className="font-mono text-[10px] text-[#6B7176] space-y-2">
                    <p>Icializando entorno creativo...</p>
                    <p>{'>'} Cargando dependencias...</p>
                    <p>{'>'} <span className="text-[#25D366]">Sistema Optimizado v2.5</span></p>
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SectionTechStack;