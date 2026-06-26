type RandomButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
};

export function RandomButton({ onClick, children }: RandomButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 px-10 py-5 text-xl font-bold text-white shadow-lg shadow-indigo-200 transition-transform hover:scale-105 active:scale-95"
    >
      {children}
    </button>
  );
}
