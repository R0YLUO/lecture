import { motion } from 'framer-motion';
import { Slide, Inner, Title, colors, fonts, border, shadowSm } from '../ui';
import { CodeBlock } from '../CodeBlock';

/**
 * 循环后几轮 · 工具的回答（verify 的结果写回 messages）
 *
 * 演讲者备注：
 * 你在页面上点了"发送"，verify 工具就把你的决定包成 tool_result 写回记录。模型下一轮读到 decision 是 send，
 * 知道人已经确定过了，才会把 Email 发出去。要是你点的是"带评论重写"，comments 也会写在这里，
 * 模型就带着你的评论重写一版，循环再来一轮。没有这条记录，Email 是不允许发的：这就是 human in the loop。
 */
const TOOL_RESULT = `
{
  "tool_result": {
    "name": "verify",
    "output": {
      "decision": "send",
      "email": "Dear boss, here are today's details....",
      "comments": null
    }
  }
}
`;

const STEPS = [
	{ k: '你', v: '点了发送 → decision: send，人这一步确定完了', color: colors.yellow },
	{ k: '记录', v: '写回 messages：模型下一轮读到你已经确定，才发 Email', color: colors.orange },
	{ k: '若 rewrite', v: 'comments 一起写回，模型带着评论重写，循环再来一轮', color: colors.blue },
];

export default function S08c_VerifyResult() {
	return (
		<Slide bg={colors.white}>
			<Inner style={{ flexDirection: 'column', justifyContent: 'center', gap: 26 }}>
				<motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
					style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
					<span style={{
						padding: '6px 14px', background: colors.black, color: colors.yellow,
						fontFamily: fonts.mono, fontSize: 14, fontWeight: 700, letterSpacing: 2,
					}}>ROUND N · 工具返回</span>
					<Title size="44px">verify 的回答：<span style={{ background: colors.green, padding: '0 14px' }}>你确定了，可以发</span></Title>
				</motion.div>

				<motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.2 }}>
					<CodeBlock code={TOOL_RESULT} lang="json" title="tool_result.json" fontSize={20} delay={0.4} />
				</motion.div>

				<div style={{ display: 'flex', gap: 20 }}>
					{STEPS.map((s, i) => (
						<motion.div
							key={s.k}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: 0.8 + i * 0.14 }}
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
