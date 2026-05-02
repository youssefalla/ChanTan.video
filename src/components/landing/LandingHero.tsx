"use client";

import { useEffect, useRef } from "react";

function buildParticles(container: HTMLElement) {
  const count = 22;
  for (let i = 0; i < count; i++) {
    const s = document.createElement("span");
    s.style.left = Math.random() * 100 + "%";
    s.style.top = Math.random() * 100 + "%";
    s.style.animationDelay = Math.random() * 4 + "s";
    s.style.animationDuration = 3 + Math.random() * 3 + "s";
    container.appendChild(s);
  }
}

function triggerBlurIn(el: HTMLElement) {
  const words = el.querySelectorAll<HTMLElement>(".bw");
  words.forEach((word, i) => {
    const delay = Math.pow(i / Math.max(words.length, 1), 0.8) * 0.3 + i * 0.036;
    word.style.transitionDelay = `${delay.toFixed(3)}s`;
  });
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el.classList.add("in");
    });
  });
}

function buildClipBars(container: HTMLElement, seed: number) {
  container.innerHTML = "";
  const bars: HTMLElement[] = [];
  const widths = [12, 18, 9, 22, 15, 8, 20, 14, 10, 17];
  for (let i = 0; i < widths.length; i++) {
    const b = document.createElement("div");
    const hue = 260 + (i % 3) * 20;
    b.style.cssText = `display:inline-block;height:100%;width:${widths[i]}px;border-radius:3px;background:hsla(${hue},70%,${50 + (i % 3) * 10}%,${0.55 + (i % 4) * 0.1});transition:opacity 0.8s ease;margin-right:2px;`;
    container.appendChild(b);
    bars.push(b);
  }
  return bars;
}

