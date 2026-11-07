import { colors, fonts } from '../../components/ui';
import { Frame, Node, Chip, Arrow, Appear, Pill, accent } from '../kit';

/**
 * Transcribe
 *
 * Speaker notes:
 * On the backend, transcription is one function call: transcribe with the audio, the language, and a trace.
 * When it works it returns the text plus metadata: a confidence score for each word, the provider, the exact model, language, latency and the provider's request ID.
 * Words with low confidence are flagged so the nurse knows where to look — like the dashed word in this invented example.
 * We also plan for failure: timeouts, unsupported formats, empty audio and provider errors are all expected outcomes, not surprises.
 */
const INPUTS = ['audio', 'language', 'trace'];
const RETURNS = ['text', 'confidence per word', 'provider', 'exact model', 'language', 'latency', 'request ID'];
const FAILURES = ['Timeout', 'Unsupported format', 'Empty audio', 'Provider error'];

export default function S06_Transcribe() {
	return (
		<Frame section={1} title="Transcribe" gap={34}>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<Appear delay={0.15} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
					{INPUTS.map((x) => <Pill key={x} size={20}>{x}</Pill>)}
				</Appear>
				<Appear delay={0.3}><Arrow length={44} style={{ margin: '0 10px' }} /></Appear>
				<Appear delay={0.35}>
					<Node tone="dark" style={{ padding: '22px 26px' }}>
						<span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, letterSpacing: 2, opacity: 0.7 }}>BACKEND · ONE FUNCTION</span>
						<span style={{ fontFamily: fonts.mono, fontSize: 28, fontWeight: 700 }}>transcribe()</span>
					</Node>
				</Appear>
				<div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginLeft: 10, flex: 1 }}>
					<Appear delay={0.55} style={{ display: 'flex', alignItems: 'center' }}>
						<Arrow length={44} label="ok" style={{ marginRight: 10 }} />
						<Node style={{ flex: 1 }}>
							<Chip>RETURNS · TranscriptionResult</Chip>
							<div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
								{RETURNS.map((r) => <Pill key={r} size={16}>{r}</Pill>)}
							</div>
						</Node>
					</Appear>
					<Appear delay={0.7} style={{ display: 'flex', alignItems: 'center' }}>
						<Arrow length={44} dashed label="fails" style={{ marginRight: 10 }} />
						<Node style={{ flex: 1 }}>
							<Chip tone="accent">FAILURES · handled explicitly</Chip>
							<div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
								{FAILURES.map((r) => <Pill key={r} size={16} dashed>{r}</Pill>)}
							</div>
						</Node>
					</Appear>
				</div>
			</div>

			<Appear delay={0.95}>
				<div style={{ display: 'flex', alignItems: 'center', gap: 22, border: `3px solid ${colors.black}`, background: colors.warmBg, padding: '16px 22px' }}>
					<Chip>EXAMPLE</Chip>
					<span style={{ fontSize: 28, fontWeight: 600 }}>
						Resident A had breakfast in{' '}
						<span style={{ borderBottom: `4px dashed ${accent}`, color: accent, fontWeight: 800 }}>Room 12</span>
					</span>
					<span style={{ marginLeft: 'auto', fontFamily: fonts.mono, fontSize: 15, fontWeight: 700 }}>
						<span style={{ color: accent }}>- - -</span> low confidence → flagged for the nurse
					</span>
				</div>
			</Appear>
		</Frame>
	);
}
