import type { User } from '../types/auth';

/** 현재 세션 유저 조회 (없으면 null) */
export async function fetchMe(): Promise<User | null> {
    const res = await fetch('/api/auth/me');
    if (!res.ok) return null;
    const data = (await res.json()) as { user: User | null };
    return data.user ?? null;
}

export async function login(email: string, password: string): Promise<User> {
    const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error('Invalid credentials');
    const data = (await res.json()) as { user: User };
    return data.user;
}

export async function logout(): Promise<void> {
    await fetch('/api/auth/logout', { method: 'POST' });
}
