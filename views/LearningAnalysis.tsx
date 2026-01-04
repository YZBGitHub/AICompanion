
import React, { useState } from 'react';
import { 
  GraduationCap, Brain, Users, Award, BookOpen, Star, 
  Activity, Zap, Target, TrendingUp, AlertCircle, User, 
  Smile, Heart, Briefcase, BarChart2, Shield, Search, Compass,
  Calendar, Clock, CheckCircle, ChevronRight, DollarSign,
  Lightbulb, MousePointerClick, Monitor, Cpu, RefreshCw, Sparkles, Rocket,
  Send, Bot, Layout, PieChart, Info, Settings,
  AlertTriangle, Route, BarChart,
  LineChart as LineChartIcon,
  Circle,
  LogIn,
  FileText,
  Timer,
  HardDrive,
  Wifi,
  Maximize,
  Play,
  Power,
  MessageSquare,
  Trophy,
  Layers,
  Map
} from 'lucide-react';
import { UserRole, Language } from '../types';
import { 
  TEXT, AI_PERSONAS, CLASS_STATS, LEARNING_COURSES, 
  LEARNING_EXAMS, LEARNING_SKILLS_FULL, WEAKNESS_DATA, JOB_RECOMMENDATIONS, 
  CLASS_SKILL_RANKING, CLASS_STUDENT_RANKING,
  CLASS_COURSE_STATS, CLASS_EXAM_LIST, CLASS_WEAKNESS_RADAR, SDT_WARNING_STUDENTS 
} from '../constants';
import { StudentRadarChart, ClassPerformanceChart, TrendChart, SkillRadarChart } from '../components/DashboardCharts';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, Legend as RechartsLegend, PieChart as RechartsPieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, AreaChart, Area, BarChart as RechartsBarChart, Bar as RechartsBar } from 'recharts';

// Mock data for selectors
const MOCK_SCHOOLS = ['深圳职业技术大学', '金华职业技术学院'];
const MOCK_CLASSES = ['21级物联网1班', '21级物联网2班', '21级嵌入式1班'];
const MOCK_STUDENTS = ['李明 (2021001001)', '张伟 (2021001002)', '王芳 (2021001003)'];

// Mock Trend Data for Behavior Mini Charts
const MOCK_BEHAVIOR_TRENDS = {
  platform: [
    { day: '1', val: 30 }, { day: '2', val: 45 }, { day: '3', val: 35 },
    { day: '4', val: 60 }, { day: '5', val: 55 }, { day: '6', val: 80 }, { day: '7', val: 75 }
  ],
  software: [
    { day: '1', val: 20 }, { day: '2', val: 25 }, { day: '3', val: 50 },
    { day: '4', val: 40 }, { day: '5', val: 70 }, { day: '6', val: 65 }, { day: '7', val: 90 }
  ],
  hardware: [
    { day: '1', val: 10 }, { day: '2', val: 15 }, { day: '3', val: 20 },
    { day: '4', val: 45 }, { day: '5', val: 30 }, { day: '6', val: 50 }, { day: '7', val: 60 }
  ]
};

interface LearningAnalysisProps {
  language: Language;
  currentRole?: UserRole;
}

