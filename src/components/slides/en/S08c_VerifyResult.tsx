import { motion } from 'framer-motion';
import { Slide, Inner, Title, colors, fonts, border, shadowSm } from '../../ui';
import { CodeBlock } from '../../CodeBlock';

/**
 * Later loop rounds · the tool's response (verify's result is written back to messages)
 *
 * Speaker notes:
 * You clicked "Send" on the page, so the verify tool wraps your decision as a tool_result and writes it to the record.
 * Next round the model reads decision: send, knows a human has approved, and only then sends the email. If you had
 * clicked "Rewrite", your comments would be written here too, and the model would rewrite the draft with them and loop
 * again. Without this record, the email is not allowed to go out: that's human in the loop.
 */
const TOOL_RESULT = `
{
  "tool_result": {
    "name": "verify",
    "output": {
      "decision": "send",
      "email": "Dear boss, here are today's details....",
      "comments": null
    }
  }
}
`;

const STEPS = [
	{ k: 'You', v: 'Clicked Send → decision: send, the human step is done', color: colors.yellow },
	{ k: 'Record', v: 'Written to messages: the model sees your approval next round, then sends', color: colors.orange },
	{ k: 'If rewrite', v: 'Comments are written back too; the model rewrites and loops again', color: colors.blue },
];

export default function S08c_VerifyResult() {
	return (
		<Slide bg={colors.white}>
			<Inner style={{ flexDirection: 'column', justifyContent: 'center', gap: 26 }}>
				<motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
					style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
					<span style={{
						padding: '6px 14px', background: colors.black, color: colors.yellow,
						fontFamily: fonts.mono, fontSize: 14, fontWeight: 700, letterSpacing: 2,
					}}>ROUND N · TOOL RESULT</span>
					<Title size="44px">verify's response: <span style={{ background: colors.green, padding: '0 14px' }}>approved, OK to send</span></Title>
				</motion.div>

				<motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.2 }}>
					<CodeBlock code={TOOL_RESULT} lang="json" title="tool_result.json" fontSize={20} delay={0.4} />
				</motion.div>

				<div style={{ display: 'flex', gap: 20 }}>
					{STEPS.map((s, i) => (
						<motion.div
							key={s.k}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: 0.8 + i * 0.14 }}
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
