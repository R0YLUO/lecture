import { cpSync } from 'node:fs';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

// 英文版页面在 dist/en/，相对路径的 public/ 资源（logo、slide 图）要在那里也有一份
function publicForEn(): Plugin {
	return {
		name: 'public-for-en',
		apply: 'build',
		closeBundle() {
			cpSync('public', 'dist/en', { recursive: true });
		},
	};
}

export default defineConfig({
	plugins: [react(), publicForEn()],
	// 相对路径 base —— 部署到任意子路径都能跑（GitHub Pages / 自建服务器 / S3 均可）。
	// 若部署到固定子路径，也可改成 '/your-path/'。
	base: './',
	// 两个入口：中文版在根路径，英文版在 /en/
	build: {
		rollupOptions: {
			input: {
				main: 'index.html',
				en: 'en/index.html',
			},
		},
	},
});
