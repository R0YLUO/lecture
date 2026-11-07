import { cpSync } from 'node:fs';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

// 子路径页面（/en/、/carekind/）各自在 dist/ 下，相对路径的 public/ 资源（logo、slide 图）要在那里也有一份
function publicForSubpages(): Plugin {
	return {
		name: 'public-for-subpages',
		apply: 'build',
		closeBundle() {
			for (const dir of ['en', 'carekind']) cpSync('public', `dist/${dir}`, { recursive: true });
		},
	};
}

export default defineConfig({
	plugins: [react(), publicForSubpages()],
	// 相对路径 base —— 部署到任意子路径都能跑（GitHub Pages / 自建服务器 / S3 均可）。
	// 若部署到固定子路径，也可改成 '/your-path/'。
	base: './',
	// 三个入口：中文版在根路径，英文版在 /en/，CareKind 教程在 /carekind/
	build: {
		rollupOptions: {
			input: {
				main: 'index.html',
				en: 'en/index.html',
				carekind: 'carekind/index.html',
			},
		},
	},
});
