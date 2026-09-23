import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { colors, fonts, border, shadow, shadowSm } from './ui';

// messages 记录的逐条回放 —— → 追加一条、← 撤回一条，把 agent 循环里 context 的增长演出来。
// 打开期间拦截方向键 / 空格 / 滚轮，翻页交给弹窗，不会误翻 slide。
// 挂到 document.body 上、盖在翻页箭头之上；内部仍按 1600×900 画布等比缩放，跟 slide 对齐。

const CANVAS_W = 1600;
const CANVAS_H = 900;

function useCanvasScale() {
	const compute = () => Math.min(window.innerWidth / CANVAS_W, window.innerHeight / CANVAS_H);
	const [scale, setScale] = useState(compute);
	useEffect(() => {
		const update = () => setScale(compute());
		window.addEventListener('resize', update);
		window.addEventListener('orientationchange', update);
		return () => {
			window.removeEventListener('resize', update);
			window.removeEventListener('orientationchange', update);
		};
	}, []);
	return scale;
}

export type MessageRole = 'system' | 'llm' | 'tool';

export interface TraceMessage {
	role: MessageRole;
	/** 这一条在循环里干什么，如 instructions / asks for a tool / run_tool */
	note: string;
	content: string;
}

const ROLE: Record<MessageRole, { label: string; color: string }> = {
	system: { label: 'system', color: colors.purple },
	llm: { label: 'LLM response', color: colors.blue },
	tool: { label: 'tool result', color: colors.green },
};

const pad = (n: number) => String(n).padStart(2, '0');

