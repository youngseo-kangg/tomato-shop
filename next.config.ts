import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

// next-intl 서버 설정 위치를 FSD shared 레이어로 지정
const withNextIntl = createNextIntlPlugin('./src/shared/i18n/request.ts');

const nextConfig: NextConfig = {
    /* config options here */
};

export default withNextIntl(nextConfig);
