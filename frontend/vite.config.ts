import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import compression from 'vite-plugin-compression';
import imagemin from 'vite-plugin-imagemin';
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: 'gzip', // Use 'brotliCompress' for Brotli compression
      threshold: 10240, // Compress files larger than 10KB
    }),
    imagemin({
      gifsicle: { optimizationLevel: 7 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 65 },
      svgo: {
        plugins: [
          { name: 'removeViewBox', active: false },
          { name: 'removeEmptyAttrs', active: false },
        ],
      },
    }),
    visualizer({
      filename: 'dist/stats.html', // 리포트 파일이 저장될 경로
      open: true, // 빌드 후 리포트를 자동으로 열기
      gzipSize: true, // Gzip 압축된 파일 크기 표시
      brotliSize: true, // Brotli 압축된 파일 크기 표시
    }),
  ],
});
