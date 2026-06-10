import { getTranslations } from 'next-intl/server';

import { Link } from '@shared/i18n';

import { LanguageSwitcher } from './language-switcher';

/**
 * Atomic 관점의 template 영역 → widgets/layout. 여러 영역(브랜드/네비/로케일)을 조합.
 */
export async function Header() {
    const t = await getTranslations('common');

    return (
        <header className="border-foreground/10 border-b">
            <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4">
                <Link href="/" aria-label={t('brand')} className="group text-lg font-semibold tracking-tight">
                    <span className="group-hover:hidden">{t('brand')}</span>
                    <span className="hidden group-hover:inline" aria-hidden>
                        🍅🍅🍅
                    </span>
                </Link>
                <div className="flex items-center gap-4">
                    <Link href="/products" className="text-foreground/70 hover:text-foreground text-sm">
                        {t('viewDetail')}
                    </Link>
                    <LanguageSwitcher />
                </div>
            </div>
        </header>
    );
}
