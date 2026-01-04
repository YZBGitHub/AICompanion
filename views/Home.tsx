
import React from 'react';
import { 
  Users, MessageSquare, BookOpen, Cpu, Layout, Brain, Database, 
  ArrowUp, Heart, TrendingUp, Network, Microscope, GraduationCap, 
  Server, Globe, Landmark, Target, Share2, Briefcase, CheckCircle, 
  BarChart2, ChevronRight, Layers, Zap, ShieldCheck, 
  MousePointerClick, Sparkles, Building2, Quote
} from 'lucide-react';
import { UserRole, Language } from '../types';
import { TEXT } from '../constants';

interface HomeProps {
  language: Language;
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const Home: React.FC<HomeProps> = ({ language, currentRole, onRoleChange }) => {
  const t = TEXT[language];

  return (
    <div className="animate-fade-in pb-12">
      {/* 1. 顶部 Banner */}
      <div className="relative bg-slate-900 text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900 via-slate-900 to-indigo-900 opacity-95"></div>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#2dd4bf 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-teal-500/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 px-4 py-1.5 rounded-full mb-8 backdrop-blur-sm">
              <Sparkles size={16} className="text-teal-400" />
              <span className="text-teal-400 text-sm font-bold tracking-wider uppercase">{t.home.hero_vision}</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black mb-8 tracking-tight leading-tight">
               <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-200 via-white to-indigo-100">
                  {t.home.hero_title}
               </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 max-w-4xl mx-auto mb-12 font-medium leading-relaxed">
              {t.home.hero_subtitle}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              {currentRole === UserRole.VISITOR && (
                <button 
                  onClick={() => onRoleChange(UserRole.STUDENT)} 
                  className="bg-teal-500 hover:bg-teal-400 text-white px-10 py-4 rounded-full font-black shadow-2xl shadow-teal-500/20 transition-all transform hover:-translate-y-1 flex items-center gap-2 text-lg"
                >
                  立即开启 AI 伴学之旅 <ChevronRight size={20} />
                </button>
              )}
              <button className="bg-white/5 hover:bg-white/10 text-white border border-white/20 backdrop-blur-md px-10 py-4 rounded-full font-bold transition-all text-lg">
                了解 SDT 理论架构
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 统计模块 */}
      <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-20 mb-24">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
          {[
            { label: t.home.stats.users, val: '1,234,375', icon: <Users size={20} className="text-blue-500" /> },
            { label: t.home.stats.answers, val: '129,999+', icon: <MessageSquare size={20} className="text-green-500" /> },
            { label: t.home.stats.dialogs, val: '13,434', icon: <MessageSquare size={20} className="text-purple-500" /> },
            { label: t.home.stats.courses, val: '80+', icon: <BookOpen size={20} className="text-orange-500" /> },
            { label: t.home.stats.media, val: '100+', icon: <Cpu size={20} className="text-teal-500" /> },
          ].map((stat, i) => (
            <div key={i} className="text-center p-4 hover:bg-slate-50/50 rounded-2xl transition-all group">
              <div className="flex justify-center mb-3 bg-slate-100 group-hover:bg-white w-12 h-12 rounded-2xl items-center mx-auto shadow-sm transition-colors">{stat.icon}</div>
              <div className="text-2xl font-black text-slate-800 mb-1">{stat.val}</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. 产品定位 */}
      <div className="max-w-7xl mx-auto px-6 mb-32">
         <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 p-8 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <Target size={300} />
            </div>
            <div className="flex items-center gap-3 mb-10">
               <div className="p-3 bg-teal-100 rounded-2xl text-teal-700 shadow-inner"><Target size={28}/></div>
               <h2 className="text-3xl font-black text-slate-800">{t.intro.position.title}</h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                 <h3 className="text-2xl font-bold text-teal-700 mb-6">{t.intro.position.main}</h3>
                 <p className="text-slate-600 leading-loose mb-10 text-xl font-medium">
                   {t.intro.position.desc}
                 </p>
                 <button className="bg-teal-50 text-teal-700 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-teal-100 transition-all border border-teal-100">
                   了解我们的愿景与使命 <Share2 size={18} />
                 </button>
              </div>
              <div className="bg-gradient-to-br from-slate-100 to-white rounded-[2rem] aspect-video flex flex-col items-center justify-center border border-slate-200 shadow-inner group p-8">
                <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Brain size={40} className="text-teal-600" />
                </div>
                <div className="text-center">
                  <div className="text-xl font-black text-slate-800 mb-2">AI 驱动 · 技能全过程</div>
                  <div className="text-sm text-slate-500 font-medium">从“技能评估”到“岗位推荐”的闭环系统</div>
                </div>
              </div>
            </div>
         </div>
      </div>

      {/* 4. 产品架构 */}
      <div className="max-w-6xl mx-auto px-6 mb-32">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-widest mb-4">Architecture</div>
          <h2 className="text-4xl font-black text-slate-800 mb-6">{t.home.architecture}</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">{t.home.arch_desc}</p>
        </div>
        
        <div className="relative">
          <div className="absolute left-10 md:left-[3.25rem] top-8 bottom-8 w-1.5 bg-gradient-to-b from-purple-100 via-teal-100 to-slate-100 -z-10 rounded-full"></div>
          <div className="space-y-12">
             {[
               { layer: 4, icon: <Layout />, color: 'purple', text: t.home.layers.l4 },
               { layer: 3, icon: <Brain />, color: 'teal', text: t.home.layers.l3 },
               { layer: 2, icon: <Cpu />, color: 'blue', text: t.home.layers.l2 },
               { layer: 1, icon: <Database />, color: 'slate', text: t.home.layers.l1 },
             ].map((l) => (
               <div key={l.layer} className="group relative">
                 <div className="flex flex-col md:flex-row gap-8 items-stretch">
                    <div className={`w-full md:w-1/3 bg-white p-8 rounded-3xl shadow-lg border-l-8 border-${l.color}-500 flex items-center gap-6 hover:shadow-2xl transition-all z-10`}>
                      <div className={`w-16 h-16 bg-${l.color}-50 rounded-2xl flex items-center justify-center text-${l.color}-600 shrink-0 shadow-inner group-hover:rotate-6 transition-transform`}>
                        {React.cloneElement(l.icon as React.ReactElement<any>, { size: 32 })}
                      </div>
                      <div>
                        <div className={`text-xs font-black text-${l.color}-500 uppercase tracking-widest mb-1`}>Layer 0{l.layer}</div>
                        <h3 className="text-xl font-bold text-slate-800">{l.text.title}</h3>
                      </div>
                    </div>
                    <div className={`w-full md:w-2/3 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-center group-hover:border-${l.color}-200 transition-colors`}>
                       <p className="text-slate-700 font-bold text-lg mb-4">{l.text.desc}</p>
                       <div className="flex flex-wrap gap-2">
                          {l.text.tags.map((tag: string, i: number) => (
                             <span key={i} className={`bg-${l.color}-50 text-${l.color}-700 px-4 py-1.5 rounded-xl text-xs font-black border border-${l.color}-100`}>{tag}</span>
                          ))}
                       </div>
                    </div>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* 5. 核心理论 */}
      <div className="max-w-7xl mx-auto px-6 mb-32">
        <div className="bg-slate-900 rounded-[3rem] p-8 md:p-20 text-white relative overflow-hidden shadow-3xl">
           <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-teal-500 rounded-full blur-[120px]"></div>
              <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500 rounded-full blur-[120px]"></div>
           </div>

           <div className="relative z-10">
              <div className="text-center mb-16">
                 <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full mb-6">
                    <ShieldCheck size={16} className="text-teal-400" />
                    <span className="text-teal-400 text-xs font-black tracking-widest uppercase">Theoretic Foundation</span>
                 </div>
                 <h2 className="text-3xl md:text-5xl font-black mb-6">{t.home.sdt.title}</h2>
                 <p className="text-slate-400 max-w-3xl mx-auto text-lg leading-relaxed font-medium">
                    {t.home.sdt.vision_desc}
                 </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-20">
                 <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-all group">
                    <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform shadow-inner border border-blue-500/30">
                       <MousePointerClick size={28} />
                    </div>
                    <h4 className="text-xl font-bold mb-4 text-blue-100">{t.home.sdt.scaffolds.autonomy.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed font-medium">{t.home.sdt.scaffolds.autonomy.desc}</p>
                 </div>

                 <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-all group">
                    <div className="w-14 h-14 bg-teal-500/20 rounded-2xl flex items-center justify-center mb-6 text-teal-400 group-hover:scale-110 transition-transform shadow-inner border border-teal-500/30">
                       <Zap size={28} />
                    </div>
                    <h4 className="text-xl font-bold mb-4 text-teal-100">{t.home.sdt.scaffolds.competence.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed font-medium">{t.home.sdt.scaffolds.competence.desc}</p>
                 </div>

                 <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-all group">
                    <div className="w-14 h-14 bg-pink-500/20 rounded-2xl flex items-center justify-center mb-6 text-pink-400 group-hover:scale-110 transition-transform shadow-inner border border-pink-500/30">
                       <Users size={28} />
                    </div>
                    <h4 className="text-xl font-bold mb-4 text-pink-100">{t.home.sdt.scaffolds.relatedness.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed font-medium">{t.home.sdt.scaffolds.relatedness.desc}</p>
                 </div>
              </div>

              <div className="bg-white/5 rounded-[2rem] p-8 md:p-12 border border-white/10">
                <h3 className="text-xl font-bold mb-10 text-center flex items-center justify-center gap-3">
                  <Network className="text-teal-400" /> {t.home.sdt.mechanism_title}
                </h3>
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto">
                  <div className="flex-1 bg-white/10 p-8 rounded-2xl border border-white/10 w-full text-center relative group hover:bg-white/20 transition-all">
                    <div className="w-16 h-16 bg-teal-400/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-teal-400 border border-teal-400/30 shadow-lg"><Brain size={32} /></div>
                    <h4 className="font-bold text-lg mb-3 text-white">{t.home.sdt.ai_support}</h4>
                    <p className="text-xs text-slate-400 whitespace-pre-line font-medium leading-relaxed">{t.home.sdt.ai_desc}</p>
                  </div>
                  <div className="hidden md:flex flex-col items-center">
                    <div className="w-12 h-12 bg-teal-400/10 rounded-full flex items-center justify-center animate-bounce-horizontal">
                      <ChevronRight className="text-teal-400" size={24} />
                    </div>
                  </div>
                  <div className="flex-1 bg-white/10 p-8 rounded-2xl border border-white/10 w-full text-center group hover:bg-white/20 transition-all">
                    <div className="w-16 h-16 bg-blue-400/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-400 border border-blue-400/30 shadow-lg"><Heart size={32} /></div>
                    <h4 className="font-bold text-lg mb-3 text-white">{t.home.sdt.needs}</h4>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed">{t.home.sdt.needs_desc}</p>
                  </div>
                  <div className="hidden md:flex flex-col items-center">
                    <div className="w-12 h-12 bg-blue-400/10 rounded-full flex items-center justify-center animate-bounce-horizontal">
                      <ChevronRight className="text-blue-400" size={24} />
                    </div>
                  </div>
                  <div className="flex-1 bg-white/10 p-8 rounded-2xl border border-white/10 w-full text-center group hover:bg-white/20 transition-all">
                    <div className="w-16 h-16 bg-purple-400/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-purple-400 border border-purple-400/30 shadow-lg"><TrendingUp size={32} /></div>
                    <h4 className="font-bold text-lg mb-3 text-white">{t.home.sdt.engagement}</h4>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed">{t.home.sdt.engagement_desc}</p>
                  </div>
                </div>
              </div>
           </div>
        </div>
      </div>

      {/* 6. 核心功能 */}
      <div className="max-w-7xl mx-auto px-6 mb-32">
         <h2 className="text-4xl font-black text-slate-800 mb-12 flex items-center gap-4">
           <Layers size={40} className="text-blue-600" /> {t.intro.funcs.title}
         </h2>
         <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: <Briefcase className="text-purple-600" size={32} />, title: t.intro.funcs.graph, desc: t.intro.funcs.graph_desc, color: 'purple', sub: ['知识节点追踪', '个性化图谱'] },
              { icon: <CheckCircle className="text-green-600" size={32} />, title: t.intro.funcs.scoring, desc: t.intro.funcs.scoring_desc, color: 'green', sub: ['即时反馈', '错误归因'] },
              { icon: <BarChart2 className="text-blue-600" size={32} />, title: t.intro.funcs.analysis, desc: t.intro.funcs.analysis_desc, color: 'blue', sub: ['学情预测', '多维画像'] },
              { icon: <Database className="text-orange-600" size={32} />, title: t.intro.funcs.process, desc: t.intro.funcs.process_desc, color: 'orange', sub: ['全链路采集', '实证数据'] },
            ].map((f, i) => (
              <div key={i} className={`bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-500 group relative overflow-hidden`}>
                 <div className={`absolute top-0 right-0 w-32 h-32 bg-${f.color}-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700`}></div>
                 <div className={`w-16 h-16 bg-${f.color}-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-inner`}>
                   {f.icon}
                 </div>
                 <h3 className="text-2xl font-black text-slate-800 mb-4">{f.title}</h3>
                 <p className="text-slate-500 leading-relaxed text-lg mb-8 font-medium">{f.desc}</p>
                 <div className="pt-8 border-t border-slate-100 grid grid-cols-2 gap-4">
                    {f.sub.map((s, si) => (
                      <div key={si} className="flex items-center gap-2 text-sm text-slate-400 font-bold uppercase tracking-wider">
                         <div className={`w-2 h-2 rounded-full bg-${f.color}-400`}></div> {s}
                      </div>
                    ))}
                 </div>
              </div>
            ))}
         </div>
      </div>

      {/* 7. 客户案例 (New) */}
      <div className="max-w-7xl mx-auto px-6 mb-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-800 mb-6 flex items-center justify-center gap-4">
             <Building2 size={40} className="text-teal-600" /> {t.home.cases_title}
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">{t.home.cases_desc}</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
           {t.home.case_list.map((c: any, i: number) => (
             <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-125 transition-transform duration-700">
                  <Quote size={80} className="text-teal-600" />
                </div>
                <div className="mb-6 flex flex-col">
                  <span className="text-teal-600 font-black text-xs uppercase tracking-widest mb-2 px-3 py-1 bg-teal-50 rounded-full w-fit">{c.school}</span>
                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-teal-700 transition-colors leading-tight">{c.title}</h3>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium flex-1 italic">
                  "{c.desc}"
                </p>
                <div className="pt-4 border-t border-slate-50 flex items-center text-xs font-bold text-slate-400 group-hover:text-teal-500 transition-colors">
                  查看落地成果 <ChevronRight size={14} />
                </div>
             </div>
           ))}
        </div>
      </div>

      {/* 8. 合作伙伴展示 */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="border-t border-slate-200 pt-20 pb-16">
          <h3 className="text-center text-slate-400 font-black mb-16 uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-3">
            <Users size={18} /> {t.home.partners}
          </h3>
          <div className="flex flex-wrap justify-center gap-10 md:gap-20">
             {[
               { name: language === 'zh' ? '深圳职业技术大学' : 'Shenzhen Polytech', icon: <GraduationCap size={40} /> },
               { name: language === 'zh' ? '金华职业技术学院' : 'Jinhua Polytech', icon: <BookOpen size={40} /> },
               { name: language === 'zh' ? '南京信息职院' : 'NJCIT', icon: <Cpu size={40} /> },
               { name: language === 'zh' ? '阿里云' : 'Alibaba Cloud', icon: <Server size={40} /> },
               { name: language === 'zh' ? '华为云' : 'Huawei Cloud', icon: <Globe size={40} /> },
               { name: language === 'zh' ? '清华大学' : 'Tsinghua Univ', icon: <Landmark size={40} /> }
             ].map((p, i) => (
               <div key={i} className="flex flex-col items-center gap-4 group cursor-default">
                  <div className="w-20 h-20 bg-white rounded-3xl shadow-sm border border-slate-200 flex items-center justify-center text-slate-300 group-hover:text-teal-500 group-hover:border-teal-200 group-hover:shadow-2xl transition-all duration-500 transform group-hover:rotate-3">
                    {p.icon}
                  </div>
                  <span className="text-xs font-black text-slate-400 group-hover:text-slate-800 transition-colors uppercase tracking-widest">{p.name}</span>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
