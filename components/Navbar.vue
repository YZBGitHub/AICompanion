<script setup lang="ts">
import { computed } from 'vue';
import { Brain, Globe, Users, Menu, X } from 'lucide-vue-next';
import { UserRole, ViewState, Language } from '../types';
import { TEXT } from '../constants';

const props = defineProps<{
  currentRole: UserRole;
  currentView: ViewState;
  isMobileMenuOpen: boolean;
  language: Language;
}>();

const emit = defineEmits<{
  (e: 'onViewChange', view: ViewState): void;
  (e: 'onRoleChange', role: UserRole): void;
  (e: 'onLanguageChange', lang: Language): void;
  (e: 'onMobileMenuToggle'): void;
}>();

const t = computed(() => TEXT[props.language]);

const navItems = computed(() => {
  const common = [
    { label: t.value.nav.home, view: ViewState.HOME },
    { label: t.value.nav.intro, view: ViewState.PLATFORM_INTRO }
  ];
  
  switch (props.currentRole) {
    case UserRole.VISITOR:
      return common;
    case UserRole.STUDENT:
      return [
        ...common,
        { label: t.value.nav.companion, view: ViewState.AI_COMPANION },
        { label: t.value.nav.skill, view: ViewState.SKILL_ANALYSIS },
      ];
    case UserRole.TEACHER:
      return [
        ...common,
        { label: t.value.nav.companion, view: ViewState.AI_COMPANION },
        { label: t.value.nav.skill, view: ViewState.SKILL_ANALYSIS },
        { label: t.value.nav.learning, view: ViewState.LEARNING_ANALYSIS },
      ];
    case UserRole.ADMIN:
      return [
        ...common,
        { label: t.value.nav.companion, view: ViewState.AI_COMPANION },
        { label: t.value.nav.skill, view: ViewState.SKILL_ANALYSIS },
        { label: t.value.nav.learning, view: ViewState.LEARNING_ANALYSIS },
        { label: t.value.nav.process, view: ViewState.PROCESS_DATA },
      ];
    default:
      return common;
  }
});
</script>

<template>
  <nav class="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center gap-3 cursor-pointer" @click="emit('onViewChange', ViewState.HOME)">
          <div class="bg-teal-600 p-2 rounded-lg text-white shadow-lg shadow-teal-200">
            <Brain :size="24" />
          </div>
          <div class="hidden md:block">
            <h1 class="text-xl font-bold text-slate-800 tracking-tight">{{ t.app.title }}</h1>
            <p class="text-xs text-slate-500 font-medium">{{ t.app.subtitle }}</p>
          </div>
        </div>

        <div class="hidden md:flex items-center space-x-1">
          <button
            v-for="item in navItems"
            :key="item.label"
            @click="emit('onViewChange', item.view)"
            :class="[
              'px-4 py-2 text-sm font-medium rounded-full transition-all duration-200',
              currentView === item.view 
                ? 'bg-teal-50 text-teal-700 font-bold' 
                : 'text-slate-600 hover:text-teal-600 hover:bg-slate-50'
            ]"
          >
            {{ item.label }}
          </button>
        </div>

        <div class="flex items-center gap-4">
          <button 
            @click="emit('onLanguageChange', language === 'zh' ? 'en' : 'zh')"
            class="flex items-center gap-1 text-slate-600 hover:text-teal-600 px-2 py-1 rounded transition-colors"
          >
            <Globe :size="18" />
            <span class="text-sm font-medium">{{ language === 'zh' ? 'EN' : '中' }}</span>
          </button>

          <div class="relative group">
            <button class="flex items-center gap-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-full transition-colors border border-slate-200">
              <Users :size="16" />
              {{ t.roles[currentRole] }}
            </button>
            <div class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
              <button
                v-for="role in Object.values(UserRole)"
                :key="role"
                @click="emit('onRoleChange', role)"
                :class="[
                  'block w-full text-left px-4 py-3 text-sm hover:bg-slate-50 first:rounded-t-lg last:rounded-b-lg',
                  currentRole === role ? 'text-teal-600 font-bold bg-teal-50' : 'text-slate-600'
                ]"
              >
                {{ t.roles[role] }}
              </button>
            </div>
          </div>
          
          <button class="md:hidden p-2 text-slate-600" @click="emit('onMobileMenuToggle')">
            <X v-if="isMobileMenuOpen" />
            <Menu v-else />
          </button>
        </div>
      </div>
    </div>
    
    <div v-if="isMobileMenuOpen" class="md:hidden bg-white border-t border-slate-200 shadow-lg">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <button
          v-for="item in navItems"
          :key="item.label"
          @click="() => { emit('onViewChange', item.view); emit('onMobileMenuToggle'); }"
          :class="[
            'block w-full text-left px-3 py-3 rounded-md text-base font-medium',
            currentView === item.view ? 'bg-teal-50 text-teal-700' : 'text-slate-700'
          ]"
        >
          {{ item.label }}
        </button>
      </div>
    </div>
  </nav>
</template>
