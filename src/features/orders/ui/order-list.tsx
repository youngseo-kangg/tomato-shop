'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

import { Link, type Locale } from '@shared/i18n';
import { formatPrice } from '@shared/libs';

import { useOrders } from '../hooks/use-orders';
import type { Order } from '../types/order';

function OrderCard({ order, locale }: { order: Order; locale: Locale }) {
    const t = useTranslations('account');
    const date = new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(new Date(order.createdAt));

    return (
        <li className="border-border rounded-lg border p-4">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <p className="text-sm font-medium">
                    {t('orderNumber')} {order.id}
                </p>
                <p className="text-muted-foreground text-xs">
                    {t('orderDate')} {date}
                </p>
            </div>
            <ul className="mt-3 space-y-2">
                {order.lines.map((line) => (
                    <li key={line.handle} className="flex items-center gap-3">
                        <Link
                            href={`/products/${line.handle}`}
                            className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md"
                            style={{ backgroundColor: line.color }}
                        >
                            <Image src={line.image} alt="" fill sizes="48px" className="object-cover" />
                        </Link>
                        <div className="min-w-0 flex-1">
                            <Link href={`/products/${line.handle}`} className="block truncate text-sm hover:underline">
                                {line.title}
                            </Link>
                            <p className="text-muted-foreground text-xs">
                                {formatPrice(line.price, line.currency, locale)} × {line.quantity}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
            <p className="border-border mt-3 border-t pt-3 text-right text-sm font-semibold">
                {t('orderTotal')} {formatPrice(order.total, order.currency, locale)}
            </p>
        </li>
    );
}

/**
 * 주문 내역 목록(client 아일랜드). 회원 데이터라 AuthGate 안에서만 마운트.
 */
export function OrderList() {
    const t = useTranslations('account');
    const locale = useLocale() as Locale;
    const { orders, isLoading } = useOrders();

    if (isLoading) return null;

    if (orders.length === 0) {
        return <p className="text-muted-foreground text-sm">{t('noOrders')}</p>;
    }

    return (
        <ul className="space-y-3">
            {orders.map((order) => (
                <OrderCard key={order.id} order={order} locale={locale} />
            ))}
        </ul>
    );
}
