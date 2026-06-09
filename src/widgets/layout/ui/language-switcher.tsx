'use client';

import { useLocale } from 'next-intl';

import { Link, usePathname } from '@shared/i18n';
import { cn } from '@shared/libs';

const LOCALES = [
    { code: 'ko', label: 'KO' },
    { code: 'en', label: 'EN' },
] as const;

/**
 * 현재 경로를 유지한 채 로케일만 전환. Link 의 locale prop 으로 정책이 자동 적용된다.
 */
export function LanguageSwitcher() {
    const pathname = usePathname();
    const active = useLocale();

    return (
        <nav className="flex items-center gap-1 text-xs" aria-label="Language">
            {LOCALES.map(({ code, label }) => (
                <Link
                    key={code}
                    href={pathname}
                    locale={code}
                    className={cn(
                        'rounded px-2 py-1',
                        active === code ? 'bg-foreground/10 font-medium' : 'text-foreground/60',
                    )}
                >
                    {label}
                </Link>
            ))}
        </nav>
    );
}
