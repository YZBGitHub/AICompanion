import React, { useState, useMemo, useEffect } from 'react';
import { Monitor, X, User, GraduationCap, BookOpen, Users, Map, Info, ArrowUp, Award, Target, Share, GitGraph, GitMerge, Maximize2, Minimize2, Brain, Flame, Building2, Cpu, Code, ChevronDown, ChevronRight, PieChart as PieChartIcon, TrendingUp, Grid, CheckSquare, Square, Layers, BarChart2, Globe } from 'lucide-react';
import { UserRole, Language } from '../types';
import { TEXT, getMockSkillData, CLASS_STUDENT_RANKING } from '../constants';
import SkillGraph from '../components/SkillGraph';
import { SkillRadarChart, MasteryDistributionPie, CategoryMasteryBarChart } from '../components/DashboardCharts';

interface SkillAnalysisProps {
  language: Language;
  currentRole: UserRole;
}

// 树形结构定义
interface TreeNode {
  id: string; // A, B, C...
  name: string;
  children?: { id: string; name: string }[];
}

const SkillAnalysis: React.FC<SkillAnalysisProps> = ({ language, currentRole }) => {
  const t = TEXT[language];
  const [selectedClass, setSelectedClass] = useState('21级物联网1班');
  const [selectedStudent, setSelectedStudent] = useState('李明 (2021001001)');
  const [showFormulaModal, setShowFormulaModal] = useState(false);
  const [graphMode, setGraphMode] = useState<'network'|'tree'>('network');
  const [isGraphFullscreen, setIsGraphFullscreen] = useState(false);
  const [selectedJobRole, setSelectedJobRole] = useState('物联网安装调试员');
  const [selectedCourseId, setSelectedCourseId] = useState(1);

  const classes = ['21级物联网1班', '21级物联网2班', '21级嵌入式1班'];
  const students = ['李明 (2021001001)', '张伟 (2021001002)', '王芳 (2021001003)'];
  const jobRoles = ['物联网安装调试员', '物联网系统开发工程师', '嵌入式系统设计师'];

  // Mock Data for Courses
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

  // ----------------------------------------------------------------
  // 1. 定义8个一级分类及其子分类 (带编号 A-H)
  // ----------------------------------------------------------------
  const treeData: TreeNode[] = useMemo(() => [
    { id: 'A', name: '理论基础', children: [{id: 'A-1', name: '物联网概论'}, {id: 'A-2', name: '架构标准'}] },
    { id: 'B', name: '硬件开发', children: [{id: 'B-1', name: '传感器技术'}, {id: 'B-2', name: '嵌入式系统'}] },
    { id: 'C', name: '软件工程', children: [{id: 'C-1', name: 'C语言/Python'}, {id: 'C-2', name: '数据结构'}] },
    { id: 'D', name: '网络通信', children: [{id: 'D-1', name: '无线传感网'}, {id: 'D-2', name: '网络协议'}] },
    { id: 'E', name: '平台应用', children: [{id: 'E-1', name: '云平台部署'}, {id: 'E-2', name: '边缘计算'}] },
    { id: 'F', name: '数据分析', children: [{id: 'F-1', name: '数据可视化'}, {id: 'F-2', name: '大数据基础'}] },
    { id: 'G', name: '系统集成', children: [{id: 'G-1', name: '项目实战'}, {id: 'G-2', name: '系统调试'}] },
    { id: 'H', name: '职业素养', children: [{id: 'H-1', name: '工程伦理'}, {id: 'H-2', name: '团队协作'}] },
  ], []);

  // ----------------------------------------------------------------
  // 2. 生成约 150 个技能点 (绑定到分类, 编号开头对应)
  // ----------------------------------------------------------------
  const allSkillPoints = useMemo(() => {
    const points: any[] = [];
    treeData.forEach((cat) => {
      // 每个大类约 18-20 个技能点，总计约 150+
      const count = 19; 
      for(let i=0; i<count; i++) {
          const numStr = (i+1).toString().padStart(3, '0');
          points.push({
              id: `${cat.id}${numStr}`, // e.g., A001
              name: `${cat.name}-技能点${i+1}`,
              val: Math.floor(Math.random() * 60) + 40, // 40-100 random score
              catId: cat.id,
              catName: cat.name
          });
      }
    });
    return points;
  }, [treeData]);

  // State for Tree Selection
  const [expandedNodes, setExpandedNodes] = useState<string[]>(treeData.map(t => t.id)); // Default expand all
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // Stores IDs of selected categories (A, B...)

  // Init selection: select all categories
  useEffect(() => {
    setSelectedCategories(treeData.map(t => t.id));
  }, [treeData]);

  // Tree Handlers
  const toggleExpand = (id: string) => {
    setExpandedNodes(prev => prev.includes(id) ? prev.filter(n => n !== id) : [...prev, id]);
  };

  const toggleSelection = (id: string) => {
      setSelectedCategories(prev => {
          if (prev.includes(id)) return prev.filter(c => c !== id);
          return [...prev, id];
      });
  };

  // ----------------------------------------------------------------
  // 3. 统计数据生成
  // ----------------------------------------------------------------
  const pieData = useMemo(() => {
    let improve = 0, good = 0, excellent = 0;
    allSkillPoints.forEach(p => {
        if (p.val >= 85) excellent++;
        else if (p.val >= 60) good++;
        else improve++;
    });
    return [
        { name: '优秀 (85-100)', value: excellent, color: '#10b981' },
        { name: '良好 (60-84)', value: good, color: '#3b82f6' },
        { name: '待提升 (<60)', value: improve, color: '#cbd5e1' } // using slate-300 for grey
    ];
  }, [allSkillPoints]);

  const barData = useMemo(() => {
      return treeData.map(cat => {
          const catPoints = allSkillPoints.filter(p => p.catId === cat.id);
          return {
              name: `${cat.id}类`,
              improve: catPoints.filter(p => p.val < 60).length,
              good: catPoints.filter(p => p.val >= 60 && p.val < 85).length,
              excellent: catPoints.filter(p => p.val >= 85).length
          };
      });
  }, [treeData, allSkillPoints]);

  const getHeatColor = (val: number, isSelected: boolean) => {
    if (!isSelected) return 'bg-slate-100 text-slate-300 border-slate-200'; // Dimmed
    if (val < 60) return 'bg-slate-300 text-slate-500 border-slate-400';
    if (val < 85) return 'bg-blue-400 text-white border-blue-500';
    return 'bg-green-500 text-white border-green-600';
  };

  const skillGraphData = getMockSkillData(language);

  // Rankings Data Generation
  const rankingSchool = useMemo(() => CLASS_STUDENT_RANKING.slice(0, 5).map((s,i) => ({...s, score: 99-i})), []);
  const rankingClass = useMemo(() => CLASS_STUDENT_RANKING.slice(0, 5).map((s,i) => ({...s, score: 98-i*2})), []);
  const rankingPlatform = useMemo(() => CLASS_STUDENT_RANKING.slice(0, 5).map((s,i) => ({name: `校友 ${1000+i}`, score: 99-i})), []);

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
              <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">技能掌握率</div>
              <div className="text-3xl font-bold text-teal-600">88%</div>
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

       {/* ---------------------------------------------------------------------------------- */}
       {/* 课程技能分析模块 (REDESIGNED) */}
       {/* ---------------------------------------------------------------------------------- */}
       <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Module Header */}
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
             <div>
                <h3 className="font-bold text-slate-800 flex items-center gap-2 text-lg">
                   <Grid size={22} className="text-teal-600"/> 课程技能分析
                   <button onClick={() => setShowFormulaModal(true)} className="text-slate-400 hover:text-teal-600 transition-colors" title="查看计算公式"><Info size={16}/></button>
                </h3>
                <p className="text-xs text-slate-400 mt-1">展示 {courses.find(c => c.id === selectedCourseId)?.name} 课程下 150+ 个核心技能点的掌握情况</p>
             </div>
             <div className="flex gap-3 text-xs font-medium items-center bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
                <span className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-slate-300"></div> 待提升</span>
                <span className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-blue-400"></div> 良好</span>
                <span className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-green-500"></div> 优秀</span>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
             {/* Left: Tree Navigation */}
             <div className="lg:col-span-3 border-r border-slate-100 p-4 bg-slate-50/30 flex flex-col">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Layers size={14}/> 技能分类导航
                </div>
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-2">
                    {treeData.map(cat => (
                        <div key={cat.id} className="space-y-1">
                            {/* Level 1 Node with Code */}
                            <div className="flex items-center gap-1.5 p-1.5 rounded-lg hover:bg-white transition-colors group">
                                <button onClick={() => toggleExpand(cat.id)} className="text-slate-400 hover:text-slate-600 p-0.5 rounded hover:bg-slate-200/50">
                                    {expandedNodes.includes(cat.id) ? <ChevronDown size={14}/> : <ChevronRight size={14}/>}
                                </button>
                                <div 
                                    className="cursor-pointer flex items-center gap-2 flex-1"
                                    onClick={() => toggleSelection(cat.id)}
                                >
                                    {selectedCategories.includes(cat.id) 
                                        ? <CheckSquare size={16} className="text-teal-600 fill-teal-50"/> 
                                        : <Square size={16} className="text-slate-300"/>}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="bg-slate-200 text-slate-600 text-[10px] font-bold px-1.5 rounded">{cat.id}</span>
                                            <span className={`text-sm font-bold truncate ${selectedCategories.includes(cat.id) ? 'text-teal-800' : 'text-slate-600'}`}>{cat.name}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Level 2 Nodes (Children) - Visual Only, selection tied to parent for now */}
                            {expandedNodes.includes(cat.id) && (
                                <div className="ml-6 pl-2 border-l border-slate-200 space-y-1 mb-2">
                                    {cat.children?.map(sub => (
                                        <div 
                                            key={sub.id} 
                                            className="flex items-center gap-2 p-1.5 rounded-lg cursor-default transition-colors"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                                            <span className="text-xs text-slate-500">{sub.name}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
             </div>

             {/* Right: Content Area */}
             <div className="lg:col-span-9 p-6 flex flex-col gap-8">
                
                {/* 1. Heatmap Area (Unified Grid with Larger Blocks) */}
                <div>
                   <div className="flex justify-between items-center mb-4">
                       <h4 className="font-bold text-slate-700 text-sm flex items-center gap-2">
                          <Grid size={16} className="text-blue-500"/> 全量技能点分布 (连续视图)
                       </h4>
                       <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded">共 {allSkillPoints.length} 个技能点</span>
                   </div>
                   
                   {/* Heatmap Grid Container - Wider Blocks */}
                   <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-wrap gap-1 content-start min-h-[200px]">
                        {allSkillPoints.map((pt) => {
                            const isSelected = selectedCategories.includes(pt.catId);
                            const styleClass = getHeatColor(pt.val, isSelected);
                            
                            return (
                                <div key={pt.id} className="group relative">
                                    {/* Size: w-12 (3rem) x h-6 (1.5rem) - Roughly 2x1 small squares */}
                                    <div className={`w-12 h-6 rounded border flex items-center justify-center text-[10px] font-bold transition-all duration-300 cursor-help ${styleClass} hover:scale-110 hover:z-20 hover:shadow-lg`}>
                                        {pt.id}
                                    </div>
                                    
                                    {/* Tooltip */}
                                    {isSelected && (
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-800 text-white text-[10px] rounded-lg shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none z-30 whitespace-nowrap transition-opacity">
                                            <div className="font-bold border-b border-white/20 pb-1 mb-1 text-teal-300 flex justify-between gap-4">
                                                <span>{pt.id}</span>
                                                <span className="opacity-70">{pt.catName}</span>
                                            </div>
                                            <div className="mb-1">{pt.name}</div>
                                            <div>掌握率: <span className={pt.val >= 85 ? 'text-green-400' : pt.val >= 60 ? 'text-blue-400' : 'text-slate-300'}>{pt.val}%</span></div>
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-800"></div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                   </div>
                </div>

                {/* 2. Charts Area (Solid Pie & Grouped Bar) - MODIFIED */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
                    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
                        <h4 className="font-bold text-slate-700 text-sm mb-2 flex items-center gap-2">
                            <PieChartIcon size={16} className="text-teal-500"/> 技能掌握度占比 (饼图)
                        </h4>
                        <MasteryDistributionPie data={pieData} />
                    </div>
                    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
                        <h4 className="font-bold text-slate-700 text-sm mb-2 flex items-center gap-2">
                            <BarChart2 size={16} className="text-blue-500"/> 各分类掌握情况分布 (柱状图)
                        </h4>
                        <CategoryMasteryBarChart data={barData} />
                    </div>
                </div>
             </div>
          </div>
       </div>

       {/* Ranking Module (Restored, 3 Parallel Blocks) - MOVED HERE */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
             { title: '校内排名', data: rankingSchool, icon: <Building2 size={18}/>, color: 'text-teal-600', bg: 'bg-teal-50' },
             { title: '班级排名', data: rankingClass, icon: <Users size={18}/>, color: 'text-blue-600', bg: 'bg-blue-50' },
             { title: '平台排名', data: rankingPlatform, icon: <Globe size={18}/>, color: 'text-purple-600', bg: 'bg-purple-50' }
          ].map((block, idx) => (
             <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col h-full">
                <div className="flex items-center gap-2 mb-4 font-bold text-slate-700">
                   <div className={`p-1.5 rounded-lg ${block.bg} ${block.color}`}>{block.icon}</div>
                   {block.title} Top 5
                </div>
                <div className="flex-1 space-y-3">
                   {block.data.map((s, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                         <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 flex items-center justify-center rounded text-[10px] font-bold ${i===0 ? 'bg-yellow-100 text-yellow-700' : i===1 ? 'bg-slate-200 text-slate-600' : 'bg-orange-50 text-orange-600'}`}>
                               {i+1}
                            </div>
                            <span className="text-xs font-medium text-slate-600 truncate max-w-[80px]">{s.name}</span>
                         </div>
                         <div className="font-bold text-slate-800 text-xs">{s.score}%</div>
                      </div>
                   ))}
                </div>
             </div>
          ))}
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