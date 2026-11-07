import { colors, fonts, border } from '../../components/ui';
import { Frame, Bullets, Node, Chip, Arrow, Appear, Code, Pill, accent } from '../kit';

/**
 * What is a skill, and why use one?
 *
 * Speaker notes:
 * A skill is a reusable instruction file, SKILL.md, for one job — for example code review or writing a test plan.
 * Look at the diagram: the agent only carries each skill's short description in its context. When it needs one, it loads the full steps. That keeps the context small.
 * We use skills for consistent results, to write team standards once, and to stop repeating the same prompts.
 * Skills are harness agnostic: the same skill files work in Claude Code and in Codex.
 */
export default function S19_WhatIsSkill() {
	return (
		<Frame section={4} title="What is a skill, and why use one?">
			<div style={{ display: 'flex', gap: 44, alignItems: 'center' }}>
				<Bullets delay={0.2} size={24} style={{ flex: 1 }} items={[
					<>A skill is a reusable instruction file (<Code>SKILL.md</Code>) for one job, e.g. "code review" or "test plan".</>,
					'The agent sees only the short description until it needs it, then loads the full steps.',
					'Why: consistent results, team standards written once, less repeated prompting.',
					<><strong>Harness agnostic:</strong> the same skill files work in Claude Code and Codex.</>,
				]} />
				<div style={{ width: 560, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
					<Appear delay={0.5}>
						<Node style={{ gap: 8 }}>
							<Chip>AGENT CONTEXT · descriptions only</Chip>
							{['code-review', 'test-plan'].map((n, i) => (
								<div key={n} style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: fonts.mono, fontSize: 16, fontWeight: 700, padding: '4px 8px', border: `2px ${i === 0 ? 'solid' : 'dashed'} ${i === 0 ? accent : colors.black}` }}>
									<span style={{ color: i === 0 ? accent : colors.black }}>{n}</span>
									<span style={{ opacity: 0.6 }}>— one-line description</span>
								</div>
							))}
						</Node>
					</Appear>
					<Appear delay={0.65} style={{ display: 'flex', justifyContent: 'center' }}><Arrow vertical length={30} label="needed → load full steps" style={{ margin: '6px 0' }} /></Appear>
					<Appear delay={0.8}>
						<Node tone="accent" style={{ gap: 6 }}>
							<Chip>code-review/SKILL.md</Chip>
							{['1. …', '2. …', '3. …'].map((s) => <span key={s} style={{ fontFamily: fonts.mono, fontSize: 16, fontWeight: 700, borderBottom: `2px dashed ${colors.white}` }}>{s}</span>)}
						</Node>
					</Appear>
					<Appear delay={1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 22, padding: '10px 14px', border }}>
						<span style={{ fontFamily: fonts.mono, fontSize: 15, fontWeight: 700 }}>same skill files</span>
						<Arrow length={26} />
						<Pill size={15}>Claude Code</Pill>
						<Pill size={15}>Codex</Pill>
					</Appear>
				</div>
			</div>
		</Frame>
	);
}
