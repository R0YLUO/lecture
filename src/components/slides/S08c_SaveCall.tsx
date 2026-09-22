import { motion } from 'framer-motion';
import { Slide, Inner, Title, colors, fonts, border, shadowSm } from '../ui';
import { CodeBlock } from '../CodeBlock';

/**
 * 循环第三轮 · 模型要求 save_customer_details，工具把客户资料存进数据库
 *
 * 演讲者备注：
 * 客户确认了 internet plan、留了名字和电话，这几句都在 messages 里。这一轮模型读到这些，就要求第二个工具：
 * save_customer_details，把名字和电话当参数传进去。代码执行 function，写进数据库的 customers 表，
 * tool_result 写回记录。规则是：客户没确认 internet plan、没给电话之前，模型不允许存——不能替客户做决定。
 * 这就是这个用例里的 查数据库和存数据库，在代码里就是两个不同的 function。
 */
const RESPONSE = `
{
  "tool_call": {
    "name": "save_customer_details",
    "inputs": {
      "name": "Wei Zhang",
      "phone": "0412 345 678"
    }
  },
  "text": "The customer confirmed NBN 100 and gave their details. I need to use the save_customer_details tool so a sales rep can follow up"
}
`;

const TOOL_RESULT = `
{
  "tool_result": {
    "name": "save_customer_details",
    "output": {
      "status": "saved",
      "customer_id": 1042
    }
  }
}
`;

const STEPS = [
	{ k: '模型', v: '客户确认了 internet plan、给了名字电话 → 要求 save_customer_details', color: colors.blue },
	{ k: '代码', v: 'run_tool 把客户资料写进数据库的 customers 表，结果写回记录', color: colors.green },
	{ k: '规则', v:  '客户没确认、没给电话，不允许存', color: colors.red },
];

export default function S08c_SaveCall() {
	return (
		<Slide bg={colors.white}>
			<Inner style={{ flexDirection: 'column', justifyContent: 'center', gap: 26 }}>
				<motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
					style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
					<span style={{
						padding: '6px 14px', background: colors.black, color: colors.yellow,
						fontFamily: fonts.mono, fontSize: 14, fontWeight: 700, letterSpacing: 2,
					}}>ROUND 03</span>
					<Title size="44px">再要求一次工具：<span style={{ background: colors.orange, padding: '0 14px' }}>把客户资料存进数据库</span></Title>
				</motion.div>

				<div style={{ display: 'flex', gap: 24, alignItems: 'stretch' }}>
					<motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.2 }} style={{ flex: 1.2, minWidth: 0, display: 'flex' }}>
						<CodeBlock code={RESPONSE} lang="json" title="response.json · 模型要求工具" fontSize={17} delay={0.4} style={{ flex: 1 }} />
					</motion.div>
					<motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.4 }} style={{ flex: 0.8, minWidth: 0, display: 'flex' }}>
						<CodeBlock code={TOOL_RESULT} lang="json" title="tool_result.json · 工具返回" fontSize={17} delay={0.9} style={{ flex: 1 }} />
					</motion.div>
				</div>

				<div style={{ display: 'flex', gap: 20 }}>
					{STEPS.map((s, i) => (
						<motion.div
							key={s.k}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: 1.1 + i * 0.14 }}
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
