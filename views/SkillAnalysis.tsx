
import React, { useState } from 'react';
import { Monitor, X, User, GraduationCap, BookOpen, Users, Map, Info, ArrowUp, Award, Target, Share, GitGraph, GitMerge, Maximize2, Minimize2, Brain, Flame, Building2, Cpu, Code } from 'lucide-react';
import { UserRole, Language } from '../types';
import { TEXT, getMockSkillData } from '../constants';
import SkillGraph from '../components/SkillGraph';
import { SkillRadarChart } from '../components/DashboardCharts';

interface SkillAnalysisProps {
  language: Language;
  currentRole: UserRole;
}

const SkillAnalysis: React.FC<SkillAnalysisProps> = ({ language, currentRole }) => {
  const t = TEXT[language];
  const [selectedClass, setSelectedClass] = useState('21级物联网1班');
  const [selectedStudent, setSelectedStudent] = useState('李明 (2021001001)');
  const [showFormulaModal, setShowFormulaModal] = useState(false);
  const [rankingTab, setRankingTab] = useState<'school'|'class'>('school');
  const [graphMode, setGraphMode] = useState<'network'|'tree'>('network');
  const [isGraphFullscreen, setIsGraphFullscreen] = useState(false);
  const [selectedJobRole, setSelectedJobRole] = useState('物联网安装调试员');
  const [selectedCourseId, setSelectedCourseId] = useState(1);

  const classes = ['21级物联网1班', '21级物联网2班', '21级嵌入式1班'];
  const students = ['李明 (2021001001)', '张伟 (2021001002)', '王芳 (2021001003)'];
  const jobRoles = ['物联网安装调试员', '物联网系统开发工程师', '嵌入式系统设计师'];

  // Mock Data
  const courses = [
    { id: 1, name: '《智慧园区》', cover: 'bg-teal-100', start: '2023-09-01', end: '-', status: 'in_progress', mastery: 85, icon: <Building2 className="text-teal-600" size={24}/> },
    { id: 2, name: '《嵌入式开发》', cover: 'bg-orange-100', start: '2023-09-15', end: '-', status: 'in_progress', mastery: 40, icon: <Cpu className="text-orange-600" size={24}/> },
    { id: 3, name: '《深度学习》', cover: 'bg-purple-100', start: '-', end: '-', status: 'not_started', mastery: 0, icon: <Brain className="text-purple-600" size={24}/> },
    { id: 4, name: '《Python基础》', cover: 'bg-blue-100', start: '2023-08-01', end: '2023-08-30', status: 'completed', mastery: 92, icon: <Code className="text-blue-600" size={24}/> },
  ];

  const aiRecCourses = [
     { title: '物联网安全基础', major: '网络安全', heat: 98, color: 'bg-blue-500', icon: 'Shield' },
     { title: '高级Python编程', major: '软件工程', heat: 95, color: 'bg-yellow-500', icon: 'Code' },
     { title: '传感器原理与应用', major: '电子信息', heat: 92, color: 'bg-green-500', icon: 'Activity' },
     { title: '边缘计算实战', major: '云计算', heat: 89, color: 'bg-purple-500', icon: 'Server' },
     { title: '工业互联网架构', major: '智能制造', heat: 88, color: 'bg-orange-500', icon: 'Network' }
  ];
  
  const roleRadarData = {
     '物联网安装调试员': [
        { subject: '物联网理论', A: 85, fullMark: 100 },
        { subject: '设备安装', A: 65, fullMark: 100 },
        { subject: '设备调试', A: 90, fullMark: 100 },
        { subject: '网络配置', A: 75, fullMark: 100 },
        { subject: '数据分析', A: 60, fullMark: 100 },
        { subject: '故障排查', A: 80, fullMark: 100 },
     ],
     '物联网系统开发工程师': [
        { subject: 'Python编程', A: 95, fullMark: 100 },
        { subject: '后端开发', A: 85, fullMark: 100 },
        { subject: '数据库', A: 80, fullMark: 100 },
        { subject: 'API设计', A: 75, fullMark: 100 },
        { subject: '系统架构', A: 70, fullMark: 100 },
        { subject: '测试', A: 85, fullMark: 100 },
     ],
     '嵌入式系统设计师': [
        { subject: '电路设计', A: 65, fullMark: 100 },
        { subject: 'C语言', A: 90, fullMark: 100 },
        { subject: 'RTOS', A: 75, fullMark: 100 },
        { subject: '驱动开发', A: 70, fullMark: 100 },
        { subject: '硬件调试', A: 80, fullMark: 100 },
        { subject: '低功耗设计', A: 60, fullMark: 100 },
     ]
  };
  
  const generateSkillPoints = (prefix: string, count: number, startIdx: number) => {
     return Array.from({ length: count }, (_, i) => ({
       id: `${prefix}${(i+1).toString().padStart(3, '0')}`,
       name: `${prefix}类技能点-${i+1}`, 
       val: Math.floor(Math.random() * 60) + 40 
     }));
  };

  const skillCategories = [
    { code: 'A', name: '理论基础', points: generateSkillPoints('A', 25, 0) },
    { code: 'B', name: '设备安装', points: generateSkillPoints('B', 30, 0) },
    { code: 'C', name: '系统调试', points: generateSkillPoints('C', 30, 0) },
    { code: 'D', name: '故障排查', points: generateSkillPoints('D', 20, 0) },
  ];

  const getHeatColor = (val: number) => {
    if (val === 0) return 'bg-slate-200';
    if (val < 60) return 'bg-slate-300';
    if (val < 80) return 'bg-red-400';
    return 'bg-green-500';
  };

  const skillGraphData = getMockSkillData(language);

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 animate-fade-in flex flex-col gap-6 min-h-screen relative">
       {/* Formula Modal */}
       {showFormulaModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in" onClick={() => setShowFormulaModal(false)}>
             <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100" onClick={e => e.stopPropagation()}>
                <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-5 text-white flex justify-between items-center">
                   <h3 className="text-lg font-bold flex items-center gap-2">
                      <Monitor size={20} /> {t.skill.formula.title}
                   </h3>
                   <button onClick={() => setShowFormulaModal(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors"><X size={20}/></button>
                </div>
                <div className="p-6">
                   <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 mb-6">
                      <div className="text-xs font-bold text-orange-700 uppercase mb-1">{t.skill.formula.subtitle}</div>
                      <div className="text-orange-900 font-mono text-sm leading-relaxed">
                         {t.skill.formula.example}
                      </div>
                   </div>
                   <div className="space-y-4">
                      <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                         <span className="font-bold text-slate-700">{t.skill.formula.item1}</span>
                         <span className="text-sm text-slate-500">{t.skill.formula.item1_ex}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                         <span className="font-bold text-slate-700">{t.skill.formula.item2}</span>
                         <span className="text-sm text-slate-500">{t.skill.formula.item2_ex}</span>
                      </div>
                      <div className="flex justify-between items-center">
                         <span className="font-bold text-slate-700">{t.skill.formula.item3}</span>
                         <span className="text-sm text-slate-500">{t.skill.formula.item3_ex}</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       )}

       {/* Header */}
       <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center border-2 border-teal-100">
               <User size={32} className="text-teal-600"/>
            </div>
            <div>
               {(currentRole === UserRole.TEACHER || currentRole === UserRole.ADMIN) ? (
                  <div className="flex flex-col gap-1">
                     <h2 className="text-lg font-bold text-slate-800">技能分析看板</h2>
                     <div className="flex gap-2">
                        <select 
                           className="text-sm border border-slate-300 rounded px-2 py-1 bg-slate-50"
                           value={selectedClass}
                           onChange={e => setSelectedClass(e.target.value)}
                        >
                           {classes.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <select 
                           className="text-sm border border-slate-300 rounded px-2 py-1 bg-slate-50"
                           value={selectedStudent}
                           onChange={e => setSelectedStudent(e.target.value)}
                        >
                           {students.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                     </div>
                  </div>
               ) : (
                  <div>
                     <h2 className="text-2xl font-bold text-slate-800">李明 <span className="text-sm font-normal text-slate-500 ml-2">(2021001001)</span></h2>
                     <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                        <span className="flex items-center gap-1"><GraduationCap size={14}/> 深圳职业技术大学</span>
                        <span className="flex items-center gap-1"><BookOpen size={14}/> 物联网应用技术</span>
                        <span className="flex items-center gap-1"><Users size={14}/> 21级物联网1班</span>
                     </div>
                  </div>
               )}
            </div>
          </div>
          
          {(currentRole !== UserRole.TEACHER && currentRole !== UserRole.ADMIN) && (
            <div className="text-right hidden sm:block">
              <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">综合绩点 (GPA)</div>
              <div className="text-3xl font-bold text-teal-600">3.8</div>
            </div>
          )}
       </div>

       {/* Course Tabs */}
       <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
           <div className="flex items-center gap-2 mb-3">
              <BookOpen size={18} className="text-teal-600"/>
              <span className="font-bold text-slate-700">学习的课程列表</span>
           </div>
           <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {courses.map(course => (
                 <button 
                   key={course.id}
                   onClick={() => setSelectedCourseId(course.id)}
                   className={`flex items-center gap-3 px-4 py-3 rounded-lg border min-w-[200px] transition-all text-left ${
                      selectedCourseId === course.id 
                         ? 'bg-teal-50 border-teal-200 ring-1 ring-teal-200 shadow-sm' 
                         : 'bg-white border-slate-200 hover:border-teal-200 hover:bg-slate-50'
                   }`}
                 >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${course.cover}`}>
                       {course.icon}
                    </div>
                    <div className="min-w-0">
                       <div className={`font-bold text-sm truncate ${selectedCourseId === course.id ? 'text-teal-800' : 'text-slate-700'}`}>{course.name}</div>
                       <div className="text-xs text-slate-500 mt-0.5">掌握度: <span className={course.mastery > 80 ? 'text-green-600 font-bold' : 'text-orange-500'}>{course.mastery}%</span></div>
                    </div>
                 </button>
              ))}
           </div>
       </div>

       {/* Row 1: Heatmap & Rankings */}
       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
             <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                <div>
                   <h3 className="font-bold text-slate-700 flex items-center gap-2 text-lg">
                      <Map size={20} className="text-purple-600"/> 课程技能热力图
                      <button 
                         onClick={() => setShowFormulaModal(true)}
                         className="text-slate-400 hover:text-teal-600 transition-colors"
                         title="查看计算公式"
                      >
                         <Info size={16} />
                      </button>
                   </h3>
                   <p className="text-xs text-slate-400 mt-1">岗位标准：物联网安装调试员 (100+核心技能点)</p>
                </div>
                <div className="flex gap-3 text-xs font-medium items-center bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                   <span className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-slate-300"></div> 待提升</span>
                   <span className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-red-400"></div> 良好</span>
                   <span className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-green-500"></div> 优秀</span>
                </div>
             </div>
             
             <div className="space-y-6">
                {skillCategories.map((cat, rowIdx) => (
                   <div key={rowIdx} className="flex flex-col md:flex-row gap-4 items-start border-b border-slate-50 pb-6 last:border-0 last:pb-0">
                      <div className="w-24 shrink-0 pt-1">
                         <div className="text-sm font-bold text-slate-700">{cat.code}类</div>
                         <div className="text-xs text-slate-500">{cat.name}</div>
                      </div>
                      <div className="flex-1 flex flex-wrap gap-1.5">
                         {cat.points.map((pt, colIdx) => (
                            <div key={colIdx} className="group relative">
                               <div 
                                  className={`w-8 h-6 rounded text-[8px] font-medium flex items-center justify-center text-white/90 transition-all duration-200 hover:scale-125 hover:z-10 hover:shadow-md cursor-default border border-white/10 ${getHeatColor(pt.val)}`}
                               >
                                  {pt.id}
                               </div>
                               <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-800 text-white text-xs rounded-lg shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-20 transition-opacity min-w-[120px]">
                                  <div className="font-bold border-b border-white/20 pb-1 mb-1">{pt.id}</div>
                                  <div>{pt.name}</div>
                                  <div className="mt-1 flex justify-between">
                                     <span>掌握率:</span>
                                     <span className="font-bold text-green-400">{pt.val}%</span>
                                  </div>
                                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-800"></div>
                               </div>
                            </div>
                         ))}
                      </div>
                   </div>
                ))}
             </div>
          </div>

          <div className="lg:col-span-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-full">
             <h3 className="font-bold text-slate-700 flex items-center gap-2 mb-4">
                <Award size={20} className="text-yellow-500"/> {t.skill.rank.courseTitle} (Top 10)
             </h3>
             <div className="flex mb-4 bg-slate-100 p-1 rounded-lg">
               <button 
                 onClick={() => setRankingTab('school')}
                 className={`flex-1 text-xs font-bold py-2 rounded-md transition-all ${rankingTab === 'school' ? 'bg-white shadow-sm text-teal-700' : 'text-slate-500 hover:text-slate-700'}`}
               >
                 {t.skill.rank.school}
               </button>
               <button 
                 onClick={() => setRankingTab('class')}
                 className={`flex-1 text-xs font-bold py-2 rounded-md transition-all ${rankingTab === 'class' ? 'bg-white shadow-sm text-teal-700' : 'text-slate-500 hover:text-slate-700'}`}
               >
                 {t.skill.rank.class}
               </button>
             </div>

             <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar" style={{maxHeight: 'calc(100% - 100px)'}}>
                {[...Array(10)].map((_, idx) => (
                   <div key={idx} className="flex justify-between items-center text-sm p-2 rounded hover:bg-slate-50 border-b border-slate-50 last:border-0 animate-fade-in">
                      <div className="flex gap-3 items-center">
                         <span className={`w-5 h-5 flex items-center justify-center rounded text-xs font-bold ${idx < 3 ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-100 text-slate-500'}`}>
                            {idx + 1}
                         </span>
                         <div className="flex flex-col">
                            <span className="font-medium text-slate-700">
                              {rankingTab === 'school' ? `校友 ${1001 + idx}` : `同学 ${201 + idx}`}
                            </span>
                            {rankingTab === 'school' && (
                              <span className="text-xs text-slate-400">
                                 21级物联网{1 + (idx % 3)}班
                              </span>
                            )}
                         </div>
                      </div>
                      <span className="font-bold text-teal-600">
                        {rankingTab === 'school' ? 99 - idx : 95 - idx * 2}%
                      </span>
                   </div>
                ))}
             </div>
          </div>
       </div>

       {/* Row 2: Radar & Graph */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col h-[550px]">
              <h3 className="font-bold text-slate-700 flex items-center gap-2 mb-2 shrink-0">
                 <Target size={20} className="text-orange-600"/> 技能雷达图
              </h3>
              <div className="flex items-center justify-between mb-4 shrink-0">
                 <div className="text-sm text-slate-500">对标岗位：</div>
                 <select 
                    value={selectedJobRole}
                    onChange={(e) => setSelectedJobRole(e.target.value)}
                    className="text-sm border border-slate-300 rounded px-2 py-1 bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                 >
                    {jobRoles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                 </select>
              </div>
              <div className="flex-1 flex items-center justify-center">
                 <SkillRadarChart language={'zh'} data={roleRadarData[selectedJobRole as keyof typeof roleRadarData]} />
              </div>
           </div>

           <div 
             className={`bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col transition-all duration-300 ${
                isGraphFullscreen 
                  ? 'fixed inset-0 z-50 rounded-none h-screen w-screen p-8' 
                  : 'h-[550px] relative'
             }`}
           >
              <div className="flex flex-wrap justify-between items-center mb-6 shrink-0">
                 <h3 className="font-bold text-slate-700 flex items-center gap-2 text-lg">
                    <Share size={20} className="text-blue-600"/> {t.skill.graph.title}
                 </h3>
                 <div className="flex gap-2">
                   <div className="flex bg-slate-100 p-1 rounded-lg">
                      <button 
                         onClick={() => setGraphMode('tree')}
                         className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${graphMode === 'tree' ? 'bg-white shadow-sm text-teal-700' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                         <GitGraph size={14}/> {t.skill.graph.tree}
                      </button>
                      <button 
                         onClick={() => setGraphMode('network')}
                         className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${graphMode === 'network' ? 'bg-white shadow-sm text-teal-700' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                         <GitMerge size={14}/> {t.skill.graph.network}
                      </button>
                   </div>
                   <button 
                     onClick={() => setIsGraphFullscreen(!isGraphFullscreen)}
                     className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors"
                     title={isGraphFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                   >
                     {isGraphFullscreen ? <Minimize2 size={18}/> : <Maximize2 size={18}/>}
                   </button>
                 </div>
              </div>
              <div className="flex-1 overflow-hidden relative border border-slate-100 rounded-xl bg-slate-50/30">
                 <div className="absolute inset-0">
                    <SkillGraph key={isGraphFullscreen ? 'fs' : 'norm'} data={skillGraphData} language={language} mode={graphMode} />
                 </div>
              </div>
           </div>
       </div>
       
       {/* Row 3: AI Rec */}
       <div className="bg-purple-50 rounded-2xl p-8 border border-purple-100 shadow-sm relative overflow-hidden">
          <h3 className="font-bold flex items-center gap-3 mb-8 relative z-10 text-2xl text-purple-900">
             <Brain size={28} className="text-purple-600"/> {t.skill.ai.title}
          </h3>
          
          <div className="space-y-8 relative z-10">
             <div>
                <h4 className="text-sm font-bold text-purple-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                   <BookOpen size={16}/> {t.skill.ai.rec_courses}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4">
                   {aiRecCourses.map((c, i) => (
                      <div key={i} className="group bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all cursor-pointer border border-purple-100 hover:-translate-y-1">
                         <div className={`h-32 ${c.color} flex items-center justify-center relative overflow-hidden`}>
                            <span className="text-4xl font-black text-white/30 transform -rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500 select-none">{c.title.substring(0,1)}</span>
                         </div>
                         <div className="p-4">
                            <h5 className="font-bold text-sm truncate mb-2 text-slate-800 group-hover:text-purple-700 transition-colors" title={c.title}>{c.title}</h5>
                            <div className="flex justify-between items-end">
                               <span className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded border border-purple-100">{c.major}</span>
                               <span className="text-xs font-bold flex items-center gap-1 text-orange-500">
                                  <Flame size={12} className="fill-current"/> {c.heat}
                               </span>
                            </div>
                         </div>
                      </div>
                   ))}
                </div>
             </div>

             <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm">
                <h4 className="text-sm font-bold text-purple-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                   <Target size={16}/> {t.skill.ai.rec_skills}
                </h4>
                <div className="flex flex-wrap gap-3">
                   {[
                      'Modbus协议', 'RS485通信原理', 'Linux Shell脚本', 
                      'STM32中断控制器', 'PCB多层板绘制', 'Docker容器化部署', 
                      'MQTT协议详解', 'JSON数据解析', 'Git版本控制流', '边缘计算架构',
                      'TensorFlow Lite Micro', 'FreeRTOS任务调度'
                   ].map((skill, i) => (
                      <span key={i} className="text-sm bg-purple-100 hover:bg-purple-200 text-purple-800 px-4 py-2 rounded-full border border-purple-200 cursor-default transition-all shadow-sm">
                         {skill}
                      </span>
                   ))}
                </div>
             </div>
          </div>
       </div>

    </div>
  );
};

export default SkillAnalysis;
    