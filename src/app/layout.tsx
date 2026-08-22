import type { Metadata } from "next";
import "./globals.css";
import { AtmosphereShader } from "@/components/shader/AtmosphereShader";
import { Sidebar } from "@/components/nav/Sidebar";
import { MobileDrawer } from "@/components/nav/MobileDrawer";
import { getCatalogTree, getAllNotes } from "@/lib/content";

export const metadata: Metadata = {
  title: "Vanta — BCA Digital Notes & Reference System",
  description: "Minimalist, aesthetic, dark digital reference archive for Bachelor of Computer Applications curriculum.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const catalog = getCatalogTree();
  const notes = getAllNotes();

  return (
    <html lang="en" className="dark">
      <body className="bg-background text-text-primary antialiased flex h-screen overflow-hidden">
        {/* Background Atmosphere Shader */}
        <AtmosphereShader />

        {/* Desktop Two-Panel Layout */}
        <div className="relative z-10 flex w-full h-full overflow-hidden">
          {/* Desktop Sidebar */}
          <div className="hidden md:block h-full flex-shrink-0">
            <Sidebar catalog={catalog} allNotes={notes} />
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden bg-background/50 backdrop-blur-sm">
            {/* Topbar for Mobile */}
            <div className="md:hidden flex items-center justify-between p-3 border-b border-white/[0.08] bg-[#0d0d0d]">
              <div className="flex items-center gap-2">
                <MobileDrawer catalog={catalog} allNotes={notes} />
                <span className="font-mono font-bold text-xs tracking-wider text-accent">VANTA // BCA</span>
              </div>
            </div>

            {/* Scrollable Document Container */}
            <main className="flex-1 overflow-y-auto px-4 sm:px-8 md:px-12 py-6 sm:py-10">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
