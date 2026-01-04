
import { Language, SkillGraphData } from '../types';
import { Building2, Cpu, Code, Network } from 'lucide-react';

export const getMockSkillData = (lang: Language): SkillGraphData => ({
  nodes: [
    { id: "CS", group: 1, val: 20, label: lang === 'zh' ? "计算机科学" : "Computer Science" },
    { id: "Python", group: 1, val: 15, label: "Python" },
    { id: "Algo", group: 1, val: 12, label: lang === 'zh' ? "算法" : "Algorithms" },
    { id: "Web", group: 2, val: 15, label: lang === 'zh' ? "Web开发" : "Web Dev" },
    { id: "React", group: 2, val: 10, label: "React" },
    { id: "Node", group: 2, val: 10, label: "Node.js" },
    { id: "AI", group: 3, val: 18, label: lang === 'zh' ? "人工智能" : "Artificial Intelligence" },
    { id: "ML", group: 3, val: 12, label: lang === 'zh' ? "机器学习" : "Machine Learning" },
    { id: "DL", group: 3, val: 10, label: lang === 'zh' ? "深度学习" : "Deep Learning" },
    { id: "HW", group: 4, val: 14, label: lang === 'zh' ? "硬件" : "Hardware" },
    { id: "IoT", group: 4, val: 10, label: "IoT" },
    { id: "Sensors", group: 4, val: 8, label: lang === 'zh' ? "传感器" : "Sensors" },
  ],
  links: [
    { source: "Python", target: "CS" },
    { source: "Algo", target: "CS" },
    { source: "Algo", target: "Python" },
    { source: "Web", target: "CS" },
    { source: "React", target: "Web" },
    { source: "Node", target: "Web" },
    { source: "AI", target: "CS" },
    { source: "ML", target: "AI" },
    { source: "DL", target: "ML" },
    { source: "ML", target: "Python" },
    { source: "HW", target: "CS" },
    { source: "IoT", target: "HW" },
    { source: "Sensors", target: "IoT" },
  ]
});

export const getRankingData = (lang: Language) => ({
  skill: [
    { rank: 1, name: lang === 'zh' ? '智慧园区' : 'Smart Park', count: 98 },
    { rank: 2, name: lang === 'zh' ? '嵌入式开发' : 'Embedded Dev', count: 95 },
    { rank: 3, name: lang === 'zh' ? 'Python基础' : 'Python Basic', count: 88 },
  ],
  hard: [
    { rank: 1, name: lang === 'zh' ? '串口助手' : 'Serial Port', count: 92 },
    { rank: 2, name: lang === 'zh' ? 'LoRa终端' : 'LoRa Term', count: 89 },
    { rank: 3, name: lang === 'zh' ? '虚拟示波器' : 'Oscilloscope', count: 85 },
  ],
  soft: [
    { rank: 1, name: lang === 'zh' ? '虚拟仿真' : 'Virtual Sim', count: 96 },
    { rank: 2, name: lang === 'zh' ? '在线编译器' : 'Web Compiler', count: 90 },
    { rank: 3, name: lang === 'zh' ? '代码检视' : 'Code Review', count: 82 },
  ]
});

// Expanded to 50 avatars using different seeds and styles
export const AVATARS = Array.from({ length: 50 }, (_, i) => {
    const seeds = ['Felix', 'Aneka', 'Jude', 'Maria', 'Sasha', 'Leo', 'Mia', 'Zoe', 'Max', 'Luna'];
    const styles = ['avataaars', 'bottts', 'notionists', 'pixel-art', 'lorelei'];
    const style = styles[i % styles.length];
    const seed = seeds[Math.floor(i / styles.length)] + i;
    return {
        id: i + 1,
        src: `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,ffdfbf,e6e6e6,ffeaa7`,
        label: `Ava ${i + 1}`
    };
});

