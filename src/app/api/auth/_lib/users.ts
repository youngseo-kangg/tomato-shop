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
