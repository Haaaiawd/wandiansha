import { FilterSwitch } from '../components/FilterSwitch';
import { RandomButton } from '../components/RandomButton';
import type { FilterState } from '../utils/recommend';

type HomeProps = {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onDraw: () => void;
};

export function Home({ filters, onFilterChange, onDraw }: HomeProps) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-cream-50 via-white to-cream-100 px-6 py-12 text-center">
      <div className="pointer-events-none absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-teal-200/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-1/4 h-96 w-96 rounded-full bg-sky-200/20 blur-3xl" />

      <div className="relative z-10 max-w-md space-y-10">
        <header className="animate-fade-in-up space-y-3">
          <h1 className="font-display text-5xl font-extrabold tracking-tight text-teal-900 sm:text-6xl">
            玩点啥
            <span className="text-teal-500">.ai</span>
          </h1>
          <p className="text-balance text-lg text-teal-700/80">
            随机发现一个好玩的网站
          </p>
        </header>

        <div className="animate-fade-in-up flex flex-col items-center gap-4" style={{ animationDelay: '120ms' }}>
          <FilterSwitch
            value={filters.networkMode}
            options={['domestic', 'all']}
            labels={['国内优先', '全部']}
            onChange={(networkMode) =>
              onFilterChange({ ...filters, networkMode })
            }
            ariaLabel="网络环境"
          />
          <FilterSwitch
            value={filters.contentMode}
            options={['light', 'useful']}
            labels={['轻松好玩', '有点收获']}
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
