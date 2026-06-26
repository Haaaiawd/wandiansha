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
      className="inline-flex items-center rounded-full bg-white/60 p-1 shadow-sm backdrop-blur-sm"
    >
      <button
        type="button"
        aria-pressed={isLeft}
        onClick={() => onChange(left)}
        className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
          isLeft
            ? 'bg-indigo-600 text-white shadow'
            : 'text-indigo-700 hover:bg-indigo-50'
        }`}
      >
        {leftLabel}
      </button>
      <button
        type="button"
        aria-pressed={!isLeft}
        onClick={() => onChange(right)}
        className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
          !isLeft
            ? 'bg-indigo-600 text-white shadow'
            : 'text-indigo-700 hover:bg-indigo-50'
        }`}
      >
        {rightLabel}
      </button>
    </div>
  );
}
