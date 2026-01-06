<script setup lang="ts">
import { ref, computed } from 'vue';
import { 
  GraduationCap, Brain, Users, Award, BookOpen, 
  Activity, Target, TrendingUp, User, 
  Monitor, Cpu, RefreshCw, Rocket,
  Send, Bot, Layout, PieChart, 
  Map, BarChart as BarChartIcon, LogIn, Clock, Maximize, Timer, Wifi
} from 'lucide-vue-next';
import { UserRole, Language } from '../types';
import { 
  TEXT, AI_PERSONAS, LEARNING_COURSES, 
  LEARNING_EXAMS, LEARNING_SKILLS_FULL, WEAKNESS_DATA, JOB_RECOMMENDATIONS, 
  CLASS_COURSE_STATS
} from '../constants';

// Internal Components
import AreaChart from '../components/AreaChart.vue';
import DonutChart from '../components/DonutChart.vue';
import BarChart from '../components/BarChart.vue';
import SkillRadarChart from '../components/SkillRadarChart.vue';

const props = withDefaults(defineProps<{
  language: Language;
  currentRole?: UserRole;
}>(), {
  currentRole: UserRole.STUDENT
});

const t = computed(() => TEXT[props.language]);

const viewMode = ref<'student' | 'teacher'>(props.currentRole === UserRole.TEACHER ? 'teacher' : 'student');
const teacherTab = ref<'assistant' | 'profile'>('assistant');
const selectedPersonaId = ref('geek'); 
const skillFilter = ref('全部');
const isRegenerating = ref(false);

// Selection State for Teacher/Admin
const selectedSchool = ref('深圳职业技术大学');
const selectedClass = ref('21级物联网1班');
const selectedStudent = ref('李明 (2021001001)');
const selectedProfileCourse = ref('《智慧园区》');

const MOCK_SCHOOLS = ['深圳职业技术大学', '金华职业技术学院'];
const MOCK_CLASSES = ['21级物联网1班', '21级物联网2班', '21级嵌入式1班'];
const MOCK_STUDENTS = ['李明 (2021001001)', '张伟 (2021001002)', '王芳 (2021001003)'];

// AI Assistant State
const aiChatInput = ref('');
const aiChatHistory = ref<{sender: 'user'|'ai', text: string}[]>([
  { sender: 'ai', text: t.value.learning.teacher.ai.welcome },
]);
const selectedAiClasses = ref<string[]>(MOCK_CLASSES.slice(0, 1));
const selectedAiDataTypes = ref<string[]>(['技能点数据', '全过程数据-学习行为']);

const currentPersona = computed(() => AI_PERSONAS.find(p => p.id === selectedPersonaId.value) || AI_PERSONAS[0]);
const canSelectStudent = computed(() => props.currentRole === UserRole.TEACHER || props.currentRole === UserRole.ADMIN);
const canSelectSchool = computed(() => props.currentRole === UserRole.ADMIN);
const uniqueCourses = computed(() => ['全部', ...Array.from(new Set(LEARNING_SKILLS_FULL.map(s => s.course)))]);
const teacherCourses = computed(() => Array.from(new Set(LEARNING_SKILLS_FULL.map(s => s.course))));

// Mock Trend Data
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

const getScoreColor = (score: number) => {
  if (score >= 85) return 'bg-green-500'; 
  if (score >= 60) return 'bg-blue-400';  
  return 'bg-slate-300'; 
};

const getSkillOpacity = (skillCourse: string, currentFilter: string) => {
   if (currentFilter === '全部') return 'opacity-100';
   return currentFilter === skillCourse ? 'opacity-100 scale-105 shadow-md' : 'opacity-20 grayscale scale-95';
};

const handleRegeneratePersona = () => {
   isRegenerating.value = true;
   setTimeout(() => {
      const currentIndex = AI_PERSONAS.findIndex(p => p.id === selectedPersonaId.value);
      const nextIndex = (currentIndex + 1) % AI_PERSONAS.length;
      selectedPersonaId.value = AI_PERSONAS[nextIndex].id;
      isRegenerating.value = false;
   }, 1500);
};

const handleAiChatSend = () => {
   if (!aiChatInput.value.trim()) return;
   aiChatHistory.value.push({ sender: 'user', text: aiChatInput.value });
   const userInput = aiChatInput.value;
   aiChatInput.value = '';
   setTimeout(() => {
      aiChatHistory.value.push({ sender: 'ai', text: `针对您询问的"${userInput}"，AI正在通过分析${selectedAiClasses.value.join(', ')}的${selectedAiDataTypes.value.join('和')}数据为您生成报告...` });
   }, 1000);
};

