'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Link } from '@shared/i18n';
import { Drawer } from '@shared/ui';

import type { Collection } from '@entities/collection';

/**
 * 모바일 GNB — 햄버거 버튼 → 좌측 드로어(공통 Drawer). 데스크탑에선 숨김(CategoryDropdown이 담당).
 */
export function MobileNav({ collections }: { collections: Collection[] }) {
    const t = useTranslations('common');
    const [open, setOpen] = useState(false);

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

            <Drawer
                open={open}
                onClose={() => setOpen(false)}
                side="left"
                title={t('menu')}
                closeLabel={t('closeMenu')}
                className="w-72 max-w-[80%]"
            >
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
            </Drawer>
        </div>
    );
}
