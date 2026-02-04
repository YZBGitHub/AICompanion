
import { UserRole } from '../types';

const ZH_TEXT = {
  nav: {
    home: '首页',
    intro: '平台介绍',
    companion: 'AI学伴',
    skill: '技能分析',
    learning: '学情分析',
    process: '全过程数据',
  },
  roles: {
    [UserRole.VISITOR]: '游客',
    [UserRole.STUDENT]: '学生',
    [UserRole.TEACHER]: '教师',
    [UserRole.ADMIN]: '平台管理员',
  },
  app: {
    title: 'AI学伴',
    subtitle: '全过程技能分析系统',
    footer: '© 2024 AI学伴 - 全过程技能分析系统. 保留所有权利.'
  },
  home: {
    hero_title: 'AI学伴 - 全过程技能分析系统',
    hero_subtitle: '以自我决定理论（SDT）为核心教学理论，通过 AI 支持的教学策略提升学习投入 with 任务完成质量',
    hero_vision: 'AI 支持 → SDT 心理需求满足 → 学习投入提升',
    stats: {
      users: '用户',
      answers: '回答',
      dialogs: '对话',
      courses: '课程',
      media: '智能体'
    },
    sdt: {
      title: '产品核心理论：自我决定理论 (SDT)',
      subtitle: '全过程数据分析是实证验证 AI 学伴在职业教育动机理论中作用的关键技术支柱',
      mechanism_title: '“AI 支持 → 心理需求满足 → 学习投入” 动态作用机制',
      ai_support: 'AI 智能支架支持',
      ai_desc: '个性化路径 (自主性)\n即时反馈 (能力感)\n私密伴学 (关系性)',
      needs: '心理需求满足 (SDT)',
      needs_desc: '自主性、能力感、关系性的充分满足',
      engagement: '更高水平的学习投入',
      engagement_desc: '行为投入、认知投入、情感投入',
      vision_desc: '平台以自我决定理论（SDT）为核心教学理论，通过 AI 支持的教学策略促进学生的自主性、能力感和关系性体验，从而提升学习投入与任务完成质量。',
      scaffolds: {
        title: '三类核心 AI 支架实现对心理需求的支持',
        autonomy: {
          title: '学习路径与选择支架 (Autonomy)',
          desc: '提供任务选择、自主调用提示、灵活路径规划，支持学生的学习控制感。'
        },
        competence: {
          title: '即时反馈与任务诊断支架 (Competence)',
          desc: '提供结构化提示、纠错反馈、过程性引导，帮助学生建立有效的胜任感。'
        },
        relatedness: {
          title: '协作引导与学习情境支架 (Relatedness)',
          desc: '通过学习过程可视化、同伴协作数据、教师可见性，营造支持性学习氛围。'
        }
      }
    },
    partners: '合作伙伴',
    cases_title: '客户案例',
    cases_desc: '助力 100+ 院校实现数字化教学转型与技能精准分析',
    case_list: [
      {
        school: '深圳职业技术大学',
        title: '物联网实训云平台',
        desc: '通过 AI 学伴实现全校 3000+ 学生操作数据无感采集，技能掌握度分析准确率提升 40%。'
      },
      {
        school: '金华职业技术学院',
        title: '工业互联网实训基地',
        desc: '集成工业级软硬件数据链路，实现从边缘侧到云端的全过程自动评分与实时诊断。'
      },
      {
        school: '南京信息职业技术学院',
        title: 'AI 助教深度集成项目',
        desc: '将 SDT 动机理论模型嵌入教学全流程，学生在线学习投入度提升 25%，任务完成率大幅提高。'
      },
      {
        school: '四川邮电职业技术学院',
        title: '数字化转型实战基地',
        desc: '构建基于岗位能力模型的个性化推荐系统，实现“学-练-考-荐”闭环人才培养。'
      }
    ],
    architecture: '产品架构',
    arch_desc: '四层架构体系，从数据采集到解释设计的全链路生态',
    layers: {
      l4: { title: '应用服务层 (设计与解释层)', desc: '基于 SDT 理论的支架设计 · 动机解释模型 · 行为归因分析', tags: ['智能问答', '岗位推荐', '心理辅导', '技能认证'] },
      l3: { title: 'AI 核心能力层', desc: '岗位能力模型 · 知识图谱构建 · 综合素质评价', tags: ['技能图谱', '自动评分', '用户画像', '岗位适配算法'] },
      l2: { title: '数据分析层', desc: '多模态数据处理 · 学习行为建模 · 趋势预测', tags: ['行为分析', '情感计算', '学情预测', '过程挖掘'] },
      l1: { title: '数据汇聚层', desc: '全场景数据无感采集 · 软硬件数据互联', tags: ['行为日志', '硬件指令', '代码提交', '测评数据', '物联感知'] },
    }
  },
  intro: {
    title: '平台介绍',
    subtitle: 'AI 驱动的教育数字化转型解决方案',
    position: {
      title: '产品定位',
      main: 'AI 驱动的个性化学习与技能成长平台',
      desc: 'AI 学伴系统致力于通过全过程数据采集与人工智能分析，为职业教育提供从"技能评估"到"岗位推荐"的闭环解决方案。我们利用多模态数据分析技术，精准刻画学生画像，辅助教师精准教学，助力学校数字化管理决策。'
    },
    funcs: {
      title: '核心功能',
      graph: '技能图谱构建',
      graph_desc: '基于学科知识点的动态关联图谱，精准定位知识盲区，实现个性化知识导航。',
      scoring: '自动评分系统',
      scoring_desc: '代码、实验报告的智能化自动批改与反馈，大幅提升教学效率。',
      analysis: '深度学情分析',
      analysis_desc: '多维度学生画像，精准预测学习趋势与职业潜力，提供数据化决策支持。',
      process: '全过程数据采集',
      process_desc: '无感采集软硬件实验操作数据，还原学习真相，支持实证研究。'
    },
    cases: {
      title: '项目案例',
      c1_title: '某双高职院校物联网虚拟仿真实训平台',
      c1_desc: '为全校3000余名物联网专业学生提供无感化的操作数据采集与技能实时评估。',
      c2_title: '国家级工业互联网实训基地',
      c2_desc: '集成主流工业协议，实现从边缘侧到云端的全链路数据溯源与自动评分。',
      c3_title: '职教云平台 AI 助教集成项目',
      c3_desc: '将 AI 学伴深度集成至现有的职教云平台，为异构课程提供通用的技能分析能力。'
    }
  },
  companion: {
    config: {
      title: '配置 AI 学伴',
      nickname: '学伴昵称',
      avatar: '学伴头像',
      personality: '性格设定',
      p_options: [
        '知性 (理性客观)', '活泼 (亲切随和)', '严谨 (逻辑缜密)', 
        '幽默 (风趣乐天)', '高冷 (简洁直接)', '温柔 (体贴入微)', 
        '博学 (见多识广)', '灵动 (创意无限)', '憨厚 (踏实可靠)', '睿智 (深谋远虑)'
      ],
      role: '角色设定',
      r_options: [
        '学姐 (耐心细致)', '学长 (富有远见)', '教师 (专业引导)', 
        '智者 (指引方向)', '探险家 (勇于尝试)', '发明家 (解决困难)', 
        '领航员 (掌控全局)', '观察员 (客观分析)', '志愿者 (无私奉献)', '记录员 (有条不紊)'
      ],
      custom_prompt: '自定义设定提示词',
      custom_prompt_placeholder: '输入额外的指令来微调学伴的行为 (可选)',
      save: '保存配置'
    },
    stats: {
      help_count: '回答总数',
      questions: '今日提问',
      time: '伴学时长',
      volume: '互动次数'
    },
    paths: {
      title: '学习路径规划',
      courses: '当前课程进度',
      smart_park: '智慧园区项目',
      embedded: '嵌入式系统开发',
      status: {
        continuing: '继续学习',
        exam: '去参加考试'
      },
      progress: '进度',
      exams: '近期考试安排',
      days_left: '天后开始',
      python_cert: 'Python 技能认证',
      start_time: '开始时间',
      task_name: '任务名称',
      issue_time: '下发时间',
      completed_exam: '已完成考试',
      score: '成绩',
      rank: '排名'
    },
    chat: {
      header: 'AI 学伴在线',
      recent: '最近互动',
      placeholder: '你可以问我任何关于课程、实验或技能提升的问题'
    },
    feedback: {
      title: '学伴反馈',
      great: '做得太棒了！',
      content: '你最近在 Python 算法练习中表现非常出色，正确率达到了 90% 以上。继续保持这份专注，你一定能掌握更多技能！'
    },
    tasks: {
      title: '待办任务',
      t1: '完成智慧园区第 3 章实验',
      t2: '提交 Python 列表操作作业',
      t3: '复习 STM32 中断控制器概念',
      continue: '去完成'
    },
    rank: {
      title: 'AI助手榜单',
      skill_assist: '技能助手',
      software: '软件智能体',
      hardware: '硬件智能体',
      col_name: '项目',
      col_count: '热度'
    }
  },
  skill: {
    formula: {
      title: '技能掌握度算法',
      subtitle: '计算公式',
      example: 'Score = (Course_Progress * 0.3) + (Exp_Quality * 0.4) + (Quiz_Performance * 0.3)',
      item1: '课程进度',
      item1_ex: '反映基础知识覆盖面',
      item2: '实验质量',
      item2_ex: '基于操作路径与排错能力',
      item3: '测验表现',
      item3_ex: '反映知识点掌握深度'
    },
    rank: {
      courseTitle: '课程掌握排行',
      school: '校内排名',
      class: '班级排名',
      platform: '平台排名'
    },
    graph: {
      title: '知识图谱导航',
      tree: '树状视图',
      network: '网状视图'
    },
    ai: {
      title: 'AI 智能进阶推荐',
      rec_courses: '推荐课程',
      rec_skills: '推荐关注技能点'
    }
  },
  learning: {
    title: '学情分析',
    views: {
      student: '学生视图',
      teacher: '教师视图'
    },
    overview: {
      title: '概览',
      courses: '课程状态',
      exams: '考试/测验状态'
    },
    ai_analysis: {
      title: 'AI 综合画像',
      persona: '用户画像',
      habits: '学习习惯',
      features: '行为特征',
      ability: '核心能力',
      job_rec: '推荐岗位',
      reason: '匹配理由'
    },
    skill_analysis: {
      title: '技能掌握度分析',
      weakness: '薄弱环节分析',
      advice: '诊断建议'
    },
    engagement: {
      title: '学习参与度分析',
      behavior_data: '学习行为数据',
      op_data: '学习过程操作数据',
      platform: '平台行为',
      software: '软件实验过程',
      hardware: '硬件实验过程',
      op_soft: '软件操作',
      op_hard: '硬件操作',
      summary: '近30天全过程参与概影',
      metrics: {
        logins: '登录次数',
        online_time: '在线时长',
        ai_qa: 'AI 提问次数',
        task_time: '任务学习时长',
        report_count: '任务提交报告数量',
        task_done: '任务完成数量',
        env_open: '实验环境打开次数',
        runtime: '运行时间',
        agent_qa: '软件智能体回答次数',
        sessions: '会话数量',
        qa_time: '问答时间',
        hard_login: '硬件智能体登录次数',
        hard_online: '在线时长',
        hard_qa: '问答次数',
        hard_sessions: '会话数量',
        hard_open: '打开次数',
        op_time: '硬件操作时间',
        dev_online: '设备在线时长'
      }
    },
    teacher: {
      tabs: {
        assistant: 'AI 教学助手',
        profile: '班级画像',
        compare: '多维对比'
      },
      ai: {
        welcome: '您好，张老师。我是您的 AI 教学分析助手。',
        summary: '当前管理的 4 个班级中，34 名学生整体完成率为 84%，平均分为 67 分。',
        chat_placeholder: '分析 1 班 Python 课程的掌握情况...'
      },
      profile: {
        difficulty_rank: '最难掌握技能点 Top 10',
        student_rank: '优秀学生排行 Top 10',
        weakness_title: '班级薄弱项诊断',
        weakness_desc: '班级整体在硬件接口调用和多线程处理方面得分较低，建议增加相关实操课时。'
      },
      score_dist: '成绩分布情况'
    }
  },
  process: {
    nav: {
      process_behavior: '过程行为数据',
      behavior: '平台行为',
      soft_exp: '软件实验',
      hard_exp: '硬件实验',
      process_operation: '过程操作数据',
      learning_op: '学习操作',
      soft_op: '软件实操',
      hard_op: '硬件实操',
      third_party: '第三方数据',
      questionnaire: '问卷调查',
      other_platform: '其他平台'
    },
    detail: {
      title: '详情',
      ai_name: 'AI助手名称',
      last_interact: '最近交互',
      total_interact: '总交互次数',
      sim_project: '仿真项目',
      sim_stats: '仿真统计',
      sim_history: '操作历史',
      q_no: '题号',
      q_type: '题型',
      q_content: '题目内容',
      q_correct: '是否正确',
      q_duration: '耗时',
      q_switch: '切屏次数',
      q_skill: '考察技能',
      q_data: '作答数据',
      q_score: '得分',
      ai_total: '总交互次数',
      ai_words: '总字数',
      ai_avg_words: '平均字数',
      ai_interval: '平均间隔',
      ai_sessions: '会话数',
      ai_sat: '满意度',
      ai_qa_content: '问答内容',
      total_score: '总分',
      accuracy: '正确率',
      as_rule: '评分规则',
      as_scene: '场景',
      as_env: '环境',
      as_score: '得分',
      as_result: '结果',
      as_skill: '技能点'
    },
    filters: {
      subCategories: { platform: '平台行为', course: '课程行为', ai: 'AI交互' },
      softExpCategories: { env: '环境数据', agent: '智能体数据' },
      hardExpCategories: { interaction: '交互数据', capability: '能力数据' },
      learnOpCategories: { task: '任务数据', ai: 'AI数据', auto_score: '自动评分', note: '笔记' },
      metric: '统计指标',
      data_dim: '数据维度',
      dims: { school: '学校', class: '班级', user: '用户', course: '课程' },
      time_dim: '时间维度',
      times: { hour: '小时', day: '天', month: '月', year: '年' },
      metrics_platform: { login: '登录次数', duration: '在线时长' },
      metrics_course: { submit: '提交次数', duration: '学习时长' },
      metrics_ai: { qa: '问答次数', words: '交互字数' },
      metrics_soft_env: { open_count: '打开次数', duration: '运行时长' },
      metrics_soft_agent: { qa_count: '问答次数', satisfaction: '满意度' },
      metrics_hard_interaction: { login: '登录次数', online: '在线时长' },
      metrics_hard_capability: { query_status: '状态查询', control: '控制指令' }
    },
    chart: {
      bar: '柱状图',
      line: '折线图',
      table: '表格'
    }
  }
};

