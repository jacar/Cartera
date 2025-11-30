import React from 'react';

interface BiolinkExample {
  id: number;
  name: string;
  category: string;
  image: string;
  description: string;
  price: number;
  link: string;
}

const biolinkExamples: BiolinkExample[] = [
  {
    id: 1,
    name: "Influencer Digital",
    category: "Influencers",
    image: "https://via.placeholder.com/150/FF69B4/FFFFFF?text=Influencer", // Rosa vibrante
    description: "Ideal para creadores de contenido, modelos y figuras públicas. Centraliza tus redes, colaboraciones y contenido exclusivo.",
    price: 900,
    link: "#"
  },
  {
    id: 2,
    name: "Pequeña Empresa / Emprendedor",
    category: "Negocios",
    image: "https://via.placeholder.com/150/32CD32/FFFFFF?text=Negocio", // Verde lima
    description: "Muestra tus productos, servicios, horarios y contacto en un solo lugar. Perfecto para negocios locales.",
    price: 930,
    link: "#"
  },
  {
    id: 3,
    name: "Artista / Músico",
    category: "Creativos",
    image: "https://via.placeholder.com/150/8A2BE2/FFFFFF?text=M%C3%BAsica", // Azul-violeta
    description: "Comparte tu portafolio, enlaces a plataformas de streaming, fechas de eventos y tienda de merchandising.",
    price: 910,
    link: "#"
  },
  {
    id: 4,
    name: "Profesional Independiente",
    category: "Servicios",
    image: "https://via.placeholder.com/150/1E90FF/FFFFFF?text=Profesional", // Azul dodger
    description: "Presenta tus servicios, testimonios, agenda de citas y contacto profesional de manera efectiva.",
    price: 940,
    link: "#"
  },
  {
    id: 5,
    name: "Organización sin Fines de Lucro",
    category: "ONGs",
    image: "https://via.placeholder.com/150/FF4500/FFFFFF?text=ONG", // Naranja rojizo
    description: "Difunde tu misión, proyectos, formas de donar y eventos. Conecta con tu comunidad y voluntarios.",
    price: 960,
    link: "#"
  },
  {
    id: 6,
    name: "Restaurante / Cafetería",
    category: "Gastronomía",
    image: "https://via.placeholder.com/150/FF8C00/FFFFFF?text=Comida", // Naranja oscuro
    description: "Muestra tu menú, reservas, promociones especiales y ubicación. Atrae a más clientes a tu local.",
    price: 930,
    link: "#"
  },
  {
    id: 7,
    name: "Hotel Boutique",
    category: "Hotelería",
    image: "https://via.placeholder.com/150/FFD700/000000?text=Hotel", // Dorado
    description: "Ideal para hoteles y alojamientos. Muestra tus habitaciones, servicios, galería de fotos y sistema de reservas.",
    price: 950,
    link: "#"
  },
  {
    id: 8,
    name: "Músico / Banda",
    category: "Música",
    image: "https://via.placeholder.com/150/8A2BE2/FFFFFF?text=M%C3%BAsica", // Azul-violeta
    description: "Comparte tu música, videos, fechas de conciertos, enlaces a plataformas de streaming y venta de merchandising.",
    price: 920,
    link: "#"
  },
  {
    id: 9,
    name: "Emprendedor Digital",
    category: "Emprendimiento",
    image: "https://via.placeholder.com/150/00CED1/FFFFFF?text=Emprende", // Cian oscuro
    description: "Lanza tu proyecto, presenta tu idea, capta leads y dirige tráfico a tus plataformas clave. Ideal para startups.",
    price: 980,
    link: "#"
  }
];

const SectionBiolinks: React.FC = () => {

  const sendBiolinkToWhatsApp = (biolink: BiolinkExample) => {
    const message = `Hola Armando, estoy interesado en el biolink para ${biolink.name} (${biolink.category}).\n\n*Detalles del Biolink:*\n- Descripción: ${biolink.description}\n- Precio Estimado: $${biolink.price} USD\n- Incluye:\n  - Dominio Personalizado: 300 mil pesos\n  - Hosting: 600 mil pesos\n\nMe gustaría obtener más información y agendar una reunión para discutir este proyecto.`;
    window.open(`https://wa.me/573052891719?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen h-auto w-screen flex flex-col md:flex-row bg-[#141110] text-[#F0F0F2] border-r border-[#3D2F28] shrink-0 relative overflow-hidden">
      {/* 1. Sticky Title Column (Left Side Desktop / Top Mobile) */}
      <div className="w-full md:w-[25vw] h-[25vh] md:h-full flex flex-col justify-center px-6 md:px-12 border-b md:border-b-0 md:border-r border-[#3D2F28] bg-[#141110] z-10 shrink-0">
        <div className="border-l-4 border-[#855E42] pl-6">
          <h2 className="text-2xl sm:text-3xl md:text-6xl font-serif leading-tight">
            Biolinks <br />
            <span className="text-[#855E42] italic">Ejemplos</span>
          </h2>
          {/* Desktop Description */}
          <p className="mt-6 text-[#6B7176] text-sm md:text-base leading-relaxed hidden md:block">
            Descubre cómo un biolink personalizado puede potenciar tu presencia digital. Ejemplos adaptados a diferentes rubros.
          </p>
        </div>
      </div>

      {/* 2. Content Area (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-6 md:p-12">
        <div className="md:hidden border-l-4 border-[#855E42] pl-6 mb-8">
          <p className="text-[#6B7176] text-sm leading-relaxed">
            Descubre cómo un biolink personalizado puede potenciar tu presencia digital. Ejemplos adaptados a diferentes rubros.
          </p>
        </div>
        
        {/* Aquí irá la cuadrícula de ejemplos de biolinks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {biolinkExamples.map((biolink) => (
            <div key={biolink.id} className="bg-[#1C1917] rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
              <img src={biolink.image} alt={biolink.name} className="w-32 h-32 rounded-full mb-4 object-cover"/>
              <h3 className="text-xl font-semibold text-[#F0F0F2] mb-2">{biolink.name}</h3>
              <p className="text-[#6B7176] text-sm mb-4">
                {biolink.description}
              </p>
              <p className="text-[#F0F0F2] text-lg font-bold mb-4">Desde ${biolink.price}</p>
              <button 
                onClick={() => sendBiolinkToWhatsApp(biolink)}
                className="bg-[#855E42] hover:bg-[#A07B5B] text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out">
                Comprar ahora
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionBiolinks;
