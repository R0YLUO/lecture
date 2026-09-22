import { useState, useEffect, useRef, useCallback, type PointerEvent as ReactPointerEvent } from 'react';
import { colors } from '../styles/theme';

// 演讲者摄像头圆圈浮层 —— 录播时右下角露脸用，对标 Slidev 的 Camera View
// 按 C 开关；可拖动；固定在视口（不跟 slide 画布一起 scale，像 OBS 摄像头）
// 设计语言沿用 JR Neo-Brutalism：粗黑边 + 偏移硬阴影

const SIZE = 200; // 圆圈直径 px

export default function CameraBubble() {
	const [on, setOn] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [pos, setPos] = useState<{ left: number; top: number } | null>(null); // null = 默认右下角
	const videoRef = useRef<HTMLVideoElement>(null);
	const streamRef = useRef<MediaStream | null>(null);
	const dragOffset = useRef<{ x: number; y: number } | null>(null);

	// 按 C 开关摄像头
	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'c' || e.key === 'C') { e.preventDefault(); setOn((v) => !v); }
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, []);

	// 开/关时申请 / 释放摄像头流
	useEffect(() => {
		if (!on) {
			streamRef.current?.getTracks().forEach((t) => t.stop());
			streamRef.current = null;
			return;
		}
		let cancelled = false;
		navigator.mediaDevices
			.getUserMedia({ video: { width: 720, height: 720, facingMode: 'user' }, audio: false })
			.then((stream) => {
				if (cancelled) { stream.getTracks().forEach((t) => t.stop()); return; }
				streamRef.current = stream;
				if (videoRef.current) videoRef.current.srcObject = stream;
				setError(null);
			})
			.catch((err: unknown) => {
				setError(err instanceof Error ? err.message : '无法访问摄像头');
				setOn(false);
			});
		return () => { cancelled = true; };
	}, [on]);

	// 卸载时务必关掉摄像头
	useEffect(() => () => { streamRef.current?.getTracks().forEach((t) => t.stop()); }, []);

	// 拖动（pointer events）—— 存绝对 left/top，夹在视口内
	const onPointerDown = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
		e.currentTarget.setPointerCapture(e.pointerId);
	}, []);

	const onPointerMove = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
		if (!dragOffset.current) return;
		const left = Math.min(Math.max(0, e.clientX - dragOffset.current.x), window.innerWidth - SIZE);
		const top = Math.min(Math.max(0, e.clientY - dragOffset.current.y), window.innerHeight - SIZE);
		setPos({ left, top });
	}, []);

	const onPointerUp = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
		dragOffset.current = null;
		e.currentTarget.releasePointerCapture(e.pointerId);
	}, []);

	// 错误提示（一闪而过，不挡演讲）
	if (error && !on) {
		return (
			<div style={{
				position: 'fixed', bottom: 32, right: 32, zIndex: 2000,
				padding: '8px 14px', background: colors.red, color: colors.white,
				fontFamily: '"Space Mono", monospace', fontSize: 12, fontWeight: 700,
				border: `3px solid ${colors.black}`, boxShadow: `4px 4px 0px ${colors.black}`,
			}}>
				摄像头不可用：{error}
			</div>
		);
	}

	if (!on) return null;

	const placement = pos
		? { left: pos.left, top: pos.top }
		: { right: 32, bottom: 32 };

	return (
		<div
			onPointerDown={onPointerDown}
			onPointerMove={onPointerMove}
			onPointerUp={onPointerUp}
			style={{
				position: 'fixed', zIndex: 2000, ...placement,
				width: SIZE, height: SIZE, borderRadius: '50%',
				overflow: 'hidden', cursor: 'grab', touchAction: 'none',
				border: `4px solid ${colors.black}`,
				boxShadow: `6px 6px 0px ${colors.black}`,
				background: colors.black,
			}}
		>
			<video
				ref={videoRef}
				autoPlay
				playsInline
				muted
				style={{
					width: '100%', height: '100%', objectFit: 'cover',
					transform: 'scaleX(-1)', // 镜像，像自拍/OBS 一样自然
				}}
			/>
		</div>
	);
}
