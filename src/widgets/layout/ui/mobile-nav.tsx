'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { Link } from '@shared/i18n';
import { cn } from '@shared/libs';

import type { Collection } from '@entities/collection';

/**
 * 모바일 GNB — 햄버거 버튼 → 좌측 슬라이드 드로어. 데스크탑에선 숨김(CategoryDropdown이 담당).
 */
export function MobileNav({ collections }: { collections: Collection[] }) {
    const t = useTranslations('common');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!open) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [open]);

    return (
        <div className="sm:hidden">
            <button
                type="button"
                aria-label={t('openMenu')}
                onClick={() => setOpen(true)}
                className="hover:bg-muted focus-visible:ring-ring inline-flex h-8 w-8 items-center justify-center rounded focus-visible:ring-2 focus-visible:outline-none"
            >
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-5 w-5"
                    aria-hidden
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                    />
                </svg>
            </button>

            {/* 백드롭 */}
            <div
                className={cn(
                    'fixed inset-0 z-40 bg-black/40 transition-opacity duration-200',
                    open ? 'opacity-100' : 'pointer-events-none opacity-0',
                )}
                onClick={() => setOpen(false)}
                aria-hidden
            />

            {/* 좌측 드로어 */}
            <div
                role="dialog"
                aria-modal="true"
                aria-label={t('menu')}
                className={cn(
                    'bg-background fixed top-0 left-0 z-50 flex h-full w-72 max-w-[80%] flex-col shadow-xl transition-transform duration-200',
                    open ? 'translate-x-0' : '-translate-x-full',
                )}
            >
                <div className="border-border flex items-center justify-between border-b px-4 py-4">
                    <h2 className="text-lg font-semibold">{t('menu')}</h2>
                    <button
                        type="button"
                        aria-label={t('closeMenu')}
                        onClick={() => setOpen(false)}
                        className="hover:bg-muted inline-flex h-8 w-8 items-center justify-center rounded"
                    >
                        ✕
                    </button>
                </div>
                <ul className="p-2">
                    {collections.map((collection) => (
                        <li key={collection.handle}>
                            <Link
                                href={`/collections/${collection.handle}`}
                                onClick={() => setOpen(false)}
                                className="hover:bg-muted block rounded px-3 py-2 text-sm"
                            >
                                {collection.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
