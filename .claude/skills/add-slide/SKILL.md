---
name: add-slide
description: "在本讲座 deck 里新增或修改一页 slide（也含改封面标题、换 logo、调样式）。照 talk-deck 约定：只动内容层不碰引擎、用 theme 令牌不写死 hex、命名 {S|C|Z}nn_Name、注册进 App.tsx、build 验证。Use when 用户要给这个 deck 加页 / 改某页内容 / 改封面 / 换 logo / 调某页排版。"
argument-hint: "[这一页讲什么，或要改哪页]"
---

# /add-slide — 给本 deck 加 / 改一页

这是一个网页版讲座 deck（React + Vite + framer-motion）。用户要加页或改页时照这个做。

## 🚦 第一铁律：只动内容，别碰引擎

| 能动（内容） | 别动（引擎，测过的运行时） |
|---|---|
| `src/App.tsx`（页面顺序）· `src/components/slides/*.tsx`· `public/`（图片/logo） | `src/components/SlideEngine.tsx` · `ui.tsx` · `CameraBubble.tsx` · `src/styles/theme.ts` |

只有用户明确要改翻页/摄像头/缩放等引擎行为时才动引擎，并说明风险。

## 加一页

1. **建文件**：在 `src/components/slides/` 复制 `S02_Example.tsx`，按约定命名 `{S|C|Z}{两位序号}_{PascalCase}.tsx`（普通页 `S`，章节封面 `C`/`Z`，转场页加 `b` 如 `S06b_*`）。
2. **写内容**：根组件 `export default function Xnn_Name()`，用 `Slide` 包整页 + `Inner`（`center` 居中 / `split` 左右分栏）布局；元素用 `ui.tsx` 基元：`Title` `Subtitle` `Highlight` `Tag` `Half` `CountUp`（数字滚动）`GrowBar`（条形图）。
3. **加动画**：`motion.*` + 递增 `delay`（0.15→0.3→…）让元素依次入场，或用 `springIn` / `slideFromLeft|Right` variants。
4. **注册**：在 `src/App.tsx` `import` 它，按放映顺序放进 `<SlideEngine>`（用注释分章节）。
5. **验证**：`npm run build`（= `tsc -b && vite build`）确认类型通过；`npm run dev` 里 `← →` 翻到这页走查。

## 改封面 / 换 logo / 调样式

- **封面标题/副标题**：改 `src/components/slides/S01_Cover.tsx` 里的文字。
- **换 logo**：替换 `public/jr-logo.png`（保持文件名最省事），品牌字样在 `SlideEngine.tsx` 里（属"明确要改品牌"，可动那一处）。
- **配色/字体**：只用 `src/styles/theme.ts` 的 `colors` / `fonts` / `border` / `shadow`，**禁止写死 hex**、禁止引入新字体或 CSS 框架。

## 设计纪律（JR Neo-Brutalism）

- 画布固定 **1600×900**，尺寸写绝对 px、不写响应式断点（引擎会整体缩放）。
- 粗黑边 + 偏移硬阴影 + 品牌饱和色 + 暖底；重点用 `Highlight` 色块或 `Tag`，不用渐变、不用纯白底。
- **数据不编造**：讲座里的数字/数据要有真实来源，没有就删或降级为"观点"；数据多时建 `src/data/*.ts` + TS interface，缺字段就 omit。
