'use client';

import { Button } from '@shared/ui';

/**
 * 로케일 전역 fallback. 라우트별 error.tsx 가 못 잡은 에러를 받는다.
 */
export default function LocaleError({ reset }: { error: Error; reset: () => void }) {
    return (
        <div role="alert" className="flex flex-col items-start gap-4 py-12">
            <p className="text-muted-foreground text-sm">Something went wrong.</p>
            <Button onClick={reset}>Try again</Button>
        </div>
    );
}