export const AI_PERSONAS = [
  { 
    id: 'geek', 
    name: '极客少年', 
    desc: '对代码和硬件有着近乎狂热的追求，深夜是你的主场。', 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&glasses=round&clothing=hoodie', 
    color: 'bg-blue-500',
    tags: ['代码控', '夜猫子', '逻辑鬼才'] 
  },
  { 
    id: 'social', 
    name: '社牛领袖', 
    desc: '不仅技术过硬，更是团队的粘合剂，哪里有你哪里就有欢笑。', 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka&smile=laughing', 
    color: 'bg-pink-500',
    tags: ['沟通达人', '气氛组', '协作强'] 
  },
  { 
    id: 'master', 
    name: '实操大神', 
    desc: '与其纸上谈兵，不如动手一试。你的手就是最好的精密仪器。', 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jude&facialHair=beard', 
    color: 'bg-orange-500',
    tags: ['动手能力MAX', '工匠精神', '效率高']
  },
  { 
    id: 'explorer', 
    name: '科技探险家', 
    desc: '对新技术永远保持好奇，勇于尝试未知的领域。', 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria&accessories=sunglasses', 
    color: 'bg-purple-500',
    tags: ['好奇心', '创新', '先锋']
  }
];

export const SDT_METRICS = {
  autonomy: { score: 85, rank: 'A', desc: '自主规划学习路径，主动性强' },
  competence: { score: 92, rank: 'A+', desc: '技能掌握扎实，问题解决能力突出' },
  relatedness: { score: 78, rank: 'B+', desc: '与AI及同学互动良好，协作意愿高' },
  total: { score: 88, rank: 5 }
};

export const MOCK_PROCESS_SUMMARY = {
  behavior: {
    logins: 45,        
    onlineTime: '120h',
    aiQaCount: 350     
  },
  softExp: {
    openCount: 28,     
    runTime: '45h'     
  },
  hardExp: {
    loginCount: 15,    
    onlineTime: '12h', 
    qaTime: '45m',     
    sessionCount: 22,  
    openCount: 18      
  }
};

export const CLASS_STATS = {
  avgScore: 82.5,
  attendance: '96%',
  interaction: 'High',
  warnings: 3,
  students: [
    { name: '李明', score: 92, status: 'normal' },
    { name: '张伟', score: 75, status: 'normal' },
    { name: '王芳', score: 58, status: 'warning' },
    { name: '陈杰', score: 88, status: 'normal' },
    { name: '刘洋', score: 62, status: 'warning' }
  ]
};

export const CLASS_SKILL_RANKING = [
  { skill: 'Modbus协议解析', score: 45 },
  { skill: 'RS485通信接线', score: 52 },
  { skill: 'STM32中断控制', score: 55 },
  { skill: 'MQTT消息订阅', score: 58 },
  { skill: '多线程并发', score: 60 },
  { skill: 'VLAN划分配置', score: 62 },
  { skill: '指针内存管理', score: 63 },
  { skill: 'Linux Shell脚本', score: 65 },
  { skill: 'I2C时序调试', score: 66 },
  { skill: 'Docker容器部署', score: 68 }
];

export const CLASS_STUDENT_RANKING = [
  { name: '李明', score: 98 },
  { name: '赵强', score: 96 },
  { name: '孙丽', score: 95 },
  { name: '陈杰', score: 92 },
  { name: '周涛', score: 91 },
  { name: '吴迪', score: 90 },
  { name: '郑华', score: 89 },
  { name: '王伟', score: 88 },
  { name: '林峰', score: 87 },
  { name: '何静', score: 86 }
];

// --- New Mock Data for Teacher View Enhancements ---

export const CLASS_COURSE_STATS = {
  currentCourse: {
    name: '《智慧园区》',
    cover: 'bg-teal-100',
    icon: Building2,
    iconColor: 'text-teal-600',
    progress: 75,
    major: '物联网应用技术'
  },
  // Point 2: Distribution by Specific Intervals
  distribution: [
    { name: '90分以上', value: 8, color: '#10b981' },
    { name: '80-90分', value: 15, color: '#3b82f6' },
    { name: '60-80分', value: 10, color: '#f59e0b' },
    { name: '60分以下', value: 3, color: '#ef4444' },
  ],
  // Point 1: More intuitive score ranking for class
  scoreRanking: Array.from({length: 34}, (_, i) => ({
    name: i === 0 ? '李明' : `学生${i+1}`,
    score: i === 0 ? 98 : Math.floor(Math.random() * 40) + 58
  })).sort((a, b) => b.score - a.score),
  
  // Class Aggregated Engagement (for Teacher View Point 3)
  engagement: {
    platform: {
        avgLogins: 38,
        avgOnline: '95h',
        totalAiQa: '1,240',
        avgTaskDone: 24
    },
    software: {
        avgEnvOpen: 22,
        avgRuntime: '38h',
        avgAgentQa: 85
    },
    hardware: {
        avgHardLogin: 12,
        avgHardOnline: '10.5h',
        avgHardQa: 38
    },
    ops: {
        avgHardOpTime: '8h 20m',
        avgDevOnline: '120h',
        totalSoftTime: '1,245' // Changed from totalSoftOps to totalSoftTime
    }
  }
};

