import React, { useEffect, useRef, useState } from 'react';
import { FileText, Plus, RefreshCw, Eye, Clock, Sparkles, Search, X, Grid2X2, List, ChevronLeft, ChevronRight } from 'lucide-react';
import { createDemoLearningReports, buildLearningReport, LearningReport, ReportConfig, TEACHING_SOURCES, TeachingSourceId } from '../data/learningReports';
import { browseLearningReports } from '../data/reportBrowsing';
import TeacherModal from './TeacherModal';
import ReportDownload from './ReportDownload';
import ReportTemplates from './ReportTemplates';

interface Props { school: string; className: string; course: string; classes: string[]; courses: string[]; onContextChange: (className: string, course: string) => void; }
const LearningReports: React.FC<Props> = ({ school, className, course, classes, courses, onContextChange }) => {
  const [reports, setReports] = useState<LearningReport[]>(() => createDemoLearningReports({ school, className, course }));
  const [editor, setEditor] = useState<{ config: ReportConfig; previous?: LearningReport } | null>(null);
  const [viewing, setViewing] = useState<LearningReport | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [templateReading, setTemplateReading] = useState(false);
  const [notice, setNotice] = useState('');
  const [displayMode, setDisplayMode] = useState<'cards' | 'list'>('cards');
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  useEffect(() => { setPage(1); }, [school, className, course, keyword, pageSize]);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(timer.current), []);
  const results = browseLearningReports(reports, { school, className, course, keyword, page, pageSize });
  const pageNumbers = Array.from({ length: results.pages }, (_, index) => index + 1)
    .filter(number => number === 1 || number === results.pages || Math.abs(number - results.page) <= 1);
  const openEditor = (previous?: LearningReport) => {
    setError(''); setTemplateReading(false);
    setEditor({ previous, config: previous ? { ...previous, sources: [...previous.sources], templates: [...(previous.templates || [])] } : {
      school, className, course, title: `${className} · ${course}学情分析报告`, prompt: '', sources: ['skills', 'tasks', 'behavior'], templates: [],
    } });
  };
  const update = (patch: Partial<ReportConfig>) => setEditor(current => {
    if (!current) return current;
    const config = { ...current.config, ...patch };
    if ((patch.className || patch.course) && current.config.title === `${current.config.className} · ${current.config.course}学情分析报告`) {
      config.title = `${config.className} · ${config.course}学情分析报告`;
    }
    return { ...current, config };
  });
  const toggleSource = (id: TeachingSourceId) => {
    if (!editor) return;
    update({ sources: editor.config.sources.includes(id) ? editor.config.sources.filter(source => source !== id) : [...editor.config.sources, id] });
  };
  const generate = (event: React.FormEvent) => {
    event.preventDefault();
    if (!editor || busy || templateReading) return;
    let generated: LearningReport;
    try { generated = buildLearningReport(editor.config, editor.previous); } catch (e) { setError((e as Error).message); return; }
    setBusy(true); setError('');
    timer.current = setTimeout(() => {
      setReports(current => [generated, ...current.filter(report => report.id !== generated.id)]);
      onContextChange(generated.className, generated.course);
      setKeyword(''); setPage(1);
      setEditor(null); setBusy(false); setViewing(generated);
      setNotice(`已${generated.version > 1 ? '重新' : ''}生成「${generated.title}」，版本 V${generated.version}。`);
    }, 800);
  };
  return <section className="teacher-reports">
    <div className="teacher-report-heading"><div><h2><FileText size={21} />学情报告</h2><p>按班级与课程沉淀分析结果，支持自定义分析重点与数据源。</p></div><button className="teacher-primary" onClick={() => openEditor()}><Plus size={16} />生成学情报告</button></div>
    <div className="teacher-report-summary"><span>{className}</span><span>{course}</span><span>共 {results.scopedCount} 份报告</span><small>原型演示 · 本次会话内保存</small></div>
    {notice && <p className="teacher-notice" role="status">{notice}</p>}
    <div className="teacher-report-browser-toolbar">
      <div className="teacher-report-search"><Search size={17} aria-hidden="true" /><input type="search" aria-label="搜索报告" placeholder="搜索报告名称、分析重点、正文或数据源" value={keyword} onChange={event => setKeyword(event.target.value)} />{keyword && <button type="button" aria-label="清空搜索" onClick={() => setKeyword('')}><X size={15} /></button>}</div>
      <div className="teacher-report-view-toggle" role="group" aria-label="报告展示形式"><button type="button" aria-pressed={displayMode === 'cards'} className={displayMode === 'cards' ? 'is-active' : ''} onClick={() => setDisplayMode('cards')}><Grid2X2 size={16} />卡片</button><button type="button" aria-pressed={displayMode === 'list'} className={displayMode === 'list' ? 'is-active' : ''} onClick={() => setDisplayMode('list')}><List size={17} />列表</button></div>
    </div>
    <p className="teacher-report-result-count" role="status">{keyword.trim() ? `搜索到 ${results.total} 份报告` : `${results.total} 份报告 · 最近生成优先`}</p>
    {results.total > 0 && (displayMode === 'cards' ? (
      <div className="teacher-report-cards">
        {results.items.map(report => <article className="teacher-report-card" key={report.id}>
          <button type="button" className="teacher-report-cover" onClick={() => setViewing(report)} aria-label={`查看报告：${report.title}`}>
            <span className="teacher-cover-running-head"><span>AI技能分析系统</span><span>学情报告</span></span>
            <span className="teacher-cover-title" title={report.title}>{report.title.startsWith(`${report.course} · `) ? report.title.slice(report.course.length + 3) : report.title}</span>
            <span className="teacher-cover-divider" />
            <span className="teacher-cover-context" title={`${report.className} · ${report.course}`}>{report.className} · {report.course}</span>
            <span className="teacher-cover-footer"><span>{new Date(report.createdAt).toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' })}</span><span>V{report.version} · 演示报告</span></span>
          </button>
          <div className="teacher-report-card-body">
          <div className="teacher-report-card-actions"><button type="button" onClick={() => setViewing(report)}><Eye size={14} />查看</button><button type="button" onClick={() => openEditor(report)}><RefreshCw size={14} />重新生成</button><ReportDownload report={report} /></div>
          </div>
        </article>)}
      </div>
    ) : (
<div className="teacher-report-table-wrap"><table className="teacher-report-table"><thead><tr><th>报告名称</th><th>数据源</th><th>生成时间</th><th>版本 / 状态</th><th>操作</th></tr></thead>
      <tbody>{results.items.map(report => <tr key={report.id}><td><strong>{report.title}</strong><small>{report.prompt || '综合学情分析'}</small>{!!report.templates?.length && <small>参考模板：{report.templates.length} 个</small>}</td><td><div className="teacher-tags">{report.sources.map(id => <span key={id}>{TEACHING_SOURCES.find(source => source.id === id)?.label}</span>)}</div></td><td><span className="teacher-report-time"><Clock size={13} />{new Date(report.createdAt).toLocaleString('zh-CN', { hour12: false })}</span></td><td><span className="teacher-status">已生成</span><small>V{report.version} · 演示报告</small></td><td><div className="teacher-row-actions"><button onClick={() => setViewing(report)}><Eye size={14} />查看</button><button onClick={() => openEditor(report)}><RefreshCw size={14} />重新生成</button><ReportDownload report={report} /></div></td></tr>)}</tbody></table></div>
    ))}
    {!results.total && <div className="teacher-empty">{results.scopedCount ? <Search size={40} /> : <FileText size={40} />}<h3>{results.scopedCount ? '未找到匹配的报告' : '当前班级与课程暂无报告'}</h3><p>{results.scopedCount ? '请尝试其他关键词，或清空搜索查看全部报告。' : '选择数据源并填写分析重点，即可生成第一份学情报告。'}</p>{results.scopedCount ? <button className="teacher-secondary" onClick={() => setKeyword('')}>清空搜索</button> : <button className="teacher-primary" onClick={() => openEditor()}>生成第一份报告</button>}</div>}
    <nav className="teacher-report-pagination" aria-label="报告分页">
      <span>共 {results.total} 条{results.total > 0 && `，显示 ${results.start}–${results.end} 条`}</span>
      <div><select aria-label="每页报告数量" value={pageSize} onChange={event => setPageSize(Number(event.target.value))}>{[6, 12, 24].map(size => <option key={size} value={size}>{size} 条/页</option>)}</select>
        <button type="button" aria-label="上一页" disabled={results.page === 1} onClick={() => setPage(results.page - 1)}><ChevronLeft size={16} /></button>
        {pageNumbers.map((number, index) => <React.Fragment key={number}>{index > 0 && number - pageNumbers[index - 1] > 1 && <span className="teacher-page-ellipsis">…</span>}<button type="button" aria-label={`第 ${number} 页`} aria-current={results.page === number ? 'page' : undefined} className={results.page === number ? 'is-active' : ''} onClick={() => setPage(number)}>{number}</button></React.Fragment>)}
        <button type="button" aria-label="下一页" disabled={results.page === results.pages} onClick={() => setPage(results.page + 1)}><ChevronRight size={16} /></button>
      </div>
    </nav>
    {editor && <TeacherModal title={editor.previous ? '重新生成学情报告' : '生成学情报告'} onClose={() => { if (!busy) setEditor(null); }}>
      <form className="teacher-report-form" onSubmit={generate}>
        <div className="teacher-form-grid"><label>学校<input value={editor.config.school} readOnly /></label><label>报告名称<input required maxLength={100} value={editor.config.title} onChange={e => update({ title: e.target.value })} disabled={busy} /></label><label>班级<select value={editor.config.className} disabled={busy || !!editor.previous} onChange={e => update({ className: e.target.value })}>{classes.map(value => <option key={value}>{value}</option>)}</select></label><label>课程<select value={editor.config.course} disabled={busy || !!editor.previous} onChange={e => update({ course: e.target.value })}>{courses.map(value => <option key={value}>{value}</option>)}</select></label></div>
        <label className="teacher-prompt-label">分析提示词 <span>可选 · {editor.config.prompt.length}/2000</span><textarea rows={4} maxLength={2000} disabled={busy} value={editor.config.prompt} onChange={e => update({ prompt: e.target.value })} placeholder="例如：重点分析任务完成率、技能薄弱点与学习投入，对不同层次学生给出下周的教学建议。" /></label>
        <ReportTemplates templates={editor.config.templates || []} onChange={templates => update({ templates })} onReadingChange={setTemplateReading} disabled={busy} />
        <fieldset disabled={busy}><legend>数据源配置 <small>至少选择一项，可多选</small></legend><div className="teacher-source-grid">{TEACHING_SOURCES.map(source => <label key={source.id}><input type="checkbox" checked={editor.config.sources.includes(source.id)} onChange={() => toggleSource(source.id)} /><span><strong>{source.label}</strong><small>{source.summary}</small></span></label>)}</div></fieldset>
        <p className="teacher-form-hint">当前生成演示报告。提示词、数据源与参考模板会保存在报告配置中；模板尚未发送至 AI 服务解析，重新生成可修改配置并更新版本。</p>
        {error && <p role="alert" className="teacher-error">{error}</p>}
        <footer><button type="button" className="teacher-secondary" disabled={busy} onClick={() => setEditor(null)}>取消</button><button className="teacher-primary" disabled={busy || templateReading || !editor.config.sources.length || !editor.config.title.trim()}><Sparkles size={16} className={busy ? 'teacher-spinning' : ''} />{busy ? '正在生成…' : templateReading ? '正在读取模板…' : editor.previous ? '确认重新生成' : '生成报告'}</button></footer>
      </form>
    </TeacherModal>}
    {viewing && <TeacherModal title="学情报告详情" wide onClose={() => setViewing(null)}><article className="teacher-report-detail"><span className="teacher-status">演示报告 · V{viewing.version}</span><h1>{viewing.title}</h1><p className="teacher-detail-meta">{viewing.school} / {viewing.className} / {viewing.course}<br />生成时间：{new Date(viewing.createdAt).toLocaleString('zh-CN')}</p><div className="teacher-tags">{viewing.sources.map(id => <span key={id}>{TEACHING_SOURCES.find(source => source.id === id)?.label}</span>)}</div>{!!viewing.templates?.length && <ReportTemplates templates={viewing.templates} />}{viewing.sections.map(section => <section key={section.title}><h2>{section.title}</h2><p>{section.body}</p></section>)}<footer><ReportDownload report={viewing} /><button className="teacher-secondary" onClick={() => { openEditor(viewing); setViewing(null); }}><RefreshCw size={15} />重新生成</button><button className="teacher-primary" onClick={() => setViewing(null)}>关闭报告</button></footer></article></TeacherModal>}
  </section>;
};
export default LearningReports;
