import { getLocale, getTranslations } from 'next-intl/server';

import { Link, type Locale } from '@shared/i18n';

import { getAllCollections } from '@entities/collection';

import { CartDrawer } from '@features/cart';

import { CategoryDropdown } from './category-dropdown';
import { LanguageSwitcher } from './language-switcher';
import { MobileNav } from './mobile-nav';
import { ThemeToggle } from './theme-toggle';

/**
 * Atomic 관점의 template 영역 → widgets/layout. 여러 영역(GNB/브랜드/로케일/카트)을 조합.
 */
export async function Header() {
    const t = await getTranslations('common');
    const locale = await getLocale();
    const collections = await getAllCollections(locale as Locale);

    return (
        <header className="border-border border-b">
            <div className="relative mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4">
                <div className="flex items-center gap-2 sm:gap-4">
                    <MobileNav collections={collections} />
                    <Link href="/" aria-label={t('brand')} className="group text-lg font-semibold tracking-tight">
                        <span className="group-hover:hidden">{t('brand')}</span>
                        <span className="hidden group-hover:inline" aria-hidden>
                            🍅🍅🍅
                        </span>
                    </Link>
                    <CategoryDropdown collections={collections} />
                </div>
                <div className="flex items-center gap-4">
                    <LanguageSwitcher />
                    <ThemeToggle />
                    <CartDrawer />
                </div>
            </div>
        </header>
    );
}
