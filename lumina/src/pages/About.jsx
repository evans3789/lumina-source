import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Reveal, StaggerReveal, revealItem } from '../components/Reveal';

const team = [
  { name: 'Isabelle Morel',  role: 'Creative Director',     bio: 'Former art director at Pentagram. 14 years shaping identities for global brands.', initials:'IM', color:'#C9A84C' },
  { name: 'Theo Nakamura',   role: 'Lead Developer',        bio: 'Ex-Vercel engineer. Builds front-ends that perform and experiences that endure.', initials:'TN', color:'#7B5EA7' },
  { name: 'Clara Engström',  role: 'Strategy Director',     bio: 'Turned around 30+ brands. Believes positioning is the highest form of design.', initials:'CE', color:'#5A8A3C' },
  { name: 'Marcus DaSilva',  role: 'Motion & Film Director', bio: 'BAFTA-nominated cinematographer turned brand storyteller.', initials:'MD', color:'#C14490' },
];

const values = [
  { symbol:'Ⅰ', title:'Intention over output', desc:'We refuse to produce work we wouldn\'t be proud to show our heroes. Every pixel, word, and frame is deliberate.' },
  { symbol:'Ⅱ', title:'Long-term thinking', desc:'Quick wins rarely outlast the time it takes to celebrate them. We build for the decade, not the quarterly report.' },
  { symbol:'Ⅲ', title:'Radical honesty', desc:'We\'ll tell you when an idea won\'t serve you. Honest counsel is part of what you\'re paying for.' },
  { symbol:'Ⅳ', title:'The client\'s win is ours', desc:'Our success is entirely measured by yours. No vanity metrics, no awards chasing — just real results.' },
];

const timeline = [
  { year:'2016', event:'Founded in a Shoreditch studio by Isabelle Morel with 3 clients and a clear vision.' },
  { year:'2018', event:'Expanded into web development. First Awwwards SOTD. Team grew to 8.' },
  { year:'2020', event:'Launched motion & film division. 12 brand film commissions in year one.' },
  { year:'2022', event:'Named Creative Studio of the Year, Design Week Awards.' },
  { year:'2024', event:'Today — 22 creatives, 4 disciplines, clients across 18 countries.' },
];

