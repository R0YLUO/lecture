import type { ReactNode } from 'react';
import { colors, fonts } from '../../components/ui';
import { Frame, Node, Chip, Appear, Callout, Arrow, accent } from '../kit';

/**
 * Test strategy
 *
 * Speaker notes:
 * Each test has the same shape: what we do, and what we expect.
 * The happy path end to end: record, upload, transcribe, confirm — then check the confirmed version and its audit record exist.
 * The empty-audio edge case: send silence or noise and check the system says "no speech" with no made-up words. Speech models can invent text on silence, so this matters.
 * The PII check is manual, through the logs: run a recording with invented names, search the logs, and make sure neither the names nor the transcript text appear.
 * And test data is always synthetic.
 */
type Check = { ok: boolean; text: string };
const COLS: { icon: string; tag: string; title: string; doIt: string; expect: Check[]; note?: string }[] = [
	{ icon: '▶', tag: 'HAPPY PATH · END-TO-END', title: 'Record → confirm', doIt: 'Record → upload → transcribe → confirm',
		expect: [{ ok: true, text: 'Confirmed version exists' }, { ok: true, text: 'Its audit record exists' }] },
	{ icon: '🔇', tag: 'EDGE CASE', title: 'Empty audio', doIt: 'Send silence or noise',
		expect: [{ ok: true, text: 'Shows "no speech"' }, { ok: false, text: 'No made-up words' }], note: 'Speech models can invent text on silence.' },
	{ icon: '🔍', tag: 'PII CHECK · MANUAL', title: 'Through the logs', doIt: 'Run a recording with invented names, then search the logs',
		expect: [{ ok: false, text: 'Names do not appear' }, { ok: false, text: 'Transcript text does not appear' }] },
];

function Row({ label, children }: { label: string; children: ReactNode }) {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
			<span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, letterSpacing: 2, opacity: 0.7 }}>{label}</span>
			{children}
		</div>
	);
}

export default function S18_TestStrategy() {
	return (
		<Frame section={3} title="Test strategy" gap={24}>
			<div style={{ display: 'flex', gap: 22 }}>
				{COLS.map((c, i) => (
					<Appear key={c.tag} delay={0.2 + i * 0.15} style={{ flex: 1, display: 'flex' }}>
						<Node style={{ flex: 1, justifyContent: 'flex-start', gap: 14, padding: 0 }}>
							<div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', borderBottom: `3px solid ${colors.black}`, background: i === 1 ? accent : colors.warmBg, color: i === 1 ? colors.white : colors.black }}>
								<span style={{ fontSize: 34, lineHeight: 1 }}>{c.icon}</span>
								<div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
									<span style={{ fontFamily: fonts.mono, fontSize: 12, fontWeight: 700, letterSpacing: 1.5 }}>{i + 1} · {c.tag}</span>
									<span style={{ fontFamily: fonts.heading, fontSize: 28, fontWeight: 800 }}>{c.title}</span>
								</div>
							</div>
							<div style={{ padding: '0 18px 18px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
								<Row label="DO"><span style={{ fontSize: 21, fontWeight: 600, lineHeight: 1.35 }}>{c.doIt}</span></Row>
								<Arrow vertical length={18} style={{ alignSelf: 'flex-start', marginLeft: 6 }} />
								<Row label="EXPECT">
									{c.expect.map((e) => (
										<span key={e.text} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 21, fontWeight: 700 }}>
											<span style={{ width: 26, height: 26, flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${colors.black}`, background: e.ok ? colors.black : accent, color: colors.white, fontSize: 15 }}>{e.ok ? '✓' : '✕'}</span>
											{e.text}
										</span>
									))}
								</Row>
								{c.note && <span style={{ marginTop: 'auto', fontSize: 17, fontWeight: 700, borderTop: `2px dashed ${colors.black}`, paddingTop: 10 }}>⚠ {c.note}</span>}
							</div>
						</Node>
					</Appear>
				))}
			</div>
			<Appear delay={0.8}>
				<Callout style={{ alignSelf: 'center', textAlign: 'center' }}>Test data is always synthetic.</Callout>
			</Appear>
		</Frame>
	);
}
