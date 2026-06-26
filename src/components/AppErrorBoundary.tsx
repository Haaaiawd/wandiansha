import { Component, type ReactNode } from 'react';
import { EmptyState } from './EmptyState.tsx';

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export class AppErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <EmptyState
          title="网站库加载失败"
          description="请检查网络连接或刷新页面再试。"
        />
      );
    }
    return this.props.children;
  }
}