export const CLASS_EXAM_LIST = [
  { id: 1, name: '智慧园区-期中测试', date: '2023-11-15', status: '已结束', avgScore: 82.5 },
  { id: 2, name: '嵌入式-单元测验1', date: '2023-11-20', status: '已结束', avgScore: 76.8 },
  { id: 3, name: 'Python-阶段考核', date: '2023-11-28', status: '进行中', avgScore: '-' },
  { id: 4, name: '物联网通信-模拟考', date: '2023-12-05', status: '未开始', avgScore: '-' },
];

export const CLASS_WEAKNESS_RADAR = [
  { subject: '理论基础', A: 75, fullMark: 100 },
  { subject: '实操能力', A: 65, fullMark: 100 }, // Weakness
  { subject: '创新思维', A: 70, fullMark: 100 },
  { subject: '团队协作', A: 85, fullMark: 100 },
  { subject: '故障排查', A: 60, fullMark: 100 }, // Weakness
];

export const SDT_WARNING_STUDENTS = [
  { 
    id: '2021001003', 
    name: '王芳', 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    tags: ['积极性差', '成绩下滑'],
    sdt: { autonomy: 55, competence: 60, relatedness: 70 },
    issues: ['近7天未登录平台', '硬件实验时长不足2小时', '未提交期中作业'],
    advice: '建议安排线下谈话，了解是否遇到设备困难；推荐其先完成《基础入门》章节重建信心。'
  },
  { 
    id: '2021001005', 
    name: '刘洋', 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    tags: ['互动缺失', '实操困难'],
    sdt: { autonomy: 70, competence: 50, relatedness: 40 },
    issues: ['AI问答次数为0', '软件仿真报错率高', '论坛无发言'],
    advice: '可能存在社交焦虑或工具使用障碍。建议引导其使用AI助手辅助排错，并安排"社牛"同学结对帮扶。'
  },
  {
    id: '2021001008',
    name: '赵雷',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jude',
    tags: ['认知负荷高'],
    sdt: { autonomy: 65, competence: 55, relatedness: 60 },
    issues: ['深夜频繁登录但进度缓慢', '重复提交错误代码'],
    advice: '存在无效努力迹象。建议检查其学习方法，推荐"分步调试"的教学视频，降低其挫败感。'
  }
];

// ... (Existing exports: MOCK_TASKS, MOCK_AUTO_SCORE_TASKS, etc.)
export const MOCK_TASKS = [
  { id: 1, time: '2023-11-28 14:30', course: '《智慧园区》', name: '第二章 单元测试', chapter: '第2章 - 2.1 基础概念', score: 85, duration: '25m', status: '已完成', type: 'task' },
  { id: 2, time: '2023-11-27 09:15', course: '《Python基础》', name: '期中考试', chapter: '第5章 - 5.3 综合应用', score: 92, duration: '45m', status: '已完成', type: 'task' },
  { id: 3, time: '2023-11-25 16:00', course: '《嵌入式开发》', name: '课后习题-GPIO', chapter: '第3章 - 3.2 端口控制', score: 70, duration: '15m', status: '已完成', type: 'task' },
];

export const MOCK_AUTO_SCORE_TASKS = [
  { id: 101, time: '2023-11-28 16:00', course: '《智慧园区》', chapter: '实验3 - 2D仿真搭建', env: '2D虚拟仿真', score: 85, duration: '20m', status: '已评分', type: 'auto_score' },
  { id: 102, time: '2023-11-28 11:30', course: '《智慧园区》', chapter: '实验2 - 资产管理', env: 'ThingsBoard', score: 60, duration: '15m', status: '已评分', type: 'auto_score' },
  { id: 103, time: '2023-11-27 15:00', course: '《嵌入式开发》', chapter: '实验4 - 传感器通信', env: '硬件实验箱', score: 95, duration: '30m', status: '已评分', type: 'auto_score' },
];

