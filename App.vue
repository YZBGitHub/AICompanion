<script setup lang="ts">
import { ref, computed } from 'vue';
import { UserRole, ViewState, Language } from './types';
import Navbar from './components/Navbar.vue';
import Home from './views/Home.vue';
import AICompanion from './views/AICompanion.vue';
import SkillAnalysis from './views/SkillAnalysis.vue';
import LearningAnalysis from './views/LearningAnalysis.vue';
import ProcessData from './views/ProcessData.vue';
import PlatformIntro from './views/PlatformIntro.vue';
import { TEXT } from './constants';

const currentRole = ref<UserRole>(UserRole.VISITOR);
const currentView = ref<ViewState>(ViewState.HOME);
const isMobileMenuOpen = ref(false);
const language = ref<Language>('zh');

const t = computed(() => TEXT[language.value]);

const handleRoleChange = (role: UserRole) => {
  currentRole.value = role;
  currentView.value = ViewState.HOME;
  isMobileMenuOpen.value = false;
};

const handleViewChange = (view: ViewState) => {
  currentView.value = view;
  isMobileMenuOpen.value = false;
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
</script>

<template>
  <div class="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
    <Navbar 
      :currentRole="currentRole"
      :currentView="currentView"
      :isMobileMenuOpen="isMobileMenuOpen"
      :language="language"
      @onViewChange="handleViewChange"
      @onRoleChange="handleRoleChange"
      @onLanguageChange="(l) => language = l"
      @onMobileMenuToggle="toggleMobileMenu"
    />
    
    <main class="flex-1">
      <Home v-if="currentView === ViewState.HOME" :language="language" :currentRole="currentRole" @onRoleChange="handleRoleChange" />
      <AICompanion v-if="currentView === ViewState.AI_COMPANION" :language="language" />
      <SkillAnalysis v-if="currentView === ViewState.SKILL_ANALYSIS" :language="language" :currentRole="currentRole" />
      <LearningAnalysis v-if="currentView === ViewState.LEARNING_ANALYSIS" :language="language" :currentRole="currentRole" />
      <ProcessData v-if="currentView === ViewState.PROCESS_DATA" :language="language" />
      <PlatformIntro v-if="currentView === ViewState.PLATFORM_INTRO" :language="language" />
    </main>
    
    <footer class="bg-white border-t border-slate-200 py-12 mt-12">
      <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
        <p>{{ t.app.footer }}</p>
        <div class="flex gap-6 mt-4 md:mt-0">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Contact Support</span>
        </div>
      </div>
    </footer>
  </div>
</template>
