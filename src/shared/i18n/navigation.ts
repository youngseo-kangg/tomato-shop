import { createNavigation } from 'next-intl/navigation';

import { routing } from './routing';

/**
 * 로케일 정책이 자동 적용되는 네비게이션 프리미티브.
 * next/link, next/navigation 대신 항상 여기서 import 할 것.
 * (default locale ko는 prefix가 없으므로 하드코딩하면 깨짐)
 */
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
