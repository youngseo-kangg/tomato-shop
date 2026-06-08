/**
 * 상품 상세 로딩 스켈레톤. error.tsx 와 세트로 두면 Suspense 경계가
 * "로딩 → 성공/실패"를 일관되게 처리한다.
 */
export default function Loading() {
    return (
        <div className="grid animate-pulse gap-8 sm:grid-cols-2">
            <div className="aspect-square w-full rounded-lg bg-foreground/10" />
            <div className="space-y-3">
                <div className="h-7 w-2/3 rounded bg-foreground/10" />
                <div className="h-6 w-1/3 rounded bg-foreground/10" />
                <div className="h-20 w-full rounded bg-foreground/10" />
            </div>
        </div>
    );
}
