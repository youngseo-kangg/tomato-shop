import { cn } from '@shared/libs';

interface PulseLoaderProps {
    /** 스크린리더용 레이블(예: "로딩 중") */
    label?: string;
    className?: string;
}

/**
 * 토마토 두근두근 로더 — 🍅가 박동(scale)하고 뒤로 토마토 색이 번졋다 사라진다(ping).
 * 빙빙 도는 Spinner와는 다른 타입. 도메인 무관 → shared/ui. Suspense fallback 등에 사용.
 */
export function PulseLoader({ label, className }: PulseLoaderProps) {
    return (
        <div className={cn('flex items-center justify-center py-12', className)} role="status">
            <span className="relative inline-flex h-10 w-10 items-center justify-center">
                {/* 번졋다 사라지는 토마토 색 링 */}
                <span
                    className="bg-tomato-500/30 absolute inline-flex h-full w-full animate-ping rounded-full"
                    aria-hidden
                />
                {/* 두근두근 토마토 */}
                <span className="animate-tomato-beat relative text-2xl leading-none" aria-hidden>
                    🍅
                </span>
            </span>
            {label && <span className="sr-only">{label}</span>}
        </div>
    );
}
