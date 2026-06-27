import type { Site, ContentMode } from '../data/siteTypes';
import { filterSafeSites, sortByContentMode } from './filters';
import { shuffleSites } from './shuffle';

export type { ContentMode };

export type FilterState = {
  contentMode: ContentMode;
};

export type RecommendationBatch = Site[];

function prepareGroup(sites: Site[], contentMode: ContentMode): Site[] {
  const matching = sites.filter((site) => site.contentMode === contentMode);
  const rest = sites.filter((site) => site.contentMode !== contentMode);
  return [...shuffleSites(matching), ...shuffleSites(rest)];
}

export function recommendSites(
  sites: Site[],
  filters: FilterState
): RecommendationBatch {
  const safe = filterSafeSites(sites);
  return prepareGroup(safe, filters.contentMode);
}

export { filterSafeSites, sortByContentMode, shuffleSites };
