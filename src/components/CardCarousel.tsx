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
    <div className="flex min-h-screen animate-fade-in-up flex-col bg-gradient-to-br from-cream-50 via-white to-cream-100">
      <header className="flex items-center justify-between px-4 py-4 sm:px-8">
        <button
          type="button"
          onClick={onBack}
          className="glass rounded-full px-5 py-2.5 text-sm font-semibold text-teal-700 shadow-sm transition-all hover:scale-105 hover:bg-white/80 active:scale-95"
        >
          ← 返回
        </button>
        <span className="rounded-full bg-white/60 px-4 py-2 text-sm font-semibold text-teal-700 shadow-sm backdrop-blur-sm">
          {sites.length} 个结果
        </span>
      </header>

      <div
        ref={scrollRef}
        aria-label="推荐卡片列表"
        className="flex flex-1 items-center gap-5 overflow-x-auto overscroll-x-contain scroll-smooth px-5 pb-10 pt-4 sm:gap-8 sm:px-8"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {sites.map((site, index) => (
          <div
            key={site.id}
            className="w-[84vw] flex-shrink-0 animate-fade-in-up sm:w-[420px]"
            style={{
              scrollSnapAlign: 'center',
              animationDelay: `${index * 80}ms`,
            }}
          >
            <SiteCard site={site} onClick={() => onSiteClick(site)} />
          </div>
        ))}
      </div>
    </div>
  );
}
