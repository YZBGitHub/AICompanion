import React, { useState } from 'react';
import { ArrowUp, Bot, History, Plus, Settings, MessageSquare } from 'lucide-react';
import { TEACHING_SOURCES, TeachingSourceId } from '../data/learningReports';
import LearningReports from './LearningReports';
import TeacherModal from './TeacherModal';
import './TeacherWorkspace.css';

interface Props {
  school: string; className: string; course: string;
  schools: string[]; classes: string[]; courses: string[];
  onSchoolChange: (value: string) => void; onClassChange: (value: string) => void; onCourseChange: (value: string) => void;
  children: React.ReactNode;
}
interface Session { id: string; title: string; scope: string; messages: { role: 'user' | 'assistant'; text: string }[]; }
const TeacherWorkspace: React.FC<Props> = props => {
  const { school, className, course, schools, classes, courses } = props;
  const [tab, setTab] = useState<'assistant' | 'profile' | 'reports'>('assistant');
  const [sources, setSources] = useState<TeachingSourceId[]>(['behavior']);
  const [input, setInput] = useState('');
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeSession, setActiveSession] = useState<string | null>(null);
  const [showSessions, setShowSessions] = useState(false);
  const scope = `${school}/${className}/${course}`;
  const current = sessions.find(session => session.id === activeSession && session.scope === scope);
  const send = (event: React.FormEvent) => {
    event.preventDefault();
    if (!input.trim() || !sources.length) return;
    const question = input.trim();
    const message = { role: 'user' as const, text: question };
    const reply = { role: 'assistant' as const, text: `正在以「${className} / ${course}」为范围分析。\n本次已选择：${TEACHING_SOURCES.filter(source => sources.includes(source.id)).map(source => source.label).join('、')}。\n\n演示建议：将学习投入、任务完成与技能掌握交叉查看，先定位未完成任务及薄弱技能，再安排针对性辅导。你也可以在“学情报告”中配置分析重点并生成结构化报告。\n\n当前为原型对话，未连接真实 AI 服务。` };
    if (current) setSessions(items => items.map(session => session.id === current.id ? { ...session, messages: [...session.messages, message, reply] } : session));
    else { const id = crypto.randomUUID(); setSessions(items => [{ id, scope, title: question.slice(0, 24), messages: [message, reply] }, ...items]); setActiveSession(id); }
    setInput('');
  };
  return <div className="teacher-workspace">
    <div className="teacher-toolbar">
      <div className="teacher-tabs" role="tablist" aria-label="教师学情分析">
        {([['assistant', 'AI教学助手'], ['profile', '班级画像'], ['reports', '学情报告']] as const).map(([id, title]) => <button key={id} role="tab" id={`teacher-tab-${id}`} aria-selected={tab === id} aria-controls={`teacher-panel-${id}`} onClick={() => setTab(id)} className={tab === id ? 'is-active' : ''}>{title}</button>)}
      </div>
      <div className="teacher-filters">
        <label>学校:<select aria-label="学校" value={school} onChange={e => props.onSchoolChange(e.target.value)}>{schools.map(value => <option key={value}>{value}</option>)}</select></label>
        <label>班级:<select aria-label="班级" value={className} onChange={e => props.onClassChange(e.target.value)}>{classes.map(value => <option key={value}>{value}</option>)}</select></label>
        <label>选择课程:<select aria-label="选择课程" value={course} onChange={e => props.onCourseChange(e.target.value)}>{courses.map(value => <option key={value}>{value}</option>)}</select></label>
      </div>
    </div>
    <div id="teacher-panel-assistant" role="tabpanel" aria-labelledby="teacher-tab-assistant" hidden={tab !== 'assistant'}>
      <div className="teacher-assistant-layout">
        <aside className="teacher-assistant-sidebar">
          <section className="teacher-welcome-card">
            <img className="teacher-mascot" src="./assets/teacher-robot.png" alt="AI教学分析助手" />
            <p className="teacher-greeting">你好，杨振邦老师。我是您的 AI 教学分析助手。</p>
            <p className="teacher-summary">当前管理的1个班级中，49名学生整体完成率为44%，平均分为—分。</p>
            <div className="teacher-stats">{[['总班级', '1'], ['总学生', '49'], ['完成率', '44 %'], ['平均分', '--']].map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
          </section>
          <section className="teacher-source-card"><h3><Settings size={23} />对话数据源配置<small>（多选）</small></h3><div>{TEACHING_SOURCES.map(source => <label key={source.id}><input type="checkbox" checked={sources.includes(source.id)} onChange={() => setSources(selected => selected.includes(source.id) ? selected.filter(id => id !== source.id) : [...selected, source.id])} /><span>{source.label}</span></label>)}</div>{!sources.length && <p className="teacher-error" role="status">请至少选择一个数据源后提问。</p>}</section>
        </aside>
        <section className="teacher-chat"><header>智能分析对话</header><div className="teacher-chat-messages" aria-live="polite"><div className="teacher-chat-brand"><Bot size={45} /><h2>AI技能分析系统-教学分析助手</h2></div>{!current && <div className="teacher-chat-welcome"><Bot size={25} /><strong>你好，我是AI教学分析助手~</strong></div>}{current?.messages.map((message, index) => <div key={index} className={`teacher-chat-message ${message.role}`}><span>{message.role === 'assistant' ? 'AI' : '我'}</span><p>{message.text}</p></div>)}</div>
          <form className="teacher-chat-compose" onSubmit={send}><div className="teacher-chat-tools"><button type="button" onClick={() => setShowSessions(true)}><History size={14} />会话列表</button><button type="button" onClick={() => { setActiveSession(null); setInput(''); }}><Plus size={14} />新建会话</button></div><div className="teacher-chat-input"><textarea aria-label="向教学助手提问" placeholder="点击这里开始提问" value={input} maxLength={2000} onChange={e => setInput(e.target.value)} /><button type="submit" aria-label="发送消息" disabled={!input.trim() || !sources.length}><ArrowUp size={20} /></button></div></form>
        </section>
      </div>
    </div>
    <div id="teacher-panel-profile" role="tabpanel" aria-labelledby="teacher-tab-profile" hidden={tab !== 'profile'} className="teacher-profile">{tab === 'profile' && props.children}</div>
    <div id="teacher-panel-reports" role="tabpanel" aria-labelledby="teacher-tab-reports" hidden={tab !== 'reports'}><LearningReports school={school} className={className} course={course} classes={classes} courses={courses} onContextChange={(nextClass, nextCourse) => { props.onClassChange(nextClass); props.onCourseChange(nextCourse); }} /></div>
    <p className="teacher-prototype-note">教学数据与 AI 结果为原型演示。</p>
    {showSessions && <TeacherModal title="会话列表" onClose={() => setShowSessions(false)}><div className="teacher-session-list">{sessions.filter(session => session.scope === scope).length ? sessions.filter(session => session.scope === scope).map(session => <button key={session.id} onClick={() => { setActiveSession(session.id); setShowSessions(false); }}><MessageSquare size={18} /><span>{session.title}</span><small>{session.messages.length / 2} 轮对话</small></button>) : <p>当前班级与课程暂无会话，发送一条消息即可开始。</p>}</div></TeacherModal>}
  </div>;
};
export default TeacherWorkspace;
