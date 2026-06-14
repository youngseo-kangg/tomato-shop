'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Link } from '@shared/i18n';
import { cn } from '@shared/libs';

import type { Collection } from '@entities/collection';

/**
 * 데스크탑 GNB — 호버/포커스로 열리는 헤더 전체 폭(max-w-5xl) 드롭다운.
 * open 상태 기반: 호버 진입/포커스 시 열고, 링크 클릭·마우스 이탈·포커스 이탈 시 닫는다
 * (CSS :hover만으론 링크 클릭 후 마우스가 패널 위에 있으면 안 닫혀서 상태로 관리).
 * 패널은 헤더 컨테이너(relative) 기준 inset-x-0로 전체 폭. 모바일에선 숨김(MobileNav 담당).
 */
export function CategoryDropdown({ collections }: { collections: Collection[] }) {
    const t = useTranslations('common');
    const [open, setOpen] = useState(false);

    return (
        <div
            className="hidden sm:block"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
            }}
        >
            <button
                type="button"
                aria-haspopup="true"
                aria-expanded={open}
                onFocus={() => setOpen(true)}
                className="text-muted-foreground hover:text-foreground -my-4 py-4 text-sm"
            >
                {t('shop')}
            </button>
            <div
                className={cn(
                    'absolute inset-x-0 top-full z-50 pt-2 transition duration-150',
                    open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0',
                )}
            >
                <div className="border-border bg-background border-b shadow-lg">
                    <ul className="flex flex-wrap gap-1 px-4 py-3">
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
        </div>
    );
}
