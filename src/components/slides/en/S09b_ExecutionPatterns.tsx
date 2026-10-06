import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Slide, Title, colors, fonts, border, shadow, shadowSm } from '../../ui';

/**
 * Two execution patterns · who decides the next step
 *
 * Speaker notes:
 * An agent system can run in two execution patterns; let's look at one example of each.
 * On the left is deterministic: a workflow / graph, again using the end-of-day report. Code fixes the path in advance: check finances, check the task board, have the LLM write the email, you confirm, send.
 * If you say no, it goes back and revises — and that loop-back is drawn in advance too. The LLM only fills in one step; it has no say over the order.
 * Easy to predict and easy to test, but it can't handle situations nobody anticipated.
 * On the right is non-deterministic: an autonomous loop — the agent loop we just walked through step by step — this time for auto-replying to email. Every iteration, the LLM decides the next step itself:
 * whether to read the email first, look things up, check the calendar, how many times, and when to write and send the reply. The path is decided as it goes: flexible, able to handle the unexpected, but possibly different every time.
 * Which leads to the next chapter: if the path isn't fixed, how do we make sure it did the right thing? — Evals.
 */

type Who = 'code' | 'llm' | 'you';
interface Step { icon: string; label: string; who: Who }

const WHO: Record<Who, { label: string; bg: string; fg: string }> = {
	code: { label: 'CODE', bg: colors.black, fg: colors.white },
	llm: { label: 'LLM', bg: colors.blue, fg: colors.black },
	you: { label: 'YOU', bg: colors.yellow, fg: colors.black },
};

const FINANCE: Step = { icon: '📊', label: 'Finance', who: 'code' };
const TASKS: Step = { icon: '📋', label: 'Tasks', who: 'code' };
const DRAFT: Step = { icon: '✉️', label: 'Draft', who: 'llm' };
const CONFIRM: Step = { icon: '🙋', label: 'Confirm', who: 'you' };
const SEND: Step = { icon: '📨', label: 'Send', who: 'code' };

// Main path through the workflow graph; "you say no → go back and revise" is a branch drawn in advance
const GRAPH: Step[] = [FINANCE, TASKS, DRAFT, CONFIRM, SEND];

// Right diagram · tools available to the email auto-reply agent
interface Tool { icon: string; name: string }
const EMAIL_TOOLS: Tool[] = [
	{ icon: '📥', name: 'Read email' },
	{ icon: '🔍', name: 'Look up info' },
	{ icon: '📅', name: 'Check calendar' },
	{ icon: '📤', name: 'Send reply' },
];

// Absolute coordinates on the 1600×900 canvas
const PANEL = { top: 280, w: 660, h: 456, header: 70, diagram: 380 };
const INNER_W = PANEL.w - 6;
const LEFT_X = 100;
const RIGHT_X = 840;

// Left diagram: a row of cards + a loop-back branch above
const CARD = { w: 90, h: 112, y: 160, gap: 40 };
const cardX = (i: number) => Math.round((INNER_W - (GRAPH.length * CARD.w + (GRAPH.length - 1) * CARD.gap)) / 2) + i * (CARD.w + CARD.gap);
const cardCX = (i: number) => cardX(i) + CARD.w / 2;
const CARD_MID_Y = CARD.y + CARD.h / 2;
const BRANCH_Y = 110;
const DRAFT_I = GRAPH.indexOf(DRAFT);
const CONFIRM_I = GRAPH.indexOf(CONFIRM);

// Right diagram: instruction → [ LLM ⇄ tools ] → done
interface Box { x: number; y: number; w: number; h: number }
const LOOP: Record<'instruction' | 'frame' | 'llm' | 'tool' | 'result', Box> = {
	instruction: { x: 6, y: 96, w: 118, h: 74 },
	frame: { x: 160, y: 66, w: 290, h: 280 },
	llm: { x: 188, y: 96, w: 224, h: 74 },
	tool: { x: 188, y: 254, w: 224, h: 70 },
	result: { x: 524, y: 101, w: 124, h: 64 },
};
const LOOP_MID_Y = LOOP.llm.y + LOOP.llm.h / 2;
const LOOP_GAP_MID_Y = (LOOP.llm.y + LOOP.llm.h + LOOP.tool.y) / 2;
const DOWN_X = LOOP.llm.x + 62;
const UP_X = LOOP.llm.x + LOOP.llm.w - 52;

const T = { panelL: 0.15, panelR: 0.3, diagram: 0.5 };

