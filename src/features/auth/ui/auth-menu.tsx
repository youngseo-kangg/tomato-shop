'use client';

import { useTranslations } from 'next-intl';

import { Link } from '@shared/i18n';
import { TomatoIcon } from '@shared/ui';

import { useAuth } from '../hooks/use-auth';

/**
 * 헤더 인증 아일랜드(client). 세션을 client에서 조회 → 레이아웃/페이지는 정적 유지.
 * 비로그인: 로그인 링크 / 로그인: 이름 + 로그아웃.
 */
export function AuthMenu() {
    const t = useTranslations('auth');
    const tWishlist = useTranslations('wishlist');
    const { user, isAuthenticated, isLoading, logout } = useAuth();

    if (isLoading) return null;

    if (!isAuthenticated) {
        return (
            <Link href="/login" className="text-muted-foreground hover:text-foreground text-sm">
                {t('login')}
            </Link>
        );
    }

    const handleLogout = () => logout();

    return (
        <div className="flex items-center gap-2 text-sm sm:gap-3">
            <Link
                href="/wishlist"
                aria-label={tWishlist('open')}
                className="hover:bg-muted focus-visible:ring-ring inline-flex h-8 w-8 items-center justify-center rounded focus-visible:ring-2 focus-visible:outline-none"
            >
                <TomatoIcon className="h-5 w-5" />
            </Link>
            <Link href="/account" className="hover:text-foreground hidden sm:inline">
                {user?.name}
            </Link>
            <button type="button" onClick={handleLogout} className="text-muted-foreground hover:text-foreground">
                {t('logout')}
            </button>
        </div>
    );
}
