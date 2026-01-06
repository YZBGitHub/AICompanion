<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { 
  Filter, Database, ChevronDown, 
  Layers, Brain, Download, X,
  FileJson, List, Info, CheckCircle, PenTool
} from 'lucide-vue-next';
import { Language } from '../types';
import { 
  TEXT, MOCK_TASKS, MOCK_AI_ASSISTANTS_LIST, MOCK_AI_QA_DETAILS, 
  MOCK_SOFT_ENV_OPTIONS, MOCK_SOFT_OP_TASKS, MOCK_SOFT_OP_DETAILS, 
  MOCK_AUTO_SCORE_TASKS, MOCK_AUTO_SCORE_DETAILS, MOCK_HARD_ENV_OPTIONS, 
  MOCK_HARD_OP_TASKS, MOCK_HARD_OP_DETAILS, MOCK_NOTE_TASKS, MOCK_NOTE_DETAILS,
  MOCK_IOT_QUESTIONS
} from '../constants';

// Internal Components
import BarChart from '../components/BarChart.vue';
import AreaChart from '../components/AreaChart.vue';
import DonutChart from '../components/DonutChart.vue';

const props = defineProps<{
  language: Language;
}>();

const t = computed(() => TEXT[props.language]);

// Navigation State
const activeMenuId = ref('behavior');
const expandedMenus = ref<string[]>(['process_behavior', 'process_operation', 'third_party']);

// Sub-tabs
const behaviorSubTab = ref('platform');
const softExpSubTab = ref('env');
const hardExpSubTab = ref('interaction');
const learningOpSubTab = ref('task');

// Modals
const showDetailModal = ref(false);
const selectedRecord = ref<any>(null);
const mockQuestionResults = ref<any[]>([]);
const showExportModal = ref(false);
const isExporting = ref(false);

// Filters
const metric = ref('login'); 
const dimension = ref('school');
const timeGranularity = ref('day');
const chartType = ref<'bar' | 'line' | 'table'>('bar');

const MOCK_SCHOOLS = ['深圳职业技术大学', '金华职业技术学院', '南京信息职院'];
const MOCK_CLASSES: Record<string, string[]> = {
  '深圳职业技术大学': ['物联网1班', '物联网2班', '计算机1班'],
  '金华职业技术学院': ['电信1班', '电信2班'],
  '南京信息职院': ['软件1班', '软件2班']
};
const MOCK_USERS: Record<string, string[]> = {
  '物联网1班': ['李明', '张伟', '王芳'],
  '物联网2班': ['陈杰', '刘洋'],
  '计算机1班': ['赵强', '孙丽']
};
const MOCK_COURSES = ['《智慧园区》', '《嵌入式开发》', '《Python基础》'];

const selectedSchool = ref(MOCK_SCHOOLS[0]);
const selectedClass = ref(MOCK_CLASSES[selectedSchool.value][0]);
const selectedUser = ref(MOCK_USERS[selectedClass.value][0]);
const selectedCourse = ref(MOCK_COURSES[0]);

const selectedSoftAgent = ref('全部');
const selectedHardAgent = ref('全部');
const selectedSoftEnv = ref(MOCK_SOFT_ENV_OPTIONS[0]);
const selectedHardEnv = ref(MOCK_HARD_ENV_OPTIONS[0]);

const startDate = ref('2023-11-20');
const endDate = ref('2023-11-27');

// Chart Data Generation
const chartData = computed(() => {
  let labels: string[] = [];
  if (timeGranularity.value === 'hour') {
      labels = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];
  } else if (timeGranularity.value === 'day') {
     labels = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  } else if (timeGranularity.value === 'month') {
     labels = ['1月', '2月', '3月', '4月', '5月', '6月'];
  } else {
     labels = ['2023年', '2024年', '2025年'];
  }
  return labels.map(label => ({
    name: label,
    score: Math.floor(Math.random() * 80) + 20, // Reusing Score for BarChart
    val: Math.floor(Math.random() * 100) + 20   // For AreaChart
  }));
});

