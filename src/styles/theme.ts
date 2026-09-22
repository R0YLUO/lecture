export const colors = {
	// 品牌基色（与 ai-engineer-bootcamp / xhs-posters 对齐）
	red: '#ff5757',
	dark: '#10162f',
	yellow: '#FFDE59',
	green: '#7ED957',
	blue: '#38B6FF',
	purple: '#CB6CE6',
	orange: '#FF914D',
	warmBg: '#fff1e7',
	darkBg: '#1a1a2e',
	white: '#ffffff',
	black: '#000000',
	indigo: '#6366f1',
	teal: '#10b981',

	// 三大分类配色（与 ai-new-jobs 页面 CATEGORY_CONFIG 对齐）
	techPurple: '#8b5cf6',
	techBg: '#ede9fe',
	govOrange: '#f59e0b',
	govBg: '#fef3c7',
	industryCyan: '#06b6d4',
	industryBg: '#cffafe',

	// 增长曲线色
	explosive: '#ef4444',
	fast: '#f59e0b',
	steady: '#3b82f6',
	emerging: '#06b6d4',
} as const;

export const fonts = {
	heading: '"Bricolage Grotesque", "Noto Sans SC", sans-serif',
	body: '"DM Sans", "Noto Sans SC", sans-serif',
	mono: '"Space Mono", monospace',
} as const;

export const border = `3px solid ${colors.black}`;
export const shadow = `6px 6px 0px ${colors.black}`;
export const shadowSm = `4px 4px 0px ${colors.black}`;
