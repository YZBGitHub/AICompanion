import { LearningReport, TEACHING_SOURCES } from '../data/learningReports';

export type ReportFormat = 'docx' | 'pdf' | 'md';
interface ReportBlock { kind: 'title' | 'heading' | 'body' | 'meta'; text: string; }
export function reportBlocks(report: LearningReport): ReportBlock[] {
  const sourceNames = report.sources.map(id => TEACHING_SOURCES.find(source => source.id === id)?.label || id);
  return [
    { kind: 'title', text: report.title },
    { kind: 'meta', text: `版本：V${report.version} · 演示报告` },
    { kind: 'meta', text: `学校：${report.school}\n班级：${report.className}\n课程：${report.course}\n生成时间：${new Date(report.createdAt).toLocaleString('zh-CN', { hour12: false })}` },
    { kind: 'heading', text: '报告生成配置' },
    { kind: 'body', text: `数据源：${sourceNames.join('、')}\n分析提示词：${report.prompt || '未填写，采用综合学情分析。'}` },
    ...((report.templates || []).length ? [{ kind: 'body' as const, text: `参考模板：${report.templates!.map(template => template.name).join('、')}\n模板已关联，尚未发送至 AI 服务解析。` }] : []),
    { kind: 'meta', text: '说明：本报告为原型演示，尚未调用真实模型或真实班级数据。' },
    ...report.sections.flatMap(section => [{ kind: 'heading' as const, text: section.title }, { kind: 'body' as const, text: section.body }]),
  ];
}
export function reportFilename(report: LearningReport, format: ReportFormat): string {
  const title = Array.from(report.title.replace(/[<>:"/\\|?*\u0000-\u001f]/g, '_').replace(/[. ]+$/g, '').trim()).slice(0, 100).join('') || '学情报告';
  return `${title}_V${report.version}.${format}`;
}
const escapeMarkdown = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/([\\`*_{}\[\]()#+.!|~-])/g, '\\$1');
export function reportMarkdown(report: LearningReport): string {
  return reportBlocks(report).map(block => {
    const text = escapeMarkdown(block.text);
    return block.kind === 'title' ? `# ${text}` : block.kind === 'heading' ? `## ${text}` : text.replace(/\n/g, '  \n');
  }).join('\n\n') + '\n';
}

export async function createWordReport(report: LearningReport): Promise<Blob> {
  const { Document, Packer, Paragraph, TextRun, HeadingLevel, Footer, AlignmentType, PageNumber } = await import('docx');
  const children = reportBlocks(report).map(block => new Paragraph({
    heading: block.kind === 'title' ? HeadingLevel.TITLE : block.kind === 'heading' ? HeadingLevel.HEADING_1 : undefined,
    keepNext: block.kind === 'title' || block.kind === 'heading',
    spacing: { before: block.kind === 'heading' ? 260 : 0, after: 160, line: 360 },
    children: block.text.split('\n').map((line, index) => new TextRun({
      text: line, break: index ? 1 : undefined,
      size: block.kind === 'title' ? 40 : block.kind === 'heading' ? 28 : block.kind === 'meta' ? 20 : 22,
      bold: block.kind === 'title' || block.kind === 'heading',
      color: block.kind === 'meta' ? '64748B' : '243249',
      font: { name: 'Microsoft YaHei', eastAsia: 'Microsoft YaHei' },
    })),
  }));
  return Packer.toBlob(new Document({
    title: report.title, subject: `${report.className} · ${report.course}`, creator: 'AI技能分析系统',
    sections: [{ properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 } } },
      footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ children: ['第 ', PageNumber.CURRENT, ' 页'], size: 18, color: '94A3B8' })] })] }) }, children }],
  }));
}

// Canvas uses the browser's Chinese fonts. Each page is rendered separately so
// long reports never require a single oversized canvas and paragraphs aren't clipped.
export async function createPdfReport(report: LearningReport): Promise<Blob> {
  const { jsPDF } = await import('jspdf');
  await document.fonts.ready;
  const pdf = new jsPDF({ unit: 'mm', format: 'a4', compress: true });
  pdf.setProperties({ title: report.title, subject: `${report.className} · ${report.course}`, creator: 'AI技能分析系统' });
  const width = 1240, height = 1754, margin = 100, bottom = height - 120;
  const canvas = document.createElement('canvas');
  canvas.width = width; canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('当前浏览器无法创建 PDF，请尝试 Word 或 Markdown 格式。');
  let y = margin, page = 0;
  const fontFamily = '"Microsoft YaHei", "PingFang SC", "Noto Sans CJK SC", sans-serif';
  const reset = () => { ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, width, height); ctx.textBaseline = 'top'; y = margin; };
  const flush = () => {
    ctx.font = `20px ${fontFamily}`; ctx.fillStyle = '#8b95a5'; ctx.textAlign = 'center';
    ctx.fillText(`第 ${page + 1} 页 · 演示报告`, width / 2, height - 70); ctx.textAlign = 'left';
    if (page) pdf.addPage();
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 210, 297, undefined, 'FAST');
    page++; reset();
  };
  reset();
  for (const block of reportBlocks(report)) {
    const size = block.kind === 'title' ? 40 : block.kind === 'heading' ? 29 : block.kind === 'meta' ? 22 : 25;
    const lineHeight = Math.ceil(size * 1.65);
    const style = () => { ctx.font = `${block.kind === 'title' || block.kind === 'heading' ? 600 : 400} ${size}px ${fontFamily}`; ctx.fillStyle = block.kind === 'meta' ? '#64748b' : '#243249'; };
    if (block.kind === 'heading' && y + lineHeight * 3 > bottom) flush();
    style();
    for (const paragraph of block.text.split('\n')) {
      let line = '';
      const draw = () => { if (y + lineHeight > bottom) { flush(); style(); } ctx.fillText(line, margin, y); y += lineHeight; line = ''; };
      for (const character of paragraph) {
        if (line && ctx.measureText(line + character).width > width - margin * 2) draw();
        line += character;
      }
      draw();
    }
    y += block.kind === 'title' ? 26 : 18;
  }
  flush();
  canvas.width = 0; canvas.height = 0;
  return pdf.output('blob');
}

export async function downloadLearningReport(report: LearningReport, format: ReportFormat): Promise<void> {
  const blob = format === 'docx' ? await createWordReport(report) : format === 'pdf' ? await createPdfReport(report)
    : new Blob(['\uFEFF', reportMarkdown(report)], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url; link.download = reportFilename(report, format);
  document.body.appendChild(link); link.click(); link.remove();
  // Delay revocation until the browser has consumed the download URL.
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}
