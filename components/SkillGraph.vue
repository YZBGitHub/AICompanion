<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue';
import * as d3 from 'd3';
import { SkillGraphData, Language } from '../types';

const props = withDefaults(defineProps<{
  data: SkillGraphData;
  language: Language;
  mode?: 'network' | 'tree';
}>(), {
  mode: 'network'
});

const svgRef = ref<SVGSVGElement | null>(null);
let simulation: d3.Simulation<any, undefined> | null = null;

const renderGraph = () => {
  if (!svgRef.current || !props.data.nodes.length) return;

  const width = svgRef.current.clientWidth;
  const height = 600;

  // Clear previous render
  d3.select(svgRef.current).selectAll("*").remove();

  const svg = d3.select(svgRef.current)
    .attr("viewBox", [0, 0, width, height] as any)
    .attr("style", "max-width: 100%; height: auto;");

  const colors = ["#2dd4bf", "#facc15", "#fb923c", "#f472b6", "#60a5fa"]; // Teal, Yellow, Orange, Pink, Blue

  if (props.mode === 'tree') {
    // --- Tree Layout ---
    const groups = Array.from(new Set(props.data.nodes.map(n => n.group))).sort();
    const hierarchicalData = {
      name: props.language === 'zh' ? "技能根节点" : "Skill Root",
      children: groups.map(gId => ({
        name: props.language === 'zh' ? `知识域 ${gId}` : `Domain ${gId}`,
        group: gId,
        children: props.data.nodes.filter(n => n.group === gId).map(n => ({
          name: n.label,
          value: n.val,
          group: n.group
        }))
      }))
    };

    const root = d3.hierarchy(hierarchicalData);
    const treeLayout = d3.tree().size([height - 100, width - 200]);
    treeLayout(root);

    const g = svg.append("g").attr("transform", "translate(100, 50)");

    g.selectAll(".link")
      .data(root.links())
      .enter().append("path")
      .attr("class", "link")
      .attr("d", d3.linkHorizontal()
        .x((d: any) => d.y)
        .y((d: any) => d.x) as any)
      .attr("fill", "none")
      .attr("stroke", "#cbd5e1")
      .attr("stroke-width", 1.5);

    const node = g.selectAll(".node")
      .data(root.descendants())
      .enter().append("g")
      .attr("class", (d: any) => "node" + (d.children ? " node--internal" : " node--leaf"))
      .attr("transform", (d: any) => `translate(${d.y},${d.x})`);

    node.append("circle")
      .attr("r", (d: any) => d.data.value ? d.data.value / 3 : 6)
      .attr("fill", (d: any) => d.data.group !== undefined ? colors[d.data.group % colors.length] : "#94a3b8")
      .attr("stroke", "#fff")
      .attr("stroke-width", 2);

    node.append("text")
      .attr("dy", 3)
      .attr("x", (d: any) => d.children ? -12 : 12)
      .style("text-anchor", (d: any) => d.children ? "end" : "start")
      .text((d: any) => d.data.name)
      .attr("font-size", "12px")
      .attr("fill", "#334155");

  } else {
    // --- Force Directed Graph (Network) ---
    if (simulation) simulation.stop();
    
    simulation = d3.forceSimulation(props.data.nodes as any)
      .force("link", d3.forceLink(props.data.links).id((d: any) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide().radius((d: any) => d.val * 3 + 10));

    const link = svg.append("g")
      .attr("stroke", "#94a3b8")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(props.data.links)
      .join("line")
      .attr("stroke-width", 2);

    const node = svg.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll("g")
      .data(props.data.nodes)
      .join("g")
      .call(d3.drag<any, any>()
        .on("start", (event, d) => {
          if (!event.active) simulation?.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on("end", (event, d) => {
          if (!event.active) simulation?.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }));

    node.append("circle")
      .attr("r", (d: any) => d.val * 3)
      .attr("fill", (d: any) => colors[d.group % colors.length]);

    node.append("text")
      .text((d: any) => d.label)
      .attr("x", (d: any) => d.val * 3 + 5)
      .attr("y", 4)
      .attr("font-size", "12px")
      .attr("fill", "#334155")
      .attr("stroke", "none")
      .attr("font-weight", "500");

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });
  }
};

onMounted(() => {
  renderGraph();
  window.addEventListener('resize', renderGraph);
});

onUnmounted(() => {
  if (simulation) simulation.stop();
  window.removeEventListener('resize', renderGraph);
});

watch([() => props.data, () => props.mode, () => props.language], () => {
  renderGraph();
}, { deep: true });
</script>

<template>
  <div class="w-full h-[600px] bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative">
    <div class="absolute top-4 left-4 bg-white/80 p-2 rounded-lg backdrop-blur-sm z-10 border border-slate-100">
      <h3 class="font-semibold text-slate-700">
        {{ language === 'zh' ? '知识领域集群' : 'Knowledge Domain Cluster' }}
      </h3>
      <p class="text-xs text-slate-500">
        {{ mode === 'tree' 
           ? (language === 'zh' ? '层级结构视图' : 'Hierarchical View')
           : (language === 'zh' ? '拖动节点探索依赖关系' : 'Drag nodes to explore dependencies') }}
      </p>
    </div>
    <svg ref="svgRef" :class="['w-full h-full', mode === 'network' ? 'cursor-grab active:cursor-grabbing' : 'cursor-default']"></svg>
  </div>
</template>
