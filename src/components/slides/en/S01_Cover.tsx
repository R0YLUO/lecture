import { motion } from 'framer-motion';
import { Slide, Inner, Title, colors, fonts, border, shadow } from '../../ui';

/**
 * Cover · How to Build Reliable AI Systems?
 *
 * Speaker notes:
 * Hi everyone, let me introduce myself before we start. My name is Roy, and I'm an AI engineer at an AI consultancy called V2.
 * I studied software engineering here at Monash, then spent a few years at Deloitte. At first my projects were all software engineering.
 * Over the last few years more and more AI projects came up, and that pulled me into AI engineering. At my new company every project
 * is AI — we help clients design AI systems that make their business processes more efficient. Today's topic is how to build reliable
 * AI systems. We'll approach it from first principles, and the goal is for you to understand how an AI agent actually works inside.
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
						AI ENGINEERING · PUBLIC LECTURE
					</motion.div>

					<Title size="92px" style={{ lineHeight: 1.1, marginBottom: 24 }}>
						<motion.span
							initial={{ opacity: 0, y: 24 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.15 }}
							style={{ display: 'block' }}
						>
							How to Build{' '}
							<motion.span
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.4, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
								style={{ display: 'inline-block', background: colors.red, color: colors.white, padding: '0 24px' }}
							>Reliable</motion.span>
							{' '}AI Systems?
						</motion.span>
					</Title>

					<motion.p
						initial={{ opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.7 }}
						style={{ fontSize: 26, fontWeight: 600, color: colors.dark, marginTop: 8 }}>
						From first principles: how an AI agent actually works inside
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
