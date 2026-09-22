import { motion } from 'framer-motion';
import { Slide, Inner, Title, Subtitle, colors, fonts, border, shadow } from '../ui';
import { Stage, Actor, ActorHeader, type ArrowSpec } from '../Diagram';

/**
 * 用例 · 网络公司的客服（现状：没有聊天机器人，销售人工回答）
 *
 * 演讲者备注：
 * 来学一下一个非常普遍的用例吧：一家网络公司（internet provider）。客户每天打电话、发 Email、在网站聊天框里问的
 * 都是差不多的问题："我家这个地址能装什么 internet plan？多少钱？什么时候能装？"每一个问题都是销售代表人工回答的：
 * 先问清地址，再手动去数据库查这个地址能装的 internet plan，再回复客户。一天下来，销售一半的上班时间都花在重复回答同样的问题上，
 * 真正的销售工作——跟进有意向的客户、成交——反而没时间做。从客户那边看，问一句要等好几个小时才有回复，
 * 等不及的客户就直接换了别家。自然的你就开始想：这些重复的问题，能不能让 AI 来答？
 * 我们来看一下怎么设计你需要的一个 AI 智能体，帮销售接客、查 internet plan、把有意向的客户记下来。
 */
const CHANNELS = [
	{ icon: '📞', label: '打电话' },
	{ icon: '✉️', label: '发 Email' },
	{ icon: '💬', label: '网站在线聊天' },
];

const QUESTION = '“我家这个地址能装什么 internet plan？多少钱？什么时候能装？”';

const REP_STEPS = ['问清地址', '手动查数据库', '回复客户'];

const STEPS = ['客户提问（电话 / Email / 聊天）', '销售手动查 internet plan', '回复慢，客户换别家'];

const ARROWS: ArrowSpec[] = [
	{ points: [{ x: 300, y: 190 }, { x: 500, y: 190 }], label: '同样的问题 · 一遍又一遍', delay: 0.7 },
	{ points: [{ x: 500, y: 310 }, { x: 300, y: 310 }], label: '⏳ 几小时后才回复', color: colors.red, dashed: true, delay: 0.95 },
	{ points: [{ x: 820, y: 180 }, { x: 1000, y: 100 }], label: '手动查 internet plan', delay: 1.15 },
	{ points: [{ x: 820, y: 320 }, { x: 1000, y: 400 }], label: '没时间', color: colors.dark, dashed: true, delay: 1.35 },
];

export default function S02_ManualWorkflow() {
	return (
		<Slide bg={colors.warmBg}>
			<Inner style={{ flexDirection: 'column', justifyContent: 'center', gap: 24 }}>
				<div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32 }}>
					<motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
						<div style={{
							display: 'inline-block', padding: '4px 12px', marginBottom: 14,
							background: colors.yellow, fontFamily: fonts.mono, fontSize: 13,
							fontWeight: 700, letterSpacing: 2, border,
						}}>
							01 · 一个普遍的用例
						</div>
						<Title size="48px" style={{ marginBottom: 8 }}>网络公司的销售，一半时间在回答同样的问题</Title>
						<Subtitle style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
							{STEPS.map((s, i) => (
								<span key={s} style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
									<span style={{ fontFamily: fonts.mono, fontWeight: 700, color: colors.black, background: colors.white, border: `2px solid ${colors.black}`, padding: '0 8px' }}>{i + 1}</span>
									<span style={{ color: colors.black, fontWeight: 600 }}>{s}</span>
									{i < STEPS.length - 1 && <span style={{ color: colors.red, fontWeight: 700 }}>→</span>}
								</span>
							))}
						</Subtitle>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, scale: 0.8, rotate: -4 }}
						animate={{ opacity: 1, scale: 1, rotate: -2 }}
						transition={{ type: 'spring', stiffness: 200, damping: 14, mass: 0.8, delay: 0.5 }}
						style={{
							flexShrink: 0, padding: '14px 26px', background: colors.red, color: colors.white, border, boxShadow: shadow,
							textAlign: 'center',
						}}>
						<div style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, letterSpacing: 2, opacity: 0.9 }}>每天</div>
						<div style={{ fontFamily: fonts.heading, fontSize: 56, fontWeight: 900, lineHeight: 1 }}>半天 <span style={{ fontSize: 24 }}>在重复问答</span></div>
					</motion.div>
				</div>

				<Stage width={1320} height={500} arrows={ARROWS} style={{ alignSelf: 'center' }}>
					<Actor x={0} y={20} w={300} h={440} delay={0.2}>
						<ActorHeader icon="🧑" title="客户" tag="3 个渠道" color={colors.orange} />
						<div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
							{CHANNELS.map((c) => (
								<div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', border: `2px solid ${colors.black}`, fontSize: 18, fontWeight: 700 }}>
									<span style={{ fontSize: 22, lineHeight: 1 }}>{c.icon}</span>{c.label}
								</div>
							))}
							<div style={{ padding: '10px 12px', background: colors.warmBg, border: `2px solid ${colors.black}`, fontSize: 16, lineHeight: 1.5, fontWeight: 600 }}>
								<div style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: 2, opacity: 0.6, marginBottom: 4 }}>问的都是</div>
								{QUESTION}
							</div>
							<div style={{ marginTop: 'auto', padding: '10px 12px', background: colors.red, color: colors.white, fontSize: 17, fontWeight: 800 }}>
								⏳ 等太久 → 换了别家
							</div>
						</div>
					</Actor>

					<Actor x={500} y={110} w={320} h={280} delay={0.35}>
						<ActorHeader icon="🧑‍💼" title="销售代表" tag="人工" color={colors.yellow} />
						<div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
							{REP_STEPS.map((s, i) => (
								<div key={s} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 18, fontWeight: 700 }}>
									<span style={{ fontFamily: fonts.mono, fontSize: 13, background: colors.black, color: colors.white, padding: '2px 8px' }}>{i + 1}</span>{s}
								</div>
							))}
							<div style={{ marginTop: 'auto', padding: '10px 12px', background: colors.red, color: colors.white, fontSize: 16, fontWeight: 800, textAlign: 'center' }}>
								🔁 一天一半时间都在做这个
							</div>
						</div>
					</Actor>

					<Actor x={1000} y={20} w={320} h={160} delay={0.5}>
						<ActorHeader icon="🗄️" title="数据库" tag="internet_plans" color={colors.blue} />
						<div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8, flex: 1, justifyContent: 'center' }}>
							<div style={{ fontSize: 17, fontWeight: 600, lineHeight: 1.45 }}>每个地址能装的 internet plan、速度、价格</div>
							<div style={{ fontFamily: fonts.mono, fontSize: 12, fontWeight: 700, letterSpacing: 1, opacity: 0.6 }}>每问一次 · 手动查一次</div>
						</div>
					</Actor>

					<Actor x={1000} y={320} w={320} h={160} delay={0.65}>
						<ActorHeader icon="💰" title="真正的销售工作" tag="成交" color={colors.green} />
						<div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8, flex: 1, justifyContent: 'center' }}>
							<div style={{ fontSize: 17, fontWeight: 600, lineHeight: 1.45 }}>跟进有意向的客户、谈方案、签合同</div>
							<div style={{ alignSelf: 'flex-start', fontFamily: fonts.mono, fontSize: 12, fontWeight: 700, letterSpacing: 1, background: colors.red, color: colors.white, padding: '2px 8px' }}>没时间做</div>
						</div>
					</Actor>
				</Stage>
			</Inner>
		</Slide>
	);
}
