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
          title="页面出了点小问题"
          description="别担心，刷新一下通常就能解决。"
        />
      );
    }
    return this.props.children;
  }
}