export const MOCK_NOTE_TASKS = [
  { id: 201, time: '2023-11-28 15:45', course: '《智慧园区》', chapter: '第3章 - 3.1 仿真搭建', type: 'note' },
  { id: 202, time: '2023-11-27 11:20', course: '《嵌入式开发》', chapter: '第2章 - 2.3 串口通信', type: 'note' },
  { id: 203, time: '2023-11-25 09:30', course: '《Python基础》', chapter: '第4章 - 4.2 字典操作', type: 'note' },
];

export const MOCK_NOTE_DETAILS = {
  201: {
    title: '智慧园区仿真搭建心得',
    content: '在今天的实验中，我掌握了如何通过2D模拟器构建复杂的网格拓扑。重点在于网关的IP配置必须与子节点在同一网段，否则会出现Ping不通的情况。通过抓取ICMP包，我观察到了三次握手的过程，非常有意思。',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800',
    tags: ['仿真', '网络拓扑', 'ICMP']
  },
  202: {
    title: '嵌入式串口通信实验笔记',
    content: 'STM32的USART配置需要注意波特率匹配。如果波特率不一致，接收到的数据会产生乱码。此外，在使用中断接收时，必须及时清除RXNE标志位，避免程序卡死在中断处理函数中。',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    tags: ['STM32', 'USART', '中断']
  },
  203: {
    title: 'Python字典高效操作',
    content: '字典的items()方法可以同时遍历键和值，这在处理API返回的JSON数据时非常高效。相比传统的索引访问，使用get()方法可以有效避免KeyError异常。',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
    tags: ['Python', '数据结构', '最佳实践']
  }
};

export const MOCK_AUTO_SCORE_DETAILS = [
   { rule: '设备连接完整性', scene: '软件实验', env: '2D虚拟仿真', score: 10, result: true, reason: '', skill: '网络拓扑构建' },
   { rule: '传感器配置参数', scene: '软件实验', env: '2D虚拟仿真', score: 10, result: true, reason: '', skill: '设备参数配置' },
   { rule: '网关IP设置', scene: '软件实验', env: 'ThingsBoard', score: 0, result: false, reason: 'IP地址不在同一网段', skill: '网络协议' },
   { rule: '数据上报频率', scene: '软件实验', env: 'ThingsBoard', score: 0, result: false, reason: '频率设置过高 (>10s)', skill: '数据采集优化' },
   { rule: '控制指令响应', scene: '硬件实验', env: '硬件实验箱', score: 10, result: true, reason: '', skill: '指令下发与反馈' },
];

export const MOCK_IOT_QUESTIONS = Array.from({ length: 50 }, (_, i) => {
  let type = '单选';
  let content = '';
  const skills = ['传感器原理', 'Modbus协议', 'RS485接线', 'ZigBee组网', '网关配置', 'MQTT协议', '设备故障诊断', '数据采集', '电气安全'];
  
  if (i < 20) {
    type = '单选';
    content = `[理论] 物联网${i+1}: 下列关于${skills[i%skills.length]}的描述正确的是?`;
  } else if (i < 30) {
    type = '多选';
    content = `[实操] 安装调试${i+1}: 进行${skills[i%skills.length]}时，需要注意哪些事项?`;
  } else if (i < 40) {
    type = '判断';
    content = `[安全] 规范${i+1}: ${skills[i%skills.length]}操作时可以带电作业吗?`;
  } else {
    type = '填空';
    content = `[配置] 指令${i+1}: 请输入${skills[i%skills.length]}的标准端口号: _____`;
  }

  return {
    id: i + 1,
    type,
    content,
    skill: skills[i % skills.length]
  };
});

export const MOCK_AI_ASSISTANTS_LIST = [
  { id: 1, name: '《智慧园区》技能助手', lastTime: '2023-11-28 15:30', count: 42, type: 'ai' },
  { id: 2, name: '《Python基础》编程助手', lastTime: '2023-11-27 10:20', count: 18, type: 'ai' },
  { id: 3, name: '《嵌入式》硬件调试助手', lastTime: '2023-11-26 14:15', count: 25, type: 'ai' },
];

