import { NextResponse } from 'next/server';

import { setSession } from '../_lib/session';
import { findUser } from '../_lib/users';

export async function POST(request: Request) {
    const body = await request.json().catch(() => ({}));
    const { email, password } = body as { email?: string; password?: string };

    const user = findUser(email ?? '', password ?? '');
    if (!user) {
        return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    await setSession(user.id);
    return NextResponse.json({ user: { id: user.id, email: user.email, name: user.name } });
}
