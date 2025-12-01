
import React, { useState, useEffect } from 'react';
import { Filter, Search, BarChart, Activity, Database, Users, ChevronDown, ChevronRight, Layers, BookOpen, Brain, Download, X, FileSpreadsheet, Monitor, Cpu, Code, Zap, FileJson, List, Eye, MessageSquare, Clock, ThumbsUp, User, Terminal, PenTool, FileText, AlertTriangle, PlayCircle, Timer, AlertCircle, CheckCircle, Wifi, Settings, PieChart as PieChartIcon } from 'lucide-react';
import { Language } from '../types';
import { TEXT, MOCK_TASKS, MOCK_IOT_QUESTIONS, MOCK_AI_ASSISTANTS_LIST, MOCK_AI_QA_DETAILS, MOCK_SOFT_ENV_OPTIONS, MOCK_SOFT_OP_TASKS, MOCK_SOFT_OP_DETAILS, MOCK_AUTO_SCORE_TASKS, MOCK_AUTO_SCORE_DETAILS, MOCK_HARD_ENV_OPTIONS, MOCK_HARD_OP_TASKS, MOCK_HARD_OP_DETAILS } from '../constants';
import { DynamicProcessChart } from '../components/DashboardCharts';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend as RechartsLegend, BarChart as RechartsBar, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

// Mock Data for Cascading Dropdowns
const MOCK_SCHOOLS = ['深圳职业技术大学', '金华职业技术学院', '南京信息职院'];
const MOCK_CLASSES = {
  '深圳职业技术大学': ['物联网1班', '物联网2班', '计算机1班'],
  '金华职业技术学院': ['电信1班', '电信2班'],
  '南京信息职院': ['软件1班', '软件2班']
};
const MOCK_USERS = {
  '物联网1班': ['李明', '张伟', '王芳'],
  '物联网2班': ['陈杰', '刘洋'],
  '计算机1班': ['赵强', '孙丽']
};
const MOCK_COURSES = ['《智慧园区》', '《嵌入式开发》', '《Python基础》'];

// Mock Data for Agents
const MOCK_SOFT_AGENTS = ['全部', '虚拟仿真智能体'];
const MOCK_HARD_AGENTS = ['全部', 'Lora设备智能体', '中心网关设备智能体'];

