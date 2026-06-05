import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Tailwind 클래스 병합 유틸. twMerge는 이 함수 내부에서만 사용하고,
 * 호출부는 항상 cn()만 쓴다.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
