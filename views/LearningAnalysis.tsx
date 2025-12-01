import React, { useState } from 'react';
import { 
  GraduationCap, Brain, Users, Award, BookOpen, Star, 
  Activity, Zap, Target, TrendingUp, AlertCircle, User, 
  Smile, Heart, Briefcase, BarChart2, Shield, Search, Compass,
  Calendar, Clock, CheckCircle, ChevronRight, DollarSign,
  Lightbulb, MousePointerClick, Monitor, Cpu, RefreshCw, Sparkles, Rocket,
  Send, Bot, Layout, PieChart, Info, Settings,
  AlertTriangle,
  LineChart as LineChartIcon,
  Circle
} from 'lucide-react';
import { UserRole, Language } from '../types';
import { 
  TEXT, AI_PERSONAS, SDT_METRICS, CLASS_STATS, LEARNING_COURSES, 
  LEARNING_EXAMS, LEARNING_SKILLS_FULL, WEAKNESS_DATA, JOB_RECOMMENDATIONS, 
  MOCK_PROCESS_SUMMARY, CLASS_SKILL_RANKING, CLASS_STUDENT_RANKING,
  CLASS_COURSE_STATS, CLASS_EXAM_LIST, CLASS_WEAKNESS_RADAR, SDT_WARNING_STUDENTS 
} from '../constants';
import { StudentRadarChart, ClassPerformanceChart, TrendChart, SkillRadarChart } from '../components/DashboardCharts';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, Legend as RechartsLegend, PieChart as RechartsPieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

// Mock data for selectors
const MOCK_SCHOOLS = ['深圳职业技术大学', '金华职业技术学院'];
const MOCK_CLASSES = ['21级物联网1班', '21级物联网2班', '21级嵌入式1班'];
const MOCK_STUDENTS = ['李明 (2021001001)', '张伟 (2021001002)', '王芳 (2021001003)'];

interface LearningAnalysisProps {
  language: Language;
  currentRole?: UserRole;
}

