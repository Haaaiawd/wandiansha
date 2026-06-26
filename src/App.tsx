import { useMemo, useState } from 'react';
import { CardCarousel } from './components/CardCarousel.tsx';
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

  if (hasDrawn) {
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
