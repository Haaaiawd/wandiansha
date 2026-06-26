import { FilterSwitch } from '../components/FilterSwitch';
import { RandomButton } from '../components/RandomButton';
import type { FilterState } from '../utils/recommend';

const GITHUB_URL = 'https://github.com/Haaaiawd/wandiansha';

type HomeProps = {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onDraw: () => void;
};

export function Home({ filters, onFilterChange, onDraw }: HomeProps) {
  return (
    <div className="toy-bg relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-12 text-center">
      <div className="grain-overlay pointer-events-none absolute inset-0 opacity-70" />

      <a
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="打开 GitHub 仓库"
        className="absolute right-5 top-5 z-20 rounded-full border border-zinc-200 bg-white/80 p-3 text-zinc-700 shadow-sm backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white hover:text-zinc-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-5 w-5"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.22-3.37-1.22-.45-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.35 9.35 0 0 1 12 6.95c.85 0 1.71.12 2.51.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .27.18.59.69.49A10.06 10.06 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z"
          />
        </svg>
      </a>

      <div className="relative z-10 w-full max-w-md space-y-8 rounded-[2rem] border border-zinc-200/70 bg-white/75 px-6 py-10 shadow-sm backdrop-blur-sm sm:px-10">
        <header className="animate-fade-in-up space-y-3">
          <h1 className="font-display text-5xl font-extrabold tracking-tight text-zinc-950 sm:text-6xl">
            玩点啥
          </h1>
          <p className="text-balance text-base text-zinc-600 sm:text-lg">
            随机发现一个好玩的网站
          </p>
        </header>

        <div className="animate-fade-in-up flex flex-col items-center gap-4" style={{ animationDelay: '120ms' }}>
          <FilterSwitch
            value={filters.contentMode}
            options={['light', 'useful']}
            labels={['轻松好玩', '学点东西']}
            onChange={(contentMode) =>
              onFilterChange({ ...filters, contentMode })
            }
            ariaLabel="内容倾向"
          />
        </div>

        <div className="animate-fade-in-up pt-2" style={{ animationDelay: '240ms' }}>
          <RandomButton onClick={onDraw}>抽一下</RandomButton>
        </div>
      </div>
    </div>
  );
}
