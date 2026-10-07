import { motion } from 'framer-motion';
import { Slide, Inner, Title, Subtitle, assetPath, colors, fonts, border, shadow } from '../../ui';

/**
 * Use case · 15 seconds before leaving work every day (AI agent version)
 *
 * Speaker notes:
 * Our AI pulls the data it needs for the email through the database API and the task board API, and sends it to your boss once you approve.
 * All it takes is 15 seconds of your time to review the finished email and confirm the AI can send it.
 */
const STEPS = ['Check financials', 'Check task board', 'You approve', 'Write email'];

export default function S03_AgentWorkflow() {
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
							01 · LET AN AI AGENT DO IT
						</div>
						<Title size="48px" style={{ marginBottom: 8 }}>Agent drafts email — you press send</Title>
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
						<div style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, letterSpacing: 2, opacity: 0.8 }}>EVERY DAY</div>
						<div style={{ fontFamily: fonts.heading, fontSize: 56, fontWeight: 900, lineHeight: 1 }}>15 <span style={{ fontSize: 28 }}>sec</span></div>
					</motion.div>
				</div>

				<motion.img
					src={assetPath('slides/en/04-agent-workflow.png')}
					alt="AI agent workflow: the AI checks financials in the database and daily tasks on the Kanban board, confirms with you, then sends the email to the boss — 15 seconds every day"
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
