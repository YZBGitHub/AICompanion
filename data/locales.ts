
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
    hero_subtitle: 'AI赋能教育，落地AI+教育。AI学伴，你的最佳学习伙伴。',
    stats: {
      users: '累计用户',
      answers: '累计回答',
      dialogs: '累计对话',
      courses: '累计课程',
      media: '智能体'
    },
    sdt: {
      title: '产品核心理论',
      subtitle: '全过程数据分析是实证验证AI学伴在职业教育动机理论中作用的关键技术支柱',
      mechanism_title: '“AI支持 → 心理需求满足 → 学习投入” 动态作用机制',
      ai_support: 'AI智能支架支持',
      ai_desc: '个性化路径 (自主性)\n即时反馈 (能力感)\n私密伴学 (关系性)',
      needs: '心理需求满足 (SDT)',
      needs_desc: '自主性、能力感、关系性的充分满足',
      engagement: '更高水平的学习投入',
      engagement_desc: '行为投入、认知投入、情感投入',
      data_title: '全过程数据采集与指标映射验证',
      method_title: '实证分析方法',
      method_desc: '采用结构方程模型 (SEM) 验证路径关系，结合过程挖掘技术提取学习路径，实现从“学习动机—学习行为—学习结果”的全链条追踪。',
      table: {
        type: '数据类型',
        content: '采集内容',
        function: '动机理论对应作用',
        r1_type: '学习行为数据',
        r1_content: '登录频次、AI对话次数、提示层级调用',
        r1_func: '反映行为投入水平 & 对AI依赖程度',
        r2_type: '软件实验过程',
        r2_content: '错误类型、修正路径、任务完成率',
        r2_func: '分析操作策略 & 认知投入水平',
        r3_type: '硬件实操数据',
        r3_content: '设备连接、调试频次、故障排查路径',
        r3_func: '客观验证“能力感”的提升',
        r4_type: '主观心理数据',
        r4_content: '自主性/能力感/关系性满足问卷',
        r4_func: '作为SEM模型的核心中介变量'
      }
    },
    partners: '合作伙伴',
    architecture: '产品架构',
    arch_desc: '四层架构体系，从数据采集到应用服务的全链路生态',
    layers: {
      l4: { title: '应用服务层', desc: '自主性支持 · 能力感提升 · 关系性构建 (SDT落地)', tags: ['智能问答', '岗位推荐', '心理辅导', '技能认证'] },
      l3: { title: 'AI核心能力层', desc: '岗位能力模型 · 知识图谱构建 · 综合素质评价', tags: ['技能图谱', '自动评分', '用户画像', '岗位适配算法'] },
      l2: { title: '数据分析层', desc: '多模态数据处理 · 学习行为建模 · 趋势预测', tags: ['行为分析', '情感计算', '学情预测', '过程挖掘'] },
      l1: { title: '数据汇聚层', desc: '全场景数据无感采集 · 软硬件数据互联', tags: ['行为日志', '硬件指令', '代码提交', '测评数据', '物联感知'] },
    }
  },
  intro: {
    title: '平台介绍',
    subtitle: 'AI驱动的教育数字化转型解决方案',
    position: {
      title: '产品定位',
      main: 'AI驱动的个性化学习与技能成长平台',
      desc: 'AI学伴系统致力于通过全过程数据采集与人工智能分析，为职业教育提供从"技能评估"到"岗位推荐"的闭环解决方案。我们利用多模态数据分析技术，精准刻画学生画像，辅助教师精准教学，助力学校数字化管理决策。'
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
      c1_title: '某高职院校数字化教学改革试点',
      c1_desc: '覆盖全校计算机系3000+名学生，课程完成率提升25%，学生技能掌握度显著提高。',
      c2_title: '国家级职业教育实训基地',
      c2_desc: '部署AI学伴系统，实现软硬件实验数据的统一监管与分析，提升实训效果。',
      c3_title: '区域智慧教育云平台',
      c3_desc: '服务区域内10所中高职院校，实现师资与课程资源的智能共享，促进教育公平。'
    }
  },
  companion: {
    title: 'AI学伴助手',
    hello: '首次打开，唤醒AI学伴',
    config: {
      title: '首次打开，请设置您的专属AI学伴',
      nickname: 'AI学伴昵称',
      personality: '性格设定',
      role: '角色类型',
      avatar: '选择形象',
      p_options: ['知性 (理性客观)', '幽默 (风趣活泼)', '严厉 (严格要求)'],
      r_options: ['学长 (经验丰富)', '学姐 (耐心细致)', '教师 (权威指导)'],
      save: '保存并开启AI之旅'
    },
    stats: {
      help_count: '累计打卡/求助',
      questions: '累计提问',
      time: '累计询问时长',
      volume: '累计对话量'
    },
    paths: {
      title: '学习路径',
      courses: '进行中的课程',
      exams: '待进行的考试',
      smart_park: '《智慧园区》',
      embedded: '《嵌入式开发》',
      python_cert: 'Python一级认证考试',
      status: { continuing: '继续学习', exam: '进入考试' },
      start_time: '开始时间',
      days_left: '天后开始'
    },
    feedback: {
      title: '想对你说',
      great: '太棒了！',
      content: '您的互动总次数高达12万次，打败了平台90%的用户！看来你对“智慧园区”AI助手情有独钟，一共累计高达120次互动哦。'
    },
    rank: {
      title: 'AI助手使用排名',
      skill_assist: '技能助手',
      hardware: '硬件智能体',
      software: '软件智能体',
      col_rank: '排名',
      col_name: '名称',
      col_count: '热度'
    },
    tasks: {
      title: '我的任务',
      t1: '完成 Python 基础测验',
      t2: '与 AI 助手对话 10 分钟',
      t3: '阅读《智慧园区》第三章',
      continue: '继续进行'
    },
    chat: {
      header: 'AI学伴助手',
      placeholder: '今天是2025年11月28日星期五，AI学伴陪你的第365天，你的状态越来越好，继续加油哦！',
      btn_send: '发送'
    }
  },
  skill: {
    title: '技能分析',
    userInfo: {
      school: '学校',
      major: '专业',
      class: '班级',
      name: '姓名',
      id: '学号',
      schoolVal: '深圳职业技术大学',
      majorVal: '物联网应用技术',
      classVal: '21级物联网1班',
      nameVal: '李明',
      idVal: '2021001001'
    },
    heatmap: {
      title: '课程技能热力图',
      legend: { low: '待提升 (Gray)', med: '良好 (Red)', high: '优秀 (Green)', desc: '掌握度越好颜色越深' },
      selectCourse: '学习的课程列表',
      courseName: '课程名称',
      studyTime: '学习时间',
      status: '学习状态',
      mastery: '技能掌握情况',
      statusOpts: { in_progress: '进行中', completed: '已完成', not_started: '未开始' },
      tableHeaders: { cat: '技能分类', points: '技能点与掌握度' }
    },
    rank: {
      courseTitle: '课程掌握排行',
      skillTitle: '技能掌握排行',
      school: '校内排名',
      class: '班级排名',
      rankCol: '排名',
      nameCol: '姓名',
      classCol: '班级',
      scoreCol: '掌握度'
    },
    radar: {
      title: '技能雷达图',
      job: '岗位 (物联网安装调试员)',
      dims: { theory: '物联网理论', install: '设备安装', debug: '设备调试' }
    },
    ai: {
      title: 'AI智能分析和推荐',
      rec_courses: '推荐学习课程',
      rec_skills: '推荐提升技能点'
    },
    graph: {
      title: '技能知识图谱',
      tree: '树形图',
      network: '网状图'
    },
    formula: {
      title: '技能点计算公式',
      subtitle: '加权平均',
      example: '合计: (3+3+5) / (10+10+10) = 37% (对应灰色与红色之间)',
      item1: '课程任务完成',
      item1_ex: '10个步骤，完成3个',
      item2: '习题与测验题目答对',
      item2_ex: '10题，答对3个',
      item3: '自动评分-规则满分',
      item3_ex: '10个，5个满分'
    }
  },
  learning: {
    title: '学情分析',
    views: {
      student: '学生视图',
      teacher: '教师视图'
    },
    overview: {
      title: '学情概况',
      courses: '课程学习情况',
      exams: '考试/测验情况'
    },
    ai_analysis: {
      title: 'AI综合分析',
      persona: '适配形象',
      habits: '学习习惯',
      features: '学习特点',
      ability: '综合能力',
      job_rec: '岗位推荐',
      reason: '适配理由'
    },
    skill_analysis: {
      title: '技能分析',
      weakness: '技能薄弱点分析',
      advice: '综合建议'
    },
    sdt: {
      title: '基于SDT理论的过程数据分析',
      summary_title: '近30天全过程数据画像',
      beh_title: '学习行为数据',
      soft_title: '软件实验数据',
      hard_title: '硬件实验数据',
      autonomy: '自主性 (Autonomy)',
      competence: '能力感 (Competence)',
      relatedness: '关系性 (Relatedness)',
      total_score: 'SDT综合评分',
      rank: '校内排名'
    },
    teacher: {
      tabs: {
        assistant: 'AI学情分析助手',
        profile: '班级画像',
        compare: '班级对比'
      },
      ai: {
        welcome: '你好，张老师，我是您的AI学情分析助手',
        summary: '你一共创建4个班级，合计34个学生，一共下发《智慧园区》、《嵌入式开发》等3门课程。学生参与程度一般，一共84%完成所有课程任务，平均成绩67分。',
        chat_placeholder: '请帮我分析一下物联网1班的Python编程掌握情况...'
      },
      profile: {
        difficulty_rank: '技能点难度排名 (掌握度最低Top10)',
        student_rank: '学生掌握排名 (Top10)',
        weakness_title: '班级技能薄弱点分析',
        weakness_desc: '根据班级整体数据，该班级在“硬件接口调用”与“多线程编程”模块掌握度显著低于平均水平。建议在后续教学中增加针对性的实操案例，特别是GPIO中断控制与线程锁机制的讲解。',
        select_class: '选择班级',
        select_course: '选择课程'
      },
      class_profile: '班级画像',
      score_dist: '成绩分布',
      warning: '预警名单',
      avg_score: '平均分',
      attendance: '出勤率',
      interaction: '互动率'
    }
  },
  process: {
    title: '全过程数据',
    nav: {
       behavior: '学习行为数据',
       process_behavior: '学习过程行为数据',
       soft_exp: '软件实验过程数据',
       hard_exp: '硬件实验过程数据',
       process_operation: '学习过程操作数据',
       learning_op: '学习操作数据',
       soft_op: '软件操作',
       hard_op: '硬件操作',
       third_party: '第三方数据',
       questionnaire: '问卷调查',
       other_platform: '其他平台数据'
    },
    filters: {
       subCategories: {
         platform: '平台行为数据',
         course: '课程任务数据',
         ai: 'AI助手数据'
       },
       // Software Experiment Sub-categories
       softExpCategories: {
         env: '软件实验环境',
         agent: '软件智能体'
       },
       // Hardware Experiment Sub-categories
       hardExpCategories: {
         interaction: '智能体交互数据',
         capability: '智能体能力数据'
       },
       // Learning Operation Tabs
       learnOpCategories: {
         task: '课程任务',
         ai: '课程AI助手',
         auto_score: '自动评分'
       },
       metric: '统计指标',
       time_dim: '时间维度',
       data_dim: '数据维度',
       metrics_platform: {
          login: '用户登录次数',
          online: '平台在线时长',
          ai_total: '平台AI问答总次数'
       },
       metrics_course: {
          submit: '提交报告数量',
          total_time: '任务学习总时长',
          exp_time: '任务-实验实训学习时长',
          read_time: '任务-图文学习时长',
          video_time: '任务-视频学习时长',
          quiz_time: '任务-习题与测试学习时长',
          complete: '任务-完成数量'
       },
       metrics_ai: {
          qa: '课程技能助手问答次数',
          duration: '课程技能助手问答时间',
          session: '课程技能助手会话数量',
          open: '课程技能助手打开次数'
       },
       // Software Experiment Metrics
       metrics_soft_env: {
          open_count: '实验环境打开次数',
          run_time: '实验环境运行时间'
       },
       metrics_soft_agent: {
          qa_count: '软件智能体问答次数',
          qa_time: '软件智能体问答时间',
          session_count: '软件智能体会话数量',
          open_count: '软件智能体打开次数',
          create_exec: '【创建能力】执行次数',
          debug_exec: '【排错能力】执行次数'
       },
       // Hardware Experiment Metrics
       metrics_hard_interaction: {
          login: '硬件智能体登录次数',
          online: '硬件智能体在线时长',
          qa_count: '硬件智能体问答次数',
          qa_time: '硬件智能体问答时间',
          session: '硬件智能体会话数量',
          open: '硬件智能体打开次数'
       },
       metrics_hard_capability: {
          query_status: '【查询状态】能力执行次数',
          query_config: '【查询配置】能力执行次数',
          config_debug: '【配置排错】能力执行次数',
          send_control: '【下发控制】能力执行次数'
       },
       dims: {
          school: '按学校',
          class: '按班级',
          user: '按用户',
          course: '按课程'
       },
       times: {
          hour: '时',
          day: '日',
          month: '月',
          year: '年'
       },
       start: '开始时间',
       end: '结束时间'
    },
    chart: {
       table: '表格',
       bar: '柱状图',
       line: '折线图'
    },
    detail: {
       title: '数据详情',
       q_data: '答题情况数据',
       ai_data: 'AI问答数据',
       task_name: '任务名称',
       q_no: '序号',
       q_type: '题目类型',
       q_content: '题目内容',
       q_duration: '答题时长',
       q_correct: '正确与否',
       q_switch: '切换次数',
       q_skill: '关联技能点',
       q_score: '习题最终成绩',
       q_total_time: '该习题总耗时',
       q_rank: '班级得分排名',
       q_weak: '掌握较差技能点',
       ai_qa_content: '问答数据(内容)',
       ai_total: '提问总次数',
       ai_words: '提问总字数',
       ai_avg_words: '提问平均字数',
       ai_skills: '命中技能点次数',
       ai_interval: '追问平均间隔',
       ai_sessions: '对话总次数',
       accuracy: '正确率',
       ai_sat: '回答满意度',
       last_interact: '最近交互时间',
       total_interact: '累计交互次数',
       ai_name: 'AI助手名称',
       sim_project: '仿真工程文件',
       sim_history: '操作过程记录',
       sim_stats: '操作行为统计',
       sim_agent: '仿真智能体数据',
       // Auto Score Labels
       as_rule: '评分规则名称',
       as_scene: '评分场景',
       as_env: '实验环境',
       as_score: '分数',
       as_result: '结果',
       as_skill: '关联技能点',
       as_reason: '错误原因',
       total_score: '总得分'
    }
  }
};

