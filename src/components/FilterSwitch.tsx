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
      className="glass inline-flex items-center rounded-full p-1 shadow-sm"
    >
      <button
        type="button"
        aria-pressed={isLeft}
        onClick={() => onChange(left)}
        className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
          isLeft
            ? 'bg-teal-600 text-white shadow-md'
            : 'text-teal-700 hover:bg-teal-50/60'
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
            ? 'bg-teal-600 text-white shadow-md'
            : 'text-teal-700 hover:bg-teal-50/60'
        }`}
      >
        {rightLabel}
      </button>
    </div>
  );
}
