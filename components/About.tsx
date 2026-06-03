'use client';

import { useEffect, useRef } from 'react';
import styles from './About.module.css';

const stats = [
  { value: '6+', label: 'Years in enterprise SaaS' },
  { value: '50+', label: 'Accounts managed' },
  { value: '0%', label: 'Logo churn — 3 consecutive years' },
  { value: '140%', label: 'NRR growth' },
];

const experience = [
  {
    period: 'Mar 2024 — Present',
    company: 'Milestone Inc.',
    location: 'Toronto, ON',
    role: 'Strategic Customer Success Manager',
    highlights: [
      '100% renewal rate · 140% NRR growth',
      'Own lifecycle for 50+ mid-market accounts',
      'Present monthly performance reports to C-suite, improving client ROI by 30%',
      'Channeled customer feedback into product roadmap — influenced 2 feature releases',
    ],
  },
  {
    period: 'Mar 2023 — Feb 2024',
    company: 'Milestone Internet Pvt Ltd',
    location: 'Ahmedabad, India',
    role: 'Customer Success Manager',
    highlights: [
      '0% churn — every client renewed · 35% YOY expansion revenue',
      'Managed 40+ enterprise and mid-market B2B SaaS accounts',
      'Drove expansion via upsell and cross-sell strategies with Sales',
    ],
  },
  {
    period: 'Oct 2021 — Mar 2023',
    company: 'Adit Tech Pvt Ltd',
    location: 'Ahmedabad, India',
    role: 'Product Specialist',
    highlights: [
      '3 product improvements · 25% support ticket reduction',
      'Bridge between customers and product — synthesized VoC into weekly reports',
      'Cut average time-to-value by 2 weeks by redesigning onboarding',
    ],
  },
  {
    period: 'Sep 2017 — Oct 2020',
    company: '_VOIS (Vodafone Group)',
    location: 'Ahmedabad, India',
    role: 'Senior Executive',
    highlights: [
      'Top performer across 8 consecutive quarters on CSAT and first-contact resolution',
      'Enterprise client support across high-volume regulated European markets',
    ],
  },
];

const skills = [
  { group: 'PM', items: ['Product Discovery', 'User Research', 'PRD Writing', 'Roadmapping', 'RICE Prioritization', 'Jobs-to-be-Done', 'Go-to-Market'] },
  { group: 'AI & Build', items: ['Claude API', 'LLM Integration', 'React / TypeScript', 'Figma (UI/UX)', 'Prompt Engineering'] },
  { group: 'CS & Strategy', items: ['QBR Facilitation', 'Renewal Strategy', 'Churn Prevention', 'Stakeholder Management', 'KPI Tracking'] },
];

export default function About() {
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
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    itemRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const addRef = (el: HTMLElement | null, i: number) => { itemRefs.current[i] = el; };

  return (
    <section id="about" className={styles.section}>

      {/* ── About block ───────────────────────────────────── */}
      <div className={styles.aboutBlock}>
        <div className={styles.header}>
          <span className={styles.sectionLabel}>01 — About</span>
          <h2 className={styles.sectionTitle}>Who I am.</h2>
        </div>

        <div
          className={styles.aboutContent}
          ref={(el) => addRef(el, 0)}
          style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}
        >
          <p className={styles.aboutLead}>
            I&apos;m a product manager with 6+ years on the front lines of enterprise SaaS —
            not in a boardroom, but in the trenches with customers.
          </p>
          <p className={styles.aboutBody}>
            I&apos;ve managed 50+ accounts, driven 0% churn across three consecutive years,
            and grown portfolios to 140% NRR. That&apos;s not a CS track record. That&apos;s a PM foundation.
            I&apos;m completing a Digital Product Management program at George Brown College (2026)
            while actively building AI-powered products that solve the exact problems I watched go unsolved.
          </p>
          <blockquote className={styles.quote}>
            &ldquo;The best products are built at the intersection of customer pain and business constraint.
            My process starts with listening — I&apos;ve spent 6 years doing exactly that.&rdquo;
          </blockquote>
        </div>

        {/* Stats */}
        <div
          className={styles.stats}
          ref={(el) => addRef(el, 1)}
          style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s' }}
        >
          {stats.map((s) => (
            <div key={s.value} className={styles.stat}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Experience block ──────────────────────────────── */}
      <div className={styles.expBlock} id="experience">
        <div className={styles.header}>
          <span className={styles.sectionLabel}>03 — Work History</span>
          <h2 className={styles.sectionTitle}>Where I&apos;ve been.</h2>
        </div>

        <div className={styles.timeline}>
          {experience.map((job, i) => (
            <div
              key={job.company}
              className={styles.timelineItem}
              ref={(el) => addRef(el, i + 2)}
              style={{ opacity: 0, transform: 'translateY(30px)', transition: `opacity 0.7s ease ${i * 0.1}s, transform 0.7s ease ${i * 0.1}s` }}
            >
              <div className={styles.timelineMeta}>
                <span className={styles.period}>{job.period}</span>
                <span className={styles.location}>{job.location}</span>
              </div>
              <div className={styles.timelineContent}>
                <div className={styles.jobHeader}>
                  <h3 className={styles.company}>{job.company}</h3>
                  <span className={styles.role}>{job.role}</span>
                </div>
                <ul className={styles.highlights}>
                  {job.highlights.map((h) => (
                    <li key={h} className={styles.highlight}>{h}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Skills block ─────────────────────────────────── */}
      <div className={styles.skillsBlock}>
        <div
          className={styles.skillsGrid}
          ref={(el) => addRef(el, 10)}
          style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}
        >
          {skills.map((group) => (
            <div key={group.group} className={styles.skillGroup}>
              <span className={styles.skillGroupLabel}>{group.group}</span>
              <div className={styles.skillTags}>
                {group.items.map((item) => (
                  <span key={item} className={styles.skillTag}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
