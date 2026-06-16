import { PulseLoader } from '@shared/ui';

/**
 * 상품 상세 로딩. error.tsx 와 세트로 두면 Suspense 경계가
 * "로딩 → 성공/실패"를 일관되게 처리한다. 토마토 로더로 통일.
 */
export default function Loading() {
    return <PulseLoader className="min-h-[50vh]" />;
}
