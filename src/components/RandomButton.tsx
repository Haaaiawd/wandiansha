type RandomButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
};

export function RandomButton({ onClick, children }: RandomButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative overflow-hidden rounded-full bg-zinc-950 px-12 py-5 text-xl font-bold text-white shadow-lg shadow-zinc-950/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-zinc-800 active:translate-y-0 active:scale-95"
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      <span className="absolute inset-x-8 bottom-0 h-px bg-white/30" />
    </button>
  );
}
