import { motion } from 'framer-motion';
import { Slide, Inner, Title, Subtitle, colors, fonts, border, shadow } from '../ui';
import { Stage, Actor, ActorHeader, type ArrowSpec } from '../Diagram';

/**
 * 用例 · 网络公司的客服（AI 聊天机器人版：客户 ↔ 智能体 ↔ 数据库 ← 销售）
 *
 * 演讲者备注：
 * 我们的 AI 智能体接下客户的第一句话：先跟客户对话，问清地址；然后通过数据库的 API 查这个地址能装的 internet plan
 * （get_internet_plans），把 internet plan 介绍给客户；客户确认想要哪个 internet plan 之后，AI 再问名字和电话，
 * 存进数据库（save_customer_details）。销售代表这边，只需要从数据库里拿有意向的客户资料，打电话跟进、成交。
 * 重复的问题 AI 秒回，24 小时在线；销售的时间全部花在真正的销售上。
 * 注意"客户确认"这一步：选哪个 internet plan、要不要留电话，都是客户自己说的，AI 不替客户做决定。
 */
const CHANNELS = [
	{ icon: '📞', label: '打电话' },
	{ icon: '✉️', label: '发 Email' },
	{ icon: '💬', label: '网站在线聊天' },
];

const QUESTION = '“我家这个地址能装什么 internet plan？多少钱？什么时候能装？”';

const AGENT_STEPS: { text: string; code?: string; color?: string }[] = [
	{ text: '对话，问清地址' },
	{ text: '查这个地址能装的 internet plan', code: 'get_internet_plans(address)', color: colors.blue },
	{ text: '把 internet plan 介绍给客户' },
	{ text: '客户确认 internet plan、留名字电话', color: colors.yellow },
	{ text: '存进数据库，等销售跟进', code: 'save_customer_details(name, phone)', color: colors.orange },
];

const TABLES = [
	{ name: 'internet_plans', desc: '每个地址能装的 internet plan' },
	{ name: 'customers', desc: '有意向的客户资料' },
];

const STEPS = ['问地址', '查 internet plan', '客户确认', '存资料', '销售跟进成交'];

const ARROWS: ArrowSpec[] = [
	{ points: [{ x: 280, y: 150 }, { x: 470, y: 150 }], label: '提问 · 对话', delay: 0.7 },
	{ points: [{ x: 470, y: 260 }, { x: 280, y: 260 }], label: '⚡ 秒回 · 介绍 internet plan', color: colors.green, delay: 0.9 },
	{
		points: [{ x: 820, y: 100 }, { x: 1020, y: 100 }], color: colors.blue, delay: 1.1,
		label: <><div>get_internet_plans</div><div style={{ opacity: 0.7 }}>(address)</div></>,
	},
	{
		points: [{ x: 820, y: 170 }, { x: 1020, y: 170 }], color: colors.orange, delay: 1.3,
		label: <><div>save_customer_details</div><div style={{ opacity: 0.7 }}>(name, phone)</div></>,
	},
	{ points: [{ x: 1170, y: 220 }, { x: 1170, y: 280 }], label: '新客户资料', labelAt: { x: 1250, y: 250 }, color: colors.dark, delay: 1.5 },
	{
		points: [{ x: 1170, y: 440 }, { x: 1170, y: 478 }, { x: 140, y: 478 }, { x: 140, y: 440 }],
		label: '📞 打电话跟进 · 成交 💰', labelAt: { x: 660, y: 478 }, color: colors.green, delay: 1.7,
	},
];

