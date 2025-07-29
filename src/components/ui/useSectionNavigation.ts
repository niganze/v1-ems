import { useState, useEffect } from 'react';

export function useSectionNavigation() {
  const [currentSection, setCurrentSection] = useState<number>(0);

  const scrollToSection = (index: number): void => {
    const sections = document.querySelectorAll('[data-section]');
    if (sections[index]) {
      sections[index].scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      setCurrentSection(index);
    }
  };

  useEffect(() => {
    const handleScroll = (): void => {
      const sections = document.querySelectorAll('[data-section]');
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      sections.forEach((section, index) => {
        const element = section as HTMLElement;
        const { offsetTop, offsetHeight } = element;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setCurrentSection(index);
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { currentSection, scrollToSection };
}
