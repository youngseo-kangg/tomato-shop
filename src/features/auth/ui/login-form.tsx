'use client';

import { useTranslations } from 'next-intl';
import { useState, type FormEvent } from 'react';

import { useRouter } from '@shared/i18n';
import { Button, Input } from '@shared/ui';

import { useAuth } from '../hooks/use-auth';

export function LoginForm() {
    const t = useTranslations('auth');
    const router = useRouter();
    const { login, isLoggingIn, loginFailed } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await login({ email, password });
            router.push('/');
        } catch {
            // loginFailed로 표시
        }
    };

    return (
        <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium">
                    {t('email')}
                </label>
                <Input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password" className="mb-1 block text-sm font-medium">
                    {t('password')}
                </label>
                <Input
                    id="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            {loginFailed && <p className="text-destructive text-sm">{t('invalidCredentials')}</p>}

            <Button type="submit" disabled={isLoggingIn} className="w-full">
                {t('login')}
            </Button>
            <p className="text-muted-foreground text-xs">{t('demoHint')}</p>
        </form>
    );
}
