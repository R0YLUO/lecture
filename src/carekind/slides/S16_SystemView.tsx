import { colors, fonts } from '../../components/ui';
import { Frame, Node, Chip, Arrow, Appear, Num } from '../kit';

/**
 * Feature design: transcribe + edit (system view)
 *
 * Speaker notes:
 * At the system level, this feature is only two boxes: the browser and the backend. The provider is a small external box behind the backend.
 * The browser records, uploads, shows the review screen with audio, raw text and editable text, and sends the confirmation.
 * The backend runs the transcription service, stores transcript versions, saves the confirmation and audit record, and writes logs.
 * Read the arrows top to bottom, one to four: upload audio, transcript v1 back, save edit as a new version, and confirm a version.
 */
const BROWSER = ['Record', 'Upload', 'Review screen', 'Confirm'];
const BACKEND = ['Transcription service', 'Transcript versions', 'Confirmation + audit', 'Logs'];
const ARROWS: { label: string; back?: boolean }[] = [
	{ label: 'upload audio' },
	{ label: 'transcript v1', back: true },
	{ label: 'save edit → new version' },
	{ label: 'confirm version' },
];

function Item({ text, sub }: { text: string; sub?: string }) {
	return (
		<div style={{ border: `2px solid ${colors.black}`, padding: '8px 12px', background: colors.white, color: colors.black }}>
			<div style={{ fontSize: 21, fontWeight: 700 }}>{text}</div>
			{sub && <div style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, opacity: 0.7 }}>{sub}</div>}
		</div>
	);
}

export default function S16_SystemView() {
	return (
		<Frame section={2} title="Transcribe + edit: system view">
			<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
				<Appear delay={0.2} style={{ display: 'flex' }}>
					<Node style={{ width: 380, gap: 10 }}>
						<Chip>BROWSER</Chip>
						{BROWSER.map((b) => <Item key={b} text={b} sub={b === 'Review screen' ? 'audio · raw text · editable text' : undefined} />)}
					</Node>
				</Appear>
				<div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
					{ARROWS.map((a, i) => (
						<Appear key={a.label} delay={0.5 + i * 0.15} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
							<Num n={i + 1} />
							<Arrow label={a.label} length={220} dashed={a.back} reverse={a.back} />
						</Appear>
					))}
				</div>
				<Appear delay={0.3} style={{ display: 'flex' }}>
					<Node tone="accent" style={{ width: 380, gap: 10 }}>
						<Chip>BACKEND</Chip>
						{BACKEND.map((b) => <Item key={b} text={b} />)}
					</Node>
				</Appear>
				<Appear delay={1.1} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
					<Arrow length={26} />
					<Node label="Provider" sub="external" size={17} style={{ padding: '8px 12px', borderStyle: 'dashed', boxShadow: 'none' }} />
				</Appear>
			</div>
		</Frame>
	);
}
