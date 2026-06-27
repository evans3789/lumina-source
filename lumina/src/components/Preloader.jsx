import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onDone }) {
  const [pct, setPct] = useState(0);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const iv = setInterval(() => {
      setPct(p => {
        const next = p + Math.random() * 14 + 4;
        if (next >= 100) {
          clearInterval(iv);
          setTimeout(() => setExit(true), 300);
          setTimeout(onDone, 900);
          return 100;
        }
        return next;
      });
    }, 90);
    return () => clearInterval(iv);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!exit && (
        <motion.div
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 999999,
            background: '#0D0D0D',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: 48,
          }}
        >
          {/* Logo mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}
          >
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <motion.circle cx="30" cy="30" r="28" stroke="#C9A84C" strokeWidth="0.8"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 0.1, ease: 'easeInOut' }} />
              <motion.polygon points="30,10 48,44 12,44" fill="none" stroke="#C9A84C" strokeWidth="1.2"
                initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }} />
              <motion.circle cx="30" cy="30" r="4" fill="#E8C97A"
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 1.2, ease: [0.34, 1.56, 0.64, 1] }} />
            </svg>
            <motion.div
              initial={{ opacity: 0, letterSpacing: '6px' }}
              animate={{ opacity: 1, letterSpacing: '12px' }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '1.1rem', fontWeight: 300,
                letterSpacing: '12px', color: '#C9A84C',
                textTransform: 'uppercase',
              }}
            >Lumina</motion.div>
          </motion.div>

          {/* Progress */}
          <div style={{ width: 200, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ height: 1, background: 'rgba(201,168,76,0.12)', borderRadius: 1, overflow: 'hidden' }}>
              <motion.div
                animate={{ width: `${Math.min(pct, 100)}%` }}
                transition={{ duration: 0.12 }}
                style={{ height: '100%', background: 'linear-gradient(90deg,#9A7A35,#C9A84C,#E8C97A)', boxShadow: '0 0 8px #C9A84C' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'DM Mono', fontSize: '0.68rem', color: '#5A5347' }}>
              <span>Loading experience</span>
              <span>{Math.min(Math.round(pct), 100)}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
