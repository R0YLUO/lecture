import type { CSSProperties, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Slide, Inner, Title, colors, fonts, border, shadowSm } from '../components/ui';

// CareKind deck kit: white canvas, red as the single accent, one box style and one arrow style
// shared by every diagram (pipeline, layers, adapter tree, sequence diagrams, state strip).

export const accent = colors.red;
const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export const SECTIONS = [
	'Opening',
	'Feature & requirements',
	'Technical design',
	'Test strategy',
	'Coding agent fundamentals',
	'Wrap-up',
] as const;

export function Frame({ section, title, children, gap = 28 }: { section: number; title: ReactNode; children: ReactNode; gap?: number }) {
	return (
		<Slide bg={colors.white}>
			<Inner style={{ flexDirection: 'column', justifyContent: 'center', gap }}>
				<motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
					<div style={{
						display: 'inline-block', padding: '5px 14px', marginBottom: 14,
						background: colors.black, color: colors.white, fontFamily: fonts.mono, fontSize: 14, fontWeight: 700, letterSpacing: 2,
					}}>
						<span style={{ color: accent }}>{String(section).padStart(2, '0')}</span> · {SECTIONS[section].toUpperCase()}
					</div>
					<Title size="52px">{title}</Title>
				</motion.div>
				{children}
			</Inner>
		</Slide>
	);
}

export function Mark({ children }: { children: ReactNode }) {
	return <span style={{ background: accent, color: colors.white, padding: '0 12px' }}>{children}</span>;
}

export function Appear({ delay = 0, children, style }: { delay?: number; children: ReactNode; style?: CSSProperties }) {
	return (
		<motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay, ease }} style={style}>
			{children}
		</motion.div>
	);
}

export function Bullets({ items, delay = 0.25, size = 26, style }: { items: ReactNode[]; delay?: number; size?: number; style?: CSSProperties }) {
	return (
		<ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: size * 0.6, ...style }}>
			{items.map((item, i) => (
				<motion.li
					key={i}
					initial={{ opacity: 0, x: -16 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.35, delay: delay + i * 0.08 }}
					style={{ display: 'flex', gap: 14, fontSize: size, fontWeight: 500, lineHeight: 1.35, color: colors.black }}
				>
					<span style={{ color: accent, fontWeight: 800, flexShrink: 0 }}>→</span>
					<span>{item}</span>
				</motion.li>
			))}
		</ul>
	);
}

export function Code({ children }: { children: ReactNode }) {
	return (
		<code style={{ fontFamily: fonts.mono, fontSize: '0.85em', background: colors.warmBg, border: `2px solid ${colors.black}`, padding: '0 8px' }}>
			{children}
		</code>
	);
}

type Tone = 'plain' | 'accent' | 'muted' | 'dark';

const TONES: Record<Tone, CSSProperties> = {
	plain: { background: colors.white, color: colors.black },
	accent: { background: accent, color: colors.white },
	muted: { background: colors.white, color: colors.black, opacity: 0.4, borderStyle: 'dashed', boxShadow: 'none' },
	dark: { background: colors.dark, color: colors.white },
};

// The one box shape used by every diagram.
export function Node({ label, sub, tone = 'plain', mono, size = 22, style, children }: {
	label?: ReactNode; sub?: ReactNode; tone?: Tone; mono?: boolean; size?: number; style?: CSSProperties; children?: ReactNode;
}) {
	return (
		<div style={{
			border, boxShadow: shadowSm, padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 6,
			justifyContent: 'center', ...TONES[tone], ...style,
		}}>
			{label && <span style={{ fontFamily: mono ? fonts.mono : fonts.heading, fontSize: size, fontWeight: mono ? 700 : 800, lineHeight: 1.2 }}>{label}</span>}
			{sub && <span style={{ fontSize: size * 0.72, fontWeight: 500, lineHeight: 1.35, opacity: 0.85 }}>{sub}</span>}
			{children}
		</div>
	);
}

// Small uppercase label chip (box headers, rule labels).
export function Chip({ children, tone = 'dark' }: { children: ReactNode; tone?: 'dark' | 'accent' | 'outline' }) {
	const s: CSSProperties = tone === 'dark'
		? { background: colors.black, color: colors.white }
		: tone === 'accent' ? { background: accent, color: colors.white } : { background: colors.white, color: colors.black, border: `2px solid ${colors.black}` };
	return (
		<span style={{ display: 'inline-block', alignSelf: 'flex-start', padding: '3px 10px', fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, letterSpacing: 1.5, ...s }}>
			{children}
		</span>
	);
}

