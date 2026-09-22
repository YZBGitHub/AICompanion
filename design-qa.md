# 教师学情分析视图验收

final result: blocked

- Source visual truth: 用户本轮上传的教师视图截图（1796 × 925），AI 教学助手状态。
- Implementation: `components/TeacherWorkspace.tsx`、`components/TeacherWorkspace.css`、`components/LearningReports.tsx`，原有班级画像由 `views/LearningAnalysis.tsx` 传入。
- Implementation screenshot: unavailable.
- Viewport / density normalization: 未获得浏览器截图，尚未对齐视口与像素密度。
- Full-view / focused comparison: 未执行；不得将构建或静态渲染检查视为视觉验收通过。

## 阻塞原因

内置浏览器返回 `Browser is not available: iab`。Chrome 浏览器扩展可列出，但打开本地页面超时（8 秒）；本轮未获得渲染截图，未完成浏览器控制台检查或实际点击验证。

## 已实现的范围

- 三个教师 Tab：AI 教学助手、班级画像、学情报告。
- 顶部学校、班级、课程筛选；助手采用左侧概况/数据源配置、右侧对话布局。
- 新建会话、上下文隔离的会话列表、演示回复。
- 报告列表、生成配置、数据源多选、提示词、查看与重新生成（同一 ID 更新版本）。
- 原型报告为模板演示，明确标识数据与模型限制；仅在当前页面会话内保存。
- 生成独立机器人素材 `public/assets/teacher-robot.png`。

## 验证证据

- Vite 构建通过；未新增 TypeScript 错误（项目仍有既有错误）。
- React 服务端渲染覆盖学生、教师、管理员角色及教师 Tab/控件。
- 报告模型检查覆盖所有数据源、排除未选数据源、提示词保存、版本更新、原报告不可变、空标题与空数据源校验。

## 待完成视觉与交互验收

- 字体/排版：字号、行高、标题与小字截断，未作截图比较。
- 布局/间距：1120px 内容宽度、360px 左栏、24px 列间距，以及移动端单栏，未作截图比较。
- 色彩：蓝白、淡紫概况卡、蓝色选中态，未作截图比较。
- 图片：机器人 PNG 已生成，页面内尺寸与清晰度未验证；品牌图标使用现有图标库近似。
- 文案：保留截图中的 Tab、配置名称和 1 / 49 / 44% / -- 概况，增加演示说明。
- 浏览器主路径：教师视图 → 报告 → 生成 → 查看 → 重新生成 → 切换班级/课程检查列表；模态框焦点、Esc 关闭和窄屏需要补验。

## Comparison history

尚无浏览器证据，不记录虚构的视觉迭代或通过结论。
