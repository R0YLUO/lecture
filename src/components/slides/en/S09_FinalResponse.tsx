import { motion } from 'framer-motion';
import { Slide, Inner, Title, colors, fonts, border, shadowSm } from '../../ui';
import { CodeBlock } from '../../CodeBlock';

/**
 * Final loop iteration · no tool request, answer directly
 *
 * Speaker notes (continuing from the previous slide):
 * Once the goal is reached, or the model has enough information to answer the user's question, it stops requesting tools.
 * If an iteration comes back with no tool request, we can stop the loop and return the model's output to the user.
 */
const RESPONSE = `
{
  "tool_call": null,
  "text": "I have successfully sent today's email."
}
`;

const STEPS = [
	{ k: 'Model', v: 'tool_call is null: goal reached, no more tools needed', color: colors.blue },
	{ k: 'Code', v: 'Takes the else branch → return response.text, loop ends', color: colors.green },
	{ k: 'You', v: 'Get "Today\'s email has been sent" and head home for dinner', color: colors.yellow },
];

export default function S09_FinalResponse() {
	return (
		<Slide bg={colors.white}>
			<Inner style={{ flexDirection: 'column', justifyContent: 'center', gap: 26 }}>
				<motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
					style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
					<span style={{
						padding: '6px 14px', background: colors.black, color: colors.yellow,
						fontFamily: fonts.mono, fontSize: 14, fontWeight: 700, letterSpacing: 2,
					}}>FINAL</span>
					<Title size="44px">No tool request: <span style={{ background: colors.green, padding: '0 14px' }}>stop the loop and answer</span></Title>
				</motion.div>

				<motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.2 }}>
					<CodeBlock code={RESPONSE} lang="json" title="response.json" fontSize={22} delay={0.4} />
				</motion.div>

				<div style={{ display: 'flex', gap: 20 }}>
					{STEPS.map((s, i) => (
						<motion.div
							key={s.k}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: 0.75 + i * 0.14 }}
							style={{ flex: 1, display: 'flex', alignItems: 'stretch', background: colors.white, border, boxShadow: shadowSm }}>
							<span style={{
								display: 'flex', alignItems: 'center', padding: '0 16px', background: s.color, borderRight: border,
								fontFamily: fonts.mono, fontSize: 15, fontWeight: 700, whiteSpace: 'nowrap',
							}}>{s.k}</span>
							<span style={{ padding: '14px 16px', fontSize: 18, lineHeight: 1.5, fontWeight: 600 }}>{s.v}</span>
						</motion.div>
					))}
				</div>
			</Inner>
		</Slide>
	);
}
