import React from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { Language } from '../types';

// --- Student Radar Chart ---
const getStudentData = (lang: Language) => [
  { subject: lang === 'zh' ? 'Python' : 'Python', A: 120, fullMark: 150 },
  { subject: lang === 'zh' ? '算法' : 'Algorithms', A: 98, fullMark: 150 },
  { subject: lang === 'zh' ? '数据库' : 'Database', A: 86, fullMark: 150 },
  { subject: lang === 'zh' ? 'AI/ML' : 'AI/ML', A: 99, fullMark: 150 },
  { subject: lang === 'zh' ? '硬件' : 'Hardware', A: 85, fullMark: 150 },
  { subject: lang === 'zh' ? '软技能' : 'Soft Skills', A: 65, fullMark: 150 },
];

export const StudentRadarChart: React.FC<{ language: Language }> = ({ language }) => (
  <ResponsiveContainer width="100%" height={300}>
    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={getStudentData(language)}>
      <PolarGrid stroke="#e2e8f0" />
      <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
      <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
      <Radar
        name={language === 'zh' ? "学生" : "Student"}
        dataKey="A"
        stroke="#0d9488"
        strokeWidth={2}
        fill="#2dd4bf"
        fillOpacity={0.4}
      />
      <Tooltip />
    </RadarChart>
  </ResponsiveContainer>
);

// --- Skill Analysis Radar Chart (Dynamic Data) ---
export interface RadarDataPoint {
  subject: string;
  A: number;
  fullMark: number;
}

interface SkillRadarChartProps {
  language: Language;
  data?: RadarDataPoint[]; 
}

export const SkillRadarChart: React.FC<SkillRadarChartProps> = ({ language, data }) => {
  // Default data if none provided
  const chartData = data || [
    { subject: language === 'zh' ? '物联网理论' : 'IoT Theory', A: 85, fullMark: 100 },
    { subject: language === 'zh' ? '设备安装' : 'Installation', A: 65, fullMark: 100 },
    { subject: language === 'zh' ? '设备调试' : 'Debugging', A: 90, fullMark: 100 },
    { subject: language === 'zh' ? '网络配置' : 'Network Config', A: 75, fullMark: 100 },
    { subject: language === 'zh' ? '数据分析' : 'Data Analysis', A: 60, fullMark: 100 },
    { subject: language === 'zh' ? '故障排查' : 'Troubleshooting', A: 80, fullMark: 100 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
        <PolarGrid stroke="#e2e8f0" />
        <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11 }} />
        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
        <Radar
          name={language === 'zh' ? "当前能力" : "Current Skill"}
          dataKey="A"
          stroke="#8b5cf6" 
          strokeWidth={2}
          fill="#a78bfa"
          fillOpacity={0.5}
        />
        <Tooltip />
      </RadarChart>
    </ResponsiveContainer>
  );
};

// --- Class Performance Bar Chart ---
const getClassData = (lang: Language) => [
  { name: lang === 'zh' ? 'A班' : 'Class A', avg: 85 },
  { name: lang === 'zh' ? 'B班' : 'Class B', avg: 78 },
  { name: lang === 'zh' ? 'C班' : 'Class C', avg: 92 },
  { name: lang === 'zh' ? 'D班' : 'Class D', avg: 74 },
  { name: lang === 'zh' ? 'E班' : 'Class E', avg: 88 },
];

export const ClassPerformanceChart: React.FC<{ language: Language }> = ({ language }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={getClassData(language)}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
      <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
      <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
      <Tooltip cursor={{ fill: '#f8fafc' }} />
      <Bar dataKey="avg" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={40} name={language === 'zh' ? '平均分' : 'Average'} />
    </BarChart>
  </ResponsiveContainer>
);

// --- Activity Pie Chart ---
const getActivityData = (lang: Language) => [
  { name: lang === 'zh' ? '编程' : 'Coding', value: 400 },
  { name: lang === 'zh' ? '阅读' : 'Reading', value: 300 },
  { name: lang === 'zh' ? '硬件实验' : 'Hardware Lab', value: 300 },
  { name: lang === 'zh' ? '测验' : 'Quizzes', value: 200 },
];
const COLORS = ['#2dd4bf', '#fb923c', '#818cf8', '#f472b6'];

export const ActivityPieChart: React.FC<{ language: Language }> = ({ language }) => (
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={getActivityData(language)}
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {getActivityData(language).map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend verticalAlign="bottom" height={36} iconType="circle" />
    </PieChart>
  </ResponsiveContainer>
);

// --- Learning Trend Line Chart ---
const trendData = [
  { week: 'W1', score: 65 },
  { week: 'W2', score: 68 },
  { week: 'W3', score: 75 },
  { week: 'W4', score: 72 },
  { week: 'W5', score: 85 },
  { week: 'W6', score: 90 },
];

export const TrendChart: React.FC<{ language: Language }> = ({ language }) => (
  <ResponsiveContainer width="100%" height={200}>
    <LineChart data={trendData}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
      <XAxis dataKey="week" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
      <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} domain={[0, 100]} />
      <Tooltip />
      <Line 
        type="monotone" 
        dataKey="score" 
        stroke="#6366f1" 
        strokeWidth={3} 
        dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} 
        activeDot={{ r: 6 }} 
        name={language === 'zh' ? '分数' : 'Score'}
      />
    </LineChart>
  </ResponsiveContainer>
);

// --- Dynamic Process Chart ---
interface DynamicProcessChartProps {
  data: { name: string; value: number }[];
  type: 'bar' | 'line';
  color?: string;
}

export const DynamicProcessChart: React.FC<DynamicProcessChartProps> = ({ data, type, color = '#0d9488' }) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      {type === 'bar' ? (
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
          <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} barSize={40} />
        </BarChart>
      ) : (
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={color} 
            strokeWidth={3} 
            dot={{ r: 4, strokeWidth: 2, fill: '#fff', stroke: color }} 
            activeDot={{ r: 6, strokeWidth: 0, fill: color }} 
          />
        </LineChart>
      )}
    </ResponsiveContainer>
  );
};
