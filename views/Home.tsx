
import React from 'react';
import { 
  Users, MessageSquare, BookOpen, Cpu, Layout, Brain, Database, 
  ArrowUp, Heart, TrendingUp, Network, Microscope, GraduationCap, 
  Server, Globe, Landmark 
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
      {/* Banner */}
      <div className="relative bg-slate-900 text-white py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900 to-slate-900 opacity-90"></div>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#2dd4bf 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-white">
             {t.home.hero_title}
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-10 font-light">
            {t.home.hero_subtitle}
          </p>
          {currentRole === UserRole.VISITOR && (
            <button onClick={() => onRoleChange(UserRole.STUDENT)} className="bg-teal-500 hover:bg-teal-400 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-teal-500/30 transition-all transform hover:-translate-y-1">
              立即体验 (Student Demo)
            </button>
          )}
        </div>
      </div>

      {/* Statistics Section */}
      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 bg-white rounded-2xl shadow-xl border border-slate-100 p-6">
          {[
            { label: t.home.stats.users, val: '1,234,375', icon: <Users size={20} className="text-blue-500" /> },
            { label: t.home.stats.answers, val: '129,999+', icon: <MessageSquare size={20} className="text-green-500" /> },
            { label: t.home.stats.dialogs, val: '13,434', icon: <MessageSquare size={20} className="text-purple-500" /> },
            { label: t.home.stats.courses, val: '80+', icon: <BookOpen size={20} className="text-orange-500" /> },
            { label: t.home.stats.media, val: '100+', icon: <Cpu size={20} className="text-teal-500" /> },
          ].map((stat, i) => (
            <div key={i} className="text-center p-2 hover:bg-slate-50 rounded-lg transition-colors">
              <div className="flex justify-center mb-2 bg-slate-100 w-10 h-10 rounded-full items-center mx-auto">{stat.icon}</div>
              <div className="text-xl md:text-2xl font-bold text-slate-800">{stat.val}</div>
              <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 1. Product Architecture Section */}
      <div className="max-w-6xl mx-auto px-6 mb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">{t.home.architecture}</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">{t.home.arch_desc}</p>
        </div>
        
        {/* Stack Layout */}
        <div className="relative">
          {/* Connector */}
          <div className="absolute left-10 md:left-[3.25rem] top-0 bottom-0 w-1 bg-gradient-to-b from-purple-200 via-blue-200 to-slate-200 -z-10 rounded-full"></div>

          <div className="space-y-8">
             {/* Layer 4 */}
             <div className="group relative">
               <div className="flex flex-col md:flex-row gap-6 items-stretch">
                  <div className="w-full md:w-1/3 bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500 flex items-center gap-4 hover:shadow-lg transition-all z-10">
                    <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 shrink-0 shadow-inner">
                      <Layout size={28} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-purple-500 uppercase tracking-widest mb-1">Layer 4</div>
                      <h3 className="text-lg font-bold text-slate-800">{t.home.layers.l4.title}</h3>
                    </div>
                  </div>
                  <div className="w-full md:w-2/3 bg-purple-50/50 p-6 rounded-xl border border-purple-100 flex flex-col justify-center">
                     <p className="text-slate-700 font-medium mb-3">{t.home.layers.l4.desc}</p>
                     <div className="flex flex-wrap gap-2">
                        {t.home.layers.l4.tags.map((tag, i) => (
                           <span key={i} className="bg-white text-purple-700 px-3 py-1 rounded-full text-xs font-bold shadow-sm border border-purple-200">{tag}</span>
                        ))}
                     </div>
                  </div>
               </div>
             </div>

             {/* Layer 3 */}
             <div className="group relative">
               <div className="flex flex-col md:flex-row gap-6 items-stretch">
                  <div className="w-full md:w-1/3 bg-white p-6 rounded-xl shadow-md border-l-4 border-teal-500 flex items-center gap-4 hover:shadow-lg transition-all z-10">
                    <div className="w-14 h-14 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600 shrink-0 shadow-inner">
                      <Brain size={28} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-teal-500 uppercase tracking-widest mb-1">Layer 3</div>
                      <h3 className="text-lg font-bold text-slate-800">{t.home.layers.l3.title}</h3>
                    </div>
                  </div>
                  <div className="w-full md:w-2/3 bg-teal-50/50 p-6 rounded-xl border border-teal-100 flex flex-col justify-center">
                     <p className="text-slate-700 font-medium mb-3">{t.home.layers.l3.desc}</p>
                     <div className="flex flex-wrap gap-2">
                        {t.home.layers.l3.tags.map((tag, i) => (
                           <span key={i} className="bg-white text-teal-700 px-3 py-1 rounded-full text-xs font-bold shadow-sm border border-teal-200">{tag}</span>
                        ))}
                     </div>
                  </div>
               </div>
             </div>

             {/* Layer 2 */}
             <div className="group relative">
               <div className="flex flex-col md:flex-row gap-6 items-stretch">
                  <div className="w-full md:w-1/3 bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500 flex items-center gap-4 hover:shadow-lg transition-all z-10">
                    <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 shrink-0 shadow-inner">
                      <Cpu size={28} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-1">Layer 2</div>
                      <h3 className="text-lg font-bold text-slate-800">{t.home.layers.l2.title}</h3>
                    </div>
                  </div>
                  <div className="w-full md:w-2/3 bg-blue-50/50 p-6 rounded-xl border border-blue-100 flex flex-col justify-center">
                     <p className="text-slate-700 font-medium mb-3">{t.home.layers.l2.desc}</p>
                     <div className="flex flex-wrap gap-2">
                        {t.home.layers.l2.tags.map((tag, i) => (
                           <span key={i} className="bg-white text-blue-700 px-3 py-1 rounded-full text-xs font-bold shadow-sm border border-blue-200">{tag}</span>
                        ))}
                     </div>
                  </div>
               </div>
             </div>

             {/* Layer 1 */}
             <div className="group relative">
               <div className="flex flex-col md:flex-row gap-6 items-stretch">
                  <div className="w-full md:w-1/3 bg-white p-6 rounded-xl shadow-md border-l-4 border-slate-500 flex items-center gap-4 hover:shadow-lg transition-all z-10">
                    <div className="w-14 h-14 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 shrink-0 shadow-inner">
                      <Database size={28} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Layer 1</div>
                      <h3 className="text-lg font-bold text-slate-800">{t.home.layers.l1.title}</h3>
                    </div>
                  </div>
                  <div className="w-full md:w-2/3 bg-slate-100/50 p-6 rounded-xl border border-slate-200 flex flex-col justify-center">
                     <p className="text-slate-700 font-medium mb-3">{t.home.layers.l1.desc}</p>
                     <div className="flex flex-wrap gap-2">
                        {t.home.layers.l1.tags.map((tag, i) => (
                           <span key={i} className="bg-white text-slate-600 px-3 py-1 rounded-full text-xs font-bold shadow-sm border border-slate-200">{tag}</span>
                        ))}
                     </div>
                  </div>
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* 2. Product Core Theory */}
      <div className="max-w-7xl mx-auto px-6 mb-24 bg-slate-50 py-16 rounded-3xl border border-slate-200">
        <div className="text-center mb-12">
           <h2 className="text-3xl font-bold text-slate-800 mb-4">{t.home.sdt.title}</h2>
           <p className="text-slate-600 max-w-3xl mx-auto text-lg leading-relaxed">
             {t.home.sdt.subtitle}
           </p>
        </div>

        {/* Mechanism Diagram */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-slate-700 mb-8 text-center flex items-center justify-center gap-2">
            <Network className="text-teal-600" /> {t.home.sdt.mechanism_title}
          </h3>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-5xl mx-auto">
            {/* Steps */}
            <div className="flex-1 bg-white p-6 rounded-xl shadow-md border-t-4 border-teal-500 w-full text-center">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 text-teal-600">
                <Brain size={24} />
              </div>
              <h4 className="font-bold text-slate-800 mb-2">{t.home.sdt.ai_support}</h4>
              <p className="text-sm text-slate-500 whitespace-pre-line">{t.home.sdt.ai_desc}</p>
            </div>

            <div className="hidden md:flex flex-col items-center text-slate-400">
              <div className="text-xs font-bold mb-1">Support</div>
              <ArrowUp className="rotate-90 text-teal-400" size={32} />
            </div>

            <div className="flex-1 bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-500 w-full text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                <Heart size={24} />
              </div>
              <h4 className="font-bold text-slate-800 mb-2">{t.home.sdt.needs}</h4>
              <p className="text-sm text-slate-500">{t.home.sdt.needs_desc}</p>
            </div>

            <div className="hidden md:flex flex-col items-center text-slate-400">
               <div className="text-xs font-bold mb-1">Promote</div>
               <ArrowUp className="rotate-90 text-blue-400" size={32} />
            </div>

            <div className="flex-1 bg-white p-6 rounded-xl shadow-md border-t-4 border-purple-500 w-full text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600">
                <TrendingUp size={24} />
              </div>
              <h4 className="font-bold text-slate-800 mb-2">{t.home.sdt.engagement}</h4>
              <p className="text-sm text-slate-500">{t.home.sdt.engagement_desc}</p>
            </div>
          </div>
        </div>

        {/* Data Evidence Grid */}
        <div className="max-w-5xl mx-auto">
           <h3 className="text-xl font-bold text-slate-700 mb-6 flex items-center gap-2">
             <Database className="text-orange-600" /> {t.home.sdt.data_title}
           </h3>
           <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="bg-slate-100 text-slate-700">
                       <th className="p-4 border-b border-r border-slate-200 w-1/4">{t.home.sdt.table.type}</th>
                       <th className="p-4 border-b border-r border-slate-200 w-1/3">{t.home.sdt.table.content}</th>
                       <th className="p-4 border-b border-slate-200">{t.home.sdt.table.function}</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100 text-sm">
                    {/* Rows... */}
                    <tr>
                       <td className="p-4 font-bold text-slate-800 border-r border-slate-100">{t.home.sdt.table.r1_type}</td>
                       <td className="p-4 text-slate-600 border-r border-slate-100">{t.home.sdt.table.r1_content}</td>
                       <td className="p-4 text-teal-700 font-medium">{t.home.sdt.table.r1_func}</td>
                    </tr>
                    <tr className="bg-slate-50/50">
                       <td className="p-4 font-bold text-slate-800 border-r border-slate-100">{t.home.sdt.table.r2_type}</td>
                       <td className="p-4 text-slate-600 border-r border-slate-100">{t.home.sdt.table.r2_content}</td>
                       <td className="p-4 text-teal-700 font-medium">{t.home.sdt.table.r2_func}</td>
                    </tr>
                    <tr>
                       <td className="p-4 font-bold text-slate-800 border-r border-slate-100">{t.home.sdt.table.r3_type}</td>
                       <td className="p-4 text-slate-600 border-r border-slate-100">{t.home.sdt.table.r3_content}</td>
                       <td className="p-4 text-teal-700 font-medium">{t.home.sdt.table.r3_func}</td>
                    </tr>
                    <tr className="bg-slate-50/50">
                       <td className="p-4 font-bold text-slate-800 border-r border-slate-100">{t.home.sdt.table.r4_type}</td>
                       <td className="p-4 text-slate-600 border-r border-slate-100">{t.home.sdt.table.r4_content}</td>
                       <td className="p-4 text-teal-700 font-medium">{t.home.sdt.table.r4_func}</td>
                    </tr>
                 </tbody>
              </table>
           </div>
           
           <div className="mt-8 bg-blue-50 border border-blue-100 p-6 rounded-xl flex items-start gap-4">
              <Microscope className="text-blue-600 shrink-0 mt-1" size={24} />
              <div>
                 <h4 className="font-bold text-blue-800 mb-1">{t.home.sdt.method_title}</h4>
                 <p className="text-blue-700 text-sm leading-relaxed">{t.home.sdt.method_desc}</p>
              </div>
           </div>
        </div>
      </div>

      {/* Partners Section */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="border-t border-slate-200 pt-16 pb-12">
          <h3 className="text-center text-slate-400 font-semibold mb-10 uppercase tracking-widest text-sm flex items-center justify-center gap-2">
            <Users size={16} /> {t.home.partners}
          </h3>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
             {[
               { name: language === 'zh' ? '深圳职业技术大学' : 'Shenzhen Polytech', icon: <GraduationCap size={32} /> },
               { name: language === 'zh' ? '金华职业技术学院' : 'Jinhua Polytech', icon: <BookOpen size={32} /> },
               { name: language === 'zh' ? '南京信息职院' : 'NJCIT', icon: <Cpu size={32} /> },
               { name: language === 'zh' ? '阿里云' : 'Alibaba Cloud', icon: <Server size={32} /> },
               { name: language === 'zh' ? '华为云' : 'Huawei Cloud', icon: <Globe size={32} /> },
               { name: language === 'zh' ? '清华大学' : 'Tsinghua Univ', icon: <Landmark size={32} /> }
             ].map((p, i) => (
               <div key={i} className="flex flex-col items-center gap-3 group cursor-default">
                  <div className="w-16 h-16 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-teal-600 group-hover:border-teal-200 group-hover:shadow-md transition-all duration-300">
                    {p.icon}
                  </div>
                  <span className="text-sm font-bold text-slate-500 group-hover:text-slate-800 transition-colors">{p.name}</span>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
    