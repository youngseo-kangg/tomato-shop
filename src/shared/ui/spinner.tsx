import { cn } from '@shared/libs';

interface SpinnerProps {
    /** 스크린리더용 레이블(예: "로딩 중") */
    label?: string;
    className?: string;
}

/**
 * 빙빙 도는 원형 스피너 (토마토색 호). PulseLoader(토마토 박동)와는 다른 타입의 로더.
 * 도메인 무관 → shared/ui. Suspense fallback 등에 사용.
 */
export function Spinner({ label, className }: SpinnerProps) {
    return (
        <div className={cn('flex items-center justify-center py-12', className)} role="status">
            <span
                className="border-tomato-500/25 border-t-tomato-500 inline-block h-8 w-8 animate-spin rounded-full border-[3px]"
                aria-hidden
            />
            {label && <span className="sr-only">{label}</span>}
        </div>
    );
}
