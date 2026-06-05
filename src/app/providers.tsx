'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

/**
 * 클라이언트 서버상태 프로바이더. QueryClient는 컴포넌트당 1회 생성(useState)해
 * 요청 간/리렌더 간 재생성을 막는다.
 */
export function QueryProvider({ children }: { children: React.ReactNode }) {
    const [client] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: { staleTime: 60_000, retry: 1 },
                },
            }),
    );

    return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
