import { colors, fonts } from '../../components/ui';
import { Frame, Node, Arrow, Appear, Bullets, Callout, Pill } from '../kit';

/**
 * The adapter pattern
 *
 * Speaker notes:
 * App code talks to one interface, SpeechToText. Behind it sit three adapters: one for the cloud provider, one that runs Whisper locally, and a fake for tests.
 * Think of a travel power adapter: one plug, many sockets.
 * Each adapter translates the provider's API in and out, including its errors, so app code never sees provider details.
 * This is the Adapter pattern plus Dependency Inversion — the "D" in SOLID. Only the adapter knows the provider's SDK: that's the dashed boundary.
 */
const ADAPTERS = [
	{ name: 'TranscribeAdapter', sub: 'cloud provider' },
	{ name: 'WhisperLocalAdapter', sub: 'runs locally' },
	{ name: 'FakeSpeechToText', sub: 'tests' },
];

export default function S13_AdapterPattern() {
	return (
		<Frame section={2} title="The adapter pattern" gap={24}>
			<div style={{ display: 'flex', gap: 48, alignItems: 'center' }}>
				<div style={{ flex: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
					<Appear delay={0.15}><Node label="App code" style={{ width: 260, alignItems: 'center' }} /></Appear>
					<Appear delay={0.25}><Arrow vertical length={30} label="depends only on" /></Appear>
					<Appear delay={0.35} style={{ position: 'relative' }}>
						<Node tone="accent" label="SpeechToText" sub="one interface · the plug" mono size={26} style={{ width: 340, alignItems: 'center' }} />
						<span style={{ position: 'absolute', right: -70, top: 18 }}><Pill size={13} tone="dark">SOLID · D</Pill></span>
					</Appear>
					<Appear delay={0.45} style={{ width: '100%', display: 'flex', gap: 14, padding: '0 16px', margin: '4px 0' }}>
						{ADAPTERS.map((a) => <Arrow key={a.name} vertical length={30} reverse style={{ flex: 1 }} />)}
					</Appear>
					<Appear delay={0.55} style={{ width: '100%', position: 'relative', border: `3px dashed ${colors.black}`, padding: '24px 14px 14px' }}>
						<span style={{ position: 'absolute', top: -13, left: 14, background: colors.white, padding: '0 6px', fontFamily: fonts.mono, fontSize: 13, fontWeight: 700 }}>
							ONLY ADAPTERS KNOW THE PROVIDER SDK · the sockets
						</span>
						<div style={{ display: 'flex', gap: 14 }}>
							{ADAPTERS.map((a) => (
								<Node key={a.name} label={a.name} sub={a.sub} mono size={16} style={{ flex: 1, alignItems: 'center', textAlign: 'center', padding: '12px 8px' }} />
							))}
						</div>
					</Appear>
				</div>
				<div style={{ flex: 4, display: 'flex', flexDirection: 'column', gap: 24 }}>
					<Appear delay={0.75}>
						<Callout><span style={{ fontFamily: fonts.heading, fontWeight: 800 }}>🔌 Like a travel power adapter:</span> one plug, many sockets.</Callout>
					</Appear>
					<Bullets delay={0.9} size={23} items={[
						'App code depends only on the interface.',
						"Each adapter translates the provider's API in and out, including errors.",
						'Swap providers, run offline, or test without changing app code.',
					]} />
				</div>
			</div>
		</Frame>
	);
}
