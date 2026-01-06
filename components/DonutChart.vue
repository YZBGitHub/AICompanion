<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  data: { name: string; value: number; color: string }[];
}>();

const total = computed(() => props.data.reduce((sum, d) => sum + d.value, 0));

const arcs = computed(() => {
  let startAngle = 0;
  return props.data.map(d => {
    const angle = (d.value / total.value) * 2 * Math.PI;
    const endAngle = startAngle + angle;
    const x1 = 100 + 80 * Math.cos(startAngle - Math.PI / 2);
    const y1 = 100 + 80 * Math.sin(startAngle - Math.PI / 2);
    const x2 = 100 + 80 * Math.cos(endAngle - Math.PI / 2);
    const y2 = 100 + 80 * Math.sin(endAngle - Math.PI / 2);
    
    const largeArc = angle > Math.PI ? 1 : 0;
    const path = `M ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2}`;
    
    const res = { path, color: d.color, startAngle, endAngle };
    startAngle = endAngle;
    return res;
  });
});
</script>

<template>
  <div class="flex items-center gap-4">
    <svg width="200" height="200" viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="60" fill="none" />
      <path v-for="(arc, i) in arcs" :key="i" :d="arc.path" fill="none" :stroke="arc.color" stroke-width="20" />
    </svg>
    <div class="flex flex-col gap-2">
      <div v-for="(d, i) in data" :key="i" class="flex items-center gap-2 text-xs">
        <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: d.color }"></div>
        <span class="text-slate-600">{{ d.name }}: {{ d.value }}</span>
      </div>
    </div>
  </div>
</template>
