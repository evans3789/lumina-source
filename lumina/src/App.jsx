import { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import './styles/globals.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Work from './pages/Work';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Preloader from './components/Preloader';

/* Custom cursor */
function Cursor() {
  const dot  = useRef(null);
  const ring = useRef(null);
  const mouse = useRef({ x: -200, y: -200 });
  const ringPos = useRef({ x: -200, y: -200 });
  const raf = useRef(null);

  useEffect(() => {
    const move = e => { mouse.current = { x: e.clientX, y: e.clientY }; };
    const enter = () => document.body.classList.add('cursor-hover');
    const leave = () => document.body.classList.remove('cursor-hover');

    window.addEventListener('mousemove', move);
    document.querySelectorAll('a,button,[data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
    });

    const animate = () => {
      if (dot.current) {
        dot.current.style.left  = mouse.current.x + 'px';
        dot.current.style.top   = mouse.current.y + 'px';
      }
      if (ring.current) {
        ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.12;
        ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.12;
        ring.current.style.left = ringPos.current.x + 'px';
        ring.current.style.top  = ringPos.current.y + 'px';
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(raf.current); };
  }, []);

  return (
    <>
      <div id="cursor-dot"  ref={dot}  />
      <div id="cursor-ring" ref={ring} />
    </>
  );
}

/* Scroll bar */
function ScrollBar() {
  useEffect(() => {
    const bar = document.getElementById('scroll-bar');
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.width = (total > 0 ? (window.scrollY / total) * 100 : 0) + '%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div id="scroll-bar" />;
}

/* Page transitions */
const pageVariants = {
  initial: { opacity: 0, y: 24 },
  enter:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: -16, transition: { duration: 0.3 } },
};

function PageWrapper({ children }) {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} variants={pageVariants} initial="initial" animate="enter" exit="exit">
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

function AppInner() {
  const location = useLocation();
  return (
    <>
      <Nav />
      <PageWrapper>
        <Routes location={location} key={location.pathname}>
          <Route path="/"         element={<Home />} />
          <Route path="/about"    element={<About />} />
          <Route path="/work"     element={<Work />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact"  element={<Contact />} />
        </Routes>
      </PageWrapper>
      <Footer />
    </>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  return (
    <Router>
      <Cursor />
      <ScrollBar />
      {!loaded && <Preloader onDone={() => setLoaded(true)} />}
      <AppInner />
    </Router>
  );
}