export default function About() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset:['start start','end start'] });
  const heroY = useTransform(scrollYProgress, [0,1], [0, 100]);

  return (
    <main style={{ paddingTop:80 }}>

      {/* Hero */}
      <section ref={heroRef} style={{ padding:'140px 0 100px', position:'relative', overflow:'hidden' }}>
        <motion.div style={{ y: heroY, position:'absolute', inset:0,
          background:'radial-gradient(ellipse at 30% 60%,rgba(201,168,76,0.06) 0%,transparent 60%)', pointerEvents:'none' }} />
        <div className="container">
          <Reveal>
            <div className="eyebrow" style={{ marginBottom:24 }}>Our story</div>
          </Reveal>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:100, alignItems:'end' }}>
            <Reveal>
              <h1 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(3rem,6vw,5rem)', fontWeight:300, color:'#F5F0E8', lineHeight:1.05, letterSpacing:'-0.02em' }}>
                We believe in the power of<br /><em style={{ color:'#C9A84C' }}>beautiful work.</em>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p style={{ color:'#A89F8C', lineHeight:1.8, fontSize:'1rem' }}>
                Lumina was founded in 2016 with a single conviction: that the distance between a good brand and an unforgettable one is almost entirely down to craft. We've spent eight years proving it right.
              </p>
              <p style={{ color:'#A89F8C', lineHeight:1.8, fontSize:'1rem', marginTop:16 }}>
                Today we are a studio of 22 strategists, designers, developers, and filmmakers united by an obsessive standard for quality and a genuine love of the work.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Full-width image placeholder with texture */}
      <div style={{ height:500, background:'linear-gradient(135deg,#161616,#111111)', borderTop:'1px solid rgba(201,168,76,0.06)', borderBottom:'1px solid rgba(201,168,76,0.06)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(201,168,76,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.02) 1px,transparent 1px)', backgroundSize:'60px 60px' }} />
        <motion.div
          initial={{ scale:0.9, opacity:0 }} whileInView={{ scale:1, opacity:1 }}
          viewport={{ once:true }} transition={{ duration:1.2, ease:[0.16,1,0.3,1] }}
          style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}
        >
          <div style={{ textAlign:'center' }}>
            <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'8rem', fontWeight:300, lineHeight:1, color:'rgba(201,168,76,0.08)', letterSpacing:'-0.05em' }}>LUMINA</div>
            <div style={{ fontFamily:'DM Mono', fontSize:'0.7rem', letterSpacing:'6px', color:'#5A5347', marginTop:16 }}>CREATIVE STUDIO · EST. 2016</div>
          </div>
          {/* Decorative orbs */}
          {[
            { top:'15%', left:'10%', size:120, color:'rgba(201,168,76,0.04)' },
            { bottom:'20%', right:'12%', size:180, color:'rgba(193,68,144,0.04)' },
            { top:'40%', right:'30%', size:80, color:'rgba(90,138,60,0.05)' },
          ].map((o,i) => (
            <motion.div key={i}
              animate={{ scale:[1,1.15,1], opacity:[0.4,0.8,0.4] }}
              transition={{ duration:5+i*1.5, repeat:Infinity, ease:'easeInOut' }}
              style={{ position:'absolute', ...o, width:o.size, height:o.size, borderRadius:'50%', background:o.color, filter:'blur(30px)' }}
            />
          ))}
        </motion.div>
      </div>

      {/* Values */}
      <section className="section" style={{ background:'#0D0D0D' }}>
        <div className="container">
          <Reveal style={{ marginBottom:64 }}>
            <div className="eyebrow" style={{ marginBottom:20 }}>How we work</div>
            <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(2.2rem,4vw,3.2rem)', fontWeight:300, color:'#F5F0E8', lineHeight:1.1, letterSpacing:'-0.02em' }}>
              Four principles.<br /><em style={{ color:'#C9A84C' }}>One standard.</em>
            </h2>
          </Reveal>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:2 }}>
            {values.map((v,i) => (
              <Reveal key={i} delay={i*0.1}>
                <motion.div
                  whileHover={{ background:'rgba(201,168,76,0.03)' }}
                  style={{ padding:'48px 40px', border:'1px solid rgba(201,168,76,0.08)', transition:'background 0.3s' }}>
                  <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'2.5rem', fontWeight:300, color:'rgba(201,168,76,0.25)', lineHeight:1, marginBottom:20 }}>{v.symbol}</div>
                  <h3 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'1.4rem', fontWeight:600, color:'#F5F0E8', marginBottom:12 }}>{v.title}</h3>
                  <p style={{ color:'#A89F8C', fontSize:'0.9rem', lineHeight:1.75 }}>{v.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section" style={{ background:'#111111' }}>
        <div className="container">
          <Reveal style={{ marginBottom:64 }}>
            <div className="eyebrow" style={{ marginBottom:20 }}>The team</div>
            <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(2.2rem,4vw,3.2rem)', fontWeight:300, color:'#F5F0E8', lineHeight:1.1, letterSpacing:'-0.02em' }}>
              Creatives who<br /><em style={{ color:'#C9A84C' }}>care deeply.</em>
            </h2>
          </Reveal>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20 }}>
            {team.map((m,i) => (
              <Reveal key={i} delay={i*0.1}>
                <motion.div
                  whileHover={{ y:-6 }}
                  transition={{ duration:0.3 }}
                  style={{ background:'#161616', border:'1px solid rgba(201,168,76,0.08)', borderRadius:4, overflow:'hidden', cursor:'none' }}
                >
                  <div style={{ height:220, background:`linear-gradient(135deg,${m.color}15,rgba(13,13,13,0.5))`, display:'flex', alignItems:'center', justifyContent:'center', position:'relative' }}>
                    <div style={{ width:80, height:80, borderRadius:'50%', background:`${m.color}18`, border:`1px solid ${m.color}40`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Cormorant Garamond,serif', fontWeight:600, fontSize:'1.5rem', color:m.color }}>{m.initials}</div>
                    <motion.div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 50% 50%,${m.color}08,transparent 70%)` }}
                      animate={{ opacity:[0.4,1,0.4] }} transition={{ duration:3+i, repeat:Infinity }} />
                  </div>
                  <div style={{ padding:'20px 22px' }}>
                    <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'1.15rem', fontWeight:600, color:'#F5F0E8', marginBottom:4 }}>{m.name}</div>
                    <div style={{ fontFamily:'DM Mono', fontSize:'0.68rem', letterSpacing:'1.5px', textTransform:'uppercase', color:m.color, marginBottom:12 }}>{m.role}</div>
                    <p style={{ color:'#5A5347', fontSize:'0.84rem', lineHeight:1.6 }}>{m.bio}</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section" style={{ background:'#0D0D0D' }}>
        <div className="container-tight">
          <Reveal style={{ textAlign:'center', marginBottom:80 }}>
            <div className="eyebrow" style={{ justifyContent:'center', marginBottom:20 }}>Our journey</div>
            <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(2rem,4vw,3rem)', fontWeight:300, color:'#F5F0E8', lineHeight:1.1, letterSpacing:'-0.02em' }}>
              Eight years.<br /><em style={{ color:'#C9A84C' }}>One direction.</em>
            </h2>
          </Reveal>
          {timeline.map((item,i) => (
            <Reveal key={i} delay={i*0.1}>
              <div style={{ display:'grid', gridTemplateColumns:'120px 1fr', gap:40, paddingBottom:40, borderBottom:'1px solid rgba(201,168,76,0.06)', marginBottom:40 }}>
                <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'2.5rem', fontWeight:300, color:'rgba(201,168,76,0.3)', lineHeight:1, paddingTop:4 }}>{item.year}</div>
                <div style={{ color:'#A89F8C', fontSize:'1rem', lineHeight:1.75, paddingTop:8 }}>{item.event}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm" style={{ background:'#111111' }}>
        <div className="container" style={{ textAlign:'center' }}>
          <Reveal>
            <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(2rem,4vw,3rem)', fontWeight:300, color:'#F5F0E8', marginBottom:32, letterSpacing:'-0.02em' }}>
              Want to work together?
            </h2>
            <Link to="/contact" className="btn btn-gold" style={{ padding:'16px 40px', fontSize:'1rem' }}>Get in touch</Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
