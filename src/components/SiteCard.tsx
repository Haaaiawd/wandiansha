import type { Site } from '../data/siteTypes';

type SiteCardProps = {
  site: Site;
  onClick: () => void;
};

export function SiteCard({ site, onClick }: SiteCardProps) {
  const tags = site.tags.slice(0, 3);

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-full w-full flex-col overflow-hidden rounded-3xl bg-white/80 text-left shadow-xl shadow-indigo-100 backdrop-blur-sm transition-transform hover:scale-[1.02] active:scale-[0.98]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-indigo-50">
        <img
          src={site.image}
          alt={site.name}
          className="h-full w-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = '/images/placeholders/toy-default.svg';
          }}
        />
        {site.mayNeedGlobalNetwork && (
          <span className="absolute right-3 top-3 rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
            可能需要外网
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="text-xl font-bold text-indigo-900">{site.name}</h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-indigo-700">
          {site.description}
        </p>

        {tags.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-medium text-indigo-800"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </button>
  );
}
