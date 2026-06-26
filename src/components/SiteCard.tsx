import type { Site } from '../data/siteTypes';

function SparkleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
    </svg>
  );
}

type SiteCardProps = {
  site: Site;
  onClick?: () => void;
};

export function SiteCard({ site, onClick }: SiteCardProps) {
  const tags = site.tags.slice(0, 3);

  return (
    <a
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      className="toy-shadow group flex h-full w-full flex-col overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-white text-left transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100">
        <img
          src={site.image}
          alt={site.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = '/images/placeholders/toy-default.svg';
          }}
        />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-zinc-200 bg-white/85 px-3 py-1 text-xs font-bold text-zinc-700 shadow-sm backdrop-blur-sm">
            {site.category}
          </span>
          {site.mayNeedGlobalNetwork ? (
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800 shadow-sm">
              可能需要外网
            </span>
          ) : (
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 shadow-sm">
              国内可试
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-2xl font-bold text-zinc-950">{site.name}</h3>
          <span className="mt-1 text-teal-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <SparkleIcon />
          </span>
        </div>
        <p className="line-clamp-2 text-base leading-relaxed text-zinc-600 sm:text-lg">
          {site.description}
        </p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between border-t border-zinc-200 pt-4 text-sm font-bold text-zinc-600">
          <span>抽到这个</span>
          <span className="rounded-full bg-zinc-950 px-4 py-2 text-white shadow-sm transition-transform group-hover:translate-x-1">
            点开玩
          </span>
        </div>
      </div>
    </a>
  );
}
