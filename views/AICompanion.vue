<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { 
  Zap, CheckCircle, MessageSquare, Clock, Activity, Settings, 
  Compass, Building2, Cpu, Award, Brain, AlertCircle, Share2, 
  ThumbsUp, Star, Calendar, Flame, Code, User, GraduationCap, X 
} from 'lucide-vue-next';
import { Language } from '../types';
import { TEXT, AVATARS } from '../constants';
import { getGeminiResponse } from '../services/geminiService';

const props = defineProps<{ language: Language }>();

const t = computed(() => TEXT[props.language]);

const showConfigModal = ref(true); 
const companionConfig = reactive({ 
  nickname: 'User123', 
  personality: '知性 (理性客观)', 
  role: '学姐 (耐心细致)',
  avatar: AVATARS[0].src,
  customPrompt: ''
});

const chatInput = ref('');
const chatHistory = ref<{sender: 'user'|'ai', text: string}[]>([]);

const rankingData = computed(() => ({
  skill: [
    { rank: 1, name: props.language === 'zh' ? '智慧园区' : 'Smart Park', count: 98 },
    { rank: 2, name: props.language === 'zh' ? '嵌入式开发' : 'Embedded Dev', count: 95 },
    { rank: 3, name: props.language === 'zh' ? 'Python基础' : 'Python Basic', count: 88 },
  ],
  hard: [
    { rank: 1, name: props.language === 'zh' ? '串口助手' : 'Serial Port', count: 92 },
    { rank: 2, name: props.language === 'zh' ? 'LoRa终端' : 'LoRa Term', count: 89 },
    { rank: 3, name: props.language === 'zh' ? '虚拟示波器' : 'Oscilloscope', count: 85 },
  ],
  soft: [
    { rank: 1, name: props.language === 'zh' ? '虚拟仿真' : 'Virtual Sim', count: 96 },
    { rank: 2, name: props.language === 'zh' ? '在线编译器' : 'Web Compiler', count: 90 },
    { rank: 3, name: props.language === 'zh' ? '代码检视' : 'Code Review', count: 82 },
  ]
}));

const handleChatSend = async () => {
  if (!chatInput.value.trim()) return;
  const userMsg = chatInput.value;
  chatHistory.value.push({ sender: 'user', text: userMsg });
  chatInput.value = '';
  
  try {
    // 实际集成 Gemini 服务 (如果可用)
    // const response = await getGeminiResponse(userMsg, companionConfig.customPrompt);
    // chatHistory.value.push({ sender: 'ai', text: response });
    
    // 模拟回复
    setTimeout(() => {
      chatHistory.value.push({ 
        sender: 'ai', 
        text: props.language === 'zh' 
          ? `收到你的消息: "${userMsg}"。作为你的${companionConfig.role.split(' ')[0]}，我时刻准备着协助你的学习。` 
          : `Received: "${userMsg}". As your ${companionConfig.role.split(' ')[0]}, I am ready to assist.`
      });
    }, 1000);
  } catch (error) {
    chatHistory.value.push({ sender: 'ai', text: 'AI Error: ' + error });
  }
};

const getBgGradient = computed(() => {
    const r = companionConfig.role.split(' ')[0];
    if (r.includes('学长')) return 'bg-gradient-to-b from-blue-50/50 to-slate-50';
    if (r.includes('学姐')) return 'bg-gradient-to-b from-pink-50/50 to-slate-50';
    if (r.includes('教师')) return 'bg-gradient-to-b from-amber-50/50 to-slate-50';
    return 'bg-slate-50';
});

const bgIcon = computed(() => {
    const r = companionConfig.role.split(' ')[0];
    if (r.includes('学长')) return User;
    if (r.includes('学姐')) return User;
    if (r.includes('教师')) return GraduationCap;
    return Brain;
});

