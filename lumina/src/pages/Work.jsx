import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal, StaggerReveal, revealItem } from '../components/Reveal';

const categories = ['All','Brand Identity','Web','Motion','Strategy'];

const allWork = [
  { id:1, title:'Verdant', category:'Brand Identity', year:'2024', accent:'#5A8A3C', bg:'linear-gradient(135deg,#1a2a1a,#0d1f0d 70%,#0D0D0D)', tags:['Naming','Identity','Packaging','Web'], award:'Awwwards SOTD', desc:'A luxury sustainable skincare brand built from zero. From naming through to e-commerce.' },
  { id:2, title:'Aether Finance', category:'Web', year:'2024', accent:'#7B5EA7', bg:'linear-gradient(135deg,#1a1a2e,#0d0d1f 70%,#0D0D0D)', tags:['Web App','UI/UX','Motion'], award:null, desc:'Next-generation wealth management dashboard. Clean, intelligent, human.' },
  { id:3, title:'Solara Hotels', category:'Strategy', year:'2023', accent:'#C9A84C', bg:'linear-gradient(135deg,#2a1a0d,#1f130a 70%,#0D0D0D)', tags:['Brand Strategy','Campaign','Web'], award:'Design Week Award', desc:'Repositioning a boutique hotel group for the luxury traveller.' },
  { id:4, title:'Nova Music', category:'Brand Identity', year:'2023', accent:'#C14490', bg:'linear-gradient(135deg,#2a0d1a,#1f0d13 70%,#0D0D0D)', tags:['Identity','Motion','App UI'], award:null, desc:'A streaming platform brand that pulses with the music it carries.' },
  { id:5, title:'Kiro Architecture', category:'Brand Identity', year:'2023', accent:'#E8C97A', bg:'linear-gradient(135deg,#1e1c14,#161410 70%,#0D0D0D)', tags:['Identity','Web','Print'], award:null, desc:'Precision and warmth for a Copenhagen architectural practice.' },
  { id:6, title:'Möbius Film', category:'Motion', year:'2024', accent:'#FF8C42', bg:'linear-gradient(135deg,#221108,#180d04 70%,#0D0D0D)', tags:['Brand Film','Motion Graphics','Identity'], award:'Vimeo Staff Pick', desc:'Complete rebrand and 4-film series for an independent documentary studio.' },
  { id:7, title:'Forma Studio', category:'Web', year:'2024', accent:'#94A3B8', bg:'linear-gradient(135deg,#161620,#0f0f18 70%,#0D0D0D)', tags:['Web','3D','Motion'], award:'CSS Design Awards', desc:'Immersive portfolio website for a London furniture design studio.' },
  { id:8, title:'Pyra Gin', category:'Brand Identity', year:'2022', accent:'#34D399', bg:'linear-gradient(135deg,#0d1f1a,#0a1612 70%,#0D0D0D)', tags:['Naming','Identity','Packaging'], award:null, desc:'A botanical gin brand inspired by ancient Egyptian geometry.' },
  { id:9, title:'Helix Health', category:'Strategy', year:'2023', accent:'#60A5FA', bg:'linear-gradient(135deg,#0f1a2a,#0a1220 70%,#0D0D0D)', tags:['Strategy','Brand','Web'], award:null, desc:'Repositioning a health-tech startup for Series B investment.' },
];

