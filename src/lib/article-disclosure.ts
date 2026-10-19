/** Keep complete Markdown blocks intact when revealing the first fifth. */
export function articlePreviewBlockCount(total: number): number {
  return Math.max(0, Math.ceil(total * 0.2));
}