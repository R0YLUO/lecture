import { motion } from 'framer-motion';
import { Slide, Inner, Title, colors, fonts, border, shadowSm } from '../../ui';
import { CodeBlock } from '../../CodeBlock';

/**
 * Loop round one · the tool's response (get_financial_data's result is written back to messages)
 *
 * Speaker notes:
 * After the model asks for a tool, it's our code that executes the function: it calls the database API and pulls
 * today's financial data. The function's result is wrapped as a tool_result and appended to messages. The model never
 * "sees" the database itself — it only sees this record. Next round, the model reads the financial data in the record,
 * knows the finance step is done, and goes on to ask for the task-board tool. (The numbers here are sample data.)
 */
const TOOL_RESULT = `
{
  "tool_result": {
    "name": "get_financial_data",
    "output": {
      "date": "24-09-2026",
      "revenue": 12400,
      "expenses": 8150,
      "net_profit": 4250,
      "invoices_paid": 3,
      "invoices_overdue": 1
    }
  }
}
`;

const STEPS = [
	{ k: 'Code', v: 'run_tool calls the database API and wraps the result as a tool_result', color: colors.green },
	{ k: 'Record', v: 'messages.append(result): this goes into the chat history too', color: colors.orange },
	{ k: 'Model', v: 'Reads the financial data next round → asks for the task-board tool', color: colors.blue },
];

export default function S07b_ToolResult() {
	return (
		<Slide bg={colors.white}>
			<Inner style={{ flexDirection: 'column', justifyContent: 'center', gap: 26 }}>
				<motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
					style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
					<span style={{
						padding: '6px 14px', background: colors.black, color: colors.yellow,
						fontFamily: fonts.mono, fontSize: 14, fontWeight: 700, letterSpacing: 2,
					}}>ROUND 01 · TOOL RESULT</span>
					<Title size="44px">Tool response: <span style={{ background: colors.green, padding: '0 14px' }}>finance data written back</span></Title>
				</motion.div>

				<motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.2 }}>
					<CodeBlock code={TOOL_RESULT} lang="json" title="tool_result.json · sample data" fontSize={19} delay={0.4} />
				</motion.div>

				<div style={{ display: 'flex', gap: 20 }}>
					{STEPS.map((s, i) => (
						<motion.div
							key={s.k}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: 0.85 + i * 0.14 }}
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
