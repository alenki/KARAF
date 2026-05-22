import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Preloader } from './components/chrome/Preloader';
import { CustomCursor } from './components/chrome/CustomCursor';
import { RouteTransition } from './components/layout/RouteTransition';
import { useLenis, getLenis } from './hooks/useLenis';
import { usePreloader } from './hooks/usePreloader';

const Home = lazy(() => import('./routes/Home'));
const Works = lazy(() => import('./routes/Works'));
const WorkDetail = lazy(() => import('./routes/WorkDetail'));
const About = lazy(() => import('./routes/About'));
const Contact = lazy(() => import('./routes/Contact'));
const NotFound = lazy(() => import('./routes/NotFound'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  return null;
}

export default function App() {
  const { isLoading, finishLoading } = usePreloader();
  useLenis(isLoading);

  return (
    <>
      {isLoading && <Preloader onComplete={finishLoading} />}
      <CustomCursor />
      <ScrollToTop />
      <Header />
      <main>
        <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
          <RouteTransition>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/works" element={<Works />} />
              <Route path="/works/:slug" element={<WorkDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </RouteTransition>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
