// Only fully visible names and counts are transcribed from the supplied screenshot.
// Account numbers are clipped in the image, so they remain unavailable.
export const METRIC_DEFAULTS = {
  school: '山东商业职业技术大学-aixb',
  className: '物联网1班',
  startDate: '2016-09-22',
  endDate: '2026-09-22',
};
export const LOGIN_SCREENSHOT_ROWS = [
  ['朱梦', 20], ['陈意如', 12], ['刘英迪', 5], ['李然', 32], ['孙宁', 9],
  ['杨清凯', 5], ['宋哲', 11], ['花瑞鸣', 13], ['王士振', 17], ['张毅', 75],
  ['王时昊', 7], ['董力军', 33], ['牛作儒', 3], ['沈学庆', 6], ['姚芸萍', 21],
  ['张爱慧', 33], ['何晓璐', 28], ['朱敏行', 4], ['备用2', 9], ['李帅', 5],
  ['于文哲', 14], ['贾文哲', 9], ['郭奕彤', 25], ['于杰', 6], ['教师1', 16],
  ['李俊迪', 27], ['刘桂昕', 2], ['董金凤', 16], ['张熙萌', 13], ['王瑜', 9],
  ['奚传哲', 27], ['蔡雪艳', 31], ['李丽', 16], ['贾东阳', 14], ['柴昊', 5],
  ['马莹', 26], ['徐童', 15],
] as const;

export interface MetricFilters {
  menu: string; group: string; metric: string; metricLabel: string;
  timeGranularity: string; dimension: string; school: string;
  className: string; user: string; course: string; startDate: string; endDate: string;
  agent: string;
}
export interface MetricRow {
  id: string; metric: string; timeDimension: string; dateRange: string; dimension: string;
  school: string; className: string; user: string; account: string; time: string; value: number;
}
export const metricUnit = (metric: string): string =>
  metric === 'satisfaction' ? '%' : /duration|online/.test(metric) ? '分钟' : /words/.test(metric) ? '字' : /submit|completion|session/.test(metric) ? '个' : '次';

export const getMetricRows = (filters: MetricFilters): { rows: MetricRow[]; source: 'screenshot' | 'demo' } => {
  const isScreenshot = filters.menu === 'behavior' && filters.group === 'platform' && filters.metric === 'login'
    && filters.school === METRIC_DEFAULTS.school && filters.timeGranularity === 'year'
    && filters.startDate === METRIC_DEFAULTS.startDate && filters.endDate === METRIC_DEFAULTS.endDate;
  const source = isScreenshot ? 'screenshot' : 'demo';
  if (!filters.startDate || !filters.endDate || filters.startDate > filters.endDate) return { rows: [], source };
  const unit = metricUnit(filters.metric);
  const seed = [...`${filters.menu}/${filters.group}/${filters.metric}/${filters.agent}/${filters.course}`].reduce((n, c) => n + c.charCodeAt(0), 0);
  const time = filters.timeGranularity === 'year' ? filters.endDate.slice(0, 4)
    : filters.timeGranularity === 'month' ? filters.endDate.slice(0, 7)
    : filters.timeGranularity === 'hour' ? `${filters.endDate} 10:00` : filters.endDate;
  const baseRows: MetricRow[] = LOGIN_SCREENSHOT_ROWS.map(([name, loginCount], index) => ({
    id: `${filters.metric}-${index}`, metric: filters.metricLabel,
    timeDimension: ({ year: '年', month: '月', day: '日', hour: '小时' } as Record<string, string>)[filters.timeGranularity],
    dateRange: `${filters.startDate} 至 ${filters.endDate}`,
    dimension: ({ school: '按学校', class: '按班级', user: '按用户', course: '按课程' } as Record<string, string>)[filters.dimension],
    school: filters.school,
    className: isScreenshot ? METRIC_DEFAULTS.className : filters.className || METRIC_DEFAULTS.className,
    user: isScreenshot ? name : `演示用户${String(index + 1).padStart(2, '0')}`,
    account: isScreenshot ? '—' : `DEMO${String(index + 1).padStart(4, '0')}`,
    time,
    value: isScreenshot ? loginCount : unit === '%' ? 80 + (seed + index * 3) % 21
      : unit === '分钟' ? 30 + (seed + index * 137) % 1800 : 1 + (seed + index * 17) % 100,
  }));
  let rows = baseRows.filter(row => !filters.className || row.className === filters.className);
  if (filters.dimension === 'user' && filters.user) rows = rows.filter(row => row.user === filters.user);
  if (filters.dimension !== 'user' && rows.length) {
    const value = unit === '%' ? Number((rows.reduce((n, row) => n + row.value, 0) / rows.length).toFixed(1)) : rows.reduce((n, row) => n + row.value, 0);
    rows = [{ ...rows[0], id: 'summary', className: filters.dimension === 'school' ? '—' : rows[0].className, user: '—', account: '—', value }];
  }
  return { rows, source };
};
