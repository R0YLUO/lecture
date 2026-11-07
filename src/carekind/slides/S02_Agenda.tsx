import { motion } from 'framer-motion';
import { colors, fonts } from '../../components/ui';
import { Frame, Node, Arrow, accent } from '../kit';

/**
 * Agenda
 *
 * Speaker notes:
 * We have four parts today. First we run through the feature and its requirements, so we know what "done" looks like.
 * Then the technical design: the layers, the trace, the adapter, and how it scales.
 * Then how we test it. Last, the coding agent fundamentals — skills and agents — that we use to build it.
 */
const ITEMS = [
	{ title: 'Feature and requirements run-through', sub: 'Record → Upload → Transcribe → Edit → Save → Log' },
	{ title: 'Technical design', sub: 'Layers · trace · adapter · scale' },
	{ title: 'Test strategy', sub: 'Happy path · empty audio · PII' },
	{ title: 'Coding agent fundamentals', sub: 'Skills · agents' },
];

export default function S02_Agenda() {
	return (
		<Frame section={0} title="Agenda" gap={56}>
			<div style={{ display: 'flex', alignItems: 'stretch' }}>
				{ITEMS.map((item, i) => (
					<motion.div
						key={item.title}
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.45, delay: 0.2 + i * 0.12 }}
						style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
						<Node style={{ flex: 1, alignSelf: 'stretch', minHeight: 300, justifyContent: 'flex-start', gap: 16 }}>
							<span style={{ fontFamily: fonts.mono, fontSize: 64, fontWeight: 700, color: accent, lineHeight: 1 }}>{String(i + 1).padStart(2, '0')}</span>
							<span style={{ fontFamily: fonts.heading, fontSize: 30, fontWeight: 800, lineHeight: 1.15 }}>{item.title}</span>
							<span style={{ marginTop: 'auto', fontFamily: fonts.mono, fontSize: 15, fontWeight: 700, lineHeight: 1.5, borderTop: `2px dashed ${colors.black}`, paddingTop: 12 }}>{item.sub}</span>
						</Node>
						{i < ITEMS.length - 1 && <Arrow length={24} style={{ margin: '0 8px' }} />}
					</motion.div>
				))}
			</div>
		</Frame>
	);
}
