import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AtmosphereShader } from "@/components/shader/AtmosphereShader";
import { Sidebar } from "@/components/nav/Sidebar";
import { MobileDrawer } from "@/components/nav/MobileDrawer";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { getCatalogTree, getAllNotes } from "@/lib/content";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vanta — BCA Digital Notes & Reference System",
  description: "Minimalist, aesthetic digital reference archive for Bachelor of Computer Applications curriculum.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const catalog = getCatalogTree();
  const notes = getAllNotes();

  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const saved = localStorage.getItem('vanta-theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const theme = saved || (prefersDark ? 'dark' : 'light');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                  document.documentElement.setAttribute('data-theme', 'dark');
                } else {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="bg-background text-text-primary antialiased font-sans flex h-screen overflow-hidden">
        <ThemeProvider>
          {/* Background Atmosphere Shader */}
          <AtmosphereShader />

          {/* Desktop Two-Panel Layout */}
          <div className="relative z-10 flex w-full h-full overflow-hidden">
            {/* Desktop Sidebar */}
            <div className="hidden md:block h-full flex-shrink-0">
              <Sidebar catalog={catalog} allNotes={notes} />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden bg-background/80 backdrop-blur-sm">
              {/* Topbar for Mobile */}
              <div className="md:hidden flex items-center justify-between p-3 border-b border-border bg-surface">
                <div className="flex items-center gap-2">
                  <MobileDrawer catalog={catalog} allNotes={notes} />
                  <span className="font-mono font-bold text-xs tracking-wider text-accent">VANTA // BCA</span>
                </div>
                <ThemeToggle />
              </div>

              {/* Scrollable Document Container */}
              <main className="flex-1 overflow-y-auto px-4 sm:px-8 md:px-12 py-6 sm:py-10">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
