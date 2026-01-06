<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  data: { day: string; val: number }[];
  color: string;
  id: string;
}>();

const points = computed(() => {
  if (!props.data.length) return '';
  const width = 200;
  const height = 80;
  const maxVal = Math.max(...props.data.map(d => d.val), 1);
  
  return props.data.map((d, i) => {
    const x = (i / (props.data.length - 1)) * width;
    const y = height - (d.val / maxVal) * height;
    return `${x},${y}`;
  }).join(' ');
});

const areaPath = computed(() => {
  if (!props.data.length) return '';
  return `${points.value} 200,80 0,80`;
});
</script>

<template>
  <svg width="100%" height="80" viewBox="0 0 200 80" preserveAspectRatio="none">
    <defs>
      <linearGradient :id="id" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" :stop-color="color" stop-opacity="0.3"/>
        <stop offset="95%" :stop-color="color" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <path :d="'M ' + points" fill="none" :stroke="color" stroke-width="2" />
    <path :d="'M ' + areaPath" :fill="'url(#' + id + ')'" />
  </svg>
</template>
