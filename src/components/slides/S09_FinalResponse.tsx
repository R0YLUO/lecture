import { motion } from 'framer-motion';
import { Slide, Inner, Title, colors, fonts, border, shadowSm } from '../ui';
import { CodeBlock } from '../CodeBlock';

/**
 * 循环最后一轮 · 没有工具要求，直接回答
 *
 * 演讲者备注（承接前页）：
 * 当目的达到时，或者收到足够资料回答用户人的问题时，就不会有工具使用的要求了。
 * 要是这次循环没有工具使用的要求的话，就可停止循环，把模型输出的数据回给用户人。
 */
const RESPONSE = `
{
  "tool_call": null,
  "text": "I have successfully sent today's email."
}
`;

const STEPS = [
	{ k: '模型', v: 'tool_call 为 null：目的达到，不再要求工具', color: colors.blue },
	{ k: '代码', v: '走到 else 分支 → return response.text，循环结束', color: colors.green },
	{ k: '你', v: '收到 "今天的 Email 已经发出去了"，回家吃饭', color: colors.yellow },
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
					<Title size="44px">没有工具要求：<span style={{ background: colors.green, padding: '0 14px' }}>停止循环，直接回答</span></Title>
				</motion.div>

				<motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.2 }}>
					<CodeBlock code={RESPONSE} lang="json" title="response.json" fontSize={22} delay={0.4} />
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
