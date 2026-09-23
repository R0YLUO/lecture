import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Slide, Inner, Half, Title, colors, fonts, border, shadowSm } from '../ui';
import { CodeBlock } from '../CodeBlock';
import { MessagesModal, type TraceMessage } from '../MessagesModal';

/**
 * Agent 循环 · while True 的那段代码
 *
 * 演讲者备注：
 * 这一部分的编程就是个 Agent。最上面的 While True 就会使接下来的代码进入循环。每一轮，我们给我们的模型一些数据，
 * 就是这里写的 messages，然后模型会回答我们，就是这里的 response。我们的模型在收到数据时，有两个选择：可以要求工具使用，
 * 或者直接回答。要求工具使用的原因是，模型意识到它需要做一件事，或者缺一些资料，所以会通过工具使用来达到它的目的。
 * 当目的达到时，或者收到足够资料回答用户人的问题时，就不会有工具使用的要求了，直接可以把模型输出的数据回给用户人就行了。
 * 这部分的代码分成两个条件，代码会在满足的条件里执行。所以要是我们收到的回答有工具使用的要求，就会跑这段的代码，
 * 也就是执行我们前面说到的 function。或者要是这次循环没有工具使用的要求的话，就可停止循环，把模型输出的数据回给用户人。
 * 很重要懂得是，这 messages 都包括了什么。在循环开始的时候，你在 messages 里写 AI 的任务，再加上能用的工具资料，
 * 让你 AI 通过工具使用完成任务。我们要必须记住，模型是没有记忆力的。Stateless。你问模型一个问题，然后再问第二次关于刚刚问到的问题，
 * 他不会知道的，就会像你是第一次跟模型交流似的。但是为什么，我们用 ChatGPT 时可以进行多轮对话呢？然后会记得以前说到的每一个细节？
 * 就是靠这个 messages。messages 就是你跟模型对话的记录，chat history。也是 agent 循环时给自己记的记录。
 * 就用这个记录才能使智能体知道自己下一步需要干什么。所以我们再看一下这段代码：在模型要求工具使用后我们执行代表工具的 function。
 * function 的结果写在记录上。比如，模型要求数据库的资料，function 抽出这个资料写到记录上，下一轮时，模型看到记录上写着财务资料，
 * 所以下一步它会要求任务版的工具使用，也就是另外一个 function。
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
	{ code: 'messages', text: '智能体的 context：指令 + 记忆', color: colors.orange, opensTrace: true },
	{ code: 'response', text: '模型两个选择：要求工具使用，或者直接回答', color: colors.blue },
	{ code: 'run_tool', text: '有工具要求就执行对应的 function，结果写回记录', color: colors.green },
];

// 点开 messages 后逐条追加的记录：system 一条是指令，之后每一条都是循环攒下的记忆（数字沿用前面几页的示例数据）
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
							03 · 代码执行
						</div>
						<Title size="44px" style={{ marginBottom: 6 }}>这一段代码，就是一个 Agent</Title>
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

// 说明条：带 onClick 时是按钮，悬停沉下去（同翻页箭头），右侧提示可点开
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
				}}>点开看 →</span>
			)}
		</div>
	);
}
