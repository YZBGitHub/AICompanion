export type TemplateKind = 'word' | 'pdf' | 'markdown' | 'image';
export interface ReportTemplate {
  id: string; name: string; size: number; kind: TemplateKind; file: File;
  text?: string;
}
export const TEMPLATE_ACCEPT = '.doc,.docx,.pdf,.md,.markdown,.png,.jpg,.jpeg,.webp,.gif,.bmp';
export const TEMPLATE_MAX_FILES = 5;
export const TEMPLATE_MAX_SIZE = 20 * 1024 * 1024;
export const TEMPLATE_TOTAL_SIZE = 50 * 1024 * 1024;
const kinds: Record<string, TemplateKind> = { doc: 'word', docx: 'word', pdf: 'pdf', md: 'markdown', markdown: 'markdown', png: 'image', jpg: 'image', jpeg: 'image', webp: 'image', gif: 'image', bmp: 'image' };
export const templateKindLabel = (kind: TemplateKind) => ({ word: 'Word', pdf: 'PDF', markdown: 'Markdown', image: '图片' })[kind];
export const templateSizeLabel = (size: number) => size >= 1024 * 1024 ? `${(size / (1024 * 1024)).toFixed(1)} MB` : `${Math.max(1, Math.ceil(size / 1024))} KB`;
export function validateTemplateBatch(files: File[], existing: ReportTemplate[]): void {
  if (files.length + existing.length > TEMPLATE_MAX_FILES) throw new Error('最多添加 5 个参考模板，请先移除不需要的文件。');
  if (files.reduce((sum, file) => sum + file.size, existing.reduce((sum, file) => sum + file.size, 0)) > TEMPLATE_TOTAL_SIZE) throw new Error('参考模板总大小不能超过 50 MB。');
  for (const file of files) {
    if (!kinds[file.name.split('.').pop()?.toLowerCase() || '']) throw new Error(`「${file.name}」格式不支持，请选择 Word、PDF、Markdown 或常用图片格式。`);
    if (!file.size) throw new Error(`「${file.name}」是空文件，请重新选择。`);
    if (file.size > TEMPLATE_MAX_SIZE) throw new Error(`「${file.name}」超过单个文件 20 MB 的限制。`);
  }
}
export async function readReportTemplate(file: File): Promise<ReportTemplate> {
  validateTemplateBatch([file], []);
  const extension = file.name.split('.').pop()!.toLowerCase();
  const kind = kinds[extension];
  const bytes = new Uint8Array(await file.slice(0, 1024).arrayBuffer());
  const starts = (...values: number[]) => values.every((value, index) => bytes[index] === value);
  const ascii = (start: number, end: number) => String.fromCharCode(...bytes.slice(start, end));
  const valid = extension === 'pdf' ? ascii(0, 1024).includes('%PDF-')
    : extension === 'docx' ? starts(0x50, 0x4b, 0x03, 0x04)
    : extension === 'doc' ? starts(0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1)
    : extension === 'png' ? starts(0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a)
    : ['jpg', 'jpeg'].includes(extension) ? starts(0xff, 0xd8, 0xff)
    : extension === 'webp' ? ascii(0, 4) === 'RIFF' && ascii(8, 12) === 'WEBP'
    : extension === 'gif' ? ['GIF87a', 'GIF89a'].includes(ascii(0, 6))
    : extension === 'bmp' ? ascii(0, 2) === 'BM' : true;
  if (!valid) throw new Error(`「${file.name}」的内容与扩展名不匹配，请选择有效文件。`);
  let text: string | undefined;
  if (kind === 'markdown') {
    if (file.size > 1024 * 1024) throw new Error('Markdown 模板请控制在 1 MB 内。');
    try { text = new TextDecoder('utf-8', { fatal: true }).decode(await file.arrayBuffer()); }
    catch { throw new Error(`「${file.name}」无法读取，请使用 UTF-8 编码的 Markdown 文件。`); }
    if (!text.trim() || text.includes('\u0000')) throw new Error(`「${file.name}」不包含有效的 Markdown 文本。`);
  }
  return { id: crypto.randomUUID(), name: file.name, size: file.size, kind, file, text };
}
