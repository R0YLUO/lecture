import { colors, fonts } from '../../components/ui';
import { CodeBlock } from '../../components/CodeBlock';
import { Frame, Appear, Callout, Node, Chip, Pill, accent } from '../kit';

/**
 * What is a trace?
 *
 * Speaker notes:
 * Here is the trace as a type. traceId is one ID for the whole recording's journey; jobId is the transcription job; audioId is the stored audio file.
 * actorId says who triggered it — as an ID only, never a name. attempt is 1 for the first call and 2 for a retry.
 * deadlineMs is the timeout the adapter enforces.
 * The test for anything in the trace: if you wouldn't want it in a log, it isn't in the trace.
 */
const CODE = `
type RequestTrace = {
  traceId: string;    // one ID for the whole recording's journey
  jobId: string;      // the transcription job
  audioId: string;    // the stored audio file
  actorId: string;    // who triggered it (ID only)
  attempt: number;    // 1 = first call, 2 = retry
  deadlineMs: number; // timeout the adapter enforces
};`;

export default function S12_WhatIsTrace() {
	return (
		<Frame section={2} title="What is a trace?" gap={24}>
			<div style={{ display: 'flex', gap: 24, alignItems: 'stretch' }}>
				<CodeBlock code={CODE} lang="ts" title="REQUEST-TRACE.TS" fontSize={19} style={{ flex: 1 }} />
				<div style={{ width: 340, display: 'flex', flexDirection: 'column', gap: 16 }}>
					<Appear delay={0.6} style={{ flex: 1, display: 'flex' }}>
						<Node style={{ flex: 1 }}>
							<Chip>✓ IN THE TRACE</Chip>
							<div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
								{['IDs', 'attempt', 'deadline'].map((x) => <Pill key={x} size={16}>{x}</Pill>)}
							</div>
						</Node>
					</Appear>
					<Appear delay={0.75} style={{ flex: 1, display: 'flex' }}>
						<Node style={{ flex: 1, borderColor: accent }}>
							<Chip tone="accent">✕ NEVER IN THE TRACE</Chip>
							<div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
								{['transcript text', 'names'].map((x) => (
									<span key={x} style={{ fontFamily: fonts.mono, fontSize: 20, fontWeight: 700, textDecoration: 'line-through', textDecorationColor: accent, textDecorationThickness: 3, color: colors.black }}>{x}</span>
								))}
							</div>
						</Node>
					</Appear>
				</div>
			</div>
			<Appear delay={0.9}>
				<Callout style={{ fontSize: 28 }}>IDs only — if you wouldn't want it in a log, it isn't in the trace.</Callout>
			</Appear>
		</Frame>
	);
}
