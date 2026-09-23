import { useCallback, useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { motion, useIsPresent } from 'framer-motion';
import { Slide, Title, colors, fonts, border, shadow, shadowSm } from '../ui';

/**
 * 自主循环 · 一个任务是怎么被做完的（点一下走一步）
 *
 * 演讲者备注：
 * 这页不自动播：点一下画面或按 → 走一步，← 退一步；走到最后一步再按 → 才翻页。
 * 一切从一条指令开始：目标，加上可用的工具。指令写进记录，循环被唤醒。
 * 之后每一轮都是同一件事：把整份记录交给 LLM，LLM 做一个决定——要用工具，还是做完了。
 * 要用工具，程序就去执行；LLM 的回应和工具的结果都写进记录，所以下一轮 LLM 看到的记录更长了。
 * 直到某一轮 LLM 判断资料够了、不再要求工具：这条回应也写进记录，然后跳出循环，把结果返回给你。
 */

interface Tool { icon: string; name: string; result: string }
const FINANCE: Tool = { icon: '📊', name: '查财务', result: '财务数据' };
const TASKS: Tool = { icon: '📋', name: '查任务版', result: '任务数据' };

// 每一拍（beat）就是一次点击；记录里有几条、第几轮、哪条箭头在动都从这张表推出来
type Beat =
	| { kind: 'instruction'; caption: string }
	| { kind: 'enterLoop'; caption: string }
	| { kind: 'toLLM'; round: number; caption: string }
	| { kind: 'llmToolCall'; round: number; tool: Tool; caption: string }
	| { kind: 'runTool'; round: number; tool: Tool; caption: string }
	| { kind: 'llmDone'; round: number; caption: string }
	| { kind: 'returnResult'; round: number; caption: string };

const SCRIPT: Beat[] = [
	{ kind: 'instruction', caption: '一切从一条指令开始：目标，加上可用的工具' },
	{ kind: 'enterLoop', caption: '指令写进记录，循环被唤醒' },
	{ kind: 'toLLM', round: 1, caption: '第 1 轮：把整份记录交给 LLM' },
	{ kind: 'llmToolCall', round: 1, tool: FINANCE, caption: 'LLM 决定：缺财务数据，要用工具。这条回应先写进记录' },
	{ kind: 'runTool', round: 1, tool: FINANCE, caption: '程序执行工具，结果也写进记录' },
	{ kind: 'toLLM', round: 2, caption: '第 2 轮：记录变长了，再整份交给 LLM' },
	{ kind: 'llmToolCall', round: 2, tool: TASKS, caption: 'LLM 决定：还缺任务数据，再要一次工具' },
	{ kind: 'runTool', round: 2, tool: TASKS, caption: '程序执行工具，结果写进记录' },
	{ kind: 'toLLM', round: 3, caption: '第 3 轮：再交给 LLM' },
	{ kind: 'llmDone', round: 3, caption: 'LLM 判断：资料够了，做完了。这条回应也写进记录' },
	{ kind: 'returnResult', round: 3, caption: '没有工具要求了：跳出循环，把结果返回给你' },
];
const LAST = SCRIPT.length - 1;
const firstBeat = (kind: Beat['kind']) => SCRIPT.findIndex((b) => b.kind === kind);
const FIRST = {
	enterLoop: firstBeat('enterLoop'),
	toLLM: firstBeat('toLLM'),
	llmToolCall: firstBeat('llmToolCall'),
	runTool: firstBeat('runTool'),
};

type Role = 'system' | 'llm' | 'tool';
interface Chip { role: Role; text: string }
const ROLE: Record<Role, { label: string; color: string }> = {
	system: { label: '指令', color: colors.purple },
	llm: { label: 'LLM', color: colors.blue },
	tool: { label: '工具', color: colors.green },
};

function chipsUpTo(step: number): Chip[] {
	const chips: Chip[] = [];
	for (const b of SCRIPT.slice(0, step + 1)) {
		if (b.kind === 'enterLoop') chips.push({ role: 'system', text: '写今天的日报 · 可用工具 ×2' });
		else if (b.kind === 'llmToolCall') chips.push({ role: 'llm', text: `要用 ${b.tool.icon} ${b.tool.name}` });
		else if (b.kind === 'runTool') chips.push({ role: 'tool', text: `${b.tool.icon} ${b.tool.result}` });
		else if (b.kind === 'llmDone') chips.push({ role: 'llm', text: '日报写好了 ✓' });
	}
	return chips;
}

// 画布 1600×900 上的绝对坐标
interface Box { x: number; y: number; w: number; h: number }
const L: Record<'instruction' | 'frame' | 'context' | 'llm' | 'tool' | 'result', Box> = {
	instruction: { x: 100, y: 235, w: 290, h: 245 },
	frame: { x: 460, y: 175, w: 770, h: 605 },
	context: { x: 500, y: 225, w: 290, h: 515 },
	llm: { x: 940, y: 290, w: 260, h: 160 },
	tool: { x: 940, y: 520, w: 260, h: 150 },
	result: { x: 1330, y: 397, w: 170, h: 160 },
};

type LabelSide = 'above' | 'below';
interface ArrowSpec { x1: number; y1: number; x2: number; y2: number; label: string; side: LabelSide }
const ARROWS: Record<'instToCtx' | 'ctxToLlm' | 'llmToCtx' | 'toolToCtx' | 'loopToResult', ArrowSpec> = {
	instToCtx: { x1: 390, y1: 357, x2: 500, y2: 357, label: '写进记录', side: 'above' },
	ctxToLlm: { x1: 790, y1: 330, x2: 940, y2: 330, label: '输入', side: 'above' },
	llmToCtx: { x1: 940, y1: 410, x2: 790, y2: 410, label: '回应写入', side: 'below' },
	toolToCtx: { x1: 940, y1: 595, x2: 790, y2: 595, label: '结果写入', side: 'below' },
	loopToResult: { x1: L.frame.x + L.frame.w, y1: L.result.y + L.result.h / 2, x2: L.result.x, y2: L.result.y + L.result.h / 2, label: '返回', side: 'above' },
};

const pad = (n: number) => String(n).padStart(2, '0');

export default function S05b_AgentLoopFlow() {
	const [step, setStep] = useState(0);
	const present = useIsPresent();
	const next = useCallback(() => setStep((s) => Math.min(s + 1, LAST)), []);
	const back = useCallback(() => setStep((s) => Math.max(s - 1, 0)), []);

	// 还有步没走完时，→ / 空格 / ← 归这一页；走完最后一步（或退到第一步）再按，才交给引擎翻页。
	// 翻页退场动画期间这页还挂着，present 为 false，不再拦键。
	useEffect(() => {
		if (!present) return;
		const onKey = (e: KeyboardEvent) => {
			const fwd = e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ';
			const bwd = e.key === 'ArrowLeft' || e.key === 'ArrowUp';
			if (fwd && step < LAST) { e.preventDefault(); e.stopImmediatePropagation(); next(); }
			else if (bwd && step > 0) { e.preventDefault(); e.stopImmediatePropagation(); back(); }
		};
		window.addEventListener('keydown', onKey, true);
		return () => window.removeEventListener('keydown', onKey, true);
	}, [step, next, back, present]);

	const beat = SCRIPT[step];
	const chips = chipsUpTo(step);
	const round = 'round' in beat ? beat.round : 0;
	const done = beat.kind === 'llmDone';
	const returned = beat.kind === 'returnResult';
	const tool = 'tool' in beat ? beat.tool : null;

	const awake = step >= FIRST.enterLoop;
	const show = {
		context: step >= FIRST.enterLoop,
		llm: step >= FIRST.toLLM,
		tool: step >= FIRST.runTool,
	};
	const active = {
		instruction: beat.kind === 'instruction',
		context: beat.kind === 'enterLoop' || beat.kind === 'llmToolCall' || beat.kind === 'runTool' || done,
		llm: beat.kind === 'toLLM' || beat.kind === 'llmToolCall' || done,
		tool: beat.kind === 'runTool',
	};
	const arrows = {
		instToCtx: { shown: step >= FIRST.enterLoop, active: beat.kind === 'enterLoop' },
		ctxToLlm: { shown: step >= FIRST.toLLM, active: beat.kind === 'toLLM' },
		llmToCtx: { shown: step >= FIRST.llmToolCall, active: beat.kind === 'llmToolCall' || done },
		toolToCtx: { shown: step >= FIRST.runTool, active: beat.kind === 'runTool' },
		loopToResult: { shown: returned, active: returned },
	};

	return (
		<Slide bg={colors.warmBg}>
			<div
				onClick={next}
				style={{ position: 'relative', width: 1600, height: 900, cursor: step < LAST ? 'pointer' : 'default', userSelect: 'none' }}>

				{/* 标题 */}
				<motion.div
					initial={{ opacity: 0, x: -30 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.45 }}
					style={{ position: 'absolute', left: 100, top: 48 }}>
					<div style={{
						display: 'inline-block', padding: '4px 12px', marginBottom: 10,
						background: colors.black, color: colors.yellow, fontFamily: fonts.mono, fontSize: 13,
						fontWeight: 700, letterSpacing: 2,
					}}>
						03 · 智能体是什么
					</div>
					<Title size="40px">自主循环：一个任务是怎么被做完的</Title>
				</motion.div>

				<StepControl step={step} onNext={next} onBack={back} />

				{/* 循环边框：没唤醒前是虚线的影子 */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: awake ? 1 : 0.35 }}
					transition={{ duration: 0.4, delay: awake ? 0 : 0.3 }}
					style={{
						position: 'absolute', left: L.frame.x, top: L.frame.y, width: L.frame.w, height: L.frame.h,
						background: awake ? colors.white : 'transparent',
						border: awake ? border : `3px dashed ${colors.black}`,
					}}
				/>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: awake ? 1 : 0.5 }}
					transition={{ duration: 0.4 }}
					style={{
						position: 'absolute', left: L.frame.x + 22, top: L.frame.y - 19,
						padding: '6px 14px', background: colors.yellow, border,
						fontFamily: fonts.mono, fontSize: 14, fontWeight: 700, letterSpacing: 1,
					}}>
					↻ 自主循环 · Agent Loop
				</motion.div>
				{round > 0 && (
					<motion.div
						key={returned ? 'done' : round}
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ type: 'spring', stiffness: 300, damping: 22 }}
						style={{
							position: 'absolute', right: 1600 - (L.frame.x + L.frame.w) + 22, top: L.frame.y - 19,
							padding: '6px 14px', border,
							background: returned ? colors.green : colors.black, color: returned ? colors.black : colors.yellow,
							fontFamily: fonts.mono, fontSize: 14, fontWeight: 700, letterSpacing: 2,
						}}>
						{returned ? '循环结束 ✓' : `第 ${round} 轮`}
					</motion.div>
				)}

				{/* 箭头层 */}
				<svg width={1600} height={900} viewBox="0 0 1600 900" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'visible' }}>
					{(Object.keys(ARROWS) as (keyof typeof ARROWS)[]).map((k) => (
						<ArrowLine key={k} spec={ARROWS[k]} {...arrows[k]} />
					))}
				</svg>
				{(Object.keys(ARROWS) as (keyof typeof ARROWS)[]).map((k) => (
					<ArrowLabel key={k} spec={ARROWS[k]} {...arrows[k]} />
				))}

				{/* 指令 · system prompt */}
				<Node box={L.instruction} shown active={active.instruction} color={colors.purple} header="指令 · system prompt">
					<div style={{ padding: '18px 18px 16px', display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
						<div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
							<span style={{ fontSize: 28, lineHeight: 1 }}>🎯</span>
							<span style={{ fontSize: 21, fontWeight: 700, lineHeight: 1.3 }}>写今天的日报给老板</span>
						</div>
						<div style={{ height: 2, background: colors.black, opacity: 0.12 }} />
						<div style={{ fontFamily: fonts.mono, fontSize: 12, fontWeight: 700, letterSpacing: 1, opacity: 0.6 }}>可用工具</div>
						<div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
							{[FINANCE, TASKS].map((t) => (
								<span key={t.name} style={{
									padding: '6px 12px', background: colors.warmBg, border: `2px solid ${colors.black}`,
									fontSize: 16, fontWeight: 700, whiteSpace: 'nowrap',
								}}>{t.icon} {t.name}</span>
							))}
						</div>
					</div>
				</Node>

				{/* 记录 · context */}
				<Node
					box={L.context} shown={show.context} active={active.context} color={colors.orange}
					header={<>
						<span>记录 · context</span>
						<motion.span
							key={chips.length}
							initial={{ scale: 1.3 }}
							animate={{ scale: 1 }}
							style={{ marginLeft: 'auto', padding: '1px 8px', background: colors.black, color: colors.white, fontSize: 12 }}>
							{chips.length} 条
						</motion.span>
					</>}>
					<div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
						{chips.map((c, i) => (
							<motion.div
								key={i}
								initial={{ opacity: 0, x: 70, scale: 0.9 }}
								animate={{ opacity: 1, x: 0, scale: 1 }}
								transition={{ type: 'spring', stiffness: 320, damping: 24, delay: i === chips.length - 1 && active.context ? 0.25 : 0 }}
								style={{ display: 'flex', alignItems: 'stretch', background: colors.white, border: `2px solid ${colors.black}`, height: 48 }}>
								<span style={{
									width: 58, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
									background: ROLE[c.role].color, borderRight: `2px solid ${colors.black}`,
									fontFamily: fonts.mono, fontSize: 12, fontWeight: 700,
								}}>{ROLE[c.role].label}</span>
								<span style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '0 12px', fontSize: 15, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.text}</span>
							</motion.div>
						))}
					</div>
				</Node>

				{/* LLM */}
				<Node box={L.llm} shown={show.llm} active={active.llm} pulse={beat.kind === 'toLLM'} color={colors.blue} header="LLM · 大脑">
					<div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 14, padding: '0 18px' }}>
						<span style={{ fontSize: 46, lineHeight: 1 }}>🧠</span>
						<div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
							<span style={{ fontFamily: fonts.heading, fontSize: 30, fontWeight: 900, lineHeight: 1, letterSpacing: -0.5 }}>LLM</span>
							<LlmStatus beat={beat} />
						</div>
					</div>
				</Node>

				{/* 工具 · tool use */}
				<Node box={L.tool} shown={show.tool} dim={!active.tool} active={active.tool} color={colors.green} header="工具 · Tool Use">
					<div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 14, padding: '0 18px' }}>
						<span style={{ fontSize: 42, lineHeight: 1 }}>🦾</span>
						{active.tool && tool ? (
							<motion.div
								key={tool.name}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ type: 'spring', stiffness: 300, damping: 22 }}
								style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
								<span style={{ fontSize: 24, fontWeight: 800, lineHeight: 1 }}>{tool.icon} {tool.name}</span>
								<motion.span
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.5 }}
									style={{ alignSelf: 'flex-start', padding: '2px 8px', background: colors.green, border: `2px solid ${colors.black}`, fontFamily: fonts.mono, fontSize: 12, fontWeight: 700 }}>
									✓ 拿到结果
								</motion.span>
							</motion.div>
						) : (
							<span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, opacity: 0.45 }}>等待请求</span>
						)}
					</div>
				</Node>

				{/* 任务完成 · 结果：只在最后一拍从循环框右边出来 */}
				<motion.div
					initial={{ opacity: 0, scale: 0.9, y: 16 }}
					animate={returned ? { opacity: 1, scale: 1, x: -3, y: -3 } : { opacity: 0, scale: 0.9, x: 0, y: 16 }}
					transition={{ type: 'spring', stiffness: 260, damping: 20, delay: returned ? 0.55 : 0 }}
					style={{
						position: 'absolute', left: L.result.x, top: L.result.y, width: L.result.w, height: L.result.h,
						background: colors.white, border, boxShadow: shadow,
						display: 'flex', flexDirection: 'column', pointerEvents: 'none',
					}}>
					<div style={{ padding: '9px 14px', background: colors.black, color: colors.yellow, borderBottom: border, fontFamily: fonts.mono, fontSize: 14, fontWeight: 700, letterSpacing: 1 }}>
						✓ 任务完成
					</div>
					<div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
						<span style={{ fontSize: 40, lineHeight: 1 }}>📄</span>
						<span style={{ fontSize: 19, fontWeight: 700 }}>今天的日报</span>
					</div>
				</motion.div>

				{/* 底部一句话：这一步在干什么 */}
				<div style={{ position: 'absolute', left: '50%', top: 806, transform: 'translateX(-50%)' }}>
					<motion.div
						key={step}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3 }}
						style={{ display: 'flex', alignItems: 'stretch', background: colors.white, border, boxShadow: shadowSm, whiteSpace: 'nowrap' }}>
						<span style={{
							display: 'flex', alignItems: 'center', padding: '0 14px', borderRight: border,
							background: returned ? colors.green : step === 0 ? colors.purple : colors.yellow,
							fontFamily: fonts.mono, fontSize: 14, fontWeight: 700, letterSpacing: 1,
						}}>{pad(step + 1)}</span>
						<span style={{ padding: '10px 22px', fontSize: 20, fontWeight: 600, lineHeight: 1.3 }}>{beat.caption}</span>
					</motion.div>
				</div>
			</div>
		</Slide>
	);
}

