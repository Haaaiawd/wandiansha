import { useMemo, useState } from 'react';
import { CardCarousel } from './components/CardCarousel.tsx';
import { EmptyState } from './components/EmptyState.tsx';
import { Home } from './pages/Home.tsx';
import { recommendSites, type FilterState } from './utils/recommend.ts';
import sites from './data/sites.ts';
import { openExternal } from './utils/openExternal.ts';

const DEFAULT_FILTERS: FilterState = {
  networkMode: 'domestic',
  contentMode: 'light',
};

function App() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [hasDrawn, setHasDrawn] = useState(false);

  const recommendations = useMemo(() => {
    return recommendSites(sites, filters);
  }, [filters]);

  const handleDraw = () => {
    setHasDrawn(true);
  };

  const handleBack = () => {
    setHasDrawn(false);
  };

  const handleSiteClick = (site: { url: string }) => {
    openExternal(site.url);
  };

  if (sites.length === 0) {
    return (
      <EmptyState
        title="网站库加载失败"
        description="请检查网络连接或刷新页面再试。"
      />
    );
  }

  if (hasDrawn) {
    if (recommendations.length === 0) {
      return (
        <EmptyState
          title="这一组已经抽完啦，换个筛选再试试。"
          action={
            <button
              type="button"
              onClick={handleBack}
              className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              返回首页
            </button>
          }
        />
      );
    }

    return (
      <CardCarousel
        sites={recommendations}
        onSiteClick={handleSiteClick}
        onBack={handleBack}
      />
    );
  }

  return <Home filters={filters} onFilterChange={setFilters} onDraw={handleDraw} />;
}

export default App
