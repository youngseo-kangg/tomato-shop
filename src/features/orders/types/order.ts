/** 주문 한 줄 — 주문 시점 상품 정보 + 수량 (서버에서 handle 해석) */
export interface OrderLine {
    handle: string;
    title: string;
    price: number;
    currency: string;
    image: string;
    color: string;
    quantity: number;
}

/** 주문 한 건 (client 표시용) */
export interface Order {
    id: string;
    createdAt: string;
    currency: string;
    total: number;
    lines: OrderLine[];
}
