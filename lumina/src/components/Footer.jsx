import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const links = [
  { label: 'Work',     to: '/work' },
  { label: 'Services', to: '/services' },
  { label: 'About',    to: '/about' },
  { label: 'Contact',  to: '/contact' },
];

const socials = ['Instagram', 'LinkedIn', 'Behance', 'Dribbble'];

export default function Footer() {
  return (
    <footer style={{ background: '#0D0D0D', borderTop: '1px solid rgba(201,168,76,0.06)', padding: '80px 0 40px' }}>
      <div className="container">
        {/* Top */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 60, marginBottom: 80 }}>
          {/* Brand */}
          <div>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <svg width="28" height="28" viewBox="0 0 60 60" fill="none">
                <circle cx="30" cy="30" r="28" stroke="#C9A84C" strokeWidth="1"/>
                <polygon points="30,10 48,44 12,44" fill="none" stroke="#C9A84C" strokeWidth="1.4"/>
                <circle cx="30" cy="30" r="3" fill="#E8C97A"/>
              </svg>
              <span style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '1.1rem', fontWeight: 600, letterSpacing: '4px', color: '#F5F0E8', textTransform: 'uppercase' }}>Lumina</span>
            </Link>
            <p style={{ color: '#5A5347', fontSize: '0.88rem', lineHeight: 1.8, maxWidth: 280, marginBottom: 28 }}>
              A creative studio building brand identities, digital experiences, and motion work that leaves a permanent mark.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {socials.map(s => (
                <a key={s} href="#"
                  style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(201,168,76,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.62rem', fontFamily: 'DM Mono', color: '#5A5347', textDecoration: 'none', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'; e.currentTarget.style.color = '#C9A84C'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.12)'; e.currentTarget.style.color = '#5A5347'; }}
                  title={s}>
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div style={{ fontFamily: 'DM Mono', fontSize: '0.62rem', letterSpacing: '2.5px', textTransform: 'uppercase', color: '#5A5347', marginBottom: 20 }}>Navigation</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {links.map(l => (
                <li key={l.to}>
                  <Link to={l.to}
                    style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '1rem', color: '#A89F8C', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#C9A84C'}
                    onMouseLeave={e => e.currentTarget.style.color = '#A89F8C'}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontFamily: 'DM Mono', fontSize: '0.62rem', letterSpacing: '2.5px', textTransform: 'uppercase', color: '#5A5347', marginBottom: 20 }}>Contact</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <a href="mailto:hello@lumina.studio" style={{ color: '#A89F8C', textDecoration: 'none', fontSize: '0.88rem', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#C9A84C'}
                onMouseLeave={e => e.currentTarget.style.color = '#A89F8C'}>
                hello@lumina.studio
              </a>
              <span style={{ color: '#5A5347', fontSize: '0.82rem', fontFamily: 'DM Mono' }}>London, UK</span>
            </div>
          </div>

          {/* Awards */}
          <div>
            <div style={{ fontFamily: 'DM Mono', fontSize: '0.62rem', letterSpacing: '2.5px', textTransform: 'uppercase', color: '#5A5347', marginBottom: 20 }}>Recognised by</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['Awwwards', 'Design Week', 'CSS Design Awards', 'Vimeo Staff Picks'].map(a => (
                <div key={a} style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '0.9rem', color: '#5A5347' }}>{a}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.1),transparent)', marginBottom: 32 }} />

        {/* Bottom */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <span style={{ fontFamily: 'DM Mono', fontSize: '0.65rem', color: '#5A5347', letterSpacing: '1px' }}>
            © {new Date().getFullYear()} Lumina Studio Ltd. All rights reserved.
          </span>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy Policy', 'Terms of Use'].map(l => (
              <a key={l} href="#" style={{ fontFamily: 'DM Mono', fontSize: '0.65rem', color: '#5A5347', textDecoration: 'none', letterSpacing: '1px', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#A89F8C'}
                onMouseLeave={e => e.currentTarget.style.color = '#5A5347'}>
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
