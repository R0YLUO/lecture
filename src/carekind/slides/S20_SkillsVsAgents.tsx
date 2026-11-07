import type { ReactNode } from 'react';
import { colors, fonts, border } from '../../components/ui';
import { Frame, Appear, Node, Arrow, Pill, accent } from '../kit';

/**
 * Skills vs agents for context management
 *
 * Speaker notes:
 * A skill is instructions loaded into the current conversation, so it shares the main context — you can see it sitting inside the main window. It is best for repeatable how-to steps.
 * An agent, or subagent, is a separate worker with its own fresh, isolated context window, and it returns a summary. It is best for independent work and keeps the main context clean.
 * This solves two problems. Context rot: long conversations get noisy and quality drops, so we push work into agents.
 * Context bias: an agent that wrote the code tends to approve it, so we keep SWE and QA separate — then tests check the requirements, not the implementation.
 */
const ROWS = [
	{ k: 'What it is', skill: 'Instructions loaded into the current conversation', agent: 'A separate worker with its own context window' },
	{ k: 'Context', skill: 'Shares the main context', agent: 'Fresh, isolated context; returns a summary' },
	{ k: 'Best for', skill: 'Repeatable how-to steps', agent: 'Independent work, keeping the main context clean' },
];

function Window({ title, children, tone = 'plain' }: { title: string; children?: ReactNode; tone?: 'plain' | 'accent' }) {
	return (
		<div style={{ border, background: colors.white, minWidth: 170 }}>
			<div style={{ padding: '3px 10px', borderBottom: border, fontFamily: fonts.mono, fontSize: 12, fontWeight: 700, background: tone === 'accent' ? accent : colors.black, color: colors.white }}>{title}</div>
			<div style={{ padding: 10, display: 'flex', flexDirection: 'column', gap: 5 }}>
				{[100, 85, 70].map((w) => <span key={w} style={{ height: 6, width: `${w}%`, background: colors.black, opacity: 0.25 }} />)}
				{children}
			</div>
		</div>
	);
}

function Column({ name, tone, diagram, side }: { name: string; tone: 'plain' | 'accent'; diagram: ReactNode; side: 'skill' | 'agent' }) {
	return (
		<Node style={{ flex: 1, gap: 14, ...(tone === 'accent' ? { borderColor: accent } : {}) }}>
			<span style={{ fontFamily: fonts.heading, fontSize: 30, fontWeight: 800, color: tone === 'accent' ? accent : colors.black }}>{name}</span>
			<div style={{ display: 'flex', alignItems: 'center', gap: 10, height: 110 }}>{diagram}</div>
			{ROWS.map((r) => (
				<div key={r.k} style={{ display: 'flex', gap: 14, alignItems: 'baseline', borderTop: `2px dashed ${colors.black}`, paddingTop: 8 }}>
					<span style={{ fontFamily: fonts.mono, fontSize: 14, fontWeight: 700, width: 100, flexShrink: 0 }}>{r.k}</span>
					<span style={{ fontSize: 19, fontWeight: 600, lineHeight: 1.3 }}>{r[side]}</span>
				</div>
			))}
		</Node>
	);
}

export default function S20_SkillsVsAgents() {
	return (
		<Frame section={4} title="Skills vs agents for context management" gap={22}>
			<div style={{ display: 'flex', gap: 22 }}>
				<Appear delay={0.2} style={{ flex: 1, display: 'flex' }}>
					<Column name="Skill" tone="plain" side="skill" diagram={
						<Window title="MAIN CONTEXT">
							<span style={{ marginTop: 4, alignSelf: 'flex-start' }}><Pill size={12} tone="accent">+ skill steps</Pill></span>
						</Window>
					} />
				</Appear>
				<Appear delay={0.35} style={{ flex: 1, display: 'flex' }}>
					<Column name="Agent (subagent)" tone="accent" side="agent" diagram={<>
						<Window title="MAIN CONTEXT" />
						<div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
							<Arrow length={60} label="task" />
							<Arrow length={60} label="summary" reverse dashed />
						</div>
						<Window title="OWN CONTEXT" tone="accent" />
					</>} />
				</Appear>
			</div>
			<div style={{ display: 'flex', gap: 22 }}>
				{[
					{ t: 'Context rot', p: 'Long conversations get noisy and quality drops', f: 'Push work into agents' },
					{ t: 'Context bias', p: 'An agent that wrote the code tends to approve it', f: 'Keep SWE and QA separate: tests check the requirements, not the implementation' },
				].map((c, i) => (
					<Appear key={c.t} delay={0.6 + i * 0.12} style={{ flex: 1, display: 'flex' }}>
						<div style={{ flex: 1, border, background: colors.warmBg, borderLeft: `12px solid ${accent}`, padding: '12px 18px', display: 'flex', flexDirection: 'column', gap: 6 }}>
							<span style={{ fontFamily: fonts.heading, fontSize: 24, fontWeight: 800 }}>{c.t}</span>
							<span style={{ fontSize: 18, fontWeight: 500 }}>{c.p}</span>
							<span style={{ fontSize: 18, fontWeight: 700 }}><span style={{ color: accent }}>→</span> {c.f}</span>
						</div>
					</Appear>
				))}
			</div>
		</Frame>
	);
}
