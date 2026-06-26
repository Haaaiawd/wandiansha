type RandomButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
};

export function RandomButton({ onClick, children }: RandomButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative overflow-hidden rounded-full bg-gradient-to-r from-teal-500 to-sky-500 px-12 py-5 text-xl font-bold text-white shadow-xl shadow-teal-200 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-teal-300 active:scale-95"
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      <span className="absolute inset-0 -z-0 bg-gradient-to-r from-sky-500 to-teal-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </button>
  );
}
