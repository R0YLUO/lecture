import { motion } from 'framer-motion';
import { Slide, Inner, Title, colors, fonts, border, shadow } from '../ui';

/**
 * 章节页 · Evals
 *
 * 演讲者备注：
 * 我们怎么能保证我们的 Agent 正确完成任务呢？通过评估系统。有两种评测 agent 的方法。
 * Deterministic and non-deterministic. Deterministic 就是用代码执行来评测 agent。
 * Non-deterministic 的方式是用模型来做测试。这方法称为 LLM as a Judge。我们接下来看一下每个方式的细节。
 */
const METHODS = [
	{ name: 'Deterministic', zh: '用代码执行来评测', color: colors.green },
	{ name: 'Non-deterministic', zh: '用模型来做测试 · LLM as a Judge', color: colors.purple },
];

export default function C10_Evals() {
	return (
		<Slide bg={colors.dark}>
			<Inner center>
				<motion.div
					initial={{ opacity: 0, y: -16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.45 }}
					style={{
						display: 'inline-block', padding: '6px 16px', marginBottom: 28,
						background: colors.yellow, color: colors.black, fontFamily: fonts.mono, fontSize: 13,
						fontWeight: 700, letterSpacing: 3, border,
					}}>
					04 · 评估
				</motion.div>

				<Title white size="140px" style={{ lineHeight: 1, marginBottom: 20, letterSpacing: -4 }}>
					<motion.span
						initial={{ opacity: 0, scale: 0.6, y: 30 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						transition={{ type: 'spring', stiffness: 200, damping: 14, mass: 0.8, delay: 0.1 }}
						style={{ display: 'block' }}>
						Evals
					</motion.span>
				</Title>

				<motion.p
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.5 }}
					style={{ fontSize: 28, fontWeight: 600, color: colors.white, marginBottom: 44 }}>
					怎么保证我们的 Agent <span style={{ background: colors.red, padding: '0 12px' }}>正确完成任务</span>？
				</motion.p>

				<div style={{ display: 'flex', gap: 24 }}>
					{METHODS.map((m, i) => (
						<motion.div
							key={m.name}
							initial={{ opacity: 0, y: 24 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.45, delay: 0.75 + i * 0.15 }}
							style={{
								width: 420, padding: '22px 24px', background: colors.white, border, boxShadow: shadow,
								textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 8,
							}}>
							<span style={{ display: 'inline-block', alignSelf: 'flex-start', background: m.color, padding: '2px 10px', fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>
								{String(i + 1).padStart(2, '0')}
							</span>
							<span style={{ fontFamily: fonts.heading, fontSize: 30, fontWeight: 900, letterSpacing: -0.5 }}>{m.name}</span>
							<span style={{ fontSize: 18, fontWeight: 600, color: colors.dark }}>{m.zh}</span>
						</motion.div>
					))}
				</div>
			</Inner>
		</Slide>
	);
}