// Sidebar Structure
const NAV_STRUCTURE = computed(() => [
  { 
    id: 'process_behavior', 
    label: t.value.process.nav.process_behavior, 
    icon: Database,
    children: [
      { id: 'behavior', label: t.value.process.nav.behavior },
      { id: 'soft_exp', label: t.value.process.nav.soft_exp },
      { id: 'hard_exp', label: t.value.process.nav.hard_exp }
    ]
  },
  { 
    id: 'process_operation', 
    label: t.value.process.nav.process_operation, 
    icon: Layers,
    children: [
      { id: 'learning_op', label: t.value.process.nav.learning_op },
      { id: 'soft_op', label: t.value.process.nav.soft_op },
      { id: 'hard_op', label: t.value.process.nav.hard_op }
    ]
  }
]);

const toggleExpand = (id: string) => {
  if (expandedMenus.value.includes(id)) {
    expandedMenus.value = expandedMenus.value.filter(m => m !== id);
  } else {
    expandedMenus.value.push(id);
  }
};

const handleOpenDetail = (record: any) => {
  selectedRecord.value = record;
  if (record.type === 'task') {
      mockQuestionResults.value = MOCK_IOT_QUESTIONS.map(q => ({
         ...q,
         duration: Math.floor(Math.random() * 50) + 5 + 's',
         isCorrect: Math.random() > 0.3,
         switchCount: Math.floor(Math.random() * 3)
      }));
  }
  showDetailModal.value = true;
};

// Cascading Watchers
watch(selectedSchool, (newVal) => {
  selectedClass.value = MOCK_CLASSES[newVal][0];
});
watch(selectedClass, (newVal) => {
  if (MOCK_USERS[newVal]) {
    selectedUser.value = MOCK_USERS[newVal][0];
  }
});

const isOpDashboard = computed(() => ['learning_op', 'soft_op', 'hard_op'].includes(activeMenuId.value));
const isComplexDashboard = computed(() => ['behavior', 'soft_exp', 'hard_exp'].includes(activeMenuId.value));

onMounted(() => {
  // Sync logic if needed
});
</script>

