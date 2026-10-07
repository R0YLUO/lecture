import { motion } from 'framer-motion';
import { Slide, Inner, Title, Grid, colors, fonts, border, shadow } from '../../ui';

/**
 * Basic concepts · LLM / API / Function / Tool Use
 *
 * Speaker notes:
 * An LLM is a large language model. It can only take data in and put data out — on its own it can't touch the outside world — but it is the brain of an AI agent.
 * Just like the human brain: our thoughts can't interact with the outside world directly; we interact through our body.
 * An API is how two systems communicate. You and I are two systems, and the way we communicate is the language we speak. An API is the language between two software systems.
 * A function is a piece of code. Software uses a function to run some code and execute some logic. It can pass data into the function,
 * the function does something with that data, and it may return some data. Compare it to your arm: its job might be to lift something.
 * Our nerves feed in some energy, and out comes some sweat. And of course, an API call can be made inside a function —
 * just like I use my mouth (a function of my body) and language (the human API) to talk with you.
 * Tool use is how an AI system combines these concepts to let the model interact with the outside world — just like our brain uses our mouth and language to communicate with people.
 */
const CONCEPTS = [
	{ icon: '🧠', name: 'LLM', def: 'Stateless text predictions', color: colors.purple },
	{ icon: '💪', name: 'Function', def: 'Code that a program can run', color: colors.orange },
	{ icon: '↔️', name: 'API', def: 'How software systems talk to each other', color: colors.blue },
	{ icon: '🦾', name: 'Tool Use', def: 'Method to enable LLMs to interact with the outside world', color: colors.green },
];

export default function S04_Concepts() {
	return (
		<Slide bg={colors.white}>
			<Inner style={{ flexDirection: 'column', justifyContent: 'center' }}>
				<motion.div
					initial={{ opacity: 0, y: -16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.45 }}
					style={{ marginBottom: 32 }}>
					<div style={{
						display: 'inline-block', padding: '4px 12px', marginBottom: 16,
						background: colors.yellow, fontFamily: fonts.mono, fontSize: 13,
						fontWeight: 700, letterSpacing: 2, border,
					}}>
						02 · BASIC CONCEPTS
					</div>
					<Title size="56px">Some basic concepts</Title>
				</motion.div>

				<Grid cols={4} gap={24}>
					{CONCEPTS.map((c, i) => (
						<motion.div
							key={c.name}
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.45, delay: 0.2 + i * 0.12 }}
							style={{
								background: colors.white, border, boxShadow: shadow,
								display: 'flex', flexDirection: 'column', minHeight: 200,
							}}>
							<div style={{
								background: c.color, borderBottom: border, padding: '20px 20px 16px',
								display: 'flex', alignItems: 'center', gap: 12,
							}}>
								<span style={{ fontSize: 40, lineHeight: 1 }}>{c.icon}</span>
								<span style={{ fontFamily: fonts.heading, fontSize: 30, fontWeight: 900, color: colors.black, letterSpacing: -0.5 }}>{c.name}</span>
							</div>
							<div style={{ padding: '20px 20px 24px' }}>
								<p style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.4 }}>{c.def}</p>
							</div>
						</motion.div>
					))}
				</Grid>
			</Inner>
		</Slide>
	);
}
