import type { Site, ContentMode } from '../data/siteTypes';
import { filterSafeSites, sortByNetworkMode, sortByContentMode, type NetworkMode } from './filters';
import { shuffleSites } from './shuffle';

export type { NetworkMode };
export type { ContentMode };

export type FilterState = {
  networkMode: NetworkMode;
  contentMode: ContentMode;
};

export type RecommendationBatch = Site[];

export function recommendSites(
  sites: Site[],
  filters: FilterState
): RecommendationBatch {
  const safe = filterSafeSites(sites);
  const networkSorted = sortByNetworkMode(safe, filters.networkMode);
  const contentSorted = sortByContentMode(networkSorted, filters.contentMode);
  return shuffleSites(contentSorted);
}

export { filterSafeSites, sortByNetworkMode, sortByContentMode, shuffleSites };