// Colors for Pie Charts
const PIE_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const ProcessData: React.FC<{ language: Language }> = ({ language }) => {
  const t = TEXT[language];
  
  // Navigation State
  const [activeMenuId, setActiveMenuId] = useState('behavior');
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['process_behavior', 'process_operation', 'third_party']);

  // Behavior Data State
  const [behaviorSubTab, setBehaviorSubTab] = useState('platform'); // platform | course | ai

  // Software Experiment Data State
  const [softExpSubTab, setSoftExpSubTab] = useState('env'); // env | agent
  
  // Hardware Experiment Data State
  const [hardExpSubTab, setHardExpSubTab] = useState('interaction'); // interaction | capability

  // Learning Operation Data State
  const [learningOpSubTab, setLearningOpSubTab] = useState('task'); // task | ai | auto_score
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [mockQuestionResults, setMockQuestionResults] = useState<any[]>([]);

  // Filters State (Shared)
  const [metric, setMetric] = useState('login'); 
  const [dimension, setDimension] = useState('school'); // school | class | user | course
  const [timeGranularity, setTimeGranularity] = useState('day'); // hour | day | month | year
  const [chartType, setChartType] = useState('bar'); // bar | line | table
  
  // Selection State
  const [selectedSchool, setSelectedSchool] = useState(MOCK_SCHOOLS[0]);
  const [selectedClass, setSelectedClass] = useState(MOCK_CLASSES['深圳职业技术大学'][0]);
  const [selectedUser, setSelectedUser] = useState(MOCK_USERS['物联网1班'][0]);
  const [selectedCourse, setSelectedCourse] = useState(MOCK_COURSES[0]);

  // Agent/Env Selection State
  const [selectedSoftAgent, setSelectedSoftAgent] = useState(MOCK_SOFT_AGENTS[0]);
  const [selectedHardAgent, setSelectedHardAgent] = useState(MOCK_HARD_AGENTS[0]);
  const [selectedSoftEnv, setSelectedSoftEnv] = useState(MOCK_SOFT_ENV_OPTIONS[0]);
  const [selectedHardEnv, setSelectedHardEnv] = useState(MOCK_HARD_ENV_OPTIONS[0]);

  // Date Range (default 7 days)
  const today = new Date().toISOString().split('T')[0];
  const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(lastWeek);
  const [endDate, setEndDate] = useState(today);

  // Export Modal State
  const [showExportModal, setShowExportModal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // --- Effects to reset metrics when menu changes ---
  useEffect(() => {
    if (activeMenuId === 'behavior') {
        handleSubTabChange('platform');
    } else if (activeMenuId === 'soft_exp') {
        handleSoftExpSubTabChange('env');
    } else if (activeMenuId === 'hard_exp') {
        handleHardExpSubTabChange('interaction');
    }
  }, [activeMenuId]);

  // Helper to generate dynamic data based on selection
  const generateChartData = () => {
    // Generate X-axis labels based on time granularity
    let labels: string[] = [];
    if (timeGranularity === 'hour') {
        labels = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];
    } else if (timeGranularity === 'day') {
       labels = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    } else if (timeGranularity === 'month') {
       labels = ['1月', '2月', '3月', '4月', '5月', '6月'];
    } else {
       labels = ['2023年', '2024年', '2025年'];
    }

    // Generate random values
    return labels.map(label => ({
      name: label,
      value: Math.floor(Math.random() * 100) + 20
    }));
  };

  const chartData = generateChartData();

  // Sidebar Menu Logic
  const toggleExpand = (id: string) => {
    if (expandedMenus.includes(id)) {
      setExpandedMenus(expandedMenus.filter(m => m !== id));
    } else {
      setExpandedMenus([...expandedMenus, id]);
    }
  };

  const NAV_STRUCTURE = [
    { 
      id: 'process_behavior', 
      label: t.process.nav.process_behavior, 
      icon: <Database size={18} />,
      children: [
        { id: 'behavior', label: t.process.nav.behavior },
        { id: 'soft_exp', label: t.process.nav.soft_exp },
        { id: 'hard_exp', label: t.process.nav.hard_exp }
      ]
    },
    { 
      id: 'process_operation', 
      label: t.process.nav.process_operation, 
      icon: <Layers size={18} />,
      children: [
        { id: 'learning_op', label: t.process.nav.learning_op },
        { id: 'soft_op', label: t.process.nav.soft_op },
        { id: 'hard_op', label: t.process.nav.hard_op }
      ]
    },
    { 
      id: 'third_party', 
      label: t.process.nav.third_party, 
      icon: <Users size={18} />,
      children: [
        { id: 'questionnaire', label: t.process.nav.questionnaire },
        { id: 'other_platform', label: t.process.nav.other_platform }
      ]
    },
  ];

  // Logic to switch sub-tabs and reset incompatible metrics
  const handleSubTabChange = (sub: string) => {
    setBehaviorSubTab(sub);
    // Reset metric to first available
    if (sub === 'platform') setMetric('login');
    if (sub === 'course') setMetric('submit');
    if (sub === 'ai') setMetric('qa');
    
    // Reset dimension if 'course' was selected but not available in 'platform'
    if (sub === 'platform' && dimension === 'course') setDimension('school');
  };

  // Logic to switch Soft Exp sub-tabs
  const handleSoftExpSubTabChange = (sub: string) => {
     setSoftExpSubTab(sub);
     if (sub === 'env') setMetric('open_count');
     if (sub === 'agent') setMetric('qa_count');
  };

  // Logic to switch Hard Exp sub-tabs
  const handleHardExpSubTabChange = (sub: string) => {
     setHardExpSubTab(sub);
     if (sub === 'interaction') setMetric('login');
     if (sub === 'capability') setMetric('query_status');
  };

  const getTableColumns = () => {
    return language === 'zh' 
      ? ['时间', '用户/来源', '事件/类型', '详情', '状态']
      : ['Time', 'User/Source', 'Event/Type', 'Details', 'Status'];
  };

  const handleOpenDetail = (record: any) => {
    setSelectedRecord(record);
    
    // Generate mock question results for Task Details
    if (record.type === 'task') {
        const results = MOCK_IOT_QUESTIONS.map(q => ({
           ...q,
           duration: Math.floor(Math.random() * 50) + 5 + 's',
           isCorrect: Math.random() > 0.3,
           switchCount: Math.floor(Math.random() * 3)
        }));
        setMockQuestionResults(results);
    }
    setShowDetailModal(true);
  };

  const isComplexDashboard = activeMenuId === 'behavior' || activeMenuId === 'soft_exp' || activeMenuId === 'hard_exp';
  const isOpDashboard = activeMenuId === 'learning_op' || activeMenuId === 'soft_op' || activeMenuId === 'hard_op';

  // Determine if agent selectors should show
  const showSoftAgentSelector = activeMenuId === 'soft_exp' && softExpSubTab === 'agent';
  const showHardAgentSelector = activeMenuId === 'hard_exp';
  const showAgentSelector = showSoftAgentSelector || showHardAgentSelector;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 animate-fade-in flex flex-col md:flex-row gap-8 min-h-screen relative">
       {/* ... Export Modal ... */}
       {showExportModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
             <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100 flex flex-col">
                <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-6 text-white text-center shrink-0">
                   <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FileSpreadsheet size={24} />
                   </div>
                   <h3 className="text-xl font-bold">导出数据</h3>
                   <p className="text-teal-100 text-sm mt-1">将当前视图数据导出为 Excel 文件</p>
                </div>
                <div className="p-6 space-y-4">
                   <div className="space-y-2">
                      <div className="flex justify-between text-sm text-slate-600">
                         <span>数据范围:</span>
                         <span className="font-bold">{startDate} 至 {endDate}</span>
                      </div>
                      <div className="flex justify-between text-sm text-slate-600">
                         <span>数据类型:</span>
                         <span className="font-bold">{t.process.nav[activeMenuId as keyof typeof t.process.nav]}</span>
                      </div>
                      <div className="flex justify-between text-sm text-slate-600">
                         <span>包含条目:</span>
                         <span className="font-bold">1,245 条</span>
                      </div>
                   </div>
                   
                   <div className="pt-4 flex gap-3">
                      <button 
                         onClick={() => setShowExportModal(false)}
                         className="flex-1 py-2.5 border border-slate-300 rounded-lg text-slate-600 font-bold hover:bg-slate-50 transition-colors"
                      >
                         取消
                      </button>
                      <button 
                         onClick={() => {
                            setIsExporting(true);
                            setTimeout(() => {
                               setIsExporting(false);
                               setShowExportModal(false);
                            }, 2000);
                         }}
                         className="flex-1 py-2.5 bg-teal-600 text-white rounded-lg font-bold hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
                         disabled={isExporting}
                      >
                         {isExporting ? (
                            <>
                               <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                               导出中...
                            </>
                         ) : (
                            <>确认导出</>
                         )}
                      </button>
                   </div>
                </div>
             </div>
          </div>
       )}
       
       {/* Detail Modal */}
       {showDetailModal && selectedRecord && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in" onClick={() => setShowDetailModal(false)}>
           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden animate-scale-in flex flex-col max-h-[95vh]" onClick={e => e.stopPropagation()}>
             <div className={`p-5 text-white flex justify-between items-center shrink-0 ${selectedRecord.type === 'ai' ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gradient-to-r from-blue-600 to-indigo-600'}`}>
                <h3 className="text-lg font-bold flex items-center gap-2">
                   {selectedRecord.type === 'ai' ? <Brain size={20}/> : <FileJson size={20} />} 
                   {t.process.detail.title}
                </h3>
                <button onClick={() => setShowDetailModal(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors"><X size={20}/></button>
             </div>
             
             {/* --- Detail Content Switching Logic --- */}
             {selectedRecord.type === 'hard_op' && MOCK_HARD_OP_DETAILS[selectedRecord.env as keyof typeof MOCK_HARD_OP_DETAILS] ? (
                // 1. Hardware Operation Detail
                <div className="p-6 bg-slate-50 h-full overflow-y-auto">
                    <div className="flex items-center gap-2 mb-6">
                       <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold shadow-sm">{selectedRecord.env}</span>
                       <h4 className="font-bold text-slate-800 text-xl">{selectedRecord.chapter} - 实验详情</h4>
                    </div>
                    {/* ... (Keep existing Hardware Op View) ... */}
                    {(() => {
                        const detail = MOCK_HARD_OP_DETAILS[selectedRecord.env as keyof typeof MOCK_HARD_OP_DETAILS];
                        return (
                          <div className="space-y-6">
                              {/* Device Stats */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                                      <h5 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                                          <Settings size={18} className="text-blue-600"/> 设备配置
                                      </h5>
                                      <div className="grid grid-cols-2 gap-4 text-sm">
                                          {Object.entries(detail.deviceConfig).map(([k, v]) => (
                                              <div key={k}>
                                                  <div className="text-slate-400 text-xs uppercase font-bold">{k}</div>
                                                  <div className="font-mono font-medium text-slate-700">{v as string}</div>
                                              </div>
                                          ))}
                                      </div>
                                  </div>
                                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center items-center">
                                      <div className="text-slate-500 text-sm font-bold uppercase mb-2">设备运行总时长</div>
                                      <div className="text-4xl font-mono font-bold text-teal-600 flex items-center gap-2">
                                          <Timer size={32}/> {detail.runtime}
                                      </div>
                                  </div>
                              </div>
                              {/* Logs */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  {/* Config Changes */}
                                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                                      <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 font-bold text-slate-700 flex items-center gap-2">
                                          <List size={18}/> 配置变更记录
                                      </div>
                                      <div className="max-h-[200px] overflow-y-auto p-0">
                                          <table className="w-full text-sm text-left">
                                              <tbody className="divide-y divide-slate-100">
                                                  {detail.changes.map((c, i) => (
                                                      <tr key={i} className="hover:bg-slate-50">
                                                          <td className="px-4 py-3 font-mono text-xs text-slate-500 w-24">{c.time}</td>
                                                          <td className="px-4 py-3 text-slate-700">{c.content}</td>
                                                      </tr>
                                                  ))}
                                              </tbody>
                                          </table>
                                      </div>
                                  </div>
                                  {/* State Changes */}
                                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                                      <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 font-bold text-slate-700 flex items-center gap-2">
                                          <Activity size={18}/> 状态变更记录
                                      </div>
                                      <div className="max-h-[200px] overflow-y-auto p-0">
                                          <table className="w-full text-sm text-left">
                                              <tbody className="divide-y divide-slate-100">
                                                  {detail.states.map((s, i) => (
                                                      <tr key={i} className="hover:bg-slate-50">
                                                          <td className="px-4 py-3 font-mono text-xs text-slate-500 w-24">{s.time}</td>
                                                          <td className="px-4 py-3">
                                                              <span className={`px-2 py-0.5 rounded text-xs font-bold ${s.status.includes('上线') || s.status.includes('打开') || s.status.includes('运行') ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                                                                  {s.status}
                                                              </span>
                                                          </td>
                                                      </tr>
                                                  ))}
                                              </tbody>
                                          </table>
                                      </div>
                                  </div>
                              </div>
                              {/* Hardware AI Assistant */}
                              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-5 py-4 border-b border-purple-100 flex justify-between items-center">
                                      <div className="font-bold text-purple-800 flex items-center gap-2">
                                          <Brain size={20} className="text-purple-600"/> 硬件AI助手数据
                                      </div>
                                      <div className="flex gap-4 text-xs">
                                          <div className="bg-white px-3 py-1 rounded-full border border-purple-200 text-purple-700">满意度: <b>{detail.ai.satisfaction}</b></div>
                                          <div className="bg-white px-3 py-1 rounded-full border border-purple-200 text-purple-700">对话: <b>{detail.ai.totalDialogs}次</b></div>
                                      </div>
                                  </div>
                                  <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-6">
                                      <div className="col-span-1 space-y-4">
                                          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                              <div className="text-xs text-slate-500 mb-1">提问总次数</div>
                                              <div className="text-xl font-bold text-slate-800">{detail.ai.totalQ}</div>
                                          </div>
                                          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                              <div className="text-xs text-slate-500 mb-1">提问总字数</div>
                                              <div className="text-xl font-bold text-slate-800">{detail.ai.totalWords}</div>
                                          </div>
                                      </div>
                                      <div className="col-span-2 space-y-3">
                                          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">问答具体内容</div>
                                          {detail.ai.qaList.map((qa: any, idx: number) => (
                                              <div key={idx} className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-sm">
                                                  <div className="font-bold text-slate-700 mb-1 flex justify-between">
                                                      <span>Q: {qa.q}</span>
                                                      <span className="font-mono text-xs text-slate-400 font-normal">{qa.time}</span>
                                                  </div>
                                                  <div className="text-slate-600 pl-4 border-l-2 border-purple-200">
                                                      A: {qa.a}
                                                  </div>
                                              </div>
                                          ))}
                                      </div>
                                  </div>
                              </div>
                          </div>
                        );
                    })()}
                </div>

             ) : selectedRecord.type === 'ai' ? (
                // 2. Course AI Assistant Detail (RESTORED)
                <div className="p-6 bg-slate-50 h-full overflow-y-auto">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6">
                        <div className="flex items-center gap-3 mb-6">
                           <div className="p-3 bg-purple-100 text-purple-600 rounded-xl"><Brain size={32}/></div>
                           <div>
                              <h4 className="font-bold text-slate-800 text-2xl">{selectedRecord.name}</h4>
                              <div className="text-sm text-slate-500 mt-1 flex items-center gap-2">
                                 <Clock size={14}/> 最近交互: {selectedRecord.lastTime}
                              </div>
                           </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                           {[
                              { label: t.process.detail.ai_total, val: '42 次' },
                              { label: t.process.detail.ai_words, val: '1,250 字' },
                              { label: t.process.detail.ai_avg_words, val: '30 字' },
                              { label: t.process.detail.ai_interval, val: '2m 30s' },
                              { label: t.process.detail.ai_sessions, val: '12 次' },
                              { label: t.process.detail.ai_sat, val: '4.9 分' }
                           ].map((s, i) => (
                              <div key={i} className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                                 <div className="text-xs text-slate-400 font-bold uppercase mb-1 truncate" title={s.label}>{s.label}</div>
                                 <div className="font-bold text-slate-800 text-lg">{s.val}</div>
                              </div>
                           ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h5 className="font-bold text-slate-700 flex items-center gap-2 text-lg">
                           <MessageSquare size={20} className="text-purple-600"/> {t.process.detail.ai_qa_content}
                        </h5>
                        {MOCK_AI_QA_DETAILS.map((qa, i) => (
                           <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                              <div className="flex gap-4 mb-4">
                                 <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-xs shrink-0">U</div>
                                 <div className="bg-slate-50 p-4 rounded-2xl rounded-tl-none text-slate-800 font-medium flex-1 shadow-inner">
                                    {qa.q}
                                 </div>
                              </div>
                              <div className="flex gap-4 flex-row-reverse">
                                 <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center font-bold text-purple-600 text-xs shrink-0">AI</div>
                                 <div className="bg-purple-50 p-4 rounded-2xl rounded-tr-none text-slate-700 flex-1 border border-purple-100 shadow-sm">
                                    {qa.a}
                                    <div className="mt-3 pt-3 border-t border-purple-100 text-xs text-slate-400 flex gap-4">
                                       <span className="flex items-center gap-1"><Clock size={10}/> 耗时: {qa.time}</span>
                                       <span className="flex items-center gap-1"><Timer size={10}/> 间隔: {qa.interval}</span>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        ))}
                    </div>
                </div>

             ) : selectedRecord.type === 'soft_op' ? (
                // 3. Software Operation Detail (RESTORED)
                <div className="p-6 bg-slate-50 h-full overflow-y-auto">
                    <div className="flex items-center gap-2 mb-6">
                       <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold shadow-sm">{selectedRecord.env}</span>
                       <h4 className="font-bold text-slate-800 text-xl">{selectedRecord.chapter} - 实验详情</h4>
                    </div>

                    {/* --- 2D Virtual Simulation View --- */}
                    {selectedRecord.env === '2D虚拟仿真' && MOCK_SOFT_OP_DETAILS['2D虚拟仿真'] && (
                      <div className="space-y-6">
                         <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center bg-gradient-to-r from-blue-50 to-white">
                             <div>
                                <div className="text-xs text-slate-500 font-bold uppercase mb-1">{t.process.detail.sim_project}</div>
                                <div className="flex items-center gap-2 font-mono text-blue-700 font-bold text-lg">
                                   <FileText size={24}/> {MOCK_SOFT_OP_DETAILS['2D虚拟仿真'].project}
                                </div>
                             </div>
                             <button className="text-sm bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 flex items-center gap-2">
                                <PlayCircle size={16}/> 查看仿真界面
                             </button>
                         </div>
                         
                         {/* Stats Grid */}
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm col-span-1">
                                <h5 className="font-bold text-slate-700 mb-4 flex items-center gap-2"><Activity size={18}/> {t.process.detail.sim_stats}</h5>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                                        <span className="text-slate-500 text-sm">启动总次数</span>
                                        <span className="font-bold text-slate-800">{MOCK_SOFT_OP_DETAILS['2D虚拟仿真'].opStats.startCount}</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                                        <span className="text-slate-500 text-sm">平均启动时间</span>
                                        <span className="font-bold text-slate-800">{MOCK_SOFT_OP_DETAILS['2D虚拟仿真'].opStats.avgStartupTime}</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                                        <span className="text-slate-500 text-sm">接线错误次数</span>
                                        <span className="font-bold text-red-500">{MOCK_SOFT_OP_DETAILS['2D虚拟仿真'].opStats.wiringErrorCount}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-500 text-sm">总运行时间</span>
                                        <span className="font-bold text-green-600">{MOCK_SOFT_OP_DETAILS['2D虚拟仿真'].opStats.totalRunTime}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm col-span-2">
                                <h5 className="font-bold text-slate-700 mb-4 flex items-center gap-2"><Cpu size={18}/> 热门设备操作排行</h5>
                                <div className="space-y-3">
                                   {MOCK_SOFT_OP_DETAILS['2D虚拟仿真'].opStats.topDevices.map((d: any, i: number) => (
                                      <div key={i} className="relative pt-1">
                                         <div className="flex justify-between mb-1 text-xs">
                                            <span className="font-medium text-slate-700">{d.name}</span>
                                            <span className="font-bold text-blue-600">{d.count}次</span>
                                         </div>
                                         <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100">
                                            <div style={{ width: `${(d.count / 50) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                                         </div>
                                      </div>
                                   ))}
                                </div>
                            </div>
                         </div>

                         {/* History Table */}
                         <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="bg-slate-50 px-5 py-4 border-b border-slate-200 font-bold text-slate-700 flex items-center gap-2">
                               <List size={18}/> {t.process.detail.sim_history}
                            </div>
                            <div className="max-h-[300px] overflow-y-auto">
                                <table className="w-full text-sm text-left">
                                   <thead className="bg-slate-50 text-slate-500 sticky top-0">
                                      <tr>
                                         <th className="px-5 py-2 w-24">时间</th>
                                         <th className="px-5 py-2 w-24">类型</th>
                                         <th className="px-5 py-2 w-40">设备</th>
                                         <th className="px-5 py-2">内容</th>
                                      </tr>
                                   </thead>
                                   <tbody className="divide-y divide-slate-100">
                                      {MOCK_SOFT_OP_DETAILS['2D虚拟仿真'].opHistory.map((h: any, i: number) => (
                                         <tr key={i} className="hover:bg-slate-50">
                                            <td className="px-5 py-3 font-mono text-slate-500 text-xs">{h.time}</td>
                                            <td className="px-5 py-3">
                                               <span className={`px-2 py-0.5 rounded text-xs font-bold ${h.type.includes('删除') ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>{h.type}</span>
                                            </td>
                                            <td className="px-5 py-3 text-slate-700 font-medium text-xs">{h.device}</td>
                                            <td className="px-5 py-3 text-slate-600">{h.content}</td>
                                         </tr>
                                      ))}
                                   </tbody>
                                </table>
                            </div>
                         </div>

                         {/* Agent Stats */}
                         <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
                            <div className="flex justify-between items-start mb-6">
                               <h5 className="font-bold text-lg flex items-center gap-2"><Brain size={20}/> 仿真实验智能体数据</h5>
                               <div className="text-xs bg-white/20 px-2 py-1 rounded">满意度: {MOCK_SOFT_OP_DETAILS['2D虚拟仿真'].agentStats.satisfaction}</div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                               <div className="bg-white/10 p-3 rounded-lg text-center">
                                  <div className="text-xs opacity-70 mb-1">提问总次数</div>
                                  <div className="font-bold text-xl">{MOCK_SOFT_OP_DETAILS['2D虚拟仿真'].agentStats.totalQuestions}</div>
                               </div>
                               <div className="bg-white/10 p-3 rounded-lg text-center">
                                  <div className="text-xs opacity-70 mb-1">提问总字数</div>
                                  <div className="font-bold text-xl">{MOCK_SOFT_OP_DETAILS['2D虚拟仿真'].agentStats.totalWords}</div>
                               </div>
                               <div className="bg-white/10 p-3 rounded-lg text-center">
                                  <div className="text-xs opacity-70 mb-1">平均间隔</div>
                                  <div className="font-bold text-xl">{MOCK_SOFT_OP_DETAILS['2D虚拟仿真'].agentStats.avgInterval}</div>
                               </div>
                               <div className="bg-white/10 p-3 rounded-lg text-center">
                                  <div className="text-xs opacity-70 mb-1">对话场景</div>
                                  <div className="text-xs font-bold mt-1">排错 / 创建</div>
                               </div>
                            </div>
                            <div className="bg-white/10 rounded-xl p-4">
                               <div className="text-xs font-bold opacity-70 uppercase mb-3">最近对话</div>
                               <div className="space-y-3">
                                  {MOCK_SOFT_OP_DETAILS['2D虚拟仿真'].agentStats.qaList.map((qa: any, i: number) => (
                                     <div key={i} className="text-sm">
                                        <div className="font-bold mb-1 opacity-90">Q: {qa.q}</div>
                                        <div className="pl-3 border-l-2 border-white/30 opacity-80 text-xs">A: {qa.a}</div>
                                     </div>
                                  ))}
                               </div>
                            </div>
                         </div>
                      </div>
                    )}

                    {/* --- ThingsBoard View --- */}
                    {selectedRecord.env === 'ThingsBoard' && MOCK_SOFT_OP_DETAILS['ThingsBoard'] && (
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
                          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center">
                              <h5 className="text-slate-500 font-bold uppercase mb-4 text-sm">实验环境操作总时长</h5>
                              <div className="text-6xl font-black text-blue-600 font-mono tracking-tighter">
                                 {MOCK_SOFT_OP_DETAILS['ThingsBoard'].totalTime}
                              </div>
                              <div className="mt-4 flex gap-2">
                                 <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">活跃</span>
                                 <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">在线</span>
                              </div>
                          </div>
                          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                              <h5 className="text-slate-700 font-bold mb-4 flex items-center gap-2"><PieChartIcon size={18}/> 各环节操作占比</h5>
                              <div className="flex-1 min-h-[300px]">
                                 <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                       <Pie
                                          data={MOCK_SOFT_OP_DETAILS['ThingsBoard'].ops}
                                          cx="50%"
                                          cy="50%"
                                          innerRadius={60}
                                          outerRadius={80}
                                          paddingAngle={5}
                                          dataKey="value"
                                       >
                                          {MOCK_SOFT_OP_DETAILS['ThingsBoard'].ops.map((entry: any, index: number) => (
                                             <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                          ))}
                                       </Pie>
                                       <RechartsTooltip />
                                       <RechartsLegend verticalAlign="bottom" height={36}/>
                                    </PieChart>
                                 </ResponsiveContainer>
                              </div>
                          </div>
                       </div>
                    )}

                    {/* --- Node-Red View --- */}
                    {selectedRecord.env === 'Node-Red' && MOCK_SOFT_OP_DETAILS['Node-Red'] && (
                       <div className="space-y-6 h-full flex flex-col">
                          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center shrink-0">
                              <div>
                                 <div className="text-xs text-slate-500 font-bold uppercase">配置文件</div>
                                 <div className="font-mono font-bold text-orange-600">{MOCK_SOFT_OP_DETAILS['Node-Red'].configFile}</div>
                              </div>
                              <button className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-slate-700">
                                 <Download size={16}/> 下载配置
                              </button>
                          </div>
                          <div className="bg-slate-800 rounded-2xl p-6 flex-1 shadow-inner relative overflow-hidden border border-slate-700">
                              <div className="absolute top-4 left-4 text-slate-400 text-xs font-mono">Node-Red Flow Preview</div>
                              <div className="w-full h-full flex items-center justify-center">
                                  {/* Simulated Flow with SVG */}
                                  <svg width="100%" height="100%" viewBox="0 0 600 300" className="overflow-visible">
                                      {/* Wires */}
                                      {MOCK_SOFT_OP_DETAILS['Node-Red'].wires.map((w: any, i: number) => {
                                         const fromNode = MOCK_SOFT_OP_DETAILS['Node-Red'].nodes.find((n:any) => n.id === w.from);
                                         const toNode = MOCK_SOFT_OP_DETAILS['Node-Red'].nodes.find((n:any) => n.id === w.to);
                                         if(!fromNode || !toNode) return null;
                                         return (
                                            <path key={i} d={`M${fromNode.x+80},${fromNode.y+20} C${fromNode.x+120},${fromNode.y+20} ${toNode.x-40},${toNode.y+20} ${toNode.x},${toNode.y+20}`} stroke="#64748b" strokeWidth="2" fill="none" />
                                         );
                                      })}
                                      {/* Nodes */}
                                      {MOCK_SOFT_OP_DETAILS['Node-Red'].nodes.map((n: any) => (
                                         <g key={n.id} transform={`translate(${n.x},${n.y})`}>
                                            <rect width="80" height="40" rx="4" fill={n.type==='inject'?'#a5b4fc':n.type==='debug'?'#86efac':'#fca5a5'} stroke="white" strokeWidth="2"/>
                                            <text x="40" y="24" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1e293b">{n.label}</text>
                                         </g>
                                      ))}
                                  </svg>
                              </div>
                          </div>
                       </div>
                    )}

                    {/* --- Terminal View --- */}
                    {selectedRecord.env === '终端' && MOCK_SOFT_OP_DETAILS['终端'] && (
                       <div className="space-y-6">
                          <div className="grid grid-cols-3 gap-4">
                             <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
                                <div className="text-xs text-slate-500 uppercase font-bold">连接次数</div>
                                <div className="text-2xl font-black text-slate-800">{MOCK_SOFT_OP_DETAILS['终端'].connectCount}</div>
                             </div>
                             <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
                                <div className="text-xs text-slate-500 uppercase font-bold">打开次数</div>
                                <div className="text-2xl font-black text-slate-800">{MOCK_SOFT_OP_DETAILS['终端'].openCount}</div>
                             </div>
                             <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
                                <div className="text-xs text-slate-500 uppercase font-bold">总运行时长</div>
                                <div className="text-2xl font-black text-slate-800">{MOCK_SOFT_OP_DETAILS['终端'].totalTime}</div>
                             </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             {/* Top Commands Chart */}
                             <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <h5 className="font-bold text-slate-700 mb-4 flex items-center gap-2"><Terminal size={18}/> 高频命令 Top 5</h5>
                                <ResponsiveContainer width="100%" height={250}>
                                   <RechartsBar layout="vertical" data={MOCK_SOFT_OP_DETAILS['终端'].topCommands} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false}/>
                                      <XAxis type="number" hide/>
                                      <YAxis dataKey="cmd" type="category" width={80} tick={{fontSize: 12}}/>
                                      <RechartsTooltip cursor={{fill: 'transparent'}}/>
                                      <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
                                   </RechartsBar>
                                </ResponsiveContainer>
                             </div>

                             {/* Error Logs */}
                             <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                                <h5 className="font-bold text-slate-700 mb-4 flex items-center gap-2 text-red-600"><AlertTriangle size={18}/> 错误日志</h5>
                                <div className="flex-1 overflow-y-auto max-h-[250px] space-y-2 pr-2">
                                   {MOCK_SOFT_OP_DETAILS['终端'].errors.map((err: any, i: number) => (
                                      <div key={i} className="bg-red-50 p-3 rounded-lg border border-red-100 text-xs">
                                         <div className="font-mono font-bold text-red-700 mb-1">$ {err.cmd}</div>
                                         <div className="text-red-500">{err.log}</div>
                                      </div>
                                   ))}
                                </div>
                             </div>
                          </div>
                          
                          {/* Console View */}
                          <div className="bg-slate-900 rounded-2xl p-6 font-mono text-sm text-slate-300 shadow-inner border border-slate-800">
                             <div className="flex gap-1.5 mb-4">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                             </div>
                             <div className="space-y-2">
                                {MOCK_SOFT_OP_DETAILS['终端'].history.map((h: any, i: number) => (
                                   <div key={i}>
                                      <div className="flex gap-2">
                                         <span className="text-green-400">user@iot-lab:~$</span>
                                         <span className="text-white">{h.cmd}</span>
                                         <span className="text-slate-500 ml-auto text-xs">{h.time}</span>
                                      </div>
                                      {h.output && <div className="text-slate-400 whitespace-pre-wrap pl-4 border-l border-slate-700 ml-1 mt-1">{h.output}</div>}
                                   </div>
                                ))}
                                <div className="animate-pulse">_</div>
                             </div>
                          </div>
                       </div>
                    )}
                </div>

             ) : selectedRecord.type === 'auto_score' ? (
                // 4. Auto Score Detail View (Existing)
                <div className="bg-slate-50 h-full flex flex-col">
                  <div className="p-6 border-b border-slate-200 bg-white shrink-0">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="bg-teal-100 text-teal-700 px-2 py-1 rounded text-xs font-bold">自动评分详情</span>
                        <h4 className="font-bold text-slate-800 text-lg">{selectedRecord.chapter}</h4>
                      </div>
                      
                      <div className="flex gap-6 text-sm">
                        <div className="bg-slate-50 px-5 py-3 rounded-xl border border-slate-200 text-center min-w-[120px]">
                            <div className="text-slate-500 text-xs font-bold uppercase mb-1">{t.process.detail.total_score}</div>
                            <div className="font-bold text-teal-600 text-2xl">{selectedRecord.score}</div>
                        </div>
                        <div className="bg-slate-50 px-5 py-3 rounded-xl border border-slate-200 text-center min-w-[120px]">
                            <div className="text-slate-500 text-xs font-bold uppercase mb-1">{t.process.detail.accuracy}</div>
                            <div className="font-bold text-blue-600 text-2xl">{Math.round((selectedRecord.score / 100) * 100)}%</div>
                        </div>
                      </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-0">
                      <table className="w-full text-left text-sm border-collapse">
                        <thead className="bg-slate-100 text-slate-700 sticky top-0 shadow-sm z-10">
                            <tr>
                              <th className="px-6 py-3 font-bold w-16">{t.process.detail.q_no}</th>
                              <th className="px-6 py-3 font-bold">{t.process.detail.as_rule}</th>
                              <th className="px-6 py-3 font-bold w-32">{t.process.detail.as_scene}</th>
                              <th className="px-6 py-3 font-bold w-32">{t.process.detail.as_env}</th>
                              <th className="px-6 py-3 font-bold w-20 text-center">{t.process.detail.as_score}</th>
                              <th className="px-6 py-3 font-bold w-24 text-center">{t.process.detail.as_result}</th>
                              <th className="px-6 py-3 font-bold">{t.process.detail.as_skill}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {MOCK_AUTO_SCORE_DETAILS.map((item, idx) => (
                              <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                  <td className="px-6 py-3 font-mono text-xs text-slate-500 text-center">{idx + 1}</td>
                                  <td className="px-6 py-3 text-slate-800 font-medium">{item.rule}</td>
                                  <td className="px-6 py-3 text-slate-600">{item.scene}</td>
                                  <td className="px-6 py-3 text-slate-600">{item.env}</td>
                                  <td className="px-6 py-3 text-center font-bold text-slate-700">{item.score}</td>
                                  <td className="px-6 py-3 text-center">
                                    {item.result ? (
                                        <span className="text-green-600 font-bold text-xs bg-green-100 px-2 py-1 rounded">正确</span>
                                    ) : (
                                        <button 
                                          className="text-red-600 font-bold text-xs bg-red-100 px-2 py-1 rounded hover:bg-red-200 transition-colors flex items-center justify-center gap-1 w-full"
                                          onClick={() => alert(`错误原因: ${item.reason}`)}
                                          title="点击查看错误原因"
                                        >
                                          错误 <AlertCircle size={10}/>
                                        </button>
                                    )}
                                  </td>
                                  <td className="px-6 py-3 text-slate-500 text-xs">
                                     <span className="bg-slate-100 px-2 py-1 rounded border border-slate-200">{item.skill}</span>
                                  </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                  </div>
                </div>
             ) : (
                // 5. Task Detail View (Standard)
                <>
                  <div className="p-6 bg-slate-50 border-b border-slate-200 shrink-0">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold">{t.process.detail.q_data}</span>
                        <h4 className="font-bold text-slate-800 text-lg">{selectedRecord.chapter}</h4>
                      </div>
                      <div className="grid grid-cols-5 gap-4 text-sm">
                        <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                            <div className="text-slate-500 text-xs mb-1">{t.process.detail.q_score}</div>
                            <div className="font-bold text-teal-600 text-lg">{selectedRecord.score} 分</div>
                        </div>
                        {/* ... other task stats ... */}
                      </div>
                  </div>
                  <div className="flex-1 overflow-y-auto p-0">
                      <table className="w-full text-left text-sm border-collapse">
                        <thead className="bg-slate-100 text-slate-700 sticky top-0 shadow-sm">
                            <tr>
                              <th className="px-6 py-3 font-bold w-16">{t.process.detail.q_no}</th>
                              <th className="px-6 py-3 font-bold w-24">{t.process.detail.q_type}</th>
                              <th className="px-6 py-3 font-bold">{t.process.detail.q_content}</th>
                              <th className="px-6 py-3 font-bold w-24 text-center">{t.process.detail.q_correct}</th>
                              <th className="px-6 py-3 font-bold w-24">{t.process.detail.q_duration}</th>
                              <th className="px-6 py-3 font-bold w-24">{t.process.detail.q_switch}</th>
                              <th className="px-6 py-3 font-bold w-40">{t.process.detail.q_skill}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {mockQuestionResults.map((q, idx) => (
                              <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                  <td className="px-6 py-3 font-mono text-xs text-slate-500 text-center">{idx + 1}</td>
                                  <td className="px-6 py-3 text-slate-600 whitespace-nowrap">
                                    <span className={`px-2 py-0.5 rounded text-xs border ${
                                        q.type === '单选' ? 'bg-blue-50 border-blue-100 text-blue-600' : 
                                        q.type === '多选' ? 'bg-purple-50 border-purple-100 text-purple-600' : 
                                        'bg-slate-50 border-slate-200 text-slate-600'
                                    }`}>
                                        {q.type}
                                    </span>
                                  </td>
                                  <td className="px-6 py-3 text-slate-800 font-medium truncate max-w-xs" title={q.content}>
                                    {q.content}
                                  </td>
                                  <td className="px-6 py-3 text-center">
                                    {q.isCorrect ? (
                                        <span className="text-green-600 font-bold text-xs bg-green-100 px-2 py-1 rounded">正确</span>
                                    ) : (
                                        <span className="text-red-500 font-bold text-xs bg-red-100 px-2 py-1 rounded">错误</span>
                                    )}
                                  </td>
                                  <td className="px-6 py-3 text-slate-600 font-mono">{q.duration}</td>
                                  <td className="px-6 py-3 text-slate-600 text-center">{q.switchCount}</td>
                                  <td className="px-6 py-3 text-slate-500 text-xs">{q.skill}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                  </div>
                </>
             )}

             <div className="bg-slate-50 p-4 text-right border-t border-slate-200 shrink-0">
                <button 
                  onClick={() => setShowDetailModal(false)}
                  className="px-6 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-100 transition-colors shadow-sm text-slate-700"
                >
                  关闭
                </button>
             </div>
           </div>
         </div>
       )}

       {/* Sidebar Navigation */}
       {/* (Keeping existing sidebar code) */}
       <div className="w-full md:w-64 shrink-0 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-fit">
          <div className="p-4 bg-teal-50 border-b border-teal-100 font-bold text-teal-800 flex items-center gap-2">
             <Filter size={20} /> 数据分类
          </div>
          <div className="p-2 space-y-1">
             {NAV_STRUCTURE.map(item => (
                <div key={item.id}>
                   <button
                      onClick={() => item.children ? toggleExpand(item.id) : setActiveMenuId(item.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-sm font-medium transition-all ${
                         activeMenuId === item.id 
                            ? 'bg-teal-50 text-teal-700 shadow-sm border border-teal-100 font-bold' 
                            : 'text-slate-600 hover:bg-slate-50'
                      }`}
                   >
                      <div className="flex items-center gap-3">
                         {item.icon}
                         {item.label}
                      </div>
                      {item.children && (
                         <ChevronDown size={16} className={`transition-transform duration-200 ${expandedMenus.includes(item.id) ? 'rotate-180' : ''}`} />
                      )}
                   </button>
                   
                   {/* Render Children */}
                   {item.children && expandedMenus.includes(item.id) && (
                      <div className="ml-4 pl-4 border-l-2 border-slate-100 space-y-1 mt-1">
                         {item.children.map(child => (
                            <button
                               key={child.id}
                               onClick={() => setActiveMenuId(child.id)}
                               className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                                  activeMenuId === child.id 
                                     ? 'text-teal-600 bg-teal-50/50 font-bold' 
                                     : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                               }`}
                            >
                               {child.label}
                            </button>
                         ))}
                      </div>
                   )}
                </div>
             ))}
          </div>
       </div>

       {/* Main Content Area */}
       {/* (Keeping existing main content area structure, just updating the Detail Modal section logic which is already above) */}
       <div className="flex-1 space-y-6 min-w-0">
          <div className="flex justify-between items-center">
             <h2 className="text-2xl font-bold text-slate-800">
               {NAV_STRUCTURE.find(p => p.id === activeMenuId)?.label || 
                NAV_STRUCTURE.flatMap(p => p.children || []).find(c => c.id === activeMenuId)?.label}
             </h2>
             <div className="flex items-center gap-3">
               <div className="text-sm text-slate-500 hidden md:block">
                  数据更新时间: {new Date().toLocaleString()}
               </div>
               <button 
                  onClick={() => setShowExportModal(true)}
                  className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-3 py-1.5 rounded-lg text-sm font-bold transition-all shadow-sm"
               >
                  <Download size={16} className="text-teal-600"/> 导出Excel
               </button>
             </div>
          </div>

          {isOpDashboard ? (
             <>
               {/* 1. Sub-Tabs */}
               {activeMenuId === 'learning_op' && (
                 <div className="bg-white p-1 rounded-xl border border-slate-200 shadow-sm flex w-fit">
                     {[
                       { id: 'task', label: t.process.filters.learnOpCategories.task, icon: <List size={16}/> },
                       { id: 'ai', label: t.process.filters.learnOpCategories.ai, icon: <Brain size={16}/> },
                       { id: 'auto_score', label: t.process.filters.learnOpCategories.auto_score, icon: <CheckCircle size={16}/> }
                     ].map(tab => (
                       <button
                         key={tab.id}
                         onClick={() => setLearningOpSubTab(tab.id)}
                         className={`flex items-center gap-2 px-6 py-2.5 text-sm font-bold rounded-lg transition-all ${
                           learningOpSubTab === tab.id 
                             ? 'bg-teal-600 text-white shadow-md' 
                             : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                         }`}
                       >
                         {tab.icon} {tab.label}
                       </button>
                     ))}
                 </div>
               )}

               {/* 2. Filter Panel */}
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                  <div className={`grid grid-cols-1 sm:grid-cols-2 ${activeMenuId === 'soft_op' || activeMenuId === 'hard_op' ? 'md:grid-cols-4' : 'md:grid-cols-3'} gap-4 items-end`}>
                     <div>
                         <label className="text-xs font-medium text-slate-500 mb-1 block">选择学校</label>
                         <select 
                            value={selectedSchool}
                            onChange={e => { setSelectedSchool(e.target.value); setSelectedClass(MOCK_CLASSES[e.target.value as keyof typeof MOCK_CLASSES][0]); }}
                            className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                         >
                            {MOCK_SCHOOLS.map(s => <option key={s} value={s}>{s}</option>)}
                         </select>
                     </div>
                     <div>
                         <label className="text-xs font-medium text-slate-500 mb-1 block">选择班级</label>
                         <select 
                            value={selectedClass}
                            onChange={e => { setSelectedClass(e.target.value); setSelectedUser(MOCK_USERS[e.target.value as keyof typeof MOCK_USERS]?.[0] || ''); }}
                            className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                         >
                            {MOCK_CLASSES[selectedSchool as keyof typeof MOCK_CLASSES]?.map(c => <option key={c} value={c}>{c}</option>)}
                         </select>
                     </div>
                     <div>
                         <label className="text-xs font-medium text-slate-500 mb-1 block">选择用户</label>
                         <select 
                            value={selectedUser}
                            onChange={e => setSelectedUser(e.target.value)}
                            className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                         >
                            {MOCK_USERS[selectedClass as keyof typeof MOCK_USERS]?.map(u => <option key={u} value={u}>{u}</option>)}
                         </select>
                     </div>
                     
                     {/* Software Env Dropdown */}
                     {activeMenuId === 'soft_op' && (
                       <div>
                           <label className="text-xs font-medium text-slate-500 mb-1 block">软件实验环境</label>
                           <select 
                              value={selectedSoftEnv}
                              onChange={e => setSelectedSoftEnv(e.target.value)}
                              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-blue-600"
                           >
                              {MOCK_SOFT_ENV_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                           </select>
                       </div>
                     )}

                     {/* Hardware Env Dropdown */}
                     {activeMenuId === 'hard_op' && (
                       <div>
                           <label className="text-xs font-medium text-slate-500 mb-1 block">硬件实验环境</label>
                           <select 
                              value={selectedHardEnv}
                              onChange={e => setSelectedHardEnv(e.target.value)}
                              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-orange-600"
                           >
                              {MOCK_HARD_ENV_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                           </select>
                       </div>
                     )}
                  </div>
                  
                  {/* Time Range in separate row */}
                  <div className="pt-4 border-t border-slate-100">
                    <div className="text-xs font-medium text-slate-500 mb-1 block">时间范围</div>
                    <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-200 w-fit">
                       <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="bg-transparent text-sm w-36 outline-none"/>
                       <span className="text-slate-400">-</span>
                       <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="bg-transparent text-sm w-36 outline-none"/>
                    </div>
                  </div>
               </div>

               {/* 3. List Content */}
               <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden min-h-[400px]">
                  {/* ... Tables Logic (Keeping existing) ... */}
                  {/* SOFTWARE OP TABLE */}
                  {activeMenuId === 'soft_op' ? (
                     <div className="overflow-x-auto">
                         <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
                               <tr>
                                  <th className="px-6 py-4 font-bold whitespace-nowrap">时间</th>
                                  <th className="px-6 py-4 font-bold whitespace-nowrap">课程名称</th>
                                  <th className="px-6 py-4 font-bold whitespace-nowrap">章节步骤</th>
                                  <th className="px-6 py-4 font-bold whitespace-nowrap">实验环境</th>
                                  <th className="px-6 py-4 font-bold whitespace-nowrap">实验环境总耗时</th>
                                  <th className="px-6 py-4 font-bold text-center whitespace-nowrap">操作</th>
                               </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                               {MOCK_SOFT_OP_TASKS.map((task) => (
                                  <tr key={task.id} className="hover:bg-slate-50 transition-colors">
                                     <td className="px-6 py-4 font-mono text-xs text-slate-500 whitespace-nowrap">{task.time}</td>
                                     <td className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap">{task.course}</td>
                                     <td className="px-6 py-4 text-slate-600 text-xs whitespace-nowrap">{task.chapter}</td>
                                     <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 rounded text-xs font-bold border ${
                                          task.env === 'ThingsBoard' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                          task.env === '2D虚拟仿真' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                                          task.env === 'Node-Red' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                          'bg-slate-100 text-slate-600 border-slate-200'
                                        }`}>
                                          {task.env}
                                        </span>
                                     </td>
                                     <td className="px-6 py-4 font-mono text-slate-700 whitespace-nowrap">{task.duration}</td>
                                     <td className="px-6 py-4 text-center whitespace-nowrap">
                                        <button 
                                          onClick={() => handleOpenDetail(task)}
                                          className="text-blue-600 hover:text-blue-800 font-medium text-xs flex items-center justify-center gap-1 mx-auto bg-blue-50 px-2 py-1 rounded hover:bg-blue-100 transition-colors"
                                        >
                                           <Eye size={12}/> 查看详情
                                        </button>
                                     </td>
                                  </tr>
                               ))}
                            </tbody>
                         </table>
                     </div>
                  ) : activeMenuId === 'hard_op' ? (
                     // HARDWARE OP TABLE
                     <div className="overflow-x-auto">
                         <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
                               <tr>
                                  <th className="px-6 py-4 font-bold whitespace-nowrap">时间</th>
                                  <th className="px-6 py-4 font-bold whitespace-nowrap">课程名称</th>
                                  <th className="px-6 py-4 font-bold whitespace-nowrap">章节步骤</th>
                                  <th className="px-6 py-4 font-bold whitespace-nowrap">硬件环境</th>
                                  <th className="px-6 py-4 font-bold whitespace-nowrap">实验环境总耗时</th>
                                  <th className="px-6 py-4 font-bold text-center whitespace-nowrap">操作</th>
                               </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                               {MOCK_HARD_OP_TASKS.map((task) => (
                                  <tr key={task.id} className="hover:bg-slate-50 transition-colors">
                                     <td className="px-6 py-4 font-mono text-xs text-slate-500 whitespace-nowrap">{task.time}</td>
                                     <td className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap">{task.course}</td>
                                     <td className="px-6 py-4 text-slate-600 text-xs whitespace-nowrap">{task.chapter}</td>
                                     <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 rounded text-xs font-bold border ${
                                          task.env === 'Lora设备智能体' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                          task.env === '串口终端智能体' ? 'bg-gray-100 text-gray-600 border-gray-200' :
                                          'bg-blue-50 text-blue-600 border-blue-100'
                                        }`}>
                                          {task.env}
                                        </span>
                                     </td>
                                     <td className="px-6 py-4 font-mono text-slate-700 whitespace-nowrap">{task.duration}</td>
                                     <td className="px-6 py-4 text-center whitespace-nowrap">
                                        <button 
                                          onClick={() => handleOpenDetail(task)}
                                          className="text-blue-600 hover:text-blue-800 font-medium text-xs flex items-center justify-center gap-1 mx-auto bg-blue-50 px-2 py-1 rounded hover:bg-blue-100 transition-colors"
                                        >
                                           <Eye size={12}/> 查看详情
                                        </button>
                                     </td>
                                  </tr>
                               ))}
                            </tbody>
                         </table>
                     </div>
                  ) : learningOpSubTab === 'task' ? (
                     // Learning Op Task Table (Existing)
                     <div className="overflow-x-auto">
                         <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
                               <tr>
                                  <th className="px-6 py-4 font-bold whitespace-nowrap">时间</th>
                                  <th className="px-6 py-4 font-bold whitespace-nowrap">课程</th>
                                  <th className="px-6 py-4 font-bold whitespace-nowrap">章节步骤</th>
                                  <th className="px-6 py-4 font-bold whitespace-nowrap">得分</th>
                                  <th className="px-6 py-4 font-bold whitespace-nowrap">耗时</th>
                                  <th className="px-6 py-4 font-bold whitespace-nowrap">状态</th>
                                  <th className="px-6 py-4 font-bold text-center whitespace-nowrap">操作</th>
                               </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                               {MOCK_TASKS.map((task) => (
                                  <tr key={task.id} className="hover:bg-slate-50 transition-colors">
                                     <td className="px-6 py-4 font-mono text-xs text-slate-500 whitespace-nowrap">{task.time}</td>
                                     <td className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap">{task.course}</td>
                                     <td className="px-6 py-4 text-slate-600 text-xs whitespace-nowrap">{task.chapter}</td>
                                     <td className="px-6 py-4 font-bold text-teal-600 whitespace-nowrap">{task.score}</td>
                                     <td className="px-6 py-4 text-slate-500 whitespace-nowrap">{task.duration}</td>
                                     <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">{task.status}</span>
                                     </td>
                                     <td className="px-6 py-4 text-center whitespace-nowrap">
                                        <button 
                                          onClick={() => handleOpenDetail(task)}
                                          className="text-blue-600 hover:text-blue-800 font-medium text-xs flex items-center justify-center gap-1 mx-auto bg-blue-50 px-2 py-1 rounded hover:bg-blue-100 transition-colors"
                                        >
                                           <Eye size={12}/> 查看详情
                                        </button>
                                     </td>
                                  </tr>
                               ))}
                            </tbody>
                         </table>
                     </div>
                  ) : learningOpSubTab === 'auto_score' ? (
                    // Auto Score Table
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                           <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
                              <tr>
                                 <th className="px-6 py-4 font-bold whitespace-nowrap">时间</th>
                                 <th className="px-6 py-4 font-bold whitespace-nowrap">课程</th>
                                 <th className="px-6 py-4 font-bold whitespace-nowrap">章节步骤</th>
                                 <th className="px-6 py-4 font-bold whitespace-nowrap">实验环境</th>
                                 <th className="px-6 py-4 font-bold whitespace-nowrap">得分</th>
                                 <th className="px-6 py-4 font-bold whitespace-nowrap">耗时</th>
                                 <th className="px-6 py-4 font-bold whitespace-nowrap">状态</th>
                                 <th className="px-6 py-4 font-bold text-center whitespace-nowrap">操作</th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-slate-100">
                              {MOCK_AUTO_SCORE_TASKS.map((task) => (
                                 <tr key={task.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-mono text-xs text-slate-500 whitespace-nowrap">{task.time}</td>
                                    <td className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap">{task.course}</td>
                                    <td className="px-6 py-4 text-slate-600 text-xs whitespace-nowrap">{task.chapter}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                       <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs font-bold border border-blue-100">{task.env}</span>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-teal-600 whitespace-nowrap">{task.score}</td>
                                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">{task.duration}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                       <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">{task.status}</span>
                                    </td>
                                    <td className="px-6 py-4 text-center whitespace-nowrap">
                                       <button 
                                         onClick={() => handleOpenDetail(task)}
                                         className="text-blue-600 hover:text-blue-800 font-medium text-xs flex items-center justify-center gap-1 mx-auto bg-blue-50 px-2 py-1 rounded hover:bg-blue-100 transition-colors"
                                       >
                                          <Eye size={12}/> 查看详情
                                       </button>
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                    </div>
                  ) : (
                     // AI List Table (Existing)
                     <div className="overflow-x-auto">
                         <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
                               <tr>
                                  <th className="px-6 py-4 font-bold whitespace-nowrap">{t.process.detail.ai_name}</th>
                                  <th className="px-6 py-4 font-bold whitespace-nowrap">{t.process.detail.last_interact}</th>
                                  <th className="px-6 py-4 font-bold whitespace-nowrap text-center">{t.process.detail.total_interact}</th>
                                  <th className="px-6 py-4 font-bold whitespace-nowrap text-center">操作</th>
                               </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                               {MOCK_AI_ASSISTANTS_LIST.map((ai) => (
                                  <tr key={ai.id} className="hover:bg-slate-50 transition-colors">
                                     <td className="px-6 py-4 font-medium text-slate-800 flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                                           <Brain size={16}/>
                                        </div>
                                        {ai.name}
                                     </td>
                                     <td className="px-6 py-4 font-mono text-xs text-slate-500 whitespace-nowrap">{ai.lastTime}</td>
                                     <td className="px-6 py-4 font-bold text-teal-600 text-center">{ai.count}</td>
                                     <td className="px-6 py-4 text-center whitespace-nowrap">
                                        <button 
                                          onClick={() => handleOpenDetail(ai)}
                                          className="text-purple-600 hover:text-purple-800 font-medium text-xs flex items-center justify-center gap-1 mx-auto bg-purple-50 px-2 py-1 rounded hover:bg-purple-100 transition-colors"
                                        >
                                           <Eye size={12}/> 查看详情
                                        </button>
                                     </td>
                                  </tr>
                               ))}
                            </tbody>
                         </table>
                     </div>
                  )}
               </div>
             </>
          ) : isComplexDashboard ? (
             // Complex Dashboard Logic (Existing)
             <>
               {/* 1. Sub-Category Tabs */}
               {/* ... (Existing Tabs Code) ... */}
               <div className="bg-white p-1 rounded-xl border border-slate-200 shadow-sm flex overflow-x-auto">
                 {/* ... tabs map ... */}
                 {activeMenuId === 'behavior' ? (
                     // Learning Behavior Tabs
                     [
                       { id: 'platform', label: t.process.filters.subCategories.platform, icon: <Layers size={16}/> },
                       { id: 'course', label: t.process.filters.subCategories.course, icon: <BookOpen size={16}/> },
                       { id: 'ai', label: t.process.filters.subCategories.ai, icon: <Brain size={16}/> }
                     ].map(tab => (
                       <button
                         key={tab.id}
                         onClick={() => handleSubTabChange(tab.id)}
                         className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-lg transition-all ${
                           behaviorSubTab === tab.id 
                             ? 'bg-teal-600 text-white shadow-md' 
                             : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                         }`}
                       >
                         {tab.icon} {tab.label}
                       </button>
                     ))
                 ) : activeMenuId === 'soft_exp' ? (
                     // Software Experiment Tabs
                     [
                       { id: 'env', label: t.process.filters.softExpCategories.env, icon: <Monitor size={16}/> },
                       { id: 'agent', label: t.process.filters.softExpCategories.agent, icon: <Cpu size={16}/> }
                     ].map(tab => (
                       <button
                         key={tab.id}
                         onClick={() => handleSoftExpSubTabChange(tab.id)}
                         className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-lg transition-all ${
                           softExpSubTab === tab.id 
                             ? 'bg-teal-600 text-white shadow-md' 
                             : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                         }`}
                       >
                         {tab.icon} {tab.label}
                       </button>
                     ))
                 ) : (
                     // Hardware Experiment Tabs
                     [
                       { id: 'interaction', label: t.process.filters.hardExpCategories.interaction, icon: <Zap size={16}/> },
                       { id: 'capability', label: t.process.filters.hardExpCategories.capability, icon: <Code size={16}/> }
                     ].map(tab => (
                       <button
                         key={tab.id}
                         onClick={() => handleHardExpSubTabChange(tab.id)}
                         className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-lg transition-all ${
                           hardExpSubTab === tab.id 
                             ? 'bg-teal-600 text-white shadow-md' 
                             : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                         }`}
                       >
                         {tab.icon} {tab.label}
                       </button>
                     ))
                 )}
               </div>

               {/* 2. Filter Panel */}
               {/* ... (Existing Filter Panel Code with Agent Selectors moved to top) ... */}
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
                  {/* Top Row */}
                  <div className={`grid grid-cols-1 gap-6 ${showAgentSelector ? 'md:grid-cols-4' : 'md:grid-cols-3'}`}>
                     {/* Agent Selectors */}
                     {showSoftAgentSelector && (
                       <div>
                           <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">选择软件智能体</label>
                           <select 
                              value={selectedSoftAgent}
                              onChange={e => setSelectedSoftAgent(e.target.value)}
                              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                           >
                              {MOCK_SOFT_AGENTS.map(a => <option key={a} value={a}>{a}</option>)}
                           </select>
                       </div>
                     )}
                     
                     {showHardAgentSelector && (
                       <div>
                           <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">选择硬件智能体</label>
                           <select 
                              value={selectedHardAgent}
                              onChange={e => setSelectedHardAgent(e.target.value)}
                              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                           >
                              {MOCK_HARD_AGENTS.map(a => <option key={a} value={a}>{a}</option>)}
                           </select>
                       </div>
                     )}

                     {/* Metric Selector */}
                     <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">{t.process.filters.metric}</label>
                        <select 
                           value={metric} 
                           onChange={e => setMetric(e.target.value)}
                           className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                        >
                           {/* ... options ... */}
                           {activeMenuId === 'behavior' && behaviorSubTab === 'platform' && Object.entries(t.process.filters.metrics_platform).map(([k, v]) => (
                             <option key={k} value={k}>{v as string}</option>
                           ))}
                           {activeMenuId === 'behavior' && behaviorSubTab === 'course' && Object.entries(t.process.filters.metrics_course).map(([k, v]) => (
                             <option key={k} value={k}>{v as string}</option>
                           ))}
                           {activeMenuId === 'behavior' && behaviorSubTab === 'ai' && Object.entries(t.process.filters.metrics_ai).map(([k, v]) => (
                             <option key={k} value={k}>{v as string}</option>
                           ))}
                           {activeMenuId === 'soft_exp' && softExpSubTab === 'env' && Object.entries(t.process.filters.metrics_soft_env).map(([k, v]) => (
                             <option key={k} value={k}>{v as string}</option>
                           ))}
                           {activeMenuId === 'soft_exp' && softExpSubTab === 'agent' && Object.entries(t.process.filters.metrics_soft_agent).map(([k, v]) => (
                             <option key={k} value={k}>{v as string}</option>
                           ))}
                           {activeMenuId === 'hard_exp' && hardExpSubTab === 'interaction' && Object.entries(t.process.filters.metrics_hard_interaction).map(([k, v]) => (
                             <option key={k} value={k}>{v as string}</option>
                           ))}
                           {activeMenuId === 'hard_exp' && hardExpSubTab === 'capability' && Object.entries(t.process.filters.metrics_hard_capability).map(([k, v]) => (
                             <option key={k} value={k}>{v as string}</option>
                           ))}
                        </select>
                     </div>
                     
                     {/* Data Dimension */}
                     <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">{t.process.filters.data_dim}</label>
                        <select 
                           value={dimension} 
                           onChange={e => setDimension(e.target.value)}
                           className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                        >
                           <option value="school">{t.process.filters.dims.school}</option>
                           <option value="class">{t.process.filters.dims.class}</option>
                           <option value="user">{t.process.filters.dims.user}</option>
                           
                           {/* Course dimension logic */}
                           {(
                               (activeMenuId === 'behavior' && behaviorSubTab !== 'platform') || 
                               (activeMenuId === 'soft_exp') ||
                               (activeMenuId === 'hard_exp')
                           ) && (
                               <option value="course">{t.process.filters.dims.course}</option>
                           )}
                        </select>
                     </div>
                     
                     {/* Time Dimension */}
                     <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">{t.process.filters.time_dim}</label>
                        <select 
                           value={timeGranularity} 
                           onChange={e => setTimeGranularity(e.target.value)}
                           className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                        >
                           {/* Add Hour for AI/Agent-related things */}
                           {((activeMenuId === 'behavior' && behaviorSubTab === 'ai') || 
                             (activeMenuId === 'soft_exp' && softExpSubTab !== 'env') ||
                             (activeMenuId === 'hard_exp')) && 
                             <option value="hour">{t.process.filters.times.hour}</option>
                           }
                           <option value="day">{t.process.filters.times.day}</option>
                           <option value="month">{t.process.filters.times.month}</option>
                           <option value="year">{t.process.filters.times.year}</option>
                        </select>
                     </div>
                  </div>

                  {/* Second Row: Specific Selection & Date Range */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4 border-t border-slate-100">
                     {/* Dynamic Selectors */}
                     {(dimension === 'school' || dimension === 'class' || dimension === 'user') && (
                        <div>
                           <label className="text-xs font-medium text-slate-500 mb-1 block">选择学校</label>
                           <select 
                              value={selectedSchool}
                              onChange={e => { setSelectedSchool(e.target.value); setSelectedClass(''); }}
                              className="w-full p-2 bg-white border border-slate-300 rounded text-sm"
                           >
                              {MOCK_SCHOOLS.map(s => <option key={s} value={s}>{s}</option>)}
                           </select>
                        </div>
                     )}
                     {(dimension === 'class' || dimension === 'user') && (
                        <div>
                           <label className="text-xs font-medium text-slate-500 mb-1 block">选择班级</label>
                           <select 
                              value={selectedClass}
                              onChange={e => { setSelectedClass(e.target.value); setSelectedUser(''); }}
                              className="w-full p-2 bg-white border border-slate-300 rounded text-sm"
                           >
                              <option value="">请选择班级...</option>
                              {MOCK_CLASSES[selectedSchool as keyof typeof MOCK_CLASSES]?.map(c => <option key={c} value={c}>{c}</option>)}
                           </select>
                        </div>
                     )}
                     {dimension === 'user' && (
                        <div>
                           <label className="text-xs font-medium text-slate-500 mb-1 block">选择用户</label>
                           <select 
                              value={selectedUser}
                              onChange={e => setSelectedUser(e.target.value)}
                              className="w-full p-2 bg-white border border-slate-300 rounded text-sm"
                           >
                              <option value="">请选择用户...</option>
                              {MOCK_USERS[selectedClass as keyof typeof MOCK_USERS]?.map(u => <option key={u} value={u}>{u}</option>)}
                           </select>
                        </div>
                     )}
                     {dimension === 'course' && (
                        <div>
                           <label className="text-xs font-medium text-slate-500 mb-1 block">选择课程</label>
                           <select 
                              value={selectedCourse}
                              onChange={e => setSelectedCourse(e.target.value)}
                              className="w-full p-2 bg-white border border-slate-300 rounded text-sm"
                           >
                              {MOCK_COURSES.map(c => <option key={c} value={c}>{c}</option>)}
                           </select>
                        </div>
                     )}
                  </div>

                  {/* Date Range Inputs */}
                  <div className="flex gap-4 items-center bg-slate-50 p-3 rounded-lg w-fit">
                     <span className="text-sm font-medium text-slate-600">时间范围:</span>
                     <input 
                        type="date" 
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                        className="border border-slate-300 rounded px-2 py-1 text-sm"
                     />
                     <span className="text-slate-400">-</span>
                     <input 
                        type="date" 
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                        className="border border-slate-300 rounded px-2 py-1 text-sm"
                     />
                  </div>
               </div>

               {/* 3. Chart Display */}
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 min-h-[400px]">
                  <div className="flex justify-between items-center mb-6">
                     <h3 className="font-bold text-slate-700">统计趋势图</h3>
                     <div className="flex bg-slate-100 p-1 rounded-lg">
                        {['bar', 'line', 'table'].map(type => (
                           <button 
                              key={type}
                              onClick={() => setChartType(type)}
                              className={`px-3 py-1.5 text-xs font-bold rounded transition-all ${chartType === type ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                           >
                              {t.process.chart[type as keyof typeof t.process.chart]}
                           </button>
                        ))}
                     </div>
                  </div>
                  
                  {chartType === 'table' ? (
                     <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                           <thead className="bg-slate-50 text-slate-700">
                              <tr>
                                 <th className="px-4 py-3 rounded-tl-lg">时间点</th>
                                 <th className="px-4 py-3 rounded-tr-lg">数值</th>
                              </tr>
                           </thead>
                           <tbody>
                              {chartData.map((row, i) => (
                                 <tr key={i} className="border-b border-slate-50">
                                    <td className="px-4 py-3 font-mono text-slate-600">{row.name}</td>
                                    <td className="px-4 py-3 font-bold text-teal-600">{row.value}</td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                  ) : (
                     <DynamicProcessChart data={chartData} type={chartType as 'bar'|'line'} color="#0d9488" />
                  )}
               </div>
             </>
          ) : (
             // Placeholder for other menus with simple tables
             <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-h-[500px]">
                <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                   <h3 className="font-bold text-slate-700">详细数据列表</h3>
                   <button className="text-xs text-teal-600 hover:underline">下载CSV</button>
                </div>
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-white text-slate-700 border-b border-slate-200">
                    <tr>
                      {getTableColumns().map((col, i) => (
                        <th key={i} className="px-6 py-4 font-bold">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[1,2,3,4,5,6,7,8].map((_, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-mono text-xs">
                          {activeMenuId.includes('exp') ? `实验-${i+1}` : `2023-11-28 10:0${i}`}
                        </td>
                        <td className="px-6 py-4 font-medium">
                          {activeMenuId.includes('exp') ? `1${i}/20` : '李明'}
                        </td>
                        <td className="px-6 py-4">
                          {activeMenuId.includes('soft') ? '代码错误 - 语法异常' : '端口连接超时'}
                        </td>
                        <td className="px-6 py-4 text-slate-500">
                           {activeMenuId.includes('exp') ? '30s' : '详细日志...'}
                        </td>
                        <td className="px-6 py-4">
                           <span className={`px-2 py-1 rounded text-xs font-bold ${i%3===0 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                              {i%3===0 ? '失败' : '成功'}
                           </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-center">
                   <span className="text-xs text-slate-400">显示 1-8 条，共 124 条数据</span>
                </div>
             </div>
          )}
       </div>
    </div>
  );
};

export default ProcessData;
