import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export function Reveal({ children, delay = 0, direction = 'up', className = '', style = {} }) {
  const [ref, inView] = useInView({ threshold: 0.12, triggerOnce: true });
  const dirs = {
    up:    { y: 50, x: 0 },
    down:  { y: -30, x: 0 },
    left:  { y: 0, x: 60 },
    right: { y: 0, x: -60 },
    scale: { y: 0, x: 0, scale: 0.88 },
    fade:  { y: 0, x: 0 },
  };
  return (
    <motion.div ref={ref} className={className} style={style}
      initial={{ opacity: 0, ...dirs[direction], scale: direction==='scale'?0.88:1 }}
      animate={inView ? { opacity: 1, y: 0, x: 0, scale: 1 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

export function StaggerReveal({ children, className = '', stagger = 0.1, threshold = 0.05 }) {
  const [ref, inView] = useInView({ threshold, triggerOnce: true });
  return (
    <motion.div ref={ref} className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{ visible: { transition: { staggerChildren: stagger } } }}>
      {children}
    </motion.div>
  );
}

export const revealItem = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};