// The one arrow style: a black shaft ending in a triangle head. Horizontal or vertical.
// `reverse` points it left/up, `dashed` marks a reply, `crossed` marks a path that must never be taken.
export function Arrow({ label, vertical, length = 60, dashed, reverse, crossed, style }: {
	label?: ReactNode; vertical?: boolean; length?: number; dashed?: boolean; reverse?: boolean; crossed?: boolean; style?: CSSProperties;
}) {
	const line = `3px ${dashed || crossed ? 'dashed' : 'solid'} ${colors.black}`;
	const shaft: CSSProperties = vertical ? { width: 0, height: length, borderLeft: line } : { height: 0, width: length, borderTop: line };
	const t = '8px solid transparent', h = `12px solid ${colors.black}`;
	const head: CSSProperties = vertical
		? { width: 0, height: 0, borderLeft: t, borderRight: t, ...(reverse ? { borderBottom: h } : { borderTop: h }) }
		: { width: 0, height: 0, borderTop: t, borderBottom: t, ...(reverse ? { borderRight: h } : { borderLeft: h }) };
	const labelEl = label && <span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, textAlign: 'center', maxWidth: vertical ? undefined : length + 40 }}>{label}</span>;
	return (
		<div style={{ display: 'flex', flexDirection: vertical ? 'row' : 'column', alignItems: 'center', justifyContent: 'center', gap: 6, flexShrink: 0, ...style }}>
			{!vertical && labelEl}
			<div style={{ position: 'relative', display: 'flex', flexDirection: vertical ? (reverse ? 'column-reverse' : 'column') : (reverse ? 'row-reverse' : 'row'), alignItems: 'center' }}>
				<div style={{ ...shaft, opacity: crossed ? 0.55 : 1 }} />
				<div style={{ ...head, opacity: crossed ? 0.55 : 1 }} />
				{crossed && (
					<span style={{
						position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: 30, height: 30,
						display: 'flex', alignItems: 'center', justifyContent: 'center',
						background: accent, color: colors.white, border: `2px solid ${colors.black}`, borderRadius: '50%', fontWeight: 900, fontSize: 18,
					}}>✕</span>
				)}
			</div>
			{vertical && labelEl}
		</div>
	);
}

// Numbered marker that ties a diagram element to a caption.
export function Num({ n, style }: { n: number | string; style?: CSSProperties }) {
	return (
		<span style={{
			display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, flexShrink: 0, borderRadius: '50%',
			background: accent, color: colors.white, border: `2px solid ${colors.black}`, fontFamily: fonts.mono, fontSize: 15, fontWeight: 700, ...style,
		}}>{n}</span>
	);
}

// Small inline tag used for field names, states and list items inside boxes.
export function Pill({ children, dashed, tone = 'plain', size = 17, mono = true }: {
	children: ReactNode; dashed?: boolean; tone?: 'plain' | 'accent' | 'dark' | 'muted'; size?: number; mono?: boolean;
}) {
	const t: CSSProperties = tone === 'accent' ? { background: accent, color: colors.white }
		: tone === 'dark' ? { background: colors.black, color: colors.white }
		: tone === 'muted' ? { background: colors.white, color: colors.black, opacity: 0.45 }
		: { background: colors.white, color: colors.black };
	return (
		<span style={{
			display: 'inline-block', border: `2px ${dashed ? 'dashed' : 'solid'} ${colors.black}`, padding: '2px 10px',
			fontFamily: mono ? fonts.mono : fonts.body, fontSize: size, fontWeight: 700, whiteSpace: 'nowrap', ...t,
		}}>{children}</span>
	);
}

// Highlighted callout box.
export function Callout({ children, style }: { children: ReactNode; style?: CSSProperties }) {
	return (
		<div style={{ border, boxShadow: shadowSm, background: colors.warmBg, borderLeft: `12px solid ${accent}`, padding: '16px 22px', fontSize: 22, fontWeight: 600, lineHeight: 1.4, ...style }}>
			{children}
		</div>
	);
}

// ── Sequence diagram ─────────────────────────────────────────────

export type Participant = { id: string; label: string; sub?: string; actor?: boolean };
export type Message = { from: string; to: string; text: string; reply?: boolean; highlight?: boolean };