const LearningAnalysis: React.FC<LearningAnalysisProps> = ({ language, currentRole = UserRole.STUDENT }) => {
  const t = TEXT[language];
  const [viewMode, setViewMode] = useState<'student' | 'teacher'>(currentRole === UserRole.TEACHER ? 'teacher' : 'student');
  const [teacherTab, setTeacherTab] = useState<'assistant' | 'profile' | 'compare'>('assistant');
  const [selectedPersonaId, setSelectedPersonaId] = useState('geek'); 
  const [skillFilter, setSkillFilter] = useState('全部');
  const [isRegenerating, setIsRegenerating] = useState(false);
  
  // Selection State for Teacher/Admin
  const [selectedSchool, setSelectedSchool] = useState(MOCK_SCHOOLS[0]);
  const [selectedClass, setSelectedClass] = useState(MOCK_CLASSES[0]);
  const [selectedStudent, setSelectedStudent] = useState(MOCK_STUDENTS[0]);

  // Teacher AI Assistant State
  const [aiChatInput, setAiChatInput] = useState('');
  const [aiChatHistory, setAiChatHistory] = useState<{sender: 'user'|'ai', text: string}[]>([
    { sender: 'ai', text: t.learning.teacher.ai.welcome },
  ]);
  const [selectedAiClasses, setSelectedAiClasses] = useState<string[]>([]);
  const [selectedAiDataTypes, setSelectedAiDataTypes] = useState<string[]>([]);

  const currentPersona = AI_PERSONAS.find(p => p.id === selectedPersonaId) || AI_PERSONAS[0];
  const canSelectStudent = currentRole === UserRole.TEACHER || currentRole === UserRole.ADMIN;
  const canSelectSchool = currentRole === UserRole.ADMIN;
  const uniqueCourses = ['全部', ...Array.from(new Set(LEARNING_SKILLS_FULL.map(s => s.course)))];

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'bg-green-500'; // Excellent
    if (score >= 60) return 'bg-blue-400';  // Good
    return 'bg-slate-300'; // Needs Improvement
  };

  const getSkillOpacity = (skillCourse: string) => {
     if (skillFilter === '全部') return 'opacity-100';
     return skillFilter === skillCourse ? 'opacity-100 scale-105 shadow-md' : 'opacity-20 grayscale scale-95';
  };

  const handleRegeneratePersona = () => {
     setIsRegenerating(true);
     setTimeout(() => {
        const currentIndex = AI_PERSONAS.findIndex(p => p.id === selectedPersonaId);
        const nextIndex = (currentIndex + 1) % AI_PERSONAS.length;
        setSelectedPersonaId(AI_PERSONAS[nextIndex].id);
        setIsRegenerating(false);
     }, 1500);
  };

  const handleAiChatSend = () => {
     if (!aiChatInput.trim()) return;
     const newHistory = [...aiChatHistory, { sender: 'user' as const, text: aiChatInput }];
     setAiChatHistory(newHistory);
     setAiChatInput('');
     setTimeout(() => {
        setAiChatHistory([...newHistory, { sender: 'ai', text: 'AI正在分析您选择的数据...' }]);
     }, 1000);
  };

  // Mapped indicators for SDT based on Process Data Summary
  const SDT_INDICATORS = {
    autonomy: [
      { label: language === 'zh' ? '用户登录次数' : 'Login Count', val: MOCK_PROCESS_SUMMARY.behavior.logins, icon: <MousePointerClick size={12}/> },
      { label: language === 'zh' ? '实验环境打开' : 'Env Open Count', val: MOCK_PROCESS_SUMMARY.softExp.openCount, icon: <Monitor size={12}/> },
      { label: language === 'zh' ? '平台在线时长' : 'Online Duration', val: MOCK_PROCESS_SUMMARY.behavior.onlineTime, icon: <Clock size={12}/> }
    ],
    competence: [
      { label: language === 'zh' ? '软实验运行时长' : 'Soft Run Time', val: MOCK_PROCESS_SUMMARY.softExp.runTime, icon: <Cpu size={12}/> },
      { label: language === 'zh' ? '硬实验在线时长' : 'Hard Online Time', val: MOCK_PROCESS_SUMMARY.hardExp.onlineTime, icon: <Activity size={12}/> },
      { label: language === 'zh' ? '硬件打开次数' : 'Hard Open Count', val: MOCK_PROCESS_SUMMARY.hardExp.openCount, icon: <Zap size={12}/> }
    ],
    relatedness: [
      { label: language === 'zh' ? 'AI 问答次数' : 'AI QA Count', val: MOCK_PROCESS_SUMMARY.behavior.aiQaCount, icon: <Brain size={12}/> },
      { label: language === 'zh' ? '硬件问答时长' : 'Hard QA Time', val: MOCK_PROCESS_SUMMARY.hardExp.qaTime, icon: <Clock size={12}/> },
      { label: language === 'zh' ? '硬件会话数量' : 'Hard Sessions', val: MOCK_PROCESS_SUMMARY.hardExp.sessionCount, icon: <Users size={12}/> }
    ]
  };

  // Colors for Class Distribution Pie
  const DIST_COLORS = ['#10b981', '#60a5fa', '#cbd5e1'];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 animate-fade-in min-h-screen">
      
      {/* View Switcher Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800">{t.learning.title}</h2>
        <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-200 flex">
           <button 
             onClick={() => setViewMode('student')}
             className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${
               viewMode === 'student' ? 'bg-teal-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'
             }`}
           >
             <User size={18}/> {t.learning.views.student}
           </button>
           <button 
             onClick={() => setViewMode('teacher')}
             className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${
               viewMode === 'teacher' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'
             }`}
           >
             <Users size={18}/> {t.learning.views.teacher}
           </button>
        </div>
      </div>

      {viewMode === 'student' ? (
        // ================= STUDENT VIEW =================
        <div className="space-y-8">
           {/* 1. Basic Info & Filter (Role Context Aware) */}
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-wrap gap-6 items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white shadow-lg shrink-0">
                    <User size={32}/>
                 </div>
                 <div>
                    <h3 className="text-xl font-bold text-slate-800">
                       {canSelectStudent ? selectedStudent.split(' ')[0] : '李明'} 
                       <span className="text-sm font-normal text-slate-500 ml-2">
                          ({canSelectStudent ? selectedStudent.split('(')[1].replace(')', '') : '2021001001'})
                       </span>
                    </h3>
                    <div className="flex gap-4 text-sm text-slate-500 mt-1">
                       <span className="flex items-center gap-1"><GraduationCap size={14}/> {canSelectSchool ? selectedSchool : '深圳职业技术大学'}</span>
                       <span className="flex items-center gap-1"><BookOpen size={14}/> 物联网应用技术</span>
                       <span className="flex items-center gap-1"><Users size={14}/> {canSelectStudent ? selectedClass : '21级物联网1班'}</span>
                    </div>
                 </div>
              </div>
              
              {canSelectStudent && (
                 <div className="flex gap-3">
                    {canSelectSchool && (
                       <select 
                          value={selectedSchool} 
                          onChange={e => setSelectedSchool(e.target.value)}
                          className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-slate-50 text-slate-600 focus:ring-2 focus:ring-teal-500 outline-none"
                       >
                          {MOCK_SCHOOLS.map(s => <option key={s} value={s}>{s}</option>)}
                       </select>
                    )}
                    <select 
                       value={selectedClass} 
                       onChange={e => setSelectedClass(e.target.value)}
                       className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-slate-50 text-slate-600 focus:ring-2 focus:ring-teal-500 outline-none"
                    >
                       {MOCK_CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <select 
                       value={selectedStudent} 
                       onChange={e => setSelectedStudent(e.target.value)}
                       className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-slate-50 text-slate-600 focus:ring-2 focus:ring-teal-500 outline-none"
                    >
                       {MOCK_STUDENTS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                 </div>
              )}
           </div>

           {/* 2. Academic Overview (Courses & Exams) */}
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Course Status */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                 <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                    <BookOpen size={20} className="text-teal-600"/> {t.learning.overview.courses}
                 </h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {LEARNING_COURSES.map((course) => (
                       <div key={course.id} className="border border-slate-100 rounded-xl p-4 bg-slate-50 hover:shadow-md transition-all group">
                          <div className="flex gap-3 mb-3">
                             <div className={`w-10 h-10 rounded-lg ${course.cover} flex items-center justify-center shrink-0`}>
                                <course.icon className={course.iconColor} size={32} />
                             </div>
                             <div className="min-w-0">
                                <h4 className="font-bold text-slate-800 text-sm truncate" title={course.name}>{course.name}</h4>
                                <p className="text-xs text-slate-500 truncate">{course.major}</p>
                             </div>
                          </div>
                          {course.status === 'in_progress' ? (
                             <div>
                                <div className="flex justify-between text-xs mb-1">
                                   <span className="text-slate-500">学习进度</span>
                                   <span className="font-bold text-teal-600">{course.progress}%</span>
                                </div>
                                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                                   <div className="bg-teal-500 h-1.5 rounded-full" style={{width: `${course.progress}%`}}></div>
                                </div>
                             </div>
                          ) : (
                             <div className="flex justify-between items-center mt-2">
                                <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-bold">已完成</span>
                                <div className="text-xs text-slate-500 font-medium">排名: <span className="text-orange-500 font-bold">{course.rank}</span></div>
                             </div>
                          )}
                       </div>
                    ))}
                 </div>
              </div>

              {/* Exam Status */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                 <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                    <Award size={20} className="text-purple-600"/> {t.learning.overview.exams}
                 </h3>
                 <div className="space-y-4 max-h-[280px] overflow-y-auto pr-2 custom-scrollbar">
                    {LEARNING_EXAMS.pending.map((exam, i) => (
                       <div key={`p-${i}`} className="flex items-center justify-between p-3 rounded-xl border border-red-100 bg-red-50/50">
                          <div className="flex items-center gap-3">
                             <div className="bg-red-100 p-2 rounded-lg text-red-600"><Clock size={18}/></div>
                             <div>
                                <div className="font-bold text-slate-700 text-sm">{exam.name}</div>
                                <div className="text-xs text-slate-500">{exam.startTime}</div>
                             </div>
                          </div>
                          <div className="text-center">
                             <div className="text-xs text-slate-400 font-bold uppercase">倒计时</div>
                             <div className="font-bold text-red-600">{exam.daysLeft} 天</div>
                          </div>
                       </div>
                    ))}
                    {LEARNING_EXAMS.completed.map((exam, i) => (
                       <div key={`c-${i}`} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-sm transition-all">
                          <div className="flex items-center gap-3">
                             <div className="bg-green-100 p-2 rounded-lg text-green-600"><CheckCircle size={18}/></div>
                             <div>
                                <div className="font-bold text-slate-700 text-sm">{exam.name}</div>
                                <div className="text-xs text-slate-500">完成于 {exam.time}</div>
                             </div>
                          </div>
                          <div className="text-right">
                             <div className="font-bold text-slate-800 text-lg">{exam.score} <span className="text-xs font-normal text-slate-400">分</span></div>
                             <div className="text-xs text-slate-500">班级第 {exam.rank}</div>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* 3. Skill Analysis (Dense Chip View with Tooltip) */}
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                 <h3 className="font-bold text-slate-700 flex items-center gap-2 text-xl">
                    <Target size={24} className="text-blue-600"/> {t.learning.skill_analysis.title}
                 </h3>
                 <div className="flex gap-2 bg-slate-100 p-1 rounded-lg overflow-x-auto max-w-full custom-scrollbar">
                    {uniqueCourses.map(course => (
                       <button
                          key={course}
                          onClick={() => setSkillFilter(course)}
                          className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all whitespace-nowrap ${
                             skillFilter === course ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                          }`}
                       >
                          {course}
                       </button>
                    ))}
                 </div>
              </div>
              
              <div className="mb-4 flex gap-4 text-xs font-medium text-slate-500">
                 <span className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-green-500"></div> 优秀</span>
                 <span className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-blue-400"></div> 良好</span>
                 <span className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-slate-300"></div> 待提升</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                 {LEARNING_SKILLS_FULL.map((skill, i) => (
                    <div 
                       key={i}
                       className={`group relative h-6 min-w-[3rem] px-1 rounded flex items-center justify-center text-[10px] font-bold text-white cursor-help transition-all duration-300 ${getScoreColor(skill.score)} ${getSkillOpacity(skill.course)}`}
                    >
                       {skill.code}
                       <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-[200px] bg-slate-800 text-white text-xs rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 shadow-lg">
                          <div className="font-bold mb-0.5">{skill.name}</div>
                          <div className="text-[10px] opacity-80 mb-1">{skill.course}</div>
                          <div className="flex justify-between items-center gap-4">
                            <span>掌握度:</span>
                            <span className={`font-bold ${skill.score >= 85 ? 'text-green-400' : skill.score >= 60 ? 'text-blue-400' : 'text-slate-300'}`}>
                              {skill.score}%
                            </span>
                          </div>
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           {/* 4. Weakness Analysis (Unified, Full Width) */}
           <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
              <div className="flex flex-col lg:flex-row items-center gap-6">
                 <div className="w-full lg:w-1/3 shrink-0">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-red-100 rounded-lg text-red-600">
                            <AlertCircle size={24}/>
                        </div>
                        <h4 className="font-bold text-red-800 text-lg">
                           {t.learning.skill_analysis.weakness}
                        </h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                       {WEAKNESS_DATA.map((item, idx) => (
                          <span key={idx} className="bg-white border border-red-100 text-red-600 px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm flex items-center gap-1.5">
                             <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                             {item.skill}
                          </span>
                       ))}
                    </div>
                 </div>

                 <div className="w-full lg:w-2/3 bg-white p-6 rounded-xl border border-red-100 shadow-sm relative">
                    <div className="absolute top-4 right-4 text-xs font-bold text-red-300 uppercase tracking-widest flex items-center gap-1">
                       <Brain size={12}/> AI Analysis
                    </div>
                    <h5 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                        <Lightbulb size={18} className="text-yellow-500"/> 综合诊断建议
                    </h5>
                    <p className="text-slate-600 leading-relaxed text-sm">
                       通过对您近期全过程数据的分析，您的编程基础较为扎实，但在 <span className="font-bold text-slate-800">硬件底层驱动开发</span> 与 <span className="font-bold text-slate-800">网络协议配置</span> 方面存在明显短板。建议加强STM32的中断优先级配置实操，并在模拟器中多进行VLAN划分的网络拓扑练习。结合您的I2C通信时序问题，推荐使用逻辑分析仪抓取波形进行对照学习，以强化对底层时序的理解。
                    </p>
                 </div>
              </div>
           </div>

           {/* 5. Job Recommendations */}
           <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2 text-xl">
                 <Briefcase size={24} className="text-orange-500"/> {t.learning.ai_analysis.job_rec}
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {JOB_RECOMMENDATIONS.slice(0, 3).map((job, idx) => (
                    <div key={idx} className="bg-slate-50 rounded-xl border border-slate-100 p-5 flex flex-col hover:border-orange-200 hover:shadow-md transition-all">
                       <div className="flex justify-between items-start mb-2">
                          <div>
                             <h5 className="font-bold text-slate-800 text-base">{job.title}</h5>
                             <div className="text-xs text-slate-500 font-mono mt-0.5">{job.salary}</div>
                          </div>
                          <div className="bg-white px-2 py-1 rounded-lg border border-slate-200 text-green-600 font-bold text-sm shadow-sm">
                             {job.match}% 匹配
                          </div>
                       </div>
                       
                       <div className="h-48 w-full relative my-4 bg-white rounded-lg border border-slate-100 shadow-inner p-2">
                          <ResponsiveContainer width="100%" height="100%">
                             <RadarChart cx="50%" cy="50%" outerRadius="70%" data={job.matchingSkills}>
                                <PolarGrid stroke="#e2e8f0"/>
                                <PolarAngleAxis dataKey="name" tick={{fontSize: 10, fill: '#64748b'}} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar
                                   name="Skill"
                                   dataKey="score"
                                   stroke="#f97316"
                                   strokeWidth={2}
                                   fill="#fdba74"
                                   fillOpacity={0.5}
                                />
                                <Tooltip 
                                   contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px'}}
                                   itemStyle={{color: '#ea580c', fontWeight: 'bold'}}
                                />
                             </RadarChart>
                          </ResponsiveContainer>
                       </div>

                       <div className="mt-auto">
                          <div className="text-xs text-slate-600 leading-relaxed bg-white p-3 rounded border border-slate-100 flex gap-2">
                             <div className="min-w-[4px] bg-orange-200 rounded-full"></div>
                             {job.reason}
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           {/* 6. SDT Analysis */}
           <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="font-bold text-slate-800 text-xl mb-6 flex items-center gap-2">
                 <Shield size={24} className="text-teal-600"/> {t.learning.sdt.title}
              </h3>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 mb-8">
                 <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
                    <Activity size={16} className="text-blue-500"/> {t.learning.sdt.summary_title}
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                    <div className="space-y-3 px-2">
                       <div className="flex items-center gap-2 font-bold text-slate-800">
                          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center"><Monitor size={18}/></div>
                          {t.learning.sdt.beh_title}
                       </div>
                       <div className="grid grid-cols-2 gap-y-2 text-sm pt-2">
                          <div className="text-slate-500">用户登录: <span className="text-slate-800 font-bold">{MOCK_PROCESS_SUMMARY.behavior.logins}次</span></div>
                          <div className="text-slate-500">平台在线: <span className="text-slate-800 font-bold">{MOCK_PROCESS_SUMMARY.behavior.onlineTime}</span></div>
                          <div className="text-slate-500 col-span-2">AI问答总次: <span className="text-slate-800 font-bold">{MOCK_PROCESS_SUMMARY.behavior.aiQaCount}次</span></div>
                       </div>
                    </div>
                    <div className="space-y-3 pt-4 md:pt-0 md:pl-6 px-2">
                       <div className="flex items-center gap-2 font-bold text-slate-800">
                          <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center"><Cpu size={18}/></div>
                          {t.learning.sdt.soft_title}
                       </div>
                       <div className="grid grid-cols-2 gap-y-2 text-sm pt-2">
                          <div className="text-slate-500">环境打开: <span className="text-slate-800 font-bold">{MOCK_PROCESS_SUMMARY.softExp.openCount}次</span></div>
                          <div className="text-slate-500">运行总时长: <span className="text-slate-800 font-bold">{MOCK_PROCESS_SUMMARY.softExp.runTime}</span></div>
                       </div>
                    </div>
                    <div className="space-y-3 pt-4 md:pt-0 md:pl-6 px-2">
                       <div className="flex items-center gap-2 font-bold text-slate-800">
                          <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center"><Zap size={18}/></div>
                          {t.learning.sdt.hard_title}
                       </div>
                       <div className="grid grid-cols-2 gap-y-2 text-sm pt-2">
                          <div className="text-slate-500">智能体登录: <span className="text-slate-800 font-bold">{MOCK_PROCESS_SUMMARY.hardExp.loginCount}次</span></div>
                          <div className="text-slate-500">在线总时: <span className="text-slate-800 font-bold">{MOCK_PROCESS_SUMMARY.hardExp.onlineTime}</span></div>
                          <div className="text-slate-500">会话总数: <span className="text-slate-800 font-bold">{MOCK_PROCESS_SUMMARY.hardExp.sessionCount}个</span></div>
                          <div className="text-slate-500">问答总时: <span className="text-slate-800 font-bold">{MOCK_PROCESS_SUMMARY.hardExp.qaTime}</span></div>
                       </div>
                    </div>
                 </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                 <div className="bg-slate-900 rounded-2xl p-6 text-white flex flex-col justify-center relative overflow-hidden shadow-lg lg:col-span-1">
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-900 to-slate-900"></div>
                    <div className="relative z-10 text-center">
                       <div className="text-slate-400 text-xs font-bold uppercase mb-2">{t.learning.sdt.total_score}</div>
                       <div className="text-6xl font-black text-white mb-2">{SDT_METRICS.total.score}</div>
                       <div className="text-teal-400 text-sm font-bold">校内排名 No.{SDT_METRICS.total.rank}</div>
                    </div>
                 </div>

                 <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100 flex flex-col hover:shadow-md transition-shadow">
                       <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-blue-100 rounded-lg text-blue-600"><User size={20}/></div>
                          <div>
                             <h4 className="font-bold text-slate-700 text-sm">{t.learning.sdt.autonomy}</h4>
                             <div className="text-2xl font-black text-blue-600">{SDT_METRICS.autonomy.score}</div>
                          </div>
                       </div>
                       <div className="space-y-3 bg-white/60 rounded-xl p-4 border border-blue-100/50 flex-1">
                          {SDT_INDICATORS.autonomy.map((ind, i) => (
                             <div key={i} className="flex justify-between items-center text-xs">
                                <span className="text-slate-500 flex items-center gap-2">{ind.icon} {ind.label}</span>
                                <span className="font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-blue-50">{ind.val}</span>
                             </div>
                          ))}
                       </div>
                    </div>

                    <div className="bg-green-50 rounded-2xl p-5 border border-green-100 flex flex-col hover:shadow-md transition-shadow">
                       <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-green-100 rounded-lg text-green-600"><Award size={20}/></div>
                          <div>
                             <h4 className="font-bold text-slate-700 text-sm">{t.learning.sdt.competence}</h4>
                             <div className="text-2xl font-black text-green-600">{SDT_METRICS.competence.score}</div>
                          </div>
                       </div>
                       <div className="space-y-3 bg-white/60 rounded-xl p-4 border border-green-100/50 flex-1">
                          {SDT_INDICATORS.competence.map((ind, i) => (
                             <div key={i} className="flex justify-between items-center text-xs">
                                <span className="text-slate-500 flex items-center gap-2">{ind.icon} {ind.label}</span>
                                <span className="font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-green-50">{ind.val}</span>
                             </div>
                          ))}
                       </div>
                    </div>

                    <div className="bg-purple-50 rounded-2xl p-5 border border-purple-100 flex flex-col hover:shadow-md transition-shadow">
                       <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-purple-100 rounded-lg text-purple-600"><Heart size={20}/></div>
                          <div>
                             <h4 className="font-bold text-slate-700 text-sm">{t.learning.sdt.relatedness}</h4>
                             <div className="text-2xl font-black text-purple-600">{SDT_METRICS.relatedness.score}</div>
                          </div>
                       </div>
                       <div className="space-y-3 bg-white/60 rounded-xl p-4 border border-purple-100/50 flex-1">
                          {SDT_INDICATORS.relatedness.map((ind, i) => (
                             <div key={i} className="flex justify-between items-center text-xs">
                                <span className="text-slate-500 flex items-center gap-2">{ind.icon} {ind.label}</span>
                                <span className="font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-purple-50">{ind.val}</span>
                             </div>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           {/* 7. AI Comprehensive Analysis */}
           <div className="bg-gradient-to-br from-violet-50 to-fuchsia-50 rounded-2xl p-8 border border-purple-100 shadow-sm relative overflow-hidden">
              <div className="relative z-10">
                 <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
                    <h3 className="font-bold text-2xl flex items-center gap-3 text-slate-800">
                       <Sparkles size={28} className="text-purple-600 fill-purple-100"/> {t.learning.ai_analysis.title}
                    </h3>
                    <div className="flex items-center gap-4">
                       <span className="text-xs text-slate-400 font-medium hidden sm:block">最近更新: 11月28日 16:30</span>
                       <button 
                          onClick={handleRegeneratePersona}
                          disabled={isRegenerating}
                          className="bg-white hover:bg-purple-50 text-purple-700 border border-purple-200 px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-all flex items-center gap-2 hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                       >
                          <RefreshCw size={16} className={isRegenerating ? 'animate-spin' : ''}/>
                          {isRegenerating ? '重新生成中...' : '重新生成'}
                       </button>
                    </div>
                 </div>
                 
                 <div className="flex flex-col lg:flex-row items-stretch gap-8">
                    <div className="lg:w-1/3 bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-sm flex flex-col items-center justify-center text-center">
                       <div className="relative mb-6">
                          <div className={`w-40 h-40 rounded-full border-4 border-white shadow-xl overflow-hidden ${currentPersona.color} relative z-10 transition-colors duration-500`}>
                             <img src={currentPersona.avatar} alt="Persona" className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500" />
                          </div>
                          <div className={`absolute inset-0 rounded-full blur-2xl opacity-30 z-0 ${currentPersona.color}`}></div>
                          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg z-20 whitespace-nowrap border-2 border-white">
                             {currentPersona.name}
                          </div>
                       </div>
                       
                       <p className="text-slate-600 font-medium italic mb-4 leading-relaxed">
                          "{currentPersona.desc}"
                       </p>

                       <div className="flex flex-wrap justify-center gap-2">
                          {(currentPersona as any).tags?.map((tag: string, i: number) => (
                             <span key={i} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold border border-purple-200">
                                #{tag}
                             </span>
                          ))}
                       </div>
                    </div>

                    <div className="lg:w-1/3 bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/50 shadow-sm flex flex-col">
                       <div className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center mb-2">能力多维透视</div>
                       <div className="flex-1 min-h-[200px]">
                          <ResponsiveContainer width="100%" height="100%">
                             <RadarChart cx="50%" cy="50%" outerRadius="70%" data={[
                                { subject: t.learning.ai_analysis.habits, A: 90, fullMark: 100 },
                                { subject: t.learning.ai_analysis.features, A: 85, fullMark: 100 },
                                { subject: t.learning.ai_analysis.ability, A: 95, fullMark: 100 },
                                { subject: '专注度', A: 88, fullMark: 100 },
                                { subject: '互动性', A: 75, fullMark: 100 },
                             ]}>
                                <PolarGrid stroke="#e2e8f0" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 'bold' }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar name="Persona" dataKey="A" stroke="#a78bfa" strokeWidth={3} fill="#c084fc" fillOpacity={0.5} />
                             </RadarChart>
                          </ResponsiveContainer>
                       </div>
                    </div>

                    <div className="lg:w-1/3 flex flex-col gap-4">
                       <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-white/50 shadow-sm flex-1">
                          <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2 text-sm">
                             <Search size={16} className="text-blue-500"/> SDT 深度归因
                          </h4>
                          <p className="text-sm text-slate-600 leading-relaxed text-justify">
                             基于您的全过程数据，您在 <span className="text-blue-600 font-bold">自主性 (85分)</span> 维度表现优异，常在深夜主动进行实验探索，展现出极强的内驱力。这与 <span className="text-purple-600 font-bold">{currentPersona.name}</span> 形象高度契合。建议在小组协作中增加互动，以平衡关系性维度的得分。
                          </p>
                       </div>

                       <div className="bg-gradient-to-r from-teal-500 to-emerald-600 p-5 rounded-2xl shadow-lg text-white flex-1 flex flex-col justify-center relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-4 opacity-10">
                             <Rocket size={80} />
                          </div>
                          <div className="relative z-10">
                             <div className="text-teal-100 text-xs font-bold uppercase tracking-wider mb-1">最佳岗位匹配</div>
                             <div className="text-2xl font-black mb-3">{JOB_RECOMMENDATIONS[0].title}</div>
                             <div className="h-px bg-white/20 w-full mb-3"></div>
                             <p className="text-sm font-medium italic opacity-90 leading-relaxed">
                                "你的代码拥有连接万物的力量。保持这份热爱，未来的智慧城市将由你亲手构建！"
                             </p>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      ) : (
        // ================= TEACHER VIEW =================
        <div className="space-y-8">
           {/* Tab Navigation & Controls */}
           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
               <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-200 inline-flex">
                  <button 
                    onClick={() => setTeacherTab('assistant')}
                    className={`px-6 py-2.5 text-sm font-bold rounded-lg transition-all flex items-center gap-2 ${
                      teacherTab === 'assistant' ? 'bg-teal-50 text-teal-700' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Bot size={18}/> {t.learning.teacher.tabs.assistant}
                  </button>
                  <button 
                    onClick={() => setTeacherTab('profile')}
                    className={`px-6 py-2.5 text-sm font-bold rounded-lg transition-all flex items-center gap-2 ${
                      teacherTab === 'profile' ? 'bg-teal-50 text-teal-700' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Layout size={18}/> {t.learning.teacher.tabs.profile}
                  </button>
                  <button 
                    onClick={() => setTeacherTab('compare')}
                    className={`px-6 py-2.5 text-sm font-bold rounded-lg transition-all flex items-center gap-2 ${
                      teacherTab === 'compare' ? 'bg-teal-50 text-teal-700' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <PieChart size={18}/> {t.learning.teacher.tabs.compare}
                  </button>
               </div>

               {/* Class Selector for Teacher (Moved to same level) */}
               <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm">
                   <div className="px-2 text-slate-500 text-xs font-bold uppercase">当前班级:</div>
                   <select 
                      value={selectedClass} 
                      onChange={e => setSelectedClass(e.target.value)}
                      className="border-none bg-slate-50 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-700 focus:ring-0 outline-none cursor-pointer hover:bg-slate-100"
                   >
                      {MOCK_CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                   </select>
               </div>
           </div>

           {/* 1. AI Analysis Assistant */}
           {teacherTab === 'assistant' && (
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[700px]">
                {/* Left: Summary & Config */}
                <div className="lg:col-span-1 space-y-6 flex flex-col">
                   <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white shadow-lg">
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                         <Bot size={24}/> {t.learning.teacher.ai.welcome}
                      </h3>
                      <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20 text-sm leading-relaxed text-indigo-100">
                         {t.learning.teacher.ai.summary}
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-6">
                         <div className="bg-white/10 p-3 rounded-lg text-center">
                            <div className="text-xs opacity-70 mb-1">总班级</div>
                            <div className="text-2xl font-bold">4</div>
                         </div>
                         <div className="bg-white/10 p-3 rounded-lg text-center">
                            <div className="text-xs opacity-70 mb-1">总学生</div>
                            <div className="text-2xl font-bold">34</div>
                         </div>
                         <div className="bg-white/10 p-3 rounded-lg text-center">
                            <div className="text-xs opacity-70 mb-1">完成率</div>
                            <div className="text-2xl font-bold">84%</div>
                         </div>
                         <div className="bg-white/10 p-3 rounded-lg text-center">
                            <div className="text-xs opacity-70 mb-1">平均分</div>
                            <div className="text-2xl font-bold">67</div>
                         </div>
                      </div>
                   </div>

                   {/* Configuration Context */}
                   <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex-1">
                      <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                         <Settings size={18} className="text-slate-400"/> 对话数据源配置
                      </h4>
                      <div className="space-y-4">
                         <div>
                            <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">分析班级 (多选)</label>
                            <div className="space-y-2 max-h-[150px] overflow-y-auto">
                               {MOCK_CLASSES.map(cls => (
                                  <label key={cls} className="flex items-center gap-2 p-2 rounded hover:bg-slate-50 cursor-pointer">
                                     <input 
                                       type="checkbox" 
                                       checked={selectedAiClasses.includes(cls)}
                                       onChange={e => {
                                          if(e.target.checked) setSelectedAiClasses([...selectedAiClasses, cls]);
                                          else setSelectedAiClasses(selectedAiClasses.filter(c => c !== cls));
                                       }}
                                       className="rounded text-teal-600 focus:ring-teal-500"
                                     />
                                     <span className="text-sm text-slate-700">{cls}</span>
                                  </label>
                               ))}
                            </div>
                         </div>
                         <div>
                            <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">数据项 (多选)</label>
                            <div className="space-y-2 max-h-[150px] overflow-y-auto">
                               {['技能点数据', '自动评分结果', '考试/测验成绩', '全过程数据-学习行为', '全过程数据-软件实验', '全过程数据-硬件实验'].map(type => (
                                  <label key={type} className="flex items-center gap-2 p-2 rounded hover:bg-slate-50 cursor-pointer">
                                     <input 
                                       type="checkbox" 
                                       checked={selectedAiDataTypes.includes(type)}
                                       onChange={e => {
                                          if(e.target.checked) setSelectedAiDataTypes([...selectedAiDataTypes, type]);
                                          else setSelectedAiDataTypes(selectedAiDataTypes.filter(t => t !== type));
                                       }}
                                       className="rounded text-teal-600 focus:ring-teal-500"
                                     />
                                     <span className="text-sm text-slate-700">{type}</span>
                                  </label>
                               ))}
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Right: Chat Interface */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
                   <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                      <div className="font-bold text-slate-700 flex items-center gap-2">
                         <Bot size={20} className="text-teal-600"/> 智能分析对话
                      </div>
                      <button className="text-xs text-slate-400 hover:text-teal-600 flex items-center gap-1">
                         <RefreshCw size={12}/> 清除历史
                      </button>
                   </div>
                   
                   <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
                      {aiChatHistory.map((msg, i) => (
                         <div key={i} className={`flex gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'ai' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-200 text-slate-600'}`}>
                               {msg.sender === 'ai' ? <Bot size={20}/> : <User size={20}/>}
                            </div>
                            <div className={`p-4 rounded-2xl max-w-[80%] text-sm shadow-sm ${msg.sender === 'ai' ? 'bg-white border border-slate-200 text-slate-700 rounded-tl-none' : 'bg-indigo-600 text-white rounded-tr-none'}`}>
                               {msg.text}
                            </div>
                         </div>
                      ))}
                   </div>

                   <div className="p-4 bg-white border-t border-slate-100">
                      <div className="flex gap-3">
                         <input 
                           type="text" 
                           value={aiChatInput}
                           onChange={e => setAiChatInput(e.target.value)}
                           onKeyDown={e => e.key === 'Enter' && handleAiChatSend()}
                           className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                           placeholder={t.learning.teacher.ai.chat_placeholder}
                         />
                         <button 
                           onClick={handleAiChatSend}
                           className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-xl transition-colors shadow-lg shadow-indigo-500/30"
                         >
                            <Send size={20}/>
                         </button>
                      </div>
                   </div>
                </div>
             </div>
           )}

           {/* 2. Class Profile */}
           {teacherTab === 'profile' && (
             <div className="space-y-6">
                
                {/* 2.0 Course & Exam Dashboard (New Layout) */}
                {/* Row 1: Charts Only */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Score Distribution Chart */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600"><PieChart size={20}/></div>
                            <h3 className="font-bold text-slate-800">成绩分布</h3>
                        </div>
                        <div className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <RechartsPieChart>
                                    <Pie
                                        data={CLASS_COURSE_STATS.distribution}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={50}
                                        outerRadius={70}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {CLASS_COURSE_STATS.distribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={DIST_COLORS[index % DIST_COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <RechartsLegend verticalAlign="bottom" height={36} iconSize={10}/>
                                    <Tooltip />
                                </RechartsPieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Trend Chart */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600"><TrendingUp size={20}/></div>
                            <h3 className="font-bold text-slate-800">平均成绩分布趋势</h3>
                        </div>
                        <div className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={CLASS_COURSE_STATS.scoreScatter}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9"/>
                                    <XAxis dataKey="studentId" tick={false} axisLine={false}/>
                                    <YAxis domain={[0, 100]} hide/>
                                    <Tooltip cursor={{fill: 'transparent'}}/>
                                    <Line type="monotone" dataKey="avg" stroke="#94a3b8" strokeWidth={2} dot={false} strokeDasharray="5 5" name="班级平均"/>
                                    <Line type="monotone" dataKey="score" stroke="#0d9488" strokeWidth={0} dot={{r: 3, fill: '#0d9488'}} name="学生成绩"/>
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Row 2: Course Info & Exam List */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Course Learning Status (Simplified Info) */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600"><BookOpen size={20}/></div>
                            <h3 className="font-bold text-slate-800">课程学习情况</h3>
                        </div>
                        <div className="flex items-center gap-4 bg-slate-50 p-6 rounded-xl border border-slate-100">
                            <div className={`w-16 h-16 ${CLASS_COURSE_STATS.currentCourse.cover} rounded-xl flex items-center justify-center shrink-0`}>
                                <CLASS_COURSE_STATS.currentCourse.icon size={32} className={CLASS_COURSE_STATS.currentCourse.iconColor}/>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-slate-800 text-lg mb-1 truncate">{CLASS_COURSE_STATS.currentCourse.name}</h4>
                                <div className="text-sm text-slate-500">{CLASS_COURSE_STATS.currentCourse.major}</div>
                            </div>
                            <div className="text-right">
                                <div className="text-xs text-slate-400 font-bold mb-1">完成进度</div>
                                <div className="text-2xl font-black text-teal-600">{CLASS_COURSE_STATS.currentCourse.progress}%</div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Exams */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-orange-100 rounded-lg text-orange-600"><Clock size={20}/></div>
                            <h3 className="font-bold text-slate-800">近期考试概览</h3>
                        </div>
                        <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar max-h-[150px]">
                            {CLASS_EXAM_LIST.map((exam, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-sm transition-all">
                                    <div>
                                        <div className="font-bold text-slate-700 text-sm mb-0.5">{exam.name}</div>
                                        <div className="text-xs text-slate-500 flex items-center gap-2">
                                            <Calendar size={10}/> {exam.date}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                            exam.status === '已结束' ? 'bg-green-100 text-green-700' :
                                            exam.status === '进行中' ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-600'
                                        }`}>
                                            {exam.status}
                                        </span>
                                        {exam.status === '已结束' && (
                                            <div className="text-xs font-bold text-slate-500 mt-0.5">
                                                均分: <span className="text-slate-800">{exam.avgScore}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 2. Skill Matrix */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                   <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                      <h3 className="font-bold text-slate-700 flex items-center gap-2">
                         <Target size={20} className="text-purple-600"/> 班级技能掌握热力图
                      </h3>
                      {/* Integrated Course Filter */}
                      <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-lg">
                          {uniqueCourses.slice(0, 4).map(c => (
                              <button
                                key={c}
                                onClick={() => setSkillFilter(c)}
                                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                                    skillFilter === c ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                                }`}
                              >
                                {c}
                              </button>
                          ))}
                      </div>
                   </div>
                   
                   {/* Expanded Heatmap Grid (Assuming mocked data is enough, rendering more items) */}
                   <div className="flex flex-wrap gap-1.5 max-h-[200px] overflow-y-auto custom-scrollbar">
                      {LEARNING_SKILLS_FULL.map((skill, i) => ( 
                         <div 
                            key={i}
                            className={`h-8 w-12 rounded flex items-center justify-center text-[10px] font-bold text-white cursor-default shrink-0 ${getScoreColor(skill.score)} ${getSkillOpacity(skill.course)}`}
                            title={`${skill.name}: ${skill.score}%`}
                         >
                            {skill.code}
                         </div>
                      ))}
                   </div>
                   <div className="flex gap-4 text-xs font-medium text-slate-500 mt-4 justify-end">
                       <span className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-green-500"></div> 优秀</span>
                       <span className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-blue-400"></div> 良好</span>
                       <span className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-slate-300"></div> 待提升</span>
                   </div>
                </div>

                {/* Rankings (Top 5) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {/* Difficulty Ranking */}
                   <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                      <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-red-600">
                         <AlertCircle size={20}/> {t.learning.teacher.profile.difficulty_rank}
                      </h3>
                      <div className="space-y-3">
                         {CLASS_SKILL_RANKING.slice(0, 5).map((item, i) => (
                            <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-red-50/50 border border-red-100">
                               <div className="flex items-center gap-3">
                                  <span className="w-6 h-6 rounded bg-red-200 text-red-700 flex items-center justify-center font-bold text-xs">{i+1}</span>
                                  <span className="text-sm font-medium text-slate-700">{item.skill}</span>
                               </div>
                               <span className="font-bold text-red-600">{item.score}%</span>
                            </div>
                         ))}
                      </div>
                   </div>

                   {/* Student Ranking */}
                   <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                      <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-green-600">
                         <Award size={20}/> {t.learning.teacher.profile.student_rank}
                      </h3>
                      <div className="space-y-3">
                         {CLASS_STUDENT_RANKING.slice(0, 5).map((item, i) => (
                            <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-green-50/50 border border-green-100">
                               <div className="flex items-center gap-3">
                                  <span className={`w-6 h-6 rounded flex items-center justify-center font-bold text-xs ${i<3 ? 'bg-yellow-100 text-yellow-700' : 'bg-green-200 text-green-700'}`}>{i+1}</span>
                                  <span className="text-sm font-medium text-slate-700">{item.name}</span>
                               </div>
                               <span className="font-bold text-green-600">{item.score}</span>
                            </div>
                         ))}
                      </div>
                   </div>
                </div>

                {/* 2.3 Weakness Analysis with Visuals (Updated Layout) */}
                <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 shadow-sm relative">
                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                       <div>
                           <h3 className="font-bold text-orange-800 mb-4 flex items-center gap-2">
                              <Lightbulb size={20}/> {t.learning.teacher.profile.weakness_title}
                           </h3>
                           <p className="text-orange-900/80 leading-relaxed text-sm font-medium mb-6 bg-white/50 p-6 rounded-xl border border-orange-200/50 shadow-sm">
                              {t.learning.teacher.profile.weakness_desc}
                           </p>
                           <div className="flex flex-wrap gap-2">
                               <span className="text-xs font-bold text-orange-600 bg-orange-100 px-3 py-1.5 rounded-lg border border-orange-200">硬件接口</span>
                               <span className="text-xs font-bold text-orange-600 bg-orange-100 px-3 py-1.5 rounded-lg border border-orange-200">多线程</span>
                               <span className="text-xs font-bold text-orange-600 bg-orange-100 px-3 py-1.5 rounded-lg border border-orange-200">通信协议</span>
                           </div>
                       </div>
                       <div className="bg-white rounded-xl p-4 border border-orange-100 flex flex-col h-[350px]">
                           <div className="text-xs text-center font-bold text-slate-400 mb-2">班级能力 vs 全校平均</div>
                           <div className="flex-1">
                               <ResponsiveContainer width="100%" height="100%">
                                   <RadarChart cx="50%" cy="50%" outerRadius="70%" data={CLASS_WEAKNESS_RADAR}>
                                       <PolarGrid stroke="#fed7aa" />
                                       <PolarAngleAxis dataKey="subject" tick={{fontSize: 12, fill: '#9a3412', fontWeight: 'bold'}} />
                                       <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                       <Radar name="班级" dataKey="A" stroke="#f97316" strokeWidth={3} fill="#fb923c" fillOpacity={0.5} />
                                       <Tooltip />
                                   </RadarChart>
                               </ResponsiveContainer>
                           </div>
                       </div>
                   </div>
                </div>

                {/* 2.4 SDT Academic Warning Module (New) */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-red-200">
                    <h3 className="font-bold text-red-700 mb-6 flex items-center gap-2 text-xl">
                        <Shield size={24} className="text-red-600"/> 学情预警 (SDT模型分析)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {SDT_WARNING_STUDENTS.map((student) => (
                            <div key={student.id} className="border border-red-100 rounded-xl p-4 bg-red-50/30 hover:shadow-md transition-all flex flex-col">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200"/>
                                        <div>
                                            <div className="font-bold text-slate-800">{student.name}</div>
                                            <div className="text-xs text-slate-500">{student.id}</div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        {student.tags.map(tag => (
                                            <span key={tag} className="text-[10px] font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Mini SDT Radar (Increased Height) */}
                                <div className="h-56 mb-4 relative">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={[
                                            { subject: '自主性', A: student.sdt.autonomy, fullMark: 100 },
                                            { subject: '能力感', A: student.sdt.competence, fullMark: 100 },
                                            { subject: '关系性', A: student.sdt.relatedness, fullMark: 100 },
                                        ]}>
                                            <PolarGrid stroke="#e2e8f0" />
                                            <PolarAngleAxis dataKey="subject" tick={{fontSize: 11, fill: '#64748b', fontWeight: 'bold'}} />
                                            <Radar name="SDT" dataKey="A" stroke="#ef4444" strokeWidth={2} fill="#fca5a5" fillOpacity={0.5} />
                                            <Tooltip />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="mt-auto space-y-3">
                                    <div className="text-xs">
                                        <span className="font-bold text-slate-700 block mb-1">存在问题:</span>
                                        <ul className="list-disc pl-4 text-slate-600 space-y-0.5">
                                            {student.issues.map((issue, i) => <li key={i}>{issue}</li>)}
                                        </ul>
                                    </div>
                                    <div className="bg-white p-2 rounded border border-red-100 text-xs text-red-800 italic">
                                        <span className="font-bold">改进建议:</span> {student.advice}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
             </div>
           )}

           {/* 3. Class Comparison (Reused Charts) */}
           {teacherTab === 'compare' && (
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Score Distribution */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                   <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                      <BarChart2 size={20} className="text-blue-600"/> {t.learning.teacher.score_dist}
                   </h3>
                   <ClassPerformanceChart language={language} />
                </div>

                {/* Comparison Radar (Mocked reusing student radar for now) */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                   <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                      <Target size={20} className="text-purple-600"/> 班级能力维度对比
                   </h3>
                   <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                         <RadarChart cx="50%" cy="50%" outerRadius="70%" data={[
                            { subject: '理论基础', A: 85, B: 75, fullMark: 100 },
                            { subject: '实操能力', A: 78, B: 82, fullMark: 100 },
                            { subject: '创新思维', A: 88, B: 70, fullMark: 100 },
                            { subject: '团队协作', A: 90, B: 85, fullMark: 100 },
                            { subject: '解决问题', A: 82, B: 78, fullMark: 100 },
                         ]}>
                            <PolarGrid stroke="#e2e8f0" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                            <Radar name="1班" dataKey="A" stroke="#0d9488" strokeWidth={2} fill="#2dd4bf" fillOpacity={0.3} />
                            <Radar name="2班" dataKey="B" stroke="#f59e0b" strokeWidth={2} fill="#fcd34d" fillOpacity={0.3} />
                            <Tooltip />
                            <RechartsLegend />
                         </RadarChart>
                      </ResponsiveContainer>
                   </div>
                </div>

                {/* Trend Analysis */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 lg:col-span-2">
                   <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                      <TrendingUp size={20} className="text-green-600"/> 班级平均分趋势对比
                   </h3>
                   <TrendChart language={language} />
                </div>
             </div>
           )}
        </div>
      )}

    </div>
  );
};

export default LearningAnalysis;