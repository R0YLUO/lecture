import { motion } from 'framer-motion';
import { colors, fonts } from '../../components/ui';
import { Frame, Node, Arrow, Appear, Pill, Callout, Mark, accent } from '../kit';

/**
 * Wrap-up
 *
 * Speaker notes:
 * Today we went from voice to a confirmed transcript, with an adapter, a trace and an audit trail.
 * Here is the same pipeline we started with, with each key idea pinned where it lives: no lost recordings at upload, the adapter at transcribe, human-in-the-loop at edit, the audit trail at save — and the trace, with IDs only, running under the whole journey.
 * Next time, the LLM service turns confirmed transcripts into draft notes — and the nurse still reviews and confirms.
 */
const STEPS = [
	{ name: 'Record' },
	{ name: 'Upload', pin: 'no lost recordings' },
	{ name: 'Transcribe', pin: 'adapter pattern' },
	{ name: 'Edit (HITL)', pin: 'human-in-the-loop', hot: true },
	{ name: 'Save', pin: 'audit trail' },
	{ name: 'Log' },
];

export default function S22_WrapUp() {
	return (
		<Frame section={5} title="Wrap-up" gap={30}>
			<Appear delay={0.1}>
				<span style={{ fontSize: 28, fontWeight: 600 }}><strong>Today:</strong> voice → confirmed transcript, with an adapter, a trace and an audit trail.</span>
			</Appear>

			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
				<div style={{ display: 'flex', alignItems: 'flex-start' }}>
					{STEPS.map((s, i) => (
						<motion.div key={s.name} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.25 + i * 0.08 }}
							style={{ display: 'flex', alignItems: 'flex-start' }}>
							<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, width: 168 }}>
								<Node tone={s.hot ? 'accent' : 'plain'} label={s.name} size={21} style={{ width: 168, alignItems: 'center', padding: '12px 8px' }} />
								{s.pin && (
									<motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 + i * 0.1 }}
										style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
										<span style={{ width: 3, height: 16, background: accent }} />
										<Pill size={14} tone={s.hot ? 'accent' : 'plain'}>{s.pin}</Pill>
									</motion.div>
								)}
							</div>
							{i < STEPS.length - 1 && <Arrow length={26} style={{ margin: '0 6px', height: 54 }} />}
						</motion.div>
					))}
				</div>
				<motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 1.4 }}
					style={{ transformOrigin: 'left', width: 1180, border: `3px dashed ${colors.black}`, padding: '6px 0', textAlign: 'center', fontFamily: fonts.mono, fontSize: 16, fontWeight: 700, background: colors.warmBg }}>
					trace with IDs only · runs under the whole journey
				</motion.div>
			</div>

			<Appear delay={1.7} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
				<Callout style={{ flex: 1, fontSize: 26 }}><Mark>Next</Mark> The LLM service turns confirmed transcripts into draft notes.</Callout>
				<Node tone="muted" label="LLM service" sub="confirmed transcript → draft note" size={20} />
			</Appear>
		</Frame>
	);
}
