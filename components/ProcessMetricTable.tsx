import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MetricRow } from '../data/processMetricData';

const ProcessMetricTable: React.FC<{ rows: MetricRow[]; metricLabel: string; unit: string }> = ({ rows, metricLabel, unit }) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const pages = Math.max(1, Math.ceil(rows.length / pageSize));
  const current = Math.min(page, pages);
  const visible = rows.slice((current - 1) * pageSize, current * pageSize);
  const columns: [keyof MetricRow, string][] = [
    ['metric', '统计指标'], ['timeDimension', '时间维度'], ['dateRange', '时间范围'],
    ['dimension', '数据维度'], ['school', '学校名称'], ['className', '班级名称'],
    ['user', '用户名称'], ['account', '学号/账号'], ['time', '时间点'], ['value', `${metricLabel}（${unit}）`],
  ];
  return <div className="process-metric-results">
    <div className="process-metric-scroll">
      <table className="process-metric-table">
        <thead><tr>{columns.map(([key, label]) => <th scope="col" key={key}>{label}</th>)}</tr></thead>
        <tbody>{visible.map(row => <tr key={row.id}>{columns.map(([key]) => <td key={key}>{row[key]}</td>)}</tr>)}</tbody>
      </table>
      {!rows.length && <div className="process-table-empty">当前筛选条件下暂无数据</div>}
    </div>
    <div className="process-pagination">
      <span>共 {rows.length} 条{rows.length > 0 && `，显示 ${(current - 1) * pageSize + 1}–${Math.min(current * pageSize, rows.length)} 条`}</span>
      <div>
        <select aria-label="每页条数" value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}>
          {[10, 20, 50].map(size => <option key={size} value={size}>{size} 条/页</option>)}
        </select>
        <button aria-label="上一页" disabled={current === 1} onClick={() => setPage(current - 1)}><ChevronLeft size={16} /></button>
        {Array.from({ length: pages }, (_, i) => i + 1).map(index => <button key={index} aria-label={`第 ${index} 页`} aria-current={current === index ? 'page' : undefined} className={current === index ? 'is-active' : ''} onClick={() => setPage(index)}>{index}</button>)}
        <button aria-label="下一页" disabled={current === pages} onClick={() => setPage(current + 1)}><ChevronRight size={16} /></button>
      </div>
    </div>
  </div>;
};
export default ProcessMetricTable;
