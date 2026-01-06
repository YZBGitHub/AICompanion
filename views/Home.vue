<script setup lang="ts">
import { computed, h } from 'vue';
import { 
  Users, MessageSquare, BookOpen, Cpu, Layout, Brain, Database, 
  ArrowUp, Heart, TrendingUp, Network, Microscope, GraduationCap, 
  Server, Globe, Landmark, Target, Share2, Briefcase, CheckCircle, 
  BarChart2, ChevronRight, Layers, Zap, ShieldCheck, 
  MousePointerClick, Sparkles, Building2, Quote
} from 'lucide-vue-next';
import { UserRole, Language } from '../types';
import { TEXT } from '../constants';

const props = defineProps<{
  language: Language;
  currentRole: UserRole;
}>();

const emit = defineEmits<{
  (e: 'onRoleChange', role: UserRole): void;
}>();

const t = computed(() => TEXT[props.language]);

const stats = computed(() => [
  { label: t.value.home.stats.users, val: '1,234,375', icon: Users, color: 'text-blue-500' },
  { label: t.value.home.stats.answers, val: '129,999+', icon: MessageSquare, color: 'text-green-500' },
  { label: t.value.home.stats.dialogs, val: '13,434', icon: MessageSquare, color: 'text-purple-500' },
  { label: t.value.home.stats.courses, val: '80+', icon: BookOpen, color: 'text-orange-500' },
  { label: t.value.home.stats.media, val: '100+', icon: Cpu, color: 'text-teal-500' },
]);

const layers = computed(() => [
  { layer: 4, icon: Layout, color: 'purple', text: t.value.home.layers.l4, borderColor: 'border-purple-500', bgColor: 'bg-purple-50', textColor: 'text-purple-600', subTextColor: 'text-purple-500', tagBg: 'bg-purple-50', tagText: 'text-purple-700', tagBorder: 'border-purple-100' },
  { layer: 3, icon: Brain, color: 'teal', text: t.value.home.layers.l3, borderColor: 'border-teal-500', bgColor: 'bg-teal-50', textColor: 'text-teal-600', subTextColor: 'text-teal-500', tagBg: 'bg-teal-50', tagText: 'text-teal-700', tagBorder: 'border-teal-100' },
  { layer: 2, icon: Cpu, color: 'blue', text: t.value.home.layers.l2, borderColor: 'border-blue-500', bgColor: 'bg-blue-50', textColor: 'text-blue-600', subTextColor: 'text-blue-500', tagBg: 'bg-blue-50', tagText: 'text-blue-700', tagBorder: 'border-blue-100' },
  { layer: 1, icon: Database, color: 'slate', text: t.value.home.layers.l1, borderColor: 'border-slate-500', bgColor: 'bg-slate-50', textColor: 'text-slate-600', subTextColor: 'text-slate-500', tagBg: 'bg-slate-50', tagText: 'text-slate-700', tagBorder: 'border-slate-100' },
]);

const functions = computed(() => [
  { icon: Briefcase, iconColor: 'text-purple-600', title: t.value.intro.funcs.graph, desc: t.value.intro.funcs.graph_desc, color: 'purple', sub: ['知识节点追踪', '个性化图谱'], dotColor: 'bg-purple-400', bgColor: 'bg-purple-50', glowColor: 'bg-purple-500/5' },
  { icon: CheckCircle, iconColor: 'text-green-600', title: t.value.intro.funcs.scoring, desc: t.value.intro.funcs.scoring_desc, color: 'green', sub: ['即时反馈', '错误归因'], dotColor: 'bg-green-400', bgColor: 'bg-green-50', glowColor: 'bg-green-500/5' },
  { icon: BarChart2, iconColor: 'text-blue-600', title: t.value.intro.funcs.analysis, desc: t.value.intro.funcs.analysis_desc, color: 'blue', sub: ['学情预测', '多维画像'], dotColor: 'bg-blue-400', bgColor: 'bg-blue-50', glowColor: 'bg-blue-500/5' },
  { icon: Database, iconColor: 'text-orange-600', title: t.value.intro.funcs.process, desc: t.value.intro.funcs.process_desc, color: 'orange', sub: ['全链路采集', '实证数据'], dotColor: 'bg-orange-400', bgColor: 'bg-orange-50', glowColor: 'bg-orange-500/5' },
]);

