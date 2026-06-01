'use client';

import { useEffect, useState } from 'react';
import styles from './Nav.module.css';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
      <a
        href="#"
        className={styles.logo}
        onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
      >
        HS
      </a>

      {/* Desktop links */}
      <div className={styles.links}>
        {links.map((l) => (
          <a key={l.label} href={l.href} className={styles.link} onClick={(e) => handleNav(e, l.href)}>
            {l.label}
          </a>
        ))}
        <a
          href="#contact"
          className={styles.ctaLink}
          onClick={(e) => handleNav(e, '#contact')}
        >
          Get in touch
        </a>
      </div>

      {/* Mobile hamburger */}
      <button
        className={styles.hamburger}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className={`${styles.hLine} ${menuOpen ? styles.hLineOpen1 : ''}`} />
        <span className={`${styles.hLine} ${menuOpen ? styles.hLineOpen2 : ''}`} />
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {links.map((l) => (
            <a key={l.label} href={l.href} className={styles.mobileLink} onClick={(e) => handleNav(e, l.href)}>
              {l.label}
            </a>
          ))}
          <a href="mailto:haarsh.shahh@gmail.com" className={styles.mobileLinkCta}>
            haarsh.shahh@gmail.com
          </a>
        </div>
      )}
    </nav>
  );
}
