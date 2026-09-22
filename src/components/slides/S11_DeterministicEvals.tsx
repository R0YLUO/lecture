import { motion } from 'framer-motion';
import { Slide, Inner, Half, Title, Subtitle, colors, fonts, border, shadow, shadowSm } from '../ui';

/**
 * Deterministic evals · 用代码执行来评测
 *
 * 演讲者备注：
 * Deterministic Evaluations。这个方式就是用代码执行来评测 AI 完成的任务结果是对的，以及用的是正确的过程完成任务。
 * 任务结果就是看，Email 发给老板了么？你可以编一段代码来连接你的邮箱查看今天有没有发送给老板的 Email。
 * 查看 AI 完成任务的过程也非常重要。AI 可以是发出去 Email，但我们还不知道它是用了数据库的资料写的，还是瞎猛出来的。
 * 我们也想保证 human in the loop，保证没有收到用户人的确定是不允许发 Email 的。这都是通过查看 AI 完成任务的过程中
 * 有没有用过工具。怎么查呢？就是看那个记录。messages 里会有工具使用的记录，代码就能查得到。
 */
const CHECKS = [
	{
		label: 'Check: functional correctness',
		zh: '任务结果对不对',
		detail: 'Email 发给老板了么？写一段代码连接邮箱，查今天有没有发给老板的 Email。',
		color: colors.green,
	},
	{
		label: 'Check: correct tool use',
		zh: '过程对不对',
		detail: '是用数据库的资料写的，还是瞎编的？有没有等用户确定再发（human in the loop）？',
		color: colors.blue,
	},
];

export default function S11_DeterministicEvals() {
	return (
		<Slide bg={colors.white}>
			<Inner split>
				<Half style={{ flex: 0.9 }}>
					<motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
						<div style={{
							display: 'inline-block', padding: '4px 12px', marginBottom: 20,
							background: colors.green, fontFamily: fonts.mono, fontSize: 13,
							fontWeight: 700, letterSpacing: 2, border,
						}}>
							EVALS · 01
						</div>
						<Title size="56px" style={{ marginBottom: 16 }}>Deterministic evals</Title>
						<Subtitle style={{ marginBottom: 28 }}>用代码执行来评测：结果对不对，过程对不对。</Subtitle>
						<div style={{
							padding: '18px 22px', background: colors.warmBg, border, boxShadow: shadowSm,
							fontSize: 18, lineHeight: 1.6,
						}}>
							<span style={{ fontFamily: fonts.mono, fontWeight: 700, background: colors.black, color: colors.yellow, padding: '2px 8px', marginRight: 10 }}>怎么查？</span>
							看那个记录：<span style={{ fontFamily: fonts.mono, fontWeight: 700 }}>messages</span> 里有工具使用的记录，代码就能查得到。
						</div>
					</motion.div>
				</Half>
				<Half style={{ flex: 1.1, gap: 20 }}>
					{CHECKS.map((c, i) => (
						<motion.div
							key={c.label}
							initial={{ opacity: 0, y: 24 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.45, delay: 0.25 + i * 0.15 }}
							style={{ background: colors.white, border, boxShadow: shadow }}>
							<div style={{ background: c.color, borderBottom: border, padding: '14px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
								<span style={{ fontFamily: fonts.mono, fontSize: 18, fontWeight: 700 }}>{c.label}</span>
								<span style={{ fontSize: 16, fontWeight: 700, background: colors.black, color: colors.white, padding: '2px 10px' }}>{c.zh}</span>
							</div>
							<p style={{ padding: '18px 22px 22px', fontSize: 20, lineHeight: 1.6, fontWeight: 500 }}>{c.detail}</p>
						</motion.div>
					))}
				</Half>
			</Inner>
		</Slide>
	);
}
