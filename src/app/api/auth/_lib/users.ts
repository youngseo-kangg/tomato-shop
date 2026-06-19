// 서버 전용 mock 유저 스토어 (DB 대체). _lib 폴더라 라우팅 제외(private).
export interface MockUser {
    id: string;
    email: string;
    password: string;
    name: string;
}

export const USERS: MockUser[] = [{ id: 'u1', email: 'tomato@shop.com', password: 'tomato123', name: '토마토' }];

export function findUser(email: string, password: string): MockUser | undefined {
    return USERS.find((u) => u.email === email && u.password === password);
}

export function findUserById(id: string): MockUser | undefined {
    return USERS.find((u) => u.id === id);
}

/** 프로필(이름/이메일) 수정. in-memory라 프로세스 재시작 시 초기화(데모). 변경된 유저 반환 */
export function updateUser(id: string, patch: { name?: string; email?: string }): MockUser | undefined {
    const user = findUserById(id);
    if (!user) return undefined;
    if (patch.name !== undefined) user.name = patch.name;
    if (patch.email !== undefined) user.email = patch.email;
    return user;
}
