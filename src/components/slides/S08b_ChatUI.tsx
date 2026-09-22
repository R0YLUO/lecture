import { useState } from 'react';
import { motion } from 'framer-motion';
import { Slide, Inner, Title, colors, fonts, border, shadow, shadowSm } from '../ui';

/**
 * 循环之间 · 客户在网站聊天框里看到的（human in the loop：确认 internet plan、留资料都是客户自己说的）
 *
 * 演讲者备注：
 * 这就是客户在网站上看到的聊天框。前面几轮循环，客户只看到两句话：AI 问地址、AI 介绍 internet plan。
 * 现在轮到客户了：点一个 internet plan、留名字和电话。客户说的每一句，代码都 append 到右边这份 messages 里。
 * 注意这里的 选哪个 internet plan、要不要留电话，都是客户自己说的，AI 不替客户做决定，
 * 也不能在客户没确认之前就往数据库里存东西。下一轮，模型读到名字和电话，才会要求 save_customer_details。
 */
interface Plan { name: string; price: string }

const PLANS: Plan[] = [
	{ name: 'NBN 50', price: '$69/month' },
	{ name: 'NBN 100', price: '$85/month' },
	{ name: 'NBN 250', price: '$99/month' },
];

const ADDRESS = '12 Example St, Clayton VIC 3168';
const CUSTOMER = { name: 'Wei Zhang', phone: '0412 345 678' };

type Role = 'customer' | 'bot';
interface Msg { role: Role; text: string }

const OPENING: Msg[] = [
	{ role: 'customer', text: 'Hi, what internet plans can I get at home?' },
	{ role: 'bot', text: "Happy to help! What's your address?" },
	{ role: 'customer', text: ADDRESS },
	{ role: 'bot', text: `At ${ADDRESS} you can get ${PLANS.map((p) => `${p.name} (${p.price})`).join(', ')}. Which one would you like to go with?` },
];

function followUp(plan: Plan): Msg[] {
	return [
		{ role: 'customer', text: `I'll go with ${plan.name}.` },
		{ role: 'bot', text: `Great choice! Could I get your name and phone number? One of our sales reps will call you to get ${plan.name} connected.` },
		{ role: 'customer', text: `${CUSTOMER.name}, ${CUSTOMER.phone}` },
	];
}

interface LogRow { k: string; v: string; color: string; textColor?: string }

const LOG_BEFORE: LogRow[] = [
	{ k: 'user', v: 'Hi, what internet plans can I get…', color: colors.yellow },
	{ k: 'assistant', v: "What's your address?", color: colors.purple, textColor: colors.white },
	{ k: 'user', v: ADDRESS, color: colors.yellow },
	{ k: 'tool_call', v: 'get_internet_plans(address)', color: colors.blue },
	{ k: 'tool_result', v: '3 plans: NBN 50 / 100 / 250', color: colors.green },
	{ k: 'assistant', v: 'At 12 Example St you can get…', color: colors.purple, textColor: colors.white },
];

function logAfter(plan: Plan): LogRow[] {
	return [
		{ k: 'user', v: `I'll go with ${plan.name}.`, color: colors.yellow },
		{ k: 'assistant', v: 'Could I get your name and phone number?', color: colors.purple, textColor: colors.white },
		{ k: 'user', v: `${CUSTOMER.name}, ${CUSTOMER.phone}`, color: colors.yellow },
	];
}

function Bubble({ msg, delay }: { msg: Msg; delay: number }) {
	const mine = msg.role === 'customer';
	return (
		<motion.div
			initial={{ opacity: 0, y: 12 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.35, delay }}
			style={{ display: 'flex', justifyContent: mine ? 'flex-end' : 'flex-start' }}>
			<div style={{
				maxWidth: '78%', padding: '9px 14px', fontSize: 16, lineHeight: 1.45, fontWeight: 600,
				background: mine ? colors.yellow : colors.white, border: `2px solid ${colors.black}`,
				boxShadow: mine ? undefined : shadowSm,
			}}>
				{msg.text}
			</div>
		</motion.div>
	);
}