// LLM 框里的状态行：等输入 / 思考中 / 做了什么决定
function LlmStatus({ beat }: { beat: Beat }) {
	if (beat.kind === 'toLLM') {
		return (
			<span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, display: 'inline-flex', gap: 6 }}>
				思考中
				<motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>···</motion.span>
			</span>
		);
	}
	if (beat.kind === 'llmToolCall' || beat.kind === 'llmDone' || beat.kind === 'returnResult') {
		const isTool = beat.kind === 'llmToolCall';
		return (
			<motion.span
				key={isTool ? beat.tool.name : 'done'}
				initial={{ opacity: 0, x: -8 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ type: 'spring', stiffness: 300, damping: 22 }}
				style={{
					alignSelf: 'flex-start', padding: '3px 10px', border: `2px solid ${colors.black}`,
					background: isTool ? colors.green : colors.yellow,
					fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap',
				}}>
				{isTool ? `决定：要用 ${beat.tool.icon} ${beat.tool.name}` : '决定：做完了 ✓'}
			</motion.span>
		);
	}
	return <span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, opacity: 0.45 }}>等待输入</span>;
}

// 有色标题 + 白底内容的方框；active 时抬起来、影子加深，pulse 时轻微呼吸，dim 时灰掉（出现了但没在干活）
function Node({ box, shown, active, dim, pulse, color, header, children }: {
	box: Box; shown: boolean; active?: boolean; dim?: boolean; pulse?: boolean; color: string; header: ReactNode; children: ReactNode;
}) {
	const spring = { type: 'spring' as const, stiffness: 260, damping: 24 };
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.92, x: 0, y: 14, boxShadow: shadowSm }}
			animate={shown
				? { opacity: dim ? 0.3 : 1, scale: pulse ? [1, 1.025, 1] : 1, x: active ? -3 : 0, y: active ? -3 : 0, boxShadow: active ? shadow : shadowSm }
				: { opacity: 0, scale: 0.92, x: 0, y: 14, boxShadow: shadowSm }}
			transition={{
				default: spring,
				opacity: { duration: 0.3 },
				boxShadow: { duration: 0.2 },
				scale: pulse ? { duration: 1.3, repeat: Infinity, ease: 'easeInOut' } : spring,
			}}
			style={{
				position: 'absolute', left: box.x, top: box.y, width: box.w, height: box.h,
				background: colors.white, border, display: 'flex', flexDirection: 'column',
				pointerEvents: shown ? 'auto' : 'none',
			}}>
			<div style={{
				padding: '9px 14px', background: color, borderBottom: border, flexShrink: 0,
				fontFamily: fonts.mono, fontSize: 14, fontWeight: 700, letterSpacing: 1,
				display: 'flex', alignItems: 'center', gap: 8,
			}}>{header}</div>
			<div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>{children}</div>
		</motion.div>
	);
}