export const MOCK_AI_QA_DETAILS = [
  { q: "什么是Modbus RTU协议？", a: "Modbus RTU是一种紧凑的二进制通信协议...", time: "10:05", interval: "2m" },
  { q: "如何接线RS485？", a: "RS485接线需要注意A、B两根线，通常A接A，B接B...", time: "10:07", interval: "15s" },
  { q: "CRC校验失败怎么处理？", a: "首先检查波特率是否匹配，其次检查接线是否松动...", time: "10:08", interval: "3m" },
];

export const MOCK_SOFT_ENV_OPTIONS = ['全部', '2D虚拟仿真', 'ThingsBoard', 'Node-Red', '终端'];

export const MOCK_SOFT_OP_TASKS = [
  { id: 1, course: '《智慧园区》', chapter: '3.1 仿真搭建', env: '2D虚拟仿真', duration: '45m', time: '2023-11-28 10:00', type: 'soft_op' },
  { id: 2, course: '《智慧园区》', chapter: '3.2 资产上云', env: 'ThingsBoard', duration: '30m', time: '2023-11-28 11:30', type: 'soft_op' },
  { id: 3, course: '《嵌入式开发》', chapter: '4.1 数据流处理', env: 'Node-Red', duration: '25m', time: '2023-11-27 14:00', type: 'soft_op' },
  { id: 4, course: '《Python基础》', chapter: '2.2 Linux命令', env: '终端', duration: '15m', time: '2023-11-26 09:00', type: 'soft_op' },
];

export const MOCK_SOFT_OP_DETAILS = {
  '2D虚拟仿真': {
    project: 'SmartPark_Project_Final.N2V',
    opHistory: [
      { time: '10:05:23', type: '添加设备', device: '温湿度传感器_01', content: '添加设备到区域A' },
      { time: '10:06:10', type: '修改配置', device: '温湿度传感器_01', content: '修改采集频率为5s' },
      { time: '10:08:45', type: '添加连线', device: '网关_01', content: '连接 传感器_01 -> 网关_01' },
      { time: '10:09:12', type: '删除连线', device: '网关_01', content: '删除 传感器_02 -> 网关_01' },
      { time: '10:15:30', type: '仿真启动', device: '-', content: '尝试启动仿真' },
    ],
    opStats: {
      startCount: 12,
      avgStartupTime: '3.5s',
      wiringErrorCount: 3,
      totalRunTime: '45m 20s',
      topDevices: [
         { name: '多功能网关', count: 45 },
         { name: '继电器模块', count: 32 },
         { name: '温湿度传感器', count: 28 },
         { name: 'LED显示屏', count: 15 },
         { name: '报警灯', count: 12 }
      ]
    },
    agentStats: {
      totalQuestions: 8,
      totalWords: 350,
      avgInterval: '45s',
      sessionTypes: { debug: '工程排错', create: '工程创建' },
      satisfaction: '4.9/5',
      qaList: [
        { q: '为什么启动仿真提示"网关未连接"?', a: '请检查网关是否已连接电源，并且与传感器之间的连线逻辑是否正确。', time: '10:16' },
        { q: '如何修改传感器的数据上报周期?', a: '双击传感器图标，在弹出的属性面板中找到"Report Interval"字段进行修改。', time: '10:06' }
      ]
    }
  },
  'ThingsBoard': {
    totalTime: '30m',
    ops: [
       { name: '资产功能', value: 35, type: '资产功能', time: '10m' },
       { name: '设备功能', value: 20, type: '设备功能', time: '5m' },
       { name: 'Device Profile', value: 15, type: 'Device Profile', time: '5m' },
       { name: '实体视图', value: 5, type: '实体视图', time: '2m' },
       { name: '仪表板', value: 25, type: '仪表板', time: '8m' },
    ]
  },
  'Node-Red': {
     configFile: 'flow_data.json',
     runtime: '25m',
     execCount: 15,
     nodes: [
        { id: 'n1', type: 'inject', x: 50, y: 50, label: 'Timestamp' },
        { id: 'n2', type: 'function', x: 200, y: 50, label: 'Process Data' },
        { id: 'n3', type: 'mqtt out', x: 350, y: 50, label: 'IoT Core' },
        { id: 'n4', type: 'debug', x: 350, y: 120, label: 'Log' }
     ],
     wires: [
        { from: 'n1', to: 'n2' },
        { from: 'n2', to: 'n3' },
        { from: 'n2', to: 'n4' }
     ]
  },
  '终端': {
     connectCount: 15,
     openCount: 5,
     totalTime: '45m',
     topCommands: [
        { cmd: 'docker ps', count: 45 },
        { cmd: 'ls -la', count: 32 },
        { cmd: 'cd', count: 28 },
        { cmd: 'cat', count: 15 },
        { cmd: 'vi', count: 12 }
     ],
     history: [
        { cmd: 'ls -la', time: '09:01', output: 'total 0\ndrwxr-xr-x 1 user user 4096 Nov 28 09:00 .' },
        { cmd: 'docker ps', time: '09:02', output: 'CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES' },
        { cmd: 'cd /var/log', time: '09:03', output: '' },
     ],
     execCount: 12,
     errors: [
        { cmd: 'apt-get install', log: 'E: Could not open lock file /var/lib/dpkg/lock-frontend - open (13: Permission denied)' },
        { cmd: './script.sh', log: 'bash: ./script.sh: Permission denied' }
     ],
     containerChanges: 'Added 1 container'
  }
};

