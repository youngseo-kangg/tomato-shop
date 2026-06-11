import type { ButtonHTMLAttributes } from 'react';

import { cn } from '@shared/libs';

type Variant = 'primary' | 'outline';
type Size = 'sm' | 'md';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    size?: Size;
}

const VARIANT_CLASS: Record<Variant, string> = {
    primary: 'bg-primary text-primary-foreground hover:bg-tomato-600',
    outline: 'border border-border hover:bg-muted',
};

const SIZE_CLASS: Record<Size, string> = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 text-sm',
};

/**
 * Atomic: atom. 도메인을 모르는 순수 프리미티브 → shared/ui 에 산다.
 */
export function Button({ variant = 'primary', size = 'md', className, ...props }: ButtonProps) {
    return (
        <button
            className={cn(
                'inline-flex items-center justify-center rounded-md font-medium transition',
                'focus-visible:ring-ring focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
                'disabled:cursor-not-allowed disabled:opacity-50',
                VARIANT_CLASS[variant],
                SIZE_CLASS[size],
                className,
            )}
            {...props}
        />
    );
}
