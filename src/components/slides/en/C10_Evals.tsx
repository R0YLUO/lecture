import { motion } from 'framer-motion';
import { Slide, Inner, Title, colors, fonts, border, shadow } from '../../ui';

/**
 * Chapter page · Evals
 *
 * Speaker notes:
 * How can we make sure our agent completes its task correctly? Through evaluations. There are two ways to evaluate an agent:
 * deterministic and non-deterministic. Deterministic means evaluating the agent by running code.
 * Non-deterministic means using a model to do the testing — this is called LLM as a Judge. Let's look at each in detail.
 */
const METHODS = [
	{ name: 'Deterministic', desc: 'Evaluate by running code', color: colors.green },
	{ name: 'Non-deterministic', desc: 'Use a model to test · LLM as a Judge', color: colors.purple },
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
					04 · EVALUATION
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
					How do we make sure our agent <span style={{ background: colors.red, padding: '0 12px' }}>gets the job done right</span>?
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
							<span style={{ fontSize: 18, fontWeight: 600, color: colors.dark }}>{m.desc}</span>
						</motion.div>
					))}
				</div>
			</Inner>
		</Slide>
	);
}
