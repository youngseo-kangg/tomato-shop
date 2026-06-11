'use client';

import { useContext } from 'react';

import { ToastContext } from './toast-provider';

/** 토스트 트리거. <ToastProvider> 하위에서만 사용 */
export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error('useToast는 <ToastProvider> 안에서만 쓸 수 있다');
    return ctx;
}
