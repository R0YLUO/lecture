import SlideEngine from '../components/SlideEngine';

// English deck — one component per slide, grouped by chapter (prefix S/C/Z + two-digit index + PascalCase)
import S01 from '../components/slides/en/S01_Cover';
import S02 from '../components/slides/en/S02_ManualWorkflow';
import S03 from '../components/slides/en/S03_AgentWorkflow';
import S04 from '../components/slides/en/S04_Concepts';
import S05 from '../components/slides/en/S05_AgenticFormula';
import S05b from '../components/slides/en/S05b_AgentLoopFlow';
import S06 from '../components/slides/en/S06_AgentLoop';
import S07 from '../components/slides/en/S07_ToolCall';
import S07b from '../components/slides/en/S07b_ToolResult';
import S08 from '../components/slides/en/S08_VerifyCall';
import S08b from '../components/slides/en/S08b_VerifyUI';
import S08c from '../components/slides/en/S08c_VerifyResult';
import S09 from '../components/slides/en/S09_FinalResponse';
import S09b from '../components/slides/en/S09b_ExecutionPatterns';
import C10 from '../components/slides/en/C10_Evals';
import S11 from '../components/slides/en/S11_DeterministicEvals';
import S12 from '../components/slides/en/S12_LLMJudge';
import C13 from '../components/slides/en/C13_MCP';
import S14 from '../components/slides/en/S14_McpServer';
import S15 from '../components/slides/en/S15_McpApis';

export default function App() {
	return (
		<SlideEngine>
			{/* CH 0 · Opening */}
			<S01 />
			{/* CH 1 · Use case: the end-of-day report */}
			<S02 />
			<S03 />
			{/* CH 2 · Basic concepts */}
			<S04 />
			{/* CH 3 · What is an agent · code execution */}
			<S05 />
			<S05b />
			<S06 />
			<S07 />
			<S07b />
			<S08 />
			<S08b />
			<S08c />
			<S09 />
			<S09b />
			{/* CH 4 · Evals */}
			<C10 />
			<S11 />
			<S12 />
			{/* CH 5 · MCP */}
			<C13 />
			<S14 />
			<S15 />
		</SlideEngine>
	);
}
