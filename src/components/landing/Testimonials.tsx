"use client";

import { useT } from "@/lib/i18n";
import BlurWords from "@/components/ui/BlurWords";

const Stars = () => (
  <div style={{ display: "flex", alignItems: "center", gap: "0.125rem" }}>
    {[1,2,3,4,5].map((i) => <span key={i} style={{ color: "#7C3AED" }}>★</span>)}
  </div>
);

const col1 = [
  {
    stars: true,
    quote: "“My editing time went from 6 hours to 20 minutes. That alone changed my whole content schedule.”",
    display: true,
    name: "Layla Mercer",
    role: "Travel vlogger · 480K subs",
    initials: "L",
    bg: "linear-gradient(135deg, #A78BFA, #5B21B6)",
    color: "#ffffff",
  },
  {
    stars: true,
    quote: "The auto-captions are scary accurate — even with my accent. Stopped paying a separate captioning tool immediately.",
    display: false,
    name: "Kwame Asante",
    role: "Tech creator · Ghana",
    initials: "K",
    bg: "#0A0A0A",
    color: "#F5F4EE",
  },
];

const col2 = [
  {
    stars: true,
    quote: "“I shipped 4 videos in the time it used to take me to edit one. CanTan doesn’t just save time — it changes what’s possible in a week.”",
    display: true,
    large: true,
    name: "Sofia Navarro",
    role: "Lifestyle creator · Madrid",
    initials: "S",
    bg: "linear-gradient(135deg, #0A0A0A, #1a0a3e)",
    color: "#A78BFA",
    featured: true,
  },
  {
    stars: true,
    quote: "Setup took four minutes. The first export looked like I had a professional editor. I've never looked back.",
    display: false,
    name: "Remy Fontaine",
    role: "Short-form · Paris",
    initials: "R",
    bg: "linear-gradient(135deg, #F5F4EE, #EDE9FE)",
    color: "#5B21B6",
    border: "1px solid rgba(124,58,237,0.15)",
  },
];

const col3 = [
  {
    stars: true,
    quote: "The color grading AI matched my brand perfectly from the first clip. I didn't touch a single slider.",
    display: false,
    name: "Priya Mehta",
    role: "Beauty creator · Mumbai",
    initials: "P",
    bg: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(124,58,237,0.6))",
    color: "#0A0A0A",
  },
  {
    stars: true,
    quote: "“Quiet, dependable, slightly magical. Feels like having a full edit suite in my back pocket.”",
    display: true,
    name: "Jonas Weber",
    role: "Documentary · Berlin",
    initials: "J",
    bg: "#0A0A0A",
    color: "#F5F4EE",
  },
];

function Card({ t }: { t: typeof col1[0] & { large?: boolean; featured?: boolean; border?: string } }) {
  return (
    <article
      className="bento"
      style={{
        borderRadius: "1rem",
        padding: t.large ? "1.75rem" : "1.5rem",
        border: t.featured ? "1px solid rgba(124,58,237,0.5)" : t.border,
        boxShadow: t.featured ? "0 0 0 1px rgba(124,58,237,0.2) inset" : undefined,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Stars />
        {t.featured && <span className="font-mono" style={{ fontSize: "0.625rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "#7C3AED" }}>Featured</span>}
      </div>
      <p
        className={t.display ? "font-display" : ""}
        style={{ fontSize: t.large ? "1.75rem" : t.display ? "1.375rem" : "0.9rem", lineHeight: t.large ? 1.2 : 1.5, marginTop: "1.25rem", color: t.display ? "var(--text-primary)" : "var(--text-secondary)" }}
      >
        {t.quote}
      </p>
      <div style={{ marginTop: t.large ? "1.75rem" : "1.25rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div style={{ width: t.large ? "2.75rem" : "2.5rem", height: t.large ? "2.75rem" : "2.5rem", borderRadius: "9999px", background: t.bg, display: "grid", placeItems: "center", fontFamily: "var(--font-display)", fontWeight: 700, color: t.color, border: t.border, flexShrink: 0 }}>
          {t.initials}
        </div>
        <div>
          <div style={{ fontSize: "0.875rem", fontWeight: 500 }}>{t.name}</div>
          <div className="font-mono" style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>{t.role}</div>
        </div>
      </div>
    </article>
  );
}

export default function Testimonials() {
  const { T } = useT();
  return (
    <section id="voices" style={{ maxWidth: "72rem", margin: "0 auto", padding: "7rem 1.5rem" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem", marginBottom: "3.5rem" }}>
        <div className="reveal-left">
          <div className="font-mono" style={{ fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#7C3AED" }}>— {T.testimonials.label}</div>
          <h2 className="font-display blur-headline" data-blur="section" style={{ fontSize: "clamp(2.5rem, 6vw, 3.75rem)", letterSpacing: "-0.03em", marginTop: "0.75rem", lineHeight: 1 }}>
            <BlurWords text={T.testimonials.title} />
          </h2>
        </div>
        <div className="reveal-right" style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.875rem" }}>
          <Stars />
          <span className="font-mono" style={{ color: "var(--text-secondary)" }}>4.9 · 3,812 reviews</span>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }} className="stagger">
        <div className="reveal" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {col1.map((t, i) => <Card key={i} t={t} />)}
        </div>
        <div className="reveal" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {col2.map((t, i) => <Card key={i} t={t as never} />)}
        </div>
        <div className="reveal" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {col3.map((t, i) => <Card key={i} t={t} />)}
        </div>
      </div>
    </section>
  );
}
