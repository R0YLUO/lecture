import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { colors, fonts, border, shadow } from './ui';

// 代码片段基元 —— 深底 + 粗黑边 + 硬阴影，自带 Python / JSON 的轻量高亮，逐行错峰入场。

type Lang = 'python' | 'json';
type TokenType = 'comment' | 'string' | 'key' | 'keyword' | 'literal' | 'func' | 'ident' | 'punct' | 'space';
interface Token { text: string; type: TokenType }

const LANGS: Record<Lang, { re: RegExp; types: TokenType[] }> = {
	python: {
		re: /(#.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(\b(?:while|if|elif|else|return|def|for|in|not|and|or|import|from|class|pass|break|continue)\b)|(\b(?:True|False|None)\b|\b\d+(?:\.\d+)?\b)|([A-Za-z_]\w*(?=\())|([A-Za-z_]\w*)|(\s+)|([^\sA-Za-z_]+)/g,
		types: ['comment', 'string', 'keyword', 'literal', 'func', 'ident', 'space', 'punct'],
	},
	json: {
		re: /("(?:[^"\\]|\\.)*"(?=\s*:))|("(?:[^"\\]|\\.)*")|(\b(?:null|true|false)\b)|(-?\b\d+(?:\.\d+)?\b)|(\s+)|([^\s"]+)/g,
		types: ['key', 'string', 'literal', 'literal', 'space', 'punct'],
	},
};

function tokenize(line: string, lang: Lang): Token[] {
	const { re, types } = LANGS[lang];
	const tokens: Token[] = [];
	re.lastIndex = 0;
	let last = 0;
	let m: RegExpExecArray | null;
	while ((m = re.exec(line)) !== null) {
		if (m[0].length === 0) { re.lastIndex++; continue; }
		if (m.index > last) tokens.push({ text: line.slice(last, m.index), type: 'ident' });
		const gi = m.slice(1).findIndex((g) => g !== undefined);
		tokens.push({ text: m[0], type: types[gi] ?? 'ident' });
		last = m.index + m[0].length;
	}
	if (last < line.length) tokens.push({ text: line.slice(last), type: 'ident' });
	return tokens;
}

const TOKEN_STYLE: Record<TokenType, CSSProperties> = {
	comment: { color: colors.white, opacity: 0.45, fontStyle: 'italic' },
	string: { color: colors.green },
	key: { color: colors.yellow, fontWeight: 700 },
	keyword: { color: colors.purple, fontWeight: 700 },
	literal: { color: colors.orange, fontWeight: 700 },
	func: { color: colors.blue },
	ident: { color: colors.white },
	punct: { color: colors.white, opacity: 0.6 },
	space: {},
};

export function CodeBlock({
	code,
	lang,
	title,
	fontSize = 22,
	lineNumbers = false,
	dense = false,
	delay = 0.2,
	style,
}: {
	code: string;
	lang: Lang;
	title?: string;
	fontSize?: number;
	lineNumbers?: boolean;
	dense?: boolean;
	delay?: number;
	style?: CSSProperties;
}) {
	const lines = code.replace(/^\n+|\n+$/g, '').split('\n');
	return (
		<div style={{ border, boxShadow: shadow, background: colors.dark, ...style }}>
			{title && (
				<div style={{
					display: 'flex', alignItems: 'center', gap: 14, padding: dense ? '7px 14px' : '10px 18px',
					background: colors.black, borderBottom: border,
				}}>
					<span style={{ display: 'inline-flex', gap: 6 }}>
						{[colors.red, colors.yellow, colors.green].map((c) => (
							<span key={c} style={{ width: 12, height: 12, background: c, border: `2px solid ${colors.white}` }} />
						))}
					</span>
					<span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, letterSpacing: 2, color: colors.yellow }}>{title}</span>
				</div>
			)}
			<pre style={{
				margin: 0, padding: dense ? '14px 18px' : '22px 26px', fontFamily: fonts.mono, fontSize, lineHeight: dense ? 1.55 : 1.7,
				color: colors.white, whiteSpace: 'pre-wrap', wordBreak: 'break-word',
			}}>
				{lines.map((line, i) => (
					<motion.div
						key={i}
						initial={{ opacity: 0, x: -10 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.3, delay: delay + i * 0.06 }}
						style={{ display: 'flex' }}
					>
						{lineNumbers && (
							<span style={{ width: 36, flexShrink: 0, textAlign: 'right', marginRight: 22, color: colors.white, opacity: 0.35, userSelect: 'none' }}>
								{i + 1}
							</span>
						)}
						<span style={{ flex: 1, minWidth: 0 }}>
							{line === ''
								? ' '
								: tokenize(line, lang).map((t, j) => <span key={j} style={TOKEN_STYLE[t.type]}>{t.text}</span>)}
						</span>
					</motion.div>
				))}
			</pre>
		</div>
	);
}
