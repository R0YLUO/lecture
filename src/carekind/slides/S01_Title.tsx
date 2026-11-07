import { motion } from 'framer-motion';
import { Slide, Inner, Title, colors, fonts, border, shadow, shadowSm } from '../../components/ui';
import { accent, Arrow } from '../kit';

/**
 * Title · CareKind Voice AI: From Recording to Confirmed Transcript
 *
 * Speaker notes:
 * Welcome back to CareKind. Today we build our first AI feature: turning a nurse's voice recording into a transcript.
 * The important word in the title is "confirmed" — a human checks the text before it counts.
 * I'll code live with an AI coding assistant, and these slides explain the flow as we go.
 */
const BARS = [18, 34, 52, 30, 64, 44, 24, 56, 38, 20, 46, 28];

export default function S01_Title() {
	return (
		<Slide bg={colors.white}>
			<Inner center>
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4 }}
					style={{
						display: 'inline-block', padding: '8px 20px', marginBottom: 28,
						background: colors.black, color: colors.white, fontFamily: fonts.mono, fontSize: 15, fontWeight: 700, letterSpacing: 3,
					}}>
					CAREKIND · <span style={{ color: accent }}>VOICE AI</span>
				</motion.div>

				<Title size="84px" style={{ lineHeight: 1.1, marginBottom: 44 }}>
					<motion.span initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} style={{ display: 'block' }}>
						From Recording to
					</motion.span>
					<motion.span
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.45, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
						style={{ display: 'inline-block', background: accent, color: colors.white, padding: '0 24px', marginTop: 8 }}>
						Confirmed Transcript
					</motion.span>
				</Title>

				{/* recording → draft text → confirmed by a human */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.7 }}
					style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 44 }}>
					<div style={{ display: 'flex', alignItems: 'center', gap: 5, height: 80, padding: '0 18px', border, boxShadow: shadowSm, background: colors.white }}>
						{BARS.map((h, i) => (
							<motion.span key={i}
								animate={{ height: [h * 0.5, h, h * 0.7] }}
								transition={{ duration: 1.2, delay: i * 0.06, repeat: Infinity, repeatType: 'reverse' }}
								style={{ width: 7, background: colors.black }} />
						))}
					</div>
					<Arrow length={40} />
					<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 9, width: 190, height: 80, padding: '0 18px', border: `3px dashed ${colors.black}`, background: colors.white }}>
						{[100, 80, 60].map((w) => <span key={w} style={{ height: 7, width: `${w}%`, background: colors.black, opacity: 0.35 }} />)}
					</div>
					<Arrow length={40} />
					<div style={{ display: 'flex', alignItems: 'center', gap: 14, height: 80, padding: '0 22px', border, boxShadow: shadowSm, background: accent, color: colors.white }}>
						<span style={{ fontSize: 36, fontWeight: 900 }}>✓</span>
						<span style={{ fontFamily: fonts.mono, fontSize: 15, fontWeight: 700, letterSpacing: 1.5, textAlign: 'left', lineHeight: 1.3 }}>CONFIRMED<br />BY THE NURSE</span>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.9 }}
					style={{ display: 'inline-flex', gap: 16, alignItems: 'center', padding: '14px 28px', background: colors.white, border, boxShadow: shadow }}>
					<span style={{ fontFamily: fonts.mono, fontSize: 14, letterSpacing: 2 }}>TUTORIAL</span>
					<span style={{ fontSize: 22, fontWeight: 700 }}>08/11/2026</span>
				</motion.div>
			</Inner>
		</Slide>
	);
}
