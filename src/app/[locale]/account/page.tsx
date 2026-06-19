import { getTranslations, setRequestLocale } from 'next-intl/server';

import { routing } from '@shared/i18n';

import { AuthGate, ProfileForm } from '@features/auth';
import { OrderList } from '@features/orders';

// 정적 셸 + 회원 게이트(client) + 프로필/주문 island → ISR 유지
export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function AccountPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('account');

    return (
        <section>
            <h1 className="text-2xl font-semibold">{t('title')}</h1>
            <div className="mt-8">
                <AuthGate message={t('loginRequired')}>
                    <div className="space-y-10">
                        <section>
                            <h2 className="text-lg font-semibold">{t('profile')}</h2>
                            <div className="mt-4">
                                <ProfileForm />
                            </div>
                        </section>
                        <section>
                            <h2 className="text-lg font-semibold">{t('orders')}</h2>
                            <div className="mt-4">
                                <OrderList />
                            </div>
                        </section>
                    </div>
                </AuthGate>
            </div>
        </section>
    );
}
