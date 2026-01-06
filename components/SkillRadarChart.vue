<script setup lang="ts">
import { computed } from 'vue';
import { Language } from '../types';

export interface RadarDataPoint {
  subject: string;
  A: number;
  fullMark: number;
}

const props = defineProps<{
  language: Language;
  data?: RadarDataPoint[];
}>();

const chartData = computed(() => props.data || [
  { subject: props.language === 'zh' ? '物联网理论' : 'IoT Theory', A: 85, fullMark: 100 },
  { subject: props.language === 'zh' ? '设备安装' : 'Installation', A: 65, fullMark: 100 },
  { subject: props.language === 'zh' ? '设备调试' : 'Debugging', A: 90, fullMark: 100 },
  { subject: props.language === 'zh' ? '网络配置' : 'Network Config', A: 75, fullMark: 100 },
  { subject: props.language === 'zh' ? '数据分析' : 'Data Analysis', A: 60, fullMark: 100 },
  { subject: props.language === 'zh' ? '故障排查' : 'Troubleshooting', A: 80, fullMark: 100 },
]);

// Helper for Radar Chart calculations
const points = computed(() => {
  const total = chartData.value.length;
  const radius = 100;
  const center = 150;
  
  return chartData.value.map((d, i) => {
    const angle = (Math.PI * 2 / total) * i - Math.PI / 2;
    const r = (d.A / d.fullMark) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
      labelX: center + (radius + 20) * Math.cos(angle),
      labelY: center + (radius + 20) * Math.sin(angle),
      subject: d.subject
    };
  });
});

const polygonPath = computed(() => {
  return points.value.map(p => `${p.x},${p.y}`).join(' ');
});

const gridLines = [0.2, 0.4, 0.6, 0.8, 1];
</script>

<template>
  <div class="w-full h-[300px] flex items-center justify-center">
    <!-- 手写一个简单的 SVG 雷达图替代 Recharts -->
    <svg width="350" height="300" viewBox="0 0 350 300">
      <g transform="translate(0, 0)">
        <!-- Grid -->
        <circle v-for="scale in gridLines" :key="scale" 
          cx="150" cy="150" :r="100 * scale" 
          fill="none" stroke="#e2e8f0" stroke-width="1" />
        
        <line v-for="(p, i) in points" :key="'line-'+i"
          x1="150" y1="150" :x2="p.labelX" :y2="p.labelY"
          stroke="#e2e8f0" stroke-width="1" />

        <!-- Data Polygon -->
        <polygon :points="polygonPath" fill="#a78bfa" fill-opacity="0.5" stroke="#8b5cf6" stroke-width="2" />

        <!-- Dots -->
        <circle v-for="(p, i) in points" :key="'dot-'+i"
          :cx="p.x" :cy="p.y" r="4" fill="#8b5cf6" />

        <!-- Labels -->
        <text v-for="(p, i) in points" :key="'text-'+i"
          :x="p.labelX" :y="p.labelY" 
          text-anchor="middle" font-size="11" fill="#64748b"
          dominant-baseline="middle"
        >
          {{ p.subject }}
        </text>
      </g>
    </svg>
  </div>
</template>
