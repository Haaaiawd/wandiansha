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

  const scrollByCard = (direction: 'prev' | 'next') => {
    const container = scrollRef.current;
    if (!container) {
      return;
    }

    container.scrollBy({
      left: direction === 'next' ? container.clientWidth : -container.clientWidth,
      behavior: 'smooth',
    });
  };

  return (
    <div className="toy-bg relative flex min-h-screen animate-fade-in-up flex-col overflow-hidden">
      <div className="grain-overlay pointer-events-none absolute inset-0 opacity-70" />

      <header className="relative z-10 flex items-center justify-between px-4 py-4 sm:px-8">
        <button
          type="button"
          onClick={onBack}
          className="rounded-full border border-zinc-200 bg-white/80 px-5 py-2.5 text-sm font-semibold text-zinc-700 shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:text-zinc-950 active:scale-95"
        >
          ← 返回
        </button>
        <span className="rounded-full border border-zinc-200 bg-white/80 px-4 py-2 text-sm font-semibold text-zinc-700 shadow-sm backdrop-blur-sm">
          {sites.length} 个结果
        </span>
      </header>

      <div className="relative z-10 flex flex-1 items-center">
        <button
          type="button"
          onClick={() => scrollByCard('prev')}
          aria-label="上一张"
          className="absolute left-3 z-20 hidden h-12 w-12 place-items-center rounded-full border border-zinc-200 bg-white/85 text-2xl font-bold text-zinc-700 shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:text-zinc-950 active:scale-95 sm:grid"
        >
          ‹
        </button>

        <div
          ref={scrollRef}
          aria-label="推荐卡片列表"
          className="flex h-full flex-1 snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth"
        >
          {sites.map((site, index) => (
            <section
              key={site.id}
              aria-label={`第 ${index + 1} 张推荐卡片`}
              className="flex min-w-full snap-center items-center justify-center px-5 pb-12 pt-4 sm:px-20"
            >
              <div
                className="w-full max-w-[420px] animate-fade-in-up sm:max-w-[520px]"
                style={{ animationDelay: `${Math.min(index, 4) * 80}ms` }}
              >
                <SiteCard site={site} onClick={() => onSiteClick(site)} />
              </div>
            </section>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollByCard('next')}
          aria-label="下一张"
          className="absolute right-3 z-20 hidden h-12 w-12 place-items-center rounded-full border border-zinc-200 bg-white/85 text-2xl font-bold text-zinc-700 shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:text-zinc-950 active:scale-95 sm:grid"
        >
          ›
        </button>
      </div>
    </div>
  );
}
