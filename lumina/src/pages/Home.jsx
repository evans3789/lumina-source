import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Reveal, StaggerReveal, revealItem } from '../components/Reveal';

/* ─── Pexels video IDs / placeholder gradient videos ─── */
const VIDEO_URL = 'https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4';
const VIDEO_URL2 = 'https://videos.pexels.com/video-files/4480970/4480970-uhd_2560_1440_25fps.mp4';

/* ─── Data ─── */
const stats = [
  { n: '08+', label: 'Years crafting' },
  { n: '120+', label: 'Brands elevated' },
  { n: '34', label: 'Awards won' },
  { n: '99%', label: 'Client retention' },
];

const services = [
  { num: '01', title: 'Brand Identity', desc: 'Visual systems that speak before words do — logos, colour language, typography, and the feeling that ties it together.' },
  { num: '02', title: 'Digital Experiences', desc: 'Immersive websites and web applications that convert curiosity into conviction and visitors into lifelong clients.' },
  { num: '03', title: 'Motion & Film', desc: 'Cinematic brand films, animations, and social content that lodge themselves permanently in your audience\'s memory.' },
  { num: '04', title: 'Campaign Strategy', desc: 'Full-spectrum marketing campaigns built around insight, not guesswork — from concept through to measurable outcome.' },
];

const projects = [
  {
    id: 1, title: 'Verdant', category: 'Brand Identity + Web',
    year: '2024', size: 'large',
    bg: 'linear-gradient(135deg,#1a2a1a 0%,#0d1f0d 60%,#0D0D0D 100%)',
    accent: '#5A8A3C',
    description: 'A luxury sustainable skincare brand built from nothing. We created the name, the visual language, and the e-commerce ecosystem.',
  },
  {
    id: 2, title: 'Aether Finance', category: 'Web Application',
    year: '2024', size: 'medium',
    bg: 'linear-gradient(135deg,#1a1a2e 0%,#0d0d1f 60%,#0D0D0D 100%)',
    accent: '#7B5EA7',
    description: 'Reimagining wealth management for the next generation. Clean, intelligent, human.',
  },
  {
    id: 3, title: 'Solara Hotels', category: 'Campaign + Web',
    year: '2023', size: 'medium',
    bg: 'linear-gradient(135deg,#2a1a0d 0%,#1f130a 60%,#0D0D0D 100%)',
    accent: '#C9A84C',
    description: 'Repositioning a boutique hotel group for the luxury traveller through photography, film, and digital storytelling.',
  },
  {
    id: 4, title: 'Nova Music', category: 'Brand + Motion',
    year: '2023', size: 'small',
    bg: 'linear-gradient(135deg,#2a0d1a 0%,#1f0d13 60%,#0D0D0D 100%)',
    accent: '#C14490',
    description: 'A streaming platform brand that pulses with the music it carries.',
  },
  {
    id: 5, title: 'Kiro Architecture', category: 'Identity + Web',
    year: '2023', size: 'small',
    bg: 'linear-gradient(135deg,#1a1a1a 0%,#141414 60%,#0D0D0D 100%)',
    accent: '#E8C97A',
    description: 'Precision and warmth for a Copenhagen-based architectural practice.',
  },
];

const testimonials = [
  {
    quote: "Lumina didn't just redesign our website — they redefined how the world sees us. Revenue from digital channels tripled in 90 days.",
    name: 'Sofia Marchetti',
    role: 'Founder, Verdant Skincare',
    initials: 'SM',
  },
  {
    quote: "The most thoughtful creative team I've ever worked with. They ask the right questions, listen harder, and deliver beyond imagination.",
    name: 'James Okafor',
    role: 'CMO, Aether Finance',
    initials: 'JO',
  },
  {
    quote: "From first call to final launch, every interaction felt like a masterclass in taste and craft. The new site is our best salesperson.",
    name: 'Elena Vasquez',
    role: 'Director, Solara Hotels',
    initials: 'EV',
  },
];

const marqueeItems = ['Brand Identity','Web Design','Motion','Strategy','Film','UI/UX','Campaigns','Typography','Visual Systems','Brand Identity','Web Design','Motion','Strategy','Film','UI/UX','Campaigns','Typography','Visual Systems'];

