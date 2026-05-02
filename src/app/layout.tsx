import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/lib/theme";
import { I18nProvider } from "@/lib/i18n";
import LoadingScreen from "@/components/ui/LoadingScreen";
import ThemeTransition from "@/components/ui/ThemeTransition";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CanTan·Video — AI Video Editing for Creators",
  description:
    "Drop your footage and let CanTan·Video do the heavy lifting. AI-powered cuts, color grading, captions, and one-click export to every platform.",
  keywords: ["AI video editing", "video editor", "auto captions", "color grading AI", "YouTube editor", "TikTok editor"],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "CanTan·Video",
    description: "AI-Powered Video Editing for Creators",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Fallback for first-time visitors with no cookie — syncs localStorage → cookie */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('cantan-theme');if(t){document.documentElement.classList.toggle('dark',t==='dark');document.cookie='cantan-theme='+t+';path=/;max-age=31536000;SameSite=Lax';}})()`,
          }}
        />
      </head>
      <body className={`${jakarta.variable} ${mono.variable} antialiased`}>
        <I18nProvider>
          <ThemeProvider>
            <LoadingScreen />
            <ThemeTransition />
            {children}
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
