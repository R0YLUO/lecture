import { motion } from 'framer-motion';
import { Slide, Inner, Title, Subtitle, assetPath, colors, fonts, border, shadow } from '../../ui';

/**
 * Use case · 15 minutes before leaving work every day (manual version)
 *
 * Speaker notes:
 * Let's start with a very common use case: every day before you leave work, you spend fifteen minutes writing your boss a daily report.
 * The content is pretty much the same each day — a summary of your team's financials and the tasks you completed. But every time you have to
 * check the database for the day's financial data, then look at your team's task board to see which tasks were finished. Only then can you
 * finally write the email. You read it over once more, send it to your boss, and only then can you go home for dinner. The problem is you've
 * already worked a full day — by the time you start this email you're ready to go home, so these last 15 minutes feel especially slow and painful.
 * Naturally you start to wonder: can AI write this for me? Let's look at how to design an AI agent that checks the data and writes the email for you.
 */
const STEPS = ['Check financials (database)', 'Check task board', 'Write email'];

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
							01 · A COMMON USE CASE
						</div>
						<Title size="48px" style={{ marginBottom: 8 }}>Writing a daily report to your boss</Title>
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
						<div style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, letterSpacing: 2, opacity: 0.9 }}>EVERY DAY</div>
						<div style={{ fontFamily: fonts.heading, fontSize: 56, fontWeight: 900, lineHeight: 1 }}>15 <span style={{ fontSize: 28 }}>min</span></div>
					</motion.div>
				</div>

				<motion.img
					src={assetPath('slides/en/02-manual-workflow.png')}
					alt="Manual workflow: check financials in the database → check the Kanban task board → write an email to the boss, 15 minutes every day"
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