const EN_TEXT = {
  nav: {
    home: 'Home',
    intro: 'Platform Intro',
    companion: 'AI Companion',
    skill: 'Skill Analysis',
    learning: 'Learning Analysis',
    process: 'Whole Process Data',
  },
  roles: {
    [UserRole.VISITOR]: 'Visitor',
    [UserRole.STUDENT]: 'Student',
    [UserRole.TEACHER]: 'Teacher',
    [UserRole.ADMIN]: 'Administrator',
  },
  app: {
    title: 'AI Companion',
    subtitle: 'Whole-Process Skill Analysis',
    footer: '© 2024 AI Companion System. All rights reserved.'
  },
  home: {
    hero_title: 'AI Companion - Skill Analysis System',
    hero_subtitle: 'Based on Self-Determination Theory (SDT) as core teaching theory, driving engagement via AI scaffolds',
    hero_vision: 'AI Support → SDT Satisfaction → Engagement Increase',
    stats: {
      users: 'Users',
      answers: 'Answers',
      dialogs: 'Dialogs',
      courses: 'Courses',
      media: 'Agents'
    },
    sdt: ZH_TEXT.home.sdt,
    partners: 'Partners',
    cases_title: 'Customer Cases',
    cases_desc: 'Helping 100+ institutions achieve digital transformation.',
    case_list: ZH_TEXT.home.case_list,
    architecture: 'Architecture',
    arch_desc: 'Four-layer architecture from data collection to interpretation & design',
    layers: ZH_TEXT.home.layers
  },
  intro: {
    title: 'Platform Intro',
    subtitle: 'AI-driven educational digital transformation solutions',
    position: {
      title: 'Product Positioning',
      main: 'AI-driven personalized learning and skill growth platform',
      desc: 'Committed to providing a closed-loop solution from "skill assessment" to "job recommendation".'
    },
    funcs: {
      title: 'Core Functions',
      graph: 'Skill Graph',
      graph_desc: 'Dynamic graph based on knowledge points.',
      scoring: 'Auto-Grading',
      scoring_desc: 'Intelligent correction for code and reports.',
      analysis: 'Deep Learning Analysis',
      analysis_desc: 'Multi-dimensional student profiling.',
      process: 'Process Data Collection',
      process_desc: 'Seamless data collection from experiments.'
    },
    cases: ZH_TEXT.intro.cases
  },
  companion: {
    config: {
      title: 'Configure AI Companion',
      nickname: 'Nickname',
      avatar: 'Avatar',
      personality: 'Personality',
      p_options: ZH_TEXT.companion.config.p_options,
      role: 'Role',
      r_options: ZH_TEXT.companion.config.r_options,
      custom_prompt: 'Custom Prompt',
      custom_prompt_placeholder: 'Input extra instructions to fine-tune AI behavior (Optional)',
      save: 'Save'
    },
    stats: {
      help_count: 'Answers',
      questions: 'Today\'s Questions',
      time: 'Duration',
      volume: 'Interactions'
    },
    paths: {
      title: 'Learning Path',
      courses: 'Courses',
      smart_park: 'Smart Park',
      embedded: 'Embedded Dev',
      status: {
        continuing: 'Continue',
        exam: 'Go to Exam'
      },
      progress: 'Progress',
      exams: 'Recent Exams',
      days_left: 'days left',
      python_cert: 'Python Cert',
      start_time: 'Start',
      task_name: 'Task Name',
      issue_time: 'Issued at',
      completed_exam: 'Completed',
      score: 'Score',
      rank: 'Rank'
    },
    chat: {
      header: 'AI Companion Online',
      recent: 'Recent',
      placeholder: 'Ask me anything about your learning...'
    },
    feedback: {
      title: 'Feedback',
      great: 'Great Job!',
      content: 'You performed exceptionally well in recent Python tasks.'
    },
    tasks: {
      title: 'Pending Tasks',
      t1: 'Finish Smart Park Exp',
      t2: 'Submit Python HW',
      t3: 'Review STM32 Concepts',
      continue: 'Start'
    },
    rank: {
      title: 'AI Assistant Leaderboard',
      skill_assist: 'Skill Assistant',
      software: 'Software Agent',
      hardware: 'Hardware Agent',
      col_name: 'Item',
      col_count: 'Heat'
    }
  },
  skill: {
    formula: {
      title: 'Skill Mastery Algorithm',
      subtitle: 'Formula',
      example: 'Score = (Progress * 0.3) + (Exp * 0.4) + (Quiz * 0.3)',
      item1: 'Progress',
      item1_ex: 'Foundation coverage',
      item2: 'Experiment',
      item2_ex: 'Path & Debugging',
      item3: 'Quiz',
      item3_ex: 'Knowledge depth'
    },
    rank: {
      courseTitle: 'Course Mastery Rank',
      school: 'School',
      class: 'Class',
      platform: 'Platform'
    },
    graph: {
      title: 'Knowledge Graph',
      tree: 'Tree View',
      network: 'Network View'
    },
    ai: {
      title: 'AI Recommendations',
      rec_courses: 'Courses',
      rec_skills: 'Skills'
    }
  },
  learning: {
    title: 'Learning Analysis',
    views: {
      student: 'Student View',
      teacher: 'Teacher View'
    },
    overview: {
      title: 'Overview',
      courses: 'Courses',
      exams: 'Exams'
    },
    ai_analysis: {
      title: 'AI Analysis',
      persona: 'Persona',
      habits: 'Habits',
      features: 'Features',
      ability: 'Ability',
      job_rec: 'Job Rec',
      reason: 'Reason'
    },
    skill_analysis: {
      title: 'Skill Analysis',
      weakness: 'Weakness',
      advice: 'Advice'
    },
    engagement: {
      title: 'Learning Engagement Analysis',
      behavior_data: 'Behavior Data',
      op_data: 'Process Operation Data',
      platform: 'Platform Behavior',
      software: 'Software Exp',
      hardware: 'Hardware Exp',
      op_soft: 'Software Ops',
      op_hard: 'Hardware Ops',
      summary: '30-Day engagement profile',
      metrics: {
        logins: 'Logins',
        online_time: 'Online Time',
        ai_qa: 'AI Questions',
        task_time: 'Task Study Time',
        report_count: 'Reports',
        task_done: 'Tasks Completed',
        env_open: 'Env Opens',
        runtime: 'Runtime',
        agent_qa: 'Agent Answers',
        sessions: 'Sessions',
        qa_time: 'Q&A Time',
        hard_login: 'Logins',
        hard_online: 'Online',
        hard_qa: 'Questions',
        hard_sessions: 'Sessions',
        hard_open: 'Opens',
        op_time: 'Hardware Op Time',
        dev_online: 'Device Online'
      }
    },
    teacher: {
      tabs: {
        assistant: 'AI Assistant',
        profile: 'Class Profile',
        compare: 'Comparison'
      },
      ai: {
        welcome: 'Hello, Teacher Zhang.',
        summary: '84% completion rate. Avg Score: 67.',
        chat_placeholder: 'Analyze class status...'
      },
      profile: {
        difficulty_rank: 'Hardest Skills',
        student_rank: 'Top Students',
        weakness_title: 'Weakness Analysis',
        weakness_desc: 'Struggles with threading and hardware.'
      },
      score_dist: 'Score Dist'
    }
  },
  process: {
    nav: {
      process_behavior: 'Process Behavior',
      behavior: 'Platform',
      soft_exp: 'Software Exp',
      hard_exp: 'Hardware Exp',
      process_operation: 'Process Operation',
      learning_op: 'Learning Op',
      soft_op: 'Software Op',
      hard_op: 'Hardware Op',
      third_party: 'Third Party',
      questionnaire: 'Questionnaire',
      other_platform: 'Other Platform'
    },
    detail: {
      title: 'Detail',
      ai_name: 'AI Name',
      last_interact: 'Last Interaction',
      total_interact: 'Total Interactions',
      sim_project: 'Simulation Project',
      sim_stats: 'Stats',
      sim_history: 'History',
      q_no: 'No.',
      q_type: 'Type',
      q_content: 'Content',
      q_correct: 'Correct',
      q_duration: 'Duration',
      q_switch: 'Switch',
      q_skill: 'Skill',
      q_data: 'Data',
      q_score: 'Score',
      ai_total: 'Total',
      ai_words: 'Words',
      ai_avg_words: 'Avg Words',
      ai_interval: 'Avg Interval',
      ai_sessions: 'Sessions',
      ai_sat: 'Satisfaction',
      ai_qa_content: 'Q&A Content',
      total_score: 'Total Score',
      accuracy: 'Accuracy',
      as_rule: 'Rule',
      as_scene: 'Scene',
      as_env: 'Env',
      as_score: 'Score',
      as_result: 'Result',
      as_skill: 'Skill'
    },
    filters: {
      subCategories: { platform: 'Platform', course: 'Course', ai: 'AI' },
      softExpCategories: { env: 'Env Data', agent: 'Agent Data' },
      hardExpCategories: { interaction: 'Interaction', capability: 'Capability' },
      learnOpCategories: { task: 'Task', ai: 'AI', auto_score: 'Auto Score', note: 'Note' },
      metric: 'Metric',
      data_dim: 'Dimension',
      dims: { school: 'School', class: 'Class', user: 'User', course: 'Course' },
      time_dim: 'Time',
      times: { hour: 'Hour', day: 'Day', month: 'Month', year: 'Year' },
      metrics_platform: { login: 'Logins', duration: 'Online Time' },
      metrics_course: { submit: 'Submits', duration: 'Study Time' },
      metrics_ai: { qa: 'Q&A Count', words: 'Words' },
      metrics_soft_env: { open_count: 'Opens', duration: 'Runtime' },
      metrics_soft_agent: { qa_count: 'Q&A Count', satisfaction: 'Satisfaction' },
      metrics_hard_interaction: { login: 'Logins', online: 'Online Time' },
      metrics_hard_capability: { query_status: 'Query Status', control: 'Control' }
    },
    chart: {
      bar: 'Bar Chart',
      line: 'Line Chart',
      table: 'Table'
    }
  }
};

export const TEXT = {
  zh: ZH_TEXT,
  en: EN_TEXT
};
