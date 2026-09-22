import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	// 相对路径 base —— 部署到任意子路径都能跑（GitHub Pages / 自建服务器 / S3 均可）。
	// 若部署到固定子路径，也可改成 '/your-path/'。
	base: './',
});
