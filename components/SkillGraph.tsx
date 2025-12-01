import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { SkillGraphData, SkillNode, SkillLink, Language } from '../types';

interface SkillGraphProps {
  data: SkillGraphData;
  language: Language;
  mode?: 'network' | 'tree';
}

const SkillGraph: React.FC<SkillGraphProps> = ({ data, language, mode = 'network' }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current || !data.nodes.length) return;

    const width = svgRef.current.clientWidth;
    const height = 600;

    // Clear previous render
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    const colors = ["#2dd4bf", "#facc15", "#fb923c", "#f472b6", "#60a5fa"]; // Teal, Yellow, Orange, Pink, Blue

    if (mode === 'tree') {
      // --- Tree Layout ---
      
      // 1. Transform flat nodes into hierarchy based on 'group'
      // Virtual Root -> Groups -> Nodes
      const groups = Array.from(new Set(data.nodes.map(n => n.group))).sort();
      const hierarchicalData = {
        name: language === 'zh' ? "技能根节点" : "Skill Root",
        children: groups.map(gId => ({
          name: language === 'zh' ? `知识域 ${gId}` : `Domain ${gId}`,
          group: gId,
          children: data.nodes.filter(n => n.group === gId).map(n => ({
            name: n.label,
            value: n.val,
            group: n.group
          }))
        }))
      };

      const root = d3.hierarchy(hierarchicalData);
      
      // Define tree layout
      const treeLayout = d3.tree().size([height - 100, width - 200]);
      treeLayout(root);

      const g = svg.append("g")
        .attr("transform", "translate(100, 50)"); // Margins

      // Links
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

      // Nodes
      const node = g.selectAll(".node")
        .data(root.descendants())
        .enter().append("g")
        .attr("class", (d: any) => "node" + (d.children ? " node--internal" : " node--leaf"))
        .attr("transform", (d: any) => `translate(${d.y},${d.x})`);

      node.append("circle")
        .attr("r", (d: any) => d.data.value ? d.data.value / 3 : 6)
        .attr("fill", (d: any) => d.data.group ? colors[d.data.group % colors.length] : "#94a3b8")
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
      const simulation = d3.forceSimulation(data.nodes as any)
        .force("link", d3.forceLink(data.links).id((d: any) => d.id).distance(100))
        .force("charge", d3.forceManyBody().strength(-300))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collide", d3.forceCollide().radius((d: any) => d.val * 3 + 10));

      // Links
      const link = svg.append("g")
        .attr("stroke", "#94a3b8") // Slate-400
        .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(data.links)
        .join("line")
        .attr("stroke-width", 2);

      // Nodes (Groups for Circle + Text)
      const node = svg.append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
        .selectAll("g")
        .data(data.nodes)
        .join("g")
        .call(d3.drag<any, any>()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));

      // Circles
      node.append("circle")
        .attr("r", (d: any) => d.val * 3)
        .attr("fill", (d: any) => {
          return colors[d.group % colors.length];
        });

      // Labels
      node.append("text")
        .text((d: any) => d.label)
        .attr("x", (d: any) => d.val * 3 + 5)
        .attr("y", 4)
        .attr("font-size", "12px")
        .attr("fill", "#334155") // Slate-700
        .attr("stroke", "none")
        .attr("font-weight", "500");

      // Simulation tick
      simulation.on("tick", () => {
        link
          .attr("x1", (d: any) => d.source.x)
          .attr("y1", (d: any) => d.source.y)
          .attr("x2", (d: any) => d.target.x)
          .attr("y2", (d: any) => d.target.y);

        node
          .attr("transform", (d: any) => `translate(${d.x},${d.y})`);
      });

      // Drag functions
      function dragstarted(event: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event: any) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      function dragended(event: any) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }
      
      return () => {
        simulation.stop();
      };
    }

  }, [data, mode, language]);

  return (
    <div className="w-full h-[600px] bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative">
      <div className="absolute top-4 left-4 bg-white/80 p-2 rounded-lg backdrop-blur-sm z-10 border border-slate-100">
        <h3 className="font-semibold text-slate-700">
          {language === 'zh' ? '知识领域集群' : 'Knowledge Domain Cluster'}
        </h3>
        <p className="text-xs text-slate-500">
          {mode === 'tree' 
             ? (language === 'zh' ? '层级结构视图' : 'Hierarchical View')
             : (language === 'zh' ? '拖动节点探索依赖关系' : 'Drag nodes to explore dependencies')}
        </p>
      </div>
      <svg ref={svgRef} className={`w-full h-full ${mode === 'network' ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}`}></svg>
    </div>
  );
};

export default SkillGraph;