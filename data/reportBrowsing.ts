import { LearningReport, TEACHING_SOURCES } from './learningReports';

export function browseLearningReports(reports: LearningReport[], options: {
  school: string; className: string; course: string; keyword: string; page: number; pageSize: number; sortOrder?: 'asc' | 'desc';
}) {
  const scoped = reports.filter(report => report.school === options.school && report.className === options.className && report.course === options.course);
  const keywords = options.keyword.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  const matched = scoped.filter(report => {
    const text = [report.title, report.prompt, report.school, report.className, report.course,
      ...report.sources.map(id => TEACHING_SOURCES.find(source => source.id === id)?.label || id),
      ...(report.templates || []).map(template => template.name),
      ...report.sections.flatMap(section => [section.title, section.body]),
    ].join(' ').toLocaleLowerCase();
    return keywords.every(keyword => text.includes(keyword));
  });
  matched.sort((a, b) => (Date.parse(a.createdAt) - Date.parse(b.createdAt)) * (options.sortOrder === 'asc' ? 1 : -1));
  const pageSize = Math.max(1, Math.floor(options.pageSize));
  const pages = Math.max(1, Math.ceil(matched.length / pageSize));
  const page = Math.min(pages, Math.max(1, Math.floor(options.page)));
  return { scopedCount: scoped.length, total: matched.length, pages, page,
    items: matched.slice((page - 1) * pageSize, page * pageSize),
    start: matched.length ? (page - 1) * pageSize + 1 : 0,
    end: Math.min(page * pageSize, matched.length),
  };
}
