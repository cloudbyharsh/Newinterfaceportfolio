'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import styles from './VideoIntro.module.css';

const CinematicLayer = dynamic(() => import('./CinematicLayer'), { ssr: false });

export default function VideoIntro() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollLineRef = useRef<HTMLDivElement>(null);

  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [showSoundHint, setShowSoundHint] = useState(false);
  const [showSoundOverlay, setShowSoundOverlay] = useState(true);
  const [loaded, setLoaded] = useState(false);

  // GSAP entrance animation
  useEffect(() => {
    let gsap: typeof import('gsap').gsap;
    import('gsap').then(({ gsap: g }) => {
      gsap = g;
      const tl = gsap.timeline({ delay: 0.3 });
      tl.fromTo(
        heroRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: 'power2.out' }
      );
      if (contentRef.current) {
        const children = contentRef.current.children;
        tl.fromTo(
          Array.from(children),
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 1.0, stagger: 0.15, ease: 'power3.out' },
          '-=0.6'
        );
      }
      if (scrollLineRef.current) {
        tl.fromTo(
          scrollLineRef.current,
          { opacity: 0, scaleY: 0 },
          { opacity: 1, scaleY: 1, duration: 0.8, ease: 'power2.out' },
          '-=0.3'
        );
      }
    });
  }, [loaded]);

  const enableSound = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = false;
    setMuted(false);
    setShowSoundOverlay(false);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const next = !muted;
    videoRef.current.muted = next;
    setMuted(next);
    setShowSoundOverlay(false);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
      bgVideoRef.current?.pause();
    } else {
      videoRef.current.play();
      bgVideoRef.current?.play();
    }
    setPlaying(!playing);
  };

  const scrollToNext = () => {
    const next = document.getElementById('work');
    if (next) {
      next.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.hero} ref={heroRef}>
      {/* Ambient blurred background video */}
      <video
        ref={bgVideoRef}
        className={styles.bgVideo}
        src="/videos/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />

      {/* Dark gradient overlays */}
      <div className={styles.overlayBottom} />
      <div className={styles.overlayTop} />
      <div className={styles.overlayLeft} />
      <div className={styles.overlayRight} />
      <div className={styles.overlayVignette} />

      {/* Three.js particle layer */}
      <CinematicLayer />

      {/* Foreground video */}
      <div className={styles.videoWrap}>
        <video
          ref={videoRef}
          className={styles.fgVideo}
          src="/videos/hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          onCanPlay={() => setLoaded(true)}
        />
        {/* Subtle edge fade on video */}
        <div className={styles.videoEdgeFade} />
      </div>

      {/* Content overlay */}
      <div className={styles.content} ref={contentRef}>
        <span className={styles.tagline}>Design · Strategy · Execution</span>

        <div className={styles.nameBlock}>
          <h1 className={styles.firstName}>HARSH</h1>
          <h1 className={styles.lastName}>SHAH</h1>
        </div>

        <p className={styles.subtitle}>
          Customer Success → Product
          <span className={styles.subtitleDot}> · </span>
          Building What Users Need
        </p>

        <p className={styles.supportingLine}>
          From the front lines of CS to the heart of product.
        </p>

        <a href="#work" className={styles.cta} onClick={(e) => { e.preventDefault(); scrollToNext(); }}>
          <span>See What I Build</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M7 1v12M1 7l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <button className={styles.controlBtn} onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'}>
          {playing ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="3" y="2" width="4" height="12" rx="1" fill="currentColor"/>
              <rect x="9" y="2" width="4" height="12" rx="1" fill="currentColor"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 2l10 6-10 6V2z" fill="currentColor"/>
            </svg>
          )}
        </button>

        <button className={styles.controlBtn} onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'}>
          {muted ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 5h3l4-3v12l-4-3H2V5z" fill="currentColor"/>
              <path d="M13 5l-3 3m0-3l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 5h3l4-3v12l-4-3H2V5z" fill="currentColor"/>
              <path d="M11 5.5a3 3 0 010 5M13 3.5a6 6 0 010 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          )}
        </button>
      </div>

      {/* Sound-on overlay — shown on load, click to enable audio */}
      {showSoundOverlay && (
        <button className={styles.soundOverlay} onClick={enableSound} aria-label="Enable sound">
          <span className={styles.soundOverlayDot} />
          <span className={styles.soundOverlayText}>Tap for sound</span>
        </button>
      )}

      {/* Scroll indicator */}
      <button className={styles.scrollIndicator} onClick={scrollToNext} aria-label="Scroll to next section">
        <div className={styles.scrollLine} ref={scrollLineRef} />
        <span className={styles.scrollLabel}>Scroll</span>
      </button>
    </section>
  );
}
