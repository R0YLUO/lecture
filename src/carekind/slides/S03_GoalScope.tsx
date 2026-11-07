import { motion } from 'framer-motion';
import { colors, fonts } from '../../components/ui';
import { Frame, Appear, Chain, Chip, Callout, Mark, Pill, Arrow, accent } from '../kit';

/**
 * Today's goal and scope
 *
 * Speaker notes:
 * By the end of class we run the project, connect speech-to-text, record, and save a confirmed transcript.
 * In scope is everything between the microphone and a saved, confirmed transcript — plus logging, which runs underneath every step.
 * Progress notes, RAG and agents inside the product sit outside today's line.
 * The one rule to remember: AI output is a draft until a human confirms it. We call this human-in-the-loop, or HITL.
 */
const IN = ['Record', 'Upload', 'Transcribe', 'Human edit + confirm', 'Save'];
const OUT = ['Progress notes', 'RAG', 'Product agents'];

export default function S03_GoalScope() {
	return (
		<Frame section={0} title="Today's goal and scope" gap={30}>
			<Appear delay={0.15} style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
				<Chip>GOAL</Chip>
				<Chain steps={['Run the project', 'Connect speech-to-text', 'Record', 'Confirmed transcript saved']} highlight={[3]} size={19} arrow={34} delay={0.2} />
			</Appear>

			<div style={{ display: 'flex', alignItems: 'stretch', gap: 0 }}>
				<motion.div
					initial={{ opacity: 0, scale: 0.97 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.45, delay: 0.4 }}
					style={{ flex: 1, border: `4px solid ${accent}`, padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 16, position: 'relative' }}>
					<Chip tone="accent">IN SCOPE · TODAY</Chip>
					<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
						{IN.map((s, i) => (
							<div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
								<Pill tone={i === 3 ? 'accent' : 'plain'} size={19} mono={false}>{s}</Pill>
								{i < IN.length - 1 && <Arrow length={18} />}
							</div>
						))}
					</div>
					<div style={{ border: `2px solid ${colors.black}`, padding: '6px 12px', fontFamily: fonts.mono, fontSize: 15, fontWeight: 700, textAlign: 'center', background: colors.warmBg }}>
						LOGGING · underneath every step
					</div>
				</motion.div>

				<Appear delay={0.7} style={{ display: 'flex', alignItems: 'center', padding: '0 14px' }}>
					<Arrow length={30} dashed />
				</Appear>

				<Appear delay={0.75} style={{ width: 300, display: 'flex' }}>
					<div style={{ flex: 1, border: `3px dashed ${colors.black}`, padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 12, opacity: 0.5 }}>
						<Chip tone="outline">OUT OF SCOPE</Chip>
						{OUT.map((s) => <span key={s} style={{ fontSize: 22, fontWeight: 700, textDecoration: 'line-through' }}>{s}</span>)}
					</div>
				</Appear>
			</div>

			<Appear delay={0.95}>
				<Callout style={{ fontSize: 28 }}>
					Key rule: <Mark>AI output is a draft until a human confirms it</Mark> <span style={{ fontWeight: 500 }}>(human-in-the-loop, HITL)</span>
				</Callout>
			</Appear>
		</Frame>
	);
}
