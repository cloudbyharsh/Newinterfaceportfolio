'use client';

import { useEffect, useRef } from 'react';
import styles from './Contact.module.css';

const recommendations = [
  {
    name: 'Janet Seet Ling Low',
    title: 'Client Success Leader · Managed Harsh directly',
    date: 'Feb 2026',
    quote:
      'His sense of initiative, thirst for learning and desire to operate at the bleeding edge meant he was a forerunner on the use of AI to improve both personal productivity and ensure his clients stayed ahead. Going above and beyond was his MO — apparent in his pristine retention record.',
  },
  {
    name: 'Brittany Parsons',
    title: 'Customer Success Leader · Managed Harsh directly',
    date: 'Apr 2025',
    quote:
      'His dedication and tenacity is phenomenal. He is constantly taking the initiative to learn new skills and even going the extra mile to train the rest of the team. Both colleagues and clients are always happy to be working with Harsh.',
  },
];

export default function Contact() {
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = '1';
            (entry.target as HTMLElement).style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1 }
    );
    itemRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ── Recommendations ─────────────────────────────── */}
      <section id="recommendations" className={styles.recoSection}>
        <div className={styles.header}>
          <span className={styles.sectionLabel}>04 — Recommendations</span>
          <h2 className={styles.sectionTitle}>What my leaders say.</h2>
        </div>

        <div className={styles.recoGrid}>
          {recommendations.map((r, i) => (
            <div
              key={r.name}
              className={styles.recoCard}
              ref={(el) => { itemRefs.current[i] = el; }}
              style={{ opacity: 0, transform: 'translateY(30px)', transition: `opacity 0.7s ease ${i * 0.15}s, transform 0.7s ease ${i * 0.15}s` }}
            >
              <p className={styles.recoQuote}>&ldquo;{r.quote}&rdquo;</p>
              <div className={styles.recoMeta}>
                <span className={styles.recoName}>{r.name}</span>
                <span className={styles.recoTitle}>{r.title}</span>
                <span className={styles.recoDate}>{r.date}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.recoFooter}>
          <a
            href="https://www.linkedin.com/in/harshashwinshah/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.recoLink}
          >
            All recommendations on LinkedIn →
          </a>
        </div>
      </section>

      {/* ── Contact ─────────────────────────────────────── */}
      <section id="contact" className={styles.contactSection}>
        <div
          className={styles.contactInner}
          ref={(el) => { itemRefs.current[5] = el; }}
          style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}
        >
          <span className={styles.contactEyebrow}>Currently open to work</span>
          <h2 className={styles.contactTitle}>
            Let&apos;s build<br />something.
          </h2>
          <p className={styles.contactSub}>
            Open to AI PM roles, Associate PM positions, and product conversations.
            If you&apos;re building something ambitious, I&apos;d like to hear about it.
          </p>

          <div className={styles.contactActions}>
            <a href="mailto:haarsh.shahh@gmail.com" className={styles.primaryAction}>
              haarsh.shahh@gmail.com
            </a>
            <a
              href="https://calendly.com/haarsh-shahh/30min"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondaryAction}
            >
              Book a 30-min call
            </a>
          </div>

          <div className={styles.contactLinks}>
            <a
              href="https://www.linkedin.com/in/harshashwinshah/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              LinkedIn
            </a>
            <span className={styles.socialDivider}>·</span>
            <a
              href="https://github.com/cloudbyharsh"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              GitHub
            </a>
            <span className={styles.socialDivider}>·</span>
            <span className={styles.socialMeta}>Toronto, Ontario</span>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <span className={styles.footerText}>© 2026 Harsh Shah</span>
          <span className={styles.footerMeta}>Toronto · Open to Work · AI PM</span>
        </div>
      </section>
    </>
  );
}
