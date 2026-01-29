import { useLenis } from './hooks/useLenis';
import { usePreloader } from './hooks/usePreloader';
import Preloader from './components/Preloader/Preloader';
import CustomCursor from './components/CustomCursor/CustomCursor';
import Navigation from './components/Navigation/Navigation';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Services from './components/Services/Services';
import Projects from './components/Projects/Projects';
import Process from './components/Process/Process';
import TechMarquee from './components/TechMarquee/TechMarquee';
import Contact from './components/Contact/Contact';
export default function App() {
  const { isLoading, finishLoading } = usePreloader();
  useLenis();

  return (
    <>
      {isLoading && <Preloader onComplete={finishLoading} />}
      <CustomCursor />
      <Navigation />
      <main>
        <Hero ready={!isLoading} />
        <About />
        <Services />
        <Projects />
        <Process />
        <TechMarquee />
        <Contact />
      </main>
    </>
  );
}
