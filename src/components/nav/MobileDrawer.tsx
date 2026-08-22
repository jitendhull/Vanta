"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { CatalogTree, NoteMetadata } from "@/types/content";

interface MobileDrawerProps {
  catalog: CatalogTree;
  allNotes: NoteMetadata[];
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ catalog, allNotes }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open Navigation"
        className="p-2 text-text-primary hover:text-accent bg-surface border border-white/[0.08] rounded-md transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Backdrop & Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative w-4/5 max-w-sm h-full bg-[#0d0d0d] shadow-2xl z-50 flex flex-col">
            <div className="absolute top-3 right-3 z-10">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-text-muted hover:text-text-primary transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <Sidebar
              catalog={catalog}
              allNotes={allNotes}
              onSelectNote={() => setIsOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
