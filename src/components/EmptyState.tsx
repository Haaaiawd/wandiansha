import type { ReactNode } from 'react';

function BoxIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      role="img"
      aria-hidden="true"
      className="mx-auto h-14 w-14 text-zinc-500"
    >
      <path d="M12.378 1.602a.75.75 0 00-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03zM21.75 7.93l-9 5.25v9.592l8.628-5.032a.75.75 0 00.372-.648V7.93zM11.25 22.677v-9.592l-9-5.25v8.466a.75.75 0 00.372.648l8.628 5.033z" />
    </svg>
  );
}

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="toy-bg flex min-h-screen flex-col items-center justify-center px-6 py-12 text-center">
      <div className="max-w-sm space-y-5 rounded-[1.75rem] border border-zinc-200 bg-white p-10 shadow-sm">
        <BoxIcon />
        <h2 className="font-display text-2xl font-bold text-zinc-950">{title}</h2>
        {description && (
          <p className="text-zinc-600">{description}</p>
        )}
        {action && <div className="pt-2">{action}</div>}
      </div>
    </div>
  );
}
