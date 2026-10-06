import { motion } from 'framer-motion';
import { Slide, Inner, Title, colors, fonts, border, shadowSm } from '../../ui';
import { CodeBlock } from '../../CodeBlock';

/**
 * Loop round one · the model asks for a tool (get_financial_data)
 *
 * Speaker notes (continuing from the previous slide):
 * The model realises it needs to do something, or is missing information, so it uses a tool to get there.
 * After the model asks for a tool, we execute the function that represents it, and the result is written to the record.
 * For example, the model asks for database data, the function pulls it and writes it to the record; next round the model
 * sees the financial data in the record, so it asks for the task-board tool — another function.
 */
const RESPONSE = `
{
  "tool_call": {
    "name": "get_financial_data",
    "inputs": {
      "date": "24-09-2026"
    }
  },
  "text": "I need to use the get_financial_data tool to fetch today's financial data details"
}
`;

const STEPS = [
	{ k: 'Model', v: 'Realises it lacks financial data → asks for get_financial_data', color: colors.blue },
	{ k: 'Code', v: 'run_tool executes the function and pulls the data from the database', color: colors.green },
	{ k: 'Record', v: 'The result is appended to messages, so the model sees it next round', color: colors.orange },
];

export default function S07_ToolCall() {
	return (
		<Slide bg={colors.white}>
			<Inner style={{ flexDirection: 'column', justifyContent: 'center', gap: 26 }}>
				<motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
					style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
					<span style={{
						padding: '6px 14px', background: colors.black, color: colors.yellow,
						fontFamily: fonts.mono, fontSize: 14, fontWeight: 700, letterSpacing: 2,
					}}>ROUND 01</span>
					<Title size="44px">The model's response: <span style={{ background: colors.blue, padding: '0 14px' }}>a tool call</span></Title>
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