export default function S03_AgentWorkflow() {
	return (
		<Slide bg={colors.warmBg}>
			<Inner style={{ flexDirection: 'column', justifyContent: 'center', gap: 24 }}>
				<div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32 }}>
					<motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
						<div style={{
							display: 'inline-block', padding: '4px 12px', marginBottom: 14,
							background: colors.blue, fontFamily: fonts.mono, fontSize: 13,
							fontWeight: 700, letterSpacing: 2, border,
						}}>
							01 · 换成 AI 聊天机器人来做
						</div>
						<Title size="48px" style={{ marginBottom: 8 }}>AI 从接客到存资料全包，销售只管成交</Title>
						<Subtitle style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
							{STEPS.map((s, i) => (
								<span key={s} style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
									<span style={{ fontFamily: fonts.mono, fontWeight: 700, color: colors.black, background: i === 2 ? colors.yellow : colors.white, border: `2px solid ${colors.black}`, padding: '0 8px' }}>{i + 1}</span>
									<span style={{ color: colors.black, fontWeight: 600 }}>{s}</span>
									{i < STEPS.length - 1 && <span style={{ color: colors.red, fontWeight: 700 }}>→</span>}
								</span>
							))}
						</Subtitle>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, scale: 0.8, rotate: 4 }}
						animate={{ opacity: 1, scale: 1, rotate: 2 }}
						transition={{ type: 'spring', stiffness: 200, damping: 14, mass: 0.8, delay: 0.5 }}
						style={{
							flexShrink: 0, padding: '14px 26px', background: colors.green, color: colors.black, border, boxShadow: shadow,
							textAlign: 'center',
						}}>
						<div style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, letterSpacing: 2, opacity: 0.8 }}>重复的问题</div>
						<div style={{ fontFamily: fonts.heading, fontSize: 56, fontWeight: 900, lineHeight: 1 }}>秒回 <span style={{ fontSize: 24 }}>24 小时在线</span></div>
					</motion.div>
				</div>

				<Stage width={1320} height={500} arrows={ARROWS} style={{ alignSelf: 'center' }}>
					<Actor x={0} y={20} w={280} h={420} delay={0.2}>
						<ActorHeader icon="🧑" title="客户" tag="3 个渠道" color={colors.orange} />
						<div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
							{CHANNELS.map((c) => (
								<div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', border: `2px solid ${colors.black}`, fontSize: 18, fontWeight: 700 }}>
									<span style={{ fontSize: 22, lineHeight: 1 }}>{c.icon}</span>{c.label}
								</div>
							))}
							<div style={{ padding: '10px 12px', background: colors.warmBg, border: `2px solid ${colors.black}`, fontSize: 16, lineHeight: 1.5, fontWeight: 600 }}>
								<div style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: 2, opacity: 0.6, marginBottom: 4 }}>问的还是</div>
								{QUESTION}
							</div>
							<div style={{ marginTop: 'auto', padding: '10px 12px', background: colors.green, color: colors.black, fontSize: 17, fontWeight: 800 }}>
								⚡ 秒回，不用等
							</div>
						</div>
					</Actor>

					<Actor x={470} y={40} w={350} h={400} delay={0.35}>
						<ActorHeader icon="🤖" title="AI 客服智能体" tag="Agent" color={colors.purple} textColor={colors.white} />
						<div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 8, flex: 1, justifyContent: 'center' }}>
							{AGENT_STEPS.map((s, i) => (
								<div key={s.text} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 10px', background: s.color === colors.yellow ? colors.yellow : colors.white, border: `2px solid ${colors.black}` }}>
									<span style={{ fontFamily: fonts.mono, fontSize: 13, background: colors.black, color: colors.white, padding: '2px 8px', flexShrink: 0 }}>{i + 1}</span>
									<div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
										<span style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.3 }}>{s.text}</span>
										{s.code && <span style={{ fontFamily: fonts.mono, fontSize: 12, fontWeight: 700, color: colors.black, background: s.color, padding: '1px 6px', alignSelf: 'flex-start' }}>{s.code}</span>}
									</div>
								</div>
							))}
						</div>
					</Actor>

					<Actor x={1020} y={20} w={300} h={200} delay={0.5}>
						<ActorHeader icon="🗄️" title="数据库" tag="Database" color={colors.blue} />
						<div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 8, flex: 1, justifyContent: 'center' }}>
							{TABLES.map((t) => (
								<div key={t.name} style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '6px 10px', border: `2px solid ${colors.black}` }}>
									<span style={{ fontFamily: fonts.mono, fontSize: 14, fontWeight: 700 }}>{t.name}</span>
									<span style={{ fontSize: 14, fontWeight: 600, opacity: 0.8 }}>{t.desc}</span>
								</div>
							))}
						</div>
					</Actor>

					<Actor x={1020} y={280} w={300} h={160} delay={0.65}>
						<ActorHeader icon="🧑‍💼" title="销售代表" tag="只管成交" color={colors.yellow} />
						<div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 8, flex: 1, justifyContent: 'center' }}>
							<div style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.45 }}>从数据库拿有意向的客户 → 打电话跟进、成交</div>
							<div style={{ alignSelf: 'flex-start', fontFamily: fonts.mono, fontSize: 12, fontWeight: 700, letterSpacing: 1, background: colors.green, color: colors.black, padding: '2px 8px' }}>时间花在真正的销售上</div>
						</div>
					</Actor>
				</Stage>
			</Inner>
		</Slide>
	);
}
