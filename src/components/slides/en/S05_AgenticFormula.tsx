import { motion } from 'framer-motion';
import { Slide, Inner, Title, colors, fonts, border, shadow } from '../../ui';

/**
 * Agentic AI = LLM + tool use + agent loop
 *
 * Speaker notes:
 * Let's look at what an AI agent is actually made of. It's a large language model, plus tool use, plus an agent loop.
 * The tool use and agent loop parts are carried out in code. Next we'll look at the details of that code — it gets a bit technical,
 * so if you've never programmed, don't worry; getting the rough idea is enough. If you have any questions, just raise your hand.
 */
const PARTS = [
	{ label: 'LLM', sub: 'Large language model · the brain', color: colors.purple, textColor: colors.white },
	{ label: 'Tool Use', sub: 'Reaching the outside world', color: colors.blue, textColor: colors.black },
	{ label: 'Agent Loop', sub: 'Decides its own next step', color: colors.yellow, textColor: colors.black },
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
					03 · WHAT IS AN AGENT
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
					<span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, letterSpacing: 2, background: colors.black, color: colors.white, padding: '4px 10px' }}>CODE EXECUTION</span>
					<span style={{ fontSize: 20, fontWeight: 600 }}>Tool use and the agent loop are both carried out in code</span>
				</motion.div>
			</Inner>
		</Slide>
	);
}