/* ─── Magnetic button ─── */
function MagneticBtn({ children, className, to, ...props }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const onMove = e => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width/2) * 0.28);
    y.set((e.clientY - r.top  - r.height/2) * 0.28);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div ref={ref} style={{ x: sx, y: sy, display:'inline-block' }}
      onMouseMove={onMove} onMouseLeave={onLeave}>
      {to ? <Link to={to} className={className} {...props}>{children}</Link>
           : <button className={className} {...props}>{children}</button>}
    </motion.div>
  );
}

/* ─── Hero Section ─── */
function Hero() {
  const vidRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const heroY   = useTransform(scrollYProgress, [0,0.3], [0, -80]);
  const heroOp  = useTransform(scrollYProgress, [0,0.35], [1, 0]);
  const scaleV  = useTransform(scrollYProgress, [0,0.3], [1, 1.06]);

  return (
    <section style={{ position:'relative', height:'100vh', overflow:'hidden', display:'flex', alignItems:'center' }}>
      {/* Video background */}
      <motion.div style={{ position:'absolute', inset:0, scale: scaleV }}>
        <video ref={vidRef} autoPlay muted loop playsInline
          style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }}>
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
        <div className="video-overlay" />
        {/* Extra vignette */}
        <div style={{
          position:'absolute', inset:0, zIndex:2,
          background:'radial-gradient(ellipse at center,transparent 30%,rgba(13,13,13,0.7) 100%)',
        }} />
      </motion.div>

      {/* Animated grid overlay */}
      <div style={{
        position:'absolute', inset:0, zIndex:2,
        backgroundImage:'linear-gradient(rgba(201,168,76,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.025) 1px,transparent 1px)',
        backgroundSize:'80px 80px',
      }} />

      {/* Content */}
      <motion.div style={{ y: heroY, opacity: heroOp, position:'relative', zIndex:10, width:'100%' }}>
        <div className="container">
          <div style={{ paddingTop: 40 }}>
            <motion.div className="eyebrow"
              initial={{ opacity:0, x:-30 }} animate={{ opacity:1, x:0 }}
              transition={{ delay:0.3, duration:0.7, ease:[0.16,1,0.3,1] }}>
              Creative Digital Studio
            </motion.div>

            <motion.h1
              initial={{ opacity:0 }} animate={{ opacity:1 }}
              transition={{ delay:0.5, duration:1 }}
              style={{
                fontFamily:'Cormorant Garamond,serif',
                fontSize:'clamp(3.5rem,8.5vw,7.5rem)',
                fontWeight:300, lineHeight:1.0,
                letterSpacing:'-0.03em',
                color:'#F5F0E8',
                marginTop:24, marginBottom:0,
                maxWidth:'12ch',
              }}
            >
              {['We ', 'illuminate', ' brands.'].map((word, wi) => (
                <motion.span key={wi}
                  initial={{ opacity:0, y:60, skewY:3 }}
                  animate={{ opacity:1, y:0, skewY:0 }}
                  transition={{ delay:0.6 + wi*0.15, duration:0.85, ease:[0.16,1,0.3,1] }}
                  style={{
                    display:'inline',
                    fontStyle: word.trim()==='illuminate' ? 'italic' : 'normal',
                    color: word.trim()==='illuminate' ? '#C9A84C' : '#F5F0E8',
                  }}>
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
              transition={{ delay:1.1, duration:0.7 }}
              style={{
                fontFamily:'DM Sans,sans-serif',
                fontSize:'1.05rem', fontWeight:300,
                color:'#A89F8C', maxWidth:480, lineHeight:1.75,
                marginTop:28, marginBottom:44,
              }}
            >
              We are a creative studio building brand identities, digital experiences, and motion work that leaves a permanent mark.
            </motion.p>

            <motion.div
              initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
              transition={{ delay:1.3, duration:0.6 }}
              style={{ display:'flex', gap:20, alignItems:'center', flexWrap:'wrap' }}
            >
              <MagneticBtn to="/work" className="btn btn-gold">
                View Our Work
              </MagneticBtn>
              <MagneticBtn to="/contact" className="btn btn-outline">
                Start a Project
              </MagneticBtn>
            </motion.div>
          </div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity:0 }} animate={{ opacity:1 }}
            transition={{ delay:2, duration:1 }}
            style={{
              position:'absolute', bottom:40, right:0,
              display:'flex', flexDirection:'column', alignItems:'center', gap:10,
            }}
          >
            <motion.div animate={{ y:[0,8,0] }} transition={{ duration:1.8, repeat:Infinity }}
              style={{ width:1, height:60, background:'linear-gradient(to bottom,rgba(201,168,76,0.8),transparent)' }} />
            <span style={{ fontFamily:'DM Mono', fontSize:'0.65rem', letterSpacing:'3px', color:'#5A5347', writingMode:'vertical-rl', textTransform:'uppercase' }}>scroll</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom stats bar */}
      <motion.div
        initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}
        transition={{ delay:1.5, duration:0.7 }}
        style={{
          position:'absolute', bottom:0, left:0, right:0, zIndex:10,
          borderTop:'1px solid rgba(201,168,76,0.08)',
          background:'rgba(13,13,13,0.6)', backdropFilter:'blur(16px)',
        }}
      >
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:0 }}>
            {stats.map((s,i) => (
              <div key={i} style={{
                padding:'22px 24px',
                borderRight: i<3 ? '1px solid rgba(201,168,76,0.08)' : 'none',
                display:'flex', flexDirection:'column', gap:4,
              }}>
                <span style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'1.9rem', fontWeight:600, color:'#C9A84C', lineHeight:1 }}>{s.n}</span>
                <span style={{ fontFamily:'DM Mono', fontSize:'0.68rem', letterSpacing:'2px', textTransform:'uppercase', color:'#5A5347' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ─── Marquee ─── */
function Marquee() {
  return (
    <div style={{
      background:'#161616', borderTop:'1px solid rgba(201,168,76,0.08)',
      borderBottom:'1px solid rgba(201,168,76,0.08)',
      padding:'18px 0', overflow:'hidden',
    }}>
      <motion.div
        style={{ display:'flex', whiteSpace:'nowrap' }}
        animate={{ x:[0, '-50%'] }}
        transition={{ duration:30, repeat:Infinity, ease:'linear' }}
      >
        {marqueeItems.concat(marqueeItems).map((item,i) => (
          <span key={i} style={{
            fontFamily:'Cormorant Garamond,serif',
            fontSize:'1.15rem', fontStyle:'italic',
            color: i%3===1 ? '#C9A84C' : '#5A5347',
            padding:'0 32px', flexShrink:0,
          }}>
            {item}
            <span style={{ color:'rgba(201,168,76,0.25)', margin:'0 8px' }}>◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Services ─── */
function ServicesSection() {
  const [active, setActive] = useState(0);
  return (
    <section className="section" style={{ background:'#0D0D0D' }}>
      <div className="container">
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:100, alignItems:'center' }}>
          <div>
            <Reveal>
              <div className="eyebrow" style={{ marginBottom:24 }}>What we do</div>
              <h2 style={{
                fontFamily:'Cormorant Garamond,serif',
                fontSize:'clamp(2.5rem,4.5vw,3.8rem)',
                fontWeight:300, color:'#F5F0E8', lineHeight:1.1,
                letterSpacing:'-0.02em', marginBottom:48,
              }}>
                Craft that<br />
                <em style={{ color:'#C9A84C', fontStyle:'italic' }}>converts.</em>
              </h2>
            </Reveal>
            <div style={{ display:'flex', flexDirection:'column' }}>
              {services.map((s,i) => (
                <motion.div key={i}
                  onClick={() => setActive(i)}
                  style={{
                    borderTop:'1px solid rgba(201,168,76,0.08)',
                    padding:'24px 0', cursor:'none',
                  }}
                  whileHover={{ x: 6 }}
                  transition={{ duration: 0.2 }}
                >
                  <div style={{ display:'flex', alignItems:'center', gap:24 }}>
                    <span style={{ fontFamily:'DM Mono', fontSize:'0.68rem', color: active===i?'#C9A84C':'#5A5347', transition:'color 0.3s' }}>{s.num}</span>
                    <h3 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'1.4rem', fontWeight:400, color: active===i?'#C9A84C':'#F5F0E8', transition:'color 0.3s' }}>{s.title}</h3>
                    <motion.span style={{ marginLeft:'auto', color:'#C9A84C', opacity: active===i?1:0 }} animate={{ x: active===i?0:-8 }}>→</motion.span>
                  </div>
                  <AnimatePresence>
                    {active===i && (
                      <motion.p
                        initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }}
                        exit={{ height:0, opacity:0 }} transition={{ duration:0.35 }}
                        style={{ overflow:'hidden', color:'#A89F8C', fontSize:'0.9rem', lineHeight:1.75, paddingLeft:48, paddingTop:10 }}
                      >{s.desc}</motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
            <Reveal delay={0.3}>
              <Link to="/services" className="btn btn-ghost" style={{ marginTop:32 }}>
                Explore all services <span className="btn-ghost-arrow">→</span>
              </Link>
            </Reveal>
          </div>

          {/* Right: Visual panel */}
          <Reveal direction="left">
            <div style={{ position:'relative', borderRadius:4, overflow:'hidden' }}>
              <video autoPlay muted loop playsInline
                style={{ width:'100%', height:520, objectFit:'cover', display:'block' }}>
                <source src={VIDEO_URL2} type="video/mp4" />
              </video>
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(13,13,13,0.5),transparent 60%)' }} />
              <div style={{
                position:'absolute', bottom:28, left:28,
                background:'rgba(13,13,13,0.85)', backdropFilter:'blur(12px)',
                border:'1px solid rgba(201,168,76,0.15)',
                borderRadius:4, padding:'16px 20px',
              }}>
                <div style={{ fontFamily:'DM Mono', fontSize:'0.68rem', color:'#C9A84C', letterSpacing:'2px', marginBottom:4 }}>CURRENT PROJECT</div>
                <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'1.2rem', color:'#F5F0E8' }}>Verdant Skincare</div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── Work grid ─── */
function WorkSection() {
  return (
    <section style={{ background:'#111111', padding:'120px 0' }}>
      <div className="container">
        <Reveal style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:64 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom:16 }}>Selected work</div>
            <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(2.2rem,4vw,3.2rem)', fontWeight:300, color:'#F5F0E8', lineHeight:1.1, letterSpacing:'-0.02em' }}>
              Work that<br /><em style={{ color:'#C9A84C' }}>endures.</em>
            </h2>
          </div>
          <Link to="/work" className="btn btn-outline" style={{ flexShrink:0 }}>All Projects</Link>
        </Reveal>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
          {/* Large feature card */}
          <motion.div
            whileHover={{ scale:1.015 }} transition={{ duration:0.5, ease:[0.16,1,0.3,1] }}
            style={{ gridRow:'span 2', borderRadius:4, overflow:'hidden', cursor:'none',
              background:projects[0].bg, border:'1px solid rgba(201,168,76,0.08)',
              position:'relative', minHeight:600,
              display:'flex', flexDirection:'column', justifyContent:'flex-end' }}
          >
            <ProjectCardOverlay p={projects[0]} large />
          </motion.div>

          {[projects[1], projects[2]].map(p => (
            <motion.div key={p.id}
              whileHover={{ scale:1.02 }} transition={{ duration:0.4, ease:[0.16,1,0.3,1] }}
              style={{ borderRadius:4, overflow:'hidden', cursor:'none',
                background:p.bg, border:'1px solid rgba(201,168,76,0.08)',
                position:'relative', minHeight:280,
                display:'flex', flexDirection:'column', justifyContent:'flex-end' }}
            >
              <ProjectCardOverlay p={p} />
            </motion.div>
          ))}
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginTop:20 }}>
          {[projects[3], projects[4]].map(p => (
            <motion.div key={p.id}
              whileHover={{ scale:1.02 }} transition={{ duration:0.4 }}
              style={{ borderRadius:4, overflow:'hidden', cursor:'none',
                background:p.bg, border:'1px solid rgba(201,168,76,0.08)',
                position:'relative', minHeight:220,
                display:'flex', flexDirection:'column', justifyContent:'flex-end' }}
            >
              <ProjectCardOverlay p={p} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCardOverlay({ p, large }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', justifyContent:'flex-end', padding: large?32:24 }}
    >
      {/* Grid texture */}
      <div style={{
        position:'absolute', inset:0,
        backgroundImage:'linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)',
        backgroundSize:'40px 40px',
      }} />
      {/* Gradient overlay */}
      <div style={{
        position:'absolute', inset:0,
        background:'linear-gradient(to top,rgba(13,13,13,0.85) 0%,transparent 60%)',
        transition:'opacity 0.3s',
      }} />
      {/* Animated accent line */}
      <motion.div animate={{ width: hov?'100%':'0%' }} transition={{ duration:0.5 }}
        style={{ position:'absolute', bottom:0, left:0, height:2, background:p.accent }} />
      {/* Content */}
      <div style={{ position:'relative', zIndex:1 }}>
        <span style={{ fontFamily:'DM Mono', fontSize:'0.65rem', letterSpacing:'2px', textTransform:'uppercase', color: p.accent, opacity:0.8 }}>
          {p.category} · {p.year}
        </span>
        <h3 style={{
          fontFamily:'Cormorant Garamond,serif',
          fontSize: large?'2.4rem':'1.5rem',
          fontWeight:600, color:'#F5F0E8', marginTop:6, lineHeight:1.1,
        }}>{p.title}</h3>
        <motion.p animate={{ opacity:hov?1:0, y:hov?0:10 }} transition={{ duration:0.3 }}
          style={{ color:'#A89F8C', fontSize:'0.85rem', lineHeight:1.6, marginTop:8, maxWidth:340 }}>
          {p.description}
        </motion.p>
      </div>
    </div>
  );
}

/* ─── Philosophy / Brand film section ─── */
function PhilosophySection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset:['start end','end start'] });
  const y = useTransform(scrollYProgress, [0,1], [60, -60]);

  return (
    <section ref={ref} style={{ background:'#0D0D0D', padding:'160px 0', overflow:'hidden' }}>
      <div className="container-tight" style={{ textAlign:'center' }}>
        <Reveal>
          <div className="eyebrow" style={{ justifyContent:'center', marginBottom:32 }}>Our philosophy</div>
        </Reveal>
        <motion.h2 style={{ y }}
          className="display"
          style={{
            fontFamily:'Cormorant Garamond,serif',
            fontSize:'clamp(2.8rem,6vw,5.5rem)',
            fontWeight:300, lineHeight:1.15,
            letterSpacing:'-0.02em', color:'#F5F0E8',
            marginBottom:40,
          }}
        >
          Great creative work doesn't<br/>
          <em style={{ color:'#C9A84C' }}>describe</em> a brand —<br/>
          it <em style={{ color:'#E8C97A' }}>becomes</em> it.
        </motion.h2>
        <Reveal delay={0.2}>
          <p style={{ color:'#A89F8C', fontSize:'1.05rem', lineHeight:1.8, maxWidth:580, margin:'0 auto 48px' }}>
            We don't produce deliverables. We build the emotional infrastructure that turns audiences into communities and products into legacies.
          </p>
          <Link to="/about" className="btn btn-ghost" style={{ justifyContent:'center' }}>
            Our story <span className="btn-ghost-arrow">→</span>
          </Link>
        </Reveal>

        {/* Decorative ring */}
        <div style={{ position:'relative', width:180, height:180, margin:'80px auto 0' }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat:Infinity, ease:'linear' }}
            style={{
              position:'absolute', inset:0,
              border:'1px solid rgba(201,168,76,0.15)',
              borderRadius:'50%',
              borderTopColor:'#C9A84C',
            }}
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 14, repeat:Infinity, ease:'linear' }}
            style={{
              position:'absolute', inset:20,
              border:'1px dashed rgba(201,168,76,0.1)',
              borderRadius:'50%',
              borderRightColor:'rgba(232,201,122,0.4)',
            }}
          />
          <div style={{
            position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center',
          }}>
            <svg width="40" height="40" viewBox="0 0 60 60" fill="none">
              <polygon points="30,10 48,44 12,44" fill="none" stroke="#C9A84C" strokeWidth="1.2"/>
              <circle cx="30" cy="30" r="3" fill="#E8C97A"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials ─── */
function TestimonialsSection() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i+1) % testimonials.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ background:'#111111', padding:'140px 0', overflow:'hidden' }}>
      <div className="container">
        <Reveal style={{ marginBottom:80 }}>
          <div className="eyebrow">What clients say</div>
        </Reveal>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:100, alignItems:'center' }}>
          {/* Big quote */}
          <AnimatePresence mode="wait">
            <motion.div key={idx}
              initial={{ opacity:0, x:-30 }} animate={{ opacity:1, x:0 }}
              exit={{ opacity:0, x:30 }} transition={{ duration:0.5 }}>
              <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'5rem', lineHeight:0.7, color:'#C9A84C', opacity:0.4, marginBottom:8 }}>"</div>
              <p style={{
                fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(1.4rem,2.5vw,1.9rem)',
                fontWeight:300, color:'#F5F0E8', lineHeight:1.5, fontStyle:'italic',
                marginBottom:32,
              }}>
                {testimonials[idx].quote}
              </p>
              <div style={{ display:'flex', alignItems:'center', gap:16 }}>
                <div style={{
                  width:44, height:44, borderRadius:'50%',
                  background:'rgba(201,168,76,0.12)', border:'1px solid rgba(201,168,76,0.3)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontFamily:'Cormorant Garamond,serif', fontWeight:600, color:'#C9A84C',
                }}>{testimonials[idx].initials}</div>
                <div>
                  <div style={{ color:'#F5F0E8', fontWeight:500, fontSize:'0.9rem' }}>{testimonials[idx].name}</div>
                  <div style={{ color:'#5A5347', fontFamily:'DM Mono', fontSize:'0.72rem' }}>{testimonials[idx].role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots + other quotes */}
          <div>
            {testimonials.map((t,i) => (
              <motion.div key={i} onClick={() => setIdx(i)}
                style={{
                  padding:'20px 24px', borderRadius:4, cursor:'none', marginBottom:12,
                  background: idx===i ? 'rgba(201,168,76,0.06)':'transparent',
                  border:`1px solid ${idx===i?'rgba(201,168,76,0.2)':'transparent'}`,
                  transition:'all 0.3s',
                }}
                whileHover={{ x:6 }}>
                <div style={{ color: idx===i ? '#C9A84C':'#5A5347', fontFamily:'Cormorant Garamond,serif', fontSize:'1rem', fontStyle:'italic', marginBottom:6, lineHeight:1.5 }}>
                  "{t.quote.slice(0,80)}…"
                </div>
                <div style={{ fontFamily:'DM Mono', fontSize:'0.65rem', letterSpacing:'1px', color:'#5A5347', textTransform:'uppercase' }}>{t.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ─── */
function CTA() {
  return (
    <section style={{ background:'#0D0D0D', padding:'160px 0', position:'relative', overflow:'hidden' }}>
      {/* Ambient glow */}
      <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)',
        width:800, height:400,
        background:'radial-gradient(ellipse,rgba(201,168,76,0.07) 0%,transparent 70%)',
        pointerEvents:'none' }} />

      <div className="container-tight" style={{ textAlign:'center', position:'relative', zIndex:1 }}>
        <Reveal>
          <div className="eyebrow" style={{ justifyContent:'center', marginBottom:28 }}>Ready to begin?</div>
          <h2 style={{
            fontFamily:'Cormorant Garamond,serif',
            fontSize:'clamp(3rem,7vw,6rem)',
            fontWeight:300, color:'#F5F0E8', lineHeight:1.0,
            letterSpacing:'-0.03em', marginBottom:28,
          }}>
            Let's make<br />
            <em style={{ color:'#C9A84C' }}>something unforgettable.</em>
          </h2>
          <p style={{ color:'#A89F8C', fontSize:'1rem', lineHeight:1.8, maxWidth:440, margin:'0 auto 48px' }}>
            Tell us about your project. We'll get back within one business day with how we can help.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div style={{ display:'flex', gap:20, justifyContent:'center', flexWrap:'wrap' }}>
            <MagneticBtn to="/contact" className="btn btn-gold" style={{ padding:'16px 40px', fontSize:'1rem' }}>
              Start a conversation
            </MagneticBtn>
            <MagneticBtn to="/work" className="btn btn-outline" style={{ padding:'16px 32px', fontSize:'1rem' }}>
              See our work
            </MagneticBtn>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <ServicesSection />
      <WorkSection />
      <PhilosophySection />
      <TestimonialsSection />
      <CTA />
    </main>
  );
}
