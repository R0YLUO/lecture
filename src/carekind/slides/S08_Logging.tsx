import { motion } from 'framer-motion';
import { colors, fonts } from '../../components/ui';
import { Frame, Node, Chip, Arrow, Appear, Pill, Callout, accent } from '../kit';

/**
 * Logging
 *
 * Speaker notes:
 * At transcription time we log IDs, which provider and exact model ran, the language, latency, the provider's request ID, any failure type, and the audio's duration and size.
 * That is enough to debug and measure the system.
 * Logs are read by many people and many tools, so health information must never appear in them: no transcript text, no names, no filenames.
 * Think of the log as having a gate. Use an allow-list of fields that may pass, not a block-list of fields that may not — a block-list always misses something.
 */
const ALLOWED = [
	{ k: 'IDs', v: 'trace, job, audio, actor' },
	{ k: 'Service', v: 'provider, exact model, language' },
	{ k: 'Outcome', v: 'latency, provider request ID, failure type' },
	{ k: 'Audio', v: 'duration and size' },
];
const BLOCKED = ['transcript text', 'names', 'filenames'];

export default function S08_Logging() {
	return (
		<Frame section={1} title="Logging" gap={26}>
			<div style={{ display: 'flex', alignItems: 'stretch', gap: 0 }}>
				<Appear delay={0.15} style={{ width: 330, display: 'flex' }}>
					<Node style={{ flex: 1, gap: 10 }}>
						<Chip tone="outline">AT TRANSCRIPTION TIME</Chip>
						<span style={{ fontSize: 17, fontWeight: 600 }}>Everything the system knows:</span>
						<div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
							{ALLOWED.map((a) => <Pill key={a.k} size={15}>{a.k}</Pill>)}
							{BLOCKED.map((b) => <Pill key={b} size={15} dashed tone="accent">{b}</Pill>)}
						</div>
					</Node>
				</Appear>

				<Appear delay={0.35} style={{ display: 'flex', alignItems: 'center', padding: '0 10px' }}><Arrow length={36} /></Appear>

				<motion.div
					initial={{ opacity: 0, scaleY: 0 }}
					animate={{ opacity: 1, scaleY: 1 }}
					transition={{ duration: 0.45, delay: 0.45 }}
					style={{ width: 120, background: colors.black, color: colors.white, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, textAlign: 'center', padding: 10 }}>
					<span style={{ fontSize: 34, fontWeight: 900, color: accent }}>✓</span>
					<span style={{ fontFamily: fonts.mono, fontSize: 14, fontWeight: 700, letterSpacing: 1.5, lineHeight: 1.4 }}>ALLOW-<br />LIST</span>
				</motion.div>

				<Appear delay={0.6} style={{ display: 'flex', alignItems: 'center', padding: '0 10px' }}><Arrow length={36} /></Appear>

				<Appear delay={0.65} style={{ flex: 1, display: 'flex' }}>
					<Node tone="dark" style={{ flex: 1, gap: 12 }}>
						<span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, letterSpacing: 2, opacity: 0.7 }}>LOG · ONLY THESE FIELDS</span>
						{ALLOWED.map((a, i) => (
							<motion.div key={a.k} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 + i * 0.1 }}
								style={{ display: 'flex', gap: 16, alignItems: 'baseline', fontFamily: fonts.mono }}>
								<span style={{ fontSize: 16, fontWeight: 700, width: 90, flexShrink: 0, color: accent }}>{a.k}</span>
								<span style={{ fontSize: 19, fontWeight: 700 }}>{a.v}</span>
							</motion.div>
						))}
					</Node>
				</Appear>
			</div>

			<Appear delay={1.1}>
				<Callout style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 26 }}>
					<span style={{ fontWeight: 800 }}>Never logged:</span>
					{BLOCKED.map((b) => <span key={b} style={{ textDecoration: 'line-through', textDecorationThickness: 3, textDecorationColor: accent }}>{b}</span>)}
					<span style={{ marginLeft: 'auto', fontFamily: fonts.mono, fontSize: 16 }}>allow-list, not block-list</span>
				</Callout>
			</Appear>
		</Frame>
	);
}
