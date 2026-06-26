type FilterSwitchProps<T extends string> = {
  value: T;
  options: [T, T];
  labels: [string, string];
  onChange: (value: T) => void;
  ariaLabel: string;
};

export function FilterSwitch<T extends string>({
  value,
  options,
  labels,
  onChange,
  ariaLabel,
}: FilterSwitchProps<T>) {
  const [left, right] = options;
  const [leftLabel, rightLabel] = labels;
  const isLeft = value === left;

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50 p-1 shadow-sm"
    >
      <button
        type="button"
        aria-pressed={isLeft}
        onClick={() => onChange(left)}
        className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
          isLeft
            ? 'bg-zinc-950 text-white shadow-sm'
            : 'text-zinc-600 hover:bg-white hover:text-zinc-950'
        }`}
      >
        {leftLabel}
      </button>
      <button
        type="button"
        aria-pressed={!isLeft}
        onClick={() => onChange(right)}
        className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
          !isLeft
            ? 'bg-zinc-950 text-white shadow-sm'
            : 'text-zinc-600 hover:bg-white hover:text-zinc-950'
        }`}
      >
        {rightLabel}
      </button>
    </div>
  );
}
