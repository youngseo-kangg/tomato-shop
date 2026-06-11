import { Badge } from '@shared/ui';

interface ProductBadgeProps {
    tags: string[];
}

/**
 * 상품 태그 → 강조 뱃지 단일 출처. best 우선, 없으면 new, 둘 다 없으면 렌더하지 않는다.
 * 도메인(Product 태그 의미)을 아는 presentational → entities/product/ui.
 */
export function ProductBadge({ tags }: ProductBadgeProps) {
    if (tags.includes('best')) return <Badge variant="best">BEST</Badge>;
    if (tags.includes('new')) return <Badge variant="new">NEW</Badge>;
    return null;
}
