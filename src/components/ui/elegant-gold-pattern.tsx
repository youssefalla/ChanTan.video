"use client";

import type React from "react";
import { useTheme } from "@/lib/theme";

interface GoldGradientBgProps {
  children?: React.ReactNode;
}

const STREAK_MASKS = [
  "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgb(0,0,0) 20%, rgba(0,0,0,0) 36%, rgb(0,0,0) 55%, rgba(0,0,0,0.13) 67%, rgb(0,0,0) 78%, rgba(0,0,0,0) 97%)",
  "linear-gradient(90deg, rgba(0,0,0,0) 11%, rgb(0,0,0) 25%, rgba(0,0,0,0.55) 41%, rgba(0,0,0,0.13) 67%, rgb(0,0,0) 78%, rgba(0,0,0,0) 97%)",
  "linear-gradient(90deg, rgba(0,0,0,0) 9%, rgb(0,0,0) 20%, rgba(0,0,0,0.55) 28%, rgba(0,0,0,0.424) 40%, rgb(0,0,0) 48%, rgba(0,0,0,0.267) 54%, rgba(0,0,0,0.13) 78%, rgb(0,0,0) 88%, rgba(0,0,0,0) 97%)",
  "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgb(0,0,0) 17%, rgba(0,0,0,0.55) 26%, rgb(0,0,0) 35%, rgba(0,0,0,0) 47%, rgba(0,0,0,0.13) 69%, rgb(0,0,0) 79%, rgba(0,0,0,0) 97%)",
  "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgb(0,0,0) 20%, rgba(0,0,0,0.55) 27%, rgb(0,0,0) 42%, rgba(0,0,0,0) 48%, rgba(0,0,0,0.13) 67%, rgb(0,0,0) 74%, rgb(0,0,0) 82%, rgba(0,0,0,0.47) 88%, rgba(0,0,0,0) 97%)",
];

export function GoldGradientBg({ children }: GoldGradientBgProps) {
  const { theme } = useTheme();
  const dark = theme === "dark";

  const purpleFull = dark ? "rgb(124, 58, 237)" : "rgb(91, 33, 182)";
  const purpleFade = dark ? "rgba(124, 58, 237, 0)" : "rgba(91, 33, 182, 0)";
  const streakOpacity = dark ? 0.18 : 0.08;
  const dotColor = dark ? "rgba(124,58,237,0.55)" : "rgba(91,33,182,0.35)";

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        background: dark ? "#000000" : "#ffffff",
      }}
    >
      {/* Radial corner gradient */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          opacity: dark ? 0.3 : 1,
          background: dark
            ? "radial-gradient(100% 100% at 0% 0%, rgb(18, 10, 42) 0%, rgb(0, 0, 0) 100%)"
            : "radial-gradient(100% 100% at 0% 0%, rgb(245, 240, 255) 0%, rgb(255, 255, 255) 100%)",
          mask: "radial-gradient(125% 100% at 0% 0%, rgb(0,0,0) 0%, rgba(0,0,0,0.224) 88%, rgba(0,0,0,0) 100%)",
          WebkitMask: "radial-gradient(125% 100% at 0% 0%, rgb(0,0,0) 0%, rgba(0,0,0,0.224) 88%, rgba(0,0,0,0) 100%)",
        }}
      >
        {/* Gold diagonal streaks */}
        {STREAK_MASKS.map((mask, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              opacity: streakOpacity,
              background: `linear-gradient(${purpleFull} 0%, ${purpleFade} 100%)`,
              mask,
              WebkitMask: mask,
              transform: "skewX(45deg)",
            }}
          />
        ))}
      </div>

      {/* Gold dot grid */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          opacity: dark ? 0.18 : 0.10,
          backgroundImage: `radial-gradient(circle at 1px 1px, ${dotColor} 1px, transparent 0)`,
          backgroundSize: "22px 22px",
        }}
      />

      {/* Soft radial center glow */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background: dark
            ? "radial-gradient(60% 50% at 50% 0%, rgba(124,58,237,0.06) 0%, transparent 100%)"
            : "radial-gradient(60% 50% at 50% 0%, rgba(124,58,237,0.08) 0%, transparent 100%)",
        }}
      />

      {/* Grain noise overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          opacity: dark ? 0.55 : 0.35,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
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
