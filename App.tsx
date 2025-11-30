import React, { useRef, useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import SectionOne from './components/SectionOne';
import SectionTwo from './components/SectionTwo';
import SectionAbout from './components/SectionAbout';
import SectionServices from './components/SectionServices';
import SectionServiceList from './components/SectionServiceList';
import SectionTechStack from './components/SectionTechStack';
import SectionThree from './components/SectionThree';
import SectionWordPress from './components/SectionWordPress';
import SectionGraphicDesign from './components/SectionGraphicDesign';
import SectionContact from './components/SectionContact';

import FooterSection from './components/FooterSection';
import ChatWidget from './components/ChatWidget';
import FastResponseWidget from './components/FastResponseWidget';

const SECTIONS = ['Inicio', 'Filosofía', 'Perfil', 'Expertise', 'Catálogo', 'Stack', 'Trabajos', 'CMS', 'Diseño', 'Contacto', 'Cotizador Web'];

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Ref for the main horizontal container
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Refs for navigation to scroll to specific elements
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // Physics State
  const targetScroll = useRef(0);
  const currentScroll = useRef(0);

  // Drag State
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);

  // 1. Wheel Event Listener (The Engine)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isMobile) return; // Disable wheel event on mobile

      const container = scrollContainerRef.current;
      if (!container) return;

      // If the event reaches here, it means it wasn't stopped by a child component
      // (like SectionThree). So we should handle the global horizontal scroll.

      e.preventDefault(); // Stop native vertical scroll on main body

      const maxScroll = container.scrollWidth - window.innerWidth;

      // Map vertical wheel (deltaY) to horizontal target (targetScroll)
      targetScroll.current += e.deltaY * 2.5;

      // Clamp values
      targetScroll.current = Math.max(0, Math.min(targetScroll.current, maxScroll));
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isMobile]);

  // 2. Animation Loop (The Smoothness)
  useEffect(() => {
    let animationFrameId: number;

    const updateScroll = () => {
      // Linear Interpolation (Lerp) for inertia
      // If dragging, we want instantaneous response (no lerp lag), otherwise smooth
      const friction = isDragging.current ? 0.5 : 0.08;

      currentScroll.current += (targetScroll.current - currentScroll.current) * friction;

      if (scrollContainerRef.current) {
        if (!isMobile) {
          scrollContainerRef.current.scrollLeft = currentScroll.current;
        }

        // Update Active Section Indicator logic
        const centerPoint = isMobile ? currentScroll.current + window.innerHeight / 2 : currentScroll.current + window.innerWidth / 2;

        sectionRefs.current.forEach((sec, idx) => {
          if (sec) {
            const offset = isMobile ? sec.offsetTop : sec.offsetLeft;
            const size = isMobile ? sec.offsetHeight : sec.offsetWidth;
            if (centerPoint >= offset && centerPoint < offset + size) {
              setCurrentSection(idx);
            }
          }
        });
      }

      animationFrameId = requestAnimationFrame(updateScroll);
    };

    updateScroll();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isMobile]);

  // 3. Navigation Click Handler
  const scrollToSection = (index: number) => {
    const section = sectionRefs.current[index];
    if (section) {
      if (isMobile) {
        section.scrollIntoView({ behavior: 'smooth' });
      } else {
        targetScroll.current = section.offsetLeft;
      }
    }
  };

  // 4. Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    // Prevent drag if clicking on interactive elements OR vertical scroll areas
    if ((e.target as HTMLElement).closest('button, input, textarea, a, .pointer-events-auto, .overflow-y-auto, #vertical-scroll-area')) return;

    isDragging.current = true;
    startX.current = e.pageX;
    startScrollLeft.current = targetScroll.current;

    document.body.classList.add('cursor-grabbing');
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollContainerRef.current) return;
    e.preventDefault();

    const x = e.pageX;
    const walk = (x - startX.current) * 2; // Scroll-fast multiplier
    const maxScroll = scrollContainerRef.current.scrollWidth - window.innerWidth;

    targetScroll.current = Math.max(0, Math.min(startScrollLeft.current - walk, maxScroll));
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.body.classList.remove('cursor-grabbing');
  };

  const handleMouseLeave = () => {
    if (isMobile) return; // Disable drag on mobile
    isDragging.current = false;
    document.body.classList.remove('cursor-grabbing');
  };

  return (
    <main
      className={`bg-[#141110] relative ${isMobile ? 'overflow-y-auto h-auto w-full' : 'overflow-hidden h-screen w-screen cursor-grab active:cursor-grabbing'}`}
      {...(!isMobile && {
        onMouseDown: handleMouseDown,
        onMouseMove: handleMouseMove,
        onMouseUp: handleMouseUp,
        onMouseLeave: handleMouseLeave,
      })}>
      <Navigation
        currentSection={currentSection}
        onNavigate={scrollToSection}
        sections={SECTIONS}
      />

      {/* Bottom Navigation Indicators (Horizontal Layout friendly) */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 hidden md:flex gap-4 mix-blend-difference text-[#F0F0F2] pointer-events-auto">
        {SECTIONS.map((label, idx) => (
          <button
            key={idx}
            onClick={() => scrollToSection(idx)}
            className="group flex flex-col items-center gap-2 focus:outline-none"
          >
            <div className={`w-1 h-1 rounded-full transition-all duration-300 ${currentSection === idx ? 'bg-[#855E42] scale-150' : 'bg-[#F0F0F2] opacity-50 group-hover:opacity-100'}`}></div>
            <span className={`text-[9px] uppercase tracking-widest transition-all duration-300 ${currentSection === idx ? 'opacity-100 font-bold -translate-y-1' : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'}`}>
              {label}
            </span>
          </button>
        ))}
      </div>

      {/* Main Horizontal Scroll Container */}
      <div ref={scrollContainerRef} className={`horizontal-scroll-container ${isMobile ? 'flex-col h-auto w-full overflow-y-auto overflow-x-hidden' : 'flex-row h-screen w-screen overflow-x-hidden overflow-y-hidden'}`}>
        {/* We use specific components but ensure they are wrapped to capture refs safely */}
        <div ref={(el) => { sectionRefs.current[0] = el; }}><SectionOne /></div>
        <div ref={(el) => { sectionRefs.current[1] = el; }}><SectionTwo /></div>
        <div ref={(el) => { sectionRefs.current[2] = el; }}><SectionAbout /></div>
        <div ref={(el) => { sectionRefs.current[3] = el; }}><SectionServices /></div>
        <div ref={(el) => { sectionRefs.current[4] = el; }}><SectionServiceList /></div>
        <div ref={(el) => { sectionRefs.current[5] = el; }}><SectionTechStack /></div>
        <div ref={(el) => { sectionRefs.current[6] = el; }}><SectionThree /></div>
        <div ref={(el) => { sectionRefs.current[7] = el; }}><SectionWordPress /></div>
        <div ref={(el) => { sectionRefs.current[8] = el; }}><SectionGraphicDesign /></div>
        <div ref={(el) => { sectionRefs.current[9] = el; }}><SectionContact /></div>

        <div ref={(el) => { sectionRefs.current[10] = el; }}><FooterSection /></div>
      </div>

      <ChatWidget />
      <FastResponseWidget />
    </main>
  );
};

export default App;