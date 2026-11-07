import type { ReactNode } from 'react';
import { colors, fonts, border, shadowSm } from '../../components/ui';
import { Frame, Node, Chip, Arrow, Appear, Mark, Pill, accent } from '../kit';

/**
 * Edit and save (human-in-the-loop)
 *
 * Speaker notes:
 * The review screen puts three things side by side: the audio to replay, the raw transcript, and an editable copy.
 * The nurse can edit, retry the transcription, delete it, or just type the observation manually.
 * Follow the timeline at the bottom: every edit saves a new version — nothing is ever overwritten, so we can always see what the AI produced and what the nurse changed.
 * Confirming creates an audit record: who confirmed which version, and when.
 * If someone edits a confirmed transcript, that becomes a new version that has to be confirmed again.
 */
const PANES = [
	{ tag: 'AUDIO PLAYBACK', body: '▶ ━━━━━○──── 0:12' },
	{ tag: 'RAW TRANSCRIPT', body: 'Resident A had breakfast in Room 12' },
	{ tag: 'EDITABLE TEXT', body: 'Resident A had breakfast in Room 12|' },
];
const ACTIONS = ['Edit', 'Retry', 'Delete', 'Type manually'];

function Version({ v, label, tone, children }: { v: string; label: string; tone: 'plain' | 'accent' | 'dashed'; children?: ReactNode }) {
	const s = tone === 'accent' ? { background: accent, color: colors.white } : { background: colors.white, color: colors.black };
	return (
		<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
			<div style={{ border: `3px ${tone === 'dashed' ? 'dashed' : 'solid'} ${colors.black}`, boxShadow: tone === 'dashed' ? 'none' : shadowSm, padding: '10px 18px', textAlign: 'center', minWidth: 150, ...s }}>
				<div style={{ fontFamily: fonts.mono, fontSize: 26, fontWeight: 700 }}>{v}</div>
				<div style={{ fontSize: 16, fontWeight: 700 }}>{label}</div>
			</div>
			{children}
		</div>
	);
}

export default function S07_EditSave() {
	return (
		<Frame section={1} title={<>Edit and save <Mark>human-in-the-loop</Mark></>} gap={22}>
			{/* review screen */}
			<Appear delay={0.15}>
				<div style={{ border, boxShadow: shadowSm, background: colors.white }}>
					<div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px', borderBottom: border, background: colors.warmBg }}>
						<span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>REVIEW SCREEN</span>
						<div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
							{ACTIONS.map((a) => <Pill key={a} size={13}>{a}</Pill>)}
							<Pill size={13} tone="accent">✓ Confirm</Pill>
						</div>
					</div>
					<div style={{ display: 'flex' }}>
						{PANES.map((p, i) => (
							<div key={p.tag} style={{ flex: 1, padding: '12px 16px', borderLeft: i ? border : 'none', display: 'flex', flexDirection: 'column', gap: 6, ...(i === 2 ? { outline: `4px solid ${accent}`, outlineOffset: -4 } : {}) }}>
								<span style={{ fontFamily: fonts.mono, fontSize: 12, fontWeight: 700, letterSpacing: 1.5, color: i === 2 ? accent : colors.black }}>{p.tag}</span>
								<span style={{ fontFamily: i === 0 ? fonts.mono : fonts.body, fontSize: 19, fontWeight: 600, opacity: i === 1 ? 0.6 : 1 }}>{p.body}</span>
							</div>
						))}
					</div>
				</div>
			</Appear>

			{/* version timeline */}
			<Appear delay={0.45}>
				<div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: 10 }}>
					<Version v="v1" label="raw draft" tone="dashed" />
					<Arrow length={70} label="edit" style={{ height: 70 }} />
					<Version v="v2" label="nurse edit" tone="plain" />
					<Arrow length={70} label="confirm" style={{ height: 70 }} />
					<Version v="✓ v2" label="confirmed" tone="accent">
						<Node style={{ padding: '8px 12px', gap: 2 }}>
							<Chip>AUDIT RECORD</Chip>
							{[['who', 'actorId'], ['which', 'v2'], ['when', 'timestamp']].map(([k, val]) => (
								<div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: 18, fontFamily: fonts.mono, fontSize: 15, fontWeight: 700 }}>
									<span style={{ color: accent }}>{k}</span><span>{val}</span>
								</div>
							))}
						</Node>
					</Version>
					<Arrow length={70} label="edit again" style={{ height: 70 }} />
					<Version v="v3" label="confirm again" tone="dashed" />
				</div>
			</Appear>

			<Appear delay={0.8} style={{ display: 'flex', justifyContent: 'center', gap: 14 }}>
				<Pill size={17} tone="dark">Every edit = new version</Pill>
				<Pill size={17} tone="dark">Nothing is overwritten</Pill>
			</Appear>
		</Frame>
	);
}
