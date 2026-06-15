import type { InputHTMLAttributes } from 'react';

import { Input } from '../atoms/input';

/**
 * Atomic: molecule. Input atom을 type="search"로 감싼 도메인 무관 검색 입력.
 */
export function SearchInput(props: InputHTMLAttributes<HTMLInputElement>) {
    return <Input type="search" {...props} />;
}
