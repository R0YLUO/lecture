import { motion } from 'framer-motion';
import { Slide, Inner, Title, colors, fonts, border, shadowSm } from '../ui';
import { CodeBlock } from '../CodeBlock';

/**
 * 循环最后一轮 · 目的达到，没有工具要求，直接回答
 *
 * 演讲者备注（承接前页）：
 * 客户资料存好了，模型的目的达到了：不再要求工具，直接告诉客户"销售会打电话给你"。
 * 代码走到 else 分支，停止循环，把这句回给客户，对话结束。销售代表那边，在数据库里看到这位新客户，
 * 打电话跟进、成交——重复的问题一句都没答，时间全花在真正的销售上。
 */
const RESPONSE = `
{
  "tool_call": null,
  "text": "Thanks Wei! I've saved your details. One of our sales reps will call you on 0412 345 678 to get NBN 100 connected."
}
`;

const STEPS = [
	{ k: '模型', v: 'tool_call 为 null：资料存好了，目的达到，不再要求工具', color: colors.blue },
	{ k: '代码', v: '走到 else 分支 → return response.text，这句发给客户，对话结束', color: colors.green },
	{ k: '销售', v: '在数据库里看到新客户 → 打电话跟进、成交，重复的问题一句没答', color: colors.yellow },
];

export default function S09_FinalResponse() {
	return (
		<Slide bg={colors.white}>
			<Inner style={{ flexDirection: 'column', justifyContent: 'center', gap: 26 }}>
				<motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
					style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
					<span style={{
						padding: '6px 14px', background: colors.black, color: colors.yellow,
						fontFamily: fonts.mono, fontSize: 14, fontWeight: 700, letterSpacing: 2,
					}}>FINAL</span>
					<Title size="44px">目的达到：<span style={{ background: colors.green, padding: '0 14px' }}>停止循环，告诉客户销售会联系</span></Title>
				</motion.div>

				<motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.2 }}>
					<CodeBlock code={RESPONSE} lang="json" title="response.json" fontSize={21} delay={0.4} />
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