export const MOCK_HARD_ENV_OPTIONS = ['全部', 'Lora设备智能体', '串口终端智能体', '中心网关设备智能体'];

export const MOCK_HARD_OP_TASKS = [
  { id: 1, time: '2023-11-28 14:00', course: '《物联网通信》', chapter: '实验4 - Lora组网', env: 'Lora设备智能体', duration: '45m', type: 'hard_op' },
  { id: 2, time: '2023-11-28 10:00', course: '《嵌入式开发》', chapter: '实验2 - 串口调试', env: '串口终端智能体', duration: '30m', type: 'hard_op' },
  { id: 3, time: '2023-11-27 15:30', course: '《智慧园区》', chapter: '实验5 - 网关配置', env: '中心网关设备智能体', duration: '50m', type: 'hard_op' },
];

export const MOCK_HARD_OP_DETAILS = {
   'Lora设备智能体': {
      agentName: 'Lora设备智能体',
      scene: '硬件实训环节',
      dataDesc: '操作过程记录',
      dataType: ['Excel', 'JSON'],
      deviceConfig: { ip: '192.168.1.101', port: '8080', mode: '透传模式', status: '在线' },
      runtime: '45m 12s',
      changes: [
         { time: '14:05:10', content: '修改发射功率为 20dBm' },
         { time: '14:10:22', content: '修改信道为 433MHz' }
      ],
      states: [
         { time: '14:00:00', status: '上线' },
         { time: '14:45:12', status: '下线' }
      ],
      ai: {
         totalQ: 5,
         totalWords: 120,
         satisfaction: '4.8',
         totalDialogs: 8,
         qaList: [
            { q: 'Lora模块无法入网怎么办？', a: '请检查密钥AppKey是否一致，以及信道配置是否正确。', time: '14:08' },
            { q: '如何修改信道？', a: '使用AT命令AT+CH=433进行修改。', time: '14:09' }
         ]
      }
   },
   '串口终端智能体': {
      agentName: '串口终端智能体',
      scene: '硬件实训环节',
      dataDesc: '操作过程记录',
      dataType: ['Excel', 'JSON'],
      deviceConfig: { baudRate: '115200', dataBits: '8', stopBits: '1', parity: 'None' },
      runtime: '30m 00s',
      changes: [
         { time: '10:05:00', content: '打开串口 COM3' },
         { time: '10:25:00', content: '发送 HEX 数据: AA 55' }
      ],
      states: [
         { time: '10:00:00', status: '打开' },
         { time: '10:30:00', status: '关闭' }
      ],
      ai: {
         totalQ: 3,
         totalWords: 80,
         satisfaction: '5.0',
         totalDialogs: 5,
         qaList: [
            { q: '波特率不匹配会显示什么？', a: '通常会显示乱码。', time: '10:10' }
         ]
      }
   },
   '中心网关设备智能体': {
      agentName: '中心网关设备智能体',
      scene: '硬件实训环节',
      dataDesc: '操作过程记录',
      dataType: ['Excel', 'JSON'],
      deviceConfig: { ip: '10.0.0.1', protocol: 'MQTT', clientId: 'gateway_001' },
      runtime: '50m',
      changes: [
         { time: '15:40:00', content: '重启 MQTT 服务' }
      ],
      states: [
         { time: '15:30:00', status: '运行中' }
      ],
      ai: {
         totalQ: 10,
         totalWords: 500,
         satisfaction: '4.7',
         totalDialogs: 15,
         qaList: [
            { q: '网关无法连接云平台', a: '检查网络连接，确保证书配置正确。', time: '15:35' }
         ]
      }
   }
};

