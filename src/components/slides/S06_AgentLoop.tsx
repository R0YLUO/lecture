import { motion } from 'framer-motion';
import { Slide, Inner, Half, Title, colors, fonts, border, shadowSm } from '../ui';
import { CodeBlock } from '../CodeBlock';

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
 * function 的结果写在记录上。比如，模型要求这个地址能装的 internet plan，function 从数据库抽出这个资料写到记录上，下一轮时，
 * 模型看到记录上写着 internet plan 资料，就可以直接回答客户了。聊天机器人这种用例，客户每说一句话，代码就 append 到 messages，
 * 再跑一次循环；客户确认了 internet plan、留了电话之后，模型才会要求第二个工具，把客户资料存进数据库。
 */
const AGENT_LOOP = `
while True:
    response = llm(messages)

    if response.tool_call:
        result = run_tool(response.tool_call)
        messages.append(result)
    else:
        return response.text
`;

const POINTS = [
	{ code: 'while True', text: '进入循环：每一轮都把 messages 交给模型', color: colors.yellow },
	{ code: 'response', text: '模型两个选择：要求工具使用，或者直接回答', color: colors.blue },
	{ code: 'run_tool', text: '有工具要求就执行对应的 function，结果写回记录', color: colors.green },
	{ code: 'messages', text: '模型没有记忆（stateless）：这份记录就是 chat history，也是 agent 给自己记的账', color: colors.orange },
];

export default function S06_AgentLoop() {
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
							transition={{ duration: 0.4, delay: 0.3 + i * 0.14 }}
							style={{ display: 'flex', alignItems: 'stretch', background: colors.white, border, boxShadow: shadowSm }}>
							<span style={{
								display: 'flex', alignItems: 'center', padding: '0 14px', background: p.color, borderRight: border,
								fontFamily: fonts.mono, fontSize: 14, fontWeight: 700, whiteSpace: 'nowrap',
							}}>{p.code}</span>
							<span style={{ padding: '12px 16px', fontSize: 17, lineHeight: 1.5, fontWeight: 500 }}>{p.text}</span>
						</motion.div>
					))}
				</Half>
			</Inner>
		</Slide>
	);
}
