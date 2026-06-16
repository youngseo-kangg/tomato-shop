import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { Link } from '@shared/i18n';
import { cn } from '@shared/libs';

type Variant = 'primary' | 'outline';
type Size = 'sm' | 'md';

const VARIANT_CLASS: Record<Variant, string> = {
    primary: 'bg-primary text-primary-foreground hover:bg-tomato-600',
    outline: 'border border-border hover:bg-muted',
};

const SIZE_CLASS: Record<Size, string> = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 text-sm',
};

const BASE_CLASS = cn(
    'inline-flex items-center justify-center rounded-md font-medium transition',
    'focus-visible:ring-ring focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
    'disabled:cursor-not-allowed disabled:opacity-50',
);

interface CommonProps {
    variant?: Variant;
    size?: Size;
    className?: string;
    children?: ReactNode;
}

/** href를 주면 (locale 인식) Link, 아니면 <button> */
type ButtonProps =
    | (CommonProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & { href?: undefined })
    | (CommonProps & { href: string; onClick?: () => void });

/**
 * Atomic: atom. 도메인을 모르는 순수 프리미티브 → shared/ui 에 산다.
 * polymorphic: `href`가 있으면 버튼 모양의 Link(네비)로 렌더(스타일 중복 방지).
 */
export function Button({ variant = 'primary', size = 'md', className, ...props }: ButtonProps) {
    const classes = cn(BASE_CLASS, VARIANT_CLASS[variant], SIZE_CLASS[size], className);

    if ('href' in props && props.href) {
        return (
            <Link href={props.href} onClick={props.onClick} className={classes}>
                {props.children}
            </Link>
        );
    }

    return <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)} />;
}
