<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  data: { name: string; score: number }[];
}>();

const maxScore = 100;
</script>

<template>
  <div class="h-full flex items-end gap-1 px-2">
    <div 
      v-for="(d, i) in data" :key="i" 
      class="flex-1 group relative cursor-help"
      :style="{ height: (d.score / maxScore * 100) + '%' }"
    >
      <div 
        :class="[
          'w-full h-full rounded-t transition-all',
          d.score >= 90 ? 'bg-emerald-500' : d.score >= 80 ? 'bg-blue-500' : d.score >= 60 ? 'bg-orange-500' : 'bg-red-500'
        ]"
      ></div>
      <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-10">
        {{ d.name }}: {{ d.score }}
      </div>
    </div>
  </div>
</template>
