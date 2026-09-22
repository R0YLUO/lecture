import { motion } from 'framer-motion';
import { Slide, Inner, Half, Title, Subtitle, colors, fonts, border, shadowSm } from '../ui';

// 示例内容页 —— 演示 split 布局 + 复用基元 + 错峰入场动画
export default function S02_Example() {
	return (
		<Slide bg={colors.white}>
			<Inner split>
				<Half>
					<motion.div {...{ initial: { opacity: 0, x: -40 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.5 } }}>
						<div style={{
							display: 'inline-block', padding: '4px 12px', marginBottom: 20,
							background: colors.yellow, fontFamily: fonts.mono, fontSize: 13,
							fontWeight: 700, letterSpacing: 2, border,
						}}>
							01 · 章节
						</div>
						<Title size="56px" style={{ marginBottom: 16 }}>一个论点标题</Title>
						<Subtitle>把内容写在 data/*.ts，缺数据就 omit，绝不编造。</Subtitle>
					</motion.div>
				</Half>
				<Half>
					{['真实数据点 A', '真实数据点 B', '真实数据点 C'].map((t, i) => (
						<motion.div
							key={t}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: 0.2 + i * 0.12 }}
							style={{
								padding: '18px 22px', marginBottom: 14,
								background: colors.warmBg, border, boxShadow: shadowSm,
								fontSize: 20, fontWeight: 700,
							}}>
							{t}
						</motion.div>
					))}
				</Half>
			</Inner>
		</Slide>
	);
}
