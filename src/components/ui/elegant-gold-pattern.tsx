"use client";

import type React from "react";
import { useTheme } from "@/lib/theme";

interface GoldGradientBgProps {
  children?: React.ReactNode;
}

export function GoldGradientBg({ children }: GoldGradientBgProps) {
  const { theme } = useTheme();
  const dark = theme === "dark";

  return (
    <div style={{ position: "relative", width: "100%", background: dark ? "#080808" : "#f3eeff" }}>

      {/* Radial glow — upper area */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background: dark
            ? "radial-gradient(ellipse 80% 55% at 60% 0%, rgba(100,80,120,0.45) 0%, transparent 70%)"
            : "radial-gradient(ellipse 80% 55% at 60% 0%, rgba(167,139,250,0.45) 0%, transparent 70%)",
        }}
      />

      {/* Grain noise */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          opacity: dark ? 0.65 : 0.4,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
          mixBlendMode: dark ? "overlay" : "multiply",
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}
