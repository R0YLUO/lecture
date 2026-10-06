import { motion } from 'framer-motion';
import { Slide, Inner, Title, colors, fonts, border, shadowSm } from '../../ui';
import { CodeBlock } from '../../CodeBlock';

/**
 * MCP · two steps: discover (get tools), then execute (call tool)
 *
 * Speaker notes:
 * Using MCP always takes two steps. Step one is Discovery: when the agent starts up, before the loop begins, the MCP Client asks
 * the server get tools (tools/list in the protocol): which tools do you have, what is each one called, and what arguments does it take?
 * The server replies with a list, we put that list into messages, and that's how the model knows which tools it can ask for.
 * This happens only once. Step two is Execution: inside the while True loop, every time the model asks to use a tool, the client
 * sends call tool (tools/call), handing the tool name and arguments to the server; the server runs it and sends back the result,
 * which we append to messages. This can happen on every turn. Looking back at our code: run_tool is exactly the execution step,
 * and the discovery step is the tool information we put into messages before the loop starts.
 */
const LIST_REQUEST = `
{ "method": "tools/list" }
`;

const LIST_RESPONSE = `
{
  "tools": [
    {
      "name": "get_financial_data",
      "description": "Financial data for the day",
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
	label: string;
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
		n: '1', label: 'Discovery', en: 'DISCOVERY', api: 'get tools', method: 'tools/list',
		when: 'Before the loop · once only', color: colors.blue,
		request: LIST_REQUEST, response: LIST_RESPONSE,
	},
	{
		n: '2', label: 'Execution', en: 'EXECUTION', api: 'call tool', method: 'tools/call',
		when: 'In the loop · whenever the model asks', color: colors.green,
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
						MCP in two steps:
						<span style={{ background: colors.blue, padding: '0 14px', margin: '0 4px' }}>① Discovery</span>
						→
						<span style={{ background: colors.green, padding: '0 14px', margin: '0 4px' }}>② Execution</span>
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
									<span style={{ fontFamily: fonts.heading, fontSize: 26, fontWeight: 900 }}>{p.label}</span>
									<span style={{ marginLeft: 'auto', fontSize: 14, fontWeight: 700, background: colors.white, border: `2px solid ${colors.black}`, padding: '2px 10px' }}>{p.when}</span>
								</div>
								<div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', fontSize: 15, fontWeight: 600 }}>
									<span style={{ fontFamily: fonts.heading, fontSize: 20, fontWeight: 900 }}>{p.api}</span>
									<span style={{ fontFamily: fonts.mono, fontSize: 12, fontWeight: 700, opacity: 0.7 }}>{p.method}</span>
									<span style={{ opacity: 0.8 }}>{i === 0 ? '· which tools the server has, and their arguments' : '· send tool name + arguments, get the result back'}</span>
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
