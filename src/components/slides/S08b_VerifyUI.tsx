import { useState } from 'react';
import { motion } from 'framer-motion';
import { Slide, Inner, Title, colors, fonts, border, shadow, shadowSm } from '../ui';

/**
 * 循环后几轮 · verify 工具打开的页面（human in the loop 的 UI）
 *
 * 演讲者备注：
 * verify 这个工具不是去调什么 API，而是把模型写好的 Email 草稿展示给你看。你有三个选择：
 * 直接发送；自己动手改一改再发；或者写几句评论让模型重写。不管你点哪个，工具都会把你的决定
 * 包成一条 tool_result 写回 messages，模型下一轮就知道该干什么：发送、用你改好的版本，
 * 还是带着评论再来一轮。这就是 15 秒的由来：AI 把资料查完、Email 写完，你只负责最后这一下。
 */
type Choice = 'send' | 'edit' | 'rewrite';

const ACTIONS: { id: Choice; label: string; sub: string; color: string; result: string; next: string }[] = [
	{ id: 'send', label: '发送', sub: 'SEND', color: colors.green, result: '{ "decision": "send" }', next: '模型下一轮直接发出 Email，循环结束' },
	{ id: 'edit', label: '手动修改', sub: 'EDIT BY HAND', color: colors.blue, result: '{ "decision": "edit", "email": "<你改好的正文>" }', next: '直接发送你改过的版本' },
	{ id: 'rewrite', label: '带评论重写', sub: 'REWRITE WITH COMMENTS', color: colors.orange, result: '{ "decision": "rewrite", "comments": "<你的评论>" }', next: '评论写回记录，模型带着评论再来一轮' },
];

const EMAIL = {
	to: 'Boss',
	subject: 'Daily report · 24-09-2026',
	body: [
		'Dear boss, here are today’s details.',
		'Finance: revenue 12,400 · expenses 8,150 · net profit 4,250. 3 invoices paid, 1 overdue.',
		'Tasks: 3 cards moved to Done on the Kanban board today, 2 still in Review.',
		'Best regards',
	],
};

export default function S08b_VerifyUI() {
	const [choice, setChoice] = useState<Choice | null>(null);
	const picked = ACTIONS.find((a) => a.id === choice);

	return (
		<Slide bg={colors.warmBg}>
			<Inner style={{ flexDirection: 'column', justifyContent: 'center', gap: 22 }}>
				<motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
					style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
					<span style={{
						padding: '6px 14px', background: colors.black, color: colors.yellow,
						fontFamily: fonts.mono, fontSize: 14, fontWeight: 700, letterSpacing: 2,
					}}>ROUND N · verify 工具</span>
					<Title size="44px">verify 打开的页面：<span style={{ background: colors.yellow, padding: '0 14px' }}>你只花 15 秒</span></Title>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.55, delay: 0.2 }}
					style={{ background: colors.white, border, boxShadow: shadow }}>
					<div style={{
						display: 'flex', alignItems: 'center', gap: 14, padding: '10px 18px',
						background: colors.black, borderBottom: border,
					}}>
						<span style={{ display: 'inline-flex', gap: 6 }}>
							{[colors.red, colors.yellow, colors.green].map((c) => (
								<span key={c} style={{ width: 12, height: 12, background: c, border: `2px solid ${colors.white}` }} />
							))}
						</span>
						<span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, letterSpacing: 2, color: colors.yellow }}>DAILY REPORT · 人工确认</span>
						<span style={{ marginLeft: 'auto', fontFamily: fonts.mono, fontSize: 12, color: colors.white, opacity: 0.6, letterSpacing: 1 }}>draft by agent · waiting for you</span>
					</div>

					<div style={{ display: 'flex', gap: 24, padding: 24 }}>
						<div style={{ flex: 1.6, border: `2px solid ${colors.black}`, background: colors.white, padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
							{[['To', EMAIL.to], ['Subject', EMAIL.subject]].map(([k, v]) => (
								<div key={k} style={{ display: 'flex', gap: 14, alignItems: 'baseline', fontSize: 17 }}>
									<span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, letterSpacing: 1, color: colors.dark, opacity: 0.6, width: 72 }}>{k.toUpperCase()}</span>
									<span style={{ fontWeight: 700 }}>{v}</span>
								</div>
							))}
							<div style={{ height: 2, background: colors.black, opacity: 0.15, margin: '6px 0 10px' }} />
							{EMAIL.body.map((p, i) => (
								<motion.p
									key={p}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.35, delay: 0.55 + i * 0.12 }}
									style={{ fontSize: 20, lineHeight: 1.7, color: colors.dark }}>
									{p}
								</motion.p>
							))}
						</div>

						<div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
							{ACTIONS.map((a, i) => {
								const active = choice === a.id;
								return (
									<motion.button
										key={a.id}
										type="button"
										onClick={() => setChoice(a.id)}
										initial={{ opacity: 0, x: 24 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.4, delay: 0.7 + i * 0.12 }}
										whileHover={{ x: 3, y: 3, boxShadow: `0 0 0 ${colors.black}` }}
										style={{
											display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
											padding: '20px 22px', border, boxShadow: shadowSm, cursor: 'pointer', textAlign: 'left',
											background: active ? colors.black : a.color,
											color: active ? colors.white : colors.black,
											fontFamily: fonts.body,
										}}>
										<span style={{ fontSize: 22, fontWeight: 800 }}>{active ? '✓ ' : ''}{a.label}</span>
										<span style={{ fontFamily: fonts.mono, fontSize: 12, fontWeight: 700, letterSpacing: 1, opacity: 0.8 }}>{a.sub}</span>
									</motion.button>
								);
							})}

							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.4, delay: 1.1 }}
								style={{ marginTop: 'auto', padding: '16px 18px', background: colors.dark, border, color: colors.white, minHeight: 124 }}>
								<div style={{ fontFamily: fonts.mono, fontSize: 12, letterSpacing: 2, color: colors.yellow, marginBottom: 6 }}>→ 工具写回 messages</div>
								<div style={{ fontFamily: fonts.mono, fontSize: 14, lineHeight: 1.5, color: picked ? colors.green : colors.white, opacity: picked ? 1 : 0.6 }}>
									{picked ? picked.result : '等待你的确定…'}
								</div>
								{picked && <div style={{ fontSize: 14, marginTop: 6, opacity: 0.9 }}>{picked.next}</div>}
							</motion.div>
						</div>
					</div>
				</motion.div>
			</Inner>
		</Slide>
	);
}
