/** Values present in the user's saved 学习行为数据 - AI学伴.html.
 * The save contains only the platform-login yearly series, not API responses
 * for the other metrics. Missing series must not be replaced with random data.
 */
export const PROCESS_SNAPSHOT = {
  school: '山东商业职业技术学院-aixb',
  startDate: '2016-09-21',
  endDate: '2026-09-21',
  loginByYear: Array.from({ length: 11 }, (_, index) => ({
    name: String(2016 + index),
    value: index === 10 ? 792 : 0,
  })),
};

export const getSavedBehaviorData = (filters: {
  group: string; metric: string; timeGranularity: string; dimension: string;
  school: string; startDate: string; endDate: string;
}): { name: string; value: number }[] => {
  // Partial-year totals cannot be inferred from an annual snapshot.
  if (filters.group !== 'platform' || filters.metric !== 'login' ||
      filters.timeGranularity !== 'year' || filters.dimension !== 'school' ||
      filters.school !== PROCESS_SNAPSHOT.school ||
      filters.startDate !== PROCESS_SNAPSHOT.startDate || filters.endDate !== PROCESS_SNAPSHOT.endDate) return [];
  return PROCESS_SNAPSHOT.loginByYear;
};
