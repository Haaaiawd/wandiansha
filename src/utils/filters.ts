import type { Site } from '../data/siteTypes';

export function filterSafeSites(sites: Site[]): Site[] {
  return sites.filter((site) => site.safeLevel >= 4 && site.childFriendly);
}

export type NetworkMode = 'domestic' | 'all';

function isDomesticFriendly(site: Site): boolean {
  return site.domesticPriority || !site.mayNeedGlobalNetwork;
}

export function sortByNetworkMode(sites: Site[], mode: NetworkMode): Site[] {
  if (mode !== 'domestic') {
    return [...sites];
  }

  return [...sites].sort((a, b) => {
    const aDomestic = isDomesticFriendly(a) ? 1 : 0;
    const bDomestic = isDomesticFriendly(b) ? 1 : 0;
    return bDomestic - aDomestic;
  });
}

export type ContentMode = Site['contentMode'];

export function sortByContentMode(sites: Site[], mode: ContentMode): Site[] {
  return [...sites].sort((a, b) => {
    const aMatch = a.contentMode === mode ? 1 : 0;
    const bMatch = b.contentMode === mode ? 1 : 0;
    return bMatch - aMatch;
  });
}
