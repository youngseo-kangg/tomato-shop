'use client';

import type { InputHTMLAttributes } from 'react';

import { cn } from '@shared/libs';

/**
 * Atomic: molecule (atom 조합, 여전히 도메인 무관) → shared/ui.
 */
export function SearchInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            type="search"
            className={cn(
                'border-border w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none',
                'focus-visible:border-ring focus-visible:ring-ring focus-visible:ring-2',
                className,
            )}
            {...props}
        />
    );
}
