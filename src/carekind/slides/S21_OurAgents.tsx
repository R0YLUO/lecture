import { motion } from 'framer-motion';
import { colors, fonts, border, shadowSm } from '../../components/ui';
import { Frame, Chip, Appear, Num, accent } from '../kit';

/**
 * Our agents and their skills
 *
 * Speaker notes:
 * We use three agents, one per lane. The Architect does solution design, code design — contracts, classes, sequence diagrams — and code review against our ADRs and confirmed designs.
 * The SWE codes following our principles, opens PRs with diagrams, and reviews code for performance, security, quality and unslop. The SWE does not write tests.
 * QA writes the test plan and builds the tests.
 * Follow the numbers left to right: the Architect designs, QA plans tests, SWE codes, QA builds tests, and then the Architect and SWE review.
 */
const LANES = [
	{ name: 'Architect', note: '', skills: ['Solution design (high-level system design)', 'Code design (contracts, classes, sequence diagrams)', 'Code review (against ADRs and confirmed designs)'] },
	{ name: 'SWE', note: 'DOES NOT WRITE TESTS', skills: ['Coding (follows principles)', 'PR (with diagrams)', 'Code review (performance, security, quality, unslop)'] },
	{ name: 'QA', note: '', skills: ['Test plan', 'Test build'] },
];
// lane index (or span of lanes) and label for each step, in time order
const STEPS: { lanes: number[]; label: string }[] = [
	{ lanes: [0], label: 'Architect designs' },
	{ lanes: [2], label: 'QA plans tests' },
	{ lanes: [1], label: 'SWE codes' },
	{ lanes: [2], label: 'QA builds tests' },
	{ lanes: [0, 1], label: 'Architect + SWE review' },
];

const HEAD_W = 470, LANE_H = 136, GAP = 10, TOTAL_W = 1320;
const COL_W = (TOTAL_W - HEAD_W) / STEPS.length;
const CELL_W = COL_W - 26, CELL_H = 60;

function cellBox(i: number) {
	const s = STEPS[i];
	const top = Math.min(...s.lanes) * (LANE_H + GAP);
	const bottom = (Math.max(...s.lanes) + 1) * (LANE_H + GAP) - GAP;
	const cy = (top + bottom) / 2;
	const cx = HEAD_W + (i + 0.5) * COL_W;
	const h = s.lanes.length > 1 ? bottom - top - 40 : CELL_H;
	return { cx, cy, h, left: cx - CELL_W / 2, top: cy - h / 2 };
}

export default function S21_OurAgents() {
	const height = LANES.length * (LANE_H + GAP) - GAP;
	return (
		<Frame section={4} title="Our agents and their skills" gap={22}>
			<div style={{ position: 'relative', width: TOTAL_W, height, alignSelf: 'center' }}>
				{LANES.map((l, i) => (
					<Appear key={l.name} delay={0.15 + i * 0.1}
						style={{ position: 'absolute', left: 0, top: i * (LANE_H + GAP), width: TOTAL_W, height: LANE_H, display: 'flex', border, boxShadow: shadowSm, background: colors.white }}>
						<div style={{ width: HEAD_W, flexShrink: 0, padding: '10px 16px', borderRight: border, display: 'flex', flexDirection: 'column', gap: 3, background: i === 1 ? accent : colors.warmBg, color: i === 1 ? colors.white : colors.black }}>
							<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
								<span style={{ fontFamily: fonts.heading, fontSize: 28, fontWeight: 800 }}>{l.name}</span>
								{l.note && <Chip>{l.note}</Chip>}
							</div>
							{l.skills.map((s) => <span key={s} style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.3 }}>· {s}</span>)}
						</div>
						<div style={{ flex: 1, backgroundImage: `repeating-linear-gradient(90deg, transparent 0 ${COL_W - 2}px, ${colors.black}22 ${COL_W - 2}px ${COL_W}px)` }} />
					</Appear>
				))}

				<svg width={TOTAL_W} height={height} style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none' }}>
					<defs>
						<marker id="ck-head" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
							<path d="M0,0 L10,5 L0,10 z" fill={colors.black} />
						</marker>
					</defs>
					{STEPS.slice(1).map((_, k) => {
						const a = cellBox(k), b = cellBox(k + 1);
						const x1 = a.cx + CELL_W / 2, x2 = b.cx - CELL_W / 2, mx = (x1 + x2) / 2;
						return (
							<motion.path key={k} d={`M${x1},${a.cy} L${mx},${a.cy} L${mx},${b.cy} L${x2 - 2},${b.cy}`}
								fill="none" stroke={colors.black} strokeWidth={3} markerEnd="url(#ck-head)"
								initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.7 + k * 0.2 }} />
						);
					})}
				</svg>

				{STEPS.map((s, i) => {
					const b = cellBox(i);
					return (
						<motion.div key={s.label}
							initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: 0.55 + i * 0.2 }}
							style={{
								position: 'absolute', left: b.left, top: b.top, width: CELL_W, height: b.h, border, boxShadow: shadowSm,
								background: i === STEPS.length - 1 ? colors.dark : colors.white, color: i === STEPS.length - 1 ? colors.white : colors.black,
								display: 'flex', alignItems: 'center', gap: 8, padding: '0 8px',
							}}>
							<Num n={i + 1} />
							<span style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.2 }}>{s.label}</span>
						</motion.div>
					);
				})}
			</div>
			<Appear delay={1.6} style={{ alignSelf: 'flex-end', fontFamily: fonts.mono, fontSize: 14, fontWeight: 700 }}>
				time <span style={{ color: accent }}>→</span>
			</Appear>
		</Frame>
	);
}
