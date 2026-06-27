import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '../components/Reveal';

const projectTypes = ['Brand Identity', 'Website', 'Motion & Film', 'Campaign Strategy', 'Full Studio Partnership', 'Something else'];
const budgets = ['£10k – £25k', '£25k – £50k', '£50k – £100k', '£100k+', 'Let\'s discuss'];
const timelines = ['ASAP', '1–3 months', '3–6 months', '6+ months', 'Flexible'];

export default function Contact() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', email: '', company: '', type: '', budget: '', timeline: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const canGoNext = () => {
    if (step === 1) return form.name.trim() && form.email.trim();
    if (step === 2) return form.type;
    return true;
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 2000);
  };

  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(201,168,76,0.15)',
    borderRadius: 2, padding: '16px 18px',
    color: '#F5F0E8', fontFamily: 'DM Sans,sans-serif', fontSize: '0.95rem',
    outline: 'none', transition: 'border-color 0.25s, box-shadow 0.25s',
  };

  const labelStyle = {
    display: 'block', fontFamily: 'DM Mono,monospace', fontSize: '0.65rem',
    letterSpacing: '2px', textTransform: 'uppercase', color: '#5A5347', marginBottom: 10,
  };

  const steps = [
    {
      title: 'Who are you?',
      subtitle: 'Tell us a little about yourself.',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <label style={labelStyle}>Your name *</label>
            <input style={inputStyle} placeholder="Isabel Chen" value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              onFocus={e => { e.target.style.borderColor = '#C9A84C'; e.target.style.boxShadow = '0 0 0 3px rgba(201,168,76,0.1)'; }}
              onBlur={e => { e.target.style.borderColor = 'rgba(201,168,76,0.15)'; e.target.style.boxShadow = 'none'; }} />
          </div>
          <div>
            <label style={labelStyle}>Email address *</label>
            <input style={inputStyle} type="email" placeholder="isabel@company.com" value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              onFocus={e => { e.target.style.borderColor = '#C9A84C'; e.target.style.boxShadow = '0 0 0 3px rgba(201,168,76,0.1)'; }}
              onBlur={e => { e.target.style.borderColor = 'rgba(201,168,76,0.15)'; e.target.style.boxShadow = 'none'; }} />
          </div>
          <div>
            <label style={labelStyle}>Company (optional)</label>
            <input style={inputStyle} placeholder="Your company or brand" value={form.company}
              onChange={e => setForm({ ...form, company: e.target.value })}
              onFocus={e => { e.target.style.borderColor = '#C9A84C'; e.target.style.boxShadow = '0 0 0 3px rgba(201,168,76,0.1)'; }}
              onBlur={e => { e.target.style.borderColor = 'rgba(201,168,76,0.15)'; e.target.style.boxShadow = 'none'; }} />
          </div>
        </div>
      ),
    },
    {
      title: 'What do you need?',
      subtitle: 'Choose the type of work you have in mind.',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div>
            <label style={labelStyle}>Project type *</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {projectTypes.map(t => (
                <button key={t} onClick={() => setForm({ ...form, type: t })}
                  style={{
                    padding: '10px 20px', borderRadius: 2, cursor: 'none',
                    border: `1px solid ${form.type === t ? '#C9A84C' : 'rgba(201,168,76,0.15)'}`,
                    background: form.type === t ? 'rgba(201,168,76,0.1)' : 'transparent',
                    color: form.type === t ? '#C9A84C' : '#A89F8C',
                    fontFamily: 'DM Sans,sans-serif', fontSize: '0.88rem',
                    transition: 'all 0.2s',
                  }}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label style={labelStyle}>Approximate budget</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {budgets.map(b => (
                <button key={b} onClick={() => setForm({ ...form, budget: b })}
                  style={{
                    padding: '10px 20px', borderRadius: 2, cursor: 'none',
                    border: `1px solid ${form.budget === b ? '#C9A84C' : 'rgba(201,168,76,0.15)'}`,
                    background: form.budget === b ? 'rgba(201,168,76,0.1)' : 'transparent',
                    color: form.budget === b ? '#C9A84C' : '#A89F8C',
                    fontFamily: 'DM Mono,monospace', fontSize: '0.78rem',
                    transition: 'all 0.2s',
                  }}>
                  {b}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label style={labelStyle}>Timeline</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {timelines.map(t => (
                <button key={t} onClick={() => setForm({ ...form, timeline: t })}
                  style={{
                    padding: '10px 18px', borderRadius: 2, cursor: 'none',
                    border: `1px solid ${form.timeline === t ? '#C9A84C' : 'rgba(201,168,76,0.15)'}`,
                    background: form.timeline === t ? 'rgba(201,168,76,0.1)' : 'transparent',
                    color: form.timeline === t ? '#C9A84C' : '#A89F8C',
                    fontFamily: 'DM Sans,sans-serif', fontSize: '0.85rem',
                    transition: 'all 0.2s',
                  }}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Tell us more.',
      subtitle: 'Anything else we should know before we connect?',
      content: (
        <div>
          <label style={labelStyle}>Your brief (optional)</label>
          <textarea
            style={{ ...inputStyle, minHeight: 180, resize: 'vertical', lineHeight: 1.7 }}
            placeholder="Tell us about your project, your ambitions, challenges, or anything else you'd like us to know..."
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
            onFocus={e => { e.target.style.borderColor = '#C9A84C'; e.target.style.boxShadow = '0 0 0 3px rgba(201,168,76,0.1)'; }}
            onBlur={e => { e.target.style.borderColor = 'rgba(201,168,76,0.15)'; e.target.style.boxShadow = 'none'; }}
          />
        </div>
      ),
    },
  ];

  return (
    <main style={{ paddingTop: 80, minHeight: '100vh' }}>
      <section style={{ padding: '80px 0 140px', background: '#0D0D0D', position: 'relative', overflow: 'hidden' }}>
        {/* Ambient decoration */}
        <div style={{ position: 'absolute', top: 0, right: 0, width: 600, height: 600, background: 'radial-gradient(circle,rgba(201,168,76,0.04),transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: 400, height: 400, background: 'radial-gradient(circle,rgba(123,94,167,0.04),transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(201,168,76,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.018) 1px,transparent 1px)', backgroundSize: '80px 80px', pointerEvents: 'none' }} />

        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 120, alignItems: 'start' }}>

            {/* Left info */}
            <div>
              <Reveal>
                <div className="eyebrow" style={{ marginBottom: 24 }}>Get in touch</div>
                <h1 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(2.8rem,5vw,4.5rem)', fontWeight: 300, color: '#F5F0E8', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 28 }}>
                  Let's start<br /><em style={{ color: '#C9A84C' }}>something.</em>
                </h1>
                <p style={{ color: '#A89F8C', lineHeight: 1.8, fontSize: '0.97rem', marginBottom: 48, maxWidth: 400 }}>
                  We respond to every enquiry within one business day with our honest initial thoughts on how we can help — and whether we're the right fit.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 48 }}>
                  <a href="mailto:hello@lumina.studio" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 16, padding: '18px 22px', border: '1px solid rgba(201,168,76,0.1)', borderRadius: 2, transition: 'border-color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.1)'}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    </div>
                    <div>
                      <div style={{ fontFamily: 'DM Mono', fontSize: '0.65rem', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#5A5347', marginBottom: 3 }}>Email</div>
                      <div style={{ color: '#F5F0E8', fontSize: '0.9rem' }}>hello@lumina.studio</div>
                    </div>
                  </a>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 22px', background: 'rgba(90,138,60,0.05)', border: '1px solid rgba(90,138,60,0.15)', borderRadius: 2 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#5A8A3C', boxShadow: '0 0 10px #5A8A3C', animation: 'pulse 2s ease-in-out infinite' }} />
                    <div>
                      <div style={{ color: '#5A8A3C', fontWeight: 500, fontSize: '0.88rem' }}>Currently accepting briefs</div>
                      <div style={{ color: '#5A5347', fontFamily: 'DM Mono', fontSize: '0.65rem' }}>Projects starting from August 2025</div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.25}>
                <div>
                  <div style={{ fontFamily: 'DM Mono', fontSize: '0.62rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#5A5347', marginBottom: 16 }}>Follow our work</div>
                  <div style={{ display: 'flex', gap: 12 }}>
                    {['Instagram', 'LinkedIn', 'Behance', 'Dribbble'].map(s => (
                      <a key={s} href="#" style={{ padding: '8px 16px', border: '1px solid rgba(201,168,76,0.1)', borderRadius: 2, fontFamily: 'DM Sans', fontSize: '0.78rem', color: '#5A5347', textDecoration: 'none', transition: 'all 0.2s' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)'; e.currentTarget.style.color = '#C9A84C'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.1)'; e.currentTarget.style.color = '#5A5347'; }}>
                        {s}
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right: Multi-step form */}
            <Reveal direction="left">
              <div style={{ background: '#111111', border: '1px solid rgba(201,168,76,0.1)', borderRadius: 4, overflow: 'hidden' }}>
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div key="done"
                      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                      style={{ padding: '60px 48px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}
                    >
                      <motion.div
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                        style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.8">
                          <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </motion.div>
                      <div>
                        <h3 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '1.8rem', fontWeight: 300, color: '#F5F0E8', marginBottom: 12 }}>Message received.</h3>
                        <p style={{ color: '#A89F8C', fontSize: '0.9rem', lineHeight: 1.75 }}>
                          Thank you, {form.name.split(' ')[0]}. We've received your brief and will be in touch within one business day.
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      {/* Step indicators */}
                      <div style={{ display: 'flex', borderBottom: '1px solid rgba(201,168,76,0.08)' }}>
                        {steps.map((_, i) => (
                          <div key={i} style={{ flex: 1, padding: '14px 0', textAlign: 'center', borderRight: i < 2 ? '1px solid rgba(201,168,76,0.08)' : 'none', position: 'relative' }}>
                            <div style={{ fontFamily: 'DM Mono', fontSize: '0.62rem', letterSpacing: '1px', color: step > i + 1 ? '#C9A84C' : step === i + 1 ? '#F5F0E8' : '#5A5347', transition: 'color 0.3s' }}>
                              {step > i + 1 ? '✓' : `0${i + 1}`}
                            </div>
                            {step === i + 1 && (
                              <motion.div layoutId="step-indicator"
                                style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: '#C9A84C', boxShadow: '0 0 6px #C9A84C' }} />
                            )}
                          </div>
                        ))}
                      </div>

                      <div style={{ padding: '40px 48px' }}>
                        <AnimatePresence mode="wait">
                          <motion.div key={step}
                            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
                          >
                            <h3 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '1.6rem', fontWeight: 400, color: '#F5F0E8', marginBottom: 8 }}>{steps[step - 1].title}</h3>
                            <p style={{ fontFamily: 'DM Mono', fontSize: '0.68rem', color: '#5A5347', letterSpacing: '1px', marginBottom: 32 }}>{steps[step - 1].subtitle}</p>
                            {steps[step - 1].content}
                          </motion.div>
                        </AnimatePresence>

                        {/* Navigation */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 40 }}>
                          {step > 1 ? (
                            <button onClick={() => setStep(step - 1)}
                              style={{ background: 'none', border: 'none', cursor: 'none', color: '#5A5347', fontFamily: 'DM Sans', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: 8, transition: 'color 0.2s' }}
                              onMouseEnter={e => e.currentTarget.style.color = '#A89F8C'}
                              onMouseLeave={e => e.currentTarget.style.color = '#5A5347'}>
                              ← Back
                            </button>
                          ) : <div />}

                          {step < steps.length ? (
                            <button onClick={() => canGoNext() && setStep(step + 1)}
                              className="btn btn-gold"
                              style={{ opacity: canGoNext() ? 1 : 0.4, transition: 'opacity 0.2s', cursor: 'none', padding: '12px 32px' }}>
                              Continue →
                            </button>
                          ) : (
                            <button onClick={handleSubmit} className="btn btn-gold" style={{ padding: '12px 32px' }} disabled={loading}>
                              {loading ? (
                                <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                  <span style={{ width: 16, height: 16, border: '1.5px solid rgba(13,13,13,0.3)', borderTopColor: '#0D0D0D', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
                                  Sending…
                                </span>
                              ) : 'Send Brief →'}
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes pulse { 0%,100%{box-shadow:0 0 6px #5A8A3C;} 50%{box-shadow:0 0 18px #5A8A3C,0 0 30px rgba(90,138,60,0.3);} }
        @keyframes spin { to{transform:rotate(360deg);} }
      `}</style>
    </main>
  );
}