export default function S08b_ChatUI() {
	const [plan, setPlan] = useState<Plan | null>(null);
	const after = plan ? followUp(plan) : [];
	const log = plan ? [...LOG_BEFORE, ...logAfter(plan)] : LOG_BEFORE;

	return (
		<Slide bg={colors.warmBg}>
			<Inner style={{ flexDirection: 'column', justifyContent: 'center', gap: 22 }}>
				<motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
					style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
					<span style={{
						padding: '6px 14px', background: colors.black, color: colors.yellow,
						fontFamily: fonts.mono, fontSize: 14, fontWeight: 700, letterSpacing: 2,
					}}>ROUND 02 → 03 · 客户回话</span>
					<Title size="44px">客户这边看到的：<span style={{ background: colors.yellow, padding: '0 14px' }}>网站聊天框</span></Title>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.55, delay: 0.2 }}
					style={{ background: colors.white, border, boxShadow: shadow }}>
					<div style={{
						display: 'flex', alignItems: 'center', gap: 14, padding: '10px 18px',
						background: colors.black, borderBottom: border,
					}}>
						<span style={{ display: 'inline-flex', gap: 6 }}>
							{[colors.red, colors.yellow, colors.green].map((c) => (
								<span key={c} style={{ width: 12, height: 12, background: c, border: `2px solid ${colors.white}` }} />
							))}
						</span>
						<span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, letterSpacing: 2, color: colors.yellow }}>LIVE CHAT · 网站在线聊天</span>
						<span style={{ marginLeft: 'auto', fontFamily: fonts.mono, fontSize: 12, color: colors.white, opacity: 0.6, letterSpacing: 1 }}>AI agent online · replies in seconds</span>
					</div>

					<div style={{ display: 'flex', gap: 24, padding: 20 }}>
						<div style={{
							flex: 1.5, height: 500, border: `2px solid ${colors.black}`, background: colors.warmBg, padding: '18px 22px',
							display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 10, overflow: 'hidden',
						}}>
							{OPENING.map((m, i) => <Bubble key={m.text} msg={m} delay={0.45 + i * 0.12} />)}

							<motion.div
								initial={{ opacity: 0, y: 12 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.35, delay: 1.0 }}
								style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
								{PLANS.map((p) => {
									const active = plan?.name === p.name;
									return (
										<motion.button
											key={p.name}
											type="button"
											onClick={() => setPlan(p)}
											whileHover={{ x: 2, y: 2, boxShadow: `0 0 0 ${colors.black}` }}
											style={{
												padding: '8px 14px', border: `2px solid ${colors.black}`, boxShadow: shadowSm, cursor: 'pointer',
												background: active ? colors.black : colors.white, color: active ? colors.white : colors.black,
												fontFamily: fonts.body, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2,
												opacity: plan && !active ? 0.45 : 1,
											}}>
											<span style={{ fontSize: 16, fontWeight: 800 }}>{active ? '✓ ' : ''}{p.name}</span>
											<span style={{ fontFamily: fonts.mono, fontSize: 12, fontWeight: 700, opacity: 0.8 }}>{p.price}</span>
										</motion.button>
									);
								})}
							</motion.div>

							{after.map((m, i) => <Bubble key={m.text} msg={m} delay={0.1 + i * 0.35} />)}
						</div>

						<div style={{ flex: 1, height: 500, background: colors.dark, border, color: colors.white, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 8 }}>
							<div style={{ fontFamily: fonts.mono, fontSize: 12, letterSpacing: 2, color: colors.yellow, marginBottom: 4 }}>messages · chat history</div>
							{log.map((r, i) => (
								<motion.div
									key={`${r.k}-${r.v}`}
									initial={{ opacity: 0, x: 12 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.3, delay: i < LOG_BEFORE.length ? 0.6 + i * 0.08 : 0.2 + (i - LOG_BEFORE.length) * 0.35 }}
									style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: fonts.mono, fontSize: 13, lineHeight: 1.4 }}>
									<span style={{ flexShrink: 0, width: 96, padding: '2px 6px', background: r.color, color: r.textColor ?? colors.black, fontWeight: 700, textAlign: 'center' }}>{r.k}</span>
									<span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', opacity: 0.9 }}>{r.v}</span>
								</motion.div>
							))}
							<div style={{ marginTop: 'auto', padding: '12px 14px', background: plan ? colors.green : colors.black, color: colors.black, border: `2px solid ${plan ? colors.black : colors.white}` }}>
								<div style={{ fontFamily: fonts.mono, fontSize: 12, letterSpacing: 2, color: plan ? colors.black : colors.yellow, marginBottom: 4 }}>→ 下一轮</div>
								<div style={{ fontFamily: fonts.mono, fontSize: 14, fontWeight: 700, color: plan ? colors.black : colors.white, opacity: plan ? 1 : 0.6 }}>
									{plan ? 'save_customer_details(name, phone)' : '等客户回话…（点一个 internet plan 试试）'}
								</div>
							</div>
						</div>
					</div>
				</motion.div>
			</Inner>
		</Slide>
	);
}