export default function LandingHero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);
  const kpiDurationRef = useRef<HTMLSpanElement>(null);
  const kpiCutsRef = useRef<HTMLSpanElement>(null);
  const kpiScoreRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressLabelRef = useRef<HTMLSpanElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headlineRef.current) triggerBlurIn(headlineRef.current);
    if (particlesRef.current) buildParticles(particlesRef.current);
    if (timelineRef.current) buildClipBars(timelineRef.current, 1.3);
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    let raf: number | null = null;
    function update() {
      raf = null;
      const y = Math.min(window.scrollY, 800);
      const p = y / 800;
      const rx = 14 - p * 10;
      const ry = -10 + p * 6;
      const tz = -p * 30;
      const ty = -p * 40;
      card!.style.transform = `translateY(${ty}px) translateZ(${tz}px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(1deg)`;
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let duration = 154; // seconds
    let cuts = 47;
    let score = 91;
    let progress = 72;

    function flash(el: HTMLElement | null) {
      if (!el) return;
      el.classList.remove("flip");
      void el.offsetWidth;
      el.classList.add("flip");
    }

    function tickClock() {
      if (!clockRef.current) return;
      const d = new Date();
      const hh = String(d.getHours()).padStart(2, "0");
      const mm = String(d.getMinutes()).padStart(2, "0");
      const ss = String(d.getSeconds()).padStart(2, "0");
      clockRef.current.textContent = `${hh}:${mm}:${ss}`;
    }

    function fmtDuration(s: number) {
      const m = Math.floor(s / 60);
      const sec = s % 60;
      return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
    }

    function tickNumbers() {
      duration = Math.max(30, Math.min(300, duration + Math.floor((Math.random() - 0.4) * 3)));
      if (Math.random() < 0.3) cuts = Math.max(30, Math.min(80, cuts + (Math.random() < 0.55 ? 1 : -1)));
      if (Math.random() < 0.2) score = Math.max(78, Math.min(98, score + (Math.random() < 0.6 ? 1 : -1)));
      progress = Math.min(100, progress + Math.random() * 2.5);
      if (progress >= 100) progress = Math.random() * 20;

      if (kpiDurationRef.current) { kpiDurationRef.current.textContent = fmtDuration(duration); flash(kpiDurationRef.current); }
      if (kpiCutsRef.current) { kpiCutsRef.current.textContent = String(cuts); flash(kpiCutsRef.current); }
      if (kpiScoreRef.current) {
        kpiScoreRef.current.textContent = String(score);
        kpiScoreRef.current.className = `kpi-num ${score >= 85 ? "kpi-up" : "kpi-down"}`;
        flash(kpiScoreRef.current);
      }
      if (progressBarRef.current) progressBarRef.current.style.width = `${progress.toFixed(0)}%`;
      if (progressLabelRef.current) progressLabelRef.current.textContent = `${progress.toFixed(0)}%`;
    }

    let started = false;
    const intervals: ReturnType<typeof setInterval>[] = [];

    function start() {
      if (started) return;
      started = true;
      tickClock();
      intervals.push(setInterval(tickClock, 1000));
      intervals.push(setInterval(tickNumbers, 2400));
      setTimeout(tickNumbers, 1200);
    }

    function stop() {
      started = false;
      intervals.forEach(clearInterval);
      intervals.length = 0;
    }

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => (e.isIntersecting ? start() : stop())),
      { threshold: 0.15 }
    );
    io.observe(card);
    return () => { stop(); io.disconnect(); };
  }, []);

  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-start", paddingTop: "8rem", paddingBottom: "4rem", paddingLeft: "1.5rem", paddingRight: "1.5rem", overflow: "hidden", borderBottomLeftRadius: "2.5rem", borderBottomRightRadius: "2.5rem" }}>
      {/* Purple wave gradient — hero only */}
      <div className="hero-wave-gradient" />
      <div className="hero-wave-streak" />
      {/* Background */}
      <div className="hero-bg">
        <div className="hero-grid" />
        <div className="mesh" />
        <div className="particles" ref={particlesRef} />
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0 }} viewBox="0 0 1200 800" preserveAspectRatio="none" className="dark:opacity-35">
          <g stroke="#7C3AED" strokeWidth=".4" fill="none" opacity=".7">
            <path d="M0,600 C200,520 400,640 700,540 S 1100,500 1200,560" />
            <path d="M0,300 C300,240 500,360 800,260 S 1100,220 1200,280" />
            <path d="M0,720 C150,700 350,760 600,700 S 1000,720 1200,690" />
          </g>
        </svg>
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: "72rem", margin: "0 auto", width: "100%", display: "grid", gap: "3rem", alignItems: "center" }} className="lg:grid-cols-2">
        {/* Left: text */}
        <div className="reveal-left">
          <div className="font-mono" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-secondary)", border: "1px solid rgba(10,10,10,0.1)", borderRadius: "9999px", padding: "0.375rem 0.75rem" }}>
            <span style={{ width: "0.375rem", height: "0.375rem", borderRadius: "9999px", background: "#7C3AED", flexShrink: 0 }} />
            AI-Powered · Always Rendering
          </div>

          <h1
            ref={headlineRef}
            className="font-display blur-headline no-line"
            style={{ marginTop: "1.5rem", fontSize: "clamp(2.75rem, 6.2vw, 5.25rem)", lineHeight: 1.02, letterSpacing: "-0.03em", fontWeight: 800 }}
          >
            <span className="bw">Edit</span>{" "}
            <span className="bw">Videos</span>
            <br />
            <span className="bw">While</span>{" "}
            <span className="bw">You</span>
            <br />
            <span style={{ display: "inline-block" }}>
              <em className="bw gold-shimmer not-italic">Think.</em>
              <span className="sleep-line" />
            </span>
          </h1>

          <p style={{ marginTop: "1.5rem", maxWidth: "38rem", fontSize: "1.1rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
            CanTan·Video is the AI editing engine for creators who have ideas but no time.
            Drop footage, pick a style, and ship a polished video in minutes.
          </p>

          <div style={{ marginTop: "2rem", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.75rem" }}>
            <a href="#pricing" className="btn-gold" style={{ borderRadius: "9999px", padding: "0.875rem 1.5rem", fontSize: "0.875rem" }}>
              Start Creating Free
            </a>
            <a href="#how" className="btn-outline" style={{ borderRadius: "9999px", padding: "0.875rem 1.5rem", fontSize: "0.875rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ width: "1.5rem", height: "1.5rem", borderRadius: "9999px", border: "1px solid currentColor", display: "grid", placeItems: "center", flexShrink: 0 }}>
                <svg width="9" height="9" viewBox="0 0 10 10" fill="currentColor"><path d="M2 1l7 4-7 4z" /></svg>
              </span>
              See How It Works
            </a>
          </div>

          <div className="font-mono" style={{ marginTop: "2.5rem", display: "flex", alignItems: "center", gap: "1rem", fontSize: "0.65rem", color: "var(--text-secondary)", flexWrap: "wrap" }}>
            <span>NO TIMELINE NEEDED</span>
            <span style={{ width: "0.25rem", height: "0.25rem", borderRadius: "9999px", background: "currentColor", opacity: 0.4 }} />
            <span>CANCEL ANYTIME</span>
            <span style={{ width: "0.25rem", height: "0.25rem", borderRadius: "9999px", background: "currentColor", opacity: 0.4 }} />
            <span>4K EXPORT INCLUDED</span>
          </div>
        </div>

        {/* Right: 3D AI video editor card */}
        <div className="scene-3d reveal-right floaty">
          <div ref={cardRef} className="dash-card dash-shimmer" style={{ borderRadius: "1rem", padding: "1.25rem", width: "100%" }}>

            {/* Top bar */}
            <div className="dash-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                <span style={{ width: "0.625rem", height: "0.625rem", borderRadius: "9999px", background: "rgba(255,95,87,0.8)" }} />
                <span style={{ width: "0.625rem", height: "0.625rem", borderRadius: "9999px", background: "rgba(254,188,46,0.8)" }} />
                <span style={{ width: "0.625rem", height: "0.625rem", borderRadius: "9999px", background: "rgba(40,200,64,0.8)" }} />
              </div>
              <span className="font-mono" style={{ color: "var(--text-secondary)", display: "flex", alignItems: "center", fontSize: "0.65rem" }}>
                <span className="live-dot" />
                cantan · rendering
              </span>
              <span ref={clockRef} className="font-mono" style={{ color: "var(--text-secondary)", fontSize: "0.65rem" }}>00:00:00</span>
            </div>

            {/* Video preview */}
            <div className="dash-row" style={{ marginTop: "1rem", borderRadius: "0.75rem", overflow: "hidden", position: "relative", background: "linear-gradient(135deg, #1a0a3e 0%, #2d1b69 50%, #120830 100%)", height: "9rem", display: "grid", placeItems: "center" }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(167,139,250,0.7)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
                <path d="M10 10l5-3-5-3v6z" fill="rgba(124,58,237,0.5)" stroke="none" />
              </svg>
              {/* AI scan line */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, #7C3AED, transparent)", animation: "scan 3s ease-in-out infinite" }} />
              {/* Corner label */}
              <div className="font-mono" style={{ position: "absolute", top: "0.5rem", left: "0.75rem", fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(167,139,250,0.8)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                <span style={{ width: "0.3rem", height: "0.3rem", borderRadius: "9999px", background: "#7C3AED" }} />
                AI Processing
              </div>
              {/* Render progress */}
              <div style={{ position: "absolute", bottom: "0.75rem", left: "0.75rem", right: "0.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.25rem" }}>
                  <span className="font-mono" style={{ fontSize: "0.55rem", color: "rgba(167,139,250,0.7)" }}>Rendering</span>
                  <span ref={progressLabelRef} className="font-mono kpi-num" style={{ fontSize: "0.55rem", color: "#A78BFA" }}>72%</span>
                </div>
                <div style={{ height: "3px", borderRadius: "9999px", background: "rgba(124,58,237,0.2)", overflow: "hidden" }}>
                  <div ref={progressBarRef} style={{ height: "100%", width: "72%", background: "linear-gradient(90deg, #5B21B6, #7C3AED, #A78BFA)", borderRadius: "9999px", transition: "width 1.2s cubic-bezier(.22,.61,.36,1)" }} />
                </div>
              </div>
            </div>

            {/* KPIs */}
            <div className="dash-row" style={{ marginTop: "0.75rem", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem" }}>
              {[
                { label: "Duration", mainRef: kpiDurationRef, main: "02:34", sub: "auto-trimmed" },
                { label: "AI Cuts", mainRef: kpiCutsRef, main: "47", sub: "silences removed" },
                { label: "Engage Score", mainRef: kpiScoreRef, main: "91", sub: "predicted", suffix: <span style={{ fontSize: "0.75rem", color: "#7C3AED" }}>%</span>, cls: "kpi-num kpi-up" },
              ].map(({ label, mainRef, main, sub, suffix, cls }) => (
                <div key={label} style={{ borderRadius: "0.75rem", border: "1px solid rgba(0,0,0,0.05)", padding: "0.75rem", background: "var(--surface)" }}>
                  <div className="font-mono" style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text-secondary)", marginBottom: "0.25rem" }}>{label}</div>
                  <div className="font-display" style={{ fontSize: "1.35rem" }}>
                    <span ref={mainRef} className={cls ?? "kpi-num"}>{main}</span>{suffix}
                  </div>
                  <div className="font-mono" style={{ fontSize: "0.65rem", marginTop: "0.25rem", color: "var(--text-secondary)" }}>{sub}</div>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <div className="dash-row" style={{ marginTop: "0.75rem", borderRadius: "0.75rem", border: "1px solid rgba(0,0,0,0.05)", padding: "0.75rem", background: "var(--surface)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 500 }}>Timeline</span>
                <span className="font-mono" style={{ fontSize: "0.6rem", color: "#7C3AED" }}>5 tracks</span>
              </div>
              {/* Clip track */}
              <div style={{ display: "flex", gap: "2px", height: "1.5rem", alignItems: "center" }} ref={timelineRef} />
              {/* Audio waveform */}
              <div style={{ marginTop: "0.375rem", height: "1rem", display: "flex", alignItems: "center", gap: "1px" }}>
                {Array.from({ length: 40 }).map((_, i) => (
                  <div key={i} style={{ flex: 1, borderRadius: "1px", background: `rgba(124,58,237,${0.15 + Math.abs(Math.sin(i * 0.8)) * 0.55})`, height: `${30 + Math.abs(Math.sin(i * 0.8)) * 70}%` }} />
                ))}
              </div>
              <div className="font-mono" style={{ marginTop: "0.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.55rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text-secondary)" }}>
                <span>0:00</span>
                <span>1:17</span>
                <span>2:34</span>
              </div>
            </div>

            {/* Effects panels */}
            <div className="dash-row" style={{ marginTop: "0.75rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              {[
                { name: "Color Grade", val: "Cinematic", pct: 78 },
                { name: "Audio Mix", val: "Balanced", pct: 91 },
              ].map(({ name, val, pct }) => (
                <div key={name} style={{ borderRadius: "0.75rem", border: "1px solid rgba(0,0,0,0.05)", padding: "0.75rem", background: "var(--surface)" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.75rem" }}>
                    <span className="font-mono" style={{ fontSize: "0.65rem", color: "var(--text-secondary)" }}>{name}</span>
                    <span className="font-mono" style={{ fontSize: "0.6rem", color: "#7C3AED" }}>{val}</span>
                  </div>
                  <div style={{ marginTop: "0.5rem", height: "3px", borderRadius: "9999px", background: "rgba(124,58,237,0.15)", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg, #5B21B6, #A78BFA)", borderRadius: "9999px" }} />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
