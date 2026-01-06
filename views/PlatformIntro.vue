<script setup lang="ts">
import { computed } from 'vue';
import { 
  Target, Share2, Brain, Layers, Briefcase, CheckCircle, 
  BarChart2, Database, FileText, ChevronRight 
} from 'lucide-vue-next';
import { Language } from '../types';
import { TEXT } from '../constants';

const props = defineProps<{
  language: Language;
}>();

const t = computed(() => TEXT[props.language]);

const features = computed(() => [
  { icon: Briefcase, title: t.value.intro.funcs.graph, desc: t.value.intro.funcs.graph_desc, color: 'purple', sub: ['知识节点追踪', '个性化图谱'] },
  { icon: CheckCircle, title: t.value.intro.funcs.scoring, desc: t.value.intro.funcs.scoring_desc, color: 'green', sub: ['即时反馈', '错误归因'] },
  { icon: BarChart2, title: t.value.intro.funcs.analysis, desc: t.value.intro.funcs.analysis_desc, color: 'blue', sub: ['学情预测', '多维画像'] },
  { icon: Database, title: t.value.intro.funcs.process, desc: t.value.intro.funcs.process_desc, color: 'orange', sub: ['全链路采集', '实证数据'] },
]);

const cases = computed(() => [
  { title: t.value.intro.cases.c1_title, desc: t.value.intro.cases.c1_desc, tag: 'Higher Ed', bg: 'from-blue-400 to-indigo-600' },
  { title: t.value.intro.cases.c2_title, desc: t.value.intro.cases.c2_desc, tag: 'National Base', bg: 'from-teal-400 to-emerald-600' },
  { title: t.value.intro.cases.c3_title, desc: t.value.intro.cases.c3_desc, tag: 'Cloud Platform', bg: 'from-orange-400 to-red-500' },
]);
</script>

<template>
  <div class="animate-fade-in pb-12 bg-slate-50 min-h-screen">
    <!-- Hero Section -->
    <div class="bg-white border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-6 py-16 text-center">
        <h1 class="text-3xl md:text-5xl font-bold text-slate-800 mb-4">{{ t.intro.title }}</h1>
        <p class="text-lg text-slate-500">{{ t.intro.subtitle }}</p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 py-12 space-y-12">
      <!-- Product Positioning -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
        <div class="flex items-center gap-3 mb-6">
          <div class="p-2 bg-teal-100 rounded-lg text-teal-700"><Target :size="24" /></div>
          <h2 class="text-2xl font-bold text-slate-800">{{ t.intro.position.title }}</h2>
        </div>
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 class="text-xl font-bold text-teal-700 mb-4">{{ t.intro.position.main }}</h3>
            <p class="text-slate-600 leading-relaxed mb-6 text-lg">
              {{ t.intro.position.desc }}
            </p>
            <button class="text-teal-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all cursor-not-allowed opacity-80">
              了解更多关于我们的使命 <Share2 :size="16" />
            </button>
          </div>
          <div class="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl h-64 flex items-center justify-center border border-slate-200">
            <span class="text-slate-400 font-semibold flex flex-col items-center gap-2">
              <Brain :size="48" class="text-slate-300" />
              产品理念可视化 (概念图)
            </span>
          </div>
        </div>
      </div>

      <!-- Core Functions Grid -->
      <div>
        <h2 class="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-3">
          <Layers :size="32" class="text-blue-600" /> {{ t.intro.funcs.title }}
        </h2>
        <div class="grid md:grid-cols-2 gap-8">
          <div 
            v-for="(f, i) in features" 
            :key="i"
            class="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300 group"
          >
            <div :class="[
              'w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner',
              f.color === 'purple' ? 'bg-purple-50 text-purple-600' :
              f.color === 'green' ? 'bg-green-50 text-green-600' :
              f.color === 'blue' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
            ]">
              <component :is="f.icon" :size="32" />
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-3">{{ f.title }}</h3>
            <p class="text-slate-600 leading-relaxed text-lg mb-6">{{ f.desc }}</p>
            <div class="pt-6 border-t border-slate-100 grid grid-cols-2 gap-3">
              <div v-for="(s, si) in f.sub" :key="si" class="flex items-center gap-2 text-sm text-slate-500 font-medium">
                <div :class="['w-2 h-2 rounded-full', 
                  f.color === 'purple' ? 'bg-purple-400' :
                  f.color === 'green' ? 'bg-green-400' :
                  f.color === 'blue' ? 'bg-blue-400' : 'bg-orange-400'
                ]"></div> {{ s }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Project Cases -->
      <div class="py-8">
        <h2 class="text-3xl font-bold text-slate-800 mb-10 flex items-center gap-3">
          <FileText :size="32" class="text-orange-500" /> {{ t.intro.cases.title }}
        </h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div 
            v-for="(c, i) in cases" 
            :key="i"
            class="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 flex flex-col transform hover:-translate-y-1"
          >
            <div :class="['h-48 bg-gradient-to-br relative p-6 flex items-end overflow-hidden', c.bg]">
              <div class="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
              <div class="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <span class="relative z-10 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold shadow-sm uppercase tracking-wider text-slate-800">
                {{ c.tag }}
              </span>
            </div>
            <div class="p-8 flex-1 flex flex-col">
              <h3 class="font-bold text-xl text-slate-800 mb-4 line-clamp-2 leading-tight group-hover:text-teal-700 transition-colors">
                {{ c.title }}
              </h3>
              <p class="text-slate-600 text-sm leading-relaxed mb-6 flex-1 border-b border-slate-50 pb-4">
                {{ c.desc }}
              </p>
              <button class="text-teal-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all mt-auto group-hover:text-teal-700">
                查看详情 <ChevronRight :size="14" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in { animation: fadeIn 0.5s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>
