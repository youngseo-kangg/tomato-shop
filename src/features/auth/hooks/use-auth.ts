'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { fetchMe, login as loginApi, logout as logoutApi, updateProfile as updateProfileApi } from '../api/auth-api';

const ME_KEY = ['auth', 'me'];

/**
 * 클라이언트 세션 상태 + 로그인/로그아웃. 세션은 /api/auth/me를 client에서 조회(useQuery)하므로
 * 페이지는 정적(ISR) 유지. 쿠키는 route handler에서만 읽힌다.
 */
export function useAuth() {
    const queryClient = useQueryClient();

    const { data: user, isLoading } = useQuery({ queryKey: ME_KEY, queryFn: fetchMe });

    const loginMutation = useMutation({
        mutationFn: ({ email, password }: { email: string; password: string }) => loginApi(email, password),
        onSuccess: (loggedIn) => queryClient.setQueryData(ME_KEY, loggedIn),
    });

    const logoutMutation = useMutation({
        mutationFn: logoutApi,
        onSuccess: () => queryClient.setQueryData(ME_KEY, null),
    });

    const updateProfileMutation = useMutation({
        mutationFn: (patch: { name: string; email: string }) => updateProfileApi(patch),
        onSuccess: (updated) => queryClient.setQueryData(ME_KEY, updated),
    });

    return {
        user: user ?? null,
        isAuthenticated: !!user,
        isLoading,
        login: loginMutation.mutateAsync,
        // 로그아웃은 fire-and-forget → mutate (mutateAsync는 호출부가 await 안 하면 unhandled rejection)
        logout: logoutMutation.mutate,
        isLoggingIn: loginMutation.isPending,
        loginFailed: loginMutation.isError,
        updateProfile: updateProfileMutation.mutateAsync,
        isSavingProfile: updateProfileMutation.isPending,
        profileSaved: updateProfileMutation.isSuccess,
        profileError: updateProfileMutation.isError,
    };
}
