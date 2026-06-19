// 서버 전용 mock 주문 스토어 (DB 대체). _lib라 라우팅 제외(private).
// 주문은 상품 handle+수량만 보관 → 조회 시 repository로 해석(제목 로케일 반영). in-memory라 재시작 시 초기화.
export interface StoredOrderItem {
    handle: string;
    quantity: number;
}

export interface StoredOrder {
    id: string;
    createdAt: string; // ISO
    items: StoredOrderItem[];
}

// 데모 유저(u1)에 과거 주문 seed — /account 첫 진입에 바로 내용이 보이도록
const ORDERS = new Map<string, StoredOrder[]>([
    [
        'u1',
        [
            {
                id: 'ORD-1024',
                createdAt: '2026-05-28T10:12:00.000Z',
                items: [
                    { handle: 'tomato-cushion-large', quantity: 1 },
                    { handle: 'tomato-coaster', quantity: 2 },
                ],
            },
            {
                id: 'ORD-1009',
                createdAt: '2026-04-11T08:40:00.000Z',
                items: [{ handle: 'tomato-coin-wallet', quantity: 1 }],
            },
        ],
    ],
]);

/** 유저의 주문 목록 (최신순). 없으면 빈 배열 */
export function getOrders(userId: string): StoredOrder[] {
    return ORDERS.get(userId) ?? [];
}

/** 주문 생성 — 맨 앞(최신)에 추가. 생성된 주문 반환 */
export function addOrder(userId: string, items: StoredOrderItem[]): StoredOrder {
    const order: StoredOrder = {
        id: `ORD-${Date.now().toString().slice(-6)}`,
        createdAt: new Date().toISOString(),
        items,
    };
    ORDERS.set(userId, [order, ...getOrders(userId)]);
    return order;
}
