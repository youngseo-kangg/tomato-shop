import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    // tsconfigPaths: @shared/@entities/... alias를 테스트에서도 그대로 사용
    plugins: [tsconfigPaths(), react()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./vitest.setup.ts'],
        // FSD 슬라이스 어디에 있든 *.test.ts(x)를 대상 옆에서 수집
        include: ['src/**/*.test.{ts,tsx}'],
        // next-intl을 vite로 변환해 'next/navigation' 등 Next 서브패스를 해석하게 함
        server: { deps: { inline: ['next-intl'] } },
    },
});
