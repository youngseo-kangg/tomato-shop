import { getTranslations, setRequestLocale } from 'next-intl/server';

import { routing } from '@shared/i18n';

import { AuthGate } from '@features/auth';
import { WishlistView } from '@features/wishlist';

// 정적 셸 + 회원 게이트(client) + 위시리스트 island → ISR 유지
export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function WishlistPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('wishlist');

    return (
        <section>
            <h1 className="text-2xl font-semibold">{t('title')}</h1>
            <div className="mt-8">
                <AuthGate message={t('loginRequired')}>
                    <WishlistView />
                </AuthGate>
            </div>
        </section>
    );
}
