# Talk Deck · 网页版讲座 PPT 模板

> 用代码做的讲座 PPT。React + Vite + framer-motion，**自带演讲者摄像头**（录播露脸），一套 JR Academy / 匠人学院的设计语言。
> 给老师的：**配合 AI（Claude Code / Cursor）改内容最省事** —— 你不用从零写代码，让 AI 照着 `CLAUDE.md` 的约定加页、改文字就行。

![键位](https://img.shields.io/badge/翻页-←→-black) ![全屏](https://img.shields.io/badge/全屏-F-black) ![摄像头](https://img.shields.io/badge/摄像头-C-ff5757)

## 30 秒上手（老师闭环）

```bash
# 1. 用本模板起一个新讲座（二选一）
npx degit JR-Academy-AI/talk-deck my-talk      # 或在 GitHub 点 "Use this template"
cd my-talk

# 2. 装依赖 + 启动
npm install        # 或 bun install
npm run dev        # 打开 http://localhost:5173
```

```text
# 3. 在 Claude Code 里说人话填内容（本仓库自带 /add-slide skill）
/add-slide 讲"我们学校的 AI 课程体系"的一页
```

```bash
# 4. 放映：← → 翻页    F 全屏    C 开/关右下角摄像头（录播露脸）
# 5. 出成品
npm run build      # 产物在 dist/，丢到任意静态托管即可
```

## 给老师：怎么改成你的讲座（AI 辅助）

本仓库**自带一个 Claude Code skill `/add-slide`**（`.claude/skills/add-slide/`）。在 Claude Code 里直接说人话即可：
- `/add-slide 讲 XXX 的一页`，或 “按这个大纲加 8 页 slide：……”
- “把封面标题改成《XXX》，副标题改成 YYY”
- “把右上角 logo 换成我学校的”

AI 会照 skill + `CLAUDE.md` 的约定动**内容文件**（见下表）、不碰引擎，并自动 `build` 验证。也可以自己手改 —— 入口都在 `src/components/slides/` 和 `src/App.tsx`。

## 🚦 两类文件，别搞混

| 类别 | 文件 | 改不改 |
|---|---|---|
| **内容**（你的讲座） | `src/App.tsx`（页面顺序）· `src/components/slides/*.tsx`（每页一个）· `public/`（图片/logo） | ✅ 随便改 |
| **引擎**（测过的运行时） | `src/components/SlideEngine.tsx` · `ui.tsx` · `CameraBubble.tsx` · `src/styles/theme.ts` | ⚠️ 一般别动；动画/翻页/摄像头/缩放都在这，改坏了整站崩 |

## 加一页 slide

1. 在 `src/components/slides/` 复制 `S01_Cover.tsx` 或 `S02_Example.tsx`，改个名（如 `S03_MyPoint.tsx`）。
2. 在 `src/App.tsx` `import` 它，并按放映顺序放进 `<SlideEngine>`。
3. 用现成基元拼版：`Slide` / `Inner` / `Half` / `Title` / `Subtitle` / `Highlight` / `Tag` / `CountUp` / `GrowBar`（都在 `src/components/ui.tsx`）。

## 设计 & 摄像头

- 设计语言：JR Neo-Brutalism —— 粗黑边 + 偏移硬阴影 + 品牌饱和色 + 暖底。颜色/字体令牌在 `src/styles/theme.ts`，**用令牌、别写死 hex**。
- 画布固定 **1600×900**，整体缩放适配任意屏，所以尺寸写绝对 px 即可、不用管响应式。
- 演讲者摄像头：按 `C` 开关，右下角圆形、可拖动、镜像。追求更高画质时可改用 OBS / Screen Studio 录任意 deck。

## 部署

`npm run build` → `dist/` 是纯静态，丢 GitHub Pages / S3 / Netlify / 自建 nginx 都行。`vite.config.ts` 的 `base` 默认 `./`（相对路径，子路径也能跑）。

## License

MIT —— 见 [LICENSE](./LICENSE)。默认带 JR Academy / 匠人学院 logo，换成自己的请替换 `public/jr-logo.png` 并改 `SlideEngine.tsx` 里的品牌字样。