const partners = computed(() => [
  { name: props.language === 'zh' ? '深圳职业技术大学' : 'Shenzhen Polytech', icon: GraduationCap },
  { name: props.language === 'zh' ? '金华职业技术学院' : 'Jinhua Polytech', icon: BookOpen },
  { name: props.language === 'zh' ? '南京信息职院' : 'NJCIT', icon: Cpu },
  { name: props.language === 'zh' ? '阿里云' : 'Alibaba Cloud', icon: Server },
  { name: props.language === 'zh' ? '华为云' : 'Huawei Cloud', icon: Globe },
  { name: props.language === 'zh' ? '清华大学' : 'Tsinghua Univ', icon: Landmark }
]);
</script>

<template>
  <div class="animate-fade-in pb-12">
    <!-- 1. 顶部 Banner -->
    <div class="relative bg-slate-900 text-white py-24 md:py-32 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-teal-900 via-slate-900 to-indigo-900 opacity-95"></div>
      <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(#2dd4bf 1px, transparent 1px); background-size: 30px 30px"></div>
      
      <div class="absolute top-1/4 -left-20 w-80 h-80 bg-teal-500/10 rounded-full blur-[100px] animate-pulse"></div>
      <div class="absolute bottom-1/4 -right-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] animate-pulse" style="animation-delay: 2s"></div>

      <div class="max-w-7xl mx-auto px-6 relative z-10">
        <div class="flex flex-col items-center text-center">
          <div class="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 px-4 py-1.5 rounded-full mb-8 backdrop-blur-sm">
            <Sparkles :size="16" class="text-teal-400" />
            <span class="text-teal-400 text-sm font-bold tracking-wider uppercase">{{ t.home.hero_vision }}</span>
          </div>
          
          <h1 class="text-4xl md:text-6xl font-black mb-8 tracking-tight leading-tight">
             <span class="bg-clip-text text-transparent bg-gradient-to-r from-teal-200 via-white to-indigo-100">
                {{ t.home.hero_title }}
             </span>
          </h1>
          
          <p class="text-lg md:text-xl text-slate-300 max-w-4xl mx-auto mb-12 font-medium leading-relaxed">
            {{ t.home.hero_subtitle }}
          </p>

          <div class="flex flex-wrap justify-center gap-4">
            <template v-if="currentRole === UserRole.VISITOR">
              <button 
                @click="emit('onRoleChange', UserRole.STUDENT)" 
                class="bg-teal-500 hover:bg-teal-400 text-white px-10 py-4 rounded-full font-black shadow-2xl shadow-teal-500/20 transition-all transform hover:-translate-y-1 flex items-center gap-2 text-lg"
              >
                立即开启 AI 伴学之旅 <ChevronRight :size="20" />
              </button>
            </template>
            <button class="bg-white/5 hover:bg-white/10 text-white border border-white/20 backdrop-blur-md px-10 py-4 rounded-full font-bold transition-all text-lg">
              了解 SDT 理论架构
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. 统计模块 -->
    <div class="max-w-7xl mx-auto px-6 -mt-12 relative z-20 mb-24">
      <div class="grid grid-cols-2 md:grid-cols-5 gap-4 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
        <div v-for="(stat, i) in stats" :key="i" class="text-center p-4 hover:bg-slate-50/50 rounded-2xl transition-all group">
          <div class="flex justify-center mb-3 bg-slate-100 group-hover:bg-white w-12 h-12 rounded-2xl items-center mx-auto shadow-sm transition-colors">
            <component :is="stat.icon" :size="20" :class="stat.color" />
          </div>
          <div class="text-2xl font-black text-slate-800 mb-1">{{ stat.val }}</div>
          <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{{ stat.label }}</div>
        </div>
      </div>
    </div>

    <!-- 3. 产品定位 -->
    <div class="max-w-7xl mx-auto px-6 mb-32">
       <div class="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 p-8 md:p-16 relative overflow-hidden">
          <div class="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Target :size="300" />
          </div>
          <div class="flex items-center gap-3 mb-10">
             <div class="p-3 bg-teal-100 rounded-2xl text-teal-700 shadow-inner"><Target :size="28"/></div>
             <h2 class="text-3xl font-black text-slate-800">{{ t.intro.position.title }}</h2>
          </div>
          <div class="grid lg:grid-cols-2 gap-16 items-center">
            <div>
               <h3 class="text-2xl font-bold text-teal-700 mb-6">{{ t.intro.position.main }}</h3>
               <p class="text-slate-600 leading-loose mb-10 text-xl font-medium">
                 {{ t.intro.position.desc }}
               </p>
               <button class="bg-teal-50 text-teal-700 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-teal-100 transition-all border border-teal-100">
                 了解我们的愿景与使命 <Share2 :size="18" />
               </button>
            </div>
            <div class="bg-gradient-to-br from-slate-100 to-white rounded-[2rem] aspect-video flex flex-col items-center justify-center border border-slate-200 shadow-inner group p-8">
              <div class="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <Brain :size="40" class="text-teal-600" />
              </div>
              <div class="text-center">
                <div class="text-xl font-black text-slate-800 mb-2">AI 驱动 · 技能全过程</div>
                <div class="text-sm text-slate-500 font-medium">从“技能评估”到“岗位推荐”的闭环系统</div>
              </div>
            </div>
          </div>
       </div>
    </div>

    <!-- 4. 产品架构 -->
    <div class="max-w-6xl mx-auto px-6 mb-32">
      <div class="text-center mb-20">
        <div class="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-widest mb-4">Architecture</div>
        <h2 class="text-4xl font-black text-slate-800 mb-6">{{ t.home.architecture }}</h2>
        <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">{{ t.home.arch_desc }}</p>
      </div>
      
      <div class="relative">
        <div class="absolute left-10 md:left-[3.25rem] top-8 bottom-8 w-1.5 bg-gradient-to-b from-purple-100 via-teal-100 to-slate-100 -z-10 rounded-full"></div>
        <div class="space-y-12">
           <div v-for="l in layers" :key="l.layer" class="group relative">
             <div class="flex flex-col md:flex-row gap-8 items-stretch">
                <div :class="['w-full md:w-1/3 bg-white p-8 rounded-3xl shadow-lg border-l-8 flex items-center gap-6 hover:shadow-2xl transition-all z-10', l.borderColor]">
                  <div :class="['w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:rotate-6 transition-transform', l.bgColor, l.textColor]">
                    <component :is="l.icon" :size="32" />
                  </div>
                  <div>
                    <div :class="['text-xs font-black uppercase tracking-widest mb-1', l.subTextColor]">Layer 0{{ l.layer }}</div>
                    <h3 class="text-xl font-bold text-slate-800">{{ l.text.title }}</h3>
                  </div>
                </div>
                <div :class="['w-full md:w-2/3 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-center group-hover:bg-slate-50', 'hover:' + l.borderColor.replace('border-', 'border-')]">
                   <p class="text-slate-700 font-bold text-lg mb-4">{{ l.text.desc }}</p>
                   <div class="flex flex-wrap gap-2">
                      <span v-for="(tag, i) in l.text.tags" :key="i" :class="['px-4 py-1.5 rounded-xl text-xs font-black border', l.tagBg, l.tagText, l.tagBorder]">{{ tag }}</span>
                   </div>
                </div>
             </div>
           </div>
        </div>
      </div>
    </div>

    <!-- 5. 核心理论 -->
    <div class="max-w-7xl mx-auto px-6 mb-32">
      <div class="bg-slate-900 rounded-[3rem] p-8 md:p-20 text-white relative overflow-hidden shadow-3xl">
         <div class="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
            <div class="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-teal-500 rounded-full blur-[120px]"></div>
            <div class="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500 rounded-full blur-[120px]"></div>
         </div>

         <div class="relative z-10">
            <div class="text-center mb-16">
               <div class="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full mb-6">
                  <ShieldCheck :size="16" class="text-teal-400" />
                  <span class="text-teal-400 text-xs font-black tracking-widest uppercase">Theoretic Foundation</span>
               </div>
               <h2 class="text-3xl md:text-5xl font-black mb-6">{{ t.home.sdt.title }}</h2>
               <p class="text-slate-400 max-w-3xl mx-auto text-lg leading-relaxed font-medium">
                  {{ t.home.sdt.vision_desc }}
               </p>
            </div>

            <div class="grid md:grid-cols-3 gap-8 mb-20">
               <div class="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-all group">
                  <div class="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform shadow-inner border border-blue-500/30">
                     <MousePointerClick :size="28" />
                  </div>
                  <h4 class="text-xl font-bold mb-4 text-blue-100">{{ t.home.sdt.scaffolds.autonomy.title }}</h4>
                  <p class="text-slate-400 text-sm leading-relaxed font-medium">{{ t.home.sdt.scaffolds.autonomy.desc }}</p>
               </div>

               <div class="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-all group">
                  <div class="w-14 h-14 bg-teal-500/20 rounded-2xl flex items-center justify-center mb-6 text-teal-400 group-hover:scale-110 transition-transform shadow-inner border border-teal-500/30">
                     <Zap :size="28" />
                  </div>
                  <h4 class="text-xl font-bold mb-4 text-teal-100">{{ t.home.sdt.scaffolds.competence.title }}</h4>
                  <p class="text-slate-400 text-sm leading-relaxed font-medium">{{ t.home.sdt.scaffolds.competence.desc }}</p>
               </div>

               <div class="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-all group">
                  <div class="w-14 h-14 bg-pink-500/20 rounded-2xl flex items-center justify-center mb-6 text-pink-400 group-hover:scale-110 transition-transform shadow-inner border border-pink-500/30">
                     <Users :size="28" />
                  </div>
                  <h4 class="text-xl font-bold mb-4 text-pink-100">{{ t.home.sdt.scaffolds.relatedness.title }}</h4>
                  <p class="text-slate-400 text-sm leading-relaxed font-medium">{{ t.home.sdt.scaffolds.relatedness.desc }}</p>
               </div>
            </div>

            <div class="bg-white/5 rounded-[2rem] p-8 md:p-12 border border-white/10">
              <h3 class="text-xl font-bold mb-10 text-center flex items-center justify-center gap-3">
                <Network class="text-teal-400" /> {{ t.home.sdt.mechanism_title }}
              </h3>
              <div class="flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto">
                <div class="flex-1 bg-white/10 p-8 rounded-2xl border border-white/10 w-full text-center relative group hover:bg-white/20 transition-all">
                  <div class="w-16 h-16 bg-teal-400/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-teal-400 border border-teal-400/30 shadow-lg"><Brain :size="32" /></div>
                  <h4 class="font-bold text-lg mb-3 text-white">{{ t.home.sdt.ai_support }}</h4>
                  <p class="text-xs text-slate-400 whitespace-pre-line font-medium leading-relaxed">{{ t.home.sdt.ai_desc }}</p>
                </div>
                <div class="hidden md:flex flex-col items-center">
                  <div class="w-12 h-12 bg-teal-400/10 rounded-full flex items-center justify-center animate-bounce-horizontal">
                    <ChevronRight class="text-teal-400" :size="24" />
                  </div>
                </div>
                <div class="flex-1 bg-white/10 p-8 rounded-2xl border border-white/10 w-full text-center group hover:bg-white/20 transition-all">
                  <div class="w-16 h-16 bg-blue-400/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-400 border border-blue-400/30 shadow-lg"><Heart :size="32" /></div>
                  <h4 class="font-bold text-lg mb-3 text-white">{{ t.home.sdt.needs }}</h4>
                  <p class="text-xs text-slate-400 font-medium leading-relaxed">{{ t.home.sdt.needs_desc }}</p>
                </div>
                <div class="hidden md:flex flex-col items-center">
                  <div class="w-12 h-12 bg-blue-400/10 rounded-full flex items-center justify-center animate-bounce-horizontal">
                    <ChevronRight class="text-blue-400" :size="24" />
                  </div>
                </div>
                <div class="flex-1 bg-white/10 p-8 rounded-2xl border border-white/10 w-full text-center group hover:bg-white/20 transition-all">
                  <div class="w-16 h-16 bg-purple-400/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-purple-400 border border-purple-400/30 shadow-lg"><TrendingUp :size="32" /></div>
                  <h4 class="font-bold text-lg mb-3 text-white">{{ t.home.sdt.engagement }}</h4>
                  <p class="text-xs text-slate-400 font-medium leading-relaxed">{{ t.home.sdt.engagement_desc }}</p>
                </div>
              </div>
            </div>
         </div>
      </div>
    </div>

    <!-- 6. 核心功能 -->
    <div class="max-w-7xl mx-auto px-6 mb-32">
       <h2 class="text-4xl font-black text-slate-800 mb-12 flex items-center gap-4">
         <Layers :size="40" class="text-blue-600" /> {{ t.intro.funcs.title }}
       </h2>
       <div class="grid md:grid-cols-2 gap-8">
          <div v-for="(f, i) in functions" :key="i" class="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-500 group relative overflow-hidden">
             <div :class="['absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700', f.glowColor]"></div>
             <div :class="['w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-inner', f.bgColor]">
               <component :is="f.icon" :size="32" :class="f.iconColor" />
             </div>
             <h3 class="text-2xl font-black text-slate-800 mb-4">{{ f.title }}</h3>
             <p class="text-slate-500 leading-relaxed text-lg mb-8 font-medium">{{ f.desc }}</p>
             <div class="pt-8 border-t border-slate-100 grid grid-cols-2 gap-4">
                <div v-for="(s, si) in f.sub" :key="si" class="flex items-center gap-2 text-sm text-slate-400 font-bold uppercase tracking-wider">
                   <div :class="['w-2 h-2 rounded-full', f.dotColor]"></div> {{ s }}
                </div>
             </div>
          </div>
       </div>
    </div>

    <!-- 7. 客户案例 -->
    <div class="max-w-7xl mx-auto px-6 mb-32">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-black text-slate-800 mb-6 flex items-center justify-center gap-4">
           <Building2 :size="40" class="text-teal-600" /> {{ t.home.cases_title }}
        </h2>
        <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">{{ t.home.cases_desc }}</p>
      </div>
      
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
         <div v-for="(c, i) in t.home.case_list" :key="i" class="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2 flex flex-col relative overflow-hidden">
            <div class="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-125 transition-transform duration-700">
              <Quote :size="80" class="text-teal-600" />
            </div>
            <div class="mb-6 flex flex-col">
              <span class="text-teal-600 font-black text-xs uppercase tracking-widest mb-2 px-3 py-1 bg-teal-50 rounded-full w-fit">{{ c.school }}</span>
              <h3 class="text-xl font-bold text-slate-800 group-hover:text-teal-700 transition-colors leading-tight">{{ c.title }}</h3>
            </div>
            <p class="text-slate-500 text-sm leading-relaxed mb-6 font-medium flex-1 italic">
              "{{ c.desc }}"
            </p>
            <div class="pt-4 border-t border-slate-50 flex items-center text-xs font-bold text-slate-400 group-hover:text-teal-500 transition-colors">
              查看落地成果 <ChevronRight :size="14" />
            </div>
         </div>
      </div>
    </div>

    <!-- 8. 合作伙伴展示 -->
    <div class="max-w-7xl mx-auto px-6">
      <div class="border-t border-slate-200 pt-20 pb-16">
        <h3 class="text-center text-slate-400 font-black mb-16 uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-3">
          <Users :size="18" /> {{ t.home.partners }}
        </h3>
        <div class="flex flex-wrap justify-center gap-10 md:gap-20">
           <div v-for="(p, i) in partners" :key="i" class="flex flex-col items-center gap-4 group cursor-default">
              <div class="w-20 h-20 bg-white rounded-3xl shadow-sm border border-slate-200 flex items-center justify-center text-slate-300 group-hover:text-teal-500 group-hover:border-teal-200 group-hover:shadow-2xl transition-all duration-500 transform group-hover:rotate-3">
                <component :is="p.icon" :size="40" />
              </div>
              <span class="text-xs font-black text-slate-400 group-hover:text-slate-800 transition-colors uppercase tracking-widest">{{ p.name }}</span>
           </div>
        </div>
      </div>
    </div>
  </div>
</template>
