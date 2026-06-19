'use client';

import { useTranslations } from 'next-intl';
import { useState, type FormEvent } from 'react';

import { Button, Input, useToast } from '@shared/ui';

import { useAuth } from '../hooks/use-auth';

/**
 * 프로필(이름/이메일) 수정 폼. 회원 데이터라 AuthGate 안에서만 마운트(user 존재 보장).
 * 저장은 useAuth.updateProfile → 성공 시 ME 캐시 갱신(헤더 이름도 즉시 반영).
 */
export function ProfileForm() {
    const t = useTranslations('account');
    const { user, updateProfile, isSavingProfile, profileError } = useAuth();
    const { showToast } = useToast();
    const [name, setName] = useState(user?.name ?? '');
    const [email, setEmail] = useState(user?.email ?? '');

    const handleProfileSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await updateProfile({ name, email });
            showToast(t('saved'));
        } catch {
            // profileError로 표시
        }
    };

    return (
        <form onSubmit={handleProfileSubmit} className="max-w-sm space-y-4">
            <div>
                <label htmlFor="profile-name" className="mb-1 block text-sm font-medium">
                    {t('name')}
                </label>
                <Input
                    id="profile-name"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="profile-email" className="mb-1 block text-sm font-medium">
                    {t('email')}
                </label>
                <Input
                    id="profile-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            {profileError && <p className="text-destructive text-sm">{t('saveError')}</p>}

            <Button type="submit" disabled={isSavingProfile}>
                {t('save')}
            </Button>
        </form>
    );
}
