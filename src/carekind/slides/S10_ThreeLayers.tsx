import { colors, fonts } from '../../components/ui';
import { Frame, Node, Chip, Arrow, Appear, Pill } from '../kit';

/**
 * Three-layer architecture
 *
 * Speaker notes:
 * The frontend runs in the browser: recording, upload, and the review-and-confirm screen.
 * The API layer is our backend: the transcription service, versions, audit and logging. It holds all the secrets — that's the lock.
 * External services are the speech-to-text provider today, and an LLM provider later.
 * The crossed-out arrow on top is the shortcut we never take: the frontend never calls external services directly — everything goes through the API.
 * And the whole thing sits inside one boundary: data is processed in Australia.
 */
const LAYERS = [
	{ name: 'Frontend', where: 'BROWSER', items: ['Record', 'Upload', 'Review and confirm screen'] },
	{ name: 'API', where: 'BACKEND', items: ['Transcription service', 'Versions', 'Audit', 'Logging'] },
	{ name: 'External services', where: 'PROVIDERS', items: ['Speech-to-text provider', '(later: LLM provider)'] },
];

export default function S10_ThreeLayers() {
	return (
		<Frame section={2} title="Three-layer architecture" gap={22}>
			<Appear delay={0.9} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
				<Arrow length={760} crossed label="Frontend never calls external services directly" />
			</Appear>
			<div style={{ position: 'relative', border: `3px dashed ${colors.black}`, padding: '30px 24px 22px' }}>
				<span style={{ position: 'absolute', top: -16, left: 24, background: colors.white, padding: '0 8px' }}>
					<Pill size={14}>🇦🇺 DATA PROCESSED IN AUSTRALIA</Pill>
				</span>
				<div style={{ display: 'flex', alignItems: 'stretch' }}>
					{LAYERS.map((l, i) => (
						<Appear key={l.name} delay={0.2 + i * 0.15} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
							<Node tone={i === 1 ? 'accent' : 'plain'} style={{ flex: 1, alignSelf: 'stretch', justifyContent: 'flex-start', gap: 10, minHeight: 270 }}>
								<Chip tone={i === 1 ? 'dark' : 'outline'}>{l.where}</Chip>
								<span style={{ fontFamily: fonts.heading, fontSize: 34, fontWeight: 800 }}>{l.name}</span>
								{l.items.map((it) => <span key={it} style={{ fontSize: 21, fontWeight: 600 }}>· {it}</span>)}
								{i === 1 && (
									<span style={{ marginTop: 'auto', alignSelf: 'flex-start', background: colors.white, color: colors.black, border: `2px solid ${colors.black}`, padding: '4px 12px', fontFamily: fonts.mono, fontSize: 14, fontWeight: 700, whiteSpace: 'nowrap' }}>
										🔒 Secrets stay in the API layer
									</span>
								)}
							</Node>
							{i < LAYERS.length - 1 && <Arrow length={44} style={{ margin: '0 10px' }} />}
						</Appear>
					))}
				</div>
			</div>
		</Frame>
	);
}
