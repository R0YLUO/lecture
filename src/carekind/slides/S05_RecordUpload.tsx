import { colors, fonts } from '../../components/ui';
import { Frame, Node, Chip, Arrow, Appear, Num, Pill } from '../kit';

/**
 * Record and upload
 *
 * Speaker notes:
 * Everything on the left happens in the browser. First we ask for microphone permission, and we must handle the case where the nurse says no.
 * Recording and stopping happen in the browser. Before upload we check the format and size, so bad files fail early.
 * Then the audio is uploaded to our backend, and only the backend talks to the speech provider.
 * The crossed-out path matters: the browser never talks to the speech provider directly — that keeps secrets on the server.
 */
const STEPS = ['Mic permission', 'Record / stop', 'Check format + size'];
const CAPTIONS = [
	<>Ask for microphone permission; handle <strong>"denied"</strong>.</>,
	'Record and stop in the browser.',
	'Check format and size before upload.',
	<>Upload to the backend; the browser <strong>never</strong> talks to the speech provider.</>,
];

export default function S05_RecordUpload() {
	return (
		<Frame section={1} title="Record and upload" gap={30}>
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<Appear delay={0.15} style={{ display: 'flex' }}>
						<Node style={{ gap: 10, padding: '14px 18px' }}>
							<Chip>BROWSER</Chip>
							{STEPS.map((s, i) => (
								<div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
									<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
										<div style={{ display: 'flex', alignItems: 'center', gap: 10, border: `3px solid ${colors.black}`, padding: '8px 14px', background: colors.warmBg, width: 300 }}>
											<Num n={i + 1} />
											<span style={{ fontFamily: fonts.heading, fontSize: 21, fontWeight: 800, whiteSpace: 'nowrap' }}>{s}</span>
										</div>
										{i === 0 && <><Arrow length={18} /><Pill dashed size={14}>denied → handled</Pill></>}
									</div>
									{i < STEPS.length - 1 && <Arrow vertical length={12} style={{ marginLeft: 30 }} />}
								</div>
							))}
						</Node>
					</Appear>
					<Appear delay={0.45} style={{ display: 'flex', alignItems: 'center', gap: 6, margin: '0 12px' }}>
						<Num n={4} />
						<Arrow length={90} label="upload audio" />
					</Appear>
					<Appear delay={0.55} style={{ display: 'flex' }}>
						<Node tone="accent" label="Backend" sub="holds the secrets" size={26} style={{ width: 200 }} />
					</Appear>
					<Appear delay={0.65} style={{ display: 'flex', alignItems: 'center' }}>
						<Arrow length={50} style={{ margin: '0 12px' }} />
						<Node label="Speech provider" size={22} style={{ borderStyle: 'dashed', width: 180 }} />
					</Appear>
				</div>
				<Appear delay={0.85} style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 20 }}>
					<span style={{ fontFamily: fonts.mono, fontSize: 15, fontWeight: 700, whiteSpace: 'nowrap' }}>Browser</span>
					<Arrow length={900} crossed />
					<span style={{ fontFamily: fonts.mono, fontSize: 15, fontWeight: 700, whiteSpace: 'nowrap' }}>Speech provider</span>
				</Appear>
			</div>

			<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 40px' }}>
				{CAPTIONS.map((c, i) => (
					<Appear key={i} delay={1 + i * 0.08} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 22, fontWeight: 500 }}>
						<Num n={i + 1} /><span>{c}</span>
					</Appear>
				))}
			</div>
		</Frame>
	);
}
