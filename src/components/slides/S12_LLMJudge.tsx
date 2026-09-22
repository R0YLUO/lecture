import { motion } from 'framer-motion';
import { Slide, Inner, Half, Title, Subtitle, colors, fonts, border, shadow, shadowSm } from '../ui';

/**
 * Non-deterministic evals · LLM as a judge
 *
 * 演讲者备注：
 * 用 LLM as a judge 可以评测 agent 跟客户说的话：介绍的 internet plan 和价格跟数据库一致不一致，有没有答到客户问的问题，
 * 语气对客户礼貌不礼貌、专业不专业。你可以把整段对话记录，加上数据库里这个地址的 internet plan 资料、存进去的客户资料，
 * 和一个评分体系，全部发给模型做评测。这样能评测代码评测不了的一些细节。
 */
const CHECKS = [
	{ label: 'Check: tone', zh: '语气 · 对客户礼貌不礼貌、专业不专业', color: colors.purple },
	{ label: 'Check: correct plan details', zh: '介绍的 internet plan、价格跟数据库一致不一致，答到客户问的没有', color: colors.orange },
];

const INPUTS = ['整段对话记录', '数据库里这个地址的 internet plan', '存进去的客户资料', '一个评分体系'];

export default function S12_LLMJudge() {
	return (
		<Slide bg={colors.white}>
			<Inner split>
				<Half style={{ flex: 0.9 }}>
					<motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
						<div style={{
							display: 'inline-block', padding: '4px 12px', marginBottom: 20,
							background: colors.purple, color: colors.white, fontFamily: fonts.mono, fontSize: 13,
							fontWeight: 700, letterSpacing: 2, border,
						}}>
							EVALS · 02
						</div>
						<Title size="52px" style={{ marginBottom: 12 }}>Non-deterministic evals</Title>
						<Subtitle style={{ marginBottom: 28 }}>
							<span style={{ fontFamily: fonts.mono, fontWeight: 700, color: colors.black }}>LLM as a judge</span> · 用模型来做测试，评测代码评测不了的细节。
						</Subtitle>
						<div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
							{CHECKS.map((c, i) => (
								<motion.div
									key={c.label}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.45, delay: 0.25 + i * 0.15 }}
									style={{ display: 'flex', alignItems: 'center', border, boxShadow: shadowSm, background: colors.white }}>
									<span style={{ background: c.color, alignSelf: 'stretch', width: 14, borderRight: border }} />
									<div style={{ padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 4 }}>
										<span style={{ fontFamily: fonts.mono, fontSize: 17, fontWeight: 700 }}>{c.label}</span>
										<span style={{ fontSize: 17, color: colors.dark, opacity: 0.8 }}>{c.zh}</span>
									</div>
								</motion.div>
							))}
						</div>
					</motion.div>
				</Half>
				<Half style={{ flex: 1.1 }}>
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.4 }}
						style={{ background: colors.warmBg, border, boxShadow: shadow, padding: '28px 30px' }}>
						<div style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 18 }}>全部发给模型做评测 ↓</div>
						<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 22 }}>
							{INPUTS.map((t, i) => (
								<motion.div
									key={t}
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.35, delay: 0.6 + i * 0.1 }}
									style={{ padding: '14px 16px', background: colors.white, border, fontSize: 19, fontWeight: 700 }}>
									{t}
								</motion.div>
							))}
						</div>
						<motion.div
							initial={{ opacity: 0, y: 12 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: 1.05 }}
							style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', background: colors.purple, border }}>
							<span style={{ fontSize: 36, lineHeight: 1 }}>⚖️</span>
							<div style={{ color: colors.white }}>
								<div style={{ fontFamily: fonts.heading, fontSize: 26, fontWeight: 900, lineHeight: 1.1 }}>LLM as a Judge</div>
								<div style={{ fontSize: 16, opacity: 0.9, marginTop: 4 }}>模型按评分体系打分：internet plan 资料、有没有答到点上、语气</div>
							</div>
						</motion.div>
					</motion.div>
				</Half>
			</Inner>
		</Slide>
	);
}
