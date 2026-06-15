import { cookies } from 'next/headers';

import { findUserById } from './users';

const SESSION_COOKIE = 'session';

/** 클라가 직접 들고 다닐 유저 정보(비밀번호 제외) */
export interface SessionUser {
    id: string;
    email: string;
    name: string;
}

export async function setSession(userId: string): Promise<void> {
    const store = await cookies();
    store.set(SESSION_COOKIE, userId, {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7일
    });
}

export async function clearSession(): Promise<void> {
    const store = await cookies();
    store.delete(SESSION_COOKIE);
}

/** 세션 쿠키 → 유저(없으면 null). route handler에서만 호출(페이지 렌더 X → ISR 유지) */
export async function getSessionUser(): Promise<SessionUser | null> {
    const store = await cookies();
    const id = store.get(SESSION_COOKIE)?.value;
    if (!id) return null;
    const user = findUserById(id);
    return user ? { id: user.id, email: user.email, name: user.name } : null;
}
