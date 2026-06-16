'use client';

import { Component, type ReactNode } from 'react';

interface ErrorBoundaryProps {
    /** 에러 시 렌더. reset()을 호출하면 children을 다시 시도한다 */
    fallback: (reset: () => void) => ReactNode;
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

/**
 * 컴포넌트 단위 에러 경계. React 에러 경계는 클래스 컴포넌트만 가능.
 * react-query useSuspenseQuery가 던진 에러를 잡고, fallback의 reset으로 재시도.
 * (react-query 에러 상태 초기화는 호출부에서 useQueryErrorResetBoundary와 함께)
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = { hasError: false };

    static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true };
    }

    private reset = () => this.setState({ hasError: false });

    render() {
        return this.state.hasError ? this.props.fallback(this.reset) : this.props.children;
    }
}
