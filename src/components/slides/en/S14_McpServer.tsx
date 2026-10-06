import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Slide, Inner, Title, colors, fonts, border, shadow, shadowSm } from '../../ui';

/**
 * MCP · tools live on their own server
 *
 * Speaker notes:
 * A lot of people's first reaction is: isn't MCP just a new name for functions? Here's the key difference: our three tools so far
 * were written inside the agent's own code, running in the same process as the while True loop. With MCP, the tools live
 * in a separate MCP Server — that could be another process on the same machine, or a service on a different machine.
 * All that's left on the agent side is an MCP Client, which talks to the server over the network.
 * The benefits: tools are deployed and updated independently, without touching the agent; many agents can share the same server;
 * and database keys and permissions stay on the server side, where the agent can't touch them. Next, let's look at what the
 * client and server actually say to each other.
 */
const AGENT_PARTS = [
	{ label: 'LLM call', sub: 'LLM(messages)', color: colors.purple, textColor: colors.white },
	{ label: 'while True loop', sub: 'agent loop', color: colors.yellow, textColor: colors.black },
	{ label: 'MCP Client', sub: 'one way to connect', color: colors.green, textColor: colors.black },
];

const TOOLS = [
	{ name: 'get_financial_data', sub: '→ database' },
	{ name: 'get_kanban_tasks', sub: '→ Kanban API' },
	{ name: 'send_email', sub: '→ email API' },
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
					<div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
						<span style={{
							padding: '6px 14px', background: colors.black, color: colors.yellow,
							fontFamily: fonts.mono, fontSize: 14, fontWeight: 700, letterSpacing: 2,
						}}>05 · MCP</span>
						<Title size="44px">Tools live on their own server, <span style={{ background: colors.red, color: colors.white, padding: '0 14px' }}>not in the agent</span></Title>
					</div>
				</motion.div>

				<div style={{ display: 'flex', alignItems: 'stretch', gap: 0 }}>
					<motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} style={{ flex: 1, display: 'flex' }}>
						<Box title="Agent" tag="PROCESS A · YOUR CODE" color={colors.warmBg}>
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
						<span style={{ fontFamily: fonts.mono, fontSize: 12, fontWeight: 700, letterSpacing: 2, color: colors.dark, opacity: 0.7 }}>NETWORK BOUNDARY</span>
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
						<Box title="MCP Server" tag="PROCESS B · DEPLOYED SEPARATELY" color={colors.green}>
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
									<span style={{ fontFamily: fonts.mono, fontSize: 18, fontWeight: 700, color: colors.blue }}>{t.name}()</span>
									<span style={{ fontSize: 15, fontWeight: 600, opacity: 0.85 }}>{t.sub}</span>
								</motion.div>
							))}
						</Box>
					</motion.div>
				</div>
			</Inner>
		</Slide>
	);
}
