import type { ReactNode } from 'react';
import { colors, fonts } from '../../components/ui';
import { Frame, Node, Arrow, Appear, Num } from '../kit';

/**
 * Distributed systems: scaling without losing recordings
 *
 * Speaker notes:
 * Picture many clinics and many nurses, all recording at once. The goal is simple: no lost recordings, and scale by adding workers.
 * The numbers on the diagram match the list. Audio is stored first and processed later. A queue feeds transcription workers, and we add workers to handle more load.
 * At the API, the same upload twice creates one job, not two. Failed jobs are retried with backoff and kept, never dropped.
 * Job state is durable, so a crash resumes from the last state, and if the network drops the device keeps the audio and retries.
 * Today's class code may run this synchronously; the design shows where it grows.
 */
function Tagged({ n, children }: { n: number[]; children: ReactNode }) {
	return (
		<div style={{ position: 'relative' }}>
			{children}
			<div style={{ position: 'absolute', top: -17, right: -14, display: 'flex', gap: 2 }}>{n.map((k) => <Num key={k} n={k} />)}</div>
		</div>
	);
}

const POINTS: ReactNode[] = [
	<><strong>Store first, process later:</strong> audio saved before transcription.</>,
	<><strong>Queue + workers:</strong> add workers for more recordings.</>,
	<><strong>Idempotency:</strong> same upload twice → one job, not two.</>,
	<><strong>Retries with backoff;</strong> failed jobs kept, never dropped.</>,
	<><strong>Durable job state:</strong> a crash resumes from the last state.</>,
	<><strong>Buffer on the device:</strong> network drop → keep audio, retry.</>,
];

export default function S15_Scaling() {
	return (
		<Frame section={2} title="Scaling without losing recordings" gap={26}>
			<Appear delay={0.1}>
				<span style={{ fontSize: 24, fontWeight: 600, color: colors.dark }}>Many clinics, many nurses, lots of recordings at once.</span>
			</Appear>
			<Appear delay={0.25} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 10 }}>
				<Tagged n={[6]}><Node label="Browsers" size={20} /></Tagged>
				<Arrow length={28} style={{ margin: '0 6px' }} />
				<Tagged n={[3]}><Node label="API" tone="accent" size={20} /></Tagged>
				<Arrow length={28} style={{ margin: '0 6px' }} />
				<div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
					<Tagged n={[1]}><Node label="Audio storage" size={18} style={{ padding: '8px 14px' }} /></Tagged>
					<Tagged n={[2]}><Node label="Job queue" size={18} style={{ padding: '8px 14px' }} /></Tagged>
				</div>
				<Arrow length={28} style={{ margin: '0 6px' }} />
				<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
					<Tagged n={[2, 4]}>
						<div style={{ position: 'relative', width: 270, height: 80 }}>
							{[2, 1, 0].map((k) => (
								<Node key={k} label={k === 0 ? 'Transcription workers' : ''} size={18}
									style={{ position: 'absolute', left: k * 10, top: k * 9, width: 250, height: 62, padding: '8px 14px' }} />
							))}
							<span style={{ position: 'absolute', right: -8, bottom: -10, fontFamily: fonts.mono, fontSize: 15, fontWeight: 700, background: colors.black, color: colors.white, padding: '0 6px' }}>×N</span>
						</div>
					</Tagged>
					<Arrow vertical length={14} />
					<Tagged n={[5]}><Node label="Job store" sub="state per job" size={17} style={{ padding: '6px 14px', borderStyle: 'dashed' }} /></Tagged>
				</div>
				<Arrow length={28} style={{ margin: '0 6px' }} />
				<Node label="Speech-to-text provider" size={18} />
			</Appear>
			<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px 28px' }}>
				{POINTS.map((p, i) => (
					<Appear key={i} delay={0.6 + i * 0.08} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 19, lineHeight: 1.35 }}>
						<Num n={i + 1} /><span>{p}</span>
					</Appear>
				))}
			</div>
		</Frame>
	);
}