function ProjectModal({ p, onClose }) {
  if (!p) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
        onClick={onClose}
        style={{ position:'fixed', inset:0, zIndex:2000, background:'rgba(0,0,0,0.85)', backdropFilter:'blur(10px)', display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}
      >
        <motion.div
          initial={{ scale:0.88, y:40, opacity:0 }}
          animate={{ scale:1, y:0, opacity:1 }}
          exit={{ scale:0.9, y:20, opacity:0 }}
          transition={{ duration:0.45, ease:[0.34,1.2,0.64,1] }}
          onClick={e=>e.stopPropagation()}
          style={{ background:'#161616', border:'1px solid rgba(201,168,76,0.15)', borderRadius:4, overflow:'hidden', width:'100%', maxWidth:680 }}
        >
          {/* Header visual */}
          <div style={{ height:200, background:p.bg, position:'relative', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'4rem', fontWeight:300, color:p.accent, opacity:0.25 }}>{p.title}</div>
            <motion.div style={{ position:'absolute', bottom:0, left:0, right:0, height:2, background:p.accent }}
              initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ duration:0.6, delay:0.2 }} />
          </div>
          <div style={{ padding:'32px 40px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:20 }}>
              <div>
                <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'2rem', fontWeight:600, color:'#F5F0E8', marginBottom:4 }}>{p.title}</h2>
                <div style={{ fontFamily:'DM Mono', fontSize:'0.68rem', letterSpacing:'2px', textTransform:'uppercase', color:p.accent }}>{p.category} · {p.year}</div>
              </div>
              {p.award && (
                <div style={{ padding:'6px 14px', border:`1px solid ${p.accent}40`, borderRadius:2, background:`${p.accent}10`, fontFamily:'DM Mono', fontSize:'0.65rem', letterSpacing:'1px', color:p.accent }}>
                  ★ {p.award}
                </div>
              )}
            </div>
            <p style={{ color:'#A89F8C', lineHeight:1.8, fontSize:'0.95rem', marginBottom:24 }}>{p.desc}</p>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:32 }}>
              {p.tags.map(t => (
                <span key={t} style={{ padding:'4px 12px', border:'1px solid rgba(201,168,76,0.12)', borderRadius:2, fontFamily:'DM Mono', fontSize:'0.68rem', color:'#A89F8C' }}>{t}</span>
              ))}
            </div>
            <div style={{ display:'flex', gap:12 }}>
              <button className="btn btn-gold" style={{ flex:1, justifyContent:'center' }}>View Case Study</button>
              <button className="btn btn-outline" onClick={onClose} style={{ padding:'14px 20px' }}>✕</button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Work() {
  const [cat, setCat] = useState('All');
  const [selected, setSelected] = useState(null);
  const filtered = cat === 'All' ? allWork : allWork.filter(p => p.category === cat);

  return (
    <main style={{ paddingTop:100 }}>
      {/* Header */}
      <section style={{ padding:'80px 0 60px' }}>
        <div className="container">
          <Reveal>
            <div className="eyebrow" style={{ marginBottom:20 }}>Selected work</div>
            <h1 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(3rem,6vw,5rem)', fontWeight:300, color:'#F5F0E8', lineHeight:1.05, letterSpacing:'-0.02em', maxWidth:'10ch' }}>
              Work we're<br /><em style={{ color:'#C9A84C' }}>proud of.</em>
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Filter */}
      <div style={{ borderTop:'1px solid rgba(201,168,76,0.08)', borderBottom:'1px solid rgba(201,168,76,0.08)', background:'#111111', position:'sticky', top:72, zIndex:100 }}>
        <div className="container">
          <div style={{ display:'flex', gap:0 }}>
            {categories.map(c => (
              <button key={c} onClick={() => setCat(c)}
                style={{
                  padding:'16px 24px', background:'none', border:'none', cursor:'none',
                  fontFamily:'DM Sans,sans-serif', fontSize:'0.85rem', fontWeight:500,
                  color: cat===c ? '#C9A84C':'#5A5347',
                  borderBottom: cat===c ? '1px solid #C9A84C':'1px solid transparent',
                  transition:'all 0.2s', marginBottom:'-1px',
                }}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section style={{ background:'#0D0D0D', padding:'60px 0 120px' }}>
        <div className="container">
          <AnimatePresence mode="wait">
            <motion.div key={cat}
              initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
              transition={{ duration:0.35 }}
              style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}
            >
              {filtered.map((p,i) => (
                <motion.div key={p.id}
                  initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}
                  transition={{ delay:i*0.06, duration:0.5, ease:[0.16,1,0.3,1] }}
                  onClick={() => setSelected(p)}
                  whileHover={{ y:-5, scale:1.01 }}
                  style={{ background:p.bg, border:'1px solid rgba(201,168,76,0.07)', borderRadius:4, overflow:'hidden', cursor:'none', position:'relative', minHeight:280 }}
                >
                  <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:24 }}>
                    <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(13,13,13,0.9) 0%,transparent 55%)' }} />
                    {/* Hover line */}
                    <motion.div style={{ position:'absolute', bottom:0, left:0, right:0, height:1.5, background:p.accent, originX:0 }}
                      initial={{ scaleX:0 }} whileHover={{ scaleX:1 }} transition={{ duration:0.4 }} />
                    <div style={{ position:'relative', zIndex:1 }}>
                      <div style={{ fontFamily:'DM Mono', fontSize:'0.62rem', letterSpacing:'2px', textTransform:'uppercase', color:p.accent, marginBottom:6 }}>
                        {p.category} · {p.year}
                        {p.award && <span style={{ marginLeft:10, opacity:0.7 }}>★ {p.award}</span>}
                      </div>
                      <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'1.5rem', fontWeight:600, color:'#F5F0E8', lineHeight:1.1 }}>{p.title}</div>
                    </div>
                  </div>
                  {/* Grid overlay */}
                  <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,0.01) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.01) 1px,transparent 1px)', backgroundSize:'30px 30px' }} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <ProjectModal p={selected} onClose={() => setSelected(null)} />
    </main>
  );
}
