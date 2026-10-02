import { useRef, type ClipboardEvent } from "react";
import { Bold, Columns3, Grid2X2, Heading1, Heading2, Heading3, Image, Images, Italic, List, Maximize2, Minus, Quote, Table2, Type, Underline } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type RichArticleEditorProps = {
  value: string;
  onChange: (value: string) => void;
  minHeight?: string;
};

function cleanText(value: string) {
  return value.replace(/\u00a0/g, " ").replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
}

function nodeToMarkdown(node: Node): string {
  if (node.nodeType === Node.TEXT_NODE) return node.textContent ?? "";
  if (!(node instanceof HTMLElement)) return "";
  const children = () => Array.from(node.childNodes).map(nodeToMarkdown).join("");
  const text = children();
  switch (node.tagName.toLowerCase()) {
    case "h1": case "h2": return `\n\n## ${text}\n\n`;
    case "h3": case "h4": return `\n\n### ${text}\n\n`;
    case "strong": case "b": return `**${text}**`;
    case "u": return `__${text}__`;
    case "em": case "i": return `*${text}*`;
    case "li": return `\n- ${text}`;
    case "ul": case "ol": return `\n${text}\n`;
    case "br": return "\n";
    case "p": case "div": case "section": case "article": return `\n\n${text}\n\n`;
    case "img": {
      const src = node.getAttribute("src") ?? "";
      if (!/^https:\/\//i.test(src)) return "";
      const alt = (node.getAttribute("alt") ?? "Article image").replace(/[\[\]]/g, "");
      return `\n\n![${alt}](${src})\n\n`;
    }
    case "a": return text;
    default: return text;
  }
}

export function RichArticleEditor({ value, onChange, minHeight = "min-h-[360px] sm:min-h-[440px]" }: RichArticleEditorProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  function replaceSelection(before: string, after = "", placeholder = "text") {
    const input = ref.current;
    if (!input) return;
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const selected = value.slice(start, end) || placeholder;
    const next = `${value.slice(0, start)}${before}${selected}${after}${value.slice(end)}`;
    onChange(next);
    requestAnimationFrame(() => {
      input.focus();
      input.setSelectionRange(start + before.length, start + before.length + selected.length);
    });
  }

  function insertImage(gallery = false) {
    const urls = window.prompt(gallery ? "Paste HTTPS image URLs, separated by commas" : "Paste an HTTPS image URL");
    if (!urls) return;
    const images = urls.split(",").map((url) => url.trim()).filter((url) => /^https:\/\//i.test(url)).map((url, index) => `![Image ${index + 1}](${url})`);
    if (!images.length) return;
    replaceSelection(gallery ? `\n\n:::gallery\n${images.join("\n")}\n:::\n\n` : `\n\n${images[0]}\n\n`, "", "");
  }

  function handlePaste(event: ClipboardEvent<HTMLTextAreaElement>) {
    const html = event.clipboardData.getData("text/html");
    if (!html) return;
    event.preventDefault();
    const documentNode = new DOMParser().parseFromString(html, "text/html");
    const markdown = cleanText(Array.from(documentNode.body.childNodes).map(nodeToMarkdown).join(""));
    replaceSelection(markdown, "", "");
  }

  const tools = [
    { label: "Normal text", icon: Type, action: () => replaceSelection("", "", "Start writing") },
    { label: "Heading 1", icon: Heading1, action: () => replaceSelection("## ", "", "Main heading") },
    { label: "Heading 2", icon: Heading2, action: () => replaceSelection("## ", "", "Section heading") },
    { label: "Heading 3", icon: Heading3, action: () => replaceSelection("### ", "", "Subheading") },
    { label: "Bold", icon: Bold, action: () => replaceSelection("**", "**", "bold text") },
    { label: "Italic", icon: Italic, action: () => replaceSelection("*", "*", "italic text") },
    { label: "Underline", icon: Underline, action: () => replaceSelection("__", "__", "underlined text") },
    { label: "Bullet list", icon: List, action: () => replaceSelection("- ", "", "List item") },
    { label: "Quote", icon: Quote, action: () => replaceSelection("> ", "", "Quote") },
    { label: "Two-column grid", icon: Columns3, action: () => replaceSelection("\n\n:::grid\n", "\n---\nSecond column\n:::\n\n", "First column") },
    { label: "Image", icon: Image, action: () => insertImage(false) },
    { label: "Image gallery", icon: Images, action: () => insertImage(true) },
    { label: "Three-item grid", icon: Grid2X2, action: () => replaceSelection("\n\n:::grid\n", "\n---\nSecond item\n---\nThird item\n:::\n\n", "First item") },
    { label: "Table", icon: Table2, action: () => replaceSelection("\n\n:::grid\n", "\n---\nSecond cell\n:::\n\n", "First cell") },
    { label: "Divider", icon: Minus, action: () => replaceSelection("\n\n---\n\n", "", "") },
  ];

  return <div className="mt-2 min-w-0 max-w-full overflow-hidden rounded-md border border-input bg-card shadow-card focus-within:ring-1 focus-within:ring-ring">
    <div className="flex min-h-11 max-w-full items-center gap-0.5 overflow-x-auto border-b border-border bg-sky-soft p-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="toolbar" aria-label="Article formatting">
      {tools.map(({ label, icon: Icon, action }) => <Button key={label} type="button" variant="ghost" size="icon" title={label} aria-label={label} onClick={action} className="h-8 w-8"><Icon /></Button>)}
      <Button type="button" variant="ghost" size="icon" title="Full editor width" aria-label="Full editor width" className="ml-auto h-8 w-8 shrink-0" onClick={() => ref.current?.focus()}><Maximize2 /></Button>
    </div>
    <Textarea ref={ref} required value={value} onChange={(event) => onChange(event.target.value)} onPaste={handlePaste} placeholder="Start writing your article here…" className={`${minHeight} w-full resize-y rounded-none border-0 bg-card px-4 py-4 text-sm leading-6 shadow-none focus-visible:ring-0`} aria-label="Article content" />
    <p className="border-t border-border px-3 py-2 text-[11px] text-muted-foreground">Formatted text pasted from ChatGPT, Claude, Google Docs, or Word keeps headings, emphasis, lists, and images.</p>
  </div>;
}