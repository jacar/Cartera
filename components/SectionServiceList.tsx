import React from 'react';
import { 
  LayoutTemplate, 
  Code2, 
  Palette, 
  Smartphone, 
  Search, 
  ShoppingCart, 
  RefreshCw, 
  Zap, 
  Share2, 
  MessageSquare, 
  Megaphone, 
  Feather 
} from 'lucide-react';

const services = [
  {
    title: "Desarrollo WordPress",
    desc: "Creación y mantenimiento de sitios WordPress personalizados y optimizados.",
    icon: <LayoutTemplate size={24} />
  },
  {
    title: "Desarrollo Web",
    desc: "Desarrollo de aplicaciones web modernas con las últimas tecnologías.",
    icon: <Code2 size={24} />
  },
  {
    title: "Diseño UI/UX",
    desc: "Diseño de interfaces intuitivas y experiencias de usuario excepcionales.",
    icon: <Palette size={24} />
  },
  {
    title: "Diseño Responsive",
    desc: "Sitios web adaptables a todos los dispositivos y pantallas.",
    icon: <Smartphone size={24} />
  },
  {
    title: "SEO",
    desc: "Optimización para motores de búsqueda y mejora de visibilidad online.",
    icon: <Search size={24} />
  },
  {
    title: "E-commerce",
    desc: "Desarrollo de tiendas online con WooCommerce y otras plataformas.",
    icon: <ShoppingCart size={24} />
  },
  {
    title: "Mantenimiento",
    desc: "Servicios de mantenimiento y actualización continua de sitios web.",
    icon: <RefreshCw size={24} />
  },
  {
    title: "Optimización",
    desc: "Mejora del rendimiento y velocidad de carga de sitios web.",
    icon: <Zap size={24} />
  },
  {
    title: "Contenido Redes",
    desc: "Creación y gestión de contenido estratégico para redes sociales.",
    icon: <Share2 size={24} />
  },
  {
    title: "Asesoría Digital",
    desc: "Consultoría estratégica para optimizar tu presencia online.",
    icon: <MessageSquare size={24} />
  },
  {
    title: "Marketing Digital",
    desc: "Estrategias efectivas para alcanzar y convertir tu audiencia objetivo.",
    icon: <Megaphone size={24} />
  },
  {
    title: "Branding y Logos",
    desc: "Diseño de identidad de marca y logotipos que destacan tu negocio.",
    icon: <Feather size={24} />
  }
];

const SectionServiceList: React.FC = () => {
  return (
    <section className="section w-screen min-h-screen h-auto bg-[#141110] text-[#F0F0F2] flex flex-col justify-center items-center border-r border-[#3D2F28] shrink-0 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#855E42] rounded-full filter blur-[100px] opacity-10"></div>
      
      <div className="w-full max-w-7xl px-6 md:px-12 h-full flex flex-col justify-center py-8 md:py-12">
        
        {/* Header Section */}
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif mb-2 md:mb-4">
            Catálogo de <span className="text-[#855E42] italic">Servicios</span>
          </h2>
          <p className="text-[#6B7176] max-w-2xl text-xs sm:text-sm md:text-base md:ml-1 leading-relaxed">
            Ofrezco una gama completa de servicios de desarrollo y diseño web para ayudar a tu negocio a destacar en el mundo digital.
          </p>
        </div>

        {/* Services Grid - Scrollable on mobile, fitted on desktop */}
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 md:pr-4 pb-8 md:pb-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-20 md:pb-0">
            {services.map((item, index) => (
              <div 
                key={index} 
                className="group p-6 border border-[#3D2F28] bg-[#1e1b1a]/50 backdrop-blur-sm hover:bg-[#855E42] hover:border-[#855E42] transition-all duration-300 flex flex-col gap-4 rounded-sm"
              >
                <div className="text-[#855E42] group-hover:text-[#141110] transition-colors">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold font-serif mb-2 text-[#F0F0F2] group-hover:text-[#141110] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#6B7176] group-hover:text-[#141110]/80 leading-relaxed transition-colors">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default SectionServiceList;