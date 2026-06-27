import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal, StaggerReveal, revealItem } from '../components/Reveal';

const disciplines = [
  {
    num: '01', title: 'Brand Identity',
    tagline: 'The soul made visible.',
    accent: '#C9A84C',
    desc: 'We build brand identities that work at every scale — from a favicon to a billboard. Naming, visual language, tone of voice, and the invisible feeling that ties everything together.',
    deliverables: ['Brand strategy & positioning', 'Naming & verbal identity', 'Logo & visual system', 'Colour, typography & iconography', 'Brand guidelines & usage', 'Packaging & print design'],
    caseStudy: 'Verdant Skincare',
  },
  {
    num: '02', title: 'Digital Experiences',
    tagline: 'Websites that convert and endure.',
    accent: '#7B5EA7',
    desc: 'We design and engineer digital experiences that feel effortless to use and impossible to forget. Every interaction is considered, every millisecond of performance is earned.',
    deliverables: ['UX research & information architecture', 'UI design & prototyping', 'Front-end development (React/Next.js)', 'CMS integration & training', 'Performance & SEO optimisation', 'Ongoing support & maintenance'],
    caseStudy: 'Aether Finance',
  },
  {
    num: '03', title: 'Motion & Film',
    tagline: 'Stories that move people.',
    accent: '#FF8C42',
    desc: 'From 10-second social cuts to 10-minute brand documentaries, we tell stories through film with the same rigour we bring to every other discipline. Concept, production, post.',
    deliverables: ['Brand film & documentary', 'Animated brand identity', 'Social content & reels', 'Product & campaign films', 'Motion design systems', 'Event & launch films'],
    caseStudy: 'Möbius Film',
  },
  {
    num: '04', title: 'Campaign Strategy',
    tagline: 'Direction before execution.',
    accent: '#5A8A3C',
    desc: 'Strategy without execution is just theory. We sit at the intersection — building the insight-led frameworks that make creative work purposeful and campaigns measurably effective.',
    deliverables: ['Brand positioning & messaging', 'Audience research & insight', 'Campaign concepting', 'Channel & media planning', 'Creative direction', 'Performance reporting'],
    caseStudy: 'Solara Hotels',
  },
];

const process = [
  { n: '01', title: 'Discovery', desc: 'Two weeks of deep listening. We immerse ourselves in your world — your audience, your competitors, your ambitions and your fears.' },
  { n: '02', title: 'Strategy', desc: 'We translate discovery into direction. A clear brief, positioning statement, and creative framework that everything else is built from.' },
  { n: '03', title: 'Creation', desc: 'The work itself. Iterative, transparent, and calibrated to your brief. Weekly presentations with space for genuine dialogue.' },
  { n: '04', title: 'Launch', desc: 'Coordinated, considered, and built to land. We don\'t disappear at delivery — we see the work into the world and measure its impact.' },
];

const faqs = [
  { q: 'What size projects do you take on?', a: 'We work with funded startups, growing SMEs, and established enterprises. Project sizes range from focused brand identity work (from £15k) to full multi-discipline retainers. What matters most to us is the quality of the brief and the ambition behind it.' },
  { q: 'How long does a typical project take?', a: 'A full brand identity project runs 8–12 weeks. A website build follows the same. Combined brand + web projects typically run 14–18 weeks. We move purposefully rather than quickly, because the work demands it.' },
  { q: 'Do you work with international clients?', a: 'Yes — around 40% of our clients are based outside the UK. We\'ve worked with brands in 18 countries and have a remote collaboration process refined over years.' },
  { q: 'Can we work with you on just one discipline?', a: 'Absolutely. Many of our clients come to us for a single service — web only, or brand identity only. We offer each discipline as a standalone engagement.' },
];

