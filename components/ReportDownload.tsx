import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { LearningReport } from '../data/learningReports';
import { downloadLearningReport, ReportFormat } from '../services/reportExport';

const ReportDownload: React.FC<{ report: LearningReport }> = ({ report }) => {
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const download = async (format: ReportFormat) => {
    if (downloading) return;
    setDownloading(true); setError(''); setStatus('');
    try { await downloadLearningReport(report, format); setStatus(`已准备 ${format === 'docx' ? 'Word' : format === 'pdf' ? 'PDF' : 'Markdown'} 文件下载`); }
    catch (error) { setError(error instanceof Error ? error.message : '下载失败，请重试。'); }
    finally { setDownloading(false); }
  };
  return <div className="teacher-report-download">
    <label><Download size={14} aria-hidden="true" /><select aria-label={`下载报告：${report.title}`} disabled={downloading} value="" onChange={event => { if (event.target.value) void download(event.target.value as ReportFormat); }}>
      <option value="" disabled>{downloading ? '导出中…' : '下载报告'}</option><option value="docx">Word（.docx）</option><option value="pdf">PDF（.pdf）</option><option value="md">Markdown（.md）</option>
    </select></label>
    {error && <span role="alert" className="teacher-error">{error}</span>}
    {status && <span role="status" className="teacher-download-status">{status}</span>}
  </div>;
};
export default ReportDownload;
