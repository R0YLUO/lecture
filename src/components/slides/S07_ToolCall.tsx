import { motion } from 'framer-motion';
import { Slide, Inner, Title, colors, fonts, border, shadowSm } from '../ui';
import { CodeBlock } from '../CodeBlock';

/**
 * 循环第一轮 · 模型要求工具使用（get_financial_data）
 *
 * 演讲者备注（承接上一页）：
 * 模型意识到它需要做一件事，或者缺一些资料，所以会通过工具使用来达到它的目的。
 * 在模型要求工具使用后我们执行代表工具的 function。function 的结果写在记录上。
 * 比如，模型要求数据库的资料，function 抽出这个资料写到记录上，下一轮时，模型看到记录上写着财务资料，
 * 所以下一步它会要求任务版的工具使用，也就是另外一个 function。
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
	{ k: '模型', v: '意识到缺财务资料 → 要求 get_financial_data', color: colors.blue },
	{ k: '代码', v: 'run_tool 执行 function，从数据库抽出资料', color: colors.green },
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
