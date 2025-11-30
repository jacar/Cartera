import React from 'react';
import { ExternalLink, Globe } from 'lucide-react';

const wordpressProjects = [
  {
    title: "Electricidad Puigcerdá",
    category: "Servicios Eléctricos",
    link: "https://www.electricidadpuigcerdaceretanes.com/",
    thumbnail:
      "https://www.webcincodev.com/blog/wp-content/uploads/2025/02/acacias-1-600x650-1.png",
    description:
      "Sitio web profesional para empresa de servicios eléctricos con sistema de citas y catálogo de servicios",
  },
  {
    title: "Constructivamente",
    category: "Constructora",
    link: "https://constructivamente.com/",
    thumbnail:
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs/a84a4b239371855.6927bcc8a8d10.png",
    description:
      "Sitio web corporativo para empresa constructora con portafolio de obras y servicios de ingeniería",
  },
  {
    title: "Balder IP",
    category: "Propiedad Intelectual",
    link: "https://balderip.com/",
    thumbnail:
      "https://www.webcincodev.com/blog/wp-content/uploads/2025/02/859-1152x1248-1.png",
    description:
      "Portal corporativo para firma de propiedad intelectual con sistema de gestión de casos",
  },
  {
    title: "Vet Legal",
    category: "Legal / Veterinaria",
    link: "https://www.vetlegal.com.co/",
    thumbnail:
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/a7de8e237893325.690a02fd5d772.png",
    description: "Soluciones legales especializadas para el sector veterinario y agropecuario",
  },
  {
    title: "GC Jobs y Ambiente",
    category: "Consultoría Ambiental",
    link: "https://www.gcjobrasyambiente.com/",
    thumbnail:
      "https://www.webcincodev.com/blog/wp-content/uploads/2025/02/cabas-jacome1-1256x1256-1.jpeg",
    description:
      "Portal de servicios ambientales con sistema de cotización en línea",
  },
  {
    title: "JL Stately Bulldogs",
    category: "Criadores",
    link: "https://jlstatelybulldogs.com/",
    thumbnail:
      "https://www.webcincodev.com/blog/wp-content/uploads/2025/02/jl-1152x1248-1.png",
    description: "Catálogo de mascotas con galería y sistema de reservas",
  },
  {
    title: "Consultorio La 78",
    category: "Salud / Odontología",
    link: "https://www.consultorioodontologicola78.com/",
    thumbnail:
      "https://www.webcincodev.com/blog/wp-content/uploads/2025/02/78-1152x1248-1.png",
    description: "Web médica con sistema de citas y expedientes digitales",
  },
  {
    title: "Arepas La Mejor",
    category: "Restaurante",
    link: "https://arepaslamejor.com/",
    thumbnail:
      "https://www.webcincodev.com/blog/wp-content/uploads/2025/02/Generador-QR-8.png",
    description: "Sitio web gastronómico con menú digital y pedidos en línea",
  },
  {
    title: "Legal Aid DC",
    category: "Servicios Legales",
    link: "https://www.legalaiddc.org/",
    thumbnail:
      "https://www.webcincodev.com/blog/wp-content/uploads/2025/02/legal-400x433-1.png",
    description:
      "Portal de servicios legales con recursos y formularios en línea",
  },
  {
    title: "Strong Mero Power",
    category: "E-commerce Audio",
    link: "http://strongmeropower.com/",
    thumbnail:
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/244235237894645.690a06fbd6436.png",
    description: "Tienda en línea de equipos de audio con carrito de compras",
  },
  {
    title: "La Lupa",
    category: "Agencia Fotografía / 3D",
    link: "https://lalupa.co/2024/",
    thumbnail:
      "https://www.webcincodev.com/blog/wp-content/uploads/2025/02/lupa-600x650-1.png",
    description:
      "Agencia creativa especializada en producción fotográfica, renderizado 3D y dirección de arte",
  },
  {
    title: "Podoclinic MD",
    category: "Salud / Podología",
    link: "https://www.podoclinicmd.com/",
    thumbnail:
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs/be7c96231948637.6892c358d0ab0.png",
    description:
      "Centro médico especializado con sistema de agendamiento y servicios clínicos",
  },
  {
    title: "Tabares Legal",
    category: "Servicios Legales",
    link: "https://www.tabareslegal.com/",
    thumbnail:
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs/398678231864773.6927bf4c57ba8.png",
    description:
      "Firma de abogados especializada con portafolio de servicios y blog jurídico",
  }
];

const SectionWordPress: React.FC = () => {
  return (
    <section className="section w-screen min-h-screen h-auto bg-[#F0F0F2] text-[#141110] flex flex-col items-center justify-center border-r border-[#3D2F28] shrink-0 relative overflow-hidden">
      
      {/* Texture Background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/white-diamond.png')] opacity-40 pointer-events-none"></div>

      <div className="w-full max-w-[90vw] md:max-w-7xl h-full flex flex-col py-8 md:py-20 z-10">
        
        {/* Header */}
        <div className="mb-10 px-4 md:px-0 flex flex-col md:flex-row md:items-end justify-between gap-6 shrink-0">
          <div>
            <h2 className="text-4xl md:text-6xl font-serif leading-none mb-2">
              Desarrollo <span className="text-[#855E42] italic">CMS</span>
            </h2>
            <p className="text-[#6B7176] text-sm md:text-base max-w-xl">
              Soluciones implementadas con WordPress y gestores de contenido. Enfoque en autogestión, SEO y escalabilidad comercial.
            </p>
          </div>
          <div className="hidden md:block">
             <span className="text-xs font-bold uppercase tracking-widest bg-[#141110] text-[#F0F0F2] px-3 py-1 rounded-full">
               {wordpressProjects.length} Proyectos Desplegados
             </span>
          </div>
        </div>

        {/* Grid Container */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-2 md:px-4 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wordpressProjects.map((project, index) => (
              <a 
                key={index}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-white border border-[#141110]/10 hover:border-[#855E42] transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-xl flex flex-col overflow-hidden h-[300px] md:h-[350px]"
              >
                {/* Image Container */}
                <div className="h-40 sm:h-48 md:h-56 overflow-hidden relative border-b border-[#141110]/5 bg-[#f5f5f5]">
                  <img 
                    src={project.thumbnail} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 bg-[#141110] text-[#F0F0F2] p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <ExternalLink size={16} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col justify-between flex-1 bg-white relative z-10">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#855E42] mb-1 block">
                      {project.category}
                    </span>
                    <h3 className="text-base font-serif font-bold text-[#141110] leading-tight mb-2 group-hover:text-[#855E42] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[#6B7176] line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
          
          <div className="h-10"></div> {/* Bottom Spacer */}
        </div>

      </div>
    </section>
  );
};

export default SectionWordPress;