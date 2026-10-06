import { motion } from 'framer-motion';
import { Slide, Inner, Title, colors, fonts, border, shadowSm } from '../../ui';
import { CodeBlock } from '../../CodeBlock';

/**
 * Later loop rounds · the model asks for the verify tool (human in the loop)
 *
 * Speaker notes (continuing from the previous slides):
 * Once the data is pulled and the email is written, the model asks for one more tool: verify, which hands the email
 * draft to a human to approve. We want a human in the loop — the email is never allowed to go out without the user's
 * approval. It only takes you 15 seconds to look over the finished email.
 */
const RESPONSE = `
{
  "tool_call": {
    "name": "verify",
    "inputs": {
      "email": "Dear boss, here are today's details...."
    }
  },
  "text": "I need to use the verify tool to get human verification on my email draft"
}
`;

const STEPS = [
	{ k: 'Model', v: 'Data gathered, email written → asks for the verify tool', color: colors.blue },
	{ k: 'You', v: 'Spend 15 seconds on the draft and approve it', color: colors.yellow },
	{ k: 'Rule', v: 'Human in the loop: no approval, no email', color: colors.red },
];

export default function S08_VerifyCall() {
	return (
		<Slide bg={colors.white}>
			<Inner style={{ flexDirection: 'column', justifyContent: 'center', gap: 26 }}>
				<motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
					style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
					<span style={{
						padding: '6px 14px', background: colors.black, color: colors.yellow,
						fontFamily: fonts.mono, fontSize: 14, fontWeight: 700, letterSpacing: 2,
					}}>ROUND N</span>
					<Title size="44px">One more tool call: <span style={{ background: colors.yellow, padding: '0 14px' }}>a human approves</span></Title>
				</motion.div>

				<motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.2 }}>
					<CodeBlock code={RESPONSE} lang="json" title="response.json" fontSize={20} delay={0.4} />
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
								color: s.color === colors.red ? colors.white : colors.black,
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