const LearningAnalysis: React.FC<LearningAnalysisProps> = ({ language, currentRole = UserRole.STUDENT }) => {
  const t = TEXT[language];
  const [viewMode, setViewMode] = useState<'student' | 'teacher'>(currentRole === UserRole.TEACHER ? 'teacher' : 'student');
  const [teacherTab, setTeacherTab] = useState<'assistant' | 'profile'>('assistant');
  const [selectedPersonaId, setSelectedPersonaId] = useState('geek'); 
  const [skillFilter, setSkillFilter] = useState('全部');
  const [isRegenerating, setIsRegenerating] = useState(false);
  
  // Selection State for Teacher/Admin
  const [selectedSchool, setSelectedSchool] = useState(MOCK_SCHOOLS[0]);
  const [selectedClass, setSelectedClass] = useState(MOCK_CLASSES[0]);
  const [selectedStudent, setSelectedStudent] = useState(MOCK_STUDENTS[0]);

  // NEW: Course Filter for Class Profile
  const [selectedProfileCourse, setSelectedProfileCourse] = useState('《智慧园区》');

  // Teacher AI Assistant State
  const [aiChatInput, setAiChatInput] = useState('');
  const [aiChatHistory, setAiChatHistory] = useState<{sender: 'user'|'ai', text: string}[]>([
    { sender: 'ai', text: t.learning.teacher.ai.welcome },
  ]);
  const [selectedAiClasses, setSelectedAiClasses] = useState<string[]>(MOCK_CLASSES.slice(0, 1));
  const [selectedAiDataTypes, setSelectedAiDataTypes] = useState<string[]>(['技能点数据', '全过程数据-学习行为']);

  const currentPersona = AI_PERSONAS.find(p => p.id === selectedPersonaId) || AI_PERSONAS[0];
  const canSelectStudent = currentRole === UserRole.TEACHER || currentRole === UserRole.ADMIN;
  const canSelectSchool = currentRole === UserRole.ADMIN;
  const uniqueCourses = ['全部', ...Array.from(new Set(LEARNING_SKILLS_FULL.map(s => s.course)))];
  const teacherCourses = Array.from(new Set(LEARNING_SKILLS_FULL.map(s => s.course)));

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'bg-green-500'; // Excellent
    if (score >= 60) return 'bg-blue-400';  // Good
    return 'bg-slate-300'; // Needs Improvement
  };

  const getSkillOpacity = (skillCourse: string, currentFilter: string) => {
     if (currentFilter === '全部') return 'opacity-100';
     return currentFilter === skillCourse ? 'opacity-100 scale-105 shadow-md' : 'opacity-20 grayscale scale-95';
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

  const handleClearHistory = () => {
    setAiChatHistory([{ sender: 'ai', text: t.learning.teacher.ai.welcome }]);
  };

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
           {/* 1. Basic Info & Filter */}
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

           {/* 2. Academic Overview */}
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

           {/* 3. Learning Engagement Analysis */}
           <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

              <div className="relative z-10">
                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                       <h3 className="text-2xl font-black flex items-center gap-3 text-white">
                          <Activity className="text-teal-400" size={28}/> {t.learning.engagement.title}
                       </h3>
                       <p className="text-slate-400 text-sm mt-1">{t.learning.engagement.summary}</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center flex items-center gap-4 px-6">
                       <div className="w-12 h-12 bg-teal-500/20 rounded-full flex items-center justify-center text-teal-400 shadow-inner">
                          <Trophy size={28} />
                       </div>
                       <div className="text-left">
                          <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Engagement Level</div>
                          <div className="text-xl font-black text-white">高水平活跃</div>
                       </div>
                    </div>
                 </div>

                 <div className="mb-10">
                    <div className="flex items-center gap-3 mb-6">
                       <div className="h-px bg-white/10 flex-1"></div>
                       <span className="text-xs font-black text-slate-500 uppercase tracking-[0.3em]">{t.learning.engagement.behavior_data}</span>
                       <div className="h-px bg-white/10 flex-1"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-colors group flex flex-col">
                           <div className="flex items-center gap-3 mb-6">
                              <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl group-hover:scale-110 transition-transform shadow-inner border border-emerald-500/20"><Layout size={20}/></div>
                              <h4 className="font-bold text-emerald-100">{t.learning.engagement.platform}</h4>
                           </div>
                           <div className="grid grid-cols-2 gap-y-4 gap-x-4 mb-6">
                              {[
                                 { icon: <LogIn size={12}/>, label: t.learning.engagement.metrics.logins, val: '45' },
                                 { icon: <Clock size={12}/>, label: t.learning.engagement.metrics.online_time, val: '120h' },
                                 { icon: <MessageSquare size={12}/>, label: t.learning.engagement.metrics.ai_qa, val: '350' },
                                 { icon: <CheckCircle size={12}/>, label: t.learning.engagement.metrics.task_done, val: '28' }
                              ].map((m, i) => (
                                 <div key={i}>
                                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold mb-1 uppercase tracking-tight">
                                       <span className="text-emerald-500">{m.icon}</span> {m.label}
                                    </div>
                                    <div className="text-xl font-black text-white">{m.val}</div>
                                 </div>
                              ))}
                           </div>
                           <div className="h-20 mt-auto">
                              <ResponsiveContainer width="100%" height="100%">
                                 <AreaChart data={MOCK_BEHAVIOR_TRENDS.platform}>
                                    <defs>
                                       <linearGradient id="colorPlat" x1="0" y1="0" x2="0" y2="1">
                                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                       </linearGradient>
                                    </defs>
                                    <Area type="monotone" dataKey="val" stroke="#10b981" fillOpacity={1} fill="url(#colorPlat)" strokeWidth={2} />
                                 </AreaChart>
                              </ResponsiveContainer>
                           </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-colors group flex flex-col">
                           <div className="flex items-center gap-3 mb-6">
                              <div className="p-2 bg-blue-500/20 text-blue-400 rounded-xl group-hover:scale-110 transition-transform shadow-inner border border-blue-500/20"><Monitor size={20}/></div>
                              <h4 className="font-bold text-blue-100">{t.learning.engagement.software}</h4>
                           </div>
                           <div className="space-y-3 mb-6">
                              {[
                                 { icon: <Maximize size={12}/>, label: t.learning.engagement.metrics.env_open, val: '28次' },
                                 { icon: <Timer size={12}/>, label: t.learning.engagement.metrics.runtime, val: '45h' },
                                 { icon: <Bot size={12}/>, label: t.learning.engagement.metrics.agent_qa, val: '120次' }
                              ].map((m, i) => (
                                 <div key={i} className="flex items-center justify-between border-b border-white/5 pb-2">
                                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                                       <span className="text-blue-500">{m.icon}</span> {m.label}
                                    </div>
                                    <div className="text-sm font-black text-white">{m.val}</div>
                                 </div>
                              ))}
                           </div>
                           <div className="h-20 mt-auto">
                              <ResponsiveContainer width="100%" height="100%">
                                 <AreaChart data={MOCK_BEHAVIOR_TRENDS.software}>
                                    <defs>
                                       <linearGradient id="colorSoft" x1="0" y1="0" x2="0" y2="1">
                                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                       </linearGradient>
                                    </defs>
                                    <Area type="monotone" dataKey="val" stroke="#3b82f6" fillOpacity={1} fill="url(#colorSoft)" strokeWidth={2} />
                                 </AreaChart>
                              </ResponsiveContainer>
                           </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-colors group flex flex-col">
                           <div className="flex items-center gap-3 mb-6">
                              <div className="p-2 bg-purple-500/20 text-purple-400 rounded-xl group-hover:scale-110 transition-transform shadow-inner border border-purple-500/20"><HardDrive size={20}/></div>
                              <h4 className="font-bold text-purple-100">{t.learning.engagement.hardware}</h4>
                           </div>
                           <div className="space-y-3 mb-6">
                              {[
                                 { icon: <LogIn size={12}/>, label: t.learning.engagement.metrics.hard_login, val: '15次' },
                                 { icon: <Wifi size={12}/>, label: t.learning.engagement.metrics.hard_online, val: '12h' },
                                 { icon: <MessageSquare size={12}/>, label: t.learning.engagement.metrics.hard_qa, val: '45次' }
                              ].map((m, i) => (
                                 <div key={i} className="flex items-center justify-between border-b border-white/5 pb-2">
                                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                                       <span className="text-purple-500">{m.icon}</span> {m.label}
                                    </div>
                                    <div className="text-sm font-black text-white">{m.val}</div>
                                 </div>
                              ))}
                           </div>
                           <div className="h-20 mt-auto">
                              <ResponsiveContainer width="100%" height="100%">
                                 <AreaChart data={MOCK_BEHAVIOR_TRENDS.hardware}>
                                    <defs>
                                       <linearGradient id="colorHard" x1="0" y1="0" x2="0" y2="1">
                                          <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                                          <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                                       </linearGradient>
                                    </defs>
                                    <Area type="monotone" dataKey="val" stroke="#a855f7" fillOpacity={1} fill="url(#colorHard)" strokeWidth={2} />
                                 </AreaChart>
                              </ResponsiveContainer>
                           </div>
                        </div>
                    </div>
                 </div>

                 <div>
                    <div className="flex items-center gap-3 mb-6">
                       <div className="h-px bg-white/10 flex-1"></div>
                       <span className="text-xs font-black text-slate-500 uppercase tracking-[0.3em]">{t.learning.engagement.op_data}</span>
                       <div className="h-px bg-white/10 flex-1"></div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-br from-teal-500/20 to-emerald-500/20 border border-teal-500/30 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8">
                           <div className="w-20 h-20 bg-teal-500/20 rounded-2xl flex items-center justify-center text-teal-400 shadow-xl border border-teal-500/20 shrink-0">
                              <Play size={40} />
                           </div>
                           <div className="flex-1 text-center md:text-left">
                              <h4 className="text-xl font-bold text-white mb-2">{t.learning.engagement.op_hard}</h4>
                              <div className="grid grid-cols-2 gap-4">
                                 <div>
                                    <div className="text-[10px] text-slate-400 font-bold uppercase mb-1 flex items-center gap-1">
                                       <Clock size={10} className="text-teal-500"/> {t.learning.engagement.metrics.op_time}
                                    </div>
                                    <div className="text-2xl font-black text-teal-400">12h 45m</div>
                                 </div>
                                 <div>
                                    <div className="text-[10px] text-slate-400 font-bold uppercase mb-1 flex items-center gap-1">
                                       <Power size={10} className="text-teal-500"/> {t.learning.engagement.metrics.dev_online}
                                    </div>
                                    <div className="text-2xl font-black text-teal-400">150h+</div>
                                 </div>
                              </div>
                           </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex items-center gap-6">
                           <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 border border-blue-500/20">
                              <MousePointerClick size={32} />
                           </div>
                           <div className="flex-1">
                              <h4 className="font-bold text-white mb-1">{t.learning.engagement.op_soft}</h4>
                              <p className="text-xs text-slate-500">记录学生在 2D/3D 虚拟仿真、ThingsBoard 及 Node-Red 环境中的深度实操时长。</p>
                              <div className="flex gap-6 mt-3">
                                 <div>
                                    <div className="text-[10px] text-slate-400 font-bold uppercase mb-1 flex items-center gap-1">
                                       <Clock size={10} className="text-blue-500"/> 软件实验环境操作时长
                                    </div>
                                    <div className="text-2xl font-black text-white">32h 15m</div>
                                 </div>
                              </div>
                           </div>
                        </div>
                    </div>
                 </div>
              </div>
           </div>

           {/* 4. Skill Analysis (Dense Chip View with Tooltip) */}
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
                       className={`group relative h-6 min-w-[3rem] px-1 rounded flex items-center justify-center text-[10px] font-bold text-white cursor-help transition-all duration-300 ${getScoreColor(skill.score)} ${getSkillOpacity(skill.course, skillFilter)}`}
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

           {/* 5. Weakness Analysis (Unified, Full Width) */}
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

           {/* 6. Job Recommendations - RESTORED */}
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

           {/* 7. AI Comprehensive Analysis - RESTORED */}
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

                    <div className="lg:w-1/3 flex flex-col">
                       <div className="bg-gradient-to-r from-teal-500 to-emerald-600 p-8 rounded-2xl shadow-lg text-white flex-1 flex flex-col justify-center relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-4 opacity-10">
                             <Rocket size={120} />
                          </div>
                          <div className="relative z-10">
                             <div className="text-teal-100 text-sm font-bold uppercase tracking-wider mb-2">最佳岗位匹配</div>
                             <div className="text-3xl font-black mb-4">{JOB_RECOMMENDATIONS[0].title}</div>
                             <div className="h-px bg-white/20 w-full mb-6"></div>
                             <p className="text-base font-medium italic opacity-90 leading-relaxed mb-6">
                                "你的代码拥有连接万物的力量。基于全过程学习行为分析，展现出极强的内驱力。保持这份热爱，未来的智慧城市将由你亲手构建！"
                             </p>
                             <div className="flex items-center gap-2 text-teal-200 text-sm font-bold">
                                <TrendingUp size={16}/> 建议：在小组协作中增加互动以提升职业软技能。
                             </div>
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
               </div>

               <div className="flex items-center gap-4 bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm">
                   <div className="flex items-center gap-2">
                      <div className="px-2 text-slate-500 text-[10px] font-black uppercase tracking-widest border-r border-slate-100">当前班级</div>
                      <select 
                          value={selectedClass} 
                          onChange={e => setSelectedClass(e.target.value)}
                          className="border-none bg-slate-50 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700 focus:ring-0 outline-none cursor-pointer hover:bg-slate-100"
                      >
                          {MOCK_CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                   </div>

                   {/* NEW: Course Filter for Teacher Profile */}
                   {teacherTab === 'profile' && (
                     <div className="flex items-center gap-2 border-l border-slate-100 pl-4">
                        <div className="px-2 text-slate-500 text-[10px] font-black uppercase tracking-widest border-r border-slate-100">分析课程</div>
                        <select 
                            value={selectedProfileCourse} 
                            onChange={e => setSelectedProfileCourse(e.target.value)}
                            className="border-none bg-teal-50 rounded-lg px-3 py-1.5 text-xs font-bold text-teal-700 focus:ring-0 outline-none cursor-pointer hover:bg-teal-100 transition-colors"
                        >
                            {teacherCourses.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                     </div>
                   )}
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

                   <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex-1 overflow-y-auto custom-scrollbar">
                      <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                         <Settings size={18} className="text-slate-400"/> 对话数据源配置
                      </h4>
                      <div className="space-y-6">
                         <div>
                            <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">分析班级 (多选)</label>
                            <div className="space-y-1 max-h-[150px] overflow-y-auto pr-2">
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
                            <div className="space-y-1 max-h-[200px] overflow-y-auto pr-2">
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
                      <button 
                        onClick={handleClearHistory}
                        className="text-xs text-slate-400 hover:text-red-500 flex items-center gap-1 transition-colors"
                      >
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

           {/* 2. Class Profile (Modified based on User Requirements) */}
           {teacherTab === 'profile' && (
             <div className="space-y-6">
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Point 1: Interval Distribution - Donut Chart */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600"><PieChart size={20}/></div>
                                <h3 className="font-bold text-slate-800">成绩区间分布 (饼图)</h3>
                            </div>
                            <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-2 py-1 rounded">课程: {selectedProfileCourse}</span>
                        </div>
                        <div className="flex-1 h-[280px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <RechartsPieChart>
                                    <Pie
                                        data={CLASS_COURSE_STATS.distribution}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={85}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {CLASS_COURSE_STATS.distribution.map((entry: any, index: number) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                        contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} 
                                    />
                                    <RechartsLegend verticalAlign="middle" align="right" layout="vertical" iconType="circle" />
                                </RechartsPieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Point 2: Class Score Overview - Bar Chart with Course Context */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600"><TrendingUp size={20}/></div>
                                <h3 className="font-bold text-slate-800">班级全员成绩概影 (高→低)</h3>
                            </div>
                            <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-2 py-1 rounded">课程: {selectedProfileCourse}</span>
                        </div>
                        <div className="h-[250px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <RechartsBarChart data={CLASS_COURSE_STATS.scoreRanking} margin={{top: 10, right: 10, left: 0, bottom: 0}}>
                                    <XAxis dataKey="name" hide />
                                    <YAxis domain={[0, 100]} hide />
                                    <Tooltip 
                                        cursor={{fill: '#f1f5f9'}}
                                        labelStyle={{display: 'none'}}
                                        contentStyle={{borderRadius: '8px', fontSize: '12px'}}
                                    />
                                    <RechartsBar dataKey="score">
                                        {CLASS_COURSE_STATS.scoreRanking.map((entry: any, index: number) => (
                                            <Cell 
                                                key={`cell-${index}`} 
                                                fill={entry.score >= 90 ? '#10b981' : entry.score >= 80 ? '#3b82f6' : entry.score >= 60 ? '#f59e0b' : '#ef4444'} 
                                            />
                                        ))}
                                    </RechartsBar>
                                </RechartsBarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-4 flex justify-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-emerald-500"></div> 90+</span>
                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-blue-500"></div> 80-90</span>
                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-orange-500"></div> 60-80</span>
                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-red-500"></div> 60-</span>
                        </div>
                    </div>
                </div>

                {/* Point 4: Class Skill Heatmap Module (Now showing up to 100 points) */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-100 rounded-lg text-purple-600"><Map size={20}/></div>
                            <div>
                                <h3 className="font-bold text-slate-800">班级技能掌握热力图</h3>
                                <p className="text-xs text-slate-400 mt-0.5">反映全班学生在各知识点的平均掌握水平 (当前课程: {LEARNING_SKILLS_FULL.filter(s => s.course === selectedProfileCourse).length}个技能点)</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                             {/* Category indicators */}
                             <div className="flex gap-3 text-[10px] font-black text-slate-400 uppercase tracking-wider items-center bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-slate-300"></div> 待提升</span>
                                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-blue-400"></div> 良好</span>
                                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-green-500"></div> 优秀</span>
                             </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {LEARNING_SKILLS_FULL.filter(s => s.course === selectedProfileCourse).map((skill, i) => (
                            <div 
                                key={i}
                                className={`group relative h-8 min-w-[3.5rem] px-2 rounded-lg flex items-center justify-center text-[10px] font-black text-white cursor-help transition-all duration-300 hover:scale-110 hover:z-10 shadow-sm ${getScoreColor(skill.score)}`}
                            >
                                {skill.code}
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 w-max max-w-[220px] bg-slate-900 text-white text-xs rounded-xl p-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-2xl border border-white/10">
                                    <div className="font-black mb-1">{skill.name}</div>
                                    <div className="text-[10px] text-slate-400 mb-2">{skill.course}</div>
                                    <div className="flex justify-between items-center bg-white/5 rounded-lg p-2">
                                        <span className="text-slate-400">全班均值:</span>
                                        <span className={`font-black text-sm ${skill.score >= 85 ? 'text-green-400' : skill.score >= 60 ? 'text-blue-400' : 'text-slate-300'}`}>
                                            {skill.score}%
                                        </span>
                                    </div>
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-slate-900"></div>
                                </div>
                            </div>
                        ))}
                        {/* If no skills found for this course in mock */}
                        {LEARNING_SKILLS_FULL.filter(s => s.course === selectedProfileCourse).length === 0 && (
                            <div className="w-full py-20 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                                <Search size={40} className="mx-auto text-slate-300 mb-4" />
                                <p className="text-slate-400 font-bold">当前课程暂无已录入的班级技能数据</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Engagement Analysis */}
                <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

                    <div className="relative z-10">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                            <div>
                                <h3 className="text-2xl font-black flex items-center gap-3 text-white">
                                    <Activity className="text-teal-400" size={28}/> 班级整体学习参与度分析
                                </h3>
                                <p className="text-slate-400 text-sm mt-1">基于全班 34 名学生的加权数据聚合，展示班级整体活跃度趋势</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center flex items-center gap-4 px-6">
                                <div className="w-12 h-12 bg-teal-500/20 rounded-full flex items-center justify-center text-teal-400 shadow-inner">
                                    <Users size={24} />
                                </div>
                                <div className="text-left">
                                    <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Average Engagement</div>
                                    <div className="text-xl font-black text-white">中高水平</div>
                                </div>
                            </div>
                        </div>

                        {/* Behavior Averages Section */}
                        <div className="mb-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-px bg-white/10 flex-1"></div>
                                <span className="text-xs font-black text-slate-500 uppercase tracking-[0.3em]">班级平均行为数据</span>
                                <div className="h-px bg-white/10 flex-1"></div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Aggregated Platform Card */}
                                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-colors group flex flex-col">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl group-hover:scale-110 transition-transform shadow-inner border border-emerald-500/20"><Layout size={20}/></div>
                                        <h4 className="font-bold text-emerald-100">平台行为 (均值)</h4>
                                    </div>
                                    <div className="grid grid-cols-2 gap-y-4 gap-x-4 mb-6">
                                        {[
                                            { icon: <LogIn size={12}/>, label: '人均登录', val: CLASS_COURSE_STATS.engagement.platform.avgLogins },
                                            { icon: <Clock size={12}/>, label: '人均在线', val: CLASS_COURSE_STATS.engagement.platform.avgOnline },
                                            { icon: <MessageSquare size={12}/>, label: '累计AI问答', val: CLASS_COURSE_STATS.engagement.platform.totalAiQa },
                                            { icon: <CheckCircle size={12}/>, label: '人均任务完成', val: CLASS_COURSE_STATS.engagement.platform.avgTaskDone }
                                        ].map((m, i) => (
                                            <div key={i}>
                                                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold mb-1 uppercase tracking-tight">
                                                    <span className="text-emerald-500">{m.icon}</span> {m.label}
                                                </div>
                                                <div className="text-xl font-black text-white">{m.val}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="h-20 mt-auto">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={MOCK_BEHAVIOR_TRENDS.platform}>
                                                <defs>
                                                    <linearGradient id="colorPlatClass" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                                    </linearGradient>
                                                </defs>
                                                <Area type="monotone" dataKey="val" stroke="#10b981" fillOpacity={1} fill="url(#colorPlatClass)" strokeWidth={2} />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                {/* Aggregated Software Card */}
                                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-colors group flex flex-col">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-blue-500/20 text-blue-400 rounded-xl group-hover:scale-110 transition-transform shadow-inner border border-blue-500/20"><Monitor size={20}/></div>
                                        <h4 className="font-bold text-blue-100">软件实验 (人均)</h4>
                                    </div>
                                    <div className="space-y-3 mb-6">
                                        {[
                                            { icon: <Maximize size={12}/>, label: '环境打开次数', val: `${CLASS_COURSE_STATS.engagement.software.avgEnvOpen}次` },
                                            { icon: <Timer size={12}/>, label: '运行总时长', val: CLASS_COURSE_STATS.engagement.software.avgRuntime },
                                            { icon: <Bot size={12}/>, label: 'AI助理提问数', val: `${CLASS_COURSE_STATS.engagement.software.avgAgentQa}次` }
                                        ].map((m, i) => (
                                            <div key={i} className="flex items-center justify-between border-b border-white/5 pb-2">
                                                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                                                    <span className="text-blue-500">{m.icon}</span> {m.label}
                                                </div>
                                                <div className="text-sm font-black text-white">{m.val}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="h-20 mt-auto">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={MOCK_BEHAVIOR_TRENDS.software}>
                                                <defs>
                                                    <linearGradient id="colorSoftClass" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                                    </linearGradient>
                                                </defs>
                                                <Area type="monotone" dataKey="val" stroke="#3b82f6" fillOpacity={1} fill="url(#colorSoftClass)" strokeWidth={2} />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                {/* Aggregated Hardware Card */}
                                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-colors group flex flex-col">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-purple-500/20 text-purple-400 rounded-xl group-hover:scale-110 transition-transform shadow-inner border border-purple-500/20"><HardDrive size={20}/></div>
                                        <h4 className="font-bold text-purple-100">硬件实操 (人均)</h4>
                                    </div>
                                    <div className="space-y-3 mb-6">
                                        {[
                                            { icon: <LogIn size={12}/>, label: '智能体登录', val: `${CLASS_COURSE_STATS.engagement.hardware.avgHardLogin}次` },
                                            { icon: <Wifi size={12}/>, label: '设备在线时长', val: CLASS_COURSE_STATS.engagement.hardware.avgHardOnline },
                                            { icon: <MessageSquare size={12}/>, label: '硬件AI对话数', val: `${CLASS_COURSE_STATS.engagement.hardware.avgHardQa}次` }
                                        ].map((m, i) => (
                                            <div key={i} className="flex items-center justify-between border-b border-white/5 pb-2">
                                                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                                                    <span className="text-purple-500">{m.icon}</span> {m.label}
                                                </div>
                                                <div className="text-sm font-black text-white">{m.val}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="h-20 mt-auto">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={MOCK_BEHAVIOR_TRENDS.hardware}>
                                                <defs>
                                                    <linearGradient id="colorHardClass" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                                                        <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                                                    </linearGradient>
                                                </defs>
                                                <Area type="monotone" dataKey="val" stroke="#a855f7" fillOpacity={1} fill="url(#colorHardClass)" strokeWidth={2} />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Aggregated Operation Data */}
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-px bg-white/10 flex-1"></div>
                                <span className="text-xs font-black text-slate-500 uppercase tracking-[0.3em]">班级过程操作聚合</span>
                                <div className="h-px bg-white/10 flex-1"></div>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="bg-gradient-to-br from-teal-500/20 to-emerald-500/20 border border-teal-500/30 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8">
                                    <div className="w-20 h-20 bg-teal-500/20 rounded-2xl flex items-center justify-center text-teal-400 shadow-xl border border-teal-500/20 shrink-0">
                                        <Play size={40} />
                                    </div>
                                    <div className="flex-1 text-center md:text-left">
                                        <h4 className="text-xl font-bold text-white mb-2">全班硬件实操均值</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <div className="text-[10px] text-slate-400 font-bold uppercase mb-1 flex items-center gap-1">
                                                    <Clock size={10} className="text-teal-500"/> 人均操作时长
                                                </div>
                                                <div className="text-2xl font-black text-teal-400">{CLASS_COURSE_STATS.engagement.ops.avgHardOpTime}</div>
                                            </div>
                                            <div>
                                                <div className="text-[10px] text-slate-400 font-bold uppercase mb-1 flex items-center gap-1">
                                                    <Power size={10} className="text-teal-500"/> 设备总运行量
                                                </div>
                                                <div className="text-2xl font-black text-teal-400">{CLASS_COURSE_STATS.engagement.ops.avgDevOnline}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex items-center gap-6">
                                    <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 border border-blue-500/20">
                                        <MousePointerClick size={32} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-white mb-1">软件实操总时长</h4>
                                        <p className="text-xs text-slate-500">涵盖 2D/3D 虚拟仿真、ThingsBoard 及 Node-Red 环境中的总练习时长。</p>
                                        <div className="flex gap-6 mt-3">
                                            <div>
                                                <div className="text-[10px] text-slate-400 font-bold uppercase mb-1 flex items-center gap-1">
                                                    <Clock size={10} className="text-blue-500"/> 累计实操时长
                                                </div>
                                                <div className="text-2xl font-black text-white">{CLASS_COURSE_STATS.engagement.ops.totalSoftTime} 小时</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
           )}
        </div>
      )}

    </div>
  );
};

export default LearningAnalysis;
