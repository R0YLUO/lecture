import { motion } from 'framer-motion';
import { Slide, Inner, Title, colors, fonts, border, shadow } from '../ui';

/**
 * Agentic AI = LLM + 工具使用 + 自主循环
 *
 * 演讲者备注：
 * 我们看一下，一个 AI 智能体到底是如何组成的。他就是一个大语言模型，加工具使用，加自主循环。
 * 工具使用和自主循环这部分是用代码执行的。我们接下来会看一下这代码执行部分的细节，我讲的会有一些技术性，
 * 所以你要是没有编程过的话不要着急，概念大概懂了就可以。有什么问题的话就可以举起手直说。
 */
const PARTS = [
	{ label: 'LLM', sub: '大语言模型 · 大脑', color: colors.purple, textColor: colors.white },
	{ label: '工具使用', sub: 'Tool Use · 接触世界', color: colors.blue, textColor: colors.black },
	{ label: '自主循环', sub: 'Agent Loop · 自己决定下一步', color: colors.yellow, textColor: colors.black },
];

export default function S05_AgenticFormula() {
	return (
		<Slide bg={colors.warmBg}>
			<Inner center>
				<motion.div
					initial={{ opacity: 0, y: -16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.45 }}
					style={{
						display: 'inline-block', padding: '4px 12px', marginBottom: 28,
						background: colors.black, color: colors.yellow, fontFamily: fonts.mono, fontSize: 13,
						fontWeight: 700, letterSpacing: 2,
					}}>
					03 · 智能体是什么
				</motion.div>

				<Title size="64px" style={{ marginBottom: 48 }}>
					<motion.span
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						style={{ display: 'block' }}>
						Agentic AI ＝
					</motion.span>
				</Title>

				<div style={{ display: 'flex', alignItems: 'stretch', gap: 24 }}>
					{PARTS.map((p, i) => (
						<div key={p.label} style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
							{i > 0 && (
								<motion.span
									initial={{ opacity: 0, scale: 0.5 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.35, delay: 0.35 + i * 0.25 }}
									style={{ fontFamily: fonts.heading, fontSize: 72, fontWeight: 900, lineHeight: 1 }}>
									+
								</motion.span>
							)}
							<motion.div
								initial={{ opacity: 0, y: 30, scale: 0.9 }}
								animate={{ opacity: 1, y: 0, scale: 1 }}
								transition={{ duration: 0.5, delay: 0.4 + i * 0.25, ease: [0.16, 1, 0.3, 1] }}
								style={{
									width: 340, padding: '32px 24px', background: p.color, border, boxShadow: shadow,
									display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center',
								}}>
								<span style={{ fontFamily: fonts.heading, fontSize: 48, fontWeight: 900, color: p.textColor, letterSpacing: -1, lineHeight: 1.1 }}>{p.label}</span>
								<span style={{ fontFamily: fonts.mono, fontSize: 14, fontWeight: 700, color: p.textColor, letterSpacing: 1, opacity: 0.85 }}>{p.sub}</span>
							</motion.div>
						</div>
					))}
				</div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 1.3 }}
					style={{
						marginTop: 44, display: 'inline-flex', alignItems: 'center', gap: 14,
						padding: '14px 24px', background: colors.white, border,
					}}>
					<span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, letterSpacing: 2, background: colors.black, color: colors.white, padding: '4px 10px' }}>代码执行</span>
					<span style={{ fontSize: 20, fontWeight: 600 }}>工具使用 + 自主循环这两部分，是用代码执行的</span>
				</motion.div>
			</Inner>
		</Slide>
	);
}