const HEAD = 14;

// 直线箭头：第一次出现时画出来，active 时有个黄点沿线跑，不 active 时淡下去
function ArrowLine({ spec, shown, active }: { spec: ArrowSpec; shown: boolean; active: boolean }) {
	const dx = spec.x2 - spec.x1;
	const dy = spec.y2 - spec.y1;
	const len = Math.hypot(dx, dy);
	const ux = dx / len;
	const uy = dy / len;
	const ex = spec.x2 - ux * HEAD;
	const ey = spec.y2 - uy * HEAD;
	const deg = (Math.atan2(dy, dx) * 180) / Math.PI;
	const opacity = shown ? (active ? 1 : 0.28) : 0;
	return (
		<g>
			<motion.path
				d={`M ${spec.x1} ${spec.y1} L ${ex} ${ey}`}
				stroke={colors.black} strokeWidth={3} fill="none"
				initial={{ pathLength: 0, opacity: 0 }}
				animate={{ pathLength: shown ? 1 : 0, opacity }}
				transition={{ pathLength: { duration: 0.45, ease: 'easeOut' }, opacity: { duration: 0.3 } }}
			/>
			<motion.polygon
				points={`0,-8 ${HEAD},0 0,8`}
				fill={colors.black}
				transform={`translate(${ex} ${ey}) rotate(${deg})`}
				initial={{ opacity: 0 }}
				animate={{ opacity }}
				transition={{ duration: 0.25, delay: shown && !active ? 0 : 0.35 }}
			/>
			{shown && active && (
				<motion.circle
					r={8} fill={colors.yellow} stroke={colors.black} strokeWidth={3}
					initial={{ cx: spec.x1, cy: spec.y1, opacity: 0 }}
					animate={{ cx: [spec.x1, spec.x2], cy: [spec.y1, spec.y2], opacity: [0, 1, 1, 0] }}
					transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 0.35, ease: 'easeInOut', delay: 0.2 }}
				/>
			)}
		</g>
	);
}