const handleClearHistory = () => {
  aiChatHistory.value = [{ sender: 'ai', text: t.value.learning.teacher.ai.welcome }];
};
</script>

<template>
  <div class="max-w-7xl mx-auto px-6 py-8 animate-fade-in min-h-screen">
    <!-- View Switcher Header -->
    <div class="flex justify-between items-center mb-8">
      <h2 class="text-3xl font-bold text-slate-800">{{ t.learning.title }}</h2>
      <div class="bg-white p-1 rounded-xl shadow-sm border border-slate-200 flex">
         <button 
           @click="viewMode = 'student'"
           :class="['flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all', viewMode === 'student' ? 'bg-teal-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50']"
         >
           <User :size="18"/> {{ t.learning.views.student }}
         </button>
         <button 
           @click="viewMode = 'teacher'"
           :class="['flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all', viewMode === 'teacher' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50']"
         >
           <Users :size="18"/> {{ t.learning.views.teacher }}
         </button>
      </div>
    </div>

    <!-- STUDENT VIEW -->
    <div v-if="viewMode === 'student'" class="space-y-8">
       <!-- 1. Basic Info -->
       <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-wrap gap-6 items-center justify-between">
          <div class="flex items-center gap-4">
             <div class="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white shadow-lg shrink-0">
                <User :size="32"/>
             </div>
             <div>
                <h3 class="text-xl font-bold text-slate-800">
                   {{ canSelectStudent ? selectedStudent.split(' ')[0] : '李明' }} 
                   <span class="text-sm font-normal text-slate-500 ml-2">
                      ({{ canSelectStudent ? selectedStudent.split('(')[1].replace(')', '') : '2021001001' }})
                   </span>
                </h3>
                <div class="flex gap-4 text-sm text-slate-500 mt-1">
                   <span class="flex items-center gap-1"><GraduationCap :size="14"/> {{ canSelectSchool ? selectedSchool : '深圳职业技术大学' }}</span>
                   <span class="flex items-center gap-1"><BookOpen :size="14"/> 物联网应用技术</span>
                   <span class="flex items-center gap-1"><Users :size="14"/> {{ canSelectStudent ? selectedClass : '21级物联网1班' }}</span>
                </div>
             </div>
          </div>
          <div v-if="canSelectStudent" class="flex gap-3">
             <select v-if="canSelectSchool" v-model="selectedSchool" class="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-slate-50 outline-none">
                <option v-for="s in MOCK_SCHOOLS" :key="s" :value="s">{{ s }}</option>
             </select>
             <select v-model="selectedClass" class="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-slate-50 outline-none">
                <option v-for="c in MOCK_CLASSES" :key="c" :value="c">{{ c }}</option>
             </select>
             <select v-model="selectedStudent" class="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-slate-50 outline-none">
                <option v-for="s in MOCK_STUDENTS" :key="s" :value="s">{{ s }}</option>
             </select>
          </div>
       </div>

       <!-- 2. Academic Overview -->
       <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
             <h3 class="font-bold text-slate-700 mb-4 flex items-center gap-2">
                <BookOpen :size="20" class="text-teal-600"/> {{ t.learning.overview.courses }}
             </h3>
             <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div v-for="course in LEARNING_COURSES" :key="course.id" class="border border-slate-100 rounded-xl p-4 bg-slate-50 hover:shadow-md transition-all group">
                   <div class="flex gap-3 mb-3">
                      <div :class="['w-10 h-10 rounded-lg flex items-center justify-center shrink-0', course.cover]">
                         <component :is="course.icon" :class="course.iconColor" :size="32" />
                      </div>
                      <div class="min-w-0">
                         <h4 class="font-bold text-slate-800 text-sm truncate" :title="course.name">{{ course.name }}</h4>
                         <p class="text-xs text-slate-500 truncate">{{ course.major }}</p>
                      </div>
                   </div>
                   <div v-if="course.status === 'in_progress'">
                      <div class="flex justify-between text-xs mb-1">
                         <span class="text-slate-500">学习进度</span>
                         <span class="font-bold text-teal-600">{{ course.progress }}%</span>
                      </div>
                      <div class="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                         <div class="bg-teal-500 h-1.5 rounded-full" :style="{width: `${course.progress}%`}"></div>
                      </div>
                   </div>
                   <div v-else class="flex justify-between items-center mt-2">
                      <span class="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-bold">已完成</span>
                      <div class="text-xs text-slate-500 font-medium">排名: <span class="text-orange-500 font-bold">{{ course.rank }}</span></div>
                   </div>
                </div>
             </div>
          </div>

          <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
             <h3 class="font-bold text-slate-700 mb-4 flex items-center gap-2">
                <Award :size="20" class="text-purple-600"/> {{ t.learning.overview.exams }}
             </h3>
             <div class="space-y-4 max-h-[280px] overflow-y-auto pr-2 custom-scrollbar">
                <div v-for="(exam, i) in LEARNING_EXAMS.pending" :key="`p-${i}`" class="flex items-center justify-between p-3 rounded-xl border border-red-100 bg-red-50/50">
                   <div class="flex items-center gap-3">
                      <div class="bg-red-100 p-2 rounded-lg text-red-600"><Clock :size="18"/></div>
                      <div>
                         <div class="font-bold text-slate-700 text-sm">{{ exam.name }}</div>
                         <div class="text-xs text-slate-500">{{ exam.startTime }}</div>
                      </div>
                   </div>
                   <div class="text-center">
                      <div class="text-xs text-slate-400 font-bold uppercase">倒计时</div>
                      <div class="font-bold text-red-600">{{ exam.daysLeft }} 天</div>
                   </div>
                </div>
                <div v-for="(exam, i) in LEARNING_EXAMS.completed" :key="`c-${i}`" class="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white transition-all">
                   <div class="flex items-center gap-3">
                      <div class="bg-green-100 p-2 rounded-lg text-green-600"><CheckCircle :size="18"/></div>
                      <div>
                         <div class="font-bold text-slate-700 text-sm">{{ exam.name }}</div>
                         <div class="text-xs text-slate-500">完成于 {{ exam.time }}</div>
                      </div>
                   </div>
                   <div class="text-right">
                      <div class="font-bold text-slate-800 text-lg">{{ exam.score }} <span class="text-xs font-normal text-slate-400">分</span></div>
                      <div class="text-xs text-slate-500">班级第 {{ exam.rank }}</div>
                   </div>
                </div>
             </div>
          </div>
       </div>

       <!-- 3. Learning Engagement Analysis -->
       <div class="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
          <div class="relative z-10">
             <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                   <h3 class="text-2xl font-black flex items-center gap-3 text-white">
                      <Activity class="text-teal-400" :size="28"/> {{ t.learning.engagement.title }}
                   </h3>
                   <p class="text-slate-400 text-sm mt-1">{{ t.learning.engagement.summary }}</p>
                </div>
                <div class="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex items-center gap-4 px-6">
                   <div class="w-12 h-12 bg-teal-500/20 rounded-full flex items-center justify-center text-teal-400 shadow-inner">
                      <Trophy :size="28" />
                   </div>
                   <div class="text-left">
                      <div class="text-[10px] text-slate-400 font-black uppercase tracking-widest">Engagement Level</div>
                      <div class="text-xl font-black text-white">高水平活跃</div>
                   </div>
                </div>
             </div>

             <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div v-for="(item, key) in {
                  platform: { icon: Layout, color: 'text-emerald-400', bg: 'bg-emerald-500/20', label: t.learning.engagement.platform, metrics: [
                    { icon: LogIn, label: t.learning.engagement.metrics.logins, val: '45' },
                    { icon: Clock, label: t.learning.engagement.metrics.online_time, val: '120h' }
                  ]},
                  software: { icon: Monitor, color: 'text-blue-400', bg: 'bg-blue-500/20', label: t.learning.engagement.software, metrics: [
                    { icon: Maximize, label: t.learning.engagement.metrics.env_open, val: '28次' },
                    { icon: Timer, label: t.learning.engagement.metrics.runtime, val: '45h' }
                  ]},
                  hardware: { icon: Cpu, color: 'text-purple-400', bg: 'bg-purple-500/20', label: t.learning.engagement.hardware, metrics: [
                    { icon: LogIn, label: '设备登录', val: '15次' },
                    { icon: Wifi, label: '联网时长', val: '12h' }
                  ]}
                }" :key="key" class="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-colors flex flex-col">
                   <div class="flex items-center gap-3 mb-6">
                      <div :class="['p-2 rounded-xl border border-white/10 shadow-inner', item.bg, item.color]">
                        <component :is="item.icon" :size="20"/>
                      </div>
                      <h4 :class="['font-bold', item.color.replace('400', '100')]">{{ item.label }}</h4>
                   </div>
                   <div class="grid grid-cols-2 gap-4 mb-6">
                      <div v-for="(m, mi) in item.metrics" :key="mi">
                        <div class="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold mb-1 uppercase tracking-tight">
                           <component :is="m.icon" :size="12" :class="item.color"/> {{ m.label }}
                        </div>
                        <div class="text-xl font-black text-white">{{ m.val }}</div>
                      </div>
                   </div>
                   <div class="h-20 mt-auto">
                      <AreaChart :data="MOCK_BEHAVIOR_TRENDS[key]" :color="key === 'platform' ? '#10b981' : key === 'software' ? '#3b82f6' : '#a855f7'" :id="'chart-'+key" />
                   </div>
                </div>
             </div>
          </div>
       </div>

       <!-- 4. Skill Analysis Chips -->
       <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
             <h3 class="font-bold text-slate-700 flex items-center gap-2 text-xl">
                <Target :size="24" class="text-blue-600"/> {{ t.learning.skill_analysis.title }}
             </h3>
             <div class="flex gap-2 bg-slate-100 p-1 rounded-lg overflow-x-auto max-w-full custom-scrollbar">
                <button v-for="course in uniqueCourses" :key="course" @click="skillFilter = course" :class="['px-3 py-1.5 text-xs font-bold rounded-md transition-all whitespace-nowrap', skillFilter === course ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-700']">
                   {{ course }}
                </button>
             </div>
          </div>
          <div class="flex flex-wrap gap-1.5">
             <div v-for="(skill, i) in LEARNING_SKILLS_FULL" :key="i" :class="['group relative h-6 min-w-[3rem] px-1 rounded flex items-center justify-center text-[10px] font-bold text-white cursor-help transition-all duration-300', getScoreColor(skill.score), getSkillOpacity(skill.course, skillFilter)]">
                {{ skill.code }}
                <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-[200px] bg-slate-800 text-white text-xs rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-lg">
                   <div class="font-bold mb-0.5">{{ skill.name }}</div>
                   <div class="text-[10px] opacity-80">{{ skill.course }}</div>
                   <div class="flex justify-between mt-1"><span>掌握度:</span><span class="font-bold">{{ skill.score }}%</span></div>
                </div>
             </div>
          </div>
       </div>

       <!-- 5. Job Recommendations & AI Analysis -->
       <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div v-for="(job, idx) in JOB_RECOMMENDATIONS.slice(0, 3)" :key="idx" class="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col hover:border-orange-200 transition-all shadow-sm">
             <div class="flex justify-between items-start mb-4">
                <h5 class="font-bold text-slate-800 text-lg">{{ job.title }}</h5>
                <span class="bg-green-50 text-green-600 font-bold text-xs px-2 py-1 rounded-lg">{{ job.match }}% 匹配</span>
             </div>
             <SkillRadarChart :language="language" :data="job.matchingSkills" />
             <div class="mt-4 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 italic">"{{ job.reason }}"</div>
          </div>
       </div>

       <div class="bg-gradient-to-br from-violet-50 to-fuchsia-100 rounded-[2.5rem] p-8 border border-purple-100 shadow-sm relative overflow-hidden">
          <div class="relative z-10 flex flex-col lg:flex-row items-stretch gap-8">
             <div class="lg:w-1/3 flex flex-col items-center text-center bg-white/40 p-6 rounded-3xl backdrop-blur-sm">
                <div class="relative mb-6">
                   <img :src="currentPersona.avatar" class="w-40 h-40 rounded-full border-4 border-white shadow-xl" />
                   <div class="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-4 py-1.5 rounded-full text-sm font-bold">{{ currentPersona.name }}</div>
                </div>
                <p class="text-slate-600 font-medium italic mb-4">"{{ currentPersona.desc }}"</p>
                <div class="flex flex-wrap justify-center gap-2">
                   <span v-for="tag in (currentPersona as any).tags" :key="tag" class="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold">{{ tag }}</span>
                </div>
             </div>
             <div class="lg:w-2/3 bg-slate-900 rounded-3xl p-8 text-white flex flex-col justify-center relative overflow-hidden">
                <div class="absolute top-0 right-0 p-4 opacity-10"><Rocket :size="120" /></div>
                <h3 class="text-teal-400 font-black text-xs uppercase tracking-widest mb-4">AI Comprehensive Analysis</h3>
                <div class="text-3xl font-black mb-6">{{ t.learning.ai_analysis.title }}</div>
                <p class="text-lg text-slate-300 leading-relaxed mb-8 italic">"通过对您全生命周期学习数据的三维建模分析，您在算法实现上具有极客潜质。建议未来向 AI 物联网系统研发方向深入探索。"</p>
                <button @click="handleRegeneratePersona" class="self-start px-6 py-3 bg-teal-500 hover:bg-teal-600 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-teal-500/40">
                   <RefreshCw :size="18" :class="isRegenerating ? 'animate-spin' : ''" /> {{ isRegenerating ? '数据建模中...' : '深度重新挖掘' }}
                </button>
             </div>
          </div>
       </div>
    </div>

    <!-- TEACHER VIEW -->
    <div v-else class="space-y-8">
       <!-- Tab Controls -->
       <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div class="bg-white p-1 rounded-xl border border-slate-200 flex">
             <button @click="teacherTab = 'assistant'" :class="['px-6 py-2.5 text-sm font-bold rounded-lg transition-all flex items-center gap-2', teacherTab === 'assistant' ? 'bg-teal-50 text-teal-700' : 'text-slate-500 hover:bg-slate-50']">
                <Bot :size="18"/> {{ t.learning.teacher.tabs.assistant }}
             </button>
             <button @click="teacherTab = 'profile'" :class="['px-6 py-2.5 text-sm font-bold rounded-lg transition-all flex items-center gap-2', teacherTab === 'profile' ? 'bg-teal-50 text-teal-700' : 'text-slate-500 hover:bg-slate-50']">
                <Layout :size="18"/> {{ t.learning.teacher.tabs.profile }}
             </button>
          </div>
          <div class="flex items-center gap-4 bg-white p-1.5 rounded-xl border border-slate-200">
             <select v-model="selectedClass" class="bg-slate-50 border-none rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700 outline-none">
                <option v-for="c in MOCK_CLASSES" :key="c" :value="c">{{ c }}</option>
             </select>
             <select v-if="teacherTab === 'profile'" v-model="selectedProfileCourse" class="bg-teal-50 border-none rounded-lg px-3 py-1.5 text-xs font-bold text-teal-700 outline-none">
                <option v-for="c in teacherCourses" :key="c" :value="c">{{ c }}</option>
             </select>
          </div>
       </div>

       <!-- Assistant View -->
       <div v-if="teacherTab === 'assistant'" class="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[700px]">
          <div class="lg:col-span-1 space-y-6 flex flex-col">
             <div class="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 text-white shadow-xl">
                <h3 class="text-2xl font-black mb-4 flex items-center gap-3"><Bot :size="32"/> EDU AI</h3>
                <p class="text-indigo-100 text-sm leading-relaxed mb-8">{{ t.learning.teacher.ai.summary }}</p>
                <div class="grid grid-cols-2 gap-4">
                  <div v-for="stat in [{l:'班级量', v:'4'}, {l:'学生总数', v:'34'}, {l:'任务完成率', v:'84%'}, {l:'班均分', v:'67'}]" :key="stat.l" class="bg-white/10 p-4 rounded-2xl border border-white/10">
                    <div class="text-[10px] opacity-70 uppercase font-black">{{ stat.l }}</div>
                    <div class="text-2xl font-black">{{ stat.v }}</div>
                  </div>
                </div>
             </div>
             <div class="bg-white p-6 rounded-3xl border border-slate-200 flex-1 overflow-y-auto custom-scrollbar shadow-sm">
                <h4 class="font-black text-slate-800 mb-6 flex items-center gap-2"><Settings :size="18" class="text-slate-400"/> 数据源溯源设置</h4>
                <div class="space-y-6">
                   <div>
                      <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">分析班级范围</label>
                      <div class="space-y-2">
                        <label v-for="cls in MOCK_CLASSES" :key="cls" class="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-100 transition-all">
                           <input type="checkbox" :value="cls" v-model="selectedAiClasses" class="w-5 h-5 rounded border-slate-300 text-teal-600 focus:ring-teal-500" />
                           <span class="text-sm font-bold text-slate-700">{{ cls }}</span>
                        </label>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          <div class="lg:col-span-2 bg-white rounded-3xl border border-slate-200 flex flex-col overflow-hidden shadow-lg">
             <div class="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                <div class="font-black text-slate-700 flex items-center gap-3"><Bot :size="24" class="text-teal-600"/> 教学大模型分析中...</div>
                <button @click="handleClearHistory" class="text-xs font-black text-slate-400 hover:text-red-500 flex items-center gap-1 transition-colors bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm"><RefreshCw :size="12"/> 格式化对话</button>
             </div>
             <div class="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50/30">
                <div v-for="(msg, i) in aiChatHistory" :key="i" :class="['flex gap-4', msg.sender === 'user' ? 'flex-row-reverse' : '']">
                   <div :class="['w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-transform hover:scale-110', msg.sender === 'ai' ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-600']">
                      <component :is="msg.sender === 'ai' ? Bot : User" :size="24"/>
                   </div>
                   <div :class="['p-5 rounded-3xl max-w-[80%] text-sm leading-relaxed shadow-sm', msg.sender === 'ai' ? 'bg-white border border-slate-200 text-slate-700 rounded-tl-none font-medium' : 'bg-indigo-600 text-white rounded-tr-none font-bold']">
                      {{ msg.text }}
                   </div>
                </div>
             </div>
             <div class="p-6 bg-white border-t border-slate-100">
                <div class="flex gap-4 items-center bg-slate-50 p-2 rounded-2xl border border-slate-200 focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:border-indigo-500 transition-all">
                   <input v-model="aiChatInput" @keydown.enter="handleAiChatSend" class="flex-1 bg-transparent px-4 py-3 text-sm focus:outline-none placeholder-slate-400 font-medium" :placeholder="t.learning.teacher.ai.chat_placeholder" />
                   <button @click="handleAiChatSend" class="bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-xl shadow-lg transition-all hover:-translate-y-1"><Send :size="20"/></button>
                </div>
             </div>
          </div>
       </div>

       <!-- Profile View -->
       <div v-if="teacherTab === 'profile'" class="space-y-8 animate-fade-in">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
             <div class="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
                <div class="flex items-center gap-4 mb-8">
                   <div class="p-3 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-100 shadow-inner"><PieChart :size="28"/></div>
                   <h3 class="text-xl font-black text-slate-800">成绩区间分布 <span class="text-sm font-medium text-slate-400 block mt-1 tracking-normal">聚合展示全班在当前课程的表现</span></h3>
                </div>
                <div class="h-[300px] flex items-center justify-center">
                   <DonutChart :data="CLASS_COURSE_STATS.distribution" />
                </div>
             </div>
             <div class="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col">
                <div class="flex items-center gap-4 mb-8">
                   <div class="p-3 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100 shadow-inner"><TrendingUp :size="28"/></div>
                   <h3 class="text-xl font-black text-slate-800">班级全员成绩概影 <span class="text-sm font-medium text-slate-400 block mt-1 tracking-normal">基于正态发布的排名趋势图</span></h3>
                </div>
                <div class="flex-1 min-h-[250px] bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 p-4">
                   <BarChart :data="CLASS_COURSE_STATS.scoreRanking" />
                </div>
             </div>
          </div>

          <div class="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
             <div class="flex justify-between items-center mb-10">
                <div class="flex items-center gap-4">
                   <div class="p-3 bg-fuchsia-50 text-fuchsia-600 rounded-2xl border border-fuchsia-100 shadow-inner"><Map :size="28"/></div>
                   <h3 class="text-xl font-black text-slate-800">班级技能掌握热力图</h3>
                </div>
                <div class="flex gap-4 bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
                   <div v-for="c in [{l:'优秀', b:'bg-green-500'}, {l:'良好', b:'bg-blue-400'}, {l:'薄弱', b:'bg-slate-300'}]" :key="c.l" class="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <div :class="['w-2.5 h-2.5 rounded-full', c.b]"></div> {{ c.l }}
                   </div>
                </div>
             </div>
             <div class="flex flex-wrap gap-2.5">
                <div v-for="skill in LEARNING_SKILLS_FULL.filter(s => s.course === selectedProfileCourse)" :key="skill.code" :class="['group relative h-10 min-w-[4rem] px-3 rounded-xl flex items-center justify-center text-xs font-black text-white cursor-help transition-all shadow-md hover:scale-110 z-10', getScoreColor(skill.score)]">
                   {{ skill.code }}
                   <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-52 bg-slate-900 border border-white/10 text-white rounded-2xl p-4 opacity-0 group-hover:opacity-100 transition-all pointer-events-none shadow-2xl">
                      <div class="font-black border-b border-white/10 pb-2 mb-2">{{ skill.name }}</div>
                      <div class="flex justify-between items-center bg-white/5 p-2 rounded-lg">
                        <span class="text-[10px] text-slate-400 uppercase">Class Avg</span>
                        <span class="text-lg font-black text-teal-400">{{ skill.score }}%</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  </div>
</template>
