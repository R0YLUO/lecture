# CLAUDE.md — 给 AI 的项目引导

这是一个**网页版讲座 PPT**项目（React 19 + Vite + framer-motion）。用户多半是老师，会让你帮忙加页 / 改文字 / 换封面。照下面的约定做。

## 🚨 铁律

1. **引擎只读，不重写**。这几个文件是测过的运行时代码，**不要改、不要重写**（含摄像头权限、流释放、键盘/触摸/滚轮翻页、1600×900 缩放等浏览器坑）：
   - `src/components/SlideEngine.tsx` · `src/components/ui.tsx` · `src/components/CameraBubble.tsx` · `src/styles/theme.ts` · `src/main.tsx`
   - 用户明确要改引擎行为时才动，并说明风险。
2. **你只动内容**：`src/App.tsx` / `src/en/App.tsx`（页面顺序）、`src/components/slides/*.tsx` / `src/components/slides/en/*.tsx`（每页一个组件）、`public/`（图片）。
3. **设计令牌优先**：颜色/字体一律用 `src/styles/theme.ts` 的 `colors` / `fonts` / `border` / `shadow`，**禁止写死 hex**、禁止引入新字体或 Tailwind。
4. **一文件一页**，命名 `{S|C|Z}{两位序号}_{PascalCase}.tsx`（转场页加 `b`，如 `S06b_*`）。
5. **画布固定 1600×900**，尺寸写绝对 px，不要写响应式断点（SlideEngine 会整体缩放）。
6. **中英双语同步**：deck 有两个语言版本——中文 `src/App.tsx` + `src/components/slides/*.tsx`（根路径 `/`），英文 `src/en/App.tsx` + `src/components/slides/en/*.tsx`（`/en/`）。**改任何一页（加页、删页、改内容、调样式、换顺序）都必须在两个版本同步改**，只是文字语言不同。

## 加一页 slide

1. 复制 `src/components/slides/S02_Example.tsx`，改名 + 改内容。
2. 在 `src/App.tsx` `import` 并按顺序放进 `<SlideEngine>`。
3. 在 `src/components/slides/en/` 建同名英文版，并同样注册进 `src/en/App.tsx`。
4. 拼版用 `ui.tsx` 基元：`Slide`（整页底色）/ `Inner`（`center`|`split`）/ `Half` / `Title` / `Subtitle` / `Highlight` / `Tag` / `CountUp` / `GrowBar`；入场动画用 `motion.*` + 递增 `delay`，或 `springIn`/`slideFromLeft|Right`。

## 数据纪律

讲座里的数字/数据**不要编造**。没来源的论点删掉或降级为“观点”。数据多时单独建 `src/data/*.ts` + TS interface，缺字段就 omit。

## 验证

改完跑 `npm run build`（= `tsc -b && vite build`）确认类型通过；`npm run dev` 里逐页走查（`← →` 翻页、`C` 摄像头）。
