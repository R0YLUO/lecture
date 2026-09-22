import type { CSSProperties, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { colors, fonts, border, shadow } from './ui';

// 流程图基元 —— 画布 1600×900 由引擎整体缩放，所以坐标直接写 px。
// Stage 铺一层 SVG 画箭头，Actor 是绝对定位的角色方块，箭头标签用 HTML 贴在路径中点。

export interface Pt { x: number; y: number }

export interface ArrowSpec {
	points: Pt[];
	label?: ReactNode;
	labelAt?: Pt;
	color?: string;
	dashed?: boolean;
	delay?: number;
}

const HEAD = 16;

function pathD(points: Pt[]): string {
	return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
}

function midpoint(points: Pt[]): Pt {
	const segs = points.slice(1).map((b, i) => ({ a: points[i], b, len: Math.hypot(b.x - points[i].x, b.y - points[i].y) }));
	let remain = segs.reduce((s, g) => s + g.len, 0) / 2;
	for (const g of segs) {
		if (remain <= g.len) {
			const t = g.len === 0 ? 0 : remain / g.len;
			return { x: g.a.x + (g.b.x - g.a.x) * t, y: g.a.y + (g.b.y - g.a.y) * t };
		}
		remain -= g.len;
	}
	return points[points.length - 1];
}

function headAngle(points: Pt[]): number {
	const a = points[points.length - 2];
	const b = points[points.length - 1];
	return (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
}

export function Stage({ width, height, arrows = [], children, style }: {
	width: number;
	height: number;
	arrows?: ArrowSpec[];
	children: ReactNode;
	style?: CSSProperties;
}) {
	return (
		<div style={{ position: 'relative', width, height, flexShrink: 0, ...style }}>
			<svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ position: 'absolute', inset: 0, overflow: 'visible', pointerEvents: 'none' }}>
				{arrows.map((a, i) => {
					const color = a.color ?? colors.black;
					const delay = a.delay ?? 0;
					const end = a.points[a.points.length - 1];
					const draw = a.dashed
						? { initial: { opacity: 0 }, animate: { opacity: 1 } }
						: { initial: { opacity: 0, pathLength: 0 }, animate: { opacity: 1, pathLength: 1 } };
					return (
						<g key={i}>
							<motion.path
								d={pathD(a.points)}
								fill="none"
								stroke={color}
								strokeWidth={4}
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeDasharray={a.dashed ? '10 10' : undefined}
								{...draw}
								transition={{ duration: 0.5, delay, ease: 'easeInOut' }}
							/>
							<g transform={`translate(${end.x} ${end.y}) rotate(${headAngle(a.points)})`}>
								<motion.polygon
									points={`0,0 ${-HEAD},${-HEAD / 2} ${-HEAD},${HEAD / 2}`}
									fill={color}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.2, delay: delay + 0.4 }}
								/>
							</g>
						</g>
					);
				})}
			</svg>
			{children}
			{arrows.map((a, i) => {
				if (!a.label) return null;
				const at = a.labelAt ?? midpoint(a.points);
				return (
					<motion.div
						key={i}
						initial={{ opacity: 0, x: '-50%', y: '-50%', scale: 0.9 }}
						animate={{ opacity: 1, x: '-50%', y: '-50%', scale: 1 }}
						transition={{ duration: 0.3, delay: (a.delay ?? 0) + 0.35 }}
						style={{
							position: 'absolute', left: at.x, top: at.y, padding: '3px 10px',
							background: colors.white, border: `2px solid ${a.color ?? colors.black}`, color: colors.black,
							fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, lineHeight: 1.35,
							whiteSpace: 'nowrap', textAlign: 'center',
						}}>
						{a.label}
					</motion.div>
				);
			})}
		</div>
	);
}

export function Actor({ x, y, w, h, bg = colors.white, delay = 0, children, style }: {
	x: number;
	y: number;
	w: number;
	h: number;
	bg?: string;
	delay?: number;
	children: ReactNode;
	style?: CSSProperties;
}) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 24, scale: 0.96 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			transition={{ duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
			style={{
				position: 'absolute', left: x, top: y, width: w, height: h,
				background: bg, border, boxShadow: shadow,
				display: 'flex', flexDirection: 'column', overflow: 'hidden', ...style,
			}}>
			{children}
		</motion.div>
	);
}

export function ActorHeader({ icon, title, tag, color, textColor = colors.black }: {
	icon?: string;
	title: string;
	tag?: string;
	color: string;
	textColor?: string;
}) {
	return (
		<div style={{
			display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px',
			background: color, color: textColor, borderBottom: border, flexShrink: 0,
		}}>
			{icon && <span style={{ fontSize: 28, lineHeight: 1 }}>{icon}</span>}
			<span style={{ fontFamily: fonts.heading, fontSize: 24, fontWeight: 900, letterSpacing: -0.5, whiteSpace: 'nowrap' }}>{title}</span>
			{tag && (
				<span style={{
					marginLeft: 'auto', fontFamily: fonts.mono, fontSize: 12, fontWeight: 700, letterSpacing: 1,
					background: colors.black, color: colors.white, padding: '3px 10px', whiteSpace: 'nowrap',
				}}>{tag}</span>
			)}
		</div>
	);
}