export default function S09b_ExecutionPatterns() {
	return (
		<Slide bg={colors.warmBg}>
			<div style={{ position: 'relative', width: 1600, height: 900 }}>

				{/* Title */}
				<motion.div
					initial={{ opacity: 0, x: -30 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.45 }}
					style={{ position: 'absolute', left: 100, top: 44 }}>
					<div style={{
						display: 'inline-block', padding: '4px 12px', marginBottom: 10,
						background: colors.black, color: colors.yellow, fontFamily: fonts.mono, fontSize: 13,
						fontWeight: 700, letterSpacing: 2,
					}}>
						03 · EXECUTION PATTERNS
					</div>
					<Title size="40px">Two execution patterns: who decides the next step?</Title>
				</motion.div>

				{/* Left: deterministic · workflow / graph */}
				<Panel x={LEFT_X} delay={T.panelL} color={colors.green} fg={colors.black}
					name="Deterministic" sub="Workflow · Graph">
					<Diagram caption="Code fixes the path up front; the LLM fills in one step" color={colors.green}>
						<svg width={INNER_W} height={PANEL.diagram} viewBox={`0 0 ${INNER_W} ${PANEL.diagram}`} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'visible' }}>
							{GRAPH.slice(1).map((_, i) => (
								<Arrow key={i} delay={T.diagram + 0.1 + i * 0.1}
									points={[[cardX(i) + CARD.w, CARD_MID_Y], [cardX(i + 1), CARD_MID_Y]]} />
							))}
							<Arrow delay={T.diagram + 0.65}
								points={[[cardCX(CONFIRM_I), CARD.y], [cardCX(CONFIRM_I), BRANCH_Y], [cardCX(DRAFT_I), BRANCH_Y], [cardCX(DRAFT_I), CARD.y]]} />
						</svg>

						{GRAPH.map((s, i) => (
							<motion.div
								key={s.label}
								initial={{ opacity: 0, y: 14, scale: 0.92 }}
								animate={{ opacity: 1, y: 0, scale: 1 }}
								transition={{ type: 'spring', stiffness: 260, damping: 22, delay: T.diagram + i * 0.1 }}
								style={{ position: 'absolute', left: cardX(i), top: CARD.y, width: CARD.w, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
								<div style={{
									width: CARD.w, height: CARD.h, boxSizing: 'border-box', border, boxShadow: shadowSm,
									background: s.who === 'llm' ? colors.blue : colors.white,
									display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
								}}>
									<span style={{ fontSize: 34, lineHeight: 1 }}>{s.icon}</span>
									<span style={{ fontSize: 16, fontWeight: 700, whiteSpace: 'nowrap' }}>{s.label}</span>
								</div>
								<WhoTag who={s.who} />
							</motion.div>
						))}

						<Label x={(cardCX(DRAFT_I) + cardCX(CONFIRM_I)) / 2} y={BRANCH_Y} delay={T.diagram + 0.9}>✗ No, revise</Label>
						<Label x={(cardX(CONFIRM_I) + CARD.w + cardX(CONFIRM_I + 1)) / 2} y={CARD_MID_Y - 22} delay={T.diagram + 0.9}>✓</Label>
					</Diagram>
				</Panel>

				{/* VS */}
				<motion.div
					initial={{ opacity: 0, scale: 0.4, rotate: -20 }}
					animate={{ opacity: 1, scale: 1, rotate: -6 }}
					transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.45 }}
					style={{
						position: 'absolute', left: 800 - 26, top: PANEL.top + PANEL.h / 2 - 26, width: 52, height: 52,
						background: colors.black, color: colors.yellow, border, boxShadow: shadowSm,
						display: 'flex', alignItems: 'center', justifyContent: 'center',
						fontFamily: fonts.mono, fontSize: 16, fontWeight: 700, letterSpacing: 1,
					}}>
					VS
				</motion.div>

				{/* Right: non-deterministic · autonomous loop */}
				<Panel x={RIGHT_X} delay={T.panelR} color={colors.purple} fg={colors.white}
					name="Non-deterministic" sub="Autonomous loop · Agent Loop">
					<Diagram caption="The LLM picks each next step; the path forms as it goes" color={colors.purple}>
						{/* Loop area */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.4, delay: T.diagram + 0.1 }}
							style={{ position: 'absolute', left: LOOP.frame.x, top: LOOP.frame.y, width: LOOP.frame.w, height: LOOP.frame.h, boxSizing: 'border-box', background: colors.warmBg, border }}
						/>
						<motion.div
							initial={{ opacity: 0, y: -6 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.35, delay: T.diagram + 0.2 }}
							style={{
								position: 'absolute', left: LOOP.frame.x + 14, top: LOOP.frame.y - 13,
								padding: '3px 10px', background: colors.yellow, border: `2px solid ${colors.black}`,
								fontFamily: fonts.mono, fontSize: 12, fontWeight: 700, letterSpacing: 1, whiteSpace: 'nowrap',
							}}>
							↻ AGENT LOOP
						</motion.div>

						<svg width={INNER_W} height={PANEL.diagram} viewBox={`0 0 ${INNER_W} ${PANEL.diagram}`} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'visible' }}>
							<Arrow delay={T.diagram + 0.15} points={[[LOOP.instruction.x + LOOP.instruction.w, LOOP_MID_Y], [LOOP.llm.x, LOOP_MID_Y]]} />
							<Arrow delay={T.diagram + 0.45} points={[[DOWN_X, LOOP.llm.y + LOOP.llm.h], [DOWN_X, LOOP.tool.y]]} />
							<Arrow delay={T.diagram + 0.65} points={[[UP_X, LOOP.tool.y], [UP_X, LOOP.llm.y + LOOP.llm.h]]} />
							<Arrow delay={T.diagram + 0.85} points={[[LOOP.llm.x + LOOP.llm.w, LOOP_MID_Y], [LOOP.result.x, LOOP_MID_Y]]} />
						</svg>

						<Node box={LOOP.instruction} bg={colors.purple} fg={colors.white} delay={T.diagram}>
							<span style={{ fontSize: 30, lineHeight: 1 }}>📧</span>
							<span style={{ fontSize: 15, fontWeight: 700, whiteSpace: 'nowrap' }}>Auto-reply</span>
						</Node>

						<Node box={LOOP.llm} bg={colors.blue} fg={colors.black} delay={T.diagram + 0.3} row>
							<span style={{ fontSize: 36, lineHeight: 1 }}>🧠</span>
							<div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
								<span style={{ fontSize: 19, fontWeight: 800, whiteSpace: 'nowrap' }}>LLM decides</span>
								<span style={{ fontFamily: fonts.mono, fontSize: 11, fontWeight: 700, letterSpacing: 0.5, opacity: 0.75, whiteSpace: 'nowrap' }}>Which tool? Or done?</span>
							</div>
						</Node>

						<Node box={LOOP.tool} bg={colors.white} fg={colors.black} delay={T.diagram + 0.55} row>
							<span style={{ fontSize: 32, lineHeight: 1 }}>🦾</span>
							<div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
								<span style={{ fontSize: 18, fontWeight: 800, whiteSpace: 'nowrap' }}>Run the tool</span>
								<span style={{ fontSize: 16, letterSpacing: 4, lineHeight: 1 }}>{EMAIL_TOOLS.map((t) => t.icon).join('')}</span>
							</div>
						</Node>

						<Node box={LOOP.result} bg={colors.green} fg={colors.black} delay={T.diagram + 1.05}>
							<span style={{ fontSize: 18, fontWeight: 800, whiteSpace: 'nowrap' }}>✓ Done</span>
							<span style={{ fontFamily: fonts.mono, fontSize: 11, fontWeight: 700, letterSpacing: 1, opacity: 0.8, whiteSpace: 'nowrap' }}>Reply sent</span>
						</Node>

						<Label x={DOWN_X} y={LOOP_GAP_MID_Y} delay={T.diagram + 0.7}>call tool</Label>
						<Label x={UP_X} y={LOOP_GAP_MID_Y} delay={T.diagram + 0.9}>log result</Label>
						<Label x={(LOOP.llm.x + LOOP.llm.w + LOOP.result.x) / 2} y={LOOP_MID_Y + 26} delay={T.diagram + 1.1}>no tool</Label>
					</Diagram>
				</Panel>
			</div>
		</Slide>
	);
}

