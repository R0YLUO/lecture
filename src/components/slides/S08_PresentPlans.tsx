import { motion } from 'framer-motion';
import { Slide, Inner, Title, colors, fonts, border, shadowSm } from '../ui';
import { CodeBlock } from '../CodeBlock';

/**
 * 循环第二轮 · 没有工具要求，直接回答客户（把 internet plan 介绍出来，等客户回话）
 *
 * 演讲者备注：
 * 这一轮模型读到记录上已经有三个 internet plan 了，资料齐了，就不再要求工具：tool_call 是 null，直接回答。
 * 代码走到 else 分支，return response.text，这句话就发到客户的聊天框里。循环到这里停了，等客户回话。
 * 聊天机器人的每一轮对话都是这样：客户说一句，代码把这句 append 到 messages，再进一次 while True。
 * 所以一整段对话，其实是好几次循环拼起来的，全靠 messages 这份记录把上下文串起来。
 */
const RESPONSE = `
{
  "tool_call": null,
  "text": "At 12 Example St you can get NBN 50 ($69/month), NBN 100 ($85/month) or NBN 250 ($99/month). Which one would you like to go with?"
}
`;

const STEPS = [
	{ k: '模型', v: 'internet plan 资料齐了 → 不要求工具，直接回答客户', color: colors.blue },
	{ k: '代码', v: '走到 else 分支 → return response.text，这句发到聊天框', color: colors.green },
	{ k: '客户', v: '看到 internet plan → 回话。客户的每一句 append 到 messages，循环再跑一次', color: colors.yellow },
];

export default function S08_PresentPlans() {
	return (
		<Slide bg={colors.white}>
			<Inner style={{ flexDirection: 'column', justifyContent: 'center', gap: 26 }}>
				<motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
					style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
					<span style={{
						padding: '6px 14px', background: colors.black, color: colors.yellow,
						fontFamily: fonts.mono, fontSize: 14, fontWeight: 700, letterSpacing: 2,
					}}>ROUND 02</span>
					<Title size="44px">没有工具要求：<span style={{ background: colors.yellow, padding: '0 14px' }}>回答客户，等客户回话</span></Title>
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