export function SequenceDiagram({ participants, messages, width = 1320, row = 44, headerH = 74, delay = 0.2, fontSize = 16 }: {
	participants: Participant[]; messages: Message[]; width?: number; row?: number; headerH?: number; delay?: number; fontSize?: number;
}) {
	const n = participants.length;
	const col = width / n;
	const x = (id: string) => (participants.findIndex((p) => p.id === id) + 0.5) * col;
	const height = headerH + 20 + messages.length * row + 10;
	const boxW = Math.min(col - 30, 260);

	return (
		<div style={{ position: 'relative', width, height, alignSelf: 'center', flexShrink: 0 }}>
			{participants.map((p, i) => (
				<div key={p.id}>
					<div style={{ position: 'absolute', left: (i + 0.5) * col - 1.5, top: headerH, bottom: 0, borderLeft: `3px dashed ${colors.black}`, opacity: 0.3 }} />
					<motion.div
						initial={{ opacity: 0, y: -12 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.35, delay: delay + i * 0.06 }}
						style={{
							position: 'absolute', left: (i + 0.5) * col - boxW / 2, top: 0, width: boxW, height: headerH,
							border, boxShadow: shadowSm, background: p.actor ? accent : colors.white, color: p.actor ? colors.white : colors.black,
							display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
						}}>
						<span style={{ fontFamily: fonts.heading, fontSize: 21, fontWeight: 800, lineHeight: 1.1 }}>{p.actor ? '👤 ' : ''}{p.label}</span>
						{p.sub && <span style={{ fontFamily: fonts.mono, fontSize: 12, fontWeight: 700, opacity: 0.75 }}>({p.sub})</span>}
					</motion.div>
				</div>
			))}

			{messages.map((m, i) => {
				const top = headerH + 20 + i * row;
				const d = delay + 0.3 + i * 0.07;
				const lineStyle = `3px ${m.reply ? 'dashed' : 'solid'} ${m.highlight ? accent : colors.black}`;
				if (m.from === m.to) {
					const x0 = x(m.from);
					return (
						<motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: d }}
							style={{ position: 'absolute', left: x0, top: top + 4, height: row - 12, display: 'flex', alignItems: 'center' }}>
							<div style={{ width: 30, height: '100%', border: lineStyle, borderLeft: 'none' }} />
							<span style={{ marginLeft: 10, fontSize, fontWeight: m.highlight ? 800 : 600, whiteSpace: 'nowrap', padding: '0 6px', ...(m.highlight ? { background: accent, color: colors.white } : { background: colors.white }) }}>{m.text}</span>
						</motion.div>
					);
				}
				const xa = x(m.from), xb = x(m.to);
				const left = Math.min(xa, xb), w = Math.abs(xb - xa);
				const toRight = xb > xa;
				return (
					<motion.div key={i}
						initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: 0.35, delay: d }}
						style={{ position: 'absolute', left, top, width: w, height: row, transformOrigin: toRight ? 'left' : 'right' }}>
						<span style={{ position: 'absolute', left: 0, right: 0, bottom: row / 2 - 1, textAlign: 'center', fontSize, fontWeight: 600, whiteSpace: 'nowrap', lineHeight: 1.2 }}>
							<span style={{ padding: '0 6px', ...(m.highlight ? { background: accent, color: colors.white, fontWeight: 800 } : { background: colors.white }) }}>{m.text}</span>
						</span>
						<div style={{ position: 'absolute', left: 0, right: 0, top: row / 2 + 6, borderTop: lineStyle }} />
						<div style={{
							position: 'absolute', top: row / 2 + 6 - 7, [toRight ? 'right' : 'left']: -2, width: 0, height: 0,
							borderTop: '8px solid transparent', borderBottom: '8px solid transparent',
							[toRight ? 'borderLeft' : 'borderRight']: `12px solid ${colors.black}`,
						}} />
					</motion.div>
				);
			})}
		</div>
	);
}

// Horizontal chain of steps with the shared arrow between them.
export function Chain({ steps, delay = 0.3, arrow = 36, size = 20, highlight = [] as number[], style }: {
	steps: ReactNode[]; delay?: number; arrow?: number; size?: number; highlight?: number[]; style?: CSSProperties;
}) {
	return (
		<div style={{ display: 'flex', alignItems: 'center', gap: 10, ...style }}>
			{steps.map((s, i) => (
				<motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: delay + i * 0.08 }}
					style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
					<div style={{
						border: `3px solid ${colors.black}`, padding: '8px 14px', fontFamily: fonts.mono, fontSize: size, fontWeight: 700,
						background: highlight.includes(i) ? accent : colors.white, color: highlight.includes(i) ? colors.white : colors.black, whiteSpace: 'nowrap',
					}}>{s}</div>
					{i < steps.length - 1 && <Arrow length={arrow} />}
				</motion.div>
			))}
		</div>
	);
}
