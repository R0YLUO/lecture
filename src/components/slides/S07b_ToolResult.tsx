import { motion } from 'framer-motion';
import { Slide, Inner, Title, colors, fonts, border, shadowSm } from '../ui';
import { CodeBlock } from '../CodeBlock';

/**
 * 循环第一轮 · 工具的回答（get_financial_data 的结果写回 messages）
 *
 * 演讲者备注：
 * 模型要求工具使用之后，是我们的代码去执行 function：调数据库的 API，把当天的财务资料抽出来。
 * function 的结果包成一条 tool_result，append 到 messages 上。模型自己不会"看到"数据库，
 * 它只看得到这份记录。下一轮循环，模型读到记录上写着财务资料，就知道财务这一步已经做完了，
 * 接着会要求任务版的工具。（这里的数字是示例数据。）
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
	{ k: '代码', v: 'run_tool 调数据库的 API，把结果包成一条 tool_result', color: colors.green },
	{ k: '记录', v: 'messages.append(result)：这条也进了 chat history', color: colors.orange },
	{ k: '模型', v: '下一轮读到财务资料 → 接着要求任务版的工具', color: colors.blue },
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
					}}>ROUND 01 · 工具返回</span>
					<Title size="44px">工具的回答：<span style={{ background: colors.green, padding: '0 14px' }}>财务资料写回记录</span></Title>
				</motion.div>

				<motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.2 }}>
					<CodeBlock code={TOOL_RESULT} lang="json" title="tool_result.json · 示例数据" fontSize={19} delay={0.4} />
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