export const LEARNING_COURSES = [
  { id: 1, name: '《智慧园区》', major: '物联网应用技术', status: 'in_progress', progress: 85, cover: 'bg-teal-100', icon: Building2, iconColor: 'text-teal-600' },
  { id: 2, name: '《嵌入式开发》', major: '物联网应用技术', status: 'in_progress', progress: 45, cover: 'bg-orange-100', icon: Cpu, iconColor: 'text-orange-600' },
  { id: 3, name: '《Python基础》', major: '计算机基础', status: 'completed', rank: 3, cover: 'bg-blue-100', icon: Code, iconColor: 'text-blue-600' },
  { id: 4, name: '《计算机网络》', major: '计算机基础', status: 'completed', rank: 12, cover: 'bg-indigo-100', icon: Network, iconColor: 'text-indigo-600' }
];

export const LEARNING_EXAMS = {
  completed: [
    { name: 'Python期中考试', score: 92, rank: 5, time: '2023-11-10' },
    { name: '计算机网络单元测验', score: 88, rank: 8, time: '2023-10-25' }
  ],
  pending: [
    { name: '智慧园区期末考试', startTime: '2023-12-20 09:00', daysLeft: 12 },
    { name: '嵌入式开发实验考核', startTime: '2023-12-15 14:00', daysLeft: 7 }
  ]
};

