import SlideEngine from '../components/SlideEngine';

// CareKind Voice AI · Tutorial 08/11 — one component per slide in ./slides
import S01 from './slides/S01_Title';
import S02 from './slides/S02_Agenda';
import S03 from './slides/S03_GoalScope';
import S04 from './slides/S04_FeatureFlow';
import S05 from './slides/S05_RecordUpload';
import S06 from './slides/S06_Transcribe';
import S07 from './slides/S07_EditSave';
import S08 from './slides/S08_Logging';
import S09 from './slides/S09_LlmFits';
import S10 from './slides/S10_ThreeLayers';
import S11 from './slides/S11_TraceSequence';
import S12 from './slides/S12_WhatIsTrace';
import S13 from './slides/S13_AdapterPattern';
import S14 from './slides/S14_AdapterContract';
import S15 from './slides/S15_Scaling';
import S16 from './slides/S16_SystemView';
import S17 from './slides/S17_SequenceView';
import S18 from './slides/S18_TestStrategy';
import S19 from './slides/S19_WhatIsSkill';
import S20 from './slides/S20_SkillsVsAgents';
import S21 from './slides/S21_OurAgents';
import S22 from './slides/S22_WrapUp';

export default function App() {
	return (
		<SlideEngine>
			{/* 0 · Opening */}
			<S01 />
			<S02 />
			<S03 />
			{/* 1 · Feature and requirements run-through */}
			<S04 />
			<S05 />
			<S06 />
			<S07 />
			<S08 />
			<S09 />
			{/* 2 · Technical design */}
			<S10 />
			<S11 />
			<S12 />
			<S13 />
			<S14 />
			<S15 />
			<S16 />
			<S17 />
			{/* 3 · Test strategy */}
			<S18 />
			{/* 4 · Coding agent fundamentals */}
			<S19 />
			<S20 />
			<S21 />
			{/* Close */}
			<S22 />
		</SlideEngine>
	);
}
