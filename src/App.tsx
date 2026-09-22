import SlideEngine from './components/SlideEngine';

// 每页一个组件，按章节注释分块（前缀 S/C/Z + 两位序号 + PascalCase）
import S01 from './components/slides/S01_Cover';
import S02 from './components/slides/S02_ManualWorkflow';
import S03 from './components/slides/S03_AgentWorkflow';
import S04 from './components/slides/S04_Concepts';
import S05 from './components/slides/S05_AgenticFormula';
import S06 from './components/slides/S06_AgentLoop';
import S07 from './components/slides/S07_ToolCall';
import S07b from './components/slides/S07b_ToolResult';
import S08 from './components/slides/S08_PresentPlans';
import S08b from './components/slides/S08b_ChatUI';
import S08c from './components/slides/S08c_SaveCall';
import S09 from './components/slides/S09_FinalResponse';
import C10 from './components/slides/C10_Evals';
import S11 from './components/slides/S11_DeterministicEvals';
import S12 from './components/slides/S12_LLMJudge';
import C13 from './components/slides/C13_MCP';
import S14 from './components/slides/S14_McpServer';
import S15 from './components/slides/S15_McpApis';

export default function App() {
	return (
		<SlideEngine>
			{/* CH 0 · 开场 */}
			<S01 />
			{/* CH 1 · 用例：网络公司的客服聊天机器人 */}
			<S02 />
			<S03 />
			<S04 />
			{/* CH 2 · 智能体是什么 · 代码执行 */}
			<S05 />
			<S06 />
			<S07 />
			<S07b />
			<S08 />
			<S08b />
			<S08c />
			<S09 />
			{/* CH 3 · Evals */}
			<C10 />
			<S11 />
			<S12 />
			{/* CH 4 · MCP */}
			<C13 />
			<S14 />
			<S15 />
		</SlideEngine>
	);
}
