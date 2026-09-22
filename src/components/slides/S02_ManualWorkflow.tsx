import { motion } from 'framer-motion';
import { Slide, Inner, Title, Subtitle, assetPath, colors, fonts, border, shadow } from '../ui';

/**
 * 用例 · 每天下班前的 15 分钟（人工版）
 *
 * 演讲者备注：
 * 来学一下一个非常普遍的用例吧：比如你每天下班之前需要抽出十五分钟的时间给你老板写个当天的报告。
 * 每天报告的内容差不多都是一样的，也就是总结一下你们队的财务报告，和完成的任务。可是每次都需要你查看一下你们的数据库
 * 了解当天的财务资料，再看一下你们团队的任务版知道一下当天搭建完成的任务都是什么。查看完你可以终于写你的 Email。
 * 写完再查看一遍，最后发出给老板看，才能回家吃饭。问题是，你已经上完了一整天的班，到你开始写这封 Email 时你已经准备回家了，
 * 所以这最后 15 分钟在你体验中感觉特别的慢，特别的辛苦。自然的你就开始想：能不能用 AI 帮我写呀？
 * 我们来看一下怎么设计你需要的一个 AI 智能体，帮你自动查看资料，写 Email。
 */
const STEPS = ['查看财务（数据库）', '查看任务版', '写 Email'];

export default function S02_ManualWorkflow() {
	return (
		<Slide bg={colors.warmBg}>
			<Inner style={{ flexDirection: 'column', justifyContent: 'center', gap: 24 }}>
				<div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32 }}>
					<motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
						<div style={{
							display: 'inline-block', padding: '4px 12px', marginBottom: 14,
							background: colors.yellow, fontFamily: fonts.mono, fontSize: 13,
							fontWeight: 700, letterSpacing: 2, border,
						}}>
							01 · 一个普遍的用例
						</div>
						<Title size="48px" style={{ marginBottom: 8 }}>每天下班前，给老板写一封当天的报告</Title>
						<Subtitle style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
							{STEPS.map((s, i) => (
								<span key={s} style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
									<span style={{ fontFamily: fonts.mono, fontWeight: 700, color: colors.black, background: colors.white, border: `2px solid ${colors.black}`, padding: '0 8px' }}>{i + 1}</span>
									<span style={{ color: colors.black, fontWeight: 600 }}>{s}</span>
									{i < STEPS.length - 1 && <span style={{ color: colors.red, fontWeight: 700 }}>→</span>}
								</span>
							))}
						</Subtitle>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, scale: 0.8, rotate: -4 }}
						animate={{ opacity: 1, scale: 1, rotate: -2 }}
						transition={{ type: 'spring', stiffness: 200, damping: 14, mass: 0.8, delay: 0.5 }}
						style={{
							flexShrink: 0, padding: '14px 26px', background: colors.red, color: colors.white, border, boxShadow: shadow,
							textAlign: 'center',
						}}>
						<div style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, letterSpacing: 2, opacity: 0.9 }}>每天</div>
						<div style={{ fontFamily: fonts.heading, fontSize: 56, fontWeight: 900, lineHeight: 1 }}>15 <span style={{ fontSize: 28 }}>分钟</span></div>
					</motion.div>
				</div>

				<motion.img
					src={assetPath('slides/02-manual-workflow.png')}
					alt="人工流程：查看数据库财务 → 查看 Kanban 任务版 → 写 Email 给老板，每天 15 分钟"
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
