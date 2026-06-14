'use client';

import { useEffect, type ReactNode } from 'react';

import { cn } from '@shared/libs';

interface DrawerProps {
    open: boolean;
    onClose: () => void;
    side?: 'left' | 'right';
    /** 패널 너비 등 추가 클래스 */
    className?: string;
    /** 패널 aria-label. 없으면 title 사용. 헤더리스/커스텀 헤더면 직접 지정 권장 */
    ariaLabel?: string;
    /** 기본 헤더(제목 + ✕)용 제목. 생략하면 기본 헤더를 그리지 않는다 */
    title?: string;
    /** 기본 헤더 닫기 버튼 aria-label (title이 있을 때) */
    closeLabel?: string;
    /** 커스텀 헤더 슬롯 — 주면 기본 헤더 대신 렌더 */
    header?: ReactNode;
    children: ReactNode;
}

/**
 * 도메인 무관 슬라이드오버 드로어(controlled). 백드롭·Esc·슬라이드를 담당.
 * 헤더는 유연: `title` 주면 기본 헤더(제목+✕), `header` 주면 커스텀, 둘 다 없으면 헤더 없이 children만.
 * open/onClose는 호출부가 관리하고, 트리거 버튼도 각 사용처에 둔다.
 */
export function Drawer({
    open,
    onClose,
    side = 'right',
    className,
    ariaLabel,
    title,
    closeLabel,
    header,
    children,
}: DrawerProps) {
    useEffect(() => {
        if (!open) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [open, onClose]);

    return (
        <>
            <div
                className={cn(
                    'fixed inset-0 z-40 bg-black/40 transition-opacity duration-200',
                    open ? 'opacity-100' : 'pointer-events-none opacity-0',
                )}
                onClick={onClose}
                aria-hidden
            />
            <div
                role="dialog"
                aria-modal="true"
                aria-label={ariaLabel ?? title}
                className={cn(
                    'bg-background fixed top-0 z-50 flex h-full flex-col shadow-xl transition-transform duration-200',
                    side === 'right' ? 'right-0' : 'left-0',
                    open ? 'translate-x-0' : side === 'right' ? 'translate-x-full' : '-translate-x-full',
                    className,
                )}
            >
                {header ??
                    (title != null && (
                        <div className="border-border flex items-center justify-between border-b px-4 py-4">
                            <h2 className="text-lg font-semibold">{title}</h2>
                            <button
                                type="button"
                                aria-label={closeLabel ?? title}
                                onClick={onClose}
                                className="hover:bg-muted inline-flex h-8 w-8 items-center justify-center rounded"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                {children}
            </div>
        </>
    );
}
