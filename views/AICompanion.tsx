
import React, { useState } from 'react';
import { Zap, CheckCircle, MessageSquare, Clock, Activity, Settings, Compass, Building2, Cpu, Award, Brain, AlertCircle, Share2, ThumbsUp, Star, Calendar, Flame, Code, User, GraduationCap, X } from 'lucide-react';
import { Language } from '../types';
import { TEXT, AVATARS } from '../constants';

const AICompanion: React.FC<{ language: Language }> = ({ language }) => {
  const t = TEXT[language];
  const [showConfigModal, setShowConfigModal] = useState(true); 
  const [companionConfig, setCompanionConfig] = useState({ 
    nickname: 'User123', 
    personality: '知性 (理性客观)', 
    role: '学姐 (耐心细致)',
    avatar: AVATARS[0].src,
    customPrompt: ''
  });
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{sender: 'user'|'ai', text: string}[]>([]);
  
  // Reuse ranking data locally or import if large
  const getRankingData = (lang: Language) => ({
    skill: [
      { rank: 1, name: lang === 'zh' ? '智慧园区' : 'Smart Park', count: 98 },
      { rank: 2, name: lang === 'zh' ? '嵌入式开发' : 'Embedded Dev', count: 95 },
      { rank: 3, name: lang === 'zh' ? 'Python基础' : 'Python Basic', count: 88 },
    ],
    hard: [
      { rank: 1, name: lang === 'zh' ? '串口助手' : 'Serial Port', count: 92 },
      { rank: 2, name: lang === 'zh' ? 'LoRa终端' : 'LoRa Term', count: 89 },
      { rank: 3, name: lang === 'zh' ? '虚拟示波器' : 'Oscilloscope', count: 85 },
    ],
    soft: [
      { rank: 1, name: lang === 'zh' ? '虚拟仿真' : 'Virtual Sim', count: 96 },
      { rank: 2, name: lang === 'zh' ? '在线编译器' : 'Web Compiler', count: 90 },
      { rank: 3, name: lang === 'zh' ? '代码检视' : 'Code Review', count: 82 },
    ]
  });
  const rankingData = getRankingData(language);

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatHistory([...chatHistory, { sender: 'user', text: userMsg }]);
    setChatInput('');
    setTimeout(() => {
      setChatHistory(prev => [...prev, { 
        sender: 'ai', 
        text: language === 'zh' 
          ? `收到你的消息: "${userMsg}"。作为你的${companionConfig.role.split(' ')[0]}，我时刻准备着协助你的学习。` 
          : `Received: "${userMsg}". As your ${companionConfig.role.split(' ')[0]}, I am ready to assist.`
      }]);
    }, 1000);
  };

  // Determine background style based on role for "anthropomorphic" feel
  const getBgGradient = () => {
      const r = companionConfig.role.split(' ')[0];
      if (r.includes('学长')) return 'bg-gradient-to-b from-blue-50/50 to-slate-50';
      if (r.includes('学姐')) return 'bg-gradient-to-b from-pink-50/50 to-slate-50';
      if (r.includes('教师')) return 'bg-gradient-to-b from-amber-50/50 to-slate-50';
      return 'bg-slate-50';
  }

  // Determine a large background icon based on role
  const getBgIcon = () => {
      const r = companionConfig.role.split(' ')[0];
      if (r.includes('学长')) return <User size={400} className="text-blue-100 opacity-50" />;
      if (r.includes('学姐')) return <User size={400} className="text-pink-100 opacity-50" />;
      if (r.includes('教师')) return <GraduationCap size={400} className="text-amber-100 opacity-50" />;
      return <Brain size={400} className="text-slate-100 opacity-50" />;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 animate-fade-in min-h-screen flex flex-col gap-6">
      {/* Settings Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden transform transition-all scale-100 flex flex-col max-h-[90vh]">
              <div className="bg-teal-600 p-6 text-white text-center shrink-0 relative">
                <button onClick={() => setShowConfigModal(false)} className="absolute top-4 right-4 hover:bg-white/20 p-1 rounded-full transition-colors">
                  <X size={24} />
                </button>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap size={32} />
                </div>
                <h3 className="text-xl font-bold">{t.companion.config.title}</h3>
              </div>
              <div className="p-8 space-y-6 overflow-y-auto custom-scrollbar">
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-2">{t.companion.config.nickname}</label>
                  <input 
                    type="text" 
                    value={companionConfig.nickname}
                    onChange={e => setCompanionConfig({...companionConfig, nickname: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                  />
                </div>
                {/* Avatar Selection - Expanded Grid */}
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-2">{t.companion.config.avatar} (50个可选)</label>
                  <div className="grid grid-cols-5 sm:grid-cols-10 gap-3 max-h-[200px] overflow-y-auto p-2 border border-slate-100 rounded-xl custom-scrollbar">
                      {AVATARS.map(ava => (
                        <div 
                          key={ava.id} 
                          onClick={() => setCompanionConfig({...companionConfig, avatar: ava.src})}
                          className={`cursor-pointer rounded-xl p-1 border-2 transition-all ${companionConfig.avatar === ava.src ? 'border-teal-500 scale-110 shadow-md bg-teal-50' : 'border-transparent hover:border-slate-200'}`}
                        >
                          <img src={ava.src} alt={ava.label} className="w-full h-full rounded-lg bg-white" />
                        </div>
                      ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700 block mb-2">{t.companion.config.personality}</label>
                      <select 
                        value={companionConfig.personality}
                        onChange={e => setCompanionConfig({...companionConfig, personality: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:ring-2 focus:ring-teal-500"
                      >
                        {t.companion.config.p_options.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 block mb-2">{t.companion.config.role}</label>
                      <select 
                        value={companionConfig.role}
                        onChange={e => setCompanionConfig({...companionConfig, role: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:ring-2 focus:ring-teal-500"
                      >
                        {t.companion.config.r_options.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                </div>

                {/* Custom System Prompt - New Section */}
                <div>
                   <div className="flex justify-between items-center mb-2">
                     <label className="text-sm font-medium text-slate-700 block">
                       {t.companion.config.custom_prompt} <span className="text-slate-400 font-normal ml-1">(可选)</span>
                     </label>
                     <span className={`text-[10px] font-bold ${companionConfig.customPrompt.length >= 100 ? 'text-red-500' : 'text-slate-400'}`}>
                        {companionConfig.customPrompt.length} / 100
                     </span>
                   </div>
                   <textarea 
                     value={companionConfig.customPrompt}
                     onChange={e => setCompanionConfig({...companionConfig, customPrompt: e.target.value.substring(0, 100)})}
                     placeholder={t.companion.config.custom_prompt_placeholder}
                     rows={3}
                     className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none resize-none transition-all"
                   />
                </div>

                <button 
                  onClick={() => setShowConfigModal(false)}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-black py-4 rounded-xl shadow-lg shadow-teal-500/30 transition-all transform hover:-translate-y-0.5"
                >
                  {t.companion.config.save}
                </button>
              </div>
          </div>
        </div>
      )}

      {/* --- Top Row: Stats (Full Width) --- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: t.companion.stats.help_count, val: '120', color: 'text-blue-600', icon: <CheckCircle className="text-blue-600 opacity-20" size={48} /> },
            { label: t.companion.stats.questions, val: '45', color: 'text-purple-600', icon: <MessageSquare className="text-purple-600 opacity-20" size={48} /> },
            { label: t.companion.stats.time, val: '12h', color: 'text-orange-600', icon: <Clock className="text-orange-600 opacity-20" size={48} /> },
            { label: t.companion.stats.volume, val: '450', color: 'text-teal-600', icon: <Activity className="text-teal-600 opacity-20" size={48} /> },
          ].map((s, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="relative z-10">
                <div className={`text-3xl font-bold ${s.color} mb-1`}>{s.val}</div>
                <div className="text-sm text-slate-500 font-medium">{s.label}</div>
              </div>
              <div className="absolute right-0 bottom-0 p-2 transform group-hover:scale-110 transition-transform">{s.icon}</div>
            </div>
          ))}
      </div>

      {/* --- Main Content Grid --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        
        {/* Left Column (3/12): Profile & Status */}
        <div className="lg:col-span-3 space-y-6 flex flex-col">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center relative">
              <button onClick={() => setShowConfigModal(true)} className="absolute top-4 right-4 text-slate-400 hover:text-teal-600 transition-colors">
                <Settings size={18} />
              </button>
              <div className="w-24 h-24 rounded-full mx-auto mb-4 p-1 border-4 border-teal-50 shadow-lg relative bg-white">
                <img src={companionConfig.avatar} alt="Avatar" className="w-full h-full rounded-full bg-slate-100" />
                <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-1">{companionConfig.nickname}</h3>
              <div className="flex justify-center gap-2 mb-4 flex-wrap">
                <span className="bg-teal-50 text-teal-700 text-xs px-2 py-1 rounded-full border border-teal-100">{companionConfig.role.split(' ')[0]}</span>
                <span className="bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded-full border border-purple-100">{companionConfig.personality.split(' ')[0]}</span>
              </div>
              <p className="text-slate-500 text-xs italic">"Learning is a journey, not a destination."</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex-1">
              <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Compass size={20} className="text-teal-500" /> {t.companion.paths.title}
              </h3>
              
              <div className="space-y-6">
                <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">{t.companion.paths.courses}</h4>
                    <div className="space-y-4">
                      <div className="group border border-slate-100 rounded-xl p-3 hover:shadow-md transition-all bg-slate-50/50">
                          <div className="flex gap-3 mb-2">
                            <div className="w-12 h-12 rounded-lg bg-teal-100 shrink-0 flex items-center justify-center">
                                <Building2 className="text-teal-600" size={24} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h5 className="font-bold text-slate-800 text-sm truncate">{t.companion.paths.smart_park}</h5>
                                <div className="flex justify-between items-center mt-1">
                                  <span className="text-xs text-slate-500">Progress</span>
                                  <span className="text-xs font-bold text-teal-600">80%</span>
                                </div>
                            </div>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden mb-3">
                            <div className="bg-teal-500 h-1.5 rounded-full" style={{ width: '80%' }}></div>
                          </div>
                          <button className="w-full text-xs bg-teal-500 text-white py-1.5 rounded-lg hover:bg-teal-600 transition-colors font-medium">
                            {t.companion.paths.status.continuing}
                          </button>
                      </div>
                      <div className="group border border-slate-100 rounded-xl p-3 hover:shadow-md transition-all bg-slate-50/50">
                          <div className="flex gap-3 mb-2">
                            <div className="w-12 h-12 rounded-lg bg-orange-100 shrink-0 flex items-center justify-center">
                                <Cpu className="text-orange-600" size={24} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h5 className="font-bold text-slate-800 text-sm truncate">{t.companion.paths.embedded}</h5>
                                <div className="flex justify-between items-center mt-1">
                                  <span className="text-xs text-slate-500">Progress</span>
                                  <span className="text-xs font-bold text-orange-600">20%</span>
                                </div>
                            </div>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden mb-3">
                            <div className="bg-orange-400 h-1.5 rounded-full" style={{ width: '20%' }}></div>
                          </div>
                          <button className="w-full text-xs bg-orange-500 text-white py-1.5 rounded-lg hover:bg-orange-600 transition-colors font-medium">
                            {t.companion.paths.status.continuing}
                          </button>
                      </div>
                    </div>
                </div>

                <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">{t.companion.paths.exams}</h4>
                    <div className="border border-red-100 rounded-xl p-3 bg-red-50/30 hover:shadow-md transition-all relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-bl-lg font-bold">
                          3 {t.companion.paths.days_left}
                      </div>
                      <div className="flex gap-3 mb-2 pt-2">
                          <div className="w-12 h-12 rounded-lg bg-red-100 shrink-0 flex items-center justify-center">
                            <Award className="text-red-600" size={24} />
                          </div>
                          <div className="flex-1">
                            <h5 className="font-bold text-slate-800 text-sm">{t.companion.paths.python_cert}</h5>
                            <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                                <Clock size={10} /> {t.companion.paths.start_time}: 12/01
                            </div>
                          </div>
                      </div>
                      <button className="w-full text-xs border border-red-200 text-red-600 py-1.5 rounded-lg hover:bg-red-50 transition-colors font-medium mt-1">
                          {t.companion.paths.status.exam}
                      </button>
                    </div>
                </div>
              </div>
          </div>
        </div>

        {/* Center Column (6/12): Chat Interface */}
        <div className="lg:col-span-6 h-[600px] lg:h-auto flex flex-col">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col h-full overflow-hidden relative">
            {/* Header - Updated with Recent Time instead of icon */}
            <div className="p-4 border-b border-slate-100 bg-white/90 backdrop-blur-sm flex justify-between items-center z-10 sticky top-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 border border-teal-200">
                    <Brain size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-700 flex items-center gap-2">
                      {t.companion.chat.header}
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                    </div>
                    <div className="text-xs text-slate-500">{companionConfig.role.split(' ')[0]} - {companionConfig.personality.split(' ')[0]}</div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                   <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">{t.companion.chat.recent}</div>
                   <div className="text-xs text-slate-600 font-mono flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                      <Clock size={12} className="text-teal-500"/> {new Date().getHours().toString().padStart(2, '0')}:{new Date().getMinutes().toString().padStart(2, '0')}
                   </div>
                </div>
            </div>
            
            {/* Chat Area with Anthropomorphic Background */}
            <div className={`flex-1 overflow-y-auto p-6 space-y-6 relative ${getBgGradient()}`}>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                  <div className="transform translate-y-12 blur-sm">
                    {getBgIcon()}
                  </div>
                </div>

                {chatHistory.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-4 relative z-10">
                    <div className="w-20 h-20 bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center animate-pulse shadow-sm border border-white">
                      <MessageSquare size={32} className="opacity-60 text-slate-600" />
                    </div>
                    <p className="text-sm font-medium bg-white/40 px-4 py-2 rounded-full backdrop-blur-sm">{t.companion.chat.placeholder}</p>
                  </div>
                )}
                {chatHistory.map((msg, idx) => (
                  <div key={idx} className={`flex gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : ''} animate-fade-in relative z-10`}>
                      {msg.sender === 'user' ? (
                        <div className="w-10 h-10 rounded-full flex-shrink-0 shadow-sm border-2 border-white overflow-hidden">
                            <img src={companionConfig.avatar} alt="User" className="w-full h-full bg-slate-200" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm bg-teal-600 text-white border-2 border-white">
                            <Brain size={16} />
                        </div>
                      )}
                      <div className={`p-4 rounded-2xl text-sm max-w-[80%] shadow-sm ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white/90 backdrop-blur-sm border border-white text-slate-800 rounded-tl-none'}`}>
                        {msg.text}
                      </div>
                  </div>
                ))}
            </div>
            
            <div className="p-4 bg-white border-t border-slate-100 z-10">
              <div className="flex gap-3 items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-teal-500/50 focus-within:border-teal-500 transition-all shadow-sm">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleChatSend()}
                  className="flex-1 bg-transparent border-none text-slate-700 focus:outline-none placeholder-slate-400"
                  placeholder="Ask anything..." 
                />
                <button 
                  onClick={handleChatSend} 
                  className={`p-2 rounded-lg transition-all ${chatInput.trim() ? 'bg-teal-600 text-white shadow-md hover:bg-teal-700' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                  disabled={!chatInput.trim()}
                >
                  <Share2 size={18} className={chatInput.trim() ? '' : 'rotate-90'} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (3/12): Feedback, Tasks, Rankings */}
        <div className="lg:col-span-3 space-y-6 flex flex-col h-full overflow-y-auto pr-1">
          
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group shrink-0">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                <ThumbsUp size={100} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-white/20 p-1.5 rounded-lg backdrop-blur-sm"><Star size={16} className="text-yellow-300 fill-current"/></div>
                  <h3 className="font-bold text-xs uppercase tracking-wide opacity-90">{companionConfig.nickname} {t.companion.feedback.title}</h3>
                </div>
                <h4 className="font-bold text-2xl mb-2">{t.companion.feedback.great}</h4>
                <p className="text-indigo-100 text-sm leading-relaxed mb-4">
                  {t.companion.feedback.content}
                </p>
              </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 shrink-0">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Calendar size={20} className="text-teal-500" /> {t.companion.tasks.title}
              </h3>
              <div className="space-y-4">
                {[
                  { txt: t.companion.tasks.t1, done: true },
                  { txt: t.companion.tasks.t2, done: false },
                  { txt: t.companion.tasks.t3, done: false },
                ].map((task, i) => (
                  <div key={i} className="flex items-start justify-between gap-2 group">
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${task.done ? 'bg-teal-500 border-teal-500' : 'border-slate-300'}`}>
                        {task.done && <CheckCircle size={12} className="text-white" />}
                      </div>
                      <span className={`text-sm ${task.done ? 'text-slate-400 line-through' : 'text-slate-700 font-medium'}`}>{task.txt}</span>
                    </div>
                    {!task.done && (
                      <button className="text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100 font-bold whitespace-nowrap">
                          {t.companion.tasks.continue}
                      </button>
                    )}
                  </div>
                ))}
              </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex-1 flex flex-col">
              <div className="mb-4">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <Award size={20} className="text-yellow-500" /> {t.companion.rank.title}
                </h3>
              </div>
              
              <div className="flex-1 space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider flex items-center gap-1"><Zap size={10}/> {t.companion.rank.skill_assist}</h4>
                  <div className="flex justify-between text-[10px] text-slate-400 mb-2 px-1">
                      <span>{t.companion.rank.col_name}</span>
                      <span>{t.companion.rank.col_count}</span>
                  </div>
                  <ul className="space-y-2">
                      {rankingData.skill.map((item, idx) => (
                        <li key={idx} className="flex justify-between items-center text-sm border-b border-slate-50 pb-1 last:border-0">
                            <div className="flex items-center gap-2">
                              <span className={`w-4 h-4 flex items-center justify-center rounded text-[10px] font-bold ${idx===0?'bg-yellow-100 text-yellow-700':idx===1?'bg-slate-200 text-slate-600':'bg-orange-100 text-orange-700'}`}>{item.rank}</span>
                              <span className="text-slate-700 font-medium truncate max-w-[100px]">{item.name}</span>
                            </div>
                            <div className="flex items-center gap-1 text-slate-500 text-xs">
                              <Flame size={10} className="text-red-400 fill-current" />
                              {item.count}
                            </div>
                        </li>
                      ))}
                  </ul>
                </div>
                {/* Hardware */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider flex items-center gap-1"><Cpu size={10}/> {t.companion.rank.hardware}</h4>
                  <ul className="space-y-2">
                      {rankingData.hard.map((item, idx) => (
                        <li key={idx} className="flex justify-between items-center text-sm border-b border-slate-50 pb-1 last:border-0">
                            <div className="flex items-center gap-2">
                              <span className={`w-4 h-4 flex items-center justify-center rounded text-[10px] font-bold ${idx===0?'bg-yellow-100 text-yellow-700':idx===1?'bg-slate-200 text-slate-600':'bg-orange-100 text-orange-700'}`}>{item.rank}</span>
                              <span className="text-slate-700 font-medium truncate max-w-[100px]">{item.name}</span>
                            </div>
                            <div className="flex items-center gap-1 text-slate-500 text-xs">
                              <Flame size={10} className="text-red-400 fill-current" />
                              {item.count}
                            </div>
                        </li>
                      ))}
                  </ul>
                </div>
                {/* Software */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider flex items-center gap-1"><Code size={10}/> {t.companion.rank.software}</h4>
                  <ul className="space-y-2">
                      {rankingData.soft.map((item, idx) => (
                        <li key={idx} className="flex justify-between items-center text-sm border-b border-slate-50 pb-1 last:border-0">
                            <div className="flex items-center gap-2">
                              <span className={`w-4 h-4 flex items-center justify-center rounded text-[10px] font-bold ${idx===0?'bg-yellow-100 text-yellow-700':idx===1?'bg-slate-200 text-slate-600':'bg-orange-100 text-orange-700'}`}>{item.rank}</span>
                              <span className="text-slate-700 font-medium truncate max-w-[100px]">{item.name}</span>
                            </div>
                            <div className="flex items-center gap-1 text-slate-500 text-xs">
                              <Flame size={10} className="text-red-400 fill-current" />
                              {item.count}
                            </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AICompanion;
