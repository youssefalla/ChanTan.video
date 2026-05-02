"use client";

import { useEffect } from "react";

function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3); }

function animateCount(el: HTMLElement) {
  const target = parseFloat(el.getAttribute("data-count") || "0");
  const suffix = el.getAttribute("data-suffix") || "";
  const fill = el.querySelector<HTMLElement>(".num-fill");
  if (!fill || isNaN(target)) return;
  const decimals = target % 1 !== 0 ? 1 : 0;
  const goldChar = suffix.endsWith("+") ? "+" : suffix.endsWith("%") ? "%" : "";
  const baseSuffix = suffix.replace(/[+%]$/, "");

  function render(v: number) {
    const formatted = decimals ? v.toFixed(decimals) : Math.round(v).toString();
    const baseHTML = baseSuffix ? `<span>${baseSuffix}</span>` : "";
    const goldHTML = goldChar ? `<span style="font-size:0.5em;color:#7C3AED">${goldChar}</span>` : "";
    fill!.innerHTML = formatted + baseHTML + goldHTML;
  }

  const dur = 1800;
  const t0 = performance.now();
  function step(now: number) {
    const t = Math.min(1, (now - t0) / dur);
    render(target * easeOutCubic(t));
    if (t < 1) requestAnimationFrame(step);
  }
  render(0);
  requestAnimationFrame(step);
}

export default function Stats() {
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".stat-card[data-stat]");
    if (!cards.length) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            if (!reduce) animateCount(e.target as HTMLElement);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.35 }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  return (
    <section className="stats-section" style={{ padding: "6rem 1.5rem" }}>
      <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
        <div className="reveal" style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div className="font-mono" style={{ fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#7C3AED" }}>— By the numbers</div>
          <h2 className="font-display blur-headline" data-blur="section" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "-0.03em", marginTop: "0.75rem", lineHeight: 1 }}>
            <span className="bw">Trusted</span>{" "}
            <span className="bw">By</span>{" "}
            <span className="bw">Creators</span>
            <br />
            <span className="bw">Who</span>{" "}
            <span className="bw">Ship</span>{" "}
            <span className="bw">Everything.</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }} className="stagger">
          {/* Card 1: Uptime */}
          <div className="stat-card reveal" data-stat data-count="99.9" data-suffix="%">
            <span className="glow" />
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <div className="font-mono" style={{ fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text-secondary)" }}>Render Uptime</div>
              <div className="uptime-icon" style={{ width: "1.75rem", height: "1.75rem", borderRadius: "9999px", display: "grid", placeItems: "center", background: "rgba(34,197,94,0.1)", color: "#22C55E" }}>
                <span style={{ width: "0.375rem", height: "0.375rem", borderRadius: "9999px", background: "currentColor" }} />
              </div>
            </div>
            <div className="stat-num" style={{ marginTop: "1.5rem" }} data-count="99.9" data-suffix="%">
              <span className="num-fill">99.9<span style={{ fontSize: "0.5em", color: "#7C3AED" }}>%</span></span>
            </div>
            <div style={{ marginTop: "1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Last 12 months</span>
              <div className="stat-mini-bar" style={{ width: "6rem" }}>
                <span style={{ height: "60%" }} /><span style={{ height: "80%" }} /><span style={{ height: "70%" }} />
                <span style={{ height: "90%" }} /><span style={{ height: "85%" }} /><span style={{ height: "95%" }} />
                <span style={{ height: "88%" }} /><span style={{ height: "100%" }} />
              </div>
            </div>
          </div>

          {/* Card 2: Active Creators */}
          <div className="stat-card reveal" data-stat data-count="50" data-suffix="K+">
            <span className="glow" />
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <div className="font-mono" style={{ fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text-secondary)" }}>Active Creators</div>
              <span className="mom-badge font-mono" style={{ fontSize: "0.625rem", color: "#7C3AED", border: "1px solid rgba(124,58,237,0.4)", borderRadius: "9999px", padding: "0.125rem 0.5rem" }}>▲ 18% MoM</span>
            </div>
            <div className="stat-num" style={{ marginTop: "1.5rem" }} data-count="50" data-suffix="K+">
              <span className="num-fill">50<span>K</span><span style={{ fontSize: "0.5em", color: "#7C3AED" }}>+</span></span>
            </div>
            <div style={{ marginTop: "1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Across 80+ countries</span>
              <div className="avatar-stack" style={{ display: "flex" }}>
                {[
                  { bg: "linear-gradient(135deg, #A78BFA, #5B21B6)" },
                  { bg: "linear-gradient(135deg, #0A0A0A, #2A2A30)" },
                  { bg: "linear-gradient(135deg, #7C3AED, #5B21B6)" },
                ].map((a, i) => (
                  <span key={i} style={{ width: "1.5rem", height: "1.5rem", borderRadius: "9999px", background: a.bg, border: "2px solid var(--background)", marginLeft: i > 0 ? "-0.5rem" : 0 }} />
                ))}
                <span className="font-mono" style={{ width: "1.5rem", height: "1.5rem", borderRadius: "9999px", background: "var(--surface-2)", border: "2px solid var(--background)", marginLeft: "-0.5rem", display: "grid", placeItems: "center", fontSize: "0.5rem", color: "var(--text-secondary)" }}>+49k</span>
              </div>
            </div>
          </div>

          {/* Card 3: Time Saved */}
          <div className="stat-card reveal" data-stat data-count="6" data-suffix="h+">
            <span className="glow" />
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <div className="font-mono" style={{ fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text-secondary)" }}>Avg. Time Saved</div>
              <svg className="trend-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
              </svg>
            </div>
            <div className="stat-num" style={{ marginTop: "1.5rem" }} data-count="6" data-suffix="h+">
              <span className="num-fill">6<span>h</span><span style={{ fontSize: "0.5em", color: "#7C3AED" }}>+</span></span>
            </div>
            <div style={{ marginTop: "1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Per video, Creator plan</span>
              <svg viewBox="0 0 80 24" style={{ width: "6rem", height: "1.5rem" }}>
                <path className="trend-spark" d="M0,18 C10,16 18,20 26,12 C34,4 42,14 50,8 C58,2 68,6 80,2" stroke="#7C3AED" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* Platform marquee */}
        <div className="reveal" style={{ marginTop: "5rem" }}>
          <div className="font-mono" style={{ textAlign: "center", fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.22em", color: "var(--text-secondary)", marginBottom: "2rem" }}>
            Export directly to your favourite platforms
          </div>
          <div className="logo-marquee">
            <div className="logo-track">
              {["YouTube", "TikTok", "Instagram Reels", "X / Twitter", "LinkedIn", "Snapchat", "Pinterest", "Facebook",
                "YouTube", "TikTok", "Instagram Reels", "X / Twitter", "LinkedIn", "Snapchat", "Pinterest", "Facebook"].map((name, i) => (
                <span key={i} className="logo-pill">
                  {i % 2 === 0 && <span style={{ width: "0.5rem", height: "0.5rem", borderRadius: "9999px", background: "#7C3AED", flexShrink: 0 }} />}
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
