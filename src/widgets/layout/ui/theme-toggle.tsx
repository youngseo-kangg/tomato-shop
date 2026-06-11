'use client';

import { useTranslations } from 'next-intl';

import { cn } from '@shared/libs';

/**
 * 라이트/다크 테마 토글 (client).
 * onClick에서 <html>.dark 클래스를 토글하고 localStorage('theme')에 저장만 한다.
 * 아이콘 전환은 React 상태가 아니라 CSS `dark:` 변형이 담당 → 상태/effect/구독이 전혀 필요 없고
 * 서버·클라 마크업이 동일해 hydration도 안전(가시성 차이는 CSS가 처리).
 * 서버는 테마를 모르며(정적 셸/ISR 유지), 첫 적용은 layout의 무플래시 스크립트가 paint 전에 끝낸다.
 *
 * NOTE: 지금은 단순 토글이라 LanguageSwitcher와 일관되게 widgets/layout에 둔다.
 * 역할이 커지면(시스템/라이트/다크 3-상태, 테마 프리셋, 다른 슬라이스와의 상태 공유 등)
 * `features/theme`(유저 액션 + 상태변경) 슬라이스로 분리할 것. 그때 토글 버튼만 shared/ui로 내릴 수도.
 */
export function ThemeToggle() {
    const t = useTranslations('common');

    const handleThemeToggle = () => {
        const next = !document.documentElement.classList.contains('dark');
        document.documentElement.classList.toggle('dark', next);
        try {
            localStorage.setItem('theme', next ? 'dark' : 'light');
        } catch {
            // localStorage 접근 불가(시크릿 모드 등) — 토글은 세션 동안만 유지
        }
    };

    return (
        <button
            type="button"
            onClick={handleThemeToggle}
            aria-label={t('toggleTheme')}
            className={cn(
                'hover:bg-muted inline-flex h-8 w-8 items-center justify-center rounded text-sm',
                'focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none',
            )}
        >
            <span className="dark:hidden" aria-hidden>
                ☀️
            </span>
            <span className="hidden dark:inline" aria-hidden>
                🌙
            </span>
        </button>
    );
}