function ArrowLabel({ spec, shown, active }: { spec: ArrowSpec; shown: boolean; active: boolean }) {
	const mx = (spec.x1 + spec.x2) / 2;
	const my = (spec.y1 + spec.y2) / 2;
	const pos: CSSProperties = { left: mx, top: spec.side === 'above' ? my - 24 : my + 24, transform: 'translate(-50%, -50%)' };
	return (
		<div style={{ position: 'absolute', ...pos, pointerEvents: 'none' }}>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: shown ? (active ? 1 : 0.4) : 0, scale: active ? 1 : 0.92 }}
				transition={{ duration: 0.3 }}
				style={{
					padding: '2px 8px', whiteSpace: 'nowrap',
					background: active ? colors.yellow : colors.white, border: `2px solid ${colors.black}`,
					fontFamily: fonts.mono, fontSize: 12, fontWeight: 700, letterSpacing: 1,
				}}>
				{spec.label}
			</motion.div>
		</div>
	);
}

// 右上角的步数 + 前后按钮（点击不冒泡到整页的"下一步"）
function StepControl({ step, onNext, onBack }: { step: number; onNext: () => void; onBack: () => void }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4, delay: 0.2 }}
			onClick={(e) => e.stopPropagation()}
			style={{ position: 'absolute', right: 100, top: 62, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, cursor: 'default' }}>
			<div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 10px', background: colors.black, border }}>
				<StepButton label="←" onClick={onBack} disabled={step === 0} />
				<span style={{ fontFamily: fonts.mono, fontSize: 14, fontWeight: 700, letterSpacing: 2, color: colors.yellow, minWidth: 74, textAlign: 'center' }}>
					{pad(step + 1)} / {pad(SCRIPT.length)}
				</span>
				<StepButton label="→" onClick={onNext} disabled={step === LAST} />
			</div>
			<span style={{ fontFamily: fonts.mono, fontSize: 11, fontWeight: 700, letterSpacing: 1, opacity: 0.55 }}>
				{step === LAST ? '走完了 · → 翻页' : '点击画面 / → 下一步'}
			</span>
		</motion.div>
	);
}

function StepButton({ label, onClick, disabled }: { label: string; onClick: () => void; disabled: boolean }) {
	const [hover, setHover] = useState(false);
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			style={{
				width: 30, height: 30, border: `2px solid ${colors.white}`,
				background: hover && !disabled ? colors.yellow : colors.white, color: colors.black,
				fontFamily: fonts.mono, fontSize: 15, fontWeight: 700, lineHeight: 1,
				cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.3 : 1,
				display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s',
			}}>
			{label}
		</button>
	);
}
