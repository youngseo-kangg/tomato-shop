import type { HTMLAttributes } from 'react';

import { cn } from '@shared/libs';

type Variant = 'default' | 'new' | 'best';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: Variant;
}

const VARIANT_CLASS: Record<Variant, string> = {
    default: 'bg-muted text-muted-foreground',
    new: 'bg-tomato-500/15 text-tomato-700 dark:text-tomato-300',
    best: 'bg-tomato-500 text-white',
};

/**
 * Atomic: atom.
 */
export function Badge({ variant = 'default', className, ...props }: BadgeProps) {
    return (
        <span
            className={cn(
                'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
                VARIANT_CLASS[variant],
                className,
            )}
            {...props}
        />
    );
}
