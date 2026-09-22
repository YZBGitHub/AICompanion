import { Language } from '../types';
import { TEXT } from './locales';
import { MOCK_TASKS, MOCK_AUTO_SCORE_TASKS, MOCK_NOTE_TASKS, MOCK_AI_ASSISTANTS_LIST, MOCK_SOFT_ENV_OPTIONS, MOCK_HARD_ENV_OPTIONS } from './mocks';

export interface ProcessCatalogItem {
  id: string;
  label: string;
  description?: string;
  recordId?: number;
  environment?: string;
}
export interface ProcessCatalogGroup {
  id: string;
  label: string;
  kind: 'metric' | 'records';
  items: ProcessCatalogItem[];
}

// The directory uses existing metrics and datasets; counts describe directory entries.
export const getProcessCatalog = (language: Language): Record<string, ProcessCatalogGroup[]> => {
  const { nav, filters } = TEXT[language].process;
  const all = language === 'zh' ? '全部记录' : 'All records';
  const metrics = (id: string, label: string, values: Record<string, string>): ProcessCatalogGroup => ({
    id, label, kind: 'metric', items: Object.entries(values).map(([id, label]) => ({ id, label })),
  });
  const records = (id: string, label: string, items: ProcessCatalogItem[]): ProcessCatalogGroup => ({
    id, label, kind: 'records', items: [{ id: 'all', label: all }, ...items],
  });
  return {
    behavior: [
      metrics('platform', filters.subCategories.platform, filters.metrics_platform),
      metrics('course', filters.subCategories.course, filters.metrics_course),
      metrics('ai', filters.subCategories.ai, filters.metrics_ai),
    ],
    soft_exp: [
      metrics('env', filters.softExpCategories.env, filters.metrics_soft_env),
      metrics('agent', filters.softExpCategories.agent, filters.metrics_soft_agent),
    ],
    hard_exp: [
      metrics('interaction', filters.hardExpCategories.interaction, filters.metrics_hard_interaction),
      metrics('capability', filters.hardExpCategories.capability, filters.metrics_hard_capability),
    ],
    learning_op: [
      records('task', filters.learnOpCategories.task, MOCK_TASKS.map(row => ({ id: String(row.id), recordId: row.id, label: row.name, description: row.course }))),
      records('ai', filters.learnOpCategories.ai, MOCK_AI_ASSISTANTS_LIST.map(row => ({ id: String(row.id), recordId: row.id, label: row.name }))),
      records('auto_score', filters.learnOpCategories.auto_score, MOCK_AUTO_SCORE_TASKS.map(row => ({ id: String(row.id), recordId: row.id, label: row.chapter, description: row.env }))),
      records('note', filters.learnOpCategories.note, MOCK_NOTE_TASKS.map(row => ({ id: String(row.id), recordId: row.id, label: row.chapter, description: row.course }))),
    ],
    soft_op: [records('software', nav.soft_op, MOCK_SOFT_ENV_OPTIONS.slice(1).map(env => ({ id: env, label: env, environment: env })))],
    hard_op: [records('hardware', nav.hard_op, MOCK_HARD_ENV_OPTIONS.slice(1).map(env => ({ id: env, label: env, environment: env })))],
  };
};
