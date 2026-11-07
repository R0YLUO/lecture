import { CodeBlock } from '../../components/CodeBlock';
import { Frame, Node, Chip, Arrow, Appear, Pill } from '../kit';

/**
 * The adapter contract
 *
 * Speaker notes:
 * This is the whole contract every adapter must follow: one method, transcribe, taking audio, a language code and the trace.
 * On the right is the same contract as a picture: three things go in, and exactly one of two things comes out.
 * Success is a TranscriptionResult with the text, words with confidence, provider, model, language, latency and request ID.
 * Failure is one of a fixed set of types: Timeout, UnsupportedFormat, EmptyAudio, ProviderError and Network.
 * Each adapter maps its provider's own errors into these types, so the rest of the app handles failures one way.
 */
const CODE = `
interface SpeechToText {
  transcribe(audio: AudioRef, language: LanguageCode,
    trace: RequestTrace): Promise<TranscriptionResult>;
}
// TranscriptionResult: text, words + confidence, provider,
//   model, language, latencyMs, requestId
// Failures: Timeout | UnsupportedFormat | EmptyAudio
//   | ProviderError | Network`;

const RESULT = ['text', 'words + confidence', 'provider', 'model', 'language', 'latencyMs', 'requestId'];
const FAILURES = ['Timeout', 'UnsupportedFormat', 'EmptyAudio', 'ProviderError', 'Network'];

export default function S14_AdapterContract() {
	return (
		<Frame section={2} title="The adapter contract">
			<div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
				<CodeBlock code={CODE} lang="ts" title="SPEECH-TO-TEXT.TS" fontSize={17} style={{ flex: 12 }} />
				<div style={{ flex: 8, display: 'flex', flexDirection: 'column', gap: 10 }}>
					<Appear delay={0.6}>
						<Node style={{ gap: 8 }}>
							<Chip tone="outline">IN</Chip>
							<div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
								{['audio: AudioRef', 'language: LanguageCode', 'trace: RequestTrace'].map((x) => <Pill key={x} size={15}>{x}</Pill>)}
							</div>
						</Node>
					</Appear>
					<Appear delay={0.7} style={{ display: 'flex', justifyContent: 'center' }}><Arrow vertical length={22} label="one of two outcomes" /></Appear>
					<Appear delay={0.8}>
						<Node style={{ gap: 8 }}>
							<Chip>OK · TranscriptionResult</Chip>
							<div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
								{RESULT.map((x) => <Pill key={x} size={15}>{x}</Pill>)}
							</div>
						</Node>
					</Appear>
					<Appear delay={0.9}>
						<Node style={{ gap: 8 }}>
							<Chip tone="accent">FAILURE · one fixed set</Chip>
							<div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
								{FAILURES.map((x) => <Pill key={x} size={15} dashed>{x}</Pill>)}
							</div>
						</Node>
					</Appear>
				</div>
			</div>
		</Frame>
	);
}
