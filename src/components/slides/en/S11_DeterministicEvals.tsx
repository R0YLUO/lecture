import { motion } from 'framer-motion';
import { Slide, Inner, Half, Title, Subtitle, colors, fonts, border, shadow, shadowSm } from '../../ui';

/**
 * Deterministic evals · evaluating with code
 *
 * Speaker notes:
 * Deterministic evaluations. Here we run code to check that the AI got the task result right, and that it followed the right process to get there.
 * For the result: did the email reach the boss? You can write code that connects to your mailbox and checks whether an email to the boss went out today.
 * Checking the process matters just as much. The AI may have sent the email, but we don't yet know whether it wrote it from the database data or just made it up.
 * We also want human in the loop: no email may be sent without the user's confirmation. All of this comes down to checking which tools the AI used
 * along the way. How do we check? Look at the record. messages contains every tool call, so code can find them.
 */
const CHECKS = [
	{
		label: 'Check: functional correctness',
		sub: 'Is the result right?',
		detail: 'Did the email reach the boss? Write code that connects to the mailbox and checks for today\'s email to the boss.',
		color: colors.green,
	},
	{
		label: 'Check: correct tool use',
		sub: 'Is the process right?',
		detail: 'Was it written from the database data, or made up? Did it wait for the user to confirm before sending (human in the loop)?',
		color: colors.blue,
	},
];

export default function S11_DeterministicEvals() {
	return (
		<Slide bg={colors.white}>
			<Inner split>
				<Half style={{ flex: 0.9 }}>
					<motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
						<div style={{
							display: 'inline-block', padding: '4px 12px', marginBottom: 20,
							background: colors.green, fontFamily: fonts.mono, fontSize: 13,
							fontWeight: 700, letterSpacing: 2, border,
						}}>
							EVALS · 01
						</div>
						<Title size="56px" style={{ marginBottom: 16 }}>Deterministic evals</Title>
						<Subtitle style={{ marginBottom: 28 }}>Evaluate with code: is the result right, and is the process right?</Subtitle>
						<div style={{
							padding: '18px 22px', background: colors.warmBg, border, boxShadow: shadowSm,
							fontSize: 18, lineHeight: 1.6,
						}}>
							<span style={{ fontFamily: fonts.mono, fontWeight: 700, background: colors.black, color: colors.yellow, padding: '2px 8px', marginRight: 10 }}>How?</span>
							Check the record: <span style={{ fontFamily: fonts.mono, fontWeight: 700 }}>messages</span> holds every tool call, so code can find them.
						</div>
					</motion.div>
				</Half>
				<Half style={{ flex: 1.1, gap: 20 }}>
					{CHECKS.map((c, i) => (
						<motion.div
							key={c.label}
							initial={{ opacity: 0, y: 24 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.45, delay: 0.25 + i * 0.15 }}
							style={{ background: colors.white, border, boxShadow: shadow }}>
							<div style={{ background: c.color, borderBottom: border, padding: '14px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
								<span style={{ fontFamily: fonts.mono, fontSize: 18, fontWeight: 700 }}>{c.label}</span>
								<span style={{ fontSize: 16, fontWeight: 700, background: colors.black, color: colors.white, padding: '2px 10px' }}>{c.sub}</span>
							</div>
							<p style={{ padding: '18px 22px 22px', fontSize: 20, lineHeight: 1.6, fontWeight: 500 }}>{c.detail}</p>
						</motion.div>
					))}
				</Half>
			</Inner>
		</Slide>
	);
}
