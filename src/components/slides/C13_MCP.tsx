import { motion } from 'framer-motion';
import { Slide, Inner, Title, assetPath, colors, fonts, border, shadow } from '../ui';

/**
 * MCP · 统一通信标准 —— 左图：每个 Agent 各接各的工具；右图：Agent → MCP Client → MCP Server → 工具
 *
 * 演讲者备注：
 * 前面我们的 Agent 用了两个工具：查 internet plan、存客户，都是我们自己写的、接数据库的 function。工具一多、Agent 一多，问题就来了：
 * 左图里每个 Agent 各自去接每个工具，每一条连线都是一套自己的写法。MCP（Model Context Protocol）就是
 * AI 和工具之间的统一通信标准：右图里所有 Agent 都只学一种接法，通过 MCP Client 去接 MCP Server，
 * 数据库这样的工具只需要在一个 Database MCP Server 里接一次，客服 Agent、销售的 Agent 都能用。
 */
const PANELS = [
	{
		label: 'WITHOUT MCP',
		caption: '每个 Agent 各自接每一个工具，连线越来越乱',
		img: 'slides/13-mcp-without.png',
		alt: '没有 MCP：Agent 1/2/3 各自带一堆 Tool，用交叉的连线分别接到 Database、Code repository、AWS APIs、Website',
		color: colors.red,
		textColor: colors.white,
	},
	{
		label: 'WITH MCP',
		caption: 'Agent 通过 MCP Client 接 MCP Server，工具统一在 Server 这一层',
		img: 'slides/13-mcp-with.png',
		alt: '有 MCP：Agent 1/2/3 都接到一个 MCP Client，MCP Client 接 MCP Server 1–4，各 Server 分别接 Database、Code repository、AWS APIs、Website',
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
					}}>05 · 延伸</span>
					<Title size="56px" style={{ letterSpacing: -1 }}>MCP：<span style={{ background: colors.yellow, padding: '0 14px' }}>统一通信标准</span></Title>
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
