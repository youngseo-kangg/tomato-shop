import { getTranslations, setRequestLocale } from 'next-intl/server';

import { routing } from '@shared/i18n';

import { CartView } from '@features/cart';

// 정적 셸 + 카트 client 아일랜드(CartView) → ISR 유지
export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function CartPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('cart');

    return (
        <section>
            <h1 className="text-2xl font-semibold">{t('title')}</h1>
            <div className="mt-8">
                <CartView />
            </div>
        </section>
    );
}