export const LEARNING_SKILLS = [
  { id: 'S001', name: 'Modbus协议解析', course: '《智慧园区》', score: 95, color: 'text-teal-600', bg: 'bg-teal-50' },
  { id: 'S002', name: 'RS485接线', course: '《智慧园区》', score: 88, color: 'text-teal-600', bg: 'bg-teal-50' },
  { id: 'S003', name: 'STM32 GPIO控制', course: '《嵌入式开发》', score: 65, color: 'text-orange-600', bg: 'bg-orange-50' },
  { id: 'S004', name: 'I2C通信', course: '《嵌入式开发》', score: 58, color: 'text-orange-600', bg: 'bg-orange-50' },
  { id: 'S005', name: 'Python函数 definition', course: '《Python基础》', score: 98, color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 'S006', name: '列表与字典操作', course: '《Python基础》', score: 92, color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 'S007', name: 'TCP/IP握手', course: '《计算机网络》', score: 85, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { id: 'S008', name: 'VLAN划分', course: '《计算机网络》', score: 72, color: 'text-indigo-600', bg: 'bg-indigo-50' },
];

export const LEARNING_SKILLS_FULL = [
  ...Array.from({length: 100}, (_, i) => ({ // Increased to 100
    code: `A${(i+1).toString().padStart(3, '0')}`,
    name: `智慧园区技能点-${i+1}`,
    course: '《智慧园区》',
    score: Math.random() > 0.4 ? Math.floor(Math.random() * 15) + 85 : Math.floor(Math.random() * 40) + 40,
    color: ''
  })),
  ...Array.from({length: 100}, (_, i) => ({ // Increased to 100
    code: `B${(i+1).toString().padStart(3, '0')}`,
    name: `嵌入式开发技能-${i+1}`,
    course: '《嵌入式开发》',
    score: Math.random() > 0.5 ? Math.floor(Math.random() * 20) + 60 : Math.floor(Math.random() * 40) + 30,
    color: ''
  })),
  ...Array.from({length: 50}, (_, i) => ({
    code: `C${(i+1).toString().padStart(3, '0')}`,
    name: `Python编程技能-${i+1}`,
    course: '《Python基础》',
    score: Math.floor(Math.random() * 15) + 85,
    color: ''
  })),
  ...Array.from({length: 50}, (_, i) => ({
    code: `D${(i+1).toString().padStart(3, '0')}`,
    name: `计算机网络技能-${i+1}`,
    course: '《计算机网络》',
    score: Math.floor(Math.random() * 50) + 40,
    color: ''
  })),
];

export const WEAKNESS_DATA = [
  { skill: 'I2C通信时序', course: '《嵌入式开发》', suggestion: '建议重新复习I2C时序图，重点关注起始信号与应答信号，并使用逻辑分析仪抓取波形进行对照分析。' },
  { skill: '中断优先级配置', course: '《嵌入式开发》', suggestion: '中断优先级配置存在混淆，建议通过多中断嵌套实验加深理解，注意抢占优先级与响应优先级的区别。' },
  { skill: 'VLAN划分配置', course: '《计算机网络》', suggestion: '在三层交换机配置实验中多次出错，需加强Tag与Untag端口的区别记忆，多进行模拟器拓扑练习。' }
];

export const JOB_RECOMMENDATIONS = [
  { 
    title: '物联网系统开发工程师', 
    match: 92, 
    salary: '12k-20k',
    reason: 'Python编程能力卓越，且对智慧园区业务逻辑理解深刻，完全符合系统开发岗要求。',
    matchingSkills: [
        { name: 'Python', score: 98, fullMark: 100 },
        { name: '业务逻辑', score: 90, fullMark: 100 },
        { name: '系统架构', score: 85, fullMark: 100 },
        { name: '数据库', score: 88, fullMark: 100 },
        { name: 'Linux', score: 80, fullMark: 100 },
        { name: '网络协议', score: 85, fullMark: 100 }
    ]
  },
  { 
    title: '嵌入式软件工程师', 
    match: 85, 
    salary: '10k-18k',
    reason: '具备扎实的C语言基础和RTOS知识，但硬件底层驱动开发能力有待加强。',
    matchingSkills: [
        { name: 'C语言', score: 92, fullMark: 100 },
        { name: 'RTOS', score: 80, fullMark: 100 },
        { name: '驱动开发', score: 65, fullMark: 100 },
        { name: '硬件调试', score: 75, fullMark: 100 },
        { name: '电路分析', score: 70, fullMark: 100 },
        { name: '通信协议', score: 85, fullMark: 100 }
    ]
  },
  { 
    title: 'Python后端开发工程师', 
    match: 88, 
    salary: '15k-25k',
    reason: '函数 definition 与数据结构操作熟练，适合往后端服务开发方向发展。',
    matchingSkills: [
        { name: 'Python', score: 98, fullMark: 100 },
        { name: '数据库', score: 82, fullMark: 100 },
        { name: 'API设计', score: 78, fullMark: 100 },
        { name: '算法', score: 85, fullMark: 100 },
        { name: '框架应用', score: 90, fullMark: 100 },
        { name: '并发编程', score: 75, fullMark: 100 }
    ]
  },
  { 
    title: '智能硬件测试工程师', 
    match: 82, 
    salary: '8k-15k',
    reason: '熟悉设备调试与故障排查流程，细心程度高，适合硬件测试岗位。',
    matchingSkills: [
        { name: '设备调试', score: 85, fullMark: 100 },
        { name: '故障排查', score: 80, fullMark: 100 },
        { name: '测试理论', score: 75, fullMark: 100 },
        { name: '自动化测试', score: 65, fullMark: 100 },
        { name: '文档编写', score: 85, fullMark: 100 },
        { name: '工具使用', score: 90, fullMark: 100 }
    ]
  },
  { 
    title: '物联网运维工程师', 
    match: 78, 
    salary: '9k-14k',
    reason: '网络基础知识扎实，能独立完成设备上云与维护工作。',
    matchingSkills: [
        { name: '网络配置', score: 85, fullMark: 100 },
        { name: 'Linux', score: 75, fullMark: 100 },
        { name: '云平台', score: 70, fullMark: 100 },
        { name: 'Shell脚本', score: 80, fullMark: 100 },
        { name: '安全防护', score: 65, fullMark: 100 },
        { name: '监控部署', score: 78, fullMark: 100 }
    ]
  }
];

export const WEAKNESS_ANALYSIS = {
  weak_skills: ['I2C通信', 'VLAN划分', 'STM32中断处理'],
  suggestion: '硬件底层驱动开发能力较弱，建议加强STM32实操训练与通信协议理解。'
};
