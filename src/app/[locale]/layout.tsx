import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';

import { routing } from '@shared/i18n';

import { Header } from '@widgets/layout';

import { QueryProvider } from '@app/providers';

import '../globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

/**
 * 무플래시 테마 스크립트. paint 전에 동기 실행돼 localStorage(없으면 시스템 설정)를 읽어
 * <html>.dark 를 선적용한다. 서버는 테마를 모르므로(정적 셸 유지) 이 스크립트가 깜빡임을 막는다.
 */
const THEME_SCRIPT = `(function(){try{var e=localStorage.getItem('theme');var d=e?e==='dark':matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d);}catch(_){}})();`;

export const metadata: Metadata = {
    title: { template: '%s | TOMATO SHOP', default: 'TOMATO SHOP' },
    description: '토마토로 만든 작은 물건들 — FSD + Atomic Design ecommerce demo.',
};

// 모든 로케일을 빌드 타임에 생성 → '/'(ko), '/en' 모두 정적
export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) notFound();

    // ★ ISR 스위치: 이 호출이 없으면 useTranslations가 헤더를 읽어 페이지가 dynamic 으로 강등됨
    setRequestLocale(locale);
    const messages = await getMessages();

    return (
        <html
            lang={locale}
            suppressHydrationWarning
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
            <body className="flex min-h-full flex-col">
                <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <QueryProvider>
                        <Header />
                        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">{children}</main>
                    </QueryProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
