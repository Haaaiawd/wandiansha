import type { Site, ContentMode } from '../data/siteTypes';
import { MIN_SAFE_LEVEL } from '../data/siteSchema';

export function filterSafeSites(sites: Site[]): Site[] {
  return sites.filter((site) => site.safeLevel >= MIN_SAFE_LEVEL && site.childFriendly);
}

export function sortByContentMode(sites: Site[], mode: ContentMode): Site[] {
  return [...sites].sort((a, b) => {
    const aMatch = a.contentMode === mode ? 1 : 0;
    const bMatch = b.contentMode === mode ? 1 : 0;
    return bMatch - aMatch;
  });
}
