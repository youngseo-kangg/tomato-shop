import type { InputHTMLAttributes } from 'react';

import { cn } from '@shared/libs';

/**
 * Atomic: atom. 도메인 무관 입력 프리미티브(보더·포커스 링 시맨틱 토큰).
 * SearchInput·로그인 폼 등이 공유.
 */
export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            className={cn(
                'border-border w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none',
                'focus-visible:border-ring focus-visible:ring-ring focus-visible:ring-2',
                className,
            )}
            {...props}
        />
    );
}
