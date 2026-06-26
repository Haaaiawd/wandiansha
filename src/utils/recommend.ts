import type { Site } from '../data/siteTypes';
import { filterSafeSites, sortByNetworkMode, sortByContentMode, type NetworkMode, type ContentMode } from './filters';
import { shuffleSites } from './shuffle';

export type { NetworkMode, ContentMode };

export type FilterState = {
  networkMode: NetworkMode;
  contentMode: ContentMode;
};

export type RecommendationBatch = Site[];

export function recommendSites(
  sites: Site[],
  filters: FilterState,
  seed?: number
): RecommendationBatch {
  const safe = filterSafeSites(sites);
  const networkSorted = sortByNetworkMode(safe, filters.networkMode);
  const contentSorted = sortByContentMode(networkSorted, filters.contentMode);
  return shuffleSites(contentSorted, seed);
}

export { filterSafeSites, sortByNetworkMode, sortByContentMode, shuffleSites };
