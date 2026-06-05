import type { ButtonHTMLAttributes } from 'react';

import { cn } from '@shared/libs';

type Variant = 'primary' | 'outline';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
}

const VARIANT_CLASS: Record<Variant, string> = {
    primary: 'bg-foreground text-background hover:opacity-90',
    outline: 'border border-foreground/20 hover:bg-foreground/5',
};

/**
 * Atomic: atom. 도메인을 모르는 순수 프리미티브 → shared/ui 에 산다.
 */
export function Button({ variant = 'primary', className, ...props }: ButtonProps) {
    return (
        <button
            className={cn(
                'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50',
                VARIANT_CLASS[variant],
                className,
            )}
            {...props}
        />
    );
}