function FAQItem({ q, a, i }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.08, duration: 0.6 }}
      style={{ borderBottom: '1px solid rgba(201,168,76,0.08)' }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '24px 0', background: 'none', border: 'none', cursor: 'none', textAlign: 'left', gap: 20,
        }}
      >
        <span style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '1.15rem', fontWeight: 400, color: '#F5F0E8' }}>{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ color: '#C9A84C', fontSize: '1.4rem', fontWeight: 300, flexShrink: 0, lineHeight: 1 }}
        >+</motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{ color: '#A89F8C', lineHeight: 1.8, fontSize: '0.93rem', paddingBottom: 24 }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Services() {
  const [activeDisc, setActiveDisc] = useState(0);

  return (
    <main style={{ paddingTop: 80 }}>

      {/* Header */}
      <section style={{ padding: '120px 0 80px', background: '#0D0D0D', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: 500, height: 500, background: 'radial-gradient(circle,rgba(201,168,76,0.05),transparent 70%)', pointerEvents: 'none' }} />
        <div className="container">
          <Reveal>
            <div className="eyebrow" style={{ marginBottom: 24 }}>What we offer</div>
            <h1 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(3rem,6vw,5rem)', fontWeight: 300, color: '#F5F0E8', lineHeight: 1.05, letterSpacing: '-0.02em', maxWidth: '14ch' }}>
              Four disciplines.<br /><em style={{ color: '#C9A84C' }}>Infinite possibilities.</em>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ color: '#A89F8C', fontSize: '1rem', lineHeight: 1.8, maxWidth: 480, marginTop: 24 }}>
              We don't do everything. We do four things with rare depth — and we know when to bring in trusted specialists to go further still.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Disciplines — tabbed */}
      <section style={{ background: '#111111', padding: '100px 0' }}>
        <div className="container">
          {/* Tabs */}
          <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid rgba(201,168,76,0.08)', marginBottom: 60, overflowX: 'auto' }}>
            {disciplines.map((d, i) => (
              <button key={i} onClick={() => setActiveDisc(i)}
                style={{
                  padding: '18px 32px', background: 'none', border: 'none', cursor: 'none',
                  fontFamily: 'Cormorant Garamond,serif', fontSize: '1.05rem', fontWeight: activeDisc === i ? 600 : 400,
                  color: activeDisc === i ? d.accent : '#5A5347',
                  borderBottom: `2px solid ${activeDisc === i ? d.accent : 'transparent'}`,
                  marginBottom: '-1px', transition: 'all 0.25s', whiteSpace: 'nowrap',
                }}>
                <span style={{ fontFamily: 'DM Mono', fontSize: '0.65rem', marginRight: 8, opacity: 0.6 }}>{d.num}</span>
                {d.title}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeDisc}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
                <div>
                  <div style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '1.1rem', fontStyle: 'italic', color: disciplines[activeDisc].accent, marginBottom: 20 }}>
                    {disciplines[activeDisc].tagline}
                  </div>
                  <p style={{ color: '#A89F8C', fontSize: '1.02rem', lineHeight: 1.85, marginBottom: 40 }}>
                    {disciplines[activeDisc].desc}
                  </p>
                  <div style={{ padding: '20px 24px', background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.1)', borderRadius: 4, marginBottom: 32 }}>
                    <div style={{ fontFamily: 'DM Mono', fontSize: '0.65rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#5A5347', marginBottom: 12 }}>Case study</div>
                    <div style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '1.3rem', fontWeight: 600, color: '#F5F0E8' }}>{disciplines[activeDisc].caseStudy}</div>
                  </div>
                  <Link to="/contact" className="btn btn-gold">Start this project</Link>
                </div>

                <div>
                  <div style={{ fontFamily: 'DM Mono', fontSize: '0.65rem', letterSpacing: '3px', textTransform: 'uppercase', color: '#5A5347', marginBottom: 24 }}>What's included</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                    {disciplines[activeDisc].deliverables.map((d, i) => (
                      <motion.div key={d}
                        initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07, duration: 0.4 }}
                        style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 0', borderBottom: '1px solid rgba(201,168,76,0.06)' }}
                      >
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: disciplines[activeDisc].accent, flexShrink: 0, boxShadow: `0 0 8px ${disciplines[activeDisc].accent}` }} />
                        <span style={{ color: '#A89F8C', fontSize: '0.92rem' }}>{d}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Process */}
      <section className="section" style={{ background: '#0D0D0D' }}>
        <div className="container">
          <Reveal style={{ marginBottom: 64 }}>
            <div className="eyebrow" style={{ marginBottom: 20 }}>How we work</div>
            <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 300, color: '#F5F0E8', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              A process built for<br /><em style={{ color: '#C9A84C' }}>clarity and momentum.</em>
            </h2>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2 }}>
            {process.map((step, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ background: 'rgba(201,168,76,0.03)' }}
                  style={{ padding: '40px 32px', border: '1px solid rgba(201,168,76,0.07)', transition: 'background 0.3s', position: 'relative', overflow: 'hidden' }}
                >
                  <div style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '4rem', fontWeight: 300, color: 'rgba(201,168,76,0.07)', lineHeight: 1, marginBottom: 24, position: 'absolute', top: 20, right: 24 }}>{step.n}</div>
                  <div style={{ fontFamily: 'DM Mono', fontSize: '0.65rem', letterSpacing: '2px', color: '#C9A84C', textTransform: 'uppercase', marginBottom: 16 }}>{step.n}</div>
                  <h3 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '1.3rem', fontWeight: 600, color: '#F5F0E8', marginBottom: 12 }}>{step.title}</h3>
                  <p style={{ color: '#A89F8C', fontSize: '0.88rem', lineHeight: 1.75 }}>{step.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: '#111111' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 100, alignItems: 'start' }}>
            <Reveal>
              <div className="eyebrow" style={{ marginBottom: 20 }}>FAQs</div>
              <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(2rem,3.5vw,2.8rem)', fontWeight: 300, color: '#F5F0E8', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                Common<br /><em style={{ color: '#C9A84C' }}>questions.</em>
              </h2>
              <Link to="/contact" className="btn btn-ghost" style={{ marginTop: 40 }}>
                Ask us directly <span className="btn-ghost-arrow">→</span>
              </Link>
            </Reveal>
            <div>
              {faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} i={i} />)}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#0D0D0D', padding: '120px 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 300, background: 'radial-gradient(ellipse,rgba(201,168,76,0.06),transparent 70%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <Reveal>
            <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(2.5rem,5vw,4.5rem)', fontWeight: 300, color: '#F5F0E8', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 32 }}>
              Ready to begin?
            </h2>
            <Link to="/contact" className="btn btn-gold" style={{ padding: '16px 48px', fontSize: '1rem' }}>
              Start a conversation
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