const bgIconClass = computed(() => {
    const r = companionConfig.role.split(' ')[0];
    if (r.includes('学长')) return 'text-blue-100 opacity-50';
    if (r.includes('学姐')) return 'text-pink-100 opacity-50';
    if (r.includes('教师')) return 'text-amber-100 opacity-50';
    return 'text-slate-100 opacity-50';
});

const currentTime = ref('');
const updateTime = () => {
  const now = new Date();
  currentTime.value = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
};

onMounted(() => {
  updateTime();
  setInterval(updateTime, 60000);
});
</script>

<template>
  <div class="max-w-7xl mx-auto px-6 py-6 animate-fade-in min-h-screen flex flex-col gap-6">
    <!-- Settings Modal -->
    <div v-if="showConfigModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden transform transition-all scale-100 flex flex-col max-h-[90vh]">
          <div class="bg-teal-600 p-6 text-white text-center shrink-0 relative">
            <button @click="showConfigModal = false" class="absolute top-4 right-4 hover:bg-white/20 p-1 rounded-full transition-colors">
              <X :size="24" />
            </button>
            <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap :size="32" />
            </div>
            <h3 class="text-xl font-bold">{{ t.companion.config.title }}</h3>
          </div>
          <div class="p-8 space-y-6 overflow-y-auto custom-scrollbar">
            <div>
              <label class="text-sm font-medium text-slate-700 block mb-2">{{ t.companion.config.nickname }}</label>
              <input 
                type="text" 
                v-model="companionConfig.nickname"
                class="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
              />
            </div>
            <!-- Avatar Selection -->
            <div>
              <label class="text-sm font-medium text-slate-700 block mb-2">{{ t.companion.config.avatar }} (50个可选)</label>
              <div class="grid grid-cols-5 sm:grid-cols-10 gap-3 max-h-[200px] overflow-y-auto p-2 border border-slate-100 rounded-xl custom-scrollbar">
                  <div 
                    v-for="ava in AVATARS"
                    :key="ava.id" 
                    @click="companionConfig.avatar = ava.src"
                    :class="[
                      'cursor-pointer rounded-xl p-1 border-2 transition-all',
                      companionConfig.avatar === ava.src ? 'border-teal-500 scale-110 shadow-md bg-teal-50' : 'border-transparent hover:border-slate-200'
                    ]"
                  >
                    <img :src="ava.src" :alt="ava.label" class="w-full h-full rounded-lg bg-white" />
                  </div>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="text-sm font-medium text-slate-700 block mb-2">{{ t.companion.config.personality }}</label>
                  <select 
                    v-model="companionConfig.personality"
                    class="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:ring-2 focus:ring-teal-500"
                  >
                    <option v-for="o in t.companion.config.p_options" :key="o" :value="o">{{ o }}</option>
                  </select>
                </div>
                <div>
                  <label class="text-sm font-medium text-slate-700 block mb-2">{{ t.companion.config.role }}</label>
                  <select 
                    v-model="companionConfig.role"
                    class="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:ring-2 focus:ring-teal-500"
                  >
                    <option v-for="o in t.companion.config.r_options" :key="o" :value="o">{{ o }}</option>
                  </select>
                </div>
            </div>

            <!-- Custom System Prompt -->
            <div>
               <div class="flex justify-between items-center mb-2">
                 <label class="text-sm font-medium text-slate-700 block">
                   {{ t.companion.config.custom_prompt }} <span class="text-slate-400 font-normal ml-1">(可选)</span>
                 </label>
                 <span :class="['text-[10px] font-bold', companionConfig.customPrompt.length >= 100 ? 'text-red-500' : 'text-slate-400']">
                    {{ companionConfig.customPrompt.length }} / 100
                 </span>
               </div>
               <textarea 
                 v-model="companionConfig.customPrompt"
                 @input="companionConfig.customPrompt = companionConfig.customPrompt.substring(0, 100)"
                 :placeholder="t.companion.config.custom_prompt_placeholder"
                 rows="3"
                 class="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none resize-none transition-all"
               ></textarea>
            </div>

            <button 
              @click="showConfigModal = false"
              class="w-full bg-teal-600 hover:bg-teal-700 text-white font-black py-4 rounded-xl shadow-lg shadow-teal-500/30 transition-all transform hover:-translate-y-0.5"
            >
              {{ t.companion.config.save }}
            </button>
          </div>
      </div>
    </div>

    <!-- --- Top Row: Stats --- -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div v-for="(s, i) in [
          { label: t.companion.stats.help_count, val: '120', color: 'text-blue-600', icon: CheckCircle, iconColor: 'text-blue-600' },
          { label: t.companion.stats.questions, val: '45', color: 'text-purple-600', icon: MessageSquare, iconColor: 'text-purple-600' },
          { label: t.companion.stats.time, val: '12h', color: 'text-orange-600', icon: Clock, iconColor: 'text-orange-600' },
          { label: t.companion.stats.volume, val: '450', color: 'text-teal-600', icon: Activity, iconColor: 'text-teal-600' },
        ]" :key="i" class="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
          <div class="relative z-10">
            <div :class="['text-3xl font-bold mb-1', s.color]">{{ s.val }}</div>
            <div class="text-sm text-slate-500 font-medium">{{ s.label }}</div>
          </div>
          <div class="absolute right-0 bottom-0 p-2 transform group-hover:scale-110 transition-transform">
            <component :is="s.icon" :size="48" :class="[s.iconColor, 'opacity-20']" />
          </div>
        </div>
    </div>

    <!-- --- Main Content Grid --- -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
      
      <!-- Left Column (3/12): Profile & Status -->
      <div class="lg:col-span-3 space-y-6 flex flex-col">
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center relative">
            <button @click="showConfigModal = true" class="absolute top-4 right-4 text-slate-400 hover:text-teal-600 transition-colors">
              <Settings :size="18" />
            </button>
            <div class="w-24 h-24 rounded-full mx-auto mb-4 p-1 border-4 border-teal-50 shadow-lg relative bg-white">
              <img :src="companionConfig.avatar" alt="Avatar" class="w-full h-full rounded-full bg-slate-100" />
              <div class="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <h3 class="font-bold text-slate-800 text-lg mb-1">{{ companionConfig.nickname }}</h3>
            <div class="flex justify-center gap-2 mb-4 flex-wrap">
              <span class="bg-teal-50 text-teal-700 text-xs px-2 py-1 rounded-full border border-teal-100">{{ companionConfig.role.split(' ')[0] }}</span>
              <span class="bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded-full border border-purple-100">{{ companionConfig.personality.split(' ')[0] }}</span>
            </div>
            <p class="text-slate-500 text-xs italic">"Learning is a journey, not a destination."</p>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex-1">
            <h3 class="font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Compass :size="20" class="text-teal-500" /> {{ t.companion.paths.title }}
            </h3>
            
            <div class="space-y-6">
              <div>
                  <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">{{ t.companion.paths.courses }}</h4>
                  <div class="space-y-4">
                    <div class="group border border-slate-100 rounded-xl p-3 hover:shadow-md transition-all bg-slate-50/50">
                        <div class="flex gap-3 mb-2">
                          <div class="w-12 h-12 rounded-lg bg-teal-100 shrink-0 flex items-center justify-center">
                              <Building2 class="text-teal-600" :size="24" />
                          </div>
                          <div class="flex-1 min-w-0">
                              <h5 class="font-bold text-slate-800 text-sm truncate">{{ t.companion.paths.smart_park }}</h5>
                              <div class="flex justify-between items-center mt-1">
                                <span class="text-xs text-slate-500">Progress</span>
                                <span class="text-xs font-bold text-teal-600">80%</span>
                              </div>
                          </div>
                        </div>
                        <div class="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden mb-3">
                          <div class="bg-teal-500 h-1.5 rounded-full" style="width: 80%"></div>
                        </div>
                        <button class="w-full text-xs bg-teal-500 text-white py-1.5 rounded-lg hover:bg-teal-600 transition-colors font-medium">
                          {{ t.companion.paths.status.continuing }}
                        </button>
                    </div>
                    <div class="group border border-slate-100 rounded-xl p-3 hover:shadow-md transition-all bg-slate-50/50">
                        <div class="flex gap-3 mb-2">
                          <div class="w-12 h-12 rounded-lg bg-orange-100 shrink-0 flex items-center justify-center">
                              <Cpu class="text-orange-600" :size="24" />
                          </div>
                          <div class="flex-1 min-w-0">
                              <h5 class="font-bold text-slate-800 text-sm truncate">{{ t.companion.paths.embedded }}</h5>
                              <div class="flex justify-between items-center mt-1">
                                <span class="text-xs text-slate-500">Progress</span>
                                <span class="text-xs font-bold text-orange-600">20%</span>
                              </div>
                          </div>
                        </div>
                        <div class="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden mb-3">
                          <div class="bg-orange-400 h-1.5 rounded-full" style="width: 20%"></div>
                        </div>
                        <button class="w-full text-xs bg-orange-500 text-white py-1.5 rounded-lg hover:bg-orange-600 transition-colors font-medium">
                          {{ t.companion.paths.status.continuing }}
                        </button>
                    </div>
                  </div>
              </div>

              <div>
                  <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">{{ t.companion.paths.exams }}</h4>
                  <div class="border border-red-100 rounded-xl p-3 bg-red-50/30 hover:shadow-md transition-all relative overflow-hidden">
                    <div class="absolute top-0 right-0 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-bl-lg font-bold">
                        3 {{ t.companion.paths.days_left }}
                    </div>
                    <div class="flex gap-3 mb-2 pt-2">
                        <div class="w-12 h-12 rounded-lg bg-red-100 shrink-0 flex items-center justify-center">
                          <Award class="text-red-600" :size="24" />
                        </div>
                        <div class="flex-1">
                          <h5 class="font-bold text-slate-800 text-sm">{{ t.companion.paths.python_cert }}</h5>
                          <div class="text-xs text-slate-500 mt-1 flex items-center gap-1">
                              <Clock :size="10" /> {{ t.companion.paths.start_time }}: 12/01
                          </div>
                        </div>
                    </div>
                    <button class="w-full text-xs border border-red-200 text-red-600 py-1.5 rounded-lg hover:bg-red-50 transition-colors font-medium mt-1">
                        {{ t.companion.paths.status.exam }}
                    </button>
                  </div>
              </div>
            </div>
        </div>
      </div>

      <!-- Center Column (6/12): Chat Interface -->
      <div class="lg:col-span-6 h-[600px] lg:h-auto flex flex-col">
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col h-full overflow-hidden relative">
          <!-- Header -->
          <div class="p-4 border-b border-slate-100 bg-white/90 backdrop-blur-sm flex justify-between items-center z-10 sticky top-0">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 border border-teal-200">
                  <Brain :size="20" />
                </div>
                <div>
                  <div class="font-bold text-slate-700 flex items-center gap-2">
                    {{ t.companion.chat.header }}
                    <span class="flex h-2 w-2 relative">
                      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                  </div>
                  <div class="text-xs text-slate-500">{{ companionConfig.role.split(' ')[0] }} - {{ companionConfig.personality.split(' ')[0] }}</div>
                </div>
              </div>
              <div class="flex flex-col items-end">
                 <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">{{ t.companion.chat.recent }}</div>
                 <div class="text-xs text-slate-600 font-mono flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                    <Clock :size="12" class="text-teal-500"/> {{ currentTime }}
                 </div>
              </div>
          </div>
          
          <!-- Chat Area -->
          <div :class="['flex-1 overflow-y-auto p-6 space-y-6 relative transition-colors duration-500', getBgGradient]">
              <div class="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                <div class="transform translate-y-12 blur-sm">
                  <component :is="bgIcon" :size="400" :class="bgIconClass" />
                </div>
              </div>

              <div v-if="chatHistory.length === 0" class="flex flex-col items-center justify-center h-full text-slate-500 space-y-4 relative z-10">
                <div class="w-20 h-20 bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center animate-pulse shadow-sm border border-white">
                  <MessageSquare :size="32" class="opacity-60 text-slate-600" />
                </div>
                <p class="text-sm font-medium bg-white/40 px-4 py-2 rounded-full backdrop-blur-sm">{{ t.companion.chat.placeholder }}</p>
              </div>
              <div v-for="(msg, idx) in chatHistory" :key="idx" :class="['flex gap-4 animate-fade-in relative z-10', msg.sender === 'user' ? 'flex-row-reverse' : '']">
                  <div v-if="msg.sender === 'user'" class="w-10 h-10 rounded-full flex-shrink-0 shadow-sm border-2 border-white overflow-hidden">
                      <img :src="companionConfig.avatar" alt="User" class="w-full h-full bg-slate-200" />
                  </div>
                  <div v-else class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm bg-teal-600 text-white border-2 border-white">
                      <Brain :size="16" />
                  </div>
                  <div :class="[
                    'p-4 rounded-2xl text-sm max-w-[80%] shadow-sm',
                    msg.sender === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white/90 backdrop-blur-sm border border-white text-slate-800 rounded-tl-none'
                  ]">
                    {{ msg.text }}
                  </div>
              </div>
          </div>
          
          <div class="p-4 bg-white border-t border-slate-100 z-10">
            <div class="flex gap-3 items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-teal-500/50 focus-within:border-teal-500 transition-all shadow-sm">
              <input 
                type="text" 
                v-model="chatInput"
                @keydown.enter="handleChatSend"
                class="flex-1 bg-transparent border-none text-slate-700 focus:outline-none placeholder-slate-400"
                placeholder="Ask anything..." 
              />
              <button 
                @click="handleChatSend" 
                :class="[
                  'p-2 rounded-lg transition-all',
                  chatInput.trim() ? 'bg-teal-600 text-white shadow-md hover:bg-teal-700' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                ]"
                :disabled="!chatInput.trim()"
              >
                <Share2 :size="18" :class="chatInput.trim() ? '' : 'rotate-90'" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column (3/12): Feedback, Tasks, Rankings -->
      <div class="lg:col-span-3 space-y-6 flex flex-col h-full overflow-y-auto pr-1">
        
        <div class="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group shrink-0">
            <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
              <ThumbsUp :size="100" />
            </div>
            <div class="relative z-10">
              <div class="flex items-center gap-2 mb-3">
                <div class="bg-white/20 p-1.5 rounded-lg backdrop-blur-sm"><Star :size="16" class="text-yellow-300 fill-current"/></div>
                <h3 class="font-bold text-xs uppercase tracking-wide opacity-90">{{ companionConfig.nickname }} {{ t.companion.feedback.title }}</h3>
              </div>
              <h4 class="font-bold text-2xl mb-2">{{ t.companion.feedback.great }}</h4>
              <p class="text-indigo-100 text-sm leading-relaxed mb-4">
                {{ t.companion.feedback.content }}
              </p>
            </div>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 shrink-0">
            <h3 class="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Calendar :size="20" class="text-teal-500" /> {{ t.companion.tasks.title }}
            </h3>
            <div class="space-y-4">
              <div v-for="(task, i) in [
                { txt: t.companion.tasks.t1, done: true },
                { txt: t.companion.tasks.t2, done: false },
                { txt: t.companion.tasks.t3, done: false },
              ]" :key="i" class="flex items-start justify-between gap-2 group">
                <div class="flex items-start gap-3">
                  <div :class="[
                    'mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors',
                    task.done ? 'bg-teal-500 border-teal-500' : 'border-slate-300'
                  ]">
                    <CheckCircle v-if="task.done" :size="12" class="text-white" />
                  </div>
                  <span :class="['text-sm', task.done ? 'text-slate-400 line-through' : 'text-slate-700 font-medium']">{{ task.txt }}</span>
                </div>
                <button v-if="!task.done" class="text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100 font-bold whitespace-nowrap">
                    {{ t.companion.tasks.continue }}
                </button>
              </div>
            </div>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex-1 flex flex-col">
            <div class="mb-4">
              <h3 class="font-bold text-slate-800 flex items-center gap-2">
                <Award :size="20" class="text-yellow-500" /> {{ t.companion.rank.title }}
              </h3>
            </div>
            
            <div class="flex-1 space-y-6">
              <div>
                <h4 class="text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider flex items-center gap-1"><Zap :size="10"/> {{ t.companion.rank.skill_assist }}</h4>
                <div class="flex justify-between text-[10px] text-slate-400 mb-2 px-1">
                    <span>{{ t.companion.rank.col_name }}</span>
                    <span>{{ t.companion.rank.col_count }}</span>
                </div>
                <ul class="space-y-2">
                    <li v-for="(item, idx) in rankingData.skill" :key="idx" class="flex justify-between items-center text-sm border-b border-slate-50 pb-1 last:border-0">
                        <div class="flex items-center gap-2">
                          <span :class="['w-4 h-4 flex items-center justify-center rounded text-[10px] font-bold', idx===0?'bg-yellow-100 text-yellow-700':idx===1?'bg-slate-200 text-slate-600':'bg-orange-100 text-orange-700']">{{ item.rank }}</span>
                          <span class="text-slate-700 font-medium truncate max-w-[100px]">{{ item.name }}</span>
                        </div>
                        <div class="flex items-center gap-1 text-slate-500 text-xs">
                          <Flame :size="10" class="text-red-400 fill-current" />
                          {{ item.count }}
                        </div>
                    </li>
                </ul>
              </div>
              <!-- Hardware -->
              <div>
                <h4 class="text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider flex items-center gap-1"><Cpu :size="10"/> {{ t.companion.rank.hardware }}</h4>
                <ul class="space-y-2">
                    <li v-for="(item, idx) in rankingData.hard" :key="idx" class="flex justify-between items-center text-sm border-b border-slate-50 pb-1 last:border-0">
                        <div class="flex items-center gap-2">
                          <span :class="['w-4 h-4 flex items-center justify-center rounded text-[10px] font-bold', idx===0?'bg-yellow-100 text-yellow-700':idx===1?'bg-slate-200 text-slate-600':'bg-orange-100 text-orange-700']">{{ item.rank }}</span>
                          <span class="text-slate-700 font-medium truncate max-w-[100px]">{{ item.name }}</span>
                        </div>
                        <div class="flex items-center gap-1 text-slate-500 text-xs">
                          <Flame :size="10" class="text-red-400 fill-current" />
                          {{ item.count }}
                        </div>
                    </li>
                </ul>
              </div>
              <!-- Software -->
              <div>
                <h4 class="text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider flex items-center gap-1"><Code :size="10"/> {{ t.companion.rank.software }}</h4>
                <ul class="space-y-2">
                    <li v-for="(item, idx) in rankingData.soft" :key="idx" class="flex justify-between items-center text-sm border-b border-slate-50 pb-1 last:border-0">
                        <div class="flex items-center gap-2">
                          <span :class="['w-4 h-4 flex items-center justify-center rounded text-[10px] font-bold', idx===0?'bg-yellow-100 text-yellow-700':idx===1?'bg-slate-200 text-slate-600':'bg-orange-100 text-orange-700']">{{ item.rank }}</span>
                          <span class="text-slate-700 font-medium truncate max-w-[100px]">{{ item.name }}</span>
                        </div>
                        <div class="flex items-center gap-1 text-slate-500 text-xs">
                          <Flame :size="10" class="text-red-400 fill-current" />
                          {{ item.count }}
                        </div>
                    </li>
                </ul>
              </div>
            </div>
        </div>
      </div>

    </div>
  </div>
</template>
