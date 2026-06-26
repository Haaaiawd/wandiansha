import type { ReactNode } from 'react';

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 px-6 py-12 text-center">
      <div className="max-w-sm space-y-4 rounded-3xl bg-white/80 p-8 shadow-xl shadow-indigo-100 backdrop-blur-sm">
        <div aria-hidden="true" className="text-5xl">🎴</div>
        <h2 className="text-xl font-bold text-indigo-900">{title}</h2>
        {description && (
          <p className="text-indigo-700">{description}</p>
        )}
        {action && <div className="pt-2">{action}</div>}
      </div>
    </div>
  );
}
