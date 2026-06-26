import { useState } from 'react';
import { Home } from './pages/Home.tsx';
import type { FilterState } from './utils/recommend.ts';

const DEFAULT_FILTERS: FilterState = {
  networkMode: 'domestic',
  contentMode: 'light',
};

function App() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [hasDrawn, setHasDrawn] = useState(false);

  const handleDraw = () => {
    setHasDrawn(true);
  };

  if (hasDrawn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
        <p className="text-lg text-indigo-700">卡片流正在赶来…（下一任务实现）</p>
      </div>
    );
  }

  return <Home filters={filters} onFilterChange={setFilters} onDraw={handleDraw} />;
}

export default App
