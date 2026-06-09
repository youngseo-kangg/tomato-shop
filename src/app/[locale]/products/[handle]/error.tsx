'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@shared/ui';

/**
 * 상품 상세만 격리하는 에러 경계. 여기서 터져도 헤더/나머지 라우트는 살아있다.
 * error.tsx 는 반드시 client component.
 */
export default function ProductError({ reset }: { error: Error; reset: () => void }) {
    const t = useTranslations('product');
    return (
        <div role="alert" className="flex flex-col items-start gap-4 py-12">
            <p className="text-foreground/70 text-sm">{t('loadError')}</p>
            <Button onClick={reset}>{t('viewDetail')}</Button>
        </div>
    );
}
