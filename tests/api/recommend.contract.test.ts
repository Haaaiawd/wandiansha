import { describe, it, expect } from 'vitest';
import {
  recommendSites,
  filterSafeSites,
  sortByContentMode,
  shuffleSites,
  type FilterState,
  type ContentMode,
} from '../../src/utils/recommend';
import sites from '../../src/data/sites.json';

describe('recommend contract tests', () => {
  it('recommendSites accepts Site[] and FilterState and returns Site[]', () => {
    const filters: FilterState = { contentMode: 'light' };
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
    const filters: FilterState = { contentMode: 'light' };
    const result = recommendSites(sites, filters);
    expect(result.length).toBeGreaterThan(0);
  });

  it('content mode keeps recommendable sites', () => {
    const filters: FilterState = { contentMode: 'light' };
    const result = recommendSites(sites, filters);
    expect(result.length).toBeGreaterThan(0);
  });
});