// One side's panel: coloured header + diagram
function Panel({ x, delay, color, fg, name, sub, children }: {
	x: number; delay: number; color: string; fg: string; name: string; sub: string; children: ReactNode;
}) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 24 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
			style={{
				position: 'absolute', left: x, top: PANEL.top, width: PANEL.w, height: PANEL.h, boxSizing: 'border-box',
				background: colors.white, border, boxShadow: shadow, display: 'flex', flexDirection: 'column',
			}}>
			<div style={{
				height: PANEL.header, flexShrink: 0, boxSizing: 'border-box', padding: '0 20px',
				background: color, color: fg, borderBottom: border,
				display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 3,
			}}>
				<span style={{ fontFamily: fonts.heading, fontSize: 28, fontWeight: 900, letterSpacing: -0.5, lineHeight: 1.1 }}>{name}</span>
				<span style={{ fontFamily: fonts.mono, fontSize: 12, fontWeight: 700, letterSpacing: 1, opacity: 0.85 }}>{sub}</span>
			</div>
			{children}
		</motion.div>
	);
}

function Diagram({ caption, color, children }: { caption: string; color: string; children: ReactNode }) {
	return (
		<div style={{ position: 'relative', height: PANEL.diagram, flexShrink: 0 }}>
			<motion.div
				initial={{ opacity: 0, x: -10 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.4, delay: T.diagram - 0.1 }}
				style={{ position: 'absolute', left: 20, top: 18, display: 'flex', alignItems: 'center', gap: 10, fontSize: 17, fontWeight: 700, whiteSpace: 'nowrap' }}>
				<span style={{ width: 12, height: 12, background: color, border: `2px solid ${colors.black}`, flexShrink: 0 }} />
				{caption}
			</motion.div>
			{children}
		</div>
	);
}

