import type { Site, ContentMode } from '../data/siteTypes';
import { filterSafeSites, sortByNetworkMode, sortByContentMode, type NetworkMode } from './filters';
import { shuffleSites } from './shuffle';

export type { NetworkMode, ContentMode };

export type FilterState = {
  networkMode: NetworkMode;
  contentMode: ContentMode;
};

export type RecommendationBatch = Site[];

function isDomesticFriendly(site: Site): boolean {
  return site.domesticPriority || !site.mayNeedGlobalNetwork;
}

function prepareGroup(sites: Site[], contentMode: ContentMode): Site[] {
  const sorted = sortByContentMode(sites, contentMode);
  return shuffleSites(sorted);
}

export function recommendSites(
  sites: Site[],
  filters: FilterState
): RecommendationBatch {
  const safe = filterSafeSites(sites);

  if (filters.networkMode === 'domestic') {
    const domestic = safe.filter(isDomesticFriendly);
    const others = safe.filter((site) => !isDomesticFriendly(site));
    return [
      ...prepareGroup(domestic, filters.contentMode),
      ...prepareGroup(others, filters.contentMode),
    ];
  }

  return prepareGroup(safe, filters.contentMode);
}

export { filterSafeSites, sortByNetworkMode, sortByContentMode, shuffleSites };
