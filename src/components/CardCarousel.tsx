import { useRef } from 'react';
import type { Site } from '../data/siteTypes';
import { SiteCard } from './SiteCard.tsx';

type CardCarouselProps = {
  sites: Site[];
  onSiteClick: (site: Site) => void;
  onBack: () => void;
};

export function CardCarousel({ sites, onSiteClick, onBack }: CardCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-indigo-50 to-purple-50">
      <header className="flex items-center justify-between px-4 py-4 sm:px-6">
        <button
          type="button"
          onClick={onBack}
          className="rounded-full bg-white/70 px-4 py-2 text-sm font-medium text-indigo-700 shadow-sm backdrop-blur-sm hover:bg-white"
        >
          ← 返回
        </button>
        <span className="text-sm font-medium text-indigo-700">
          {sites.length} 个结果
        </span>
      </header>

      <div
        ref={scrollRef}
        className="flex flex-1 items-center gap-4 overflow-x-auto overscroll-x-contain scroll-smooth px-4 pb-8 pt-4 sm:gap-6 sm:px-6"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {sites.map((site) => (
          <div
            key={site.id}
            className="w-[78vw] flex-shrink-0 sm:w-[360px]"
            style={{ scrollSnapAlign: 'center' }}
          >
            <SiteCard site={site} onClick={() => onSiteClick(site)} />
          </div>
        ))}
      </div>
    </div>
  );
}
