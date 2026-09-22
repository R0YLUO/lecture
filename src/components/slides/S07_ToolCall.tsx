import { motion } from 'framer-motion';
import { Slide, Inner, Title, colors, fonts, border, shadowSm } from '../ui';
import { CodeBlock } from '../CodeBlock';

/**
 * 循环第一轮 · 模型要求工具使用（get_internet_plans）
 *
 * 演讲者备注（承接上一页）：
 * 客户在网站聊天框里问"我家能装什么 internet plan"，模型先反问地址；客户说了地址，这几句都在 messages 里。
 * 这一轮，模型意识到它缺一样资料：这个地址能装的 internet plan。所以它不直接回答，而是要求工具使用：get_internet_plans，
 * 把地址当参数传进去。我们的代码收到这个要求，就去执行代表工具的 function，从数据库里查，结果写在记录上。
 */
const RESPONSE = `
{
  "tool_call": {
    "name": "get_internet_plans",
    "inputs": {
      "address": "12 Example St, Clayton VIC 3168"
    }
  },
  "text": "I need to use the get_internet_plans tool to look up the plans available at the customer's address"
}
`;

const STEPS = [
	{ k: '模型', v: '客户说了地址 → 缺这个地址的 internet plan 资料 → 要求 get_internet_plans', color: colors.blue },
	{ k: '代码', v: 'run_tool 执行 function，去数据库查这个地址能装的 internet plan', color: colors.green },
	{ k: '记录', v: '结果 append 到 messages，下一轮模型就能看到', color: colors.orange },
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
					<Title size="44px">模型的回答：<span style={{ background: colors.blue, padding: '0 14px' }}>要求工具使用</span></Title>
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
