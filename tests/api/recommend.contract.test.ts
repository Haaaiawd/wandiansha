import { describe, it, expect } from 'vitest';
import {
  recommendSites,
  filterSafeSites,
  sortByNetworkMode,
  sortByContentMode,
  shuffleSites,
  type FilterState,
  type NetworkMode,
  type ContentMode,
} from '../../src/utils/recommend';
import sites from '../../src/data/sites.json';
import type { Site } from '../../src/data/siteTypes';

describe('recommend contract tests', () => {
  it('recommendSites accepts Site[] and FilterState and returns Site[]', () => {
    const filters: FilterState = { networkMode: 'domestic', contentMode: 'light' };
    const result = recommendSites(sites, filters);
    expect(Array.isArray(result)).toBe(true);
    result.forEach((site) => {
      expect(site.safeLevel).toBeGreaterThanOrEqual(4);
      expect(site.childFriendly).toBe(true);
    });
  });

  it('filterSafeSites contract: input/output are Site arrays', () => {
    const result = filterSafeSites(sites);
    expect(result.every((s) => s.safeLevel >= 4 && s.childFriendly)).toBe(true);
  });

  it('sortByNetworkMode contract: accepts NetworkMode', () => {
    const modes: NetworkMode[] = ['domestic', 'all'];
    modes.forEach((mode) => {
      const result = sortByNetworkMode(sites, mode);
      expect(result).toHaveLength(sites.length);
    });
  });

  it('sortByContentMode contract: accepts ContentMode', () => {
    const modes: ContentMode[] = ['light', 'useful'];
    modes.forEach((mode) => {
      const result = sortByContentMode(sites, mode);
      expect(result).toHaveLength(sites.length);
    });
  });

  it('shuffleSites contract: optional seed parameter', () => {
    const withoutSeed = shuffleSites(sites);
    const withSeed = shuffleSites(sites, 123);
    expect(withoutSeed).toHaveLength(sites.length);
    expect(withSeed).toHaveLength(sites.length);
  });

  it('real sites.json produces recommendable results', () => {
    const filters: FilterState = { networkMode: 'all', contentMode: 'light' };
    const result = recommendSites(sites, filters);
    expect(result.length).toBeGreaterThan(0);
  });
});
