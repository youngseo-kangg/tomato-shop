import { NextResponse } from 'next/server';

import { getSessionUser } from '../_lib/session';
import { updateUser } from '../_lib/users';

export async function GET() {
    const user = await getSessionUser();
    return NextResponse.json({ user });
}

/** 세션 유저 프로필(이름/이메일) 수정. body: { name?, email? } */
export async function PATCH(request: Request) {
    const session = await getSessionUser();
    if (!session) return NextResponse.json({ message: 'Login required' }, { status: 401 });

    const { name, email } = (await request.json().catch(() => ({}))) as { name?: string; email?: string };
    const patch: { name?: string; email?: string } = {};
    if (typeof name === 'string' && name.trim()) patch.name = name.trim();
    if (typeof email === 'string' && email.trim()) patch.email = email.trim();

    const updated = updateUser(session.id, patch);
    if (!updated) return NextResponse.json({ message: 'User not found' }, { status: 404 });

    return NextResponse.json({ user: { id: updated.id, email: updated.email, name: updated.name } });
}
