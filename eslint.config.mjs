import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import eslintConfigPrettier from 'eslint-config-prettier';

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
    // import 순서 강제 (order 룰만 사용 — auto-fix 가능)
    // 'import' 플러그인은 eslint-config-next가 이미 등록하므로 재선언하지 않는다
    {
        settings: {
            'import/resolver': { typescript: true, node: true },
        },
        rules: {
            'import/order': [
                'error',
                {
                    groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                    pathGroups: [
                        { pattern: '@shared/**', group: 'internal', position: 'before' },
                        { pattern: '@entities/**', group: 'internal', position: 'before' },
                        { pattern: '@features/**', group: 'internal', position: 'before' },
                        { pattern: '@widgets/**', group: 'internal', position: 'before' },
                        { pattern: '@app/**', group: 'internal', position: 'before' },
                        { pattern: '@/**', group: 'internal' },
                    ],
                    pathGroupsExcludedImportTypes: ['builtin'],
                    'newlines-between': 'always',
                    alphabetize: { order: 'asc', caseInsensitive: true },
                },
            ],
        },
    },
    // prettier와 충돌하는 포맷 룰 비활성화 (항상 마지막)
    eslintConfigPrettier,
    globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);

export default eslintConfig;
