import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// 각 테스트 후 DOM 정리 (테스트 간 격리)
afterEach(() => {
    cleanup();
});
