import type { ReportTemplate } from '../services/reportTemplates';

export const TEACHING_SOURCES = [
  { id: 'skills', label: '技能点数据', summary: '技能掌握分布与薄弱知识点', finding: '示例技能掌握率为 72%，网络配置与设备调试是需要重点复习的知识模块。', advice: '安排一次网络配置专项练习，结合操作记录核对学生掌握情况。' },
  { id: 'tasks', label: '课程考试任务', summary: '任务完成、作业与考试表现', finding: '示例班级有 49 名学生，整体任务完成率为 44%；当前示例未提供完整考试成绩，暂不计算平均分。', advice: '检查未完成任务的原因，拆分任务里程碑，并在下一次课前确认补交进度。' },
  { id: 'behavior', label: '全过程数据-学习行为', summary: '学习投入、平台访问与参与情况', finding: '示例学习记录呈现不同的投入节奏；仅凭访问次数不能判断学习效果，应与任务成果联合分析。', advice: '对持续低参与的学生进行个别沟通，并在一周后复查任务完成情况。' },
  { id: 'software', label: '全过程数据-软件实验', summary: '软件实验过程与操作记录', finding: '示例软件实验覆盖虚拟仿真、ThingsBoard 与 Node-Red，可重点检查重复操作和任务停滞环节。', advice: '针对重复错误提供分步示范，保留调试记录以便复盘。' },
  { id: 'hardware', label: '全过程数据-硬件实验', summary: '硬件交互、设备调试与实践表现', finding: '示例硬件实验涵盖 LoRa、串口通信与网关配置；建议联合检查接线、协议参数和调试结果。', advice: '采用双人互检与现场操作核验，确认学生能够独立完成设备调试。' },
] as const;
export type TeachingSourceId = typeof TEACHING_SOURCES[number]['id'];
export interface ReportConfig {
  school: string; className: string; course: string; title: string;
  prompt: string; sources: TeachingSourceId[]; templates?: ReportTemplate[];
}
export interface LearningReport extends ReportConfig {
  id: string; version: number; createdAt: string;
  sections: { title: string; body: string }[];
}
export function buildLearningReport(config: ReportConfig, previous?: LearningReport): LearningReport {
  if (!config.title.trim() || !config.className || !config.course || !config.sources.length) throw new Error('请填写报告名称、班级、课程，并至少选择一个数据源。');
  const selected = TEACHING_SOURCES.filter(source => config.sources.includes(source.id));
  const focus = config.prompt.trim();
  const wantsActions = !focus || /建议|策略|提升|干预|改进|教学|计划/.test(focus);
  return {
    ...config, title: config.title.trim(), prompt: focus, sources: [...config.sources], templates: (config.templates || []).map(template => ({ ...template })),
    id: previous?.id || crypto.randomUUID(), version: (previous?.version || 0) + 1,
    createdAt: new Date().toISOString(),
    sections: [
      { title: '分析范围', body: `本报告面向${config.className}的${config.course}课程，使用${selected.map(source => source.label).join('、')}。以下内容为原型演示分析，尚未调用真实模型或真实班级数据。` },
      ...(focus ? [{ title: '本次分析重点', body: `教师设定：${focus}\n当前为模板演示；已保留该提示词作为报告生成配置。自由文本的完整理解与执行需接入报告生成服务。` }] : []),
      ...selected.map(source => ({ title: source.summary, body: source.finding })),
      ...(wantsActions ? [{ title: '教学改进建议', body: selected.map((source, index) => `${index + 1}. ${source.advice}`).join('\n') }] : []),
    ],
  };
}

export function createDemoLearningReports(context: Pick<ReportConfig, 'school' | 'className' | 'course'>): LearningReport[] {
  const examples: { title: string; prompt: string; sources: TeachingSourceId[] }[] = [
    { title: '阶段学情综合分析', prompt: '综合分析任务完成、技能掌握和学习投入，给出下阶段教学建议。', sources: ['skills', 'tasks', 'behavior'] },
    { title: '技能薄弱点专项分析', prompt: '重点关注网络配置与设备调试的薄弱技能，设计针对性练习。', sources: ['skills', 'software', 'hardware'] },
    { title: '课程任务完成情况周报', prompt: '分析任务完成情况与学习进度，提出补交任务和课堂跟进计划。', sources: ['tasks', 'behavior'] },
    { title: '学习投入与参与度分析', prompt: '从学习行为与任务表现分析参与情况，给出提高学习投入的建议。', sources: ['behavior', 'tasks'] },
    { title: '软件实验过程复盘', prompt: '复盘虚拟仿真与软件实验中的操作难点，整理常见问题和改进措施。', sources: ['software', 'skills'] },
    { title: '硬件实训能力分析', prompt: '分析设备接线、串口通信和网关调试表现，提出实训教学建议。', sources: ['hardware', 'skills', 'tasks'] },
    { title: '分层教学与辅导建议', prompt: '结合技能掌握与课程任务，制定不同学习层次的辅导策略。', sources: ['skills', 'tasks', 'behavior'] },
    { title: '课程阶段复习计划', prompt: '梳理课程重点知识和实验问题，制定下一阶段的复习计划。', sources: ['skills', 'tasks', 'software', 'hardware'] },
    { title: '全过程学习数据总结', prompt: '综合学习行为、软件实验与硬件实验，形成阶段性教学改进建议。', sources: ['behavior', 'software', 'hardware', 'tasks'] },
  ];
  const now = Date.now();
  return examples.map((example, index) => ({
    ...buildLearningReport({ ...context, ...example, title: `${context.course} · ${example.title}` }),
    createdAt: new Date(now - index * 24 * 60 * 60 * 1000).toISOString(),
  }));
}
