
import React from 'react';
import { Target, Share2, Brain, Layers, Briefcase, CheckCircle, BarChart2, Database, FileText, ChevronRight } from 'lucide-react';
import { Language } from '../types';
import { TEXT } from '../constants';

const PlatformIntro: React.FC<{ language: Language }> = ({ language }) => {
  const t = TEXT[language];
  
  return (
    <div className="animate-fade-in pb-12 bg-slate-50 min-h-screen">
       {/* Hero for Intro */}
       <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 py-16 text-center">
             <h1 className="text-3xl md:text-5xl font-bold text-slate-800 mb-4">{t.intro.title}</h1>
             <p className="text-lg text-slate-500">{t.intro.subtitle}</p>
          </div>
       </div>

       <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
         
         {/* Product Positioning */}
         <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
               <div className="p-2 bg-teal-100 rounded-lg text-teal-700"><Target size={24}/></div>
               <h2 className="text-2xl font-bold text-slate-800">{t.intro.position.title}</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                 <h3 className="text-xl font-bold text-teal-700 mb-4">{t.intro.position.main}</h3>
                 <p className="text-slate-600 leading-relaxed mb-6 text-lg">
                   {t.intro.position.desc}
                 </p>
                 <button className="text-teal-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                   Learn more about our mission <Share2 size={16} />
                 </button>
              </div>
              <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl h-64 flex items-center justify-center border border-slate-200">
                <span className="text-slate-400 font-semibold flex flex-col items-center gap-2">
                  <Brain size={48} className="text-slate-300" />
                  Product Concept Visualization
                </span>
              </div>
            </div>
         </div>

         {/* Core Functions Grid */}
         <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-3">
              <Layers size={32} className="text-blue-600" /> {t.intro.funcs.title}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
               {[
                 { icon: <Briefcase className="text-purple-600" size={32} />, title: t.intro.funcs.graph, desc: t.intro.funcs.graph_desc, color: 'purple', sub: ['知识节点追踪', '个性化图谱'] },
                 { icon: <CheckCircle className="text-green-600" size={32} />, title: t.intro.funcs.scoring, desc: t.intro.funcs.scoring_desc, color: 'green', sub: ['即时反馈', '错误归因'] },
                 { icon: <BarChart2 className="text-blue-600" size={32} />, title: t.intro.funcs.analysis, desc: t.intro.funcs.analysis_desc, color: 'blue', sub: ['学情预测', '多维画像'] },
                 { icon: <Database className="text-orange-600" size={32} />, title: t.intro.funcs.process, desc: t.intro.funcs.process_desc, color: 'orange', sub: ['全链路采集', '实证数据'] },
               ].map((f, i) => (
                 <div key={i} className={`bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300 group`}>
                    <div className={`w-16 h-16 bg-${f.color}-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner`}>
                      {f.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-3">{f.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-lg mb-6">{f.desc}</p>
                    <div className="pt-6 border-t border-slate-100 grid grid-cols-2 gap-3">
                       {f.sub.map((s, si) => (
                         <div key={si} className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                            <div className={`w-2 h-2 rounded-full bg-${f.color}-400`}></div> {s}
                         </div>
                       ))}
                    </div>
                 </div>
               ))}
            </div>
         </div>

         {/* Project Cases */}
         <div className="py-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-10 flex items-center gap-3">
              <FileText size={32} className="text-orange-500" /> {t.intro.cases.title}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
               {[
                 { title: t.intro.cases.c1_title, desc: t.intro.cases.c1_desc, tag: 'Higher Ed', bg: 'from-blue-400 to-indigo-600' },
                 { title: t.intro.cases.c2_title, desc: t.intro.cases.c2_desc, tag: 'National Base', bg: 'from-teal-400 to-emerald-600' },
                 { title: t.intro.cases.c3_title, desc: t.intro.cases.c3_desc, tag: 'Cloud Platform', bg: 'from-orange-400 to-red-500' },
               ].map((c, i) => (
                 <div key={i} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 flex flex-col transform hover:-translate-y-1">
                    {/* Simulated Image Header */}
                    <div className={`h-48 bg-gradient-to-br ${c.bg} relative p-6 flex items-end overflow-hidden`}>
                       <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                       {/* Decorative circle */}
                       <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                       <span className="relative z-10 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold shadow-sm uppercase tracking-wider text-slate-800">
                          {c.tag}
                       </span>
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                       <h3 className="font-bold text-xl text-slate-800 mb-4 line-clamp-2 leading-tight group-hover:text-teal-700 transition-colors">{c.title}</h3>
                       <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1 border-b border-slate-50 pb-4">{c.desc}</p>
                       <button className="text-teal-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all mt-auto group-hover:text-teal-700">
                         View Details <ChevronRight size={14} />
                       </button>
                    </div>
                 </div>
               ))}
            </div>
         </div>

       </div>
    </div>
  );
};

export default PlatformIntro;
    