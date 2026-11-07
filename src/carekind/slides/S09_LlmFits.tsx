import { colors, fonts } from '../../components/ui';
import { Frame, Node, Chip, Arrow, Appear, Pill } from '../kit';

/**
 * Where an LLM service fits
 *
 * Speaker notes:
 * Speech-to-text is not an LLM. It is a specialised speech model that turns audio into words, and it is what we build today.
 * Between the two services sits the nurse: nothing moves on until a human has confirmed the transcript.
 * The LLM service is the next stage: it takes a confirmed transcript and writes a draft progress note. It only ever receives confirmed text — never raw speech-to-text output.
 * The same adapter idea we use today for speech-to-text applies to the LLM service later.
 */
export default function S09_LlmFits() {
	return (
		<Frame section={1} title="Where an LLM service fits" gap={40}>
			<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
				<Appear delay={0.2} style={{ display: 'flex', position: 'relative' }}>
					<Node tone="accent" style={{ width: 340, minHeight: 230, gap: 10 }}>
						<Chip>TODAY</Chip>
						<span style={{ fontFamily: fonts.heading, fontSize: 32, fontWeight: 800 }}>Speech-to-text service</span>
						<span style={{ fontFamily: fonts.mono, fontSize: 20, fontWeight: 700 }}>audio → words</span>
						<span style={{ fontSize: 19, fontWeight: 600 }}>Specialised speech model</span>
					</Node>
					<span style={{ position: 'absolute', top: -16, right: -14, transform: 'rotate(4deg)' }}><Pill tone="dark" size={14}>NOT AN LLM</Pill></span>
				</Appear>
				<Appear delay={0.4}><Arrow length={34} style={{ margin: '0 8px' }} /></Appear>
				<Appear delay={0.5} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
					<Pill tone="accent" size={14}>👤 NURSE CONFIRMS</Pill>
					<Node style={{ width: 210, alignItems: 'center', textAlign: 'center' }} label="Confirmed transcript" sub="the trusted input" />
				</Appear>
				<Appear delay={0.65}><Arrow length={150} label="only after human confirmation" style={{ margin: '0 8px' }} /></Appear>
				<Appear delay={0.8} style={{ display: 'flex' }}>
					<Node tone="muted" style={{ width: 340, minHeight: 230, gap: 10 }}>
						<Chip tone="outline">NEXT</Chip>
						<span style={{ fontFamily: fonts.heading, fontSize: 32, fontWeight: 800 }}>LLM service</span>
						<span style={{ fontFamily: fonts.mono, fontSize: 19, fontWeight: 700 }}>confirmed transcript → draft progress note</span>
					</Node>
				</Appear>
			</div>
			<Appear delay={1} style={{ alignSelf: 'center', display: 'flex', alignItems: 'center', gap: 12, fontSize: 21, fontWeight: 600, color: colors.dark }}>
				<Pill size={14}>ADAPTER</Pill> Same adapter idea, next stage.
			</Appear>
		</Frame>
	);
}