<template>
  <div class="max-w-7xl mx-auto px-6 py-8 animate-fade-in flex flex-col md:flex-row gap-8 min-h-screen relative">
    
    <!-- Detail Modal -->
    <div v-if="showDetailModal && selectedRecord" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" @click="showDetailModal = false">
       <div class="bg-white rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col max-h-[95vh]" @click.stop>
          <div :class="['p-5 text-white flex justify-between items-center shrink-0', selectedRecord.type === 'ai' ? 'bg-purple-600' : 'bg-blue-600']">
             <h3 class="text-lg font-bold flex items-center gap-2">
                <Brain v-if="selectedRecord.type === 'ai'" :size="20"/> 
                <FileJson v-else :size="20" /> 
                {{ t.process.detail.title }}
             </h3>
             <button @click="showDetailModal = false" class="hover:bg-white/20 p-1 rounded-full"><X :size="20"/></button>
          </div>
          
          <div class="flex-1 overflow-y-auto p-6 bg-slate-50">
             <!-- Placeholder for diverse detail contents, following the logic of ProcessData.tsx -->
             <div v-if="selectedRecord.type === 'note'" class="bg-white p-8 rounded-xl shadow-sm">
                <h4 class="text-2xl font-bold mb-4">{{ MOCK_NOTE_DETAILS[selectedRecord.id]?.title }}</h4>
                <p class="text-slate-600 leading-relaxed">{{ MOCK_NOTE_DETAILS[selectedRecord.id]?.content }}</p>
             </div>
             
             <div v-else-if="selectedRecord.type === 'ai'" class="space-y-6">
                <!-- AI Detail View -->
                <div class="bg-white p-6 rounded-2xl border border-slate-100 flex gap-4 items-center">
                   <div class="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                      <Brain :size="32"/>
                   </div>
                   <div>
                      <h4 class="text-xl font-bold">{{ selectedRecord.name }}</h4>
                      <p class="text-sm text-slate-500">最近交互: {{ selectedRecord.lastTime }}</p>
                   </div>
                </div>
                <div v-for="(qa, i) in MOCK_AI_QA_DETAILS" :key="i" class="bg-white p-4 rounded-xl shadow-sm border border-slate-100 space-y-3">
                   <div class="flex gap-2">
                      <span class="font-bold text-slate-400">Q:</span>
                      <p class="text-slate-800">{{ qa.q }}</p>
                   </div>
                   <div class="flex gap-2 text-slate-600 pl-4 border-l-2 border-purple-200 italic">
                      <span class="font-bold text-purple-400">A:</span>
                      <p>{{ qa.a }}</p>
                   </div>
                </div>
             </div>
             
             <div v-else class="text-center py-20">
                <Info :size="48" class="mx-auto text-slate-300 mb-4"/>
                <p class="text-slate-500">详细数据正在加载或该记录类型详情待补充...</p>
                <p class="text-xs text-slate-400 mt-2">ID: {{ selectedRecord.id }} | Chapter: {{ selectedRecord.chapter }}</p>
             </div>
          </div>
          
          <div class="p-4 bg-white border-t border-slate-200 text-right">
             <button @click="showDetailModal = false" class="px-6 py-2 bg-slate-100 text-slate-700 rounded-lg font-bold hover:bg-slate-200">关闭</button>
          </div>
       </div>
    </div>

    <!-- Sidebar Navigation -->
    <div class="w-full md:w-64 shrink-0 bg-white rounded-2xl shadow-sm border border-slate-200 h-fit overflow-hidden">
       <div class="p-4 bg-teal-50 border-b border-teal-100 font-bold text-teal-800 flex items-center gap-2">
          <Filter :size="20"/> 数据分类
       </div>
       <div class="p-2 space-y-1">
          <div v-for="item in NAV_STRUCTURE" :key="item.id">
             <button 
               @click="toggleExpand(item.id)" 
               :class="['w-full flex items-center justify-between p-3 rounded-lg text-sm font-medium transition-all hover:bg-slate-50', expandedMenus.includes(item.id) ? 'text-teal-700 font-bold' : 'text-slate-600']"
             >
                <div class="flex items-center gap-3">
                   <component :is="item.icon" :size="18"/> {{ item.label }}
                </div>
                <ChevronDown :size="16" :class="['transition-transform', expandedMenus.includes(item.id) ? 'rotate-180' : '']"/>
             </button>
             <div v-if="expandedMenus.includes(item.id)" class="ml-4 pl-4 border-l-2 border-slate-100 mt-1 space-y-1">
                <button 
                  v-for="child in item.children" 
                  :key="child.id" 
                  @click="activeMenuId = child.id"
                  :class="['w-full text-left px-3 py-2 rounded-lg text-sm transition-all', activeMenuId === child.id ? 'text-teal-600 bg-teal-50 font-bold' : 'text-slate-500 hover:text-teal-600']"
                >
                   {{ child.label }}
                </button>
             </div>
          </div>
       </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 space-y-6 min-w-0">
       <div class="flex justify-between items-center">
          <h2 class="text-2xl font-bold text-slate-800">过程数据看板</h2>
          <button @click="showExportModal = true" class="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm hover:bg-slate-50 transition-all">
             <Download :size="16" class="text-teal-600"/> 导出 Excel
          </button>
       </div>

       <!-- Sub-tabs based on active mode -->
       <div v-if="activeMenuId === 'behavior'" class="bg-white p-1 rounded-xl border border-slate-200 flex w-fit">
          <button v-for="b in [{id:'platform', l:'平台'}, {id:'course', l:'课程'}, {id:'ai', l:'AI'}]" :key="b.id" @click="behaviorSubTab = b.id" :class="['px-6 py-2 text-sm font-bold rounded-lg transition-all', behaviorSubTab === b.id ? 'bg-teal-600 text-white' : 'text-slate-500 hover:bg-slate-50']">
             {{ b.l }}
          </button>
       </div>
       <div v-if="activeMenuId === 'learning_op'" class="bg-white p-1 rounded-xl border border-slate-200 flex w-fit">
          <button v-for="o in [{id:'task', l:'测验', i:List}, {id:'ai', l:'AI问答', i:Brain}, {id:'auto_score', l:'自动评分', i:CheckCircle}, {id:'note', l:'笔记', i:PenTool}]" :key="o.id" @click="learningOpSubTab = o.id" :class="['flex items-center gap-2 px-6 py-2 text-sm font-bold rounded-lg transition-all', learningOpSubTab === o.id ? 'bg-teal-600 text-white' : 'text-slate-500 hover:bg-slate-50']">
             <component :is="o.i" :size="14"/> {{ o.l }}
          </button>
       </div>

       <!-- Filter Panel -->
       <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
             <label class="text-xs font-bold text-slate-400 uppercase mb-2 block">学校</label>
             <select v-model="selectedSchool" class="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm">
                <option v-for="s in MOCK_SCHOOLS" :key="s" :value="s">{{ s }}</option>
             </select>
          </div>
          <div>
             <label class="text-xs font-bold text-slate-400 uppercase mb-2 block">班级</label>
             <select v-model="selectedClass" class="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm">
                <option v-for="c in MOCK_CLASSES[selectedSchool]" :key="c" :value="c">{{ c }}</option>
             </select>
          </div>
          <div v-if="activeMenuId !== 'behavior'">
             <label class="text-xs font-bold text-slate-400 uppercase mb-2 block">学生</label>
             <select v-model="selectedUser" class="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm">
                <option v-for="u in MOCK_USERS[selectedClass]" :key="u" :value="u">{{ u }}</option>
             </select>
          </div>
          <div>
             <label class="text-xs font-bold text-slate-400 uppercase mb-2 block">时间范围</label>
             <div class="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-200">
                <input type="date" v-model="startDate" class="bg-transparent text-xs w-full outline-none" />
                <span>-</span>
                <input type="date" v-model="endDate" class="bg-transparent text-xs w-full outline-none" />
             </div>
          </div>
       </div>

       <!-- Main Grid Content -->
       <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <!-- Trends Chart -->
          <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
             <div class="flex justify-between items-center mb-6">
                <h3 class="font-bold text-slate-700 flex items-center gap-2"><Activity :size="20" class="text-teal-600"/> 过程波动曲线</h3>
                <div class="flex bg-slate-100 p-1 rounded-lg">
                   <button @click="chartType = 'bar'" :class="['px-3 py-1 text-xs font-bold rounded', chartType === 'bar' ? 'bg-white text-teal-600' : 'text-slate-500']">柱状</button>
                   <button @click="chartType = 'line'" :class="['px-3 py-1 text-xs font-bold rounded', chartType === 'line' ? 'bg-white text-teal-600' : 'text-slate-500']">线性</button>
                </div>
             </div>
             <div class="h-64">
                <BarChart v-if="chartType === 'bar'" :data="chartData" />
                <AreaChart v-else :data="chartData.map(d => ({day: d.name, val: d.val}))" color="#14b8a6" id="process-trend" />
             </div>
          </div>

          <!-- Quick List -->
          <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
             <div class="p-4 bg-slate-50 border-b border-slate-200 font-bold text-slate-700 flex items-center gap-2">
                <List :size="20" class="text-blue-600"/> 最近记录
             </div>
             <div class="flex-1 overflow-y-auto max-h-64">
                <table class="w-full text-left text-xs">
                   <thead class="bg-slate-50 sticky top-0">
                      <tr class="text-slate-400 uppercase tracking-tighter">
                         <th class="px-4 py-2">时间</th>
                         <th class="px-4 py-2">章节内容</th>
                         <th class="px-4 py-2 text-center">操作</th>
                      </tr>
                   </thead>
                   <tbody class="divide-y divide-slate-100">
                      <tr v-for="task in MOCK_TASKS.slice(0, 10)" :key="task.id" class="hover:bg-slate-50 transition-colors">
                         <td class="px-4 py-3 font-mono text-slate-400">{{ task.time }}</td>
                         <td class="px-4 py-3 font-bold text-slate-700">{{ task.chapter }}</td>
                         <td class="px-4 py-3 text-center">
                            <button @click="handleOpenDetail(task)" class="text-blue-600 font-bold hover:underline">详情</button>
                         </td>
                      </tr>
                   </tbody>
                </table>
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
