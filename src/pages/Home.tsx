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
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 px-6 py-12 text-center">
      <div className="max-w-md space-y-8">
        <header className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-indigo-900 sm:text-5xl">
            玩点啥.ai
          </h1>
          <p className="text-lg text-indigo-700">
            随机发现一个好玩的网站
          </p>
        </header>

        <div className="flex flex-col items-center gap-4">
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

        <RandomButton onClick={onDraw}>抽一下</RandomButton>
      </div>
    </div>
  );
}
