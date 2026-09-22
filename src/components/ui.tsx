import { useState, useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { colors, fonts, border, shadow, shadowSm } from '../styles/theme';

// 拿 Vite BASE_URL 拼出 public/ 下的资源路径（dev → /xxx，prod → /curriculum/ai-new-jobs-talk/xxx）
export function assetPath(p: string): string {
	const base = (import.meta as unknown as { env: { BASE_URL: string } }).env.BASE_URL.replace(/\/$/, '');
	return `${base}/${p.replace(/^\//, '')}`;
}

// 数字 count-up 动画 —— 用 requestAnimationFrame 平滑过渡，eased
export function CountUp({
	value,
	duration = 1.2,
	suffix = '',
	style,
}: {
	value: number;
	duration?: number;
	suffix?: string;
	style?: CSSProperties;
}) {
	const [n, setN] = useState(0);
	const rafRef = useRef<number | null>(null);

	useEffect(() => {
		const start = performance.now();
		const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
		const step = (now: number) => {
			const t = Math.min((now - start) / (duration * 1000), 1);
			setN(Math.round(value * easeOutCubic(t)));
			if (t < 1) rafRef.current = requestAnimationFrame(step);
		};
		rafRef.current = requestAnimationFrame(step);
		return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
	}, [value, duration]);

	return <span style={style}>{n}{suffix}</span>;
}

// Spring 弹入容器 —— 配合 motion variants 给数字、巨字弹入用
export const springIn = {
	initial: { opacity: 0, scale: 0.4, y: 30 },
	animate: { opacity: 1, scale: 1, y: 0 },
	transition: { type: 'spring' as const, stiffness: 200, damping: 14, mass: 0.8 },
};

// 横向滑入（左 / 右）
export const slideFromLeft = {
	initial: { opacity: 0, x: -60 },
	animate: { opacity: 1, x: 0 },
	transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};

export const slideFromRight = {
	initial: { opacity: 0, x: 60 },
	animate: { opacity: 1, x: 0 },
	transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};

// Bar 横向增长（用在 S11 薪资图）
export function GrowBar({
	delay = 0,
	width,
	left,
	color: barColor,
	style,
}: { delay?: number; width: string; left: string; color: string; style?: CSSProperties }) {
	return (
		<motion.div
			initial={{ scaleX: 0 }}
			animate={{ scaleX: 1 }}
			transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay }}
			style={{
				position: 'absolute', left, width, height: '100%', transformOrigin: 'left',
				background: barColor, border: '1px solid #000', ...style,
			}}
		/>
	);
}

export function Slide({ bg = colors.warmBg, children, style }: { bg?: string; children: ReactNode; style?: CSSProperties }) {
	return (
		<div style={{ width: '100%', height: '100%', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', ...style }}>
			{children}
		</div>
	);
}

export function Inner({ children, center, split, style }: { children: ReactNode; center?: boolean; split?: boolean; style?: CSSProperties }) {
	return (
		<div style={{
			width: '90%', maxWidth: 1400, height: '85%', display: 'flex', gap: 48, padding: 40,
			...(center ? { flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' } : {}),
			...(split ? { alignItems: 'center' } : {}),
			...style,
		}}>
			{children}
		</div>
	);
}

export function Half({ children, style }: { children: ReactNode; style?: CSSProperties }) {
	return <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', ...style }}>{children}</div>;
}

export function Title({ children, white, size = '64px', style }: { children: ReactNode; white?: boolean; size?: string; style?: CSSProperties }) {
	return <h2 style={{ fontFamily: fonts.heading, fontSize: size, fontWeight: 900, lineHeight: 1.15, color: white ? colors.white : colors.black, letterSpacing: -1, ...style }}>{children}</h2>;
}

export function Subtitle({ children, style }: { children: ReactNode; style?: CSSProperties }) {
	return <p style={{ fontSize: '22px', color: '#555', fontWeight: 500, ...style }}>{children}</p>;
}

export function Highlight({ children, color: bg = colors.red }: { children: ReactNode; color?: string }) {
	const textColor = bg === colors.yellow || bg === colors.green ? colors.black : colors.white;
	return <span style={{ display: 'inline-block', padding: '4px 16px', background: bg, color: textColor }}>{children}</span>;
}

export function Tag({ children, bg = colors.dark, color: c = colors.white }: { children: ReactNode; bg?: string; color?: string }) {
	return (
		<span style={{
			display: 'inline-block', padding: '6px 16px', fontSize: 14, fontWeight: 700,
			fontFamily: fonts.mono, border: `2px solid ${bg}`, background: bg, color: c,
		}}>
			{children}
		</span>
	);
}

export function Divider({ color: c = colors.red, center }: { color?: string; center?: boolean }) {
	return <div style={{ width: 60, height: 4, background: c, margin: '16px 0', ...(center ? { marginLeft: 'auto', marginRight: 'auto' } : {}) }} />;
}

export function Card({ children, bg = colors.white, style }: { children: ReactNode; bg?: string; style?: CSSProperties }) {
	const [hover, setHover] = useState(false);
	return (
		<motion.div
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			animate={{ x: hover ? 4 : 0, y: hover ? 4 : 0, boxShadow: hover ? '0 0 0 #000' : shadow }}
			transition={{ duration: 0.15 }}
			style={{ border, background: bg, padding: '24px 20px', cursor: 'default', ...style }}
		>
			{children}
		</motion.div>
	);
}

export function CardSm({ children, bg = colors.white, style }: { children: ReactNode; bg?: string; style?: CSSProperties }) {
	const [hover, setHover] = useState(false);
	return (
		<motion.div
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			animate={{ x: hover ? 3 : 0, y: hover ? 3 : 0, boxShadow: hover ? '0 0 0 #000' : shadowSm }}
			transition={{ duration: 0.15 }}
			style={{ border, background: bg, padding: '16px 14px', cursor: 'default', ...style }}
		>
			{children}
		</motion.div>
	);
}

export function Stagger({ children, style }: { children: ReactNode; style?: CSSProperties }) {
	return (
		<motion.div
			initial="hidden"
			animate="visible"
			variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
			style={style}
		>
			{children}
		</motion.div>
	);
}

export function StaggerItem({ children, style }: { children: ReactNode; style?: CSSProperties }) {
	return (
		<motion.div
			variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
			transition={{ duration: 0.4, ease: 'easeOut' }}
			style={style}
		>
			{children}
		</motion.div>
	);
}

export function BulletList({ items, white }: { items: (string | ReactNode)[]; white?: boolean }) {
	return (
		<ul style={{ listStyle: 'none', fontSize: '19px', lineHeight: 2, color: white ? colors.white : colors.black }}>
			{items.map((item, i) => (
				<li key={i}><span style={{ color: white ? colors.yellow : colors.red, fontWeight: 700 }}>→ </span>{item}</li>
			))}
		</ul>
	);
}

export function Grid({ children, cols = 3, gap = 20, style }: { children: ReactNode; cols?: number; gap?: number; style?: CSSProperties }) {
	return (
		<div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap, ...style }}>
			{children}
		</div>
	);
}

export { colors, fonts, border, shadow, shadowSm };
