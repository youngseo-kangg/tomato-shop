'use client';

import { useEffect, type ReactNode } from 'react';

import { cn } from '@shared/libs';

interface ModalProps {
    open: boolean;
    onClose: () => void;
    /** 헤더 제목 + 패널 aria-label. 없으면 헤더 생략 */
    title?: string;
    closeLabel: string;
    ariaLabel?: string;
    className?: string;
    children: ReactNode;
}

/**
 * 도메인 무관 중앙 모달(controlled). 백드롭·Esc·헤더(title+✕). 닫혀 있으면 렌더하지 않는다.
 */
export function Modal({ open, onClose, title, closeLabel, ariaLabel, className, children }: ModalProps) {
    useEffect(() => {
        if (!open) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden />
            <div
                role="dialog"
                aria-modal="true"
                aria-label={ariaLabel ?? title}
                className={cn(
                    'bg-background relative z-10 flex max-h-[85vh] w-full max-w-md flex-col overflow-hidden rounded-lg shadow-xl',
                    className,
                )}
            >
                {title != null && (
                    <div className="border-border flex items-center justify-between border-b px-4 py-3">
                        <h2 className="text-base font-semibold">{title}</h2>
                        <button
                            type="button"
                            aria-label={closeLabel}
                            onClick={onClose}
                            className="hover:bg-muted inline-flex h-8 w-8 items-center justify-center rounded"
                        >
                            ✕
                        </button>
                    </div>
                )}
                <div className="overflow-y-auto p-4">{children}</div>
            </div>
        </div>
    );
}
