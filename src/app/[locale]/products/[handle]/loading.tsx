/**
 * 상품 상세 로딩 스켈레톤. error.tsx 와 세트로 두면 Suspense 경계가
 * "로딩 → 성공/실패"를 일관되게 처리한다.
 */
export default function Loading() {
    return (
        <div className="grid animate-pulse gap-8 sm:grid-cols-2">
            <div className="bg-foreground/10 aspect-square w-full rounded-lg" />
            <div className="space-y-3">
                <div className="bg-foreground/10 h-7 w-2/3 rounded" />
                <div className="bg-foreground/10 h-6 w-1/3 rounded" />
                <div className="bg-foreground/10 h-20 w-full rounded" />
            </div>
        </div>
    );
}
