import { cn } from '@shared/libs';

interface TomatoIconProps {
    /** true면 컬러 토마토 이모지(찜 상태), false면 흑백(grayscale) 처리 */
    filled?: boolean;
    className?: string;
}

/**
 * Atomic: atom. 브랜드 토마토 — 애플 컬러 이모지(🍅)를 그대로 쓴다. 도메인 무관 → shared/ui.
 * filled면 원본 컬러, 아니면 grayscale로 흑백 처리. 위시리스트 토글 등에서 상태 전환.
 * 이모지는 글리프라 크기는 font-size로 잡는다(기본 1.25rem = h-5 w-5 박스에 맞춤). className으로 덮어쓰기 가능.
 */
export function TomatoIcon({ filled = false, className }: TomatoIconProps) {
    return (
        <span
            aria-hidden
            className={cn(
                'inline-flex items-center justify-center text-[1.25rem] leading-none transition',
                !filled && 'grayscale',
                className,
            )}
        >
            🍅
        </span>
    );
}
