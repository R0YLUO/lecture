import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Slide, Inner, Title, Subtitle, colors, fonts, border, shadow, shadowSm } from '../ui';

/**
 * MCP · 工具住在自己的服务器里（Database MCP Server）
 *
 * 演讲者备注：
 * 很多人第一反应是：MCP 不就是把 function 换个名字吗？关键区别在这里：前面我们的两个工具是写在 Agent 自己的代码里的，
 * 跟 while True 循环跑在同一个进程。MCP 里，工具搬出去了，住在一个独立的 Database MCP Server 里，可以是本机另一个进程，
 * 也可以是另一台机器上的服务。Agent 这边只剩一个 MCP Client，通过网络跟 Server 说话。
 * 好处：数据库的工具单独部署、单独更新，不用碰 Agent；客服 Agent、销售的 Agent 可以共用同一个 Database MCP Server；
 * 数据库的密钥、读写权限留在 Server 那边，Agent 根本碰不到。下一页我们看 Client 和 Server 之间到底说些什么。
 */
const AGENT_PARTS = [
	{ label: 'LLM 调用', sub: 'llm(messages)', color: colors.purple, textColor: colors.white },
	{ label: 'while True 循环', sub: 'agent loop', color: colors.yellow, textColor: colors.black },
	{ label: 'MCP Client', sub: '只会一种接法', color: colors.green, textColor: colors.black },
];

const TOOLS = [
	{ name: 'get_internet_plans', sub: '→ 查 internet_plans 表' },
	{ name: 'save_customer_details', sub: '→ 写 customers 表' },
];

const BENEFITS = [
	{ k: '独立部署', v: '工具单独更新、单独重启，不用碰 Agent 的代码', color: colors.blue },
	{ k: '一起共用', v: '客服 Agent、销售的 Agent 接同一个 Database MCP Server，工具只写一次', color: colors.green },
	{ k: '权限隔离', v: '数据库密钥、读写权限留在 Server，Agent 碰不到', color: colors.orange },
];

function Box({ title, tag, color, children }: { title: string; tag: string; color: string; children: ReactNode }) {
	return (
		<div style={{ flex: 1, background: colors.white, border, boxShadow: shadow, display: 'flex', flexDirection: 'column' }}>
			<div style={{
				display: 'flex', alignItems: 'center', justifyContent: 'space-between',
				background: color, borderBottom: border, padding: '10px 18px',
			}}>
				<span style={{ fontFamily: fonts.heading, fontSize: 24, fontWeight: 900 }}>{title}</span>
				<span style={{ fontFamily: fonts.mono, fontSize: 12, fontWeight: 700, letterSpacing: 1, background: colors.black, color: colors.white, padding: '3px 10px' }}>{tag}</span>
			</div>
			<div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>{children}</div>
		</div>
	);
}

export default function S14_McpServer() {
	return (
		<Slide bg={colors.white}>
			<Inner style={{ flexDirection: 'column', justifyContent: 'center', gap: 20 }}>
				<motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
					<div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 6 }}>
						<span style={{
							padding: '6px 14px', background: colors.black, color: colors.yellow,
							fontFamily: fonts.mono, fontSize: 14, fontWeight: 700, letterSpacing: 2,
						}}>05 · MCP</span>
						<Title size="44px">工具住在自己的服务器里，<span style={{ background: colors.red, color: colors.white, padding: '0 14px' }}>不在 Agent 里</span></Title>
					</div>
					<Subtitle>Database MCP Server 是一个独立的进程，可以在本机，也可以在另一台机器上。Agent 这边只剩一个 MCP Client。</Subtitle>
				</motion.div>

				<div style={{ display: 'flex', alignItems: 'stretch', gap: 0 }}>
					<motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} style={{ flex: 1, display: 'flex' }}>
						<Box title="Agent" tag="进程 A · 你的代码" color={colors.warmBg}>
							{AGENT_PARTS.map((p, i) => (
								<motion.div
									key={p.label}
									initial={{ opacity: 0, y: 12 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.35, delay: 0.45 + i * 0.1 }}
									style={{
										display: 'flex', alignItems: 'center', justifyContent: 'space-between',
										padding: '12px 16px', background: p.color, color: p.textColor, border, boxShadow: shadowSm,
									}}>
									<span style={{ fontSize: 20, fontWeight: 800 }}>{p.label}</span>
									<span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, opacity: 0.85 }}>{p.sub}</span>
								</motion.div>
							))}
						</Box>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, scaleX: 0 }}
						animate={{ opacity: 1, scaleX: 1 }}
						transition={{ duration: 0.5, delay: 0.75 }}
						style={{ width: 190, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
						<span style={{ fontFamily: fonts.mono, fontSize: 12, fontWeight: 700, letterSpacing: 2, color: colors.dark, opacity: 0.7 }}>网络边界</span>
						<div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 6 }}>
							<span style={{ flex: 1, height: 4, background: colors.black }} />
							<span style={{ fontFamily: fonts.heading, fontSize: 40, fontWeight: 900, lineHeight: 1 }}>⇄</span>
							<span style={{ flex: 1, height: 4, background: colors.black }} />
						</div>
						<span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, background: colors.black, color: colors.yellow, padding: '4px 10px' }}>HTTP / stdio</span>
						<div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
							{['get tools', 'call tool'].map((t) => (
								<span key={t} style={{ fontFamily: fonts.mono, fontSize: 12, fontWeight: 700, border: `2px solid ${colors.black}`, padding: '2px 8px', background: colors.white }}>{t}</span>
							))}
						</div>
					</motion.div>

					<motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} style={{ flex: 1, display: 'flex' }}>
						<Box title="Database MCP Server" tag="进程 B · 接数据库" color={colors.green}>
							{TOOLS.map((t, i) => (
								<motion.div
									key={t.name}
									initial={{ opacity: 0, y: 12 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.35, delay: 0.45 + i * 0.1 }}
									style={{
										display: 'flex', alignItems: 'center', justifyContent: 'space-between',
										padding: '12px 16px', background: colors.dark, color: colors.white, border, boxShadow: shadowSm,
									}}>
									<span style={{ fontFamily: fonts.mono, fontSize: 17, fontWeight: 700, color: colors.blue }}>{t.name}()</span>
									<span style={{ fontSize: 15, fontWeight: 600, opacity: 0.85 }}>{t.sub}</span>
								</motion.div>
							))}
						</Box>
					</motion.div>
				</div>

				<div style={{ display: 'flex', gap: 20 }}>
					{BENEFITS.map((b, i) => (
						<motion.div
							key={b.k}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: 0.95 + i * 0.12 }}
							style={{ flex: 1, display: 'flex', alignItems: 'stretch', background: colors.white, border, boxShadow: shadowSm }}>
							<span style={{
								display: 'flex', alignItems: 'center', padding: '0 16px', background: b.color, borderRight: border,
								fontFamily: fonts.mono, fontSize: 15, fontWeight: 700, whiteSpace: 'nowrap',
							}}>{b.k}</span>
							<span style={{ padding: '12px 16px', fontSize: 17, lineHeight: 1.5, fontWeight: 600 }}>{b.v}</span>
						</motion.div>
					))}
				</div>
			</Inner>
		</Slide>
	);
}
