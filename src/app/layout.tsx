import type { ReactNode } from 'react';

/**
 * 루트 레이아웃은 passthrough. 실제 <html>/<body>는 app/[locale]/layout.tsx 가 렌더한다
 * (locale 별 lang 속성을 주기 위함 — next-intl 권장 패턴).
 */
export default function RootLayout({ children }: { children: ReactNode }) {
    return children;
}
