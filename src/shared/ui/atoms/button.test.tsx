import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { render, screen } from '@/test/test-utils';

import { Button } from './button';

// UI는 "보이는가"가 아니라 "동작하는가"를 검증
describe('Button', () => {
    it('클릭하면 onClick이 호출된다', async () => {
        const onClick = vi.fn();
        render(<Button onClick={onClick}>담기</Button>);

        await userEvent.click(screen.getByRole('button', { name: '담기' }));

        expect(onClick).toHaveBeenCalledOnce();
    });

    it('disabled면 클릭이 막힌다', async () => {
        const onClick = vi.fn();
        render(
            <Button onClick={onClick} disabled>
                담기
            </Button>,
        );

        await userEvent.click(screen.getByRole('button', { name: '담기' }));

        expect(onClick).not.toHaveBeenCalled();
    });
});
