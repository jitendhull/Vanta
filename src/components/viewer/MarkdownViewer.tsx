"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { CalloutCard, CalloutType } from "@/components/ui/CalloutCard";

interface MarkdownViewerProps {
  content: string;
}

export const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ content }) => {
  return (
    <div className="prose prose-invert max-w-[68ch] leading-relaxed text-text-primary text-sm sm:text-base space-y-4">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          // Blockquote parser for Obsidian-style callouts: > [!definition] Title
          blockquote({ children, ...props }) {
            // Find text content inside blockquote to identify callout marker
            const childrenArray = React.Children.toArray(children);
            const firstChild = childrenArray[0];

            let rawText = "";
            if (React.isValidElement(firstChild) && (firstChild.props as any)?.children) {
              const nestedChildren = React.Children.toArray((firstChild.props as any).children);
              rawText = typeof nestedChildren[0] === "string" ? nestedChildren[0] : "";
            }

            const match = rawText.match(/^\[!(definition|valid|invalid|example|compare|note)\]\s*(.*)$/i);

            if (match) {
              const type = match[1].toLowerCase() as CalloutType;
              const title = match[2].trim() || type.toUpperCase();

              // Remove the callout marker line from rendering
              const remainingElements = childrenArray.map((child, idx) => {
                if (idx === 0 && React.isValidElement(child)) {
                  const pChildren = React.Children.toArray((child.props as any).children);
                  const modifiedPChildren = pChildren.slice(1);
                  return React.cloneElement(child as React.ReactElement<any>, {
                    children: modifiedPChildren,
                  });
                }
                return child;
              });

              return (
                <CalloutCard type={type} title={title}>
                  {remainingElements}
                </CalloutCard>
              );
            }

            return (
              <blockquote className="border-l-2 border-white/20 pl-4 italic text-text-muted my-4">
                {children}
              </blockquote>
            );
          },

          // Custom code block & inline code styling
          code({ node, className, children, ...props }) {
            const isInline = !className && typeof children === "string" && !children.includes("\n");

            if (isInline) {
              return (
                <code className="bg-white/[0.08] text-accent px-1.5 py-0.5 rounded text-xs font-mono border border-white/[0.05]">
                  {children}
                </code>
              );
            }

            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },

          // Custom table styling for GFM
          table({ children }) {
            return (
              <div className="overflow-x-auto my-6 border border-white/[0.08] rounded-md">
                <table className="w-full text-left border-collapse text-xs sm:text-sm font-sans">
                  {children}
                </table>
              </div>
            );
          },
          thead({ children }) {
            return <thead className="bg-[#181818] border-b border-white/[0.08] text-accent font-mono">{children}</thead>;
          },
          th({ children }) {
            return <th className="p-3 font-semibold text-xs uppercase tracking-wider">{children}</th>;
          },
          td({ children }) {
            return <td className="p-3 border-b border-white/[0.04] text-text-primary/90">{children}</td>;
          },

          // Headings styling
          h1({ children }) {
            return <h1 className="text-2xl sm:text-3xl font-bold font-sans text-text-primary mt-8 mb-4 tracking-tight">{children}</h1>;
          },
          h2({ children }) {
            return (
              <h2 className="text-xl sm:text-2xl font-semibold font-sans text-text-primary mt-6 mb-3 border-b border-white/[0.08] pb-2">
                {children}
              </h2>
            );
          },
          h3({ children }) {
            return <h3 className="text-lg font-medium font-sans text-accent mt-5 mb-2">{children}</h3>;
          },

          // Paragraph styling
          p({ children }) {
            return <p className="my-3 leading-7 text-text-primary/90">{children}</p>;
          },

          // Lists styling
          ul({ children }) {
            return <ul className="list-disc pl-6 my-3 space-y-1.5 text-text-primary/90">{children}</ul>;
          },
          ol({ children }) {
            return <ol className="list-decimal pl-6 my-3 space-y-1.5 text-text-primary/90">{children}</ol>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
