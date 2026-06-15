import { getTranslations, setRequestLocale } from 'next-intl/server';

import { routing } from '@shared/i18n';

import { LoginForm } from '@features/auth';

// 정적 셸 + 로그인 폼(client). 인증은 client에서 처리하므로 페이지는 정적 유지.
export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function LoginPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('auth');

    return (
        <section className="mx-auto max-w-sm">
            <h1 className="text-2xl font-semibold">{t('login')}</h1>
            <div className="mt-8">
                <LoginForm />
            </div>
        </section>
    );
}
