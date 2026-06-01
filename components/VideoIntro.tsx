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
  const [showSoundOverlay, setShowSoundOverlay] = useState(true);
  const [loaded, setLoaded] = useState(false);

  // GSAP entrance animation
  useEffect(() => {
    import('gsap').then(({ gsap: g }) => {
      const tl = g.timeline({ delay: 0.3 });
      tl.fromTo(
        heroRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: 'power2.out' }
      );
      if (contentRef.current) {
        tl.fromTo(
          Array.from(contentRef.current.children),
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

  // Pause + mute when hero scrolls out of view, resume when back
  useEffect(() => {
    const section = heroRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        const bgVideo = bgVideoRef.current;
        if (!video) return;
        if (!entry.isIntersecting) {
          video.pause();
          video.muted = true;
          bgVideo?.pause();
          setMuted(true);
          setPlaying(false);
        } else {
          video.play().catch(() => {});
          bgVideo?.play().catch(() => {});
          setPlaying(true);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // On any user interaction anywhere in the hero, try to unmute
  const handleFirstInteraction = () => {
    if (!showSoundOverlay) return;
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.play().catch(() => {
      // Blocked — keep muted
      video.muted = true;
      setMuted(true);
    });
    setMuted(false);
    setShowSoundOverlay(false);
  };

  const enableSound = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    handleFirstInteraction();
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    const next = !muted;
    video.muted = next;
    setMuted(next);
    setShowSoundOverlay(false);
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
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

  const scrollToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = document.getElementById('about');
    if (next) next.scrollIntoView({ behavior: 'smooth' });
    else window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section
      className={styles.hero}
      ref={heroRef}
      onClick={handleFirstInteraction}
      onTouchEnd={handleFirstInteraction}
    >
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

        <a
          href="#about"
          className={styles.cta}
          onClick={scrollToNext}
        >
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

      {/* Tap for sound overlay */}
      {showSoundOverlay && (
        <button
          className={styles.soundOverlay}
          onClick={enableSound}
          onTouchEnd={enableSound}
          aria-label="Enable sound"
        >
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
