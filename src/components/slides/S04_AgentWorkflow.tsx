import { motion } from 'framer-motion';
import { Slide, Inner, Title, Subtitle, assetPath, colors, fonts, border, shadow } from '../ui';

/**
 * 用例 · 每天下班前的 15 秒（AI 智能体版）
 *
 * 演讲者备注：
 * 我们的 AI 就会通过数据库的 API 和任务版的 API 抽出它需要写 Email 的资料，收到你的确定后发给老板。
 * 这只需要你 15 秒的时间查看一下写完的 Email，确定一下 AI 可以发送。
 */
const STEPS = ['查看财务', '查看任务版', '你来确定', '写 Email'];

export default function S04_AgentWorkflow() {
	return (
		<Slide bg={colors.warmBg}>
			<Inner style={{ flexDirection: 'column', justifyContent: 'center', gap: 24 }}>
				<div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32 }}>
					<motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
						<div style={{
							display: 'inline-block', padding: '4px 12px', marginBottom: 14,
							background: colors.blue, fontFamily: fonts.mono, fontSize: 13,
							fontWeight: 700, letterSpacing: 2, border,
						}}>
							01 · 换成 AI 智能体来做
						</div>
						<Title size="48px" style={{ marginBottom: 8 }}>AI 通过 API 抽资料、写 Email，你只负责确定</Title>
						<Subtitle style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
							{STEPS.map((s, i) => (
								<span key={s} style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
									<span style={{ fontFamily: fonts.mono, fontWeight: 700, color: colors.black, background: i === 2 ? colors.yellow : colors.white, border: `2px solid ${colors.black}`, padding: '0 8px' }}>{i + 1}</span>
									<span style={{ color: colors.black, fontWeight: 600 }}>{s}</span>
									{i < STEPS.length - 1 && <span style={{ color: colors.red, fontWeight: 700 }}>→</span>}
								</span>
							))}
						</Subtitle>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, scale: 0.8, rotate: 4 }}
						animate={{ opacity: 1, scale: 1, rotate: 2 }}
						transition={{ type: 'spring', stiffness: 200, damping: 14, mass: 0.8, delay: 0.5 }}
						style={{
							flexShrink: 0, padding: '14px 26px', background: colors.green, color: colors.black, border, boxShadow: shadow,
							textAlign: 'center',
						}}>
						<div style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, letterSpacing: 2, opacity: 0.8 }}>每天</div>
						<div style={{ fontFamily: fonts.heading, fontSize: 56, fontWeight: 900, lineHeight: 1 }}>15 <span style={{ fontSize: 28 }}>秒</span></div>
					</motion.div>
				</div>

				<motion.img
					src={assetPath('slides/04-agent-workflow.png')}
					alt="AI 智能体流程：AI 通过 API 查看数据库财务与 Kanban 任务版，写好 Email 交给你确定后发给老板，每天 15 秒"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.55, delay: 0.25 }}
					style={{
						display: 'block', maxWidth: '100%', maxHeight: 520, width: 'auto', height: 'auto',
						objectFit: 'contain', alignSelf: 'center',
						background: colors.white, border, boxShadow: shadow, padding: 12,
					}}
				/>
			</Inner>
		</Slide>
	);
}
