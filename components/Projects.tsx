'use client';

import { useEffect, useRef } from 'react';
import styles from './Projects.module.css';

const projects = [
  {
    index: '01',
    status: 'In Progress',
    statusLive: false,
    title: 'PathPlan',
    tagline: 'Increase your interview probability.',
    role: 'Solo PM · Researcher · Builder',
    stack: ['React', 'TypeScript', 'Claude API', 'Figma'],
    problem:
      'Job seekers apply blindly — they don\'t know which skills matter most, how far they are from interview readiness, or what actions will meaningfully improve their chances. Most tools solve ATS matching but leave the critical middle completely unaddressed.',
    outcome:
      'Renamed from SkillGap AI → PathPlan. Restructured the core loop to lead with the plan, not the score. A score without a path is useless.',
    metric: '5+ user interviews · Figma prototype live',
    link: 'https://cabin-rise-77599189.figma.site/',
    linkLabel: 'View Prototype →',
    prdLink: null,
  },
  {
    index: '02',
    status: 'Live',
    statusLive: true,
    title: 'HospitalityIQ',
    tagline: 'Competitive intelligence for hotels — without the enterprise price tag.',
    role: 'Solo PM · Builder',
    stack: ['React', 'Claude API', 'Vercel'],
    problem:
      'Hospitality businesses have almost no affordable way to track competitors in real time. They rely on gut feel or expensive enterprise tools. Operators knew something was wrong but had no defensible data to act on.',
    outcome:
      'Built a lean competitive intelligence layer specifically for mid-market hotel operators. Democratises data that was previously locked behind $50K enterprise contracts.',
    metric: 'Live product · Real users',
    link: null,
    linkLabel: null,
    prdLink: null,
  },
  {
    index: '03',
    status: 'Capstone',
    statusLive: false,
    title: 'Loopless',
    tagline: 'Strategic Decision Intelligence Platform.',
    role: 'BA · Associate PM · Team of 4',
    stack: ['Figma', 'PRD', 'User Research', 'Prototype'],
    problem:
      'Mid-market product teams lose visibility when a project drifts from its intended outcomes. Existing tools track activity — tasks, velocity, assignments — but not outcome alignment. There\'s no early-warning system for silent drift.',
    outcome:
      'Identified the "Evidence Difficulty Problem" — teams know projects are failing but lack data to prove it early enough. Designed an AI decision intelligence layer that sits on top of existing tools, reducing adoption friction.',
    metric: '5+ interviews · Full PRD · Usability tested',
    link: null,
    linkLabel: null,
    prdLink: '/docs/loopless-case-study.docx',
  },
  {
    index: '04',
    status: 'Capstone',
    statusLive: false,
    title: 'ReadyToTalk',
    tagline: 'Real-time presence for in-person connection.',
    role: 'Solo PM · Designer · Full-Stack Builder',
    stack: ['TypeScript', 'React', 'Cloudflare Workers', 'Drizzle ORM'],
    problem:
      'Modern public spaces are paradoxically full of people yet deeply isolating. There\'s no shared, low-risk signal that tells both parties the other is open to talking right now. It\'s an information asymmetry problem, not a motivation problem.',
    outcome:
      'Built and deployed full-stack. Core mechanic: a reversible, consent-forward toggle that eliminates social risk asymmetry. When both people can simultaneously signal openness — and either can withdraw — the friction collapses.',
    metric: 'Deployed · CI/CD · 6 DB migrations',
    link: null,
    linkLabel: null,
    prdLink: null,
  },
  {
    index: '05',
    status: 'Capstone',
    statusLive: false,
    title: 'Setu',
    tagline: 'Spiritual services platform for the Indian diaspora in Canada.',
    role: 'Solo PM · PRD Author',
    stack: ['PRD', 'Figma', 'Product Strategy', 'MVP Planning'],
    problem:
      'The Indian diaspora in Canada finds priests through word-of-mouth, drives across the city for pooja supplies, and books astrology via unverified WhatsApp referrals. A deeply fragmented market with no trusted digital layer.',
    outcome:
      'Designed a full-stack platform connecting verified pandits, samagri supply, and calendar booking. Dual-channel notification system (Push + WhatsApp fallback) for mixed smartphone adoption. GTA-first, Year 1 target: 10K users + 5K bookings.',
    metric: 'Full PRD v2 · MVP Build Plan',
    link: 'http://capstoneproject-gilt.vercel.app/',
    linkLabel: 'View Live →',
    prdLink: '/docs/setu-prd.docx',
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

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
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="work" className={styles.section} ref={sectionRef}>
      {/* Section header */}
      <div className={styles.header}>
        <span className={styles.sectionNum}>02</span>
        <div>
          <span className={styles.sectionLabel}>Work Samples</span>
          <h2 className={styles.sectionTitle}>What I build.</h2>
        </div>
      </div>

      {/* Project list */}
      <div className={styles.list}>
        {projects.map((p, i) => (
          <div
            key={p.index}
            className={styles.item}
            ref={(el) => { itemRefs.current[i] = el; }}
            style={{ opacity: 0, transform: 'translateY(40px)', transition: `opacity 0.7s ease ${i * 0.1}s, transform 0.7s ease ${i * 0.1}s` }}
          >
            {/* Left col */}
            <div className={styles.itemLeft}>
              <span className={styles.itemIndex}>{p.index}</span>
              <span className={`${styles.itemStatus} ${p.statusLive ? styles.statusLive : ''}`}>
                {p.status}
              </span>
            </div>

            {/* Main col */}
            <div className={styles.itemMain}>
              <div className={styles.itemHeader}>
                <h3 className={styles.itemTitle}>{p.title}</h3>
                <p className={styles.itemTagline}>{p.tagline}</p>
              </div>

              <div className={styles.itemBody}>
                <div className={styles.itemBlock}>
                  <span className={styles.blockLabel}>The Problem</span>
                  <p className={styles.blockText}>{p.problem}</p>
                </div>
                <div className={styles.itemBlock}>
                  <span className={styles.blockLabel}>Key Decision</span>
                  <p className={styles.blockText}>{p.outcome}</p>
                </div>
              </div>

              <div className={styles.itemFooter}>
                <div className={styles.stack}>
                  {p.stack.map((s) => (
                    <span key={s} className={styles.tag}>{s}</span>
                  ))}
                </div>
                <div className={styles.itemMeta}>
                  <span className={styles.metric}>{p.metric}</span>
                  {p.prdLink && (
                    <a href={p.prdLink} download className={styles.prdLink}>
                      ↓ View PRD
                    </a>
                  )}
                  {p.link && (
                    <a href={p.link} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                      {p.linkLabel}
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className={styles.itemRole}>
              <span>{p.role}</span>
            </div>
          </div>
        ))}
      </div>

      {/* GitHub CTA */}
      <div className={styles.githubCta}>
        <a href="https://github.com/cloudbyharsh" target="_blank" rel="noopener noreferrer" className={styles.githubLink}>
          All projects on GitHub →
        </a>
      </div>
    </section>
  );
}
