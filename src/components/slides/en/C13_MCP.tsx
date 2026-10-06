import { motion } from 'framer-motion';
import { Slide, Inner, Title, assetPath, colors, fonts, border, shadow } from '../../ui';

/**
 * MCP · a standard way to communicate — left: every agent wires up its own tools; right: Agent → MCP Client → MCP Server → tools
 *
 * Speaker notes:
 * So far our agent has used three tools, and each one is a function we wrote ourselves. Once you have more tools and more agents,
 * problems appear: on the left, every agent connects to every tool on its own, and every line is its own custom integration.
 * MCP (Model Context Protocol) is a standard way for AI and tools to communicate: on the right, every agent learns just one way
 * to connect — through an MCP Client to an MCP Server — and each tool only needs to be connected once, inside the MCP Server.
 */
const PANELS = [
	{
		label: 'WITHOUT MCP',
		caption: 'Every agent connects to every tool itself — the wiring gets messier and messier',
		img: 'slides/13-mcp-without.png',
		alt: 'Without MCP: Agents 1/2/3 each carry their own set of tools, with criss-crossing lines to Database, Code repository, AWS APIs and Website',
		color: colors.red,
		textColor: colors.white,
	},
	{
		label: 'WITH MCP',
		caption: 'Agents connect through an MCP Client to MCP Servers — tools live in one place, the server layer',
		img: 'slides/13-mcp-with.png',
		alt: 'With MCP: Agents 1/2/3 all connect to one MCP Client, which connects to MCP Servers 1–4; each server connects to Database, Code repository, AWS APIs or Website',
		color: colors.green,
		textColor: colors.black,
	},
];

export default function C13_MCP() {
	return (
		<Slide bg={colors.warmBg}>
			<Inner style={{ flexDirection: 'column', justifyContent: 'center', gap: 24 }}>
				<motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
					style={{ display: 'flex', alignItems: 'baseline', gap: 20 }}>
					<span style={{
						padding: '6px 14px', background: colors.black, color: colors.yellow,
						fontFamily: fonts.mono, fontSize: 14, fontWeight: 700, letterSpacing: 2, alignSelf: 'center',
					}}>05 · BEYOND</span>
					<Title size="56px" style={{ letterSpacing: -1 }}>MCP: <span style={{ background: colors.yellow, padding: '0 14px' }}>one standard protocol</span></Title>
					<span style={{ fontFamily: fonts.mono, fontSize: 18, fontWeight: 700, letterSpacing: 3, color: colors.dark }}>MODEL CONTEXT PROTOCOL</span>
				</motion.div>

				<div style={{ display: 'flex', gap: 32 }}>
					{PANELS.map((p, i) => (
						<motion.div
							key={p.label}
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.25 + i * 0.2 }}
							style={{ flex: 1, background: colors.white, border, boxShadow: shadow, display: 'flex', flexDirection: 'column' }}>
							<div style={{
								background: p.color, color: p.textColor, borderBottom: border, padding: '10px 18px',
								fontFamily: fonts.mono, fontSize: 15, fontWeight: 700, letterSpacing: 2,
							}}>{p.label}</div>
							<img
								src={assetPath(p.img)}
								alt={p.alt}
								style={{ display: 'block', width: '100%', height: 440, objectFit: 'contain', padding: 16 }}
							/>
							<div style={{ borderTop: border, padding: '12px 18px', fontSize: 18, fontWeight: 600, lineHeight: 1.4 }}>{p.caption}</div>
						</motion.div>
					))}
				</div>
			</Inner>
		</Slide>
	);
}
