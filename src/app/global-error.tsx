'use client';

/**
 * 최후의 보루: 루트 레이아웃까지 터졌을 때. html/body 를 직접 렌더해야 한다.
 * (앱 전체에서 단 1개)
 */
export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
    return (
        <html lang="en">
            <body className="flex min-h-screen flex-col items-center justify-center gap-4">
                <p>Something went wrong.</p>
                <button onClick={reset} className="rounded-md border px-4 py-2 text-sm">
                    Try again
                </button>
            </body>
        </html>
    );
}
