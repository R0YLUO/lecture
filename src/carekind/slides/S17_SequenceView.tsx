import { fonts } from '../../components/ui';
import { Frame, SequenceDiagram, Chain, Appear, type Participant, type Message } from '../kit';

/**
 * Feature design: transcribe + edit (sequence view)
 *
 * Speaker notes:
 * Here is the same feature in time order; the red steps are the confirmation. The nurse records and stops; the browser uploads the audio; the backend transcribes through the adapter and returns transcript v1, which is editable.
 * The nurse edits the text, the browser saves the edit, and the backend stores it as version v2.
 * When the nurse confirms, the browser confirms v2, and the backend saves the confirmation and the audit record.
 * Underneath is the screen's state: idle, recording, uploading, transcribing, editable, confirmed — and from any step it can go to failed or manual entry.
 */
const P: Participant[] = [
	{ id: 'n', label: 'Nurse', actor: true },
	{ id: 'b', label: 'Browser' },
	{ id: 'be', label: 'Backend' },
];
const M: Message[] = [
	{ from: 'n', to: 'b', text: 'Record and stop' },
	{ from: 'b', to: 'be', text: 'Upload audio' },
	{ from: 'be', to: 'be', text: 'Transcribe (via adapter)' },
	{ from: 'be', to: 'b', text: 'Transcript v1 (editable)', reply: true },
	{ from: 'n', to: 'b', text: 'Edit text' },
	{ from: 'b', to: 'be', text: 'Save edit' },
	{ from: 'be', to: 'be', text: 'Save version v2' },
	{ from: 'n', to: 'b', text: 'Confirm', highlight: true },
	{ from: 'b', to: 'be', text: 'Confirm v2', highlight: true },
	{ from: 'be', to: 'be', text: 'Save confirmation + audit record', highlight: true },
	{ from: 'be', to: 'b', text: 'Confirmed', reply: true },
];

export default function S17_SequenceView() {
	return (
		<Frame section={2} title="Transcribe + edit: sequence view" gap={12}>
			<SequenceDiagram participants={P} messages={M} width={1150} row={37} headerH={56} fontSize={16} />
			<Appear delay={1.2} style={{ display: 'flex', alignItems: 'center', gap: 20, alignSelf: 'center' }}>
				<Chain steps={['Idle', 'Recording', 'Uploading', 'Transcribing', 'Editable', 'Confirmed']} highlight={[5]} size={16} arrow={22} delay={1.2} />
				<span style={{ fontFamily: fonts.mono, fontSize: 15, fontWeight: 700 }}>any step → Failed or Manual entry</span>
			</Appear>
		</Frame>
	);
}
