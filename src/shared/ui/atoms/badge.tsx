import type { HTMLAttributes } from 'react';

import { cn } from '@shared/libs';

/**
 * Atomic: atom.
 */
export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
    return (
        <span
            className={cn(
                'inline-flex items-center rounded-full bg-foreground/10 px-2 py-0.5 text-xs font-medium',
                className,
            )}
            {...props}
        />
    );
}
