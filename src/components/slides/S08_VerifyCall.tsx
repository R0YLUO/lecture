import { motion } from 'framer-motion';
import { Slide, Inner, Title, colors, fonts, border, shadowSm } from '../ui';
import { CodeBlock } from '../CodeBlock';

/**
 * 循环后几轮 · 模型要求 verify 工具（human in the loop）
 *
 * 演讲者备注（承接前页）：
 * 资料抽完、Email 写好之后，模型再要求一次工具使用：verify，把 Email 草稿交给人来确定。
 * 我们也想保证 human in the loop，保证没有收到用户人的确定是不允许发 Email 的。这只需要你 15 秒的时间查看一下写完的 Email。
 */
const RESPONSE = `
{
  "tool_call": {
    "name": "verify",
    "inputs": {
      "email": "Dear boss, here are today's details...."
    }
  },
  "text": "I need to use the verify tool to get human verification on my email draft"
}
`;

const STEPS = [
	{ k: '模型', v: '资料齐了、Email 写好 → 要求 verify 工具', color: colors.blue },
	{ k: '你', v: '花 15 秒看一眼草稿，确定可以发', color: colors.yellow },
	{ k: '规则', v: 'human in the loop：没收到确定，不允许发 Email', color: colors.red },
];

export default function S08_VerifyCall() {
	return (
		<Slide bg={colors.white}>
			<Inner style={{ flexDirection: 'column', justifyContent: 'center', gap: 26 }}>
				<motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
					style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
					<span style={{
						padding: '6px 14px', background: colors.black, color: colors.yellow,
						fontFamily: fonts.mono, fontSize: 14, fontWeight: 700, letterSpacing: 2,
					}}>ROUND N</span>
					<Title size="44px">再要求一次工具：<span style={{ background: colors.yellow, padding: '0 14px' }}>让人来确定</span></Title>
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
