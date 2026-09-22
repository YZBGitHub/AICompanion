import React, { useEffect, useRef, useState } from 'react';
import { UploadCloud, FileText, Image as ImageIcon, X, Eye, Download } from 'lucide-react';
import { ReportTemplate, TEMPLATE_ACCEPT, TEMPLATE_MAX_FILES, readReportTemplate, validateTemplateBatch, templateKindLabel, templateSizeLabel } from '../services/reportTemplates';

const TemplatePreview: React.FC<{ template: ReportTemplate }> = ({ template }) => {
  const [url, setUrl] = useState('');
  useEffect(() => { const url = URL.createObjectURL(template.file); setUrl(url); return () => URL.revokeObjectURL(url); }, [template.file]);
  return <div className="teacher-template-preview">
    {template.kind === 'image' && url && <img src={url} alt={`参考模板：${template.name}`} onError={e => { e.currentTarget.alt = '无法预览该图片，请检查原文件。'; }} />}
    {template.kind === 'markdown' && <><pre>{template.text?.slice(0, 20000)}</pre>{(template.text?.length || 0) > 20000 && <p>预览仅显示前 20,000 字符，原文件已完整保留。</p>}</>}
    {template.kind === 'pdf' && url && <object data={url} type="application/pdf" aria-label={template.name}><p>当前浏览器不支持内嵌 PDF 预览，可下载原文件查看。</p></object>}
    {template.kind === 'word' && <p>Word 模板已完整保留，可下载查看。当前原型尚未执行 AI 文档解析。</p>}
    {url && <a href={url} download={template.name}><Download size={14} />下载原模板</a>}
  </div>;
};

const ReportTemplates: React.FC<{
  templates: ReportTemplate[];
  onChange?: (templates: ReportTemplate[]) => void;
  onReadingChange?: (reading: boolean) => void;
  disabled?: boolean;
}> = ({ templates, onChange, onReadingChange, disabled }) => {
  const [reading, setReading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const alive = useRef(true);
  const locked = useRef(false);
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => { alive.current = true; return () => { alive.current = false; }; }, []);
  const add = async (files: File[]) => {
    if (!files.length || !onChange || disabled || locked.current) return;
    setError('');
    try { validateTemplateBatch(files, templates); } catch (e) { setError((e as Error).message); return; }
    locked.current = true; setReading(true); onReadingChange?.(true);
    try {
      const added = await Promise.all(files.map(readReportTemplate));
      if (alive.current) onChange([...templates, ...added]);
    } catch (e) { if (alive.current) setError((e as Error).message); }
    finally { locked.current = false; if (alive.current) { setReading(false); onReadingChange?.(false); } }
  };
  return <section className="teacher-templates">
    <div className="teacher-templates-heading"><h4>参考模板 <small>{onChange ? '可选' : `${templates.length} 个`}</small></h4>{onChange && <span>{templates.length}/{TEMPLATE_MAX_FILES}</span>}</div>
    {onChange && <>
      <input ref={input} type="file" multiple accept={TEMPLATE_ACCEPT} hidden aria-label="上传报告参考模板" disabled={disabled || reading} onChange={e => { void add(Array.from(e.target.files || [])); e.target.value = ''; }} />
      <button type="button" className={`teacher-template-drop ${dragging ? 'is-dragging' : ''}`} disabled={disabled || reading} onClick={() => input.current?.click()}
        onDragOver={event => { event.preventDefault(); if (!disabled && !reading) setDragging(true); }} onDragLeave={() => setDragging(false)}
        onDrop={event => { event.preventDefault(); setDragging(false); void add(Array.from(event.dataTransfer.files)); }}>
        <UploadCloud size={28} /><strong>{reading ? '正在读取模板…' : '点击上传，或将模板拖到这里'}</strong><span>Word（.doc / .docx）、PDF、Markdown、PNG / JPG / WebP / GIF / BMP</span><small>最多 5 个；单个 ≤ 20 MB，合计 ≤ 50 MB；Markdown ≤ 1 MB</small>
      </button>
      <p className="teacher-template-hint">模板用于参考章节结构、排版或表达方式，可在提示词中说明。文件仅保存在当前页面会话中，尚未发送至 AI 服务。</p>
    </>}
    {error && <p className="teacher-error" role="alert">{error}</p>}
    <div className="teacher-template-list">{templates.map(template => <div key={template.id} className="teacher-template-item"><div className="teacher-template-item-header">
      {template.kind === 'image' ? <ImageIcon size={20} /> : <FileText size={20} />}<div><strong>{template.name}</strong><small>{templateKindLabel(template.kind)} · {templateSizeLabel(template.size)} · {template.kind === 'markdown' ? '文本已读取，待 AI 参考' : '已关联，待 AI 解析'}</small></div>
      <button type="button" aria-label={`预览 ${template.name}`} aria-expanded={preview === template.id} onClick={() => setPreview(preview === template.id ? null : template.id)}><Eye size={16} /></button>
      {onChange && <button type="button" aria-label={`移除 ${template.name}`} disabled={disabled || reading} onClick={() => onChange(templates.filter(item => item.id !== template.id))}><X size={16} /></button>}
    </div>{preview === template.id && <TemplatePreview template={template} />}</div>)}</div>
  </section>;
};
export default ReportTemplates;
