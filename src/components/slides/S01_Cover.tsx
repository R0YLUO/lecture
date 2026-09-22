import { motion } from 'framer-motion';
import { Slide, Inner, Title, colors, fonts, border, shadow } from '../ui';

/**
 * 封面 · 如何构建可靠的 AI 系统？
 *
 * 演讲者备注：
 * 大家好，我讲课之前先做个自我介绍。我名字是 Roy，我是一个 AI 工程师，目前是在一个 AI 专业公司叫 V2。
 * 我是在这里的 Monash 读的软件工程本科。毕业后在 Deloitte 干了几年。刚开始时，项目都是软件工程有关的。
 * 最近几年更多的 AI 项目出现了，使我转向了 AI 工程。在新公司，项目都是 AI 有关的，帮助顾客们设计 AI 系统，
 * 帮助提高他们业务流程的效率。我们今天的话题是，如何构建可靠的 AI 系统。我们会从最基本、地道的角度来学这个问题，
 * 目标是让大家懂一个 AI 智能体的内部是如何运行的。
 */
export default function S01_Cover() {
	return (
		<Slide bg={colors.warmBg}>
			<Inner center>
				<div style={{ textAlign: 'center' }}>
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4 }}
						style={{
							display: 'inline-block', padding: '8px 20px',
							background: colors.black, color: colors.yellow,
							fontFamily: fonts.mono, fontSize: 14, fontWeight: 700,
							letterSpacing: 3, marginBottom: 32,
						}}>
						AI ENGINEERING · 公开讲座
					</motion.div>

					<Title size="92px" style={{ lineHeight: 1.1, marginBottom: 24 }}>
						<motion.span
							initial={{ opacity: 0, y: 24 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.15 }}
							style={{ display: 'block' }}
						>
							如何构建{' '}
							<motion.span
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.4, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
								style={{ display: 'inline-block', background: colors.red, color: colors.white, padding: '0 24px' }}
							>可靠的</motion.span>
							{' '}AI 系统？
						</motion.span>
					</Title>

					<motion.p
						initial={{ opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.7 }}
						style={{ fontSize: 26, fontWeight: 600, color: colors.dark, marginTop: 8 }}>
						从最基本的角度，看懂一个 AI 智能体的内部是如何运行的
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.9 }}
						style={{
							display: 'inline-flex', gap: 16, alignItems: 'center',
							padding: '20px 32px', marginTop: 36,
							background: colors.white, border, boxShadow: shadow,
						}}>
						<span style={{ fontFamily: fonts.mono, fontSize: 14, color: colors.dark, letterSpacing: 2 }}>SPEAKER</span>
						<span style={{ fontSize: 20, fontWeight: 700 }}>Roy Luo · AI Engineer @ V2</span>
					</motion.div>
				</div>
			</Inner>
		</Slide>
	);
}
