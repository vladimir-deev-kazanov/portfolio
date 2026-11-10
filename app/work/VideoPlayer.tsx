"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

/*
 * A prototype recording without browser controls: one play/pause button
 * (44px, named) in the corner of the frame and a thin progress bar under it.
 * Plays while in view; with prefers-reduced-motion it waits for the button.
 */
export default function VideoPlayer({ src, poster, width, height, alt }: { src: string; poster: string; width: number; height: number; alt: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const userPaused = useRef(false);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!reduce.matches && !userPaused.current) v.play().catch(() => {});
      } else if (!v.paused) {
        v.pause();
      }
    }, { threshold: 0.5 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
    } else {
      userPaused.current = true;
      v.pause();
    }
  };

  return (
    <div className="video" style={{ "--ar": width / height } as CSSProperties}>
      <div className="video-frame" style={{ aspectRatio: `${width} / ${height}` }}>
        <video
          ref={video}
          src={src}
          poster={poster}
          width={width}
          height={height}
          muted
          loop
          playsInline
          preload="none"
          aria-label={alt}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onTimeUpdate={(e) => {
            const v = e.currentTarget;
            setProgress(v.duration ? v.currentTime / v.duration : 0);
          }}
          onClick={toggle}
        />
        <button type="button" className="video-toggle" onClick={toggle} aria-label={playing ? "Pause recording" : "Play recording"} aria-pressed={playing}>
          {playing ? (
            <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><rect x="3" y="2" width="3.5" height="12" rx="1" /><rect x="9.5" y="2" width="3.5" height="12" rx="1" /></svg>
          ) : (
            <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M4 2.5v11a.8.8 0 0 0 1.2.7l9-5.5a.8.8 0 0 0 0-1.4l-9-5.5A.8.8 0 0 0 4 2.5Z" /></svg>
          )}
        </button>
      </div>
      <div className="video-progress" aria-hidden="true"><span style={{ transform: `scaleX(${progress})` }} /></div>
    </div>
  );
}
