import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, type RenderOptions } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import type { ReactElement, ReactNode } from 'react';

import messages from '@shared/i18n/messages/ko.json';

/**
 * 공용 테스트 렌더러: i18n + TanStack Query 프로바이더로 감싼다.
 * UI 테스트는 실제 앱과 같은 컨텍스트에서 "동작"을 검증.
 */
function Providers({ children }: { children: ReactNode }) {
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    return (
        <NextIntlClientProvider locale="ko" messages={messages}>
            <QueryClientProvider client={client}>{children}</QueryClientProvider>
        </NextIntlClientProvider>
    );
}

export function renderWithProviders(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
    return render(ui, { wrapper: Providers, ...options });
}

export * from '@testing-library/react';
