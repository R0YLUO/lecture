import { motion } from 'framer-motion';
import { Slide, Inner, Title, colors, fonts, border, shadowSm } from '../ui';
import { CodeBlock } from '../CodeBlock';

/**
 * MCP · 两步走：发现（get tools）再执行（call tool）
 *
 * 演讲者备注：
 * 用 MCP 永远是两步。第一步"发现"（Discovery）：Agent 启动、循环还没开始的时候，MCP Client 先问 Server 一句
 * get tools（协议里叫 tools/list）：你有哪些工具、每个叫什么、要什么参数？Server 回一张清单，我们把清单放进 messages，
 * 模型才知道有什么工具可以要。这一步只做一次。第二步"执行"（Execution）：进了 while True 循环，模型每次要求工具使用，
 * Client 就发一句 call tool（tools/call），把工具名和参数交给 Server，Server 跑完把结果回来，我们 append 到 messages。
 * 这一步每一轮都可能发生。回头看那段代码：run_tool 干的就是执行这一步；发现那一步，就是循环开始前放进 messages 的工具资料。
 */
const LIST_REQUEST = `
{ "method": "tools/list" }
`;

const LIST_RESPONSE = `
{
  "tools": [
    {
      "name": "get_financial_data",
      "description": "当天的财务资料",
      "inputSchema": { "date": "string" }
    },
    { "name": "get_kanban_tasks", ... },
    { "name": "send_email", ... }
  ]
}
`;

const CALL_REQUEST = `
{
  "method": "tools/call",
  "params": {
    "name": "get_financial_data",
    "arguments": { "date": "24-09-2026" }
  }
}
`;

const CALL_RESPONSE = `
{
  "content": [
    { "type": "text", "text": "revenue 12400, expenses 8150, net_profit 4250" }
  ]
}
`;

interface Phase {
	n: string;
	zh: string;
	en: string;
	api: string;
	method: string;
	when: string;
	color: string;
	request: string;
	response: string;
}

const PHASES: Phase[] = [
	{
		n: '1', zh: '发现', en: 'DISCOVERY', api: 'get tools', method: 'tools/list',
		when: '循环开始前 · 只做一次', color: colors.blue,
		request: LIST_REQUEST, response: LIST_RESPONSE,
	},
	{
		n: '2', zh: '执行', en: 'EXECUTION', api: 'call tool', method: 'tools/call',
		when: '循环里 · 模型每次要求工具', color: colors.green,
		request: CALL_REQUEST, response: CALL_RESPONSE,
	},
];

export default function S15_McpApis() {
	return (
		<Slide bg={colors.warmBg}>
			<Inner style={{ flexDirection: 'column', justifyContent: 'center', gap: 16 }}>
				<motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
					style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
					<span style={{
						padding: '6px 14px', background: colors.black, color: colors.yellow,
						fontFamily: fonts.mono, fontSize: 14, fontWeight: 700, letterSpacing: 2,
					}}>05 · MCP</span>
					<Title size="42px">
						用 MCP 分两步：
						<span style={{ background: colors.blue, padding: '0 14px', margin: '0 4px' }}>① 发现 Discovery</span>
						→
						<span style={{ background: colors.green, padding: '0 14px', margin: '0 4px' }}>② 执行 Execution</span>
					</Title>
				</motion.div>

				<div style={{ display: 'flex', gap: 28, alignItems: 'stretch' }}>
					{PHASES.map((p, i) => (
						<motion.div
							key={p.en}
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.2 + i * 0.3 }}
							style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
							<div style={{ border, boxShadow: shadowSm, background: colors.white }}>
								<div style={{
									display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px',
									background: p.color, borderBottom: border,
								}}>
									<span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, background: colors.black, color: colors.white, padding: '2px 8px' }}>PHASE {p.n}</span>
									<span style={{ fontFamily: fonts.heading, fontSize: 26, fontWeight: 900 }}>{p.zh}</span>
									<span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>{p.en}</span>
									<span style={{ marginLeft: 'auto', fontSize: 14, fontWeight: 700, background: colors.white, border: `2px solid ${colors.black}`, padding: '2px 10px' }}>{p.when}</span>
								</div>
								<div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', fontSize: 15, fontWeight: 600 }}>
									<span style={{ fontFamily: fonts.heading, fontSize: 20, fontWeight: 900 }}>{p.api}</span>
									<span style={{ fontFamily: fonts.mono, fontSize: 12, fontWeight: 700, opacity: 0.7 }}>{p.method}</span>
									<span style={{ opacity: 0.8 }}>{i === 0 ? '· Server 有哪些工具、要什么参数' : '· 工具名 + 参数发过去，结果回来'}</span>
								</div>
							</div>
							<CodeBlock code={p.request} lang="json" title="request →" fontSize={14} dense delay={0.5 + i * 0.3} />
							<CodeBlock code={p.response} lang="json" title="← response" fontSize={14} dense delay={0.65 + i * 0.3} style={{ flex: 1 }} />
						</motion.div>
					))}
				</div>
			</Inner>
		</Slide>
	);
}
