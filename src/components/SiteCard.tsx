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
      className="group flex h-full w-full flex-col overflow-hidden rounded-[2rem] glass text-left shadow-lg shadow-teal-900/5 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-teal-900/10 active:scale-[0.98]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream-100">
        <img
          src={site.image}
          alt={site.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = '/images/placeholders/toy-default.svg';
          }}
        />
        {site.mayNeedGlobalNetwork && (
          <span className="absolute right-4 top-4 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800 shadow-sm">
            可能需要外网
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-2xl font-bold text-teal-900">{site.name}</h3>
          <span className="mt-1 text-teal-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <SparkleIcon />
          </span>
        </div>
        <p className="line-clamp-2 text-base leading-relaxed text-teal-700/80">
          {site.description}
        </p>

        {tags.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-2 pt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-800"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  );
}
