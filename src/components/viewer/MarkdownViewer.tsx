"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { CalloutCard, CalloutType } from "@/components/ui/CalloutCard";

interface MarkdownViewerProps {
  content: string;
}

// Extract string recursively from React children
function extractRawText(node: any): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (!node) return "";
  if (Array.isArray(node)) return node.map(extractRawText).join("");
  if (React.isValidElement(node) && (node.props as any)?.children) {
    return extractRawText((node.props as any).children);
  }
  return "";
}

export const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ content }) => {
  return (
    <div className="max-w-[68ch] leading-relaxed text-text-primary text-sm sm:text-base space-y-4">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          // Blockquote parser for Obsidian-style callouts: > [!definition] Title
          blockquote({ children }) {
            const childrenArray = React.Children.toArray(children);
            const rawText = extractRawText(children);
            const match = rawText.match(/^\s*\[!(definition|valid|invalid|example|compare|note)\]([^\n]*)/i);

            if (match) {
              const type = match[1].toLowerCase() as CalloutType;
              const title = match[2].trim() || type.toUpperCase();

              // Remove the "[!type] Title" from the rendered elements
              const modifiedChildren = childrenArray.map((child, idx) => {
                if (idx === 0 && React.isValidElement(child)) {
                  const pChildren = React.Children.toArray((child.props as any)?.children || []);
                  const newPChildren = pChildren
                    .map((pChild) => {
                      if (typeof pChild === "string") {
                        const cleaned = pChild
                          .replace(/^\s*\[!(definition|valid|invalid|example|compare|note)\][^\n]*/i, "")
                          .trim();
                        return cleaned || null;
                      }
                      return pChild;
                    })
                    .filter(Boolean);

                  if (newPChildren.length === 0) {
                    return null;
                  }

                  return React.cloneElement(child as React.ReactElement<any>, {
                    children: newPChildren,
                  });
                }
                return child;
              }).filter(Boolean);

              return (
                <CalloutCard type={type} title={title}>
                  {modifiedChildren}
                </CalloutCard>
              );
            }

            return (
              <blockquote className="border-l-2 border-border pl-4 italic text-text-muted my-4">
                {children}
              </blockquote>
            );
          },

          // Custom code block & inline code styling
          code({ node, className, children, ...props }) {
            const isInline = !className && typeof children === "string" && !children.includes("\n");

            if (isInline) {
              return (
                <code className="bg-code-bg text-accent px-1.5 py-0.5 rounded text-xs font-mono border border-border">
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
              <div className="overflow-x-auto my-6 border border-border rounded-md">
                <table className="w-full text-left border-collapse text-xs sm:text-sm font-sans">
                  {children}
                </table>
              </div>
            );
          },
          thead({ children }) {
            return <thead className="bg-surface-elevated border-b border-border text-accent font-mono">{children}</thead>;
          },
          th({ children }) {
            return <th className="p-3 font-semibold text-xs uppercase tracking-wider">{children}</th>;
          },
          td({ children }) {
            return <td className="p-3 border-b border-border/50 text-text-primary">{children}</td>;
          },

          // Headings styling
          h1({ children }) {
            return <h1 className="text-2xl sm:text-3xl font-bold font-sans text-text-primary mt-8 mb-4 tracking-tight">{children}</h1>;
          },
          h2({ children }) {
            return (
              <h2 className="text-xl sm:text-2xl font-semibold font-sans text-text-primary mt-6 mb-3 border-b border-border pb-2">
                {children}
              </h2>
            );
          },
          h3({ children }) {
            return <h3 className="text-lg font-medium font-sans text-accent mt-5 mb-2">{children}</h3>;
          },

          // Paragraph styling
          p({ children }) {
            return <p className="my-3 leading-7 text-text-primary">{children}</p>;
          },

          // Lists styling
          ul({ children }) {
            return <ul className="list-disc pl-6 my-3 space-y-1.5 text-text-primary">{children}</ul>;
          },
          ol({ children }) {
            return <ol className="list-decimal pl-6 my-3 space-y-1.5 text-text-primary">{children}</ol>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
