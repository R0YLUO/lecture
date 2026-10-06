import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Slide, Inner, Half, Title, colors, fonts, border, shadowSm } from '../../ui';
import { CodeBlock } from '../../CodeBlock';
import { MessagesModal, type TraceMessage } from '../../MessagesModal';

/**
 * The agent loop · the while True code
 *
 * Speaker notes:
 * This piece of code is an agent. The while True at the top puts everything below it into a loop. Each round we give
 * the model some data — the messages here — and the model answers us — the response. When the model receives data it has
 * two choices: ask for a tool call, or answer directly. It asks for a tool when it realises it needs to do something, or
 * is missing some information, so it uses a tool to get there. Once the goal is reached, or it has enough information to
 * answer the user's question, it stops asking for tools and we can simply return the model's output to the user.
 * The code splits into two branches, and runs whichever condition is met. If the response asks for a tool, we run this
 * part — that is, execute the function we talked about earlier. If this round has no tool request, we stop the loop and
 * return the model's output to the user.
 * The important thing to understand is what messages contains. At the start of the loop, you write the AI's task into
 * messages, plus the available tools, so the AI can complete the task through tool calls. Remember: the model has no memory.
 * It's stateless. Ask it a question, then ask a follow-up, and it won't know what you just asked — it's as if you're
 * talking to it for the first time. So why can ChatGPT hold a multi-turn conversation and remember every detail?
 * Because of messages. messages is the record of your conversation with the model — the chat history. It's also the
 * notes the agent keeps for itself while looping. That record is how the agent knows what to do next.
 * So look at the code again: after the model asks for a tool, we execute the function that represents the tool, and the
 * function's result is written to the record. For example, the model asks for database data, the function pulls it and
 * writes it to the record; next round the model sees the financial data in the record, so it asks for the task-board
 * tool — another function.
 */
const AGENT_LOOP = `
while True:
    response = LLM(messages)
    messages.append(response)

    if response.tool_call:
        result = run_tool(response.tool_call)
        messages.append(result)
    else:
        return response.text
`;

const POINTS = [
	{ code: 'messages', text: 'The agent\'s context: instructions + memory', color: colors.orange, opensTrace: true },
	{ code: 'response', text: 'Two choices for the model: ask for a tool, or answer directly', color: colors.blue },
	{ code: 'run_tool', text: 'On a tool request, run the matching function and write the result back', color: colors.green },
];

// The record appended step by step after opening messages: the system entry is the instructions, every entry after it is memory the loop builds up (numbers reuse the sample data from earlier slides)
const MESSAGES: TraceMessage[] = [
	{ role: 'system', note: 'instructions', content: 'You write the boss\'s daily report: check finance → check tasks → email the boss. Never send without verify.\nTools: get_financial_data · get_tasks · verify · send_email\nToday: write and send the report for 24-09-2026.' },
	{ role: 'llm', note: 'asks for a tool', content: 'tool_call: get_financial_data({ date: "24-09-2026" })' },
	{ role: 'tool', note: 'run_tool', content: 'get_financial_data →\n{ revenue: 12400, expenses: 8150, net_profit: 4250, invoices_paid: 3, invoices_overdue: 1 }' },
	{ role: 'llm', note: 'asks for a tool', content: 'tool_call: get_tasks({ date: "24-09-2026" })' },
	{ role: 'tool', note: 'run_tool', content: 'get_tasks → { done: 3, in_review: 2 }' },
	{ role: 'llm', note: 'asks for a tool', content: 'tool_call: verify({ email: "Dear boss, here are today\'s details..." })' },
	{ role: 'tool', note: 'human approved', content: 'verify → { decision: "send" }' },
	{ role: 'llm', note: 'asks for a tool', content: 'tool_call: send_email({ to: "boss", email: "Dear boss, here are today\'s details..." })' },
	{ role: 'tool', note: 'run_tool', content: 'send_email → { status: "sent" }' },
	{ role: 'llm', note: 'final answer', content: 'tool_call: null\ntext: "I have successfully sent today\'s email."  →  loop ends' },
];

export default function S06_AgentLoop() {
	const [traceOpen, setTraceOpen] = useState(false);
	return (
		<Slide bg={colors.warmBg}>
			<Inner split style={{ gap: 40 }}>
				<Half style={{ flex: 1.15 }}>
					<motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55 }}>
						<CodeBlock code={AGENT_LOOP} lang="python" title="agent.py" fontSize={22} lineNumbers delay={0.35} />
					</motion.div>
				</Half>
				<Half style={{ flex: 0.85, gap: 14 }}>
					<motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.1 }}>
						<div style={{
							display: 'inline-block', padding: '4px 12px', marginBottom: 12,
							background: colors.black, color: colors.yellow, fontFamily: fonts.mono, fontSize: 13,
							fontWeight: 700, letterSpacing: 2,
						}}>
							03 · CODE EXECUTION
						</div>
						<Title size="44px" style={{ marginBottom: 6 }}>This code is an agent</Title>
					</motion.div>
					{POINTS.map((p, i) => (
						<motion.div
							key={p.code}
							initial={{ opacity: 0, x: 30 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.4, delay: 0.3 + i * 0.14 }}>
							<PointRow code={p.code} text={p.text} color={p.color} onClick={p.opensTrace ? () => setTraceOpen(true) : undefined} />
						</motion.div>
					))}
				</Half>
			</Inner>
			<AnimatePresence>
				{traceOpen && <MessagesModal messages={MESSAGES} onClose={() => setTraceOpen(false)} />}
			</AnimatePresence>
		</Slide>
	);
}

// Explanation row: with onClick it's a button that sinks on hover (like the nav arrows), with a click hint on the right
function PointRow({ code, text, color, onClick }: { code: string; text: string; color: string; onClick?: () => void }) {
	const [hover, setHover] = useState(false);
	const pressed = hover && !!onClick;
	return (
		<div
			role={onClick ? 'button' : undefined}
			onClick={onClick}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			style={{
				display: 'flex', alignItems: 'stretch', background: colors.white, border,
				boxShadow: pressed ? 'none' : shadowSm,
				transform: pressed ? 'translate(3px,3px)' : 'none',
				cursor: onClick ? 'pointer' : 'default',
				transition: 'all 0.15s',
			}}>
			<span style={{
				display: 'flex', alignItems: 'center', padding: '0 14px', background: color, borderRight: border,
				fontFamily: fonts.mono, fontSize: 14, fontWeight: 700, whiteSpace: 'nowrap',
			}}>{code}</span>
			<span style={{ padding: '12px 16px', fontSize: 17, lineHeight: 1.5, fontWeight: 500, flex: 1 }}>{text}</span>
			{onClick && (
				<span style={{
					display: 'flex', alignItems: 'center', padding: '0 14px', borderLeft: border,
					fontFamily: fonts.mono, fontSize: 12, fontWeight: 700, letterSpacing: 1, whiteSpace: 'nowrap',
					background: hover ? colors.yellow : colors.warmBg, transition: 'background 0.15s',
				}}>OPEN →</span>
			)}
		</div>
	);
}
