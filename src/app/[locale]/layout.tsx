import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';

import { QueryProvider } from '@app/providers';
import { routing } from '@shared/i18n';
import { Header } from '@widgets/layout';

import '../globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
    title: { template: '%s | TOMATO SHOP', default: 'TOMATO SHOP' },
    description: '토마토로 만든 작은 물건들 — FSD + Atomic Design ecommerce demo.',
};

// 모든 로케일을 빌드 타임에 생성 → '/'(ko), '/en' 모두 정적
export function generateStaticParams() {
    return routing.locales.map(locale => ({ locale }));
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
        <html lang={locale} className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
            <body className="flex min-h-full flex-col">
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
