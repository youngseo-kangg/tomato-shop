'use client';

import { createContext, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';

interface ToastContextValue {
    showToast: (message: string) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);

const DURATION_MS = 2500;

/**
 * 도메인 무관 토스트(단일 메시지). 같은 호출이 또 오면 타이머만 리셋한다.
 * 뷰포트(하단 중앙)를 함께 렌더 → 별도 <Toaster/> 불필요. aria-live로 SR에 알림.
 */
export function ToastProvider({ children }: { children: ReactNode }) {
    const [message, setMessage] = useState<string | null>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const showToast = useCallback((next: string) => {
        setMessage(next);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setMessage(null), DURATION_MS);
    }, []);

    useEffect(() => () => void (timerRef.current && clearTimeout(timerRef.current)), []);

    const value = useMemo(() => ({ showToast }), [showToast]);

    return (
        <ToastContext.Provider value={value}>
            {children}
            <div
                aria-live="polite"
                aria-atomic
                className="pointer-events-none fixed inset-x-0 bottom-6 z-[60] flex justify-center px-4"
            >
                {message && (
                    <div className="bg-foreground text-background rounded-md px-4 py-2 text-sm font-medium shadow-lg">
                        {message}
                    </div>
                )}
            </div>
        </ToastContext.Provider>
    );
}
