import { fonts } from '../../components/ui';
import { Frame, SequenceDiagram, Appear, Pill, type Participant, type Message } from '../kit';

/**
 * How the trace flows (sequence diagram)
 *
 * Speaker notes:
 * The browser creates a traceId when the nurse starts. The backend adds a jobId, audioId, actorId and attempt number.
 * The trace is a small object of IDs that travels with one recording, so every log line and audit record can be linked.
 * The adapter tags its logs with the trace and sets a timeout, starts the provider job named after the jobId, and records the outcome.
 * The red steps are where the trace is created, grows, and gets used. It never contains transcript text or names. Searching one traceId shows the whole journey.
 */
const P: Participant[] = [
	{ id: 'b', label: 'Browser' },
	{ id: 'be', label: 'Backend', sub: 'TranscriptionService' },
	{ id: 'a', label: 'Adapter', sub: 'TranscribeAdapter' },
	{ id: 'p', label: 'Provider' },
];
const M: Message[] = [
	{ from: 'b', to: 'b', text: 'Create traceId', highlight: true },
	{ from: 'b', to: 'be', text: 'Upload audio (traceId)' },
	{ from: 'be', to: 'be', text: 'Add jobId, audioId, actorId, attempt', highlight: true },
	{ from: 'be', to: 'a', text: 'transcribe(audio, language, trace)' },
	{ from: 'a', to: 'a', text: 'Tag logs with trace, set timeout', highlight: true },
	{ from: 'a', to: 'p', text: 'Start job (named after jobId)' },
	{ from: 'p', to: 'a', text: 'Transcript + provider requestId', reply: true },
	{ from: 'a', to: 'a', text: 'Record outcome (model, latency, requestId)' },
	{ from: 'a', to: 'be', text: 'TranscriptionResult', reply: true },
	{ from: 'be', to: 'be', text: 'AuditRecord carries traceId', highlight: true },
];

export default function S11_TraceSequence() {
	return (
		<Frame section={2} title="How the trace flows" gap={14}>
			<Appear delay={0.1} style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: fonts.mono, fontSize: 15, fontWeight: 700 }}>
				<Pill tone="accent" size={14}>red</Pill> = the trace is created, grows, or is used
			</Appear>
			<SequenceDiagram participants={P} messages={M} width={1300} row={48} />
		</Frame>
	);
}
