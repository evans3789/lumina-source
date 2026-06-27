import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { to: '/',         label: 'Home' },
  { to: '/work',     label: 'Work' },
  { to: '/services', label: 'Services' },
  { to: '/about',    label: 'About' },
  { to: '/contact',  label: 'Contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const { pathname }            = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          padding: scrolled ? '14px 0' : '24px 0',
          background: scrolled ? 'rgba(13,13,13,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(201,168,76,0.08)' : '1px solid transparent',
          transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <div className="container" style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:12 }}>
            <svg width="32" height="32" viewBox="0 0 60 60" fill="none">
              <circle cx="30" cy="30" r="28" stroke="#C9A84C" strokeWidth="1"/>
              <polygon points="30,10 48,44 12,44" fill="none" stroke="#C9A84C" strokeWidth="1.4"/>
              <circle cx="30" cy="30" r="3" fill="#E8C97A"/>
            </svg>
            <span style={{
              fontFamily:'Cormorant Garamond,serif', fontSize:'1.25rem', fontWeight:600,
              letterSpacing:'4px', color:'#F5F0E8', textTransform:'uppercase',
            }}>Lumina</span>
          </Link>

          {/* Desktop links */}
          <nav style={{ display:'flex', gap:4, alignItems:'center' }}>
            {links.map(l => (
              <Link key={l.to} to={l.to} style={{
                padding:'8px 16px', fontSize:'0.83rem', fontWeight:500,
                letterSpacing:'0.5px', color: pathname===l.to ? '#C9A84C' : '#A89F8C',
                textDecoration:'none', transition:'color 0.2s', position:'relative',
              }}
                onMouseEnter={e=>e.currentTarget.style.color='#F5F0E8'}
                onMouseLeave={e=>e.currentTarget.style.color=pathname===l.to?'#C9A84C':'#A89F8C'}
              >
                {l.label}
                {pathname===l.to && (
                  <motion.div layoutId="nav-pill" style={{
                    position:'absolute', bottom:2, left:'50%',
                    transform:'translateX(-50%)',
                    width:20, height:1,
                    background:'#C9A84C',
                    boxShadow:'0 0 6px #C9A84C',
                  }} />
                )}
              </Link>
            ))}
            <Link to="/contact" className="btn btn-gold" style={{ padding:'10px 24px', fontSize:'0.82rem', marginLeft:8 }}>
              Start a Project
            </Link>
          </nav>

          {/* Hamburger */}
          <button onClick={() => setOpen(!open)}
            style={{ display:'none', background:'none', border:'none', cursor:'none', padding:8 }}
            className="mobile-menu-btn">
            <div style={{ width:22, height:1, background:'#C9A84C', marginBottom:6,
              transform: open?'rotate(45deg) translateY(3.5px)':'none', transition:'transform 0.2s' }} />
            <div style={{ width:22, height:1, background:'#C9A84C',
              transform: open?'rotate(-45deg) translateY(-3.5px)':'none', transition:'transform 0.2s' }} />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity:0, y:-20 }}
            animate={{ opacity:1, y:0 }}
            exit={{ opacity:0, y:-20 }}
            transition={{ duration:0.3 }}
            style={{
              position:'fixed', inset:0, zIndex:999,
              background:'rgba(13,13,13,0.97)',
              backdropFilter:'blur(20px)',
              display:'flex', flexDirection:'column',
              alignItems:'center', justifyContent:'center',
              gap:8,
            }}
          >
            {links.map((l,i) => (
              <motion.div key={l.to}
                initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
                transition={{ delay:i*0.08 }}>
                <Link to={l.to} style={{
                  display:'block', padding:'16px 0',
                  fontFamily:'Cormorant Garamond,serif', fontSize:'2.5rem',
                  fontWeight:300, color: pathname===l.to?'#C9A84C':'#F5F0E8',
                  textDecoration:'none', textAlign:'center',
                }}>{l.label}</Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media(max-width:768px){
          nav { display:none !important; }
          .mobile-menu-btn { display:block !important; }
        }
      `}</style>
    </>
  );
}
