import { motion } from 'framer-motion';
import { Slide, Inner, Title, Grid, colors, fonts, border, shadow } from '../ui';

/**
 * 一些基本概念 · LLM / API / Function / Tool Use
 *
 * 演讲者备注：
 * LLM 就是大数据模型。只能是输入数据，再输出数据，本体上来说是不能跟外面世界接触的，但他是 AI 智能体的大脑。
 * 就像人的大脑，我们的想法、思维，是不能直接跟外面的世界接触的，而是通过我们的身体来交互。
 * API 就是两个系统之间联系的方式。你跟我就是两个系统。我们俩之间联系方式就是我们说的语言。API 就是两个软件系统的语言。
 * Function 就是一段代码。一个软件就可以用一个 Function 来执行一些代码，跑一些逻辑。软件可以在 function 里输入一些资料，
 * function 会用资料来做一些事情，也可能输出一些资料。我们可以用我们的胳膊作比较。胳膊的任务可以是抬起一个东西。
 * 我们神经输入一些能量，然后可以输出一些汗。当然，我们说的 API 就可以在一个 function 里执行。
 * 就像我用我嘴（我身体的一个 function），通过语言（人的 API），来跟你们相处。
 * Tool Use 就是 AI 系统的方法，用这些概念，使模型跟外面世界接触。就像我们的大脑使用我们的嘴和语言跟人相交流。
 */
const CONCEPTS = [
	{ icon: '🧠', name: 'LLM', def: '大语言模型', color: colors.purple },
	{ icon: '💪', name: 'Function', def: '软件用来执行一段代码', color: colors.orange },
	{ icon: '↔️', name: 'API', def: '软件联系方法', color: colors.blue },
	{ icon: '🦾', name: 'Tool Use', def: 'LLM 通过 function 接触世界', color: colors.green },
];

export default function S04_Concepts() {
	return (
		<Slide bg={colors.white}>
			<Inner style={{ flexDirection: 'column', justifyContent: 'center' }}>
				<motion.div
					initial={{ opacity: 0, y: -16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.45 }}
					style={{ marginBottom: 32 }}>
					<div style={{
						display: 'inline-block', padding: '4px 12px', marginBottom: 16,
						background: colors.yellow, fontFamily: fonts.mono, fontSize: 13,
						fontWeight: 700, letterSpacing: 2, border,
					}}>
						02 · 基本概念
					</div>
					<Title size="56px">一些基本概念</Title>
				</motion.div>

				<Grid cols={4} gap={24}>
					{CONCEPTS.map((c, i) => (
						<motion.div
							key={c.name}
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.45, delay: 0.2 + i * 0.12 }}
							style={{
								background: colors.white, border, boxShadow: shadow,
								display: 'flex', flexDirection: 'column', minHeight: 200,
							}}>
							<div style={{
								background: c.color, borderBottom: border, padding: '20px 20px 16px',
								display: 'flex', alignItems: 'center', gap: 12,
							}}>
								<span style={{ fontSize: 40, lineHeight: 1 }}>{c.icon}</span>
								<span style={{ fontFamily: fonts.heading, fontSize: 30, fontWeight: 900, color: colors.black, letterSpacing: -0.5 }}>{c.name}</span>
							</div>
							<div style={{ padding: '20px 20px 24px' }}>
								<p style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.4 }}>{c.def}</p>
							</div>
						</motion.div>
					))}
				</Grid>
			</Inner>
		</Slide>
	);
}