function WhoTag({ who }: { who: Who }) {
	const w = WHO[who];
	return (
		<span style={{
			padding: '2px 10px', background: w.bg, color: w.fg, border: `2px solid ${colors.black}`,
			fontFamily: fonts.mono, fontSize: 12, fontWeight: 700, letterSpacing: 1, whiteSpace: 'nowrap',
		}}>{w.label}</span>
	);
}

// A box in the right diagram: content stacked vertically (default) or in a row
function Node({ box, bg, fg, delay, row, children }: { box: Box; bg: string; fg: string; delay: number; row?: boolean; children: ReactNode }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 12, scale: 0.94 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			transition={{ type: 'spring', stiffness: 260, damping: 22, delay }}
			style={{
				position: 'absolute', left: box.x, top: box.y, width: box.w, height: box.h, boxSizing: 'border-box',
				background: bg, color: fg, border, boxShadow: shadowSm,
				display: 'flex', flexDirection: row ? 'row' : 'column', alignItems: 'center', justifyContent: 'center',
				gap: row ? 14 : 4, padding: '0 14px',
			}}>
			{children}
		</motion.div>
	);
}

const HEAD = 10;

// Polyline arrow: drawn along the path; the last segment's direction sets the arrowhead
function Arrow({ points, delay }: { points: [number, number][]; delay: number }) {
	const n = points.length;
	const [px, py] = points[n - 2];
	const [ex, ey] = points[n - 1];
	const dx = ex - px;
	const dy = ey - py;
	const len = Math.hypot(dx, dy);
	const bx = ex - (dx / len) * HEAD;
	const by = ey - (dy / len) * HEAD;
	const deg = (Math.atan2(dy, dx) * 180) / Math.PI;
	const d = [`M ${points[0][0]} ${points[0][1]}`, ...points.slice(1, n - 1).map(([x, y]) => `L ${x} ${y}`), `L ${bx} ${by}`].join(' ');
	return (
		<g>
			<motion.path
				d={d} stroke={colors.black} strokeWidth={3} fill="none" strokeLinejoin="round"
				initial={{ pathLength: 0, opacity: 0 }}
				animate={{ pathLength: 1, opacity: 1 }}
				transition={{ pathLength: { duration: 0.4, ease: 'easeOut', delay }, opacity: { duration: 0.2, delay } }}
			/>
			<motion.polygon
				points={`0,-7 ${HEAD},0 0,7`}
				fill={colors.black}
				transform={`translate(${bx} ${by}) rotate(${deg})`}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.2, delay: delay + 0.35 }}
			/>
		</g>
	);
}

function Label({ x, y, delay, children }: { x: number; y: number; delay: number; children: ReactNode }) {
	return (
		<div style={{ position: 'absolute', left: x, top: y, transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.3, delay }}
				style={{
					padding: '2px 8px', whiteSpace: 'nowrap', background: colors.white, border: `2px solid ${colors.black}`,
					fontFamily: fonts.mono, fontSize: 12, fontWeight: 700, letterSpacing: 1,
				}}>
				{children}
			</motion.div>
		</div>
	);
}
