import { motion } from 'framer-motion';
import { fonts } from '../../components/ui';
import { Frame, Node, Arrow, Appear, Callout, Pill, accent } from '../kit';

/**
 * The feature at a glance
 *
 * Speaker notes:
 * Record: the nurse speaks their observation into the browser. Upload: the audio goes to our backend.
 * Transcribe: the backend asks a speech-to-text service to turn audio into words.
 * Edit: the nurse reviews and corrects the text — this is the human-in-the-loop step.
 * Save: the confirmed version is stored. Log: we record what happened, without any health information.
 * Notice the red steps: the nurse starts the flow and the nurse signs off on it. The nurse is the author of the record; the AI only drafts.
 */
const STEPS = [
	{ name: 'Record', icon: '🎙', nurse: true },
	{ name: 'Upload', icon: '⇪' },
	{ name: 'Transcribe', icon: '≋' },
	{ name: 'Edit (HITL)', icon: '✎', nurse: true },
	{ name: 'Save', icon: '▣' },
	{ name: 'Log', icon: '☰' },
];

export default function S04_FeatureFlow() {
	return (
		<Frame section={1} title="The feature at a glance" gap={44}>
			<div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
				{STEPS.map((s, i) => (
					<motion.div key={s.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 + i * 0.12 }}
						style={{ display: 'flex', alignItems: 'flex-start' }}>
						<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
							<Node tone={s.nurse ? 'accent' : 'plain'} style={{ width: 172, height: 160, alignItems: 'center', textAlign: 'center' }}>
								<span style={{ fontSize: 36, lineHeight: 1 }}>{s.icon}</span>
								<span style={{ fontFamily: fonts.mono, fontSize: 14, fontWeight: 700, opacity: 0.7 }}>{String(i + 1).padStart(2, '0')}</span>
								<span style={{ fontFamily: fonts.heading, fontSize: 25, fontWeight: 800 }}>{s.name}</span>
							</Node>
							<Pill tone={s.nurse ? 'accent' : 'muted'} size={13}>{s.nurse ? '👤 NURSE' : 'SYSTEM'}</Pill>
						</div>
						{i < STEPS.length - 1 && <Arrow length={30} style={{ margin: '0 8px', height: 160 }} />}
					</motion.div>
				))}
			</div>
			<Appear delay={1}>
				<Callout style={{ alignSelf: 'center', fontSize: 26 }}>
					The nurse is the <span style={{ color: accent, fontWeight: 800 }}>author</span> of the record. The AI only drafts.
				</Callout>
			</Appear>
		</Frame>
	);
}
