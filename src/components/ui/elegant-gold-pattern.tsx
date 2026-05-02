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
    <div style={{ position: "relative", width: "100%", background: dark ? "#000000" : "#f5f3ff" }}>
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}
