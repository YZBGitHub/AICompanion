import React from 'react';
import { ArrowUpRight, Folder, Layers, Database } from 'lucide-react';
import { Language } from '../types';
import { ProcessCatalogGroup, ProcessCatalogItem } from '../data/processCatalog';

interface Props {
  title: string;
  groups: ProcessCatalogGroup[];
  language: Language;
  onOpen: (group: ProcessCatalogGroup, item: ProcessCatalogItem) => void;
}

const ProcessDataCatalog: React.FC<Props> = ({ title, groups, language, onOpen }) => {
  const zh = language === 'zh';
  const total = groups.reduce((count, group) => count + group.items.length, 0);
  return (
    <div className="process-catalog">
      <div className="process-catalog-intro">
        <div>
          <div className="process-catalog-eyebrow"><Database size={14} /> {zh ? '数据资源目录' : 'DATA CATALOG'}</div>
          <h3>{title}</h3>
          <p>{zh ? '所有数据分类已展开，选择一个指标或数据集，查看筛选条件与详细数据。' : 'Explore every category. Open a metric or dataset to filter and inspect its data.'}</p>
        </div>
        <div className="process-catalog-count"><strong>{String(total).padStart(2, '0')}</strong><span>{zh ? '数据入口' : 'data entries'}</span></div>
      </div>
      {groups.map((group, index) => (
        <section className="process-catalog-group" key={group.id} aria-labelledby={`catalog-${group.id}`}>
          <div className="process-catalog-group-header">
            <div><span className="process-catalog-number">{String(index + 1).padStart(2, '0')}</span><h4 id={`catalog-${group.id}`}>{group.label}</h4><span className="process-catalog-badge">{group.items.length} {zh ? (group.kind === 'metric' ? '项指标' : '个数据入口') : 'entries'}</span></div>
            <Layers size={18} aria-hidden="true" />
          </div>
          <div className="process-folder-grid">
            {group.items.map(item => (
              <button className="process-folder-card" key={item.id} onClick={() => onOpen(group, item)}>
                <span className={`process-folder-icon tone-${index % 3}`} aria-hidden="true"><Folder size={54} strokeWidth={1.2} /><span><Database size={15} /></span></span>
                <span className="process-folder-label">{item.label}</span>
                <span className="process-folder-description">{item.description || (zh ? (group.kind === 'metric' ? '统计指标 · 趋势分析' : '数据明细 · 过程记录') : (group.kind === 'metric' ? 'Metric · Trend analysis' : 'Dataset · Process records'))}</span>
                <span className="process-folder-open">{zh ? '查看数据' : 'View data'}<ArrowUpRight size={14} /></span>
              </button>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};
export default ProcessDataCatalog;