const EN_TEXT = {
  // ... (Keep existing EN TEXT if not modified) ...
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
  learning: {
    title: 'Learning Analysis',
    views: {
      student: 'Student View',
      teacher: 'Teacher View'
    },
    overview: {
      title: 'Overview',
      courses: 'Course Status',
      exams: 'Exam/Quiz Status'
    },
    ai_analysis: {
      title: 'AI Comprehensive Analysis',
      persona: 'Persona',
      habits: 'Habits',
      features: 'Features',
      ability: 'Ability',
      job_rec: 'Job Rec',
      reason: 'Reason'
    },
    skill_analysis: {
      title: 'Skill Analysis',
      weakness: 'Weakness Analysis',
      advice: 'Suggestion'
    },
    sdt: {
      title: 'SDT-Based Process Analysis',
      summary_title: '30-Day Process Data Profile',
      beh_title: 'Learning Behavior',
      soft_title: 'Software Experiment',
      hard_title: 'Hardware Experiment',
      autonomy: 'Autonomy',
      competence: 'Competence',
      relatedness: 'Relatedness',
      total_score: 'Total Score',
      rank: 'Rank'
    },
    teacher: {
      tabs: {
        assistant: 'AI Assistant',
        profile: 'Class Profile',
        compare: 'Comparison'
      },
      ai: {
        welcome: 'Hello, Teacher Zhang. I am your AI Learning Analysis Assistant.',
        summary: 'You have created 4 classes with 34 students total. 84% completion rate. Avg Score: 67.',
        chat_placeholder: 'Analyze Python mastery for IoT Class 1...'
      },
      profile: {
        difficulty_rank: 'Hardest Skills (Top 10)',
        student_rank: 'Top Students (Top 10)',
        weakness_title: 'Class Weakness Analysis',
        weakness_desc: 'Students struggle with Hardware Interface and Threading. Suggest more practice.',
        select_class: 'Select Class',
        select_course: 'Select Course'
      },
      class_profile: 'Class Profile',
      score_dist: 'Score Dist',
      warning: 'Warning List',
      avg_score: 'Avg Score',
      attendance: 'Attendance',
      interaction: 'Interaction'
    }
  },
  home: ZH_TEXT.home,
  intro: ZH_TEXT.intro,
  companion: ZH_TEXT.companion,
  skill: ZH_TEXT.skill,
  process: ZH_TEXT.process
};

export const TEXT = {
  zh: ZH_TEXT,
  en: EN_TEXT
};