export function MessagesModal({ messages, onClose }: { messages: TraceMessage[]; onClose: () => void }) {
	const total = messages.length;
	const [count, setCount] = useState(1);
	const bodyRef = useRef<HTMLDivElement>(null);
	const scale = useCanvasScale();

	const forward = useCallback(() => setCount((c) => Math.min(c + 1, total)), [total]);
	const back = useCallback(() => setCount((c) => Math.max(c - 1, 1)), []);

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); e.stopImmediatePropagation(); forward(); }
			else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); e.stopImmediatePropagation(); back(); }
			else if (e.key === 'Escape') { e.preventDefault(); e.stopImmediatePropagation(); onClose(); }
		};
		const onWheel = (e: WheelEvent) => { e.stopImmediatePropagation(); };
		window.addEventListener('keydown', onKey, true);
		window.addEventListener('wheel', onWheel, true);
		return () => {
			window.removeEventListener('keydown', onKey, true);
			window.removeEventListener('wheel', onWheel, true);
		};
	}, [forward, back, onClose]);

	useEffect(() => {
		bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' });
	}, [count]);

	return createPortal(
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.2 }}
			onClick={onClose}
			style={{
				position: 'fixed', inset: 0, zIndex: 2000,
				background: 'rgba(16, 22, 47, 0.72)',
				display: 'flex', alignItems: 'center', justifyContent: 'center',
			}}>
			<div style={{
				width: CANVAS_W, height: CANVAS_H, flexShrink: 0,
				transform: `scale(${scale})`, transformOrigin: 'center center',
				display: 'flex', alignItems: 'center', justifyContent: 'center',
			}}>
			<motion.div
				initial={{ opacity: 0, scale: 0.92, y: 24 }}
				animate={{ opacity: 1, scale: 1, y: 0 }}
				exit={{ opacity: 0, scale: 0.95, y: 12 }}
				transition={{ type: 'spring', stiffness: 260, damping: 22 }}
				onClick={(e) => e.stopPropagation()}
				style={{
					width: 1400, maxHeight: 860,
					display: 'flex', flexDirection: 'column',
					background: colors.warmBg, border, boxShadow: shadow,
				}}>
				<div style={{
					display: 'flex', alignItems: 'center', gap: 14, padding: '10px 18px',
					background: colors.black, borderBottom: border, flexShrink: 0,
				}}>
					<span style={{ display: 'inline-flex', gap: 6 }}>
						{[colors.red, colors.yellow, colors.green].map((c) => (
							<span key={c} style={{ width: 12, height: 12, background: c, border: `2px solid ${colors.white}` }} />
						))}
					</span>
					<span style={{ fontFamily: fonts.mono, fontSize: 14, fontWeight: 700, letterSpacing: 2, color: colors.yellow }}>messages</span>
					<span style={{ fontFamily: fonts.mono, fontSize: 14, fontWeight: 700, letterSpacing: 2, color: colors.white, opacity: 0.6 }}>
						{pad(count)} / {pad(total)}
					</span>
					<span style={{ marginLeft: 'auto', fontFamily: fonts.mono, fontSize: 12, letterSpacing: 1, color: colors.white, opacity: 0.55 }}>
						← back · → next · Esc close
					</span>
					<button
						onClick={onClose}
						style={{
							width: 28, height: 28, border: `2px solid ${colors.white}`, background: colors.black, color: colors.white,
							fontFamily: fonts.mono, fontSize: 16, fontWeight: 700, cursor: 'pointer', lineHeight: 1,
						}}>
						×
					</button>
				</div>

				<div ref={bodyRef} style={{ padding: '14px 20px', display: 'flex', flexDirection: 'column', gap: 6, overflowY: 'auto', minHeight: 0 }}>
					<AnimatePresence initial={false}>
						{messages.slice(0, count).map((m, i) => (
							<motion.div
								key={i}
								initial={{ opacity: 0, y: 18, scale: 0.98 }}
								animate={{ opacity: 1, y: 0, scale: 1 }}
								exit={{ opacity: 0, y: 10, scale: 0.98 }}
								transition={{ duration: 0.28 }}
								style={{ display: 'flex', alignItems: 'stretch', background: colors.white, border, boxShadow: shadowSm, flexShrink: 0 }}>
								<div style={{
									width: 180, flexShrink: 0, padding: '6px 12px', background: ROLE[m.role].color, borderRight: border,
									display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2,
								}}>
									<span style={{ fontFamily: fonts.mono, fontSize: 15, fontWeight: 700 }}>{ROLE[m.role].label}</span>
									<span style={{ fontFamily: fonts.mono, fontSize: 12, fontWeight: 700, opacity: 0.75, lineHeight: 1.3 }}>{m.note}</span>
								</div>
								<pre style={{
									margin: 0, padding: '8px 14px', flex: 1, minWidth: 0, display: 'flex', alignItems: 'center',
									fontFamily: fonts.mono, fontSize: 17, fontWeight: 700, lineHeight: 1.4, color: colors.dark,
									whiteSpace: 'pre-wrap', wordBreak: 'break-word',
								}}>{m.content}</pre>
							</motion.div>
						))}
					</AnimatePresence>
				</div>

				<div style={{
					display: 'flex', justifyContent: 'center', gap: 14, padding: 8,
					borderTop: border, background: colors.white, flexShrink: 0,
				}}>
					<StepArrow direction="prev" onClick={back} disabled={count <= 1} />
					<StepArrow direction="next" onClick={forward} disabled={count >= total} />
				</div>
			</motion.div>
			</div>
		</motion.div>,
		document.body,
	);
}

function StepArrow({ direction, onClick, disabled }: { direction: 'prev' | 'next'; onClick: () => void; disabled: boolean }) {
	const [hover, setHover] = useState(false);
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			style={{
				transform: hover && !disabled ? 'translate(3px,3px)' : 'none',
				width: 52, height: 52,
				border, background: colors.white,
				fontSize: 22, fontWeight: 700, cursor: disabled ? 'default' : 'pointer',
				display: 'flex', alignItems: 'center', justifyContent: 'center',
				boxShadow: hover && !disabled ? 'none' : shadowSm,
				opacity: disabled ? 0.3 : 1,
				transition: 'all 0.15s',
			}}>
			{direction === 'prev' ? '←' : '→'}
		</button>
	);
}
